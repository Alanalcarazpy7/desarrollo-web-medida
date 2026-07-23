"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { trackEvent } from "@/lib/analytics";
import { getWhatsAppLink, whatsappMessages } from "@/lib/whatsapp";
import ClientsMarquee from "@/components/ClientsMarquee";
import HeroImageGrid from "@/components/HeroImageGrid";

export default function Hero() {
    const { t, language } = useLanguage();
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

    return (
        <section
            id="inicio"
            // hero-padding-top: antes esto dependía de un useState/useEffect
            // que leía window.innerWidth — arranca en `false` y solo se
            // corrige después del primer render, así que hay una ventana
            // (SSR, hidratación, o si el efecto tarda) donde el padding no
            // coincide con el viewport real. Ahora es un media query CSS puro
            // (definido en globals.css), correcto desde la primera pintada.
            className="relative min-h-screen flex flex-col items-center justify-start lg:justify-center overflow-hidden hero-padding-top"
            style={{ scrollMarginTop: '100px' }}
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
            <div className="hero-content-wrap relative z-10 w-full max-w-[1440px] mx-auto px-6 md:px-8 pb-12 md:pb-20">
                {/* items-stretch (no items-center): en desktop, la columna de
                    texto y la del grid de imágenes pasan a tener la MISMA
                    altura real (la del contenido de texto) en vez de que el
                    grid de imágenes, más bajo, quede centrado con espacio
                    vacío arriba/abajo. */}
                <div className="grid lg:grid-cols-[1.15fr_0.95fr] gap-12 lg:gap-16 items-stretch">

                    {/* IZQUIERDA: Texto */}
                    <div className="hero-text-col flex flex-col justify-center gap-6 md:gap-8 items-center lg:items-start text-center lg:text-left">
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
                            className="hero-h1 text-4xl md:text-6xl lg:text-7xl font-bold leading-tight animate-hero-fade"
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
                                href={getWhatsAppLink(whatsappMessages[language].hero)}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={() => trackEvent('click_whatsapp', { source: 'hero_primary', lang: language })}
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
                                href="#proyectos"
                                onClick={() => trackEvent('click_hero_projects', { lang: language })}
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

                    {/* DERECHA: grid cinético de imágenes (2 columnas en mobile,
                        3 en desktop; las de los extremos suben, la del medio
                        baja) */}
                    <div className="flex justify-center lg:justify-end w-full lg:w-auto mt-8 lg:mt-0">
                        <HeroImageGrid />
                    </div>
                </div>
            </div>

            <ClientsMarquee />
        </section>
    );
}
