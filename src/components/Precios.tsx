"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { trackEvent } from "@/lib/analytics";
import { getWhatsAppLink, whatsappMessages } from "@/lib/whatsapp";
import Link from "next/link";

const footerIcons = {
    payment: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
            <rect x="1" y="4" width="22" height="16" rx="2" /><line x1="1" y1="10" x2="23" y2="10" />
        </svg>
    ),
    maintenance: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="3" />
            <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 11-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 008.6 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 11-2.83-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 8.6a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 112.83-2.83l.06.06a1.65 1.65 0 001.82.33H8.6a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 112.83 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V8.6a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />
        </svg>
    ),
};

const additionalIcons = {
    seo: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
            <polyline points="3 17 9 11 13 15 21 7" /><polyline points="14 7 21 7 21 14" />
        </svg>
    ),
    dominio: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" />
            <path d="M12 2a15.3 15.3 0 010 20 15.3 15.3 0 010-20z" />
        </svg>
    ),
    servidor: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="3" width="20" height="7" rx="1.5" /><rect x="2" y="14" width="20" height="7" rx="1.5" />
            <line x1="6" y1="6.5" x2="6.01" y2="6.5" /><line x1="6" y1="17.5" x2="6.01" y2="17.5" />
        </svg>
    ),
    soporte: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 18v-6a9 9 0 0118 0v6" />
            <path d="M21 19a2 2 0 01-2 2h-1a2 2 0 01-2-2v-3a2 2 0 012-2h3zM3 19a2 2 0 002 2h1a2 2 0 002-2v-3a2 2 0 00-2-2H3z" />
        </svg>
    ),
};

const theme = {
    accent: "#00d9ff",
    accentDark: "#0099cc",
    accentGlow: "rgba(0, 217, 255, 0.4)",
};

type AdditionalService = {
    id: string;
    icon: keyof typeof additionalIcons;
    title: string;
    desc: string;
    price: string;
    href: string;
};

// Estado de hover aislado en su propio componente: si viviera en Precios()
// (que también renderiza las 5 PricingCard con sus gradientes/animaciones),
// cada hover forzaría un re-render de TODO ese árbol pesado y se sentía
// trabado. Así, solo re-renderiza esta card puntual.
function AdditionalServiceCard({ service, index, language }: { service: AdditionalService; index: number; language: string }) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.08 }}
            whileHover={{ y: -6 }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            style={{
                padding: "26px",
                background: isHovered ? "#111119" : "#0a0a0f",
                borderRadius: "20px",
                border: `1px solid ${isHovered ? theme.accent + '50' : 'rgba(255,255,255,0.08)'}`,
                boxShadow: isHovered
                    ? `0 16px 34px rgba(0,0,0,0.4), 0 0 30px ${theme.accentGlow}`
                    : "0 6px 18px rgba(0,0,0,0.3)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                gap: "18px",
                position: "relative",
                overflow: "hidden",
                transition: "background 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease"
            }}
        >
            <motion.div
                className="absolute inset-0 pointer-events-none"
                style={{ background: `radial-gradient(circle at 50% 0%, ${theme.accent}18, transparent 70%)` }}
                animate={{ opacity: isHovered ? 1 : 0 }}
                transition={{ duration: 0.4 }}
            />
            <div className="relative">
                <motion.div
                    style={{
                        width: "52px",
                        height: "52px",
                        borderRadius: "14px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: `linear-gradient(135deg, ${theme.accent}25, ${theme.accent}08)`,
                        border: `1px solid ${theme.accent}30`,
                        color: theme.accent,
                        marginBottom: "16px",
                        boxShadow: isHovered ? `0 0 22px ${theme.accentGlow}` : "none",
                    }}
                    animate={{ scale: isHovered ? 1.1 : 1, rotate: isHovered ? [0, -6, 6, 0] : 0 }}
                    transition={{ duration: 0.5 }}
                >
                    {additionalIcons[service.icon]}
                </motion.div>
                <h4 style={{ fontSize: "1.15rem", fontWeight: 800, color: "#fff", marginBottom: "8px" }}>
                    {service.title}
                </h4>
                <p style={{ fontSize: "0.85rem", color: "#999", margin: 0, lineHeight: 1.55 }}>
                    {service.desc}
                </p>
            </div>
            <div className="relative">
                <div style={{ fontSize: "1.25rem", fontWeight: 900, color: theme.accent, marginBottom: "14px" }}>
                    {service.price}
                </div>
                <Link
                    href={service.href}
                    style={{
                        display: "block",
                        textAlign: "center",
                        padding: "12px",
                        borderRadius: "12px",
                        background: isHovered ? theme.accent : "rgba(255,255,255,0.05)",
                        color: isHovered ? "#000" : "#fff",
                        fontSize: "0.85rem",
                        fontWeight: 800,
                        textDecoration: "none",
                        border: `1px solid ${isHovered ? theme.accent : "rgba(255,255,255,0.1)"}`,
                        transition: "background 0.3s ease, color 0.3s ease, border-color 0.3s ease"
                    }}
                >
                    {language === 'es' ? "Ver detalles" : "View details"}
                </Link>
            </div>
        </motion.div>
    );
}

