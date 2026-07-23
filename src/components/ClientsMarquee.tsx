"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { caseStudiesData } from "@/lib/case-studies-data";

// Ahora que el panel respeta el margen del sitio (max-width contenido, no
// 100vw), alcanza con cubrir ese ancho, no la pantalla completa. Con esto
// se necesitan muchas menos repeticiones de los mismos 2 logos para lograr
// un loop continuo (como una rueda: al llegar a -50% el segundo set ya
// cubre todo el ancho visible, sin huecos).
const MIN_ITEMS_FOR_SMOOTH_LOOP = 8;
const CHIP_WIDTH = 148;
const CHIP_HEIGHT = 64;
const CHIP_GAP = 28;
const PX_PER_SECOND = 40;

// Versión mobile: antes reusaba la misma fila única de desktop, pero con
// chips de 148px de ancho en una pantalla angosta apenas entraba UNO a la
// vez. Acá va más chico y en dos filas que se desplazan en direcciones
// opuestas (mismo truco que TestimonialsMarquee: mismo @keyframes,
// animation-direction: reverse en la segunda), para que entren ~2 columnas
// x 2 filas de una. Solo se muestra por debajo de 641px (ver media query);
// arriba de eso se ve la fila única de desktop, sin cambios.
const MOBILE_CHIP_WIDTH = 118;
const MOBILE_CHIP_HEIGHT = 50;
const MOBILE_CHIP_GAP = 12;
const MOBILE_PX_PER_SECOND = 26;

const theme = {
    accent: "#00d9ff",
    accentDark: "#0099cc",
    accentGlow: "rgba(0, 217, 255, 0.5)",
};

function LogoChip({ item, width, height }: { item: { id: string; businessName: string; logo?: string }; width: number; height: number }) {
    return (
        <div
            className="clients-marquee-chip"
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                width: `${width}px`,
                height: `${height}px`,
                borderRadius: "12px",
                background: "#ffffff",
                padding: "12px 16px",
                boxSizing: "border-box",
            }}
            title={item.businessName}
        >
            <div style={{ position: "relative", width: "100%", height: "100%" }}>
                <Image src={item.logo as string} alt={`Logo ${item.businessName}`} fill sizes="150px" style={{ objectFit: "contain" }} />
            </div>
        </div>
    );
}

