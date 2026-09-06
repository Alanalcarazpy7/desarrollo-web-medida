"use client";

import { motion, useScroll, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useLanguage } from "@/context/LanguageContext";
import Link from "next/link";
import Image from "next/image";


// La animación de entrada del navbar solo debe correr la PRIMERA vez que se
// monta en la sesión. Al navegar a un ancla de la misma página (ej. /es#precios)
// Next re-renderiza el árbol de la ruta y el navbar volvía a montarse: se
// disparaba otra vez el `initial={{ y: -100, opacity: 0 }}` y la barra (con el
// botón hamburguesa adentro) desaparecía y volvía a bajar. Eso era el "bug" de
// que el menú se va y vuelve al tocar un enlace.
let navbarHasAnimatedIn = false;

export default function SpectacularNavbar() {
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState("inicio");
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [animateIn] = useState(() => {
        if (navbarHasAnimatedIn) return false;
        navbarHasAnimatedIn = true;
        return true;
    });
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

    // El botón que ABRE el drawer mobile está oculto en desktop vía CSS
    // (xl:hidden), pero el drawer en sí (el overlay que aparece cuando
    // mobileMenuOpen es true) no tenía ningún control por ancho de pantalla
    // — solo depende del estado de React. Si lo abrís en mobile/tablet y
    // después la ventana pasa a ancho de notebook/desktop (achicando el
    // devtools, rotando, o resize real), el overlay se queda montado y
    // visible tapando todo, aunque el botón que lo abrió ya no se vea. Este
    // efecto lo cierra en cuanto el viewport cruza el mismo breakpoint (xl,
    // 1280px) que usa el CSS para mostrar la navegación de desktop.
    useEffect(() => {
        const xl = window.matchMedia("(min-width: 1280px)");
        const closeIfDesktop = () => {
            if (xl.matches) setMobileMenuOpen(false);
        };
        closeIfDesktop();
        xl.addEventListener("change", closeIfDesktop);
        return () => xl.removeEventListener("change", closeIfDesktop);
    }, []);

    // ScrollSpy. Antes esto corría COMPLETO en cada evento de scroll: leía el
    // rect de 7 secciones (fuerza reflow) y llamaba a setState en cada frame,
    // re-renderizando todo el navbar de framer-motion. En mobile eso solo era
    // caro; durante una navegación a un ancla se volvía un infierno. Ahora se
    // agrupa con requestAnimationFrame y solo se hace setState cuando el valor
    // cambia de verdad.
    useEffect(() => {
        const SECTIONS = ["inicio", "servicios", "proceso", "proyectos", "precios", "blog", "contacto"];
        let ticking = false;
        let lastSection = "";
        let lastScrolled: boolean | null = null;

        const measure = () => {
            ticking = false;
            const scrollY = window.scrollY;

            const isScrolled = scrollY > 50;
            if (isScrolled !== lastScrolled) {
                lastScrolled = isScrolled;
                setScrolled(isScrolled);
            }

            const viewCenter = scrollY + window.innerHeight / 2;
            let currentSection = "";
            let minDistance = Infinity;

            for (const id of SECTIONS) {
                const element = document.getElementById(id);
                if (!element) continue;
                const rect = element.getBoundingClientRect();
                const sectionCenter = rect.top + scrollY + rect.height / 2;
                const distance = Math.abs(viewCenter - sectionCenter);
                if (distance < minDistance) {
                    minDistance = distance;
                    currentSection = id;
                }
            }

            if (scrollY < 100) currentSection = "inicio";
            if (window.innerHeight + scrollY >= document.body.offsetHeight - 50) currentSection = "contacto";

            if (currentSection && currentSection !== lastSection) {
                lastSection = currentSection;
                setActiveSection(currentSection);
            }
        };

        const onScroll = () => {
            if (ticking) return;
            ticking = true;
            requestAnimationFrame(measure);
        };

        window.addEventListener("scroll", onScroll, { passive: true });
        measure();

        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const { language, t } = useLanguage();
    const pathname = usePathname();
    const router = useRouter();
    const isHome = pathname === "/" || pathname === `/${language}`;

    // El navegador/Next puede intentar restaurar el hash por su cuenta al
    // mismo tiempo que hacemos el scroll controlado. En móviles esa doble
    // corrección es la que produce el ciclo de ida y vuelta en secciones
    // largas como precios. Dejamos la restauración bajo control de este
    // componente durante toda la vida del navbar.
    useEffect(() => {
        if ("scrollRestoration" in window.history) {
            const previous = window.history.scrollRestoration;
            window.history.scrollRestoration = "manual";
            return () => {
                window.history.scrollRestoration = previous;
            };
        }
    }, []);
    
    const getNavHref = (hash: string) => `/${language}${hash}`;

    /**
     * Navegación de los ítems del menú.
     *
     * Si el destino es un ancla de la página en la que ya estamos, NO se hace
     * router.push(): eso provocaba una navegación de Next que remontaba el
     * árbol (navbar, botón de WhatsApp, etc.) y hacía que todo desapareciera y
     * volviera a animar. En su lugar se hace scroll suave al elemento y se
     * actualiza el hash con replaceState, sin re-render.
     */
    const goTo = (destination: string) => {
        const [path, hash] = destination.split("#");
        const samePage = Boolean(hash) && path.replace(/\/$/, "") === pathname.replace(/\/$/, "");

        if (samePage) {
            // Se hace en el próximo frame para que el drawer mobile ya haya
            // empezado a cerrarse y no interfiera con el scroll.
            requestAnimationFrame(() => {
                const target = document.getElementById(hash);
                if (!target) return;
                const top = target.getBoundingClientRect().top + window.scrollY - 90;
                window.history.replaceState(null, "", `#${hash}`);
                // Un solo scroll animado, después de actualizar el hash. Al
                // no usar navegación de Next ni scroll nativo por hash, no
                // queda un segundo actor corrigiendo la misma posición.
                window.scrollTo({ top, behavior: "smooth" });
            });
            return;
        }
        router.push(destination);
    };

    const navItems = [
        { label: t('navbar.home'), href: getNavHref("#inicio") },
        { label: t('navbar.services'), href: `/${language}/servicios` },
        { label: t('navbar.process'), href: getNavHref("#proceso") },
        { label: t('navbar.projects'), href: getNavHref("#proyectos") },
        { label: t('navbar.pricing'), href: getNavHref("#precios") },
        { label: t('navbar.blog'), href: `/${language}/blog` },
        { label: t('navbar.contact'), href: getNavHref("#contacto") },
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
                initial={animateIn ? { y: -100, opacity: 0 } : false}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: animateIn ? 0.8 : 0, ease: [0.22, 1, 0.36, 1] }}
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

                <div className="w-full max-w-[1440px] px-6 md:px-8 relative" style={{ margin: '0.7rem 0' }}>
                    <div className="flex items-center justify-between">

                        {/* LOGO */}
                        <Link href={`/${language}`} className="navbar-logo-link flex items-center gap-4 group relative z-50 cursor-pointer">
                            <motion.div
                                className="flex items-center gap-4"
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
                                    <Image
                                        src="/favicon.png"
                                        alt="SolvaTech"
                                        width={44}
                                        height={44}
                                        style={{
                                            // Ancho y alto explícitos acá (no solo en las props):
                                            // el preflight de Tailwind pone height:auto en todo
                                            // <img>, y como width se quedaba sin un valor CSS que
                                            // lo acompañe, Next generaba el warning de aspect
                                            // ratio "modified but not the other".
                                            width: '44px',
                                            height: '44px',
                                            filter: `drop-shadow(0 0 10px ${theme.accentDark})`,
                                            objectFit: 'cover'
                                        }}
                                        priority
                                    />
                                </motion.div>
                            </div>

                            <div className="flex flex-col">
                                <motion.div className="flex items-baseline gap-1">
                                    <span
                                        className="text-3xl font-black tracking-[0.05em]"
                                        style={{ color: theme.text }}
                                    >
                                        Solva
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
                        </motion.div>
                        </Link>

                        {/* NAVEGACIÓN DESKTOP - MODERNA Y COMPACTA (Fix Overlap) */}
                        <div className="hidden xl:flex items-center gap-2">
                            {navItems.map((item, i) => {
                                const isActive = (activeSection === item.href.substring(1) && isHome) || (item.label === "Blog" && pathname.includes("/blog"));
                                const destination = item.href;
                                return (
                                    <motion.div
                                        key={item.label}
                                        onClick={() => goTo(destination)}
                                        className="relative group px-6 py-3 rounded-2xl cursor-pointer"
                                        initial={animateIn ? { opacity: 0, y: -30 } : false}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={animateIn ? { delay: i * 0.1, duration: 0.6, type: "spring" } : { duration: 0 }}
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
                                    </motion.div>
                                );
                            })}

                            {/* LANGUAGE SWITCHER */}
                            <LanguageSwitcher />


                        </div>

                        {/* HAMBURGER MEJORADO - DISEÑO LIMPIO */}
                        <div className="xl:hidden">
                            <motion.button
                                onClick={() => setMobileMenuOpen(true)}
                                aria-label="Abrir menú de navegación"
                                aria-expanded={mobileMenuOpen}
                                aria-controls="mobile-menu"
                                className="navbar-hamburger-btn relative p-3 group cursor-pointer flex items-center justify-center"
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
                            id="mobile-menu"
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", damping: 30, stiffness: 200 }}
                            className="fixed right-0 top-0 bottom-0 w-[85%] max-w-[400px] z-[70] overflow-y-auto"
                            style={{
                                background: theme.bgNav,
                                borderLeft: `1px solid ${theme.accent}30`,
                                boxShadow: `-20px 0 50px rgba(0, 0, 0, 0.9)`,
                            }}
                        >
                            {/* Header del menú premium */}
                            <div className="navbar-drawer-header" style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                padding: '48px 32px 40px 32px',
                                borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                            }}>
                                <div className="navbar-drawer-logo" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
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
                                            <Image
                                                src="/favicon.png"
                                                alt="SolvaTech"
                                                width={44}
                                                height={44}
                                                style={{ width: '44px', height: '44px', objectFit: 'cover' }}
                                                priority
                                            />
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                                        <span style={{ fontSize: '22px', fontWeight: 900, letterSpacing: '0.05em', color: '#fff', lineHeight: 1 }}>Solva</span>
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

                            {/* SELECTOR DE IDIOMA MÓVIL - Ahora en la parte superior para evitar overlap */}
                            <div className="px-8 mt-6 mb-4 flex justify-start border-b border-white/5 pb-6">
                                <LanguageSwitcher />
                            </div>

                            {/* Enlaces del menú más compactos */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', padding: '0 24px' }}>
                                {navItems.map((item, i) => {
                                    const isActive = (activeSection === item.href.substring(1) && isHome) || (item.label === "Blog" && pathname.includes("/blog"));
                                    const destination = item.href;
                                    return (
                                        <motion.div
                                            key={item.label}
                                            onClick={() => { setMobileMenuOpen(false); goTo(destination); }}
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: i * 0.1 }}
                                            whileHover={{ x: 12, backgroundColor: 'rgba(0, 217, 255, 0.08)' }}
                                            className="navbar-drawer-navitem"
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
                                                className="nav-item-text navbar-drawer-navitem-text"
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
                                        </motion.div>
                                    );
                                })}
                            </div>



                            {/* Decoración sutil inferior con diseño mejorado */}
                            <div className="absolute bottom-10 left-10 flex flex-col gap-2 opacity-30">
                                <span className="text-[10px] tracking-[0.5em] text-white uppercase font-black">
                                    SolvaTech © 2026
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