// Mismo motivo que AdditionalServiceCard: hover aislado para no re-renderizar
// todo Precios() en cada movimiento de mouse.
function FooterInfoCard({
    icon,
    title,
    titleRight,
    accentBorder,
    delay,
    children,
}: {
    icon: React.ReactNode;
    title: string;
    titleRight?: React.ReactNode;
    accentBorder?: boolean;
    delay?: number;
    children: React.ReactNode;
}) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: delay || 0 }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            style={{
                padding: "28px",
                background: isHovered ? "#111119" : "#0a0a0f",
                borderRadius: "20px",
                border: `1px solid ${isHovered ? theme.accent + '55' : accentBorder ? 'rgba(0, 217, 255, 0.18)' : 'rgba(255,255,255,0.08)'}`,
                boxShadow: isHovered ? `0 16px 34px rgba(0,0,0,0.4), 0 0 26px ${theme.accentGlow}` : "0 10px 25px rgba(0,0,0,0.3)",
                position: "relative",
                overflow: "hidden",
                transition: "background 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease"
            }}
        >
            <motion.div
                className="absolute inset-0 pointer-events-none"
                style={{ background: `radial-gradient(circle at 50% 0%, ${theme.accent}16, transparent 70%)` }}
                animate={{ opacity: isHovered ? 1 : 0 }}
                transition={{ duration: 0.4 }}
            />
            <div className="relative" style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
                <motion.div
                    style={{
                        width: "44px",
                        height: "44px",
                        borderRadius: "12px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: `linear-gradient(135deg, ${theme.accent}25, ${theme.accent}08)`,
                        border: `1px solid ${theme.accent}30`,
                        color: theme.accent,
                        flexShrink: 0,
                        boxShadow: isHovered ? `0 0 20px ${theme.accentGlow}` : "none",
                    }}
                    animate={{ scale: isHovered ? 1.1 : 1 }}
                    transition={{ duration: 0.4 }}
                >
                    {icon}
                </motion.div>
                <h4 style={{ fontSize: "1.15rem", fontWeight: 800, color: "#fff", margin: 0, flex: 1 }}>
                    {title}
                </h4>
                {titleRight}
            </div>
            <div className="relative">
                {children}
            </div>
        </motion.div>
    );
}

