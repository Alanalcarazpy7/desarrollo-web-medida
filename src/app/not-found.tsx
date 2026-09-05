import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

/**
 * 404 de marca. En esta app no hay `app/layout.tsx` (el layout raíz es
 * `[lang]/layout.tsx`), así que para rutas totalmente inexistentes Next
 * usa ESTE archivo, que renderiza sin layout: por eso trae su propio
 * <html>/<body> y todo va con estilos en línea, sin depender del Navbar
 * (que necesita el LanguageProvider). Queda en español, el idioma
 * principal del sitio. El 404 bilingüe con Navbar es `[lang]/not-found.tsx`
 * y se usa cuando una página existente llama a notFound().
 */
export const metadata: Metadata = {
  title: "Página no encontrada | SolvaTech",
  robots: { index: false, follow: true },
};

const accent = "#00d9ff";
const links = [
  { label: "Inicio", href: "/es" },
  { label: "Servicios", href: "/es/servicios" },
  { label: "Desarrollo web en Paraguay", href: "/es/servicios/desarrollo-web-paraguay" },
  { label: "Proyectos", href: "/es/proyectos" },
  { label: "Blog", href: "/es/blog" },
];

export default function RootNotFound() {
  return (
    <div
      style={{
        margin: 0,
        minHeight: "100vh",
        background: "#000",
        color: "#fff",
        fontFamily: "'Inter', system-ui, -apple-system, 'Segoe UI', Roboto, Arial, sans-serif",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "48px 24px",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
        <div
          aria-hidden
          style={{
            position: "absolute",
            top: "-160px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "min(560px, 90vw)",
            height: "420px",
            background: `radial-gradient(circle, ${accent}33, transparent 70%)`,
            filter: "blur(30px)",
            pointerEvents: "none",
          }}
        />

        <main style={{ position: "relative", maxWidth: "560px" }}>
          <Link
            href="/es"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              textDecoration: "none",
              marginBottom: "36px",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/favicon.png" alt="" width={34} height={34} style={{ borderRadius: "9px" }} />
            <span style={{ fontSize: "1.2rem", fontWeight: 800, color: "#fff", letterSpacing: "0.02em" }}>
              Solva<span style={{ fontWeight: 300, color: accent }}>Tech</span>
            </span>
          </Link>

          <p
            style={{
              fontSize: "clamp(4rem, 16vw, 7.5rem)",
              fontWeight: 900,
              lineHeight: 1,
              margin: 0,
              background: `linear-gradient(135deg, ${accent}, #0099cc)`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            404
          </p>
          <h1 style={{ fontSize: "clamp(1.35rem, 4vw, 1.9rem)", fontWeight: 800, margin: "16px 0 10px" }}>
            No encontramos esta página
          </h1>
          <p style={{ color: "#9ca3af", lineHeight: 1.7, margin: "0 auto 28px", maxWidth: "420px" }}>
            El enlace puede estar mal escrito, la página se movió o ya no existe. Probá con estos accesos:
          </p>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", justifyContent: "center", marginBottom: "34px" }}>
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                style={{
                  display: "inline-block",
                  padding: "9px 16px",
                  borderRadius: "9999px",
                  border: "1px solid rgba(255,255,255,0.14)",
                  color: "#c3cad4",
                  fontSize: "0.88rem",
                  fontWeight: 700,
                  textDecoration: "none",
                }}
              >
                {l.label}
              </Link>
            ))}
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", justifyContent: "center" }}>
            <Link
              href="/es"
              style={{
                display: "inline-block",
                padding: "14px 28px",
                borderRadius: "9999px",
                background: accent,
                color: "#04121a",
                fontWeight: 800,
                textDecoration: "none",
              }}
            >
              Volver al inicio
            </Link>
            <a
              href="https://wa.me/595994295092"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-block",
                padding: "14px 28px",
                borderRadius: "9999px",
                border: `1px solid ${accent}55`,
                color: accent,
                fontWeight: 800,
                textDecoration: "none",
              }}
            >
              Escribinos por WhatsApp
            </a>
          </div>
        </main>
    </div>
  );
}
