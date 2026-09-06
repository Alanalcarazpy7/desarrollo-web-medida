"use client";

import { useEffect } from "react";

/**
 * ================== POR QUÉ EXISTE ESTO ==================
 *
 * Síntoma: al tocar un enlace del menú que apunta a una sección de la MISMA
 * página (ej. /es#precios), en mobile el navbar y el botón de WhatsApp
 * "aparecen y desaparecen" en bucle cada 1-2 segundos, y no para.
 *
 * Causa real: el App Router de Next, cuando una navegación cambia la URL a
 * algo con hash, entra en un ciclo de "scrollear al elemento y volver a
 * chequear si llegó". Si el scroll está animado (había `scroll-behavior:
 * smooth` en `html`) nunca llega "ya", así que vuelve a scrollear. Encima,
 * al saltar de golpe a media página, en mobile el navegador muestra/oculta
 * su barra de direcciones, lo que cambia la altura del viewport, mueve el
 * punto de destino y realimenta el ciclo. Todo lo que depende del scroll
 * (navbar `scrolled`, secciones con whileInView, el FAB) se re-evalúa en
 * cada vuelta y por eso parpadea.
 *
 * Solución: NINGUNA navegación a un hash de la página actual pasa por el
 * router de Next. Este componente intercepta el click en cualquier <a> (o
 * <Link>, que renderiza un <a>) que apunte a #algo de esta misma ruta, hace
 * el scroll a mano una sola vez y actualiza la URL con history.replaceState
 * (que Next no observa). El bucle se vuelve estructuralmente imposible.
 *
 * Los ítems del navbar no son <a> sino <div onClick>, así que ahí el
 * intercepto vive en Navbar.tsx (goTo). Este cubre footer, hero, servicios
 * y cualquier enlace futuro.
 */

const HEADER_OFFSET = 90;

function idFromHref(href: string): string | null {
  try {
    const url = new URL(href, window.location.origin);
    if (url.origin !== window.location.origin) return null;
    // misma ruta (ignorando slash final) y con hash
    const a = url.pathname.replace(/\/$/, "");
    const b = window.location.pathname.replace(/\/$/, "");
    if (a !== b || !url.hash || url.hash === "#") return null;
    return decodeURIComponent(url.hash.slice(1));
  } catch {
    return null;
  }
}

function smoothScrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return false;
  const top = el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
  window.scrollTo({ top, behavior: "smooth" });
  window.history.replaceState(null, "", `#${id}`);
  return true;
}

export default function SmoothAnchors() {
  // Blindaje: aunque quede un `scroll-behavior: smooth` viejo en el CSS
  // (build/HMR cacheado), el estilo inline en <html> gana y mata el bucle
  // de Next. El scroll suave lo hacemos nosotros con window.scrollTo.
  useEffect(() => {
    const html = document.documentElement;
    const prev = html.style.scrollBehavior;
    html.style.scrollBehavior = "auto";
    return () => {
      html.style.scrollBehavior = prev;
    };
  }, []);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      // respetar cmd/ctrl/click-medio (abrir en pestaña nueva)
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

      const anchor = (e.target as HTMLElement | null)?.closest?.("a");
      if (!anchor) return;
      if (anchor.target && anchor.target !== "_self") return;
      const href = anchor.getAttribute("href");
      if (!href) return;

      const id = idFromHref(href);
      if (!id) return;

      e.preventDefault();
      // en el próximo frame: deja que se cierre el drawer mobile primero
      requestAnimationFrame(() => smoothScrollToId(id));
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  // Al entrar directo con un hash en la URL, hace el scroll una sola vez
  // después de que pintó la página (sin depender del router).
  useEffect(() => {
    if (!window.location.hash || window.location.hash === "#") return;
    const id = decodeURIComponent(window.location.hash.slice(1));
    const t = window.setTimeout(() => smoothScrollToId(id), 60);
    return () => window.clearTimeout(t);
  }, []);

  return null;
}
