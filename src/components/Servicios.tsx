"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { trackEvent } from "@/lib/analytics";

export default function Servicios() {
    const { t, language } = useLanguage();
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    const theme = {
        bg: "#000000",
        bgCard: "#0a0a0a",
        bgCardHover: "#111111",
        accent: "#00d9ff",
        accentDark: "#0099cc",
        accentGlow: "rgba(0, 217, 255, 0.5)",
        text: "#ffffff",
        textMuted: "#888888"
    };

    const servicios = [
        {
            numero: "01",
            titulo: t('services.items.web.title'),
            descripcion: t('services.items.web.desc'),
            href: `/${language}/servicios/desarrollo-web-paraguay`,
            icon: (
                <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
                </svg>
            ),
        },
        {
            numero: "02",
            titulo: t('services.items.landing.title'),
            descripcion: t('services.items.landing.desc'),
            href: `/${language}/#contacto`,
            icon: (
                <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
                </svg>
            ),
        },
        {
            numero: "03",
            titulo: t('services.items.catalogo.title'),
            descripcion: t('services.items.catalogo.desc'),
            href: `/${language}/#contacto`,
            icon: (
                <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                </svg>
            ),
        },
        {
            numero: "04",
            titulo: t('services.items.ecommerce.title'),
            descripcion: t('services.items.ecommerce.desc'),
            href: `/${language}/#contacto`,
            icon: (
                <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                </svg>
            ),
        },
        {
            numero: "05",
            titulo: t('services.items.apps.title'),
            descripcion: t('services.items.apps.desc'),
            href: `/${language}/servicios/sistemas-informaticos-paraguay`,
            icon: (
                <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z" />
                </svg>
            ),
        },
        {
            numero: "06",
            titulo: t('services.items.maintenance.title'),
            descripcion: t('services.items.maintenance.desc'),
            href: `/${language}/#contacto`,
            icon: (
                <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
            ),
        },
    ];

    return (
        <section
            id="servicios"
            className="min-h-screen relative overflow-hidden flex flex-col items-start lg:items-center justify-start lg:justify-center"
            style={{
                // Antes 140px: pensado para cuando esta sección venía justo
                // después del Hero. Ahora tiene VideoTestimonials en el medio
                // (que ya trae su propio padding inferior), así que ese
                // margen se sumaba y quedaba un salto enorme entre ambas.
                marginTop: '48px',
                scrollMarginTop: '100px'
            }}
        >
            {/* Efectos de fondo optimizados (contain: paint) */}
            <div className="absolute inset-0 opacity-[0.02]" style={{ contain: 'paint' }}>
                <motion.div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `
                            linear-gradient(${theme.accent} 2px, transparent 2px),
                            linear-gradient(90deg, ${theme.accent} 2px, transparent 2px)
                        `,
                        backgroundSize: "80px 80px",
                        willChange: "transform",
                    }}
                    animate={{
                        backgroundPosition: ["0px 0px", "80px 80px"],
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                />
            </div>

            {/* Orbes flotantes optimizados (contain: strict para 0 CLS) */}
            <div className="absolute inset-0 pointer-events-none" style={{ contain: 'strict' }}>
                <motion.div
                    className="absolute top-1/4 -left-40 w-96 h-96 rounded-full"
                    style={{
                        background: `radial-gradient(circle, ${theme.accentGlow}, transparent 70%)`,
                        filter: "blur(120px)",
                        willChange: "transform, opacity",
                    }}
                    animate={{
                        x: [0, 100, 0],
                        y: [0, -50, 0],
                        scale: [1, 1.2, 1],
                    }}
                    transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                />

                <motion.div
                    className="absolute bottom-1/4 -right-40 w-96 h-96 rounded-full"
                    style={{
                        background: `radial-gradient(circle, ${theme.accentGlow}, transparent 70%)`,
                        filter: "blur(120px)",
                        willChange: "transform, opacity",
                    }}
                    animate={{
                        x: [0, -100, 0],
                        y: [0, 50, 0],
                        scale: [1, 1.3, 1],
                    }}
                    transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
                />
            </div>

            <div className="section-tablet-pad w-full max-w-7xl mx-auto px-6 md:px-8 relative z-10">
                {/* Encabezado */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-24"
                >
                    {/* Distintivo */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, type: "spring" }}
                        className="inline-flex items-center gap-3 px-6 py-3 mb-8 rounded-full cursor-default"
                        style={{
                            background: `linear-gradient(135deg, ${theme.bgCard}cc, ${theme.bgCardHover}cc)`,
                            border: `2px solid ${theme.accent}30`,
                            backdropFilter: "blur(20px)",
                        }}
                    >
                        <motion.span
                            className="w-3 h-3 rounded-full"
                            style={{ background: theme.accent, boxShadow: `0 0 20px ${theme.accentGlow}` }}
                            animate={{
                                scale: [1, 1.3, 1],
                                opacity: [1, 0.7, 1],
                            }}
                            transition={{ duration: 2, repeat: Infinity }}
                        />
                        <span className="text-sm font-bold uppercase tracking-[0.2em]" style={{ color: theme.accent }}>
                            {t('services.badge')}
                        </span>
                    </motion.div>

                    {/* Título */}
                    <h2 className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 px-4" style={{ margin: '1rem 0' }}>
                        <span style={{ color: theme.text }}>{t('services.titleStart')} </span>
                        <br className="md:hidden" />
                        <span
                            style={{
                                background: `linear-gradient(135deg, ${theme.accent}, ${theme.accentDark})`,
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                            }}
                        >
                            {t('services.titleHighlight')}
                        </span>
                    </h2>

                    {/* Subtítulo */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="flex justify-center w-full px-6"
                    >
                        <p className="text-base md:text-xl lg:text-2xl max-w-3xl leading-relaxed text-center opacity-80" style={{ color: theme.textMuted, margin: '1rem 0' }}>
                            {t('services.subtitle')}
                        </p>
                    </motion.div>
                </motion.div>

                {/* Cuadrícula de servicios */}
                <div className="section-tablet-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 justify-items-center md:justify-items-stretch mb-24">
                    {servicios.map((servicio, index) => {
                        const isHovered = hoveredIndex === index;
                        return (
                            <motion.a
                                href={servicio.href || "#contacto"}
                                key={servicio.numero}
                                onClick={() => trackEvent('click_service_detail', { source: 'home_services', service: servicio.titulo, lang: language })}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{
                                    duration: 0.6,
                                    delay: index * 0.1,
                                    type: "spring",
                                    stiffness: 100,
                                }}
                                whileHover={{ y: -8 }}
                                onHoverStart={() => setHoveredIndex(index)}
                                onHoverEnd={() => setHoveredIndex(null)}
                                className="relative group w-full max-w-[380px] mx-auto md:max-w-none block"
                            >
                                {/* Contenedor de la tarjeta */}
                                <div
                                    className="relative p-10 rounded-2xl flex flex-col items-center text-center backdrop-blur-xl transition-all duration-500"
                                    style={{
                                        background: `linear-gradient(135deg, ${theme.bgCard}dd, ${theme.bgCardHover}dd)`,
                                        border: `2px solid ${isHovered ? theme.accent + '40' : theme.accent + '10'}`,
                                        boxShadow: isHovered
                                            ? `0 20px 50px rgba(0, 0, 0, 0.9), 0 0 60px ${theme.accentGlow}`
                                            : `0 8px 32px rgba(0, 0, 0, 0.6)`,
                                        padding: "1rem",
                                    }}
                                >
                                    {/* Superposición sutil en hover */}
                                    <motion.div
                                        className="absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500"
                                        style={{
                                            background: `radial-gradient(circle at center, ${theme.accent}08, transparent 80%)`,
                                        }}
                                        animate={{ opacity: isHovered ? 1 : 0 }}
                                    />

                                    {/* Insignia de número */}
                                    <div
                                        className="absolute top-8 left-8 text-4xl font-black opacity-20 select-none group-hover:opacity-40 transition-all duration-500 group-hover:scale-125 group-hover:-rotate-12 italic"
                                        style={{
                                            color: theme.accent,
                                            textShadow: `0 0 20px ${theme.accentGlow}`
                                        }}
                                    >
                                        {servicio.numero}
                                    </div>

                                    {/* Contenedor de icono central */}
                                    <motion.div
                                        className="w-20 h-20 rounded-2xl flex items-center justify-center mb-10 relative z-10"
                                        style={{
                                            margin: "1rem",
                                            background: `linear-gradient(135deg, ${theme.accent}20, ${theme.accent}05)`,
                                            border: `2px solid ${theme.accent}30`,
                                            color: theme.accent,
                                            boxShadow: isHovered ? `0 0 30px ${theme.accentGlow}` : "none",
                                        }}
                                        animate={{
                                            scale: isHovered ? 1.15 : 1,
                                            rotate: isHovered ? [0, 10, -10, 0] : 0,
                                        }}
                                        transition={{ duration: 0.5 }}
                                    >
                                        <div className="w-10 h-10">
                                            {servicio.icon}
                                        </div>
                                    </motion.div>

                                    {/* Título refinado */}
                                    <h3 className="text-xl md:text-2xl font-bold mb-5 relative z-10 tracking-tight" style={{ color: theme.text }}>
                                        {servicio.titulo}
                                    </h3>

                                    {/* Descripción equilibrada */}
                                    <p className="text-xs md:text-sm leading-relaxed max-w-[240px] relative z-10 line-clamp-3" style={{ color: theme.textMuted }}>
                                        {servicio.descripcion}
                                    </p>

                                    {/* Resplandor exterior sutil */}
                                    <motion.div
                                        className="absolute -inset-2 rounded-2xl opacity-0 blur-xl -z-10 pointer-events-none transition-opacity duration-500"
                                        style={{
                                            background: `radial-gradient(circle, ${theme.accent}20, transparent 70%)`,
                                        }}
                                        animate={{ opacity: isHovered ? 1 : 0 }}
                                    />
                                </div>
                            </motion.a>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