export default function ClientsMarquee() {
    const { t } = useLanguage();

    const confirmedLogos = caseStudiesData.filter((c) => c.visible && c.logo);

    if (confirmedLogos.length === 0) return null;

    // "SolvaTech" se resalta aparte con degradé, el resto queda en texto plano.
    const trustedByPrefix = t("hero.trustedByLabel").replace("SolvaTech", "").trim() + " ";

    // Repetimos la lista (sin inventar clientes nuevos) hasta tener piezas
    // suficientes para que el marquee se sienta continuo, no vacío.
    const track: typeof confirmedLogos = [];
    while (track.length < MIN_ITEMS_FOR_SMOOTH_LOOP) {
        track.push(...confirmedLogos);
    }

    const setWidth = track.length * (CHIP_WIDTH + CHIP_GAP);
    const durationSeconds = Math.round(setWidth / PX_PER_SECOND);

    // Fila 2 del mobile arranca desplazada un puesto para que no sea un
    // espejo exacto de la fila 1 (mismo truco que en TestimonialsMarquee).
    const mobileTrack2 = [...track.slice(1), track[0]];
    const mobileSetWidth = track.length * (MOBILE_CHIP_WIDTH + MOBILE_CHIP_GAP);
    const mobileDurationSeconds = Math.round(mobileSetWidth / MOBILE_PX_PER_SECOND);

    return (
        // Todo el layout crítico (ancho, centrado, padding) va como inline
        // style explícito, no como clases de Tailwind, para que se aplique
        // siempre sin depender de nada externo.
        <motion.div
            className="clients-marquee-wrap"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5, ease: "easeOut" }}
            style={{
                width: "100%",
                boxSizing: "border-box",
                marginTop: "72px",
                marginBottom: "16px",
                paddingLeft: "clamp(16px, 4vw, 32px)",
                paddingRight: "clamp(16px, 4vw, 32px)",
                display: "flex",
                justifyContent: "center",
            }}
        >
            <div
                style={{
                    position: "relative",
                    width: "100%",
                    maxWidth: "1300px",
                    marginLeft: "auto",
                    marginRight: "auto",
                    borderRadius: "24px",
                    overflow: "hidden",
                    boxSizing: "border-box",
                    background: "linear-gradient(180deg, rgba(0, 217, 255, 0.1), rgba(0, 153, 204, 0.06) 50%, rgba(0, 217, 255, 0.1))",
                    border: "1px solid rgba(0, 217, 255, 0.35)",
                    boxShadow: "0 0 40px rgba(0, 217, 255, 0.1) inset, 0 20px 45px rgba(0,0,0,0.35)",
                }}
            >
                {/* Resplandor ambiental animado, para que el panel se sienta vivo */}
                <div className="clients-marquee-glow" />

                <div
                    className="clients-marquee-inner-pad"
                    style={{
                        position: "relative",
                        width: "100%",
                        boxSizing: "border-box",
                        padding: "32px clamp(20px, 4vw, 40px)",
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "16px",
                            marginBottom: "26px",
                        }}
                    >
                        <span
                            style={{
                                height: "1px",
                                width: "clamp(24px, 6vw, 64px)",
                                background: `linear-gradient(90deg, transparent, ${theme.accent}80)`,
                            }}
                        />
                        <p
                            style={{
                                textAlign: "center",
                                fontSize: "14px",
                                fontWeight: 700,
                                letterSpacing: "0.04em",
                                margin: 0,
                                color: "rgba(255,255,255,0.75)",
                                whiteSpace: "nowrap",
                            }}
                        >
                            {trustedByPrefix}
                            <span
                                style={{
                                    fontWeight: 900,
                                    background: `linear-gradient(135deg, ${theme.accent}, ${theme.accentDark})`,
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent",
                                    filter: `drop-shadow(0 0 12px ${theme.accentGlow})`,
                                }}
                            >
                                SolvaTech
                            </span>
                        </p>
                        <span
                            style={{
                                height: "1px",
                                width: "clamp(24px, 6vw, 64px)",
                                background: `linear-gradient(90deg, ${theme.accent}80, transparent)`,
                            }}
                        />
                    </div>

                    {/* Fila única (desktop, oculta en mobile vía CSS) */}
                    <div className="clients-marquee-mask clients-marquee-desktop-only" style={{ position: "relative", width: "100%", padding: "10px 0" }}>
                        <div className="clients-marquee-fade clients-marquee-fade-left" />
                        <div className="clients-marquee-fade clients-marquee-fade-right" />

                        <div
                            className="clients-marquee-track"
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                animationDuration: `${durationSeconds}s`,
                            }}
                        >
                            {[...track, ...track].map((item, index) => (
                                <LogoChip key={`${item.id}-${index}`} item={item} width={CHIP_WIDTH} height={CHIP_HEIGHT} />
                            ))}
                        </div>
                    </div>

                    {/* Dos filas en direcciones opuestas (mobile, oculta en
                        desktop vía CSS) — chips más chicos, entran ~2x2 de
                        una en vez de un solo logo a la vez. */}
                    <div className="clients-marquee-mobile-only" style={{ display: "none", flexDirection: "column", gap: "10px" }}>
                        <div className="clients-marquee-mask" style={{ position: "relative", width: "100%", padding: "6px 0" }}>
                            <div className="clients-marquee-fade clients-marquee-fade-left" />
                            <div className="clients-marquee-fade clients-marquee-fade-right" />
                            <div
                                className="clients-marquee-track-mobile"
                                style={{ display: "flex", justifyContent: "center", animationDuration: `${mobileDurationSeconds}s` }}
                            >
                                {[...track, ...track].map((item, index) => (
                                    <LogoChip key={`m1-${item.id}-${index}`} item={item} width={MOBILE_CHIP_WIDTH} height={MOBILE_CHIP_HEIGHT} />
                                ))}
                            </div>
                        </div>
                        <div className="clients-marquee-mask" style={{ position: "relative", width: "100%", padding: "6px 0" }}>
                            <div className="clients-marquee-fade clients-marquee-fade-left" />
                            <div className="clients-marquee-fade clients-marquee-fade-right" />
                            <div
                                className="clients-marquee-track-mobile clients-marquee-track-mobile-reverse"
                                style={{ display: "flex", justifyContent: "center", animationDuration: `${mobileDurationSeconds}s` }}
                            >
                                {[...mobileTrack2, ...mobileTrack2].map((item, index) => (
                                    <LogoChip key={`m2-${item.id}-${index}`} item={item} width={MOBILE_CHIP_WIDTH} height={MOBILE_CHIP_HEIGHT} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* jsx global: .clients-marquee-chip ahora la usa LogoChip, un
                componente hijo — con alcance local (<style jsx> a secas)
                esas reglas no le llegarían, igual que pasó con HeroImageGrid. */}
            <style jsx global>{`
                .clients-marquee-glow {
                    position: absolute;
                    top: 50%;
                    left: -10%;
                    width: 320px;
                    height: 320px;
                    border-radius: 50%;
                    background: radial-gradient(circle, rgba(0, 217, 255, 0.18), transparent 70%);
                    filter: blur(50px);
                    transform: translateY(-50%);
                    pointer-events: none;
                    animation: clients-marquee-glow-move 14s ease-in-out infinite;
                }
                @keyframes clients-marquee-glow-move {
                    0%,
                    100% {
                        left: -10%;
                    }
                    50% {
                        left: 90%;
                    }
                }
                .clients-marquee-mask {
                    /* Solo recorta horizontalmente (necesario para el loop infinito).
                       Vertical queda visible para que el zoom/lift del hover no se corte. */
                    overflow-x: hidden;
                    overflow-y: visible;
                }
                .clients-marquee-fade {
                    position: absolute;
                    top: 0;
                    bottom: 0;
                    width: 56px;
                    z-index: 5;
                    pointer-events: none;
                }
                .clients-marquee-fade-left {
                    left: 0;
                    background: linear-gradient(90deg, #071019, transparent);
                }
                .clients-marquee-fade-right {
                    right: 0;
                    background: linear-gradient(270deg, #071019, transparent);
                }
                .clients-marquee-track {
                    align-items: center;
                    gap: ${CHIP_GAP}px;
                    width: max-content;
                    animation-name: clients-marquee-scroll;
                    animation-timing-function: linear;
                    animation-iteration-count: infinite;
                    will-change: transform;
                }
                .clients-marquee-mask:hover .clients-marquee-track,
                .clients-marquee-mask:hover .clients-marquee-track-mobile {
                    animation-play-state: paused;
                }
                .clients-marquee-track-mobile {
                    align-items: center;
                    gap: ${MOBILE_CHIP_GAP}px;
                    width: max-content;
                    animation-name: clients-marquee-scroll;
                    animation-timing-function: linear;
                    animation-iteration-count: infinite;
                    animation-direction: normal;
                    will-change: transform;
                }
                .clients-marquee-track-mobile-reverse {
                    animation-direction: reverse;
                }
                .clients-marquee-mobile-only {
                    display: none;
                }
                @media (max-width: 640px) {
                    .clients-marquee-desktop-only {
                        display: none !important;
                    }
                    .clients-marquee-mobile-only {
                        display: flex !important;
                    }
                    /* Panel más compacto: menos aire arriba/abajo y a los
                       costados para que entre más de entrada en pantallas
                       chicas (referencia ~390x844 para abajo). */
                    .clients-marquee-wrap {
                        margin-top: 40px !important;
                        margin-bottom: 8px !important;
                    }
                    .clients-marquee-inner-pad {
                        padding: 20px 16px !important;
                    }
                }
                .clients-marquee-chip {
                    /* Base: color completo. En touch/mobile no hay hover, así que
                       queda siempre así, normal, sin apagar nada. */
                    box-shadow: 0 4px 14px rgba(0, 0, 0, 0.35);
                    transition: filter 0.35s ease, opacity 0.35s ease, transform 0.35s ease, box-shadow 0.35s ease;
                }
                /* El apagado/iluminado en hover solo aplica en dispositivos con
                   mouse de verdad (hover: hover). En mobile/touch se ve normal. */
                @media (hover: hover) and (pointer: fine) {
                    .clients-marquee-chip {
                        filter: grayscale(0.5) brightness(0.92) contrast(0.95);
                        opacity: 0.82;
                    }
                    .clients-marquee-chip:hover {
                        filter: grayscale(0) brightness(1) contrast(1);
                        opacity: 1;
                        transform: translateY(-3px) scale(1.06);
                        box-shadow: 0 10px 26px rgba(0, 217, 255, 0.4), 0 0 0 2px rgba(0, 217, 255, 0.55);
                    }
                }
                @keyframes clients-marquee-scroll {
                    from {
                        transform: translateX(0);
                    }
                    to {
                        transform: translateX(-50%);
                    }
                }
                @media (prefers-reduced-motion: reduce) {
                    .clients-marquee-track,
                    .clients-marquee-track-mobile,
                    .clients-marquee-glow {
                        animation: none;
                    }
                }
            `}</style>
        </motion.div>
    );
}
