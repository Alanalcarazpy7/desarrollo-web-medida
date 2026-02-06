"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export default function SpectacularNavbar() {
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState("inicio");
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { scrollYProgress } = useScroll();

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

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        const sections = ["inicio", "servicios", "proceso", "proyectos", "precios", "contacto"];
        const observerOptions = {
            root: null,
            rootMargin: '-20% 0px -20% 0px',
            threshold: 0.3
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id);
                }
            });
        }, observerOptions);

        sections.forEach((id) => {
            const element = document.getElementById(id);
            if (element) observer.observe(element);
        });

        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll();

        return () => {
            window.removeEventListener("scroll", handleScroll);
            observer.disconnect();
        };
    }, []);

    const navItems = [
        { label: "Inicio", href: "#inicio" },
        { label: "Servicios", href: "#servicios" },
        { label: "Proceso", href: "#proceso" },
        { label: "Proyectos", href: "#proyectos" },
        { label: "Precios", href: "#precios" },
        { label: "Contacto", href: "#contacto" },
    ];

    return (
        <>
            {/* Barra de progreso ultra brillante */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-1 z-[100] origin-left"
                style={{
                    scaleX: scrollYProgress,
                    background: `linear-gradient(90deg, ${theme.accent}, ${theme.accentDark}, ${theme.accent})`,
                    boxShadow: `0 0 30px ${theme.accentGlow}, 0 0 60px ${theme.accentGlow}, 0 4px 40px ${theme.accentGlow}`,
                }}
            />

            {/* Partículas del navbar removidas (redundantes con BackgroundParticles) */}

            <motion.nav
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className={`fixed top-0 left-0 right-0 z-50 flex justify-center transition-all duration-700 ${scrolled ? "py-4" : "py-6"}`}
            >
                {/* Fondo del navbar optimizado (contain: paint) */}
                <div
                    className="absolute inset-0"
                    style={{
                        background: scrolled ? theme.bgNav : 'transparent',
                        backdropFilter: scrolled ? "blur(20px)" : "none",
                        borderBottom: `1px solid ${scrolled ? theme.accent + '30' : 'transparent'}`,
                        boxShadow: scrolled ? `0 4px 20px rgba(0, 0, 0, 0.8)` : 'none',
                        contain: 'paint'
                    }}
                />

                <div className="w-full max-w-7xl px-6 md:px-8 relative" style={{ margin: '0.7rem 0' }}>
                    <div className="flex items-center justify-between">

                        {/* LOGO ORIGINAL SIN MODIFICAR */}
                        <motion.a
                            href="#inicio"
                            className="flex items-center gap-4 group relative z-50 cursor-pointer"
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.4 }}
                        >
                            <div className="relative">
                                {/* Anillos orbitales */}
                                <motion.div
                                    className="absolute inset-0 w-12 h-12 rounded-full border"
                                    style={{ borderColor: `${theme.accent}30` }}
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                                />
                                <motion.div
                                    className="absolute inset-0 w-12 h-12 rounded-full border"
                                    style={{ borderColor: `${theme.accent}20`, transform: "rotate(60deg)" }}
                                    animate={{ rotate: -360 }}
                                    transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                                />

                                {/* Core del logo */}
                                <motion.div
                                    className="relative w-12 h-12 rounded-xl flex items-center justify-center overflow-hidden cursor-pointer"
                                    style={{
                                        background: `linear-gradient(135deg, ${theme.bgCard}, ${theme.bgCardHover})`,
                                        border: `1px solid ${theme.accent}40`,
                                        boxShadow: `0 0 30px ${theme.accentGlow}, inset 0 0 15px ${theme.accent}10`,
                                    }}
                                    whileHover={{
                                        boxShadow: `0 0 50px ${theme.accentGlow}, inset 0 0 25px ${theme.accent}20`,
                                    }}
                                >
                                    {/* Logo SolveTech S */}
                                    <img
                                        src="/favicon.png"
                                        alt="SolveTech"
                                        width="44"
                                        height="44"
                                        style={{
                                            filter: `drop-shadow(0 0 10px ${theme.accentDark})`,
                                            objectFit: 'cover'
                                        }}
                                    />
                                </motion.div>
                            </div>

                            <div className="flex flex-col">
                                <motion.div className="flex items-baseline gap-1">
                                    <span
                                        className="text-3xl font-black tracking-[0.05em]"
                                        style={{ color: theme.text }}
                                    >
                                        Solve
                                    </span>
                                    <span
                                        className="text-3xl font-light tracking-[0.05em]"
                                        style={{ color: theme.accent }}
                                    >
                                        Tech
                                    </span>
                                </motion.div>
                                <motion.div
                                    className="h-px mt-1.5"
                                    style={{
                                        background: `linear-gradient(90deg, ${theme.accent}, transparent)`,
                                    }}
                                    initial={{ width: 0 }}
                                    animate={{ width: "100%" }}
                                    transition={{ duration: 1, delay: 0.5 }}
                                />
                                <span
                                    className="text-[9px] tracking-[0.3em] uppercase font-medium mt-1"
                                    style={{ color: theme.textMuted }}
                                >
                                    TECNOLOGÍA & DESARROLLO WEB
                                </span>
                            </div>
                        </motion.a>

                        {/* NAVEGACIÓN DESKTOP - MODERNA Y COMPACTA (Fix Overlap) */}
                        <div className="hidden xl:flex items-center gap-2">
                            {navItems.map((item, i) => {
                                const isActive = activeSection === item.href.substring(1);
                                return (
                                    <motion.a
                                        key={item.label}
                                        href={item.href}
                                        className="relative group px-6 py-3 rounded-2xl cursor-pointer"
                                        initial={{ opacity: 0, y: -30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.1, duration: 0.6, type: "spring" }}
                                        whileHover={{ scale: 1.05, y: -2 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        {/* Fondo 3D con capas */}
                                        <motion.div
                                            className="absolute inset-0 rounded-3xl"
                                            style={{
                                                background: isActive
                                                    ? `linear-gradient(135deg, ${theme.accent}30, ${theme.accent}40, ${theme.accent}30)`
                                                    : `linear-gradient(135deg, ${theme.bgCard}90, ${theme.bgCardHover}90)`,
                                                border: `3px solid ${isActive ? theme.accent + '80' : theme.accent + '25'}`,
                                                boxShadow: isActive
                                                    ? `0 10px 50px ${theme.accentGlow}, 0 0 80px ${theme.accentGlow}, inset 0 0 40px ${theme.accent}20`
                                                    : `0 6px 25px rgba(0, 0, 0, 0.5), inset 0 2px 4px rgba(255, 255, 255, 0.05)`,
                                            }}
                                            whileHover={{
                                                boxShadow: `0 15px 60px ${theme.accentGlow}, 0 0 100px ${theme.accentGlow}, inset 0 0 50px ${theme.accent}25`,
                                                border: `3px solid ${theme.accent}`,
                                            }}
                                        />

                                        {/* Capa intermedia 3D */}
                                        <motion.div
                                            className="absolute inset-0 rounded-3xl opacity-50"
                                            style={{
                                                background: `radial-gradient(circle at 30% 30%, ${theme.accent}20, transparent 60%)`,
                                                transform: "translateZ(10px)",
                                            }}
                                            whileHover={{
                                                opacity: 1,
                                            }}
                                        />

                                        {/* Efecto de hover glow explosivo */}
                                        <motion.div
                                            className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100"
                                            style={{
                                                background: `radial-gradient(circle at 50% 0%, ${theme.accent}50, transparent 70%)`,
                                                filter: "blur(20px)",
                                            }}
                                            transition={{ duration: 0.4 }}
                                        />

                                        {/* Texto del botón más grande y visible */}
                                        <span
                                            className="relative text-base font-black tracking-[0.15em] uppercase transition-all duration-300"
                                            style={{
                                                padding: "1rem",
                                                color: isActive ? theme.accent : theme.text,
                                                textShadow: isActive ? `0 0 25px ${theme.accentGlow}, 0 0 50px ${theme.accentGlow}` : `0 2px 8px rgba(0, 0, 0, 0.8)`,
                                            }}
                                        >
                                            {item.label}
                                        </span>

                                        {/* Indicador inferior 3D */}
                                        {isActive && (
                                            <motion.div
                                                layoutId="activeIndicator"
                                                className="absolute -bottom-3 left-1/2 -translate-x-1/2"
                                                style={{
                                                    width: "80%",
                                                    height: 4,
                                                    background: `linear-gradient(90deg, transparent, ${theme.accent}, ${theme.accent}, transparent)`,
                                                    boxShadow: `0 0 20px ${theme.accentGlow}, 0 4px 20px ${theme.accentGlow}`,
                                                    borderRadius: "4px",
                                                }}
                                                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                            />
                                        )}

                                        {/* Partículas flotantes en hover */}
                                        <div className="absolute inset-0 rounded-3xl overflow-hidden opacity-0 group-hover:opacity-100">
                                            {[...Array(5)].map((_, idx) => (
                                                <motion.div
                                                    key={idx}
                                                    className="absolute w-1.5 h-1.5 rounded-full"
                                                    style={{
                                                        background: theme.accent,
                                                        boxShadow: `0 0 10px ${theme.accentGlow}`,
                                                        left: `${15 + idx * 20}%`,
                                                        top: "60%",
                                                    }}
                                                    animate={{
                                                        y: [0, -40, 0],
                                                        opacity: [0, 1, 0],
                                                        scale: [0.5, 1.5, 0.5],
                                                    }}
                                                    transition={{
                                                        duration: 2.5,
                                                        repeat: Infinity,
                                                        delay: idx * 0.2,
                                                    }}
                                                />
                                            ))}
                                        </div>

                                        {/* Borde animado en hover */}
                                        <motion.div
                                            className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100"
                                            style={{
                                                border: `2px solid ${theme.accent}`,
                                            }}
                                            animate={{
                                                scale: [1, 1.05, 1],
                                                opacity: [0, 0.7, 0],
                                            }}
                                            transition={{ duration: 2, repeat: Infinity }}
                                        />
                                    </motion.a>
                                );
                            })}

                            {/* CTA BUTTON - ULTRA ESPECTACULAR */}
                            <motion.button
                                initial={{ opacity: 0, scale: 0.7 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.6, duration: 0.6, type: "spring" }}
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                                className="relative ml-4 px-8 py-4 rounded-2xl overflow-hidden group cursor-pointer"
                            >
                                {/* Fondo animado súper brillante */}
                                <motion.div
                                    className="absolute inset-0"
                                    style={{
                                        background: `linear-gradient(135deg, ${theme.accent}, ${theme.accentDark}, ${theme.accent})`,
                                        boxShadow: `0 0 50px ${theme.accentGlow}, 0 10px 50px ${theme.accentGlow}`,
                                    }}
                                    whileHover={{
                                        boxShadow: `0 0 80px ${theme.accentGlow}, 0 15px 60px ${theme.accentGlow}, 0 0 120px ${theme.accentGlow}`,
                                    }}
                                />

                                {/* Efecto de luz deslizante ultra ancho */}
                                <motion.div
                                    className="absolute inset-0"
                                    style={{
                                        background: `linear-gradient(90deg, transparent 20%, rgba(255, 255, 255, 0.5), transparent 80%)`,
                                    }}
                                    animate={{ x: ["-200%", "200%"] }}
                                    transition={{ duration: 3, repeat: Infinity, ease: "linear", repeatDelay: 0.5 }}
                                />

                                {/* Bordes pulsantes múltiples */}
                                <motion.div
                                    className="absolute inset-0 rounded-3xl"
                                    style={{ border: `4px solid ${theme.accent}` }}
                                    animate={{
                                        scale: [1, 1.15, 1],
                                        opacity: [0.7, 0, 0.7],
                                    }}
                                    transition={{ duration: 2.5, repeat: Infinity }}
                                />

                                <motion.div
                                    className="absolute inset-0 rounded-3xl"
                                    style={{ border: `3px solid rgba(255, 255, 255, 0.5)` }}
                                    animate={{
                                        scale: [1, 1.1, 1],
                                        opacity: [0.5, 0, 0.5],
                                    }}
                                    transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                                />
                            </motion.button>
                        </div>

                        {/* HAMBURGER MEJORADO - DISEÑO LIMPIO */}
                        <div className="xl:hidden">
                            <motion.button
                                onClick={() => setMobileMenuOpen(true)}
                                aria-label="Abrir menú de navegación"
                                className="relative p-3 group cursor-pointer flex items-center justify-center"
                                whileTap={{ scale: 0.9 }}
                            >
                                <div className="relative w-8 flex flex-col items-end gap-2">
                                    <motion.span
                                        className="h-1 rounded-full w-full"
                                        style={{
                                            background: `linear-gradient(90deg, ${theme.accent}, ${theme.accentDark})`,
                                            boxShadow: `0 0 10px ${theme.accentGlow}`,
                                        }}
                                    />
                                    <motion.span
                                        className="h-1 rounded-full w-2/3"
                                        style={{
                                            background: `linear-gradient(90deg, ${theme.accent}, ${theme.accentDark})`,
                                            boxShadow: `0 0 10px ${theme.accentGlow}`,
                                        }}
                                    />
                                    <motion.span
                                        className="h-1 rounded-full w-full"
                                        style={{
                                            background: `linear-gradient(90deg, ${theme.accent}, ${theme.accentDark})`,
                                            boxShadow: `0 0 10px ${theme.accentGlow}`,
                                        }}
                                    />
                                </div>
                            </motion.button>
                        </div>
                    </div>
                </div>
            </motion.nav>

            {/* MENÚ MÓVIL REDISEÑADO */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-[60]"
                            style={{
                                background: "rgba(0, 0, 0, 0.95)",
                                backdropFilter: "blur(20px)",
                            }}
                            onClick={() => setMobileMenuOpen(false)}
                        />

                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", damping: 30, stiffness: 200 }}
                            className="fixed right-0 top-0 bottom-0 w-[85%] max-w-[400px] z-[70] overflow-hidden"
                            style={{
                                background: theme.bgNav,
                                borderLeft: `1px solid ${theme.accent}30`,
                                boxShadow: `-20px 0 50px rgba(0, 0, 0, 0.9)`,
                            }}
                        >
                            {/* Header del menú premium */}
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                padding: '48px 32px 40px 32px',
                                borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                    <div className="relative" style={{ width: '48px', height: '48px' }}>
                                        <motion.div
                                            className="absolute inset-0 rounded-full border"
                                            style={{ borderColor: `${theme.accent}30` }}
                                            animate={{ rotate: 360 }}
                                            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                                        />
                                        <div
                                            className="relative w-full h-full rounded-xl flex items-center justify-center overflow-hidden"
                                            style={{
                                                background: `linear-gradient(135deg, #0a0a0a, #111111)`,
                                                border: `1px solid ${theme.accent}40`,
                                                boxShadow: `0 0 20px ${theme.accentGlow}`,
                                            }}
                                        >
                                            <img
                                                src="/favicon.png"
                                                alt="SolveTech"
                                                width="44"
                                                height="44"
                                                style={{ objectFit: 'cover' }}
                                            />
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                                        <span style={{ fontSize: '22px', fontWeight: 900, letterSpacing: '0.05em', color: '#fff', lineHeight: 1 }}>Solve</span>
                                        <span style={{ fontSize: '22px', fontWeight: 300, letterSpacing: '0.05em', color: theme.accent, lineHeight: 1 }}>Tech</span>
                                    </div>
                                </div>

                                <motion.button
                                    onClick={() => setMobileMenuOpen(false)}
                                    aria-label="Cerrar menú de navegación"
                                    style={{
                                        padding: '12px',
                                        borderRadius: '16px',
                                        background: 'rgba(255, 255, 255, 0.03)',
                                        border: '1px solid rgba(255, 255, 255, 0.1)',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: '#fff',
                                    }}
                                    whileHover={{
                                        scale: 1.1,
                                        backgroundColor: 'rgba(255, 255, 255, 0.08)',
                                        color: theme.accent,
                                        borderColor: theme.accent
                                    }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    <svg style={{ width: '24px', height: '24px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </motion.button>
                            </div>

                            {/* Enlaces del menú más compactos */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', padding: '0 24px' }}>
                                {navItems.map((item, i) => {
                                    const isActive = activeSection === item.href.substring(1);
                                    return (
                                        <motion.a
                                            key={item.label}
                                            href={item.href}
                                            onClick={() => setMobileMenuOpen(false)}
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: i * 0.1 }}
                                            whileHover={{ x: 12, backgroundColor: 'rgba(0, 217, 255, 0.08)' }}
                                            style={{
                                                position: 'relative',
                                                display: 'flex',
                                                alignItems: 'center',
                                                padding: '16px 28px', // Padding más compacto
                                                borderRadius: '20px',
                                                textDecoration: 'none',
                                                background: isActive ? `${theme.accent}15` : 'transparent',
                                                border: `1px solid ${isActive ? theme.accent + '30' : 'rgba(255,255,255,0.02)'}`,
                                                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                                cursor: 'pointer'
                                            }}
                                            onMouseEnter={(e) => {
                                                if (!isActive) {
                                                    e.currentTarget.style.borderColor = `${theme.accent}40`;
                                                    e.currentTarget.style.boxShadow = `0 10px 40px rgba(0, 217, 255, 0.1)`;
                                                    const span = e.currentTarget.querySelector('.nav-item-text') as HTMLElement;
                                                    if (span) span.style.color = theme.accent;
                                                }
                                            }}
                                            onMouseLeave={(e) => {
                                                if (!isActive) {
                                                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.02)';
                                                    e.currentTarget.style.boxShadow = 'none';
                                                    const span = e.currentTarget.querySelector('.nav-item-text') as HTMLElement;
                                                    if (span) span.style.color = theme.text;
                                                }
                                            }}
                                        >
                                            <span
                                                className="nav-item-text"
                                                style={{
                                                    fontSize: '20px',
                                                    fontWeight: 800,
                                                    letterSpacing: '0.01em',
                                                    color: isActive ? theme.accent : theme.text,
                                                    transition: 'all 0.3s ease'
                                                }}
                                            >
                                                {item.label}
                                            </span>

                                            {isActive && (
                                                <motion.div
                                                    layoutId="mobileActive"
                                                    style={{
                                                        position: 'absolute',
                                                        left: '12px',
                                                        top: '25%',
                                                        bottom: '25%',
                                                        width: '4px',
                                                        background: theme.accent,
                                                        borderRadius: '10px',
                                                        boxShadow: `0 0 20px ${theme.accent}`
                                                    }}
                                                />
                                            )}
                                        </motion.a>
                                    );
                                })}
                            </div>

                            {/* Decoración sutil inferior con diseño mejorado */}
                            <div className="absolute bottom-10 left-10 flex flex-col gap-2 opacity-30">
                                <span className="text-[10px] tracking-[0.5em] text-white uppercase font-black">
                                    SolveTech © 2026
                                </span>
                                <div className="h-px w-12 bg-white" />
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}