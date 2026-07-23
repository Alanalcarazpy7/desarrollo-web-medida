"use client";

import { useState } from "react";
import Image from "next/image";
import { testimonialsData, sampleTestimonialsData, Testimonial } from "@/lib/testimonials-data";

const theme = {
    accent: "#00d9ff",
    accentDark: "#0099cc",
    star: "#ffb800",
};

// Misma técnica probada en ClientsMarquee (loop -50% con set duplicado,
// fundido de bordes con gradientes reales, pausa en hover), ahora en dos
// filas: la de arriba corre en reversa (izquierda -> derecha), la de abajo
// en el sentido normal (derecha -> izquierda).
const MIN_ITEMS_FOR_SMOOTH_LOOP = 6;
// Valor de referencia SOLO para calcular la duración de la animación; el
// ancho visual real de la card lo define el CSS (responsive por breakpoint).
const CARD_WIDTH_REF = 300;
const CARD_GAP_REF = 16;
const PX_PER_SECOND = 30;

function StarRating({ rating }: { rating?: number }) {
    if (!rating) return null;
    return (
        <div style={{ display: "flex", gap: "3px", marginBottom: "10px" }}>
            {[1, 2, 3, 4, 5].map((n) => (
                <svg
                    key={n}
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill={n <= rating ? theme.star : "none"}
                    stroke={theme.star}
                    strokeWidth={1.5}
                    style={n <= rating ? { filter: `drop-shadow(0 0 4px ${theme.star}80)` } : undefined}
                >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
            ))}
        </div>
    );
}

// Una sola estructura de card para TODOS los testimonios (reales y de
// prueba): mismo layout, mismo tamaño. Lo único que cambia por ítem es el
// contenido en sí (logo/iniciales, estrellas si hay rating confirmado, y el
// link "Ver sitio" si hay projectUrl) — nunca el diseño.
// Umbral de caracteres a partir del cual el texto casi seguro no entra en el
// clamp de 4 líneas a este ancho de card — evita mostrar un botón "Ver más"
// que no haría nada en citas cortas que ya se ven completas.
const LONG_QUOTE_THRESHOLD = 170;

