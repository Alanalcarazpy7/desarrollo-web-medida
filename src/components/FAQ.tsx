"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";

export default function FAQ() {
    const { t } = useLanguage();
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const theme = {
        bg: "#000000",
        card: "rgba(255, 255, 255, 0.03)",
        border: "rgba(255, 255, 255, 0.1)",
        accent: "#00d9ff",
        accentDark: "#0099cc",
        textMain: "#ffffff",
        textSide: "rgba(255, 255, 255, 0.6)"
    };

    const faqItems = t('faq.items') as any as Array<{ q: string; a: string }>;

    return (
        <section id="faq" style={{ position: "relative", padding: "100px 24px", overflow: "hidden", backgroundColor: theme.bg }}>
            {/* Glow */}
            <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "100%", maxWidth: "800px", height: "100%", maxHeight: "600px", pointerEvents: "none", opacity: 0.15, background: `radial-gradient(circle, ${theme.accent}, transparent 70%)`, filter: "blur(100px)" }} />
            
            <div style={{ position: "relative", zIndex: 10, maxWidth: "900px", margin: "0 auto" }}>
                <div style={{ textAlign: "center", marginBottom: "64px" }}>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        style={{ display: "inline-block", padding: "8px 16px", marginBottom: "24px", borderRadius: "9999px", fontSize: "0.875rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: theme.accent, border: `1px solid ${theme.accent}40`, backgroundColor: `${theme.accent}10` }}
                    >
                        {mounted ? t('faq.badge') : "Preguntas Frecuentes"}
                    </motion.div>
                    
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        style={{ fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 900, marginBottom: "24px", color: theme.textMain }}
                    >
                        {mounted ? t('faq.titleStart') : "Dudas"} {" "}
                        <span style={{ background: `linear-gradient(135deg, ${theme.accent}, ${theme.accentDark})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                            {mounted ? t('faq.titleHighlight') : "Comunes"}
                        </span>
                    </motion.h2>
                    
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        style={{ fontSize: "1.125rem", color: theme.textSide, maxWidth: "600px", margin: "0 auto" }}
                    >
                        {mounted ? t('faq.subtitle') : "Resolvemos tus inquietudes sobre desarrollo web y sistemas en Paraguay."}
                    </motion.p>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                    {faqItems && faqItems.map((item, index) => {
                        const isOpen = openIndex === index;
                        
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 + index * 0.1 }}
                                style={{ 
                                    borderRadius: "16px",
                                    border: `1px solid ${isOpen ? `${theme.accent}50` : theme.border}`,
                                    backgroundColor: isOpen ? `${theme.accent}05` : theme.card,
                                    overflow: "hidden",
                                    transition: "background-color 0.3s ease, border-color 0.3s ease"
                                }}
                            >
                                <button
                                    onClick={() => setOpenIndex(isOpen ? null : index)}
                                    style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "24px", textAlign: "left", background: "none", border: "none", cursor: "pointer" }}
                                >
                                    <h3 style={{ fontSize: "clamp(1.125rem, 2vw, 1.25rem)", fontWeight: 700, paddingRight: "32px", color: isOpen ? theme.accent : theme.textMain, transition: "color 0.3s ease", margin: 0 }}>
                                        {item.q}
                                    </h3>
                                    <div 
                                        style={{ 
                                            flexShrink: 0,
                                            width: "32px",
                                            height: "32px",
                                            borderRadius: "50%",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            border: `1px solid ${isOpen ? theme.accent : theme.border}`,
                                            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                                            transition: "all 0.3s ease"
                                        }}
                                    >
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={isOpen ? theme.accent : "#ffffff"} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M6 9l6 6 6-6" />
                                        </svg>
                                    </div>
                                </button>
                                
                                <AnimatePresence>
                                    {isOpen && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3, ease: "easeInOut" }}
                                        >
                                            <div style={{ padding: "0 24px 24px", fontSize: "1rem", lineHeight: 1.6, color: theme.textSide }}>
                                                {item.a}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
