"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";

export default function Proceso() {
    const { t } = useLanguage();
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    const pasos = [
        {
            numero: "01",
            titulo: t('process.steps.consultation.title'),
            descripcion: t('process.steps.consultation.desc'),
            icon: (
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 01.978-2.025c.09-.103.201-.202.339-.338C3.134 17.242 1.5 14.787 1.5 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
                </svg>
            ),
            duracion: t('process.steps.consultation.duration'),
        },
        {
            numero: "02",
            titulo: t('process.steps.proposal.title'),
            descripcion: t('process.steps.proposal.desc'),
            icon: (
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                </svg>
            ),
            duracion: t('process.steps.proposal.duration'),
        },
        {
            numero: "03",
            titulo: t('process.steps.design.title'),
            descripcion: t('process.steps.design.desc'),
            icon: (
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
                </svg>
            ),
            duracion: t('process.steps.design.duration'),
        },
        {
            numero: "04",
            titulo: t('process.steps.development.title'),
            descripcion: t('process.steps.development.desc'),
            icon: (
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
                </svg>
            ),
            duracion: t('process.steps.development.duration'),
        },
        {
            numero: "05",
            titulo: t('process.steps.quality.title'),
            descripcion: t('process.steps.quality.desc'),
            icon: (
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.333 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751A11.959 11.959 0 0112 2.714z" />
                </svg>
            ),
            duracion: t('process.steps.quality.duration'),
        },
        {
            numero: "06",
            titulo: t('process.steps.launch.title'),
            descripcion: t('process.steps.launch.desc'),
            icon: (
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.96 5.96m0 0L2.25 21l.75-7.5 7.38-7.38m0 0a15.02 15.02 0 01-7.5-7.5" />
                </svg>
            ),
            duracion: t('process.steps.launch.duration'),
        },
    ];

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

    return (
        <section
            id="proceso"
            className="relative overflow-hidden flex justify-center"
            style={{
                // Antes 140px, pensado para cuando venía justo después del
                // Hero. Ahora tiene Confianza/IdealPara en el medio (con su
                // propio padding), y ese margen extra sumaba un salto grande.
                marginTop: '48px',
                scrollMarginTop: '100px'
            }}
        >
            {/* Efectos de fondo */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />
            </div>

            <div className="section-tablet-pad w-full max-w-7xl px-6 md:px-8 relative z-10">
                {/* Encabezado */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-20 md:mb-40"
                >
                    {/* Distintivo similar a Servicios */}
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
                            {t('process.badge')}
                        </span>
                    </motion.div>

                    <h2 className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 px-4" style={{ margin: '1rem 0' }}>
                        <span style={{ color: theme.text }}>{t('process.titleStart')} </span>
                        <br className="md:hidden" />
                        <span style={{
                            background: `linear-gradient(135deg, ${theme.accent}, ${theme.accentDark})`,
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                        }}>
                            {t('process.titleHighlight')}
                        </span>
                    </h2>

                    <div className="flex justify-center w-full px-6">
                        <p className="text-base md:text-xl lg:text-2xl max-w-3xl leading-relaxed text-center opacity-80" style={{ color: theme.textMuted, margin: '1rem 0' }}>
                            {t('process.subtitle')}
                        </p>
                    </div>
                </motion.div>

                {/* Cuadrícula del proceso */}
                <div className="section-tablet-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16 justify-items-center md:justify-items-stretch relative">
                    {pasos.map((paso, index) => (
                        <motion.div
                            key={paso.numero}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{
                                duration: 0.8,
                                delay: index * 0.1,
                                type: "spring",
                                stiffness: 100,
                            }}
                            whileHover={{ y: -10 }}
                            onHoverStart={() => setHoveredIndex(index)}
                            onHoverEnd={() => setHoveredIndex(null)}
                            className="relative group w-full max-w-[400px] mx-auto md:max-w-none h-full"
                        >
                            <div className="relative p-7 md:p-8 rounded-[40px] h-full flex flex-col transition-all duration-700 overflow-hidden"
                                style={{
                                    background: `linear-gradient(180deg, ${theme.bgCard} 0%, #050505 100%)`,
                                    border: `1px solid ${hoveredIndex === index ? theme.accent + '40' : theme.accent + '10'}`,
                                    boxShadow: hoveredIndex === index
                                        ? `0 20px 50px rgba(0, 0, 0, 0.9), 0 0 60px ${theme.accentGlow}`
                                        : `0 20px 40px rgba(0,0,0,0.5)`
                                }}>

                                {/* Superposición sutil de gradiente en hover */}
                                <motion.div
                                    className="absolute inset-0 rounded-[40px] opacity-0 transition-opacity duration-500"
                                    style={{
                                        background: `radial-gradient(circle at center, ${theme.accent}08, transparent 80%)`,
                                    }}
                                    animate={{ opacity: hoveredIndex === index ? 1 : 0 }}
                                />

                                {/* Encabezado del paso */}
                                <div className="mb-10 flex items-center justify-between">
                                    <motion.div
                                        className="inline-flex items-center justify-center w-16 h-16 rounded-2xl border border-white/5 bg-white/5 relative z-10"
                                        style={{ color: theme.accent }}
                                        animate={{
                                            scale: hoveredIndex === index ? 1.15 : 1,
                                            rotate: hoveredIndex === index ? [0, 10, -10, 0] : 0,
                                        }}
                                        transition={{ duration: 0.5 }}
                                    >
                                        <div className="absolute inset-0 rounded-2xl blur-[15px] opacity-0 group-hover:opacity-20 transition-opacity" style={{ background: theme.accent }} />
                                        {paso.icon}
                                    </motion.div>

                                    <motion.span
                                        className="text-5xl font-black select-none transition-all duration-700"
                                        style={{
                                            color: theme.accent,
                                            WebkitTextStroke: `1px ${theme.accent}60`,
                                            opacity: hoveredIndex === index ? 0.6 : 0.25,
                                            fontStyle: 'italic',
                                            display: 'block'
                                        }}
                                        animate={{
                                            scale: hoveredIndex === index ? 1.15 : 1,
                                        }}
                                    >
                                        {paso.numero}
                                    </motion.span>
                                </div>

                                {/* Sección de contenido */}
                                <div className="relative z-10 flex-grow">
                                    <h3 className="text-xl font-bold tracking-tight" style={{ color: theme.text, marginBottom: "0.75rem" }}>
                                        {paso.titulo}
                                    </h3>

                                    <p className="text-base leading-relaxed font-light transition-opacity duration-500"
                                        style={{
                                            color: theme.textMuted,
                                            opacity: hoveredIndex === index ? 1 : 0.7,
                                            marginBottom: "1.25rem"
                                        }}>
                                        {paso.descripcion}
                                    </p>
                                </div>

                                {/* Etiqueta de duración - Pie de página separado */}
                                <div className="relative z-10 mt-auto pt-10 border-t border-white/5">
                                    <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-xl border border-white/5 bg-white/5 text-xs font-bold uppercase tracking-[0.2em]"
                                        style={{ color: theme.accent, position: "relative", right: "-20px" }}>
                                        <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: theme.accent }} />
                                        {paso.duracion}
                                    </div>
                                </div>

                                {/* Resplandor exterior sutil */}
                                <motion.div
                                    className="absolute -inset-2 rounded-[40px] opacity-0 blur-xl -z-10 pointer-events-none transition-opacity duration-500"
                                    style={{
                                        background: `radial-gradient(circle, ${theme.accent}20, transparent 70%)`,
                                    }}
                                    animate={{ opacity: hoveredIndex === index ? 1 : 0 }}
                                />

                                {/* Detalles decorativos en las esquinas */}
                                <div className="absolute top-0 right-0 w-24 h-24 border-t border-r rounded-tr-[40px] opacity-0 group-hover:opacity-100 transition-all duration-700 scale-95 group-hover:scale-100"
                                    style={{ borderColor: theme.accent + '40' }} />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}