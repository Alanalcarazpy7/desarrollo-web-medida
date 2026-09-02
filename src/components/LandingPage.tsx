"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { getWhatsAppLink } from "@/lib/whatsapp";
import { trackEvent } from "@/lib/analytics";

/* Iconos inline: el proyecto no usa librería de íconos y dibuja los SVG a
   mano en cada componente; se mantiene esa convención acá. */
const IconWa = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12.04 2c-5.46 0-9.9 4.43-9.9 9.9 0 1.75.46 3.45 1.32 4.95L2 22l5.3-1.38a9.9 9.9 0 0 0 4.73 1.2h.01c5.46 0 9.9-4.43 9.9-9.9 0-2.64-1.03-5.13-2.9-7A9.82 9.82 0 0 0 12.04 2Zm5.8 14.06c-.24.68-1.4 1.3-1.94 1.35-.5.05-1.13.07-1.82-.11-.42-.13-.96-.31-1.65-.61-2.9-1.25-4.8-4.17-4.94-4.36-.15-.19-1.19-1.58-1.19-3.02 0-1.43.75-2.14 1.02-2.43.27-.29.59-.36.79-.36l.56.01c.18.01.42-.07.66.5.24.58.82 2.01.89 2.16.07.14.12.31.02.5-.09.19-.14.31-.28.48-.14.17-.29.37-.42.5-.14.14-.28.29-.12.57.16.28.71 1.17 1.53 1.9 1.05.93 1.94 1.22 2.22 1.36.28.14.44.12.6-.07.16-.19.69-.8.87-1.08.18-.28.36-.23.61-.14.25.09 1.6.76 1.87.9.28.14.46.21.53.32.07.12.07.66-.17 1.34Z" />
  </svg>
);
const IconCheck = () => (
  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden="true">
    <path d="M4 10.5l4 4 8-9" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const IconArrow = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden="true">
    <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const IconMail = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="M4 7l8 6 8-6" strokeLinecap="round" />
  </svg>
);
const IconSpark = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9L12 3Z" strokeLinejoin="round" />
  </svg>
);
const IconPhone = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <rect x="7" y="3" width="10" height="18" rx="2.5" />
    <path d="M11 18h2" strokeLinecap="round" />
  </svg>
);
const IconSearch = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <circle cx="11" cy="11" r="7" />
    <path d="M20 20l-3.5-3.5" strokeLinecap="round" />
  </svg>
);
const IconBolt = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="M13 2L4 14h7l-1 8 9-12h-7l1-8Z" strokeLinejoin="round" />
  </svg>
);
const IconServer = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <rect x="3" y="4" width="18" height="7" rx="2" />
    <rect x="3" y="13" width="18" height="7" rx="2" />
    <path d="M7 7.5h.01M7 16.5h.01" strokeLinecap="round" />
  </svg>
);

const EASE = [0.16, 1, 0.3, 1] as const;

const work = [
  {
    name: "Academia GPS",
    type: "Landing de venta",
    desc: "Formación online con pagos y WhatsApp integrados.",
    image: "/projects/academia-gps-trilogia-tol.png",
    url: "https://www.academiagps.com/",
  },
  {
    name: "Morinigo y Asociados",
    type: "Sitio para estudio contable",
    desc: "Presencia seria para un estudio de auditores.",
    image: "/projects/morinigo-y-asociados.png",
    url: "https://www.morinigoyasociados.com.py/",
  },
  {
    name: "Gestión de Residencias",
    type: "Sitio para una gestoría",
    desc: "Servicios de residencia explicados claro para extranjeros.",
    image: "/projects/gestion-de-residencias.png",
    url: "https://www.gestionderesidencias.com.py/",
  },
  {
    name: "Barbería Master Barber",
    type: "Web con turnos",
    desc: "Muestra el local, el equipo y cómo reservar turno.",
    image: "/projects/barberia-master-barber.png",
    url: "https://master-barber-vip.vercel.app/",
  },
  {
    name: "VasosPy",
    type: "Catálogo con pedidos",
    desc: "Productos con fotos, precios y pedido por WhatsApp.",
    image: "/projects/VasosPy-termos.png",
    url: "https://vasos-py-demo.vercel.app/",
  },
  {
    name: "Bar San Roque",
    type: "Menú digital",
    desc: "La carta del bar siempre actualizada, sin PDF.",
    image: "/projects/bar-san-roque.png",
    url: "https://bar-san-roque-demo.vercel.app/",
  },
];