function MarqueeCard({ item, t }: { item: Testimonial; t: (k: string) => string }) {
    // Placeholder ético: si todavía no hay texto confirmado por el cliente
    // (isApproved false), NUNCA se inventa una cita — se muestra este aviso
    // en su lugar. Con los datos actuales (2 reales confirmados + 5 de
    // prueba) esto no se dispara, pero queda listo para el próximo cliente
    // real que aún no haya aprobado su testimonio.
    const pendingCopy = item.status === "published" ? t("testimonials.pendingText") : t("testimonials.developmentText");
    const quoteText = item.isApproved && item.testimonialText ? item.testimonialText : pendingCopy;
    const isLong = quoteText.length > LONG_QUOTE_THRESHOLD;
    const [expanded, setExpanded] = useState(false);

    return (
        <div
            className="testimonials-marquee-card"
            style={{
                position: "relative",
                flexShrink: 0,
                display: "flex",
                flexDirection: "column",
                boxSizing: "border-box",
                padding: "18px 20px 16px",
                borderRadius: "18px",
                border: "1px solid transparent",
                background:
                    "linear-gradient(160deg, rgba(24,24,34,0.92), rgba(12,12,18,0.85)) padding-box, " +
                    "linear-gradient(135deg, rgba(0,217,255,0.45), rgba(255,255,255,0.06) 45%, rgba(0,217,255,0.22)) border-box",
                boxShadow: "0 14px 34px rgba(0,0,0,0.32)",
                backdropFilter: "blur(16px)",
            }}
        >
            <div
                aria-hidden
                style={{
                    position: "absolute",
                    top: 0,
                    left: "20px",
                    right: "20px",
                    height: "1px",
                    background: `linear-gradient(90deg, transparent, ${theme.accent}60, transparent)`,
                }}
            />

            <div style={{ display: "flex", alignItems: "center", gap: "11px", marginBottom: "10px" }}>
                {item.logo ? (
                    <div
                        style={{
                            display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "11px", flexShrink: 0,
                            width: 40, height: 40, background: "#fff", padding: 6,
                            border: `1px solid ${theme.accent}35`, boxShadow: `0 0 0 3px rgba(0,217,255,0.06)`,
                        }}
                    >
                        <Image src={item.logo} alt={item.businessName} width={40} height={40} style={{ objectFit: "contain", width: "100%", height: "100%" }} />
                    </div>
                ) : (
                    <div
                        style={{
                            display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "11px", flexShrink: 0,
                            width: 40, height: 40, color: "#000", fontWeight: 900, fontSize: "12px",
                            background: `linear-gradient(135deg, ${theme.accent}, ${theme.accentDark})`,
                            boxShadow: `0 0 0 3px rgba(0,217,255,0.12)`,
                        }}
                    >
                        {item.initials}
                    </div>
                )}
                <div style={{ minWidth: 0, flex: 1 }}>
                    {/* Sin recorte ni "...": el nombre siempre se ve completo,
                        envolviendo a otra línea si hace falta. */}
                    <div style={{ color: "#fff", fontWeight: 700, fontSize: "13.5px", lineHeight: 1.28 }}>
                        {item.clientName ? `${item.clientName} · ` : ""}
                        {item.businessName}
                    </div>
                    <div style={{ color: theme.accent, fontSize: "11px", fontWeight: 600, marginTop: "2px" }}>{item.projectType}</div>
                </div>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ opacity: 0.22, flexShrink: 0 }}>
                    <path d="M7 7h4v5.5c0 2.5-1.5 4-4 4.5v-2c1.2-.4 2-1.2 2-2.5H7V7zm7 0h4v5.5c0 2.5-1.5 4-4 4.5v-2c1.2-.4 2-1.2 2-2.5h-2V7z" fill={theme.accent} />
                </svg>
            </div>

            <StarRating rating={item.rating} />

            {/* Clamp uniforme a 4 líneas: todas las cards arrancan con la
                misma altura, sin que una cita larga desarme la fila. Nunca se
                pierde texto en silencio con "...": si no entra, aparece el
                botón "Ver más" para expandirla del todo. */}
            <p
                style={{
                    color: "#dde3ec",
                    fontSize: "13.5px",
                    fontWeight: 400,
                    lineHeight: 1.6,
                    flex: 1,
                    margin: 0,
                    ...(expanded
                        ? {}
                        : { display: "-webkit-box", WebkitLineClamp: 4, WebkitBoxOrient: "vertical" as const, overflow: "hidden" }),
                }}
            >
                {quoteText}
            </p>

            {(isLong || item.projectUrl) && (
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "10px", marginTop: "14px" }}>
                    {isLong ? (
                        <button
                            type="button"
                            onClick={(e) => {
                                e.stopPropagation();
                                setExpanded((v) => !v);
                            }}
                            style={{
                                background: "none", border: "none", padding: 0, cursor: "pointer",
                                fontSize: "11px", fontWeight: 700, color: theme.accent, textTransform: "uppercase", letterSpacing: "0.04em",
                            }}
                        >
                            {expanded ? t("testimonials.viewLess") : t("testimonials.viewMore")}
                        </button>
                    ) : (
                        <span />
                    )}
                    {item.projectUrl && (
                        <a
                            href={item.projectUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="testimonials-marquee-visit-btn"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {t("caseStudies.viewSite")}
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                                <path d="M7 17L17 7M17 7H9M17 7V15" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </a>
                    )}
                </div>
            )}
        </div>
    );
}

function MarqueeRow({ t, reverse, durationSeconds, track }: { t: (k: string) => string; reverse: boolean; durationSeconds: number; track: Testimonial[] }) {
    return (
        // overflow-x hidden (mascara el scroll infinito) / overflow-y visible
        // (para que el lift + glow del hover no se recorte arriba/abajo de la
        // fila) — misma técnica que ya funciona en ClientsMarquee.
        <div className="testimonials-marquee-mask" style={{ position: "relative", width: "100%", overflowX: "hidden", overflowY: "visible", paddingTop: "6px", paddingBottom: "6px" }}>
            <div className="testimonials-marquee-fade testimonials-marquee-fade-left" />
            <div className="testimonials-marquee-fade testimonials-marquee-fade-right" />

            <div
                className={reverse ? "testimonials-marquee-track testimonials-marquee-track-reverse" : "testimonials-marquee-track"}
                style={{ animationDuration: `${durationSeconds}s` }}
            >
                {[...track, ...track].map((item, index) => (
                    <MarqueeCard key={`${item.id}-${index}`} item={item} t={t} />
                ))}
            </div>
        </div>
    );
}

// Fuente de datos combinada: casos reales primero, y al final los de prueba
// (sampleTestimonialsData) para tener suficientes cards y probar el diseño
// a dos filas. El coverflow de video NO usa este combinado: solo muestra
// los casos reales.
const allTextTestimonials: Testimonial[] = [...testimonialsData, ...sampleTestimonialsData];

