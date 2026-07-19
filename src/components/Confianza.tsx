"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

const theme = {
    accent: "#00d9ff",
    accentDark: "#0099cc",
    accentGlow: "rgba(0, 217, 255, 0.4)",
    bgCard: "#0a0a0f",
    bgCardHover: "#111119",
    textMain: "#ffffff",
    textSide: "rgba(255, 255, 255, 0.6)"
};

const icons = {
    chat: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.86 9.86 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
    ),
    steps: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 5l7 7-7 7" opacity="0.4" />
        </svg>
    ),
    devices: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
            <rect x="3" y="4" width="14" height="10" rx="1.5" />
            <path strokeLinecap="round" d="M8 20h6" />
            <rect x="16" y="9" width="5" height="9" rx="1" />
        </svg>
    ),
    payments: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
            <rect x="2.5" y="5" width="19" height="14" rx="2" />
            <path strokeLinecap="round" d="M2.5 9.5h19" />
            <path strokeLinecap="round" d="M6 15h4" />
        </svg>
    ),
};

const cards = {
    es: [
        { title: "Comunicación directa por WhatsApp", desc: "Hablás conmigo directamente, sin intermediarios ni tercerización.", icon: "chat" },
        { title: "Proceso ordenado y con plazos claros", desc: "Sabés qué se hace, cuánto cuesta y cuándo está listo, antes de empezar.", icon: "steps" },
        { title: "Diseño responsive en todo proyecto", desc: "Tu web se ve bien en celular, tablet y computadora, siempre.", icon: "devices" },
        { title: "Pagos por etapas, sin sorpresas", desc: "50% para iniciar y 50% al finalizar. Sin costos ocultos.", icon: "payments" }
    ],
    en: [
        { title: "Direct WhatsApp communication", desc: "You talk directly with me, no intermediaries or outsourcing.", icon: "chat" },
        { title: "Ordered process with clear timelines", desc: "You know what's being done, how much it costs, and when it's ready, before starting.", icon: "steps" },
        { title: "Responsive design on every project", desc: "Your website looks great on mobile, tablet, and desktop, always.", icon: "devices" },
        { title: "Staged payments, no surprises", desc: "50% to start and 50% on completion. No hidden costs.", icon: "payments" }
    ]
};

export default function Confianza() {
    const { language } = useLanguage();
    const activeCards = cards[language] || cards.es;
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    return (
        <section id="confianza" style={{ position: "relative", padding: "80px 24px", overflow: "hidden", background: "transparent" }}>
            <div style={{
                position: "absolute",
                top: "50%",
                left: "10%",
                width: "320px",
                height: "320px",
                borderRadius: "555px",
                background: `radial-gradient(circle, ${theme.accentGlow}, transparent 70%)`,
                filter: "blur(110px)",
                pointerEvents: "none",
                opacity: 0.2
            }} />

            <div style={{ position: "relative", zIndex: 10, maxWidth: "1150px", margin: "0 auto" }}>
                <div style={{ textAlign: "center", marginBottom: "48px" }}>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, type: "spring" }}
                        className="inline-flex items-center gap-3 px-6 py-3 mb-6 rounded-full cursor-default"
                        style={{
                            background: `linear-gradient(135deg, ${theme.bgCard}cc, ${theme.bgCardHover}cc)`,
                            border: `2px solid ${theme.accent}30`,
                            backdropFilter: "blur(20px)",
                        }}
                    >
                        <motion.span
                            className="w-3 h-3 rounded-full"
                            style={{ background: theme.accent, boxShadow: `0 0 20px ${theme.accentGlow}` }}
                            animate={{ scale: [1, 1.3, 1], opacity: [1, 0.7, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        />
                        <span className="text-sm font-bold uppercase tracking-[0.2em]" style={{ color: theme.accent }}>
                            {language === 'es' ? "Por Qué Elegirnos" : "Why Choose Us"}
                        </span>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        style={{ fontSize: "clamp(1.8rem, 4.5vw, 2.75rem)", fontWeight: 900, marginBottom: "12px", color: theme.textMain }}
                    >
                        {language === 'es' ? "¿Por qué trabajar con " : "Why work with "}
                        <span style={{
                            background: `linear-gradient(135deg, ${theme.accent}, ${theme.accentDark})`,
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent"
                        }}>
                            SolvaTech?
                        </span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        style={{ fontSize: "1rem", color: theme.textSide, maxWidth: "560px", margin: "0 auto" }}
                    >
                        {language === 'es'
                            ? "Nos enfocamos en darte resultados tangibles sin rodeos técnicos."
                            : "We focus on giving you tangible results without technical runarounds."}
                    </motion.p>
                </div>

                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",
                    gap: "20px"
                }}>
                    {activeCards.map((card, idx) => {
                        const isHovered = hoveredIndex === idx;
                        return (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: idx * 0.08 }}
                                whileHover={{ y: -6 }}
                                onHoverStart={() => setHoveredIndex(idx)}
                                onHoverEnd={() => setHoveredIndex(null)}
                                className="confianza-card"
                                style={{
                                    padding: "26px 22px",
                                    background: isHovered
                                        ? `linear-gradient(135deg, ${theme.bgCardHover}, ${theme.bgCard})`
                                        : theme.bgCard,
                                    borderRadius: "20px",
                                    border: `1px solid ${isHovered ? theme.accent + '50' : 'rgba(255, 255, 255, 0.08)'}`,
                                    boxShadow: isHovered
                                        ? `0 16px 34px rgba(0,0,0,0.4), 0 0 30px ${theme.accentGlow}`
                                        : "0 6px 20px rgba(0,0,0,0.3)",
                                    position: "relative",
                                    overflow: "hidden",
                                    transition: "background 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease"
                                }}
                            >
                                {/* Resplandor radial en hover */}
                                <motion.div
                                    className="absolute inset-0 pointer-events-none"
                                    style={{ background: `radial-gradient(circle at 50% 0%, ${theme.accent}18, transparent 70%)` }}
                                    animate={{ opacity: isHovered ? 1 : 0 }}
                                    transition={{ duration: 0.4 }}
                                />

                                {/* Borde superior brillante en hover */}
                                <motion.div
                                    className="absolute inset-x-0 top-0 h-px"
                                    style={{ background: `linear-gradient(90deg, transparent, ${theme.accent}, transparent)` }}
                                    animate={{ opacity: isHovered ? 1 : 0 }}
                                    transition={{ duration: 0.4 }}
                                />

                                <motion.div
                                    className="relative"
                                    style={{
                                        width: "50px",
                                        height: "50px",
                                        borderRadius: "14px",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        background: `linear-gradient(135deg, ${theme.accent}25, ${theme.accent}08)`,
                                        border: `1px solid ${theme.accent}30`,
                                        marginBottom: "18px",
                                        color: theme.accent,
                                        boxShadow: isHovered ? `0 0 24px ${theme.accentGlow}` : "none",
                                    }}
                                    animate={{
                                        scale: isHovered ? 1.12 : 1,
                                        rotate: isHovered ? [0, -8, 8, 0] : 0,
                                    }}
                                    transition={{ duration: 0.5 }}
                                >
                                    {icons[card.icon as keyof typeof icons]}
                                </motion.div>

                                <h3 className="relative" style={{ fontSize: "1.05rem", fontWeight: 800, color: theme.textMain, marginBottom: "8px", lineHeight: 1.3 }}>
                                    {card.title}
                                </h3>

                                <p className="relative" style={{ fontSize: "0.85rem", color: theme.textSide, lineHeight: 1.55, margin: 0 }}>
                                    {card.desc}
                                </p>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