export default function Precios() {
    const { t, language } = useLanguage();

    const additionalServices = [
        {
            id: "seo",
            icon: "seo" as const,
            title: language === 'es' ? "Posicionamiento en Google y Maps" : "Google SEO & Maps",
            desc: language === 'es' ? "Mejorá la presencia local de tu negocio y hacé que te encuentren fácilmente." : "Improve local presence and get found easily.",
            price: language === 'es' ? "Desde Gs. 275.000 / mes" : "From Gs. 275.000 / month",
            href: `/${language}/servicios/posicionamiento-google`,
        },
        {
            id: "hosting",
            icon: "servidor" as const,
            title: language === 'es' ? "Hosting Web Administrado" : "Managed Web Hosting",
            desc: language === 'es' ? "Servidor rápido, seguro y sin que tengas que ocuparte del mantenimiento técnico." : "Fast, secure server hosting without you having to handle the technical maintenance.",
            price: language === 'es' ? "Gs. 120.000 / mes" : "Gs. 120.000 / month",
            href: `/${language}/servicios/hosting-web-administrado`,
        },
        {
            id: "dominio",
            icon: "dominio" as const,
            title: language === 'es' ? "Dominio + Configuración Web" : "Domain + Web Setup",
            desc: language === 'es' ? "La base para que tu sitio esté online con una dirección profesional y estable." : "The foundation for a stable, professional web address.",
            price: language === 'es' ? "Gs. 250.000 / año" : "Gs. 250.000 / year",
            href: `/${language}/servicios/dominio-configuracion-web`,
        },
        {
            id: "soporte",
            icon: "soporte" as const,
            title: language === 'es' ? "Soporte Web Básico" : "Basic Web Support",
            desc: language === 'es' ? "Cambios simples, ajustes menores y actualización básica de contenido." : "Simple edits, minor updates, and content management.",
            price: language === 'es' ? "Desde Gs. 45.000 / mes" : "From Gs. 45.000 / month",
            href: `/${language}/servicios/soporte-web-basico`,
        },
    ];

    const plans = t('pricing.plans') as Array<{
        id: string;
        title: string;
        titleAccent: string;
        description: string;
        priceGs: string;
        priceUsd: string;
        specialDesc?: string;
        features: string[];
        btnText: string;
        whatsappKey: string;
        highlight: boolean;
    }>;

    const CheckIcon = () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
        </svg>
    );

    const PricingCard = ({ plan, index }: { plan: typeof plans[0] & { link?: string }; index: number }) => {
        const [isHovered, setIsHovered] = useState(false);
        const whatsappMsg = whatsappMessages[language][plan.whatsappKey as keyof typeof whatsappMessages['es']];
        const whatsappHref = getWhatsAppLink(whatsappMsg);

        const isWhatsApp = !plan.link;
        const href = plan.link || whatsappHref;

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
                    maxWidth: "280px",
                    flex: "1 1 250px",
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
                        padding: plan.highlight ? "30px 22px 22px" : "24px 20px",
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
                                whiteSpace: "nowrap"
                            }}
                        >
                            ✨ {t('pricing.tag')}
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
                            style={{ fontSize: "1.45rem", fontWeight: 800, lineHeight: 1.1, marginBottom: "2px" }}
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
                                fontSize: "1.45rem",
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
                            scale: isHovered ? 1.05 : 1,
                            background: isHovered ? `rgba(0, 217, 255, 0.08)` : plan.highlight ? `rgba(0, 217, 255, 0.05)` : "rgba(255,255,255,0.02)",
                        }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        style={{
                            textAlign: "center",
                            marginBottom: "20px",
                            padding: "12px 0",
                            borderRadius: "14px",
                            border: plan.highlight ? `1px solid ${theme.accent}25` : "1px solid rgba(255,255,255,0.04)",
                        }}
                    >
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                            <motion.span
                                animate={{
                                    color: plan.highlight ? theme.accent : isHovered ? theme.accent : "#fff",
                                    textShadow: isHovered || plan.highlight ? `0 0 30px ${theme.accent}60` : "none",
                                }}
                                transition={{ duration: 0.3 }}
                                style={{
                                    fontSize: "1.65rem",
                                    fontWeight: 900,
                                    lineHeight: 1.1,
                                    marginBottom: "4px"
                                }}
                            >
                                {plan.priceGs}
                            </motion.span>
                            <motion.span
                                animate={{ color: isHovered ? theme.accent : "#888" }}
                                style={{ fontSize: "0.85rem", fontWeight: 600, transition: "color 0.3s" }}
                            >
                                {plan.priceUsd}
                            </motion.span>
                        </div>
                    </motion.div>

                    {/* Special description for custom plan */}
                    {plan.specialDesc && (
                        <p style={{ color: "#888", fontSize: "11px", margin: "-8px 0 16px 0", lineHeight: 1.4, textAlign: "center" }}>
                            {plan.specialDesc}
                        </p>
                    )}

                    {/* Features */}
                    <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "20px" }}>
                        {plan.features.map((feature, idx) => (
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
                                    style={{ fontSize: "11px", transition: "color 0.3s" }}
                                >
                                    {feature}
                                </motion.span>
                            </motion.div>
                        ))}
                    </div>

                    {/* CTA Button */}
                    <motion.a
                        href={href}
                        target={isWhatsApp ? "_blank" : undefined}
                        rel={isWhatsApp ? "noopener noreferrer" : undefined}
                        onClick={() => {
                            if (isWhatsApp) {
                                trackEvent('click_whatsapp', { source: 'pricing', plan: plan.id, lang: language });
                            } else {
                                trackEvent('click_service_detail', { source: 'pricing', plan: plan.id, lang: language });
                            }
                        }}
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
                            padding: "12px 16px",
                            borderRadius: "14px",
                            fontSize: "13px",
                            fontWeight: 800,
                            cursor: "pointer",
                            boxShadow: plan.highlight ? `0 8px 25px ${theme.accent}40` : "none",
                            textAlign: "center",
                            textDecoration: "none",
                        }}
                    >
                        {plan.btnText}
                    </motion.a>

                    {/* Note */}
                    <motion.p
                        animate={{ color: isHovered ? `${theme.accent}90` : "rgba(255,255,255,0.4)" }}
                        style={{ textAlign: "center", fontSize: "9px", marginTop: "12px", transition: "color 0.3s", lineHeight: 1.3 }}
                    >
                        {t('pricing.cardNote')}
                    </motion.p>
                </motion.div>
            </motion.div>
        );
    };

    return (
        <section id="precios" style={{ position: "relative", padding: "80px 20px", overflow: "hidden", background: "transparent", scrollMarginTop: "100px" }}>
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

            <div style={{ maxWidth: "1200px", margin: "0 auto", position: "relative", zIndex: 10 }}>
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
                            {t('pricing.badge')}
                        </span>
                    </div>

                    <h2 style={{ fontSize: "clamp(2.2rem, 4vw, 3.2rem)", fontWeight: 900, marginBottom: "10px", color: "#fff", letterSpacing: "-0.02em" }}>
                        {t('pricing.titleStart')}{" "}
                        <motion.span
                            animate={{ textShadow: [`0 0 20px ${theme.accent}40`, `0 0 35px ${theme.accent}70`, `0 0 20px ${theme.accent}40`] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                            style={{ background: `linear-gradient(135deg, ${theme.accent}, ${theme.accentDark})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}
                        >
                            {t('pricing.titleHighlight')}
                        </motion.span>
                    </h2>
                    <p style={{ color: "#777", fontSize: "1.05rem", maxWidth: "700px", margin: "0 auto" }}>{t('pricing.subtitle')}</p>
                </motion.div>

                {/* Cards Grid - Responsive Wrap */}
                <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", alignItems: "stretch", gap: "24px" }}>
                    {plans && plans.map((plan, index) => (
                        <PricingCard key={plan.id || index} plan={plan} index={index} />
                    ))}
                </div>

                {/* Servicios Complementarios */}
                <div style={{ marginTop: "64px", marginBottom: "32px", textAlign: "center" }}>
                    <h3 style={{ fontSize: "1.75rem", fontWeight: 800, color: "#fff", marginBottom: "32px" }}>
                        {language === 'es' ? "Servicios Adicionales" : "Additional Services"}
                    </h3>
                    <div style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                        gap: "24px",
                        justifyContent: "center"
                    }}>
                        {additionalServices.map((service, index) => (
                            <AdditionalServiceCard key={service.id} service={service} index={index} language={language} />
                        ))}
                    </div>
                </div>

                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    style={{ marginTop: "32px", textAlign: "center", fontSize: "11px", color: "rgba(255,255,255,0.4)", maxWidth: "800px", margin: "32px auto 0", lineHeight: 1.6 }}
                >
                    {t('pricing.footer')}
                </motion.p>

                {/* Optional Maintenance & Payment Method Section */}
                <div style={{
                    marginTop: "56px",
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))",
                    gap: "24px",
                    borderTop: "1px solid rgba(255, 255, 255, 0.08)",
                    paddingTop: "40px"
                }}>
                    {/* Payment Method */}
                    <FooterInfoCard icon={footerIcons.payment} title={t('pricing.paymentTitle')}>
                        <p style={{ fontSize: "0.875rem", color: "#ccc", lineHeight: 1.6, margin: "0 0 10px" }}>
                            {t('pricing.paymentText')}
                        </p>
                        <p style={{ fontSize: "0.775rem", color: "#777", lineHeight: 1.5, margin: 0 }}>
                            {t('pricing.paymentSubtext')}
                        </p>
                    </FooterInfoCard>

                    <FooterInfoCard
                        icon={footerIcons.maintenance}
                        title={t('pricing.maintenanceTitle')}
                        accentBorder
                        delay={0.1}
                        titleRight={
                            <div style={{ textAlign: "right", flexShrink: 0 }}>
                                <span style={{ fontSize: "0.95rem", fontWeight: 800, color: theme.accent, display: "block" }}>
                                    {t('pricing.maintenancePrice')}
                                </span>
                                <span style={{ fontSize: "0.75rem", color: "#777" }}>
                                    {t('pricing.maintenancePriceSub')}
                                </span>
                            </div>
                        }
                    >
                        <ul style={{ paddingLeft: "18px", margin: 0, display: "flex", flexDirection: "column", gap: "8px" }}>
                            {(t('pricing.maintenanceIncludes') as string[] || []).map((inc, i) => (
                                <li key={i} style={{ fontSize: "0.85rem", color: "#bbb", listStyleType: "disc" }}>
                                    {inc}
                                </li>
                            ))}
                        </ul>
                    </FooterInfoCard>
                </div>
            </div>
        </section>
    );
}