const clientLogos = [
  { alt: "Academia GPS", src: "/projects/academia-gps-logo.svg" },
  { alt: "Morinigo y Asociados", src: "/projects/morinigo-logo.png" },
  { alt: "Gestión de Residencias", src: "/projects/gestion-de-residencia-logo.png" },
];

const feats = [
  { icon: <IconSpark />, t: "Diseño propio", d: "Con tu identidad, no una plantilla." },
  { icon: <IconPhone />, t: "Lista para el celular", d: "Donde te miran tus clientes." },
  { icon: <IconWa />, t: "Botón de WhatsApp", d: "Te escriben en un toque." },
  { icon: <IconSearch />, t: "Apareces en Google", d: "Cuando te buscan por tu nombre." },
  { icon: <IconBolt />, t: "Carga rápida", d: "Incluso con datos móviles." },
  { icon: <IconServer />, t: "6 meses de hosting", d: "Incluidos en el precio." },
];

const steps = [
  { t: "Contás", d: "Completás el formulario con tu negocio, tu presupuesto y tu plazo." },
  { t: "Propuesta", d: "Te respondo por WhatsApp con qué incluye, precio y fecha de entrega." },
  { t: "Diseño", d: "Armo la página y la revisás. Los cambios antes de publicar van incluidos." },
  { t: "Online", d: "Publicamos con tu dominio y todo configurado, listo para recibir clientes." },
];

const faqs = [
  {
    q: "¿Qué entra en los Gs. 850.000?",
    a: "Una landing page: una sola página, larga, que presenta tu negocio de forma profesional y lleva a la gente a tu WhatsApp. No es un sitio de varias secciones ni una tienda online. Esas opciones existen y se cotizan aparte.",
  },
  {
    q: "¿El dominio y el hosting están incluidos?",
    a: "El precio de lanzamiento incluye los primeros 6 meses de hosting. El dominio (tu nombre .com o .com.py) se paga aparte una vez al año. Desde el mes 7 el hosting es mensual e incluye mantenimiento y los cambios que necesites en tu página.",
  },
  {
    q: "¿Cuánto tarda en estar lista?",
    a: "Entre 4 y 7 días hábiles desde que me pasás la información y las fotos de tu negocio.",
  },
  {
    q: "Necesito una tienda o un sistema. ¿Lo hacés?",
    a: "Sí, también hago tiendas online y sistemas a medida (reservas, stock, clientes, pedidos). En el formulario elegís esa opción y te paso un presupuesto según lo que necesites.",
  },
  {
    q: "¿Puedo pedir cambios después de publicar?",
    a: "Sí. Mientras tengas el hosting mensual activo, los cambios de cada mes van incluidos: textos, precios, fotos y ajustes.",
  },
];

