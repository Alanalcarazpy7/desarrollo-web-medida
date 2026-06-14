"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

export default function IdealPara() {
    const { language } = useLanguage();

    const theme = {
        accent: "#00d9ff",
        accentDark: "#0099cc",
        accentGlow: "rgba(0, 217, 255, 0.4)",
        bgCard: "#0a0a0f",
        textMain: "#ffffff",
        textSide: "rgba(255, 255, 255, 0.6)"
    };

    const businessTypes = {
        es: [
            { label: "Barberías", emoji: "💈" },
            { label: "Veterinarias", emoji: "🐾" },
            { label: "Gimnasios", emoji: "💪" },
            { label: "Tiendas de ropa", emoji: "👕" },
            { label: "Restaurantes", emoji: "🍔" },
            { label: "Lavaderos", emoji: "🚗" },
            { label: "Profesionales independientes", emoji: "💼" },
            { label: "Emprendedores", emoji: "💡" },
            { label: "Inmobiliarias pequeñas", emoji: "🏠" },
            { label: "Servicios técnicos", emoji: "🛠️" }
        ],
        en: [
            { label: "Barbershops", emoji: "💈" },
            { label: "Veterinaries", emoji: "🐾" },
            { label: "Gyms", emoji: "💪" },
            { label: "Clothing stores", emoji: "👕" },
            { label: "Restaurants", emoji: "🍔" },
            { label: "Car washes", emoji: "🚗" },
            { label: "Independent professionals", emoji: "💼" },
            { label: "Entrepreneurs", emoji: "💡" },
            { label: "Small real estate", emoji: "🏠" },
            { label: "Technical services", emoji: "🛠️" }
        ]
    };

    const activeList = businessTypes[language] || businessTypes.es;

    return (
        <section id="ideal-para" style={{ position: "relative", padding: "80px 24px", overflow: "hidden", background: "transparent" }}>
            {/* Background Glow */}
            <div style={{
                position: "absolute",
                bottom: "0",
                right: "10%",
                width: "350px",
                height: "350px",
                borderRadius: "555px",
                background: `radial-gradient(circle, ${theme.accentGlow}, transparent 70%)`,
                filter: "blur(110px)",
                pointerEvents: "none",
                opacity: 0.2
            }} />

            <div style={{ position: "relative", zIndex: 10, maxWidth: "1000px", margin: "0 auto", textAlign: "center" }}>
                {/* Header */}
                <div style={{ marginBottom: "48px" }}>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)", fontWeight: 900, color: theme.textMain }}
                    >
                        {language === 'es' ? "Ideal para negocios como:" : "Ideal for businesses like:"}
                    </motion.h2>
                </div>

                {/* Chips Container */}
                <div style={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "center",
                    gap: "14px",
                    maxWidth: "850px",
                    margin: "0 auto 40px"
                }}>
                    {activeList.map((biz, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: idx * 0.05, type: "spring", stiffness: 120 }}
                            whileHover={{ 
                                scale: 1.08, 
                                borderColor: theme.accent, 
                                boxShadow: `0 0 15px ${theme.accentGlow}`,
                                backgroundColor: "rgba(0, 217, 255, 0.08)"
                            }}
                            style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: "8px",
                                padding: "12px 20px",
                                borderRadius: "100px",
                                background: "rgba(255, 255, 255, 0.03)",
                                border: "1px solid rgba(255, 255, 255, 0.1)",
                                color: theme.textMain,
                                fontSize: "14px",
                                fontWeight: 700,
                                cursor: "default",
                                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                            }}
                        >
                            <span>{biz.emoji}</span>
                            <span>{biz.label}</span>
                        </motion.div>
                    ))}
                </div>

                {/* Footer Quote */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    style={{
                        maxWidth: "700px",
                        margin: "0 auto",
                        padding: "20px 24px",
                        borderRadius: "16px",
                        background: "rgba(0, 217, 255, 0.03)",
                        borderLeft: `4px solid ${theme.accent}`,
                        textAlign: "left"
                    }}
                >
                    <p style={{
                        fontSize: "clamp(0.95rem, 2.5vw, 1.1rem)",
                        color: "#d1d5db",
                        lineHeight: 1.6,
                        margin: 0,
                        fontWeight: 500
                    }}>
                        {language === 'es'
                            ? "Si tu negocio recibe consultas por WhatsApp, Instagram o Facebook, una web puede ayudarte a mostrar todo más ordenado y profesional."
                            : "If your business receives inquiries through WhatsApp, Instagram or Facebook, a website can help you show everything in a more organized and professional way."}
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
