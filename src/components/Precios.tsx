"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";

export default function Precios() {
    const { t, language } = useLanguage();
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    const theme = {
        accent: "#00d9ff",
        accentDark: "#0099cc",
    };

    const plans = [
        {
            title: mounted ? t('pricing.plan1.title') : "Página",
            titleAccent: mounted ? t('pricing.plan1.titleAccent') : "Informativa",
            price: "399",
            description: mounted ? t('pricing.plan1.description') : "Para tu Negocio o servicio",
            features: mounted ? t('pricing.plan1.features') : [
                "Diseño profesional y estático",
                "Diseño Responsive",
                "Optimización de carga",
                "Integración con redes sociales",
                "Formulario de contacto",
                "Hosting y dominio incluido",
            ],
            highlight: false,
        },
        {
            title: mounted ? t('pricing.plan2.title') : "Landing",
            titleAccent: mounted ? t('pricing.plan2.titleAccent') : "Page",
            price: "799",
            description: mounted ? t('pricing.plan2.description') : "Web similar a esta",
            features: mounted ? t('pricing.plan2.features') : [
                "Diseño único y personalizado",
                "Animaciones premium",
                "Diseño Responsive",
                "Hasta 4 secciones",
                "Optimización de carga",
                "Integración redes sociales",
                "Formulario de contacto",
                "Hosting y dominio incluido",
                "60 Días de garantía",
            ],
            highlight: true,
            tag: mounted ? t('pricing.tag') : "Más contratado",
        },
        {
            title: mounted ? t('pricing.plan3.title') : "Tienda",
            titleAccent: mounted ? t('pricing.plan3.titleAccent') : "Online",
            price: "1.299",
            description: mounted ? t('pricing.plan3.description') : "E-commerce completo",
            features: mounted ? t('pricing.plan3.features') : [
                "Diseño Personalizado",
                "Diseño Responsive",
                "Hasta 50 Productos",
                "SEO optimizado",
                "Optimización de carga",
                "Integración redes sociales",
                "Formulario de contacto",
                "90 Días de garantía",
            ],
            highlight: false,
        },
    ];

    const CheckIcon = () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
        </svg>
    );

    const PricingCard = ({ plan, index }: { plan: typeof plans[0]; index: number }) => {
        const [isHovered, setIsHovered] = useState(false);

        return (
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                style={{
                    position: "relative",
                    width: "100%",
                    maxWidth: "340px",
                    minWidth: "280px",
                    flex: "1 1 300px",
                }}
            >
                {/* External Glow - appears on hover */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{
                        opacity: isHovered ? 0.6 : plan.highlight ? 0.4 : 0,
                        scale: isHovered ? 1 : 0.95,
                    }}
                    transition={{ duration: 0.4 }}
                    style={{
                        position: "absolute",
                        inset: "-15px",
                        borderRadius: "35px",
                        background: `radial-gradient(circle at 50% 50%, ${theme.accent}35 0%, transparent 70%)`,
                        pointerEvents: "none",
                        zIndex: 0,
                    }}
                />

                {/* Card wrapper */}
                <motion.div
                    animate={{
                        y: isHovered ? -12 : 0,
                        rotateX: isHovered ? 2 : 0,
                        rotateY: isHovered ? -1 : 0,
                    }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    style={{
                        position: "relative",
                        padding: plan.highlight ? "30px 24px 24px" : "24px 22px",
                        background: "#0a0a0f",
                        borderRadius: "22px",
                        border: plan.highlight
                            ? `2px solid ${theme.accent}`
                            : isHovered
                                ? `2px solid ${theme.accent}80`
                                : "1px solid rgba(255,255,255,0.1)",
                        boxShadow: isHovered
                            ? `0 25px 50px rgba(0,0,0,0.5), 0 0 50px ${theme.accent}25`
                            : plan.highlight
                                ? `0 20px 45px rgba(0,0,0,0.4), 0 0 40px ${theme.accent}20`
                                : "0 10px 35px rgba(0,0,0,0.3)",
                        cursor: "pointer",
                        transformStyle: "preserve-3d",
                        perspective: "1000px",
                        zIndex: 1,
                        transition: "border 0.3s ease, box-shadow 0.4s ease",
                    }}
                >
                    {/* Tag */}
                    {plan.highlight && (
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                            style={{
                                position: "absolute",
                                top: "0",
                                left: "50%",
                                transform: "translateX(-50%)",
                                background: `linear-gradient(135deg, ${theme.accent}, ${theme.accentDark})`,
                                padding: "6px 20px",
                                borderRadius: "0 0 14px 14px",
                                fontSize: "10px",
                                fontWeight: 700,
                                color: "#000",
                                textTransform: "uppercase",
                                letterSpacing: "0.5px",
                                boxShadow: `0 5px 20px ${theme.accent}50`,
                            }}
                        >
                            ✨ {plan.tag}
                        </motion.div>
                    )}

                    {/* Title */}
                    <div style={{ textAlign: "center", marginBottom: "16px", marginTop: plan.highlight ? "12px" : "0" }}>
                        <motion.h3
                            animate={{
                                color: isHovered ? "#fff" : "#f0f0f0",
                                textShadow: isHovered ? `0 0 15px ${theme.accent}50` : "none",
                            }}
                            transition={{ duration: 0.3 }}
                            style={{ fontSize: "1.6rem", fontWeight: 800, lineHeight: 1.1, marginBottom: "2px" }}
                        >
                            {plan.title}
                        </motion.h3>
                        <motion.span
                            animate={{
                                textShadow: isHovered ? `0 0 25px ${theme.accent}80` : plan.highlight ? `0 0 15px ${theme.accent}40` : "none",
                            }}
                            transition={{ duration: 0.3 }}
                            style={{
                                display: "block",
                                fontSize: "1.6rem",
                                fontWeight: 300,
                                fontStyle: "italic",
                                background: `linear-gradient(135deg, ${theme.accent}, ${theme.accentDark})`,
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                                backgroundClip: "text",
                            }}
                        >
                            {plan.titleAccent}
                        </motion.span>
                        <p style={{ color: "#666", fontSize: "11px", marginTop: "6px" }}>{plan.description}</p>
                    </div>

                    {/* Price */}
                    <motion.div
                        animate={{
                            scale: isHovered ? 1.08 : 1,
                            background: isHovered ? `rgba(0, 217, 255, 0.08)` : plan.highlight ? `rgba(0, 217, 255, 0.05)` : "rgba(255,255,255,0.02)",
                        }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        style={{
                            textAlign: "center",
                            marginBottom: "20px",
                            padding: "16px 0",
                            borderRadius: "14px",
                            border: plan.highlight ? `1px solid ${theme.accent}25` : "1px solid rgba(255,255,255,0.04)",
                        }}
                    >
                        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "center", gap: "3px" }}>
                            <motion.span
                                animate={{ color: isHovered ? theme.accent : "#666" }}
                                style={{ fontSize: "1.1rem", marginTop: "6px", transition: "color 0.3s" }}
                            >
                                $
                            </motion.span>
                            <motion.span
                                animate={{
                                    color: plan.highlight ? theme.accent : isHovered ? theme.accent : "#fff",
                                    textShadow: isHovered || plan.highlight ? `0 0 30px ${theme.accent}60` : "none",
                                }}
                                transition={{ duration: 0.3 }}
                                style={{
                                    fontSize: plan.highlight ? "3rem" : "2.7rem",
                                    fontWeight: 900,
                                    lineHeight: 1,
                                }}
                            >
                                {plan.price}
                            </motion.span>
                            <motion.span
                                animate={{ color: isHovered ? theme.accent : "#666" }}
                                style={{ fontSize: "0.9rem", marginTop: "10px", fontWeight: 600, transition: "color 0.3s" }}
                            >
                                USD
                            </motion.span>
                        </div>
                    </motion.div>

                    {/* Features */}
                    <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "20px" }}>
                        {(plan.features as string[]).map((feature, idx) => (
                            <motion.div
                                key={idx}
                                animate={{
                                    x: isHovered ? 5 : 0,
                                    opacity: isHovered ? 1 : 0.9,
                                }}
                                transition={{ duration: 0.3, delay: idx * 0.02 }}
                                style={{ display: "flex", alignItems: "center", gap: "10px" }}
                            >
                                <motion.div
                                    animate={{
                                        background: plan.highlight || isHovered ? `${theme.accent}30` : "rgba(255,255,255,0.07)",
                                        boxShadow: isHovered ? `0 0 10px ${theme.accent}30` : "none",
                                        scale: isHovered ? 1.1 : 1,
                                    }}
                                    transition={{ duration: 0.3 }}
                                    style={{
                                        flexShrink: 0,
                                        width: "20px",
                                        height: "20px",
                                        borderRadius: "6px",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        color: plan.highlight || isHovered ? theme.accent : "#888",
                                    }}
                                >
                                    <CheckIcon />
                                </motion.div>
                                <motion.span
                                    animate={{ color: isHovered ? "#fff" : "#bbb" }}
                                    style={{ fontSize: "12px", transition: "color 0.3s" }}
                                >
                                    {feature}
                                </motion.span>
                            </motion.div>
                        ))}
                    </div>

                    {/* CTA Button */}
                    <motion.a
                        href={`https://wa.me/595982880043?text=${encodeURIComponent(language === 'en' ? `Hello! I'm interested in the plan "${plan.title} ${plan.titleAccent}" ($${plan.price} USD).` : `Hola! Me interesa el plan "${plan.title} ${plan.titleAccent}" ($${plan.price} USD).`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{
                            scale: 1.05,
                            boxShadow: `0 10px 35px ${theme.accent}50`,
                        }}
                        whileTap={{ scale: 0.97 }}
                        animate={{
                            background: plan.highlight || isHovered
                                ? `linear-gradient(135deg, ${theme.accent}, ${theme.accentDark})`
                                : "rgba(255,255,255,0.06)",
                            color: plan.highlight || isHovered ? "#000" : "#fff",
                            border: plan.highlight || isHovered ? "none" : "1px solid rgba(255,255,255,0.12)",
                        }}
                        transition={{ duration: 0.3 }}
                        style={{
                            display: "block",
                            width: "100%",
                            padding: "14px 22px",
                            borderRadius: "14px",
                            fontSize: "14px",
                            fontWeight: 700,
                            cursor: "pointer",
                            boxShadow: plan.highlight ? `0 8px 25px ${theme.accent}40` : "none",
                            textAlign: "center",
                            textDecoration: "none",
                        }}
                    >
                        {mounted ? t('pricing.cta') : "Contratar ahora"}
                    </motion.a>

                    {/* Note */}
                    <motion.p
                        animate={{ color: isHovered ? `${theme.accent}90` : "rgba(255,255,255,0.4)" }}
                        style={{ textAlign: "center", fontSize: "9px", marginTop: "12px", transition: "color 0.3s" }}
                    >
                        {mounted ? t('pricing.cardNote') : "* Incluye 1er año de hosting y dominio"}
                    </motion.p>
                </motion.div>
            </motion.div>
        );
    };

    return (
        <section id="precios" style={{ position: "relative", padding: "70px 20px", overflow: "hidden", background: "transparent", scrollMarginTop: "100px" }}>
            {/* Background glows */}
            <motion.div
                animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.6, 0.4] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                style={{ position: "absolute", top: "5%", left: "0", width: "30%", height: "60%", background: `radial-gradient(circle, ${theme.accent}15 0%, transparent 70%)`, filter: "blur(90px)", pointerEvents: "none" }}
            />
            <motion.div
                animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.6, 0.4] }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 3 }}
                style={{ position: "absolute", bottom: "5%", right: "0", width: "30%", height: "60%", background: `radial-gradient(circle, ${theme.accentDark}15 0%, transparent 70%)`, filter: "blur(90px)", pointerEvents: "none" }}
            />

            <div style={{ maxWidth: "1100px", margin: "0 auto", position: "relative", zIndex: 10 }}>
                {/* Title */}
                <motion.div
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    style={{ textAlign: "center", marginBottom: "50px" }}
                >
                    {/* Distintivo */}
                    <div
                        className="inline-flex items-center gap-3 px-6 py-3 mb-8 rounded-full cursor-default"
                        style={{
                            background: "rgba(255, 255, 255, 0.03)",
                            border: `2px solid ${theme.accent}30`,
                            backdropFilter: "blur(20px)",
                            display: "inline-flex"
                        }}
                    >
                        <motion.span
                            className="w-3 h-3 rounded-full"
                            style={{ background: theme.accent, boxShadow: `0 0 20px ${theme.accent}80` }}
                            animate={{
                                scale: [1, 1.3, 1],
                                opacity: [1, 0.7, 1],
                            }}
                            transition={{ duration: 2, repeat: Infinity }}
                        />
                        <span className="text-sm font-bold uppercase tracking-[0.2em]" style={{ color: theme.accent }}>
                            {mounted ? t('pricing.badge') : "Inversión Inteligente"}
                        </span>
                    </div>

                    <h2 style={{ fontSize: "clamp(2.2rem, 4vw, 3rem)", fontWeight: 800, marginBottom: "10px", color: "#fff" }}>
                        {mounted ? t('pricing.titleStart') : "Precios"}{" "}
                        <motion.span
                            animate={{ textShadow: [`0 0 20px ${theme.accent}40`, `0 0 35px ${theme.accent}70`, `0 0 20px ${theme.accent}40`] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                            style={{ background: `linear-gradient(135deg, ${theme.accent}, ${theme.accentDark})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}
                        >
                            {mounted ? t('pricing.titleHighlight') : "Webs"}
                        </motion.span>
                    </h2>
                    <p style={{ color: "#777", fontSize: "1rem" }}>{mounted ? t('pricing.subtitle') : "Elige el plan perfecto para tu proyecto"}</p>
                </motion.div>

                {/* Cards */}
                <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", alignItems: "flex-start", gap: "24px" }}>
                    {plans.map((plan, index) => (
                        <PricingCard key={index} plan={plan} index={index} />
                    ))}
                </div>

                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    style={{ marginTop: "50px", textAlign: "center", fontSize: "11px", color: "rgba(255,255,255,0.5)", maxWidth: "600px", margin: "50px auto 0", lineHeight: 1.6 }}
                >
                    {mounted ? t('pricing.footer') : "* Pago único por desarrollo. Planes de mantención mensual disponibles."}
                </motion.p>
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    style={{ marginTop: "15px", textAlign: "center", fontSize: "12px", color: theme.accent, maxWidth: "600px", margin: "15px auto 0", lineHeight: 1.6, fontWeight: 600, padding: "8px 16px", borderRadius: "100px", background: `rgba(0, 217, 255, 0.05)`, border: `1px solid rgba(0, 217, 255, 0.1)` }}
                >
                    {language === 'es' ? "🇵🇾 Empresas en Paraguay: Planes preferenciales y facturación en Guaraníes (PYG) disponibles. ¡Consultanos!" : "🌎 International Clients: Contact us for customized enterprise plans and payment options."}
                </motion.div>
            </div>
        </section>
    );
}