export default function TestimonialsMarquee({ t }: { t: (k: string) => string }) {
    if (allTextTestimonials.length === 0) return null;

    const track: Testimonial[] = [];
    while (track.length < MIN_ITEMS_FOR_SMOOTH_LOOP) {
        track.push(...allTextTestimonials);
    }
    // La segunda fila arranca desplazada para que no se vea como un espejo
    // exacto de la primera.
    const trackShifted = [...track.slice(1), track[0]];

    const setWidth = track.length * (CARD_WIDTH_REF + CARD_GAP_REF);
    const durationSeconds = Math.round(setWidth / PX_PER_SECOND);

    return (
        <div style={{ width: "100%", maxWidth: "1152px", margin: "0 auto", boxSizing: "border-box", padding: "16px 24px", display: "flex", flexDirection: "column", gap: "24px" }}>
            <MarqueeRow t={t} reverse={true} durationSeconds={durationSeconds} track={track} />
            <MarqueeRow t={t} reverse={false} durationSeconds={durationSeconds} track={trackShifted} />

            <style jsx global>{`
                .testimonials-marquee-fade {
                    position: absolute;
                    top: 0;
                    bottom: 0;
                    width: 90px;
                    z-index: 5;
                    pointer-events: none;
                }
                .testimonials-marquee-fade-left {
                    left: 0;
                    background: linear-gradient(90deg, #030507, transparent);
                }
                .testimonials-marquee-fade-right {
                    right: 0;
                    background: linear-gradient(270deg, #030507, transparent);
                }
                .testimonials-marquee-track {
                    display: flex;
                    /* flex-start (no stretch): cada card muestra su cita
                       completa sin recortes, así que la altura varía según
                       el largo del texto real. Forzar la misma altura para
                       todas dejaría a las cards cortas con espacio vacío. */
                    align-items: flex-start;
                    width: max-content;
                    gap: 14px;
                    animation-name: testimonials-marquee-scroll;
                    animation-timing-function: linear;
                    animation-iteration-count: infinite;
                    animation-direction: normal;
                    will-change: transform;
                }
                .testimonials-marquee-track-reverse {
                    animation-direction: reverse;
                }
                .testimonials-marquee-mask:hover .testimonials-marquee-track {
                    animation-play-state: paused;
                }
                .testimonials-marquee-card {
                    /* Rectángulos horizontales, no cuadrados: ancho fijo por
                       breakpoint (no vw, ya que el contenedor está limitado a
                       1152px). 300px en desktop se eligió para que 3 cards +
                       gaps quepan incluso en el viewport más angosto de ese
                       breakpoint (1024px, contenedor visible ~976px). */
                    width: 260px;
                    transition: border-color 0.3s ease, transform 0.3s ease;
                }
                @media (min-width: 480px) {
                    .testimonials-marquee-card {
                        width: 280px;
                    }
                }
                @media (min-width: 1024px) {
                    .testimonials-marquee-track {
                        gap: 16px;
                    }
                    .testimonials-marquee-card {
                        width: 300px;
                    }
                }
                .testimonials-marquee-card:hover {
                    border-color: rgba(0, 217, 255, 0.55) !important;
                    box-shadow: 0 18px 40px rgba(0,0,0,0.4), 0 0 26px rgba(0,217,255,0.16);
                    transform: translateY(-5px);
                }
                .testimonials-marquee-visit-btn {
                    display: inline-flex;
                    align-items: center;
                    gap: 6px;
                    padding: 8px 14px;
                    border-radius: 999px;
                    font-size: 11px;
                    font-weight: 700;
                    text-transform: uppercase;
                    letter-spacing: 0.04em;
                    color: ${theme.accent};
                    background: rgba(0, 217, 255, 0.1);
                    border: 1px solid rgba(0, 217, 255, 0.35);
                    text-decoration: none;
                    transition: background 0.25s ease, color 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease, transform 0.25s ease;
                }
                .testimonials-marquee-visit-btn svg {
                    transition: transform 0.25s ease;
                }
                .testimonials-marquee-visit-btn:hover {
                    background: ${theme.accent};
                    color: #061014;
                    border-color: ${theme.accent};
                    box-shadow: 0 8px 22px rgba(0, 217, 255, 0.35);
                    transform: translateY(-2px);
                }
                .testimonials-marquee-visit-btn:hover svg {
                    transform: translate(2px, -2px);
                }
                @keyframes testimonials-marquee-scroll {
                    from {
                        transform: translateX(0);
                    }
                    to {
                        transform: translateX(-50%);
                    }
                }
                @media (prefers-reduced-motion: reduce) {
                    .testimonials-marquee-track {
                        animation: none;
                    }
                }
            `}</style>
        </div>
    );
}
