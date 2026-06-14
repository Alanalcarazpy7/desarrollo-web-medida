"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

export default function Confianza() {
    const { t, language } = useLanguage();

    const theme = {
        accent: "#00d9ff",
        accentDark: "#0099cc",
        accentGlow: "rgba(0, 217, 255, 0.4)",
        bgCard: "#0a0a0f",
        textMain: "#ffffff",
        textSide: "rgba(255, 255, 255, 0.6)"
    };

    const cards = {
        es: [
            {
                title: "Atención directa por WhatsApp",
                desc: "Hablás directamente conmigo, sin intermediarios.",
                icon: "💬"
            },
            {
                title: "Pensado para negocios locales",
                desc: "Creamos soluciones simples, claras y adaptadas al mercado paraguayo.",
                icon: "🇵🇾"
            },
            {
                title: "Diseño responsive",
                desc: "Tu web se verá bien en celular, tablet y computadora.",
                icon: "📱"
            },
            {
                title: "Entrega clara",
                desc: "Te explicamos qué incluye, cuánto cuesta y cuánto tarda antes de iniciar.",
                icon: "🤝"
            }
        ],
        en: [
            {
                title: "Direct WhatsApp communication",
                desc: "You speak directly with me, no intermediaries.",
                icon: "💬"
            },
            {
                title: "Built for local businesses",
                desc: "We create simple, clear solutions tailored to the Paraguayan market.",
                icon: "🇵🇾"
            },
            {
                title: "Responsive design",
                desc: "Your website will look great on mobile, tablet, and desktop.",
                icon: "📱"
            },
            {
                title: "Clear delivery process",
                desc: "We explain what is included, how much it costs, and how long it takes before starting.",
                icon: "🤝"
            }
        ]
    };

    const activeCards = cards[language] || cards.es;

    return (
        <section id="confianza" style={{ position: "relative", padding: "100px 24px", overflow: "hidden", background: "transparent" }}>
            {/* Background Glow */}
            <div style={{
                position: "absolute",
                top: "50%",
                left: "10%",
                width: "400px",
                height: "400px",
                borderRadius: "555px",
                background: `radial-gradient(circle, ${theme.accentGlow}, transparent 70%)`,
                filter: "blur(120px)",
                pointerEvents: "none",
                opacity: 0.3
            }} />

            <div style={{ position: "relative", zIndex: 10, maxWidth: "1200px", margin: "0 auto" }}>
                {/* Header */}
                <div style={{ textAlign: "center", marginBottom: "64px" }}>
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 900, marginBottom: "16px", color: theme.textMain }}
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
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        style={{ fontSize: "1.125rem", color: theme.textSide, maxWidth: "600px", margin: "0 auto" }}
                    >
                        {language === 'es' 
                            ? "Nos enfocamos en darte resultados tangibles sin rodeos técnicos."
                            : "We focus on giving you tangible results without technical runarounds."}
                    </motion.p>
                </div>

                {/* Cards Grid */}
                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                    gap: "24px"
                }}>
                    {activeCards.map((card, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: idx * 0.1 }}
                            whileHover={{ y: -8, borderColor: theme.accent }}
                            style={{
                                padding: "32px 24px",
                                background: theme.bgCard,
                                borderRadius: "20px",
                                border: "1px solid rgba(255, 255, 255, 0.08)",
                                boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
                                position: "relative",
                                overflow: "hidden",
                                transition: "border-color 0.3s ease"
                            }}
                        >
                            {/* Accent Glow on Hover */}
                            <div className="absolute inset-0 opacity-0 hover:opacity-10 transition-opacity duration-300 pointer-events-none"
                                 style={{ background: `radial-gradient(circle at top right, ${theme.accent}, transparent 65%)` }} />

                            {/* Icon Container */}
                            <div style={{
                                width: "56px",
                                height: "56px",
                                borderRadius: "14px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: "1.75rem",
                                backgroundColor: "rgba(0, 217, 255, 0.08)",
                                border: `1px solid ${theme.accent}25`,
                                marginBottom: "20px",
                                color: theme.accent
                            }}>
                                {card.icon}
                            </div>

                            {/* Title */}
                            <h3 style={{ fontSize: "1.25rem", fontWeight: 800, color: theme.textMain, marginBottom: "12px" }}>
                                {card.title}
                            </h3>

                            {/* Description */}
                            <p style={{ fontSize: "0.925rem", color: theme.textSide, lineHeight: 1.5, margin: 0 }}>
                                {card.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
