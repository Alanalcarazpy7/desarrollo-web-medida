"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { useLanguage } from "@/context/LanguageContext";
import { getWhatsAppLink, whatsappMessages } from "@/lib/whatsapp";

const Navbar = dynamic(() => import("@/components/Navbar"));
const Footer = dynamic(() => import("@/components/Footer"), { ssr: true });
const BackgroundParticles = dynamic(() => import("@/components/BackgroundParticles"));

const accent = "#00d9ff";
const accentDark = "#0099cc";

export default function NotFound() {
  const { language } = useLanguage();
  const isEs = language !== "en";
  const base = `/${isEs ? "es" : "en"}`;

  const dict = isEs
    ? {
        title: "No encontramos esta página",
        desc: "El enlace puede estar mal escrito, la página se movió o ya no existe. Estos accesos te pueden servir:",
        links: [
          { label: "Inicio", href: base },
          { label: "Servicios", href: `${base}/servicios` },
          { label: "Desarrollo web en Paraguay", href: `${base}/servicios/desarrollo-web-paraguay` },
          { label: "Proyectos", href: `${base}/proyectos` },
          { label: "Blog", href: `${base}/blog` },
        ],
        home: "Volver al inicio",
        wa: "Escribinos por WhatsApp",
      }
    : {
        title: "We couldn't find this page",
        desc: "The link may be misspelled, the page moved, or it no longer exists. These links might help:",
        links: [
          { label: "Home", href: base },
          { label: "Services", href: `${base}/servicios` },
          { label: "Web development in Paraguay", href: `${base}/servicios/desarrollo-web-paraguay` },
          { label: "Projects", href: `${base}/projects` },
          { label: "Blog", href: `${base}/blog` },
        ],
        home: "Back to home",
        wa: "Message us on WhatsApp",
      };

  const waMsg = whatsappMessages[isEs ? "es" : "en"].general;

  return (
    <main
      style={{
        minHeight: "100vh",
        backgroundColor: "#000",
        color: "#fff",
        position: "relative",
        overflowX: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <BackgroundParticles />
      <Navbar />

      <section
        style={{
          position: "relative",
          zIndex: 10,
          flex: 1,
          width: "100%",
          maxWidth: "640px",
          margin: "0 auto",
          padding: "160px 24px 100px",
          textAlign: "center",
        }}
      >
        <p
          style={{
            fontSize: "clamp(4rem, 16vw, 8rem)",
            fontWeight: 900,
            lineHeight: 1,
            margin: 0,
            background: `linear-gradient(135deg, ${accent}, ${accentDark})`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          404
        </p>
        <h1 style={{ fontSize: "clamp(1.4rem, 4vw, 2rem)", fontWeight: 800, margin: "18px 0 12px" }}>{dict.title}</h1>
        <p style={{ color: "#9ca3af", lineHeight: 1.7, margin: "0 auto 28px", maxWidth: "440px" }}>{dict.desc}</p>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", justifyContent: "center", marginBottom: "36px" }}>
          {dict.links.map((l) => (
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
            href={base}
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
            {dict.home}
          </Link>
          <a
            href={getWhatsAppLink(waMsg)}
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
            {dict.wa}
          </a>
        </div>
      </section>

      <Footer />
    </main>
  );
}