function Reveal({
  children,
  y = 22,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  y?: number;
  delay?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

export default function LandingPage() {
  const reduce = useReducedMotion();
  const [sent, setSent] = useState(false);
  const [showSticky, setShowSticky] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  // Arrastrar con el mouse el carrusel de proyectos (en mobile ya funciona
  // con el dedo; esto lo habilita también en PC / modo responsive).
  useEffect(() => {
    const el = gridRef.current;
    if (!el) return;
    let down = false;
    let moved = false;
    let startX = 0;
    let startScroll = 0;
    const onDown = (e: PointerEvent) => {
      if (e.pointerType !== "mouse" || el.scrollWidth <= el.clientWidth + 4) return;
      down = true;
      moved = false;
      startX = e.clientX;
      startScroll = el.scrollLeft;
      el.setPointerCapture(e.pointerId);
      el.style.cursor = "grabbing";
    };
    const onMove = (e: PointerEvent) => {
      if (!down) return;
      const dx = e.clientX - startX;
      if (Math.abs(dx) > 4) moved = true;
      el.scrollLeft = startScroll - dx;
    };
    const onUp = (e: PointerEvent) => {
      down = false;
      el.style.cursor = "";
      try {
        el.releasePointerCapture(e.pointerId);
      } catch {
        /* noop */
      }
    };
    const onClickCapture = (e: MouseEvent) => {
      if (moved) {
        e.preventDefault();
        e.stopPropagation();
        moved = false;
      }
    };
    el.addEventListener("pointerdown", onDown);
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerup", onUp);
    el.addEventListener("pointercancel", onUp);
    el.addEventListener("click", onClickCapture, true);
    return () => {
      el.removeEventListener("pointerdown", onDown);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerup", onUp);
      el.removeEventListener("pointercancel", onUp);
      el.removeEventListener("click", onClickCapture, true);
    };
  }, []);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.2 });

  useEffect(() => {
    // Marca el <body> para poder reubicar el botón flotante global de
    // WhatsApp (que vive en el layout) y que no se pise con la barra fija.
    document.body.classList.add("lp-page");
    const el = sentinelRef.current;
    if (!el) {
      return () => document.body.classList.remove("lp-page");
    }
    const io = new IntersectionObserver(
      ([entry]) => setShowSticky(entry.boundingClientRect.top < 0),
      { threshold: 0 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      document.body.classList.remove("lp-page");
    };
  }, []);

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const message = `Hola, vi la página de SolvaTech y quiero una página web para mi negocio.

Nombre: ${f.get("name")}
Negocio: ${f.get("business")}
Qué necesito: ${f.get("need")}
Presupuesto: ${f.get("budget")}
Para cuándo: ${f.get("timeline")}
Detalle: ${f.get("details") || "Sin detalle"}`;
    trackEvent("landing_qualified_lead", {
      source: "ads",
      need: String(f.get("need")),
      budget: String(f.get("budget")),
      timeline: String(f.get("timeline")),
    });
    window.open(getWhatsAppLink(message), "_blank", "noopener,noreferrer");
    setSent(true);
  }

  const heroStagger = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
  };
  const heroItem = reduce
    ? { hidden: {}, show: {} }
    : {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
      };

  return (
    <main className="lp">
      <motion.div className="lp-progress" style={{ scaleX }} />

      <header className="lp-header">
        <div className="lp-header-in">
          <Link className="lp-brand" href="/es" aria-label="Ir al sitio de SolvaTech">
            <span className="lp-brand-badge">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/favicon.png" alt="" />
            </span>
            <span className="lp-brand-text">
              <b>
                Solva<span>Tech</span>
              </b>
              <i>Tecnología &amp; desarrollo web</i>
            </span>
          </Link>
          <a
            className="lp-header-cta"
            href="#formulario"
            onClick={() => trackEvent("landing_cta_click", { source: "header" })}
          >
            <IconWa /> Quiero mi web
          </a>
        </div>
      </header>

      {/* HERO */}
      <section className="lp-hero">
        <motion.div
          className="lp-wrap lp-hero-grid"
          variants={heroStagger}
          initial="hidden"
          animate="show"
        >
          <div className="lp-hero-copy">
            <motion.span className="lp-tag" variants={heroItem}>
              <i /> Página web profesional en Paraguay
            </motion.span>
            <motion.h1 className="lp-h1" variants={heroItem}>
              Tu negocio se ve más profesional y <span>te llegan más consultas.</span>
            </motion.h1>
            <motion.p className="lp-hero-sub" variants={heroItem}>
              Una página lista para el celular que muestra lo que hacés y lleva a la gente a tu
              WhatsApp. Me contás de tu negocio y en pocos días está online.
            </motion.p>
            <motion.div className="lp-hero-actions" variants={heroItem}>
              <a
                className="lp-btn"
                href="#formulario"
                onClick={() => trackEvent("landing_cta_click", { source: "hero" })}
              >
                Quiero mi web <IconArrow />
              </a>
              <a className="lp-btn-ghost" href="#trabajos">
                Ver trabajos
              </a>
            </motion.div>
          </div>

          <motion.div className="lp-hero-media" variants={heroItem}>
            <div className="lp-frame">
              <div className="bar">
                <u />
                <u />
                <u />
                <em>tunegocio.com.py</em>
              </div>
              <Image
                src="/projects/barberia-master-barber.png"
                alt="Ejemplo de página web hecha por SolvaTech para una barbería"
                width={760}
                height={520}
                sizes="(min-width:900px) 440px, 92vw"
                style={{ width: "100%", height: "auto", display: "block" }}
                priority
              />
            </div>
            <span className="float">
              <IconWa /> Todo lleva al WhatsApp
            </span>
          </motion.div>
        </motion.div>
        {!reduce && (
          <div className="lp-scroll-hint" aria-hidden>
            <i />
            <i />
          </div>
        )}
      </section>

      {/* BANDA DE VALOR */}
      <section className="lp-band">
        <div className="lp-wrap lp-band-inner">
          <Reveal className="lp-band-price">
            <span className="launch">Precio lanzamiento</span>
            <span className="row">
              <s>Gs. 950.000</s>
              <b>Gs. 850.000</b>
            </span>
            <span className="foot">Pago único · es por la landing page</span>
          </Reveal>
          <Reveal delay={0.08}>
            <ul className="lp-band-facts">
              <li>
                <IconCheck /> Online en 4 a 7 días hábiles
              </li>
              <li>
                <IconCheck /> Pensada para que te escriban por WhatsApp
              </li>
              <li>
                <IconCheck /> 6 meses de hosting incluidos
              </li>
            </ul>
          </Reveal>
        </div>
      </section>
      <div ref={sentinelRef} aria-hidden />

      {/* CLIENTES */}
      <section className="lp-clients">
        <div className="lp-wrap">
          <h3>Negocios que ya trabajan con SolvaTech</h3>
        </div>
        <div className="lp-marquee">
          <div className="lp-marquee-track">
            {Array.from({ length: 6 }, () => clientLogos)
              .flat()
              .map((logo, i) => (
                <span className="chip" key={`${logo.alt}-${i}`}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={logo.src} alt={logo.alt} loading="lazy" />
                </span>
              ))}
          </div>
        </div>
      </section>

      {/* TRABAJOS */}
      <section className="lp-section alt" id="trabajos">
        <div className="lp-wrap">
          <Reveal className="lp-head">
            <h2 className="lp-h2">Mirá lo que ya está online.</h2>
            <p className="lp-p">
              Rubros distintos, la misma idea: verse serio y que el cliente escriba sin pensarlo.
            </p>
          </Reveal>
          <div className="lp-grid" ref={gridRef}>
            {work.map((item, i) => (
              <Reveal key={item.name} delay={(i % 3) * 0.06}>
                <a
                  className="lp-work"
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEvent("landing_work_click", { project: item.name })}
                >
                  <div className="shot">
                    <Image
                      src={item.image}
                      alt={`${item.name}, ${item.type}`}
                      width={640}
                      height={400}
                      sizes="(min-width:900px) 300px, (min-width:600px) 45vw, 100vw"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        objectPosition: "top",
                        display: "block",
                      }}
                    />
                  </div>
                  <div className="meta">
                    <small>{item.type}</small>
                    <strong>{item.name}</strong>
                    <p>{item.desc}</p>
                    <span className="go">
                      Ver sitio <IconArrow />
                    </span>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
          <p className="lp-grid-hint" aria-hidden>
            Deslizá <IconArrow />
          </p>
          <Reveal>
            <p className="lp-work-note">Todos con dominio propio, hosting y WhatsApp funcionando.</p>
          </Reveal>
        </div>
      </section>

      {/* QUE INCLUYE */}
      <section className="lp-section">
        <div className="lp-wrap">
          <Reveal className="lp-head">
            <span className="lp-eyebrow">Todo resuelto</span>
            <h2 className="lp-h2">Qué llevás por Gs. 850.000</h2>
          </Reveal>
          <div className="lp-feats">
            {feats.map((f, i) => (
              <Reveal key={f.t} delay={(i % 3) * 0.06}>
                <div className="lp-feat">
                  <span className="ic">{f.icon}</span>
                  <b>{f.t}</b>
                  <span>{f.d}</span>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <p className="lp-aparte">
              El <b>dominio</b> (una vez al año) y el <b>hosting mensual</b> desde el mes 7 van
              aparte. ¿Necesitás una tienda o un sistema? Se cotiza según tu caso.
            </p>
          </Reveal>
        </div>
      </section>

      {/* PRECIO */}
      <section className="lp-section alt" id="precio">
        <div className="lp-wrap">
          <Reveal className="lp-head">
            <span className="lp-eyebrow">Precio lanzamiento</span>
            <h2 className="lp-h2">Sabés el precio antes de empezar.</h2>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="lp-offer">
              <div className="top">
                <s>Gs. 950.000</s>
                <b>Gs. 850.000</b>
                <i>Pago único</i>
              </div>
              <p className="lead">Por tu landing page completa, lista y publicada.</p>
              <ul>
                <li>
                  <IconCheck /> Online en 4 a 7 días hábiles
                </li>
                <li>
                  <IconCheck /> Primeros 6 meses de hosting sin costo
                </li>
                <li>
                  <IconCheck /> Se arranca con 50% y el resto al entregar
                </li>
              </ul>
              <p className="after">
                <b>Después:</b> dominio anual aparte y hosting mensual con mantenimiento y cambios
                incluidos. <b>¿Tienda o sistema?</b> Contame en el formulario y te cotizo.
              </p>
              <a
                className="lp-btn block"
                href="#formulario"
                onClick={() => trackEvent("landing_cta_click", { source: "offer" })}
              >
                Quiero mi web <IconArrow />
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* COMO TRABAJAMOS */}
      <section className="lp-section">
        <div className="lp-wrap">
          <Reveal className="lp-head">
            <h2 className="lp-h2">Cómo trabajamos</h2>
            <p className="lp-p">Cuatro pasos, sin reuniones eternas ni vocabulario técnico.</p>
          </Reveal>
          <div className="lp-steps">
            {steps.map((s, i) => (
              <Reveal key={s.t} delay={i * 0.07}>
                <div className="lp-step">
                  <span className="n">{i + 1}</span>
                  <strong>{s.t}</strong>
                  <p>{s.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal className="lp-steps-cta">
            <a
              className="lp-btn"
              href="#formulario"
              onClick={() => trackEvent("landing_cta_click", { source: "steps" })}
            >
              Empezar ahora <IconArrow />
            </a>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="lp-section alt">
        <div className="lp-wrap">
          <Reveal className="lp-head">
            <h2 className="lp-h2">Lo que casi todos preguntan</h2>
          </Reveal>
          <div className="lp-faq">
            {faqs.map((item, i) => (
              <Reveal key={item.q} delay={i * 0.04}>
                <details open={i === 0}>
                  <summary>{item.q}</summary>
                  <p>{item.a}</p>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FORMULARIO */}
      <section className="lp-section" id="formulario">
        <div className="lp-wrap">
          <Reveal className="lp-head">
            <span className="lp-eyebrow">Último paso</span>
            <h2 className="lp-h2">Pedí tu propuesta</h2>
            <p className="lp-p">
              Respondé unos datos y te escribo por WhatsApp con precio y fecha. Toma 2 minutos.
            </p>
          </Reveal>

          <div className="lp-form-wrap">
            <Reveal className="lp-recap">
              <span>
                <IconCheck /> Gs. 850.000
              </span>
              <span>
                <IconCheck /> Online en 4 a 7 días
              </span>
              <span>
                <IconCheck /> 6 meses de hosting
              </span>
            </Reveal>

            <Reveal delay={0.06}>
              <form className="lp-form" onSubmit={submit}>
                <div className="lp-f">
                  <label htmlFor="lp-name">
                    Tu nombre <i>*</i>
                  </label>
                  <input id="lp-name" name="name" required placeholder="Ej. María González" />
                </div>
                <div className="lp-f">
                  <label htmlFor="lp-business">
                    Tu negocio o rubro <i>*</i>
                  </label>
                  <input
                    id="lp-business"
                    name="business"
                    required
                    placeholder="Ej. peluquería, gimnasio, estudio contable"
                  />
                </div>
                <div className="lp-f">
                  <label htmlFor="lp-need">
                    ¿Qué querés resolver? <i>*</i>
                  </label>
                  <select id="lp-need" name="need" required defaultValue="">
                    <option value="" disabled>
                      Elegí una opción
                    </option>
                    <option>Landing page: mostrar mi negocio y recibir consultas (Gs. 850.000)</option>
                    <option>Vender un servicio o curso con una página enfocada en eso</option>
                    <option>Un sitio con varias secciones y catálogo de productos</option>
                    <option>Tienda online: vender productos con carrito y pagos</option>
                    <option>Un sistema para mi negocio: reservas, stock, clientes o pedidos</option>
                    <option>No sé qué me conviene, quiero que me asesores</option>
                  </select>
                </div>
                <div className="lp-f-row">
                  <div className="lp-f">
                    <label htmlFor="lp-budget">
                      ¿Cuánto pensás invertir? <i>*</i>
                    </label>
                    <select id="lp-budget" name="budget" required defaultValue="">
                      <option value="" disabled>
                        Elegí un rango
                      </option>
                      <option>Hasta Gs. 850.000 (la landing en oferta)</option>
                      <option>Entre Gs. 850.000 y 2.000.000</option>
                      <option>Entre Gs. 2.000.000 y 5.000.000</option>
                      <option>Más de Gs. 5.000.000</option>
                      <option>Todavía no lo tengo definido</option>
                    </select>
                  </div>
                  <div className="lp-f">
                    <label htmlFor="lp-timeline">
                      ¿Para cuándo? <i>*</i>
                    </label>
                    <select id="lp-timeline" name="timeline" required defaultValue="">
                      <option value="" disabled>
                        Elegí una opción
                      </option>
                      <option>Lo necesito ya</option>
                      <option>Este mes</option>
                      <option>En 1 a 3 meses</option>
                      <option>Solo estoy averiguando</option>
                    </select>
                  </div>
                </div>
                <div className="lp-f">
                  <label htmlFor="lp-details">
                    Algo más que quieras contarme <em>(opcional)</em>
                  </label>
                  <textarea
                    id="lp-details"
                    name="details"
                    placeholder="Qué vendés o qué servicio ofrecés, y qué te gustaría lograr."
                  />
                </div>
                <button type="submit" className="lp-btn block">
                  {sent ? "Reenviar por WhatsApp" : "Enviar y hablar por WhatsApp"} <IconWa />
                </button>
                {sent && (
                  <p className="lp-form-ok">
                    Listo. Se abrió WhatsApp con tus datos. Si no se abrió, tocá el botón otra vez.
                  </p>
                )}
                <p className="lp-form-note">
                  Se abre WhatsApp con tus datos ya cargados. Sin llamadas automáticas ni spam.
                </p>
              </form>
            </Reveal>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="lp-footer">
        <div className="lp-wrap lp-footer-grid">
          <div className="lp-footer-brand">
            <div className="lp-brand">
              <span className="lp-brand-badge">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/favicon.png" alt="" />
              </span>
              <span className="lp-brand-text">
                <b>
                  Solva<span>Tech</span>
                </b>
                <i>Tecnología &amp; desarrollo web</i>
              </span>
            </div>
            <p className="lp-footer-tag">
              Páginas web y sistemas a medida en Paraguay. Trabajás directo conmigo, sin
              intermediarios.
            </p>
          </div>

          <div className="lp-footer-col">
            <h4>Contacto</h4>
            <a
              href={getWhatsAppLink("Hola, quiero consultar por una página web para mi negocio.")}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent("landing_cta_click", { source: "footer" })}
            >
              <IconWa /> WhatsApp
            </a>
            <a href="mailto:solvatech.dev@gmail.com">
              <IconMail /> solvatech.dev@gmail.com
            </a>
          </div>

          <div className="lp-footer-col">
            <h4>Ir a</h4>
            <a href="#trabajos">Trabajos</a>
            <a href="#precio">Precio</a>
            <a href="#formulario">Pedir propuesta</a>
            <Link href="/es">Sitio principal</Link>
          </div>
        </div>
        <div className="lp-wrap">
          <div className="lp-footer-legal">
            © {new Date().getFullYear()} SolvaTech · Desarrollo web en Paraguay
          </div>
        </div>
      </footer>

      <motion.div
        className="lp-sticky"
        initial={false}
        animate={{ y: showSticky ? 0 : 140 }}
        transition={{ duration: 0.35, ease: EASE }}
      >
        <div className="info">
          <b>Gs. 850.000</b>
          <small>Online en 4 a 7 días</small>
        </div>
        <a href="#formulario" onClick={() => trackEvent("landing_cta_click", { source: "sticky" })}>
          Quiero mi web
        </a>
      </motion.div>
    </main>
  );
}
