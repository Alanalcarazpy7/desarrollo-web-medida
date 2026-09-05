"use client";

import { useState, useEffect, useCallback, useRef, type CSSProperties } from "react";
import Image from "next/image";
import { testimonialsData, Testimonial } from "@/lib/testimonials-data";

const theme = {
    accent: "#00d9ff",
    accentDark: "#0099cc",
    accentGlow: "rgba(0, 217, 255, 0.5)",
};

// Coverflow 3D: la card activa de frente, las vecinas inclinadas en
// perspectiva. Reskin con identidad SolvaTech.
const PERSPECTIVE = 1700;
const SCALE_STEP = 0.16;
const MAX_VISIBLE = 2;
const DEPTH = 260;
const CARD_WIDTH = 300;
const CARD_HEIGHT = 470;
const GAP_PX = 250;
const TILT = 8;
const SIDE_TILT = 6;
const TRANSITION_MS = 600;
const AUTOPLAY_MS = 6000;

function PlayIcon() {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="#04121a" aria-hidden="true">
            <path d="M8 5v14l11-7z" />
        </svg>
    );
}

function CloseIcon() {
    return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.4" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
        </svg>
    );
}

function CoverflowCard({
    item,
    t,
    isActive,
    isPlaying,
    onPlay,
    onStop,
}: {
    item: Testimonial;
    t: (k: string) => string;
    isActive: boolean;
    isPlaying: boolean;
    onPlay: () => void;
    onStop: () => void;
}) {
    const isPublished = item.status === "published";
    const hasVideo = Boolean(item.videoUrl);
    // Solo se usa imagen de fondo nítida cuando es un poster real de un video
    // vertical. Las capturas de escritorio (wide) recortadas en una card
    // angosta se ven rotas: para esas va un degradé limpio + logo.
    const usePoster = hasVideo && Boolean(item.screenshot);

    if (isPlaying && hasVideo) {
        return (
            <div className="relative w-full h-full overflow-hidden" style={{ borderRadius: "20px", background: "#000" }}>
                <video
                    src={item.videoUrl}
                    poster={item.screenshot}
                    controls
                    autoPlay
                    playsInline
                    preload="metadata"
                    className="absolute inset-0 w-full h-full"
                    style={{ objectFit: "contain", background: "#000" }}
                />
                <button
                    type="button"
                    onClick={(e) => {
                        e.stopPropagation();
                        onStop();
                    }}
                    className="absolute z-20 flex items-center justify-center rounded-full transition-transform duration-200 hover:scale-110"
                    style={{
                        top: "10px",
                        right: "10px",
                        width: "34px",
                        height: "34px",
                        background: "rgba(5,6,10,0.72)",
                        border: "1px solid rgba(255,255,255,0.25)",
                        backdropFilter: "blur(6px)",
                    }}
                    aria-label={t("testimonials.closeVideo")}
                >
                    <CloseIcon />
                </button>
            </div>
        );
    }

    return (
        <div className="relative w-full h-full overflow-hidden" style={{ borderRadius: "20px", background: "#0a0d14" }}>
            {/* Fondo */}
            {usePoster ? (
                <Image
                    src={item.screenshot as string}
                    alt={item.businessName}
                    fill
                    sizes="320px"
                    style={{ objectFit: "cover", objectPosition: "center 18%" }}
                    priority={isActive}
                />
            ) : (
                <div
                    className="absolute inset-0"
                    style={{ background: "radial-gradient(120% 80% at 50% 0%, #14212c, #0a0d14 70%)" }}
                />
            )}

            {/* Scrims para legibilidad (arriba y abajo) */}
            <div
                className="absolute inset-0"
                style={{
                    background:
                        "linear-gradient(180deg, rgba(4,6,10,0.62) 0%, rgba(4,6,10,0) 24%, rgba(4,6,10,0) 40%, rgba(4,6,10,0.55) 66%, rgba(4,6,10,0.92) 100%)",
                }}
            />

            {/* Logo del negocio arriba a la izquierda */}
            {item.logo ? (
                <div
                    className="absolute flex items-center justify-center rounded-xl"
                    style={{
                        top: "12px",
                        left: "12px",
                        width: "46px",
                        height: "46px",
                        background: "#fff",
                        padding: "8px",
                        boxShadow: "0 6px 18px rgba(0,0,0,0.45)",
                    }}
                >
                    <Image
                        src={item.logo}
                        alt={item.businessName}
                        width={34}
                        height={34}
                        style={{ objectFit: "contain", width: "100%", height: "100%" }}
                    />
                </div>
            ) : (
                <div
                    className="absolute flex items-center justify-center rounded-xl font-black"
                    style={{
                        top: "12px",
                        left: "12px",
                        width: "46px",
                        height: "46px",
                        fontSize: "15px",
                        color: "#04121a",
                        background: `linear-gradient(135deg, ${theme.accent}, ${theme.accentDark})`,
                    }}
                >
                    {item.initials}
                </div>
            )}

            {/* Centro: play (si hay video y es la card activa) o "próximamente" */}
            <div className="absolute inset-0 flex items-center justify-center px-6">
                {hasVideo ? (
                    isActive ? (
                        <button
                            type="button"
                            onClick={(e) => {
                                e.stopPropagation();
                                onPlay();
                            }}
                            className="flex items-center justify-center rounded-full transition-transform duration-300 hover:scale-110"
                            style={{
                                width: "64px",
                                height: "64px",
                                paddingLeft: "4px",
                                background: theme.accent,
                                boxShadow: `0 0 34px ${theme.accentGlow}, 0 10px 30px rgba(0,0,0,0.5)`,
                            }}
                            aria-label={t("testimonials.playVideo")}
                        >
                            <PlayIcon />
                        </button>
                    ) : (
                        <div
                            className="flex items-center justify-center rounded-full"
                            style={{
                                width: "54px",
                                height: "54px",
                                paddingLeft: "3px",
                                background: "rgba(0,217,255,0.82)",
                                boxShadow: `0 0 22px ${theme.accentGlow}`,
                            }}
                            aria-hidden="true"
                        >
                            <PlayIcon />
                        </div>
                    )
                ) : (
                    <span
                        className="text-[11px] font-bold uppercase tracking-wider px-4 py-2 rounded-full"
                        style={{
                            color: theme.accent,
                            border: `1px solid ${theme.accent}55`,
                            background: "rgba(5,6,10,0.55)",
                            backdropFilter: "blur(4px)",
                        }}
                    >
                        {t("testimonials.videoUpcoming")}
                    </span>
                )}
            </div>

            {/* Info abajo, anclada sobre el scrim (nunca se recorta) */}
            <div className="absolute left-0 right-0 bottom-0 flex flex-col" style={{ padding: "16px", gap: "6px" }}>
                <div
                    className="text-white font-bold"
                    style={{ fontSize: "15px", lineHeight: 1.25, textShadow: "0 2px 10px rgba(0,0,0,0.8)" }}
                >
                    {item.clientName || item.businessName}
                </div>
                <div
                    style={{
                        fontSize: "12px",
                        fontWeight: 600,
                        color: theme.accent,
                        lineHeight: 1.3,
                        textShadow: "0 1px 6px rgba(0,0,0,0.75)",
                    }}
                >
                    {item.clientName ? item.businessName : item.projectType}
                </div>
                <span
                    className="text-[10px] font-bold uppercase tracking-wider rounded-full self-start"
                    style={{
                        marginTop: "2px",
                        padding: "3px 10px",
                        ...(isPublished
                            ? { color: "#00ffcc", border: "1px solid rgba(0,255,204,0.45)", background: "rgba(0,255,204,0.1)" }
                            : { color: theme.accent, border: `1px solid ${theme.accent}55`, background: `${theme.accent}14` }),
                    }}
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
    const [playingId, setPlayingId] = useState<string | null>(null);
    const [paused, setPaused] = useState(false);
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
            setPlayingId(null);
            lock();
            setActive((a) => ((a + dir) % n + n) % n);
        },
        [n, lock]
    );

    const handleCardClick = useCallback(
        (i: number) => {
            if (lockRef.current || i === active) return;
            setPlayingId(null);
            lock();
            setActive(i);
        },
        [active, lock]
    );

    // Autoplay: rota sola cada AUTOPLAY_MS. Se detiene mientras el mouse está
    // encima Y también mientras se reproduce cualquier video, sin importar
    // dónde esté el mouse (antes seguía girando y se llevaba el video puesto).
    useEffect(() => {
        if (paused || playingId !== null || n < 2) return;
        const id = window.setInterval(() => step(1), AUTOPLAY_MS);
        return () => window.clearInterval(id);
    }, [paused, playingId, n, step]);

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

    const anyPlaying = playingId !== null;

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
                    const dimmed = anyPlaying && !isActive;
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
                        opacity: visible ? (dimmed ? 0.1 : 1) : 0,
                        cursor: isActive && !anyPlaying ? "default" : "pointer",
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
                            <CoverflowCard
                                item={item}
                                t={t}
                                isActive={isActive}
                                isPlaying={playingId === item.id}
                                onPlay={() => setPlayingId(item.id)}
                                onStop={() => setPlayingId(null)}
                            />
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
