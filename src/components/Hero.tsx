"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useTransform, useMotionValue, useSpring } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

export default function Hero() {
    const { t } = useLanguage();
    const theme = {
        bg: "#000000",
        bgNav: "#050505",
        bgCard: "#0a0a0a",
        bgCardHover: "#111111",
        accent: "#00d9ff",
        accentDark: "#0099cc",
        accentGlow: "rgba(0, 217, 255, 0.5)",
        text: "#ffffff",
        textMuted: "#888888"
    };

    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 1024);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const stats = [
        {
            value: "10+",
            label: t('hero.stat1'),
            icon: (
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
            )
        },
        {
            value: "6+",
            label: t('hero.stat2'),
            icon: (
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
            )
        },
        {
            value: "100%",
            label: t('hero.stat3'),
            icon: (
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            )
        },
        {
            value: "5★",
            label: "Calificación",
            icon: (
                <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
            )
        },
    ];

    return (
        <section
            id="inicio"
            className="relative min-h-screen flex flex-col items-center justify-start lg:justify-center overflow-hidden"
            style={{
                paddingTop: isMobile ? 'clamp(100px, 15vh, 200px)' : '0',
                scrollMarginTop: '100px'
            }}
        >
            {/* Glow ambiental optimizado (contain: paint para evitar CLS) */}
            <div className="absolute inset-0 pointer-events-none" style={{ contain: 'paint' }}>
                <div
                    className="absolute top-0 left-1/4 w-96 h-96 rounded-full opacity-20"
                    style={{
                        background: `radial-gradient(circle, ${theme.accent}, transparent 70%)`,
                        filter: "blur(80px)",
                        willChange: "transform, opacity",
                    }}
                />
            </div>

            {/* Contenido principal */}
            <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 md:px-8 pb-12 md:pb-20">
                <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-12 lg:gap-20 items-center">

                    {/* IZQUIERDA: Texto */}
                    <div className="flex flex-col gap-6 md:gap-8 items-center lg:items-start text-center lg:text-left">
                        {/* Badge con animación CSS para evitar retraso de hidratación */}
                        <div
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full w-fit cursor-default animate-fade-in-up"
                            style={{
                                background: `${theme.bgCard}80`,
                                border: `1px solid ${theme.accent}40`,
                            }}
                        >
                            <span
                                className="w-2 h-2 rounded-full"
                                style={{ background: theme.accent }}
                            />
                            <span
                                className="text-xs font-semibold tracking-wide uppercase"
                                style={{ color: theme.accent }}
                            >
                                {t('hero.badge')}
                            </span>
                        </div>

                        {/* Título optimizado para LCP con CSS Puro */}
                        <h1
                            className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight animate-hero-fade"
                            style={{ transform: 'translate3d(0,0,0)' }}
                        >
                            <span style={{ color: theme.text }}>
                                {t('hero.titleStart')}
                            </span>
                            <br />
                            <span
                                style={{
                                    background: `linear-gradient(135deg, ${theme.accent}, ${theme.accentDark})`,
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent",
                                }}
                            >
                                {t('hero.titleHighlight')}
                            </span>
                            <br />
                            <span style={{ color: theme.text, fontSize: '0.8em' }}>
                                {t('hero.titleEnd')}
                            </span>
                        </h1>

                        {/* Descripción corta */}
                        <p
                            className="text-base md:text-lg max-w-lg leading-relaxed opacity-80 animate-fade-in"
                            style={{ color: theme.textMuted, animationDelay: '0.4s' }}
                        >
                            {t('hero.description')}
                        </p>

                        {/* Botones de acción */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="flex flex-col sm:flex-row gap-4 w-fit sm:w-auto mx-auto lg:mx-0"
                        >
                            {/* Botón primario */}
                            <motion.a
                                href="#proyectos"
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.98 }}
                                className="relative rounded-full font-bold text-lg overflow-hidden group cursor-pointer flex items-center justify-center"
                                style={{
                                    padding: "0.75rem 1.5rem",
                                    whiteSpace: "nowrap",
                                }}
                            >
                                {/* Fondo gradiente animado */}
                                <motion.div
                                    className="absolute inset-0"
                                    style={{
                                        background: `linear-gradient(135deg, ${theme.accent}, ${theme.accentDark}, ${theme.accent})`,
                                        boxShadow: `0 0 40px ${theme.accentGlow}, 0 8px 30px ${theme.accentGlow}`,
                                    }}
                                    whileHover={{
                                        boxShadow: `0 0 60px ${theme.accentGlow}, 0 12px 40px ${theme.accentGlow}`,
                                    }}
                                />

                                {/* Efecto de luz deslizante */}
                                <motion.div
                                    className="absolute inset-0"
                                    style={{
                                        background: `linear-gradient(90deg, transparent 20%, rgba(255, 255, 255, 0.4), transparent 80%)`,
                                    }}
                                    animate={{ x: ["-200%", "200%"] }}
                                    transition={{ duration: 2.5, repeat: Infinity, ease: "linear", repeatDelay: 1 }}
                                />

                                {/* Borde pulsante */}
                                <motion.div
                                    className="absolute inset-0 rounded-full"
                                    style={{ border: `2px solid ${theme.accent}` }}
                                    animate={{
                                        scale: [1, 1.08, 1],
                                        opacity: [0.5, 0, 0.5],
                                    }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                />

                                {/* Texto */}
                                <span
                                    className="relative flex items-center justify-center gap-4 px-4"
                                    style={{ color: theme.bg }}
                                >
                                    {t('hero.ctaPrimary')}
                                    <motion.svg
                                        className="w-5 h-5"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        strokeWidth={2.5}
                                        animate={{ x: [0, 4, 0] }}
                                        transition={{ duration: 1.5, repeat: Infinity }}
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                    </motion.svg>
                                </span>
                            </motion.a>

                            {/* Botón secundario */}
                            <motion.a
                                href="#contacto"
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.98 }}
                                className="relative rounded-full font-bold text-lg overflow-hidden group cursor-pointer flex items-center justify-center"
                                style={{
                                    padding: "0.75rem 1.5rem",
                                    whiteSpace: "nowrap",
                                    background: `${theme.bgCard}dd`,
                                    border: `2px solid ${theme.accent}40`,
                                    color: theme.text,
                                    backdropFilter: "blur(20px)",
                                    boxShadow: `0 4px 20px rgba(0, 0, 0, 0.6)`,
                                }}
                            >
                                {/* Glow hover */}
                                <motion.div
                                    className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100"
                                    style={{
                                        background: `radial-gradient(circle at center, ${theme.accent}15, transparent 70%)`,
                                        boxShadow: `0 0 40px ${theme.accentGlow}`,
                                    }}
                                    transition={{ duration: 0.3 }}
                                />

                                {/* Borde hover */}
                                <motion.div
                                    className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100"
                                    style={{ border: `2px solid ${theme.accent}` }}
                                    transition={{ duration: 0.3 }}
                                />

                                <span className="relative px-4">{t('hero.ctaSecondary')}</span>
                            </motion.a>
                        </motion.div>
                    </div>

                    {/* DERECHA: Tarjetas de estadísticas 2x2 */}
                    <div className="flex justify-center lg:justify-end w-full lg:w-auto mt-8 lg:mt-0">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-8 max-w-[280px] sm:max-w-md w-full">
                            {stats.map((stat, i) => (
                                <StatsCard key={i} stat={stat} index={i} theme={theme} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

// Tarjeta de estadística con efectos 3D
function StatsCard({ stat, index, theme }: { stat: any; index: number; theme: any }) {
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const mouseX = useSpring(x, { stiffness: 500, damping: 100 });
    const mouseY = useSpring(y, { stiffness: 500, damping: 100 });

    const cardRef = useRef<HTMLDivElement>(null);

    function handleMouseMove({ clientX, clientY }: any) {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        x.set((clientX - rect.left) / rect.width - 0.5);
        y.set((clientY - rect.top) / rect.height - 0.5);
    }

    function handleMouseLeave() {
        x.set(0);
        y.set(0);
    }

    const rotateX = useTransform(mouseY, [-0.5, 0.5], [10, -10]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], [-10, 10]);

    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 + index * 0.05, type: "spring" }} // Delay optimizado
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative p-6 md:p-10 rounded-3xl cursor-pointer group"
        >
            {/* Fondo de la tarjeta */}
            <div
                className="absolute inset-0 rounded-3xl backdrop-blur-xl transition-all duration-500"
                style={{
                    background: `linear-gradient(135deg, ${theme.bgCard}dd, ${theme.bgCardHover}dd)`,
                    border: `2px solid ${theme.accent}30`,
                    boxShadow: `0 8px 32px rgba(0, 0, 0, 0.6), 0 0 40px ${theme.accentGlow}`,
                }}
            />

            {/* Resplandor al pasar el cursor */}
            <motion.div
                className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                    background: `radial-gradient(circle at 50% 0%, ${theme.accent}30, transparent 70%)`,
                    boxShadow: `0 0 60px ${theme.accentGlow}, inset 0 0 40px ${theme.accent}10`,
                }}
            />

            {/* Borde superior brillante */}
            <motion.div
                className="absolute inset-x-0 top-0 h-px"
                style={{
                    background: `linear-gradient(90deg, transparent, ${theme.accent}, transparent)`,
                    boxShadow: `0 0 20px ${theme.accentGlow}`,
                }}
                animate={{
                    opacity: [0.3, 1, 0.3],
                }}
                transition={{ duration: 2.5, repeat: Infinity, delay: index * 0.4 }}
            />

            {/* Contenido */}
            <div className="relative z-10 flex flex-col items-center gap-4 text-center" style={{ padding: '1.5rem 0' }}>
                {/* Icono profesional */}
                <motion.div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:scale-110"
                    style={{
                        background: `linear-gradient(135deg, ${theme.accent}20, ${theme.accent}10)`,
                        border: `2px solid ${theme.accent}40`,
                        boxShadow: `0 4px 20px ${theme.accentGlow}`,
                        color: theme.accent,
                    }}
                >
                    {stat.icon}
                </motion.div>

                {/* Valor grande */}
                <span
                    className="text-4xl font-black"
                    style={{
                        background: `linear-gradient(135deg, ${theme.accent}, ${theme.accentDark})`,
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        filter: `drop-shadow(0 0 15px ${theme.accentGlow})`,
                    }}
                >
                    {stat.value}
                </span>

                {/* Label */}
                <span
                    className="text-sm font-semibold uppercase tracking-wider"
                    style={{ color: theme.textMuted }}
                >
                    {stat.label}
                </span>
            </div>

            {/* Partículas flotantes */}
            <div className="absolute inset-0 rounded-3xl overflow-hidden opacity-0 group-hover:opacity-100 pointer-events-none">
                {[...Array(8)].map((_, idx) => (
                    <motion.div
                        key={idx}
                        className="absolute w-1.5 h-1.5 rounded-full"
                        style={{
                            background: theme.accent,
                            boxShadow: `0 0 10px ${theme.accentGlow}`,
                            left: `${15 + idx * 12}%`,
                            top: "85%",
                        }}
                        animate={{
                            y: [0, -70, -90],
                            opacity: [0, 1, 0],
                            scale: [0.5, 1.5, 0.5],
                        }}
                        transition={{
                            duration: 2.5,
                            repeat: Infinity,
                            delay: idx * 0.15,
                        }}
                    />
                ))}
            </div>

            {/* Borde animado 3D */}
            <motion.div
                className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 pointer-events-none"
                style={{
                    border: `3px solid ${theme.accent}`,
                }}
                animate={{
                    scale: [1, 1.05, 1],
                    opacity: [0, 0.6, 0],
                }}
                transition={{ duration: 2, repeat: Infinity }}
            />
        </motion.div>
    );
}