"use client";

import { useState, useEffect, useCallback, useRef, type CSSProperties } from "react";
import Image from "next/image";
import { testimonialsData, Testimonial } from "@/lib/testimonials-data";

const theme = {
    accent: "#00d9ff",
    accentDark: "#0099cc",
    accentGlow: "rgba(0, 217, 255, 0.5)",
};

// Motor 3D adaptado de un coverflow de referencia (Originkit), sacando toda la
// plomería específica de Framer (props expuestas como controles de editor,
// useIsStaticRenderer, COMPONENT_DEFAULTS) y dejando solo la matemática del
// efecto: la card activa queda de frente, las vecinas se inclinan hacia atrás
// en perspectiva. Reskin completo con la identidad de SolvaTech.
const PERSPECTIVE = 1700;
const SCALE_STEP = 0.16;
const MAX_VISIBLE = 2;
const DEPTH = 260;
const CARD_WIDTH = 300;
const CARD_HEIGHT = 460;
const GAP_PX = 250;
const TILT = 8;
const SIDE_TILT = 6;
const TRANSITION_MS = 600;
const AUTOPLAY_MS = 5000;

function CoverflowCard({ item, t }: { item: Testimonial; t: (k: string) => string }) {
    const [isPlaying, setIsPlaying] = useState(false);
    const isPublished = item.status === "published";

    return (
        <div className="relative w-full h-full flex flex-col">
            {item.videoUrl && isPlaying ? (
                <video
                    src={item.videoUrl}
                    poster={item.screenshot}
                    controls
                    autoPlay
                    playsInline
                    preload="metadata"
                    className="absolute inset-0 w-full h-full object-cover"
                />
            ) : (
                <>
                    <div
                        className="absolute inset-0"
                        style={{
                            background: item.screenshot
                                ? undefined
                                : "linear-gradient(160deg, #0a0a0f, #12121a)",
                        }}
                    >
                        {item.screenshot && (
                            // El screenshot es una captura ancha de escritorio; al recortarla
                            // "cover" dentro de una card angosta y vertical, el texto queda
                            // cortado a mitad de palabra y se ve roto. Por eso va desenfocada:
                            // aporta color/textura de fondo sin pretender ser texto legible.
                            <Image
                                src={item.screenshot}
                                alt={`${item.businessName}`}
                                fill
                                sizes="300px"
                                style={{ objectFit: "cover", objectPosition: "center 20%", opacity: 0.4, filter: "blur(6px) saturate(1.1)", transform: "scale(1.15)" }}
                            />
                        )}
                        <div
                            className="absolute inset-0"
                            style={{ background: "linear-gradient(180deg, rgba(5,5,10,0.35) 0%, rgba(5,5,10,0.75) 75%, rgba(5,5,10,0.92) 100%)" }}
                        />
                    </div>

                    <div className="relative flex-1 flex flex-col items-center justify-center gap-5 px-6 text-center">
                        {item.logo ? (
                            <div
                                className="flex items-center justify-center rounded-2xl"
                                style={{ width: "88px", height: "88px", background: "#ffffff", padding: "14px", boxShadow: "0 8px 24px rgba(0,0,0,0.4)" }}
                            >
                                <Image src={item.logo} alt={item.businessName} width={68} height={68} style={{ objectFit: "contain", width: "100%", height: "100%" }} />
                            </div>
                        ) : (
                            <div
                                className="flex items-center justify-center rounded-2xl font-black text-2xl"
                                style={{ width: "88px", height: "88px", color: "#000", background: `linear-gradient(135deg, ${theme.accent}, ${theme.accentDark})` }}
                            >
                                {item.initials}
                            </div>
                        )}

                        {item.videoUrl ? (
                            <button
                                type="button"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setIsPlaying(true);
                                }}
                                className="flex items-center justify-center rounded-full transition-transform duration-300 hover:scale-110"
                                style={{ width: "60px", height: "60px", background: theme.accent, boxShadow: `0 0 30px ${theme.accentGlow}` }}
                                aria-label={t("testimonials.playVideo")}
                            >
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="#000"><path d="M8 5v14l11-7z" /></svg>
                            </button>
                        ) : (
                            <span
                                className="text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-full"
                                style={{ color: theme.accent, border: `1px solid ${theme.accent}45`, background: `${theme.accent}0d` }}
                            >
                                {t("testimonials.videoUpcoming")}
                            </span>
                        )}
                    </div>
                </>
            )}

            <div className="relative pointer-events-none flex flex-col gap-2 p-5">
                <div className="min-w-0">
                    {/* Nombres largos (ej. "Academia GPS / La Trilogía TOL") pasan a
                        2 líneas en vez de cortarse a mitad de palabra en 1 sola. */}
                    <div
                        className="text-white font-bold leading-tight"
                        style={{
                            fontSize: "15px",
                            textShadow: "0 2px 8px rgba(0,0,0,0.6)",
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                        }}
                    >
                        {item.clientName || item.businessName}
                    </div>
                    <div
                        className="leading-snug mt-1.5"
                        style={{
                            fontSize: "12px",
                            fontWeight: 600,
                            color: theme.accent,
                            display: "-webkit-box",
                            WebkitLineClamp: 1,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                        }}
                    >
                        {item.clientName ? item.businessName : item.projectType}
                    </div>
                </div>
                <span
                    className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full self-start"
                    style={
                        isPublished
                            ? { color: "#00ffcc", border: "1px solid rgba(0,255,204,0.4)", background: "rgba(0,255,204,0.08)" }
                            : { color: theme.accent, border: `1px solid ${theme.accent}45`, background: `${theme.accent}12` }
                    }
                >
                    {isPublished ? t("caseStudies.statusPublished") : t("caseStudies.statusDevelopment")}
                </span>
            </div>
        </div>
    );
}

export default function VideoTestimonialCoverflow({ t }: { t: (k: string) => string }) {
    const items = testimonialsData;
    const n = items.length;
    const [active, setActive] = useState(0);
    const lockRef = useRef(false);

    const lock = useCallback(() => {
        lockRef.current = true;
        window.setTimeout(() => {
            lockRef.current = false;
        }, TRANSITION_MS);
    }, []);

    const step = useCallback(
        (dir: number) => {
            if (lockRef.current || n < 2) return;
            lock();
            setActive((a) => ((a + dir) % n + n) % n);
        },
        [n, lock]
    );

    const handleCardClick = useCallback(
        (i: number) => {
            if (lockRef.current) return;
            lock();
            setActive((a) => (i === a ? a : i));
        },
        [lock]
    );

    // Autoplay suave: rota sola cada AUTOPLAY_MS, se pausa mientras el mouse
    // está sobre el carrusel para no interrumpir a alguien mirando un video.
    const [paused, setPaused] = useState(false);
    useEffect(() => {
        if (paused || n < 2) return;
        const id = window.setInterval(() => step(1), AUTOPLAY_MS);
        return () => window.clearInterval(id);
    }, [paused, n, step]);

    const onKeyDown = useCallback(
        (e: React.KeyboardEvent) => {
            if (e.key === "ArrowRight") {
                e.preventDefault();
                step(1);
            } else if (e.key === "ArrowLeft") {
                e.preventDefault();
                step(-1);
            }
        },
        [step]
    );

    if (n === 0) return null;

    const rootStyle: CSSProperties = {
        position: "relative",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        perspective: `${PERSPECTIVE}px`,
        outline: "none",
        padding: "40px 0",
    };

    return (
        <div
            style={rootStyle}
            tabIndex={0}
            role="group"
            aria-roledescription="carousel"
            onKeyDown={onKeyDown}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
        >
            <div style={{ position: "relative", width: CARD_WIDTH, height: CARD_HEIGHT, transformStyle: "preserve-3d" }}>
                {items.map((item, i) => {
                    let rel = i - active;
                    if (rel > n / 2) rel -= n;
                    if (rel < -n / 2) rel += n;

                    const ax = Math.abs(rel);
                    const visible = ax <= MAX_VISIBLE;
                    const isActive = rel === 0;
                    const sc = Math.max(0.4, 1 - ax * SCALE_STEP);
                    const tx = rel * GAP_PX;
                    const tz = -ax * DEPTH;
                    const ry = -rel * TILT;
                    const rz = rel * SIDE_TILT;

                    const cardStyle: CSSProperties = {
                        position: "absolute",
                        left: "50%",
                        top: "50%",
                        width: CARD_WIDTH,
                        height: CARD_HEIGHT,
                        borderRadius: "20px",
                        overflow: "hidden",
                        transformStyle: "preserve-3d",
                        transformOrigin: "center center",
                        transform: `translate(-50%, -50%) translateX(${tx}px) translateZ(${tz}px) rotateY(${ry}deg) rotateZ(${rz}deg) scale(${sc})`,
                        transition: `transform ${TRANSITION_MS}ms cubic-bezier(0.22, 1, 0.36, 1), opacity ${TRANSITION_MS}ms ease, box-shadow 0.4s ease, border-color 0.4s ease`,
                        opacity: visible ? 1 : 0,
                        cursor: isActive ? "default" : "pointer",
                        pointerEvents: visible ? "auto" : "none",
                        backgroundColor: "#0a0a0f",
                        border: `1px solid ${isActive ? theme.accent + "60" : "rgba(255,255,255,0.1)"}`,
                        boxShadow: isActive
                            ? `0 25px 60px rgba(0,0,0,0.55), 0 0 45px ${theme.accentGlow}`
                            : "0 15px 35px rgba(0,0,0,0.4)",
                    };

                    return (
                        <div
                            key={item.id}
                            style={cardStyle}
                            onClick={() => handleCardClick(i)}
                            aria-label={item.businessName}
                            aria-hidden={!visible}
                        >
                            <CoverflowCard item={item} t={t} />
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
