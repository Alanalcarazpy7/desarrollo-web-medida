"use client";

import { useState, useMemo, MouseEvent } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useLanguage } from "@/context/LanguageContext";
import { trackEvent } from "@/lib/analytics";
import { getWhatsAppLink } from "@/lib/whatsapp";
import { Project, projectsData } from "@/lib/projects-data";
import ProjectLightbox from "./ProjectLightbox";
import BackgroundParticles from "@/components/BackgroundParticles";
import ScrollProgress from "@/components/ScrollProgress";

const Navbar = dynamic(() => import("@/components/Navbar"), { ssr: true });
const Footer = dynamic(() => import("@/components/Footer"), { ssr: true });

// Tarjeta de Proyecto idéntica a la home para consistencia visual
function ProjectPageCard({
    project,
    index,
    theme,
    language,
    t,
    onOpenLightbox
}: {
    project: Project;
    index: number;
    theme: any;
    language: string;
    t: any;
    onOpenLightbox: (project: Project) => void;
}) {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useSpring(x, { stiffness: 500, damping: 100 });
    const mouseY = useSpring(y, { stiffness: 500, damping: 100 });

    const rotateX = useTransform(mouseY, [-0.5, 0.5], ["12deg", "-12deg"]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-12deg", "12deg"]);

    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseXFromCenter = e.clientX - rect.left - width / 2;
        const mouseYFromCenter = e.clientY - rect.top - height / 2;
        x.set(mouseXFromCenter / width);
        y.set(mouseYFromCenter / height);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    const currentTranslation = project.translations[language as "es" | "en"] || project.translations.es;

    const whatsappMessage = language === 'en'
        ? `Hi! I saw the project "${currentTranslation.title}" and I would like to quote something similar for my business.`
        : `Hola! Vi el proyecto "${currentTranslation.title}" y me gustaría cotizar algo similar para mi negocio.`;

    const whatsappUrl = getWhatsAppLink(whatsappMessage);

    const isLive = project.accessType === "live" && project.demoUrl;
    const buttonText = isLive ? t("projects.viewProject") : t("projects.viewSample");
    const mainActionUrl = isLive ? project.demoUrl : "#";

    const getAccessBadgeText = () => {
        if (project.accessType === "live") return t("projects.badgeLive");
        if (project.accessType === "private-system") return t("projects.badgePrivate");
        return t("projects.badgeSample");
    };

    const getAccessBadgeColors = () => {
        if (project.accessType === "live") return { text: "#00ffcc", border: "rgba(0, 255, 204, 0.4)" };
        if (project.accessType === "private-system") return { text: "#ffaa00", border: "rgba(255, 170, 0, 0.4)" };
        return { text: "#00d9ff", border: "rgba(0, 217, 255, 0.4)" };
    };

    const badgeColors = getAccessBadgeColors();

    const handleCardClick = (e: React.MouseEvent) => {
        if (!isLive) {
            e.preventDefault();
            trackEvent('click_project_view', { project: currentTranslation.title, lang: language, source: 'all_projects_card_click' });
            onOpenLightbox(project);
        } else {
            trackEvent('click_project_view', { project: currentTranslation.title, lang: language, source: 'all_projects_image' });
            if (project.demoUrl) {
                window.open(project.demoUrl, "_blank", "noopener,noreferrer");
            }
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            style={{
                perspective: 1200,
            }}
            className="w-full h-full max-w-[380px] mx-auto md:max-w-none"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            <motion.div
                style={{
                    rotateX,
                    rotateY,
                    transformStyle: "preserve-3d",
                }}
                className="relative block w-full h-full rounded-[24px] bg-[#0a0a0a] group flex flex-col cursor-pointer"
                initial="rest"
                whileHover="hover"
                onClick={handleCardClick}
            >
                {/* Borde Gradiente */}
                <div className="absolute -inset-[3px] rounded-[27px] bg-gradient-to-r from-cyan-500 via-white to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-md" />

                {/* Contenido */}
                <div className="relative w-full h-full rounded-[24px] overflow-hidden border border-white/10 flex flex-col grow shadow-2xl" style={{ backgroundColor: '#13141C' }}>
                    
                    {/* Imagen del Proyecto */}
                    <div className="relative aspect-[16/10] w-full shrink-0 block overflow-hidden" style={{ perspective: '1000px' }}>
                        {project.imageBack ? (
                            <motion.div
                                className="w-full h-full relative"
                                style={{ transformStyle: "preserve-3d" }}
                                variants={{
                                    rest: { rotateY: 0 },
                                    hover: { rotateY: 180 }
                                }}
                                transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
                            >
                                <div className="absolute inset-0 w-full h-full" style={{ backfaceVisibility: "hidden" }}>
                                    <Image
                                        src={project.image}
                                        alt={currentTranslation.alt}
                                        fill
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        className={`object-cover ${project.objectPosition === 'left' ? 'object-left' : 'object-center'}`}
                                    />
                                </div>
                                <div className="absolute inset-0 w-full h-full bg-[#13141C]" style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}>
                                    <Image
                                        src={project.imageBack}
                                        alt={`${currentTranslation.title} Admin`}
                                        fill
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        className="object-cover object-left-top"
                                    />
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                className="relative w-full h-full"
                                variants={{
                                    rest: { scale: 1 },
                                    hover: { scale: 1.1 }
                                }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                            >
                                <Image
                                    src={project.image}
                                    alt={currentTranslation.alt}
                                    fill
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    className={`object-cover ${project.objectPosition === 'left' ? 'object-left' : 'object-center'}`}
                                />
                            </motion.div>
                        )}

                        {/* Categoría Badge */}
                        <div className="absolute top-4 right-4 z-20 pointer-events-none" style={{ transform: 'translateZ(20px)' }}>
                            <div style={{
                                backgroundColor: 'rgba(10, 10, 15, 0.85)',
                                border: '1px solid rgba(0, 217, 255, 0.3)',
                                borderRadius: '8px',
                                padding: '5px 12px',
                                backdropFilter: 'blur(8px)',
                                boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
                                display: "inline-flex",
                                alignItems: "center",
                                justifyContent: "center",
                                minHeight: "26px",
                                boxSizing: "border-box"
                            }}>
                                <span className="text-[10px] font-bold text-[#00d9ff] uppercase tracking-wider">
                                    {t(`projects.categories.${project.categoryKey}`)}
                                </span>
                            </div>
                        </div>

                        {/* Acceso Badge - Premium Glass */}
                        <div className="absolute top-4 left-4 z-20 pointer-events-none" style={{ transform: 'translateZ(20px)' }}>
                            <div style={{
                                backgroundColor: 'rgba(10, 10, 15, 0.85)',
                                border: `1px solid ${badgeColors.border}`,
                                borderRadius: '8px',
                                padding: '5px 12px',
                                backdropFilter: 'blur(8px)',
                                boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
                                display: "inline-flex",
                                alignItems: "center",
                                justifyContent: "center",
                                minHeight: "26px",
                                boxSizing: "border-box"
                            }}>
                                <span style={{ color: badgeColors.text }} className="text-[10px] font-bold uppercase tracking-wider">
                                    {getAccessBadgeText()}
                                </span>
                            </div>
                        </div>

                        {/* Hover Overlay */}
                        <motion.div
                            className="absolute inset-0 z-10"
                            variants={{ rest: { opacity: 0 }, hover: { opacity: 1 } }}
                            transition={{ duration: 0.4 }}
                            style={{ backgroundColor: "rgba(0, 50, 100, 0.4)" }}
                        />

                        {/* Botón Hover flotante */}
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden z-20">
                            <motion.div
                                variants={{
                                    rest: { y: 20, opacity: 0, scale: 0.9 },
                                    hover: { y: 0, opacity: 1, scale: 1 }
                                }}
                                transition={{ duration: 0.3, type: "spring", stiffness: 300, damping: 20 }}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '10px',
                                    padding: '12px 24px',
                                    backgroundColor: '#00d9ff',
                                    borderRadius: '50px',
                                    boxShadow: '0 0 35px rgba(0, 217, 255, 0.6)',
                                    fontSize: '12px',
                                    fontWeight: 800,
                                    color: '#000000',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.1em'
                                }}
                            >
                                <span>{buttonText}</span>
                                <svg style={{ width: '16px', height: '16px', color: '#000000' }} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </motion.div>
                        </div>
                    </div>

                    {/* Cuerpo de la Tarjeta */}
                    <div className="relative flex flex-col gap-5 z-10 grow" style={{ padding: '28px 24px 32px 24px' }}>
                        {/* Tecnologías */}
                        <div className="flex flex-wrap gap-1.5">
                            {project.technologies.map((tech) => (
                                <span
                                    key={tech}
                                    style={{
                                        padding: '4px 10px',
                                        fontSize: '9px',
                                        fontWeight: 700,
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.05em',
                                        color: '#00d9ff',
                                        backgroundColor: 'rgba(0, 217, 255, 0.05)',
                                        border: '1px solid rgba(0, 217, 255, 0.15)',
                                        borderRadius: '6px'
                                    }}
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>

                        {/* Texto */}
                        <div className="space-y-3 pb-2 flex-grow">
                            <h3 className="text-xl font-black text-white uppercase tracking-tight leading-snug group-hover:text-[#00d9ff] transition-colors duration-300">
                                {currentTranslation.title}
                            </h3>
                            <p className="text-xs text-slate-300 leading-relaxed pr-2 line-clamp-3">
                                {currentTranslation.description}
                            </p>
                        </div>

                        {/* Botones de acción rediseñados y responsivos con alineamiento exacto flex */}
                        <div className="mt-auto pt-5 border-t border-white/5 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                            {isLive ? (
                                <a
                                    href={mainActionUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        trackEvent('click_project_view', { project: currentTranslation.title, lang: language, source: 'all_projects_cta' });
                                    }}
                                    style={{
                                        display: "inline-flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        padding: "12px 20px",
                                        fontSize: "11px",
                                        fontWeight: 900,
                                        color: "#0a0a0a",
                                        backgroundColor: theme.accent,
                                        borderRadius: "100px",
                                        textTransform: "uppercase",
                                        letterSpacing: "0.05em",
                                        textDecoration: "none",
                                        boxShadow: "0 4px 15px rgba(0, 217, 255, 0.35)",
                                        cursor: "pointer",
                                        flex: 1,
                                        minHeight: "48px",
                                        boxSizing: "border-box",
                                        textAlign: "center"
                                    }}
                                    className="hover:scale-[1.02] hover:shadow-[0_6px_22px_rgba(0,217,255,0.45)] transition-all duration-300"
                                >
                                    {buttonText}
                                </a>
                            ) : (
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        trackEvent('click_project_view', { project: currentTranslation.title, lang: language, source: 'all_projects_cta_preview' });
                                        onOpenLightbox(project);
                                    }}
                                    style={{
                                        display: "inline-flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        padding: "12px 20px",
                                        fontSize: "11px",
                                        fontWeight: 900,
                                        color: "#0a0a0a",
                                        backgroundColor: theme.accent,
                                        borderRadius: "100px",
                                        textTransform: "uppercase",
                                        letterSpacing: "0.05em",
                                        boxShadow: "0 4px 15px rgba(0, 217, 255, 0.35)",
                                        cursor: "pointer",
                                        flex: 1,
                                        border: "none",
                                        minHeight: "48px",
                                        boxSizing: "border-box",
                                        textAlign: "center"
                                    }}
                                    className="hover:scale-[1.02] hover:shadow-[0_6px_22px_rgba(0,217,255,0.45)] transition-all duration-300"
                                >
                                    {buttonText}
                                </button>
                            )}

                            <a
                                href={whatsappUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    trackEvent('click_whatsapp', { source: 'all_projects_similar', project: currentTranslation.title, lang: language });
                                }}
                                style={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    padding: "12px 20px",
                                    fontSize: "11px",
                                    fontWeight: 900,
                                    color: theme.accent,
                                    border: `1px solid ${theme.accent}50`,
                                    backgroundColor: "rgba(0, 217, 255, 0.05)",
                                    borderRadius: "100px",
                                    textTransform: "uppercase",
                                    letterSpacing: "0.05em",
                                    textDecoration: "none",
                                    transition: "all 0.3s ease",
                                    cursor: "pointer",
                                    flex: 1,
                                    minHeight: "48px",
                                    boxSizing: "border-box",
                                    textAlign: "center"
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.backgroundColor = "rgba(0, 217, 255, 0.15)";
                                    e.currentTarget.style.borderColor = theme.accent;
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor = "rgba(0, 217, 255, 0.05)";
                                    e.currentTarget.style.borderColor = `${theme.accent}50`;
                                }}
                                className="hover:scale-[1.02] transition-all duration-300"
                            >
                                {t('projects.ctaSimilar')}
                            </a>
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}

export default function ProyectosPageContent({ lang }: { lang: string }) {
    const { t } = useLanguage();
    const [selectedCategoryKey, setSelectedCategoryKey] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);
    const [isSearchFocused, setIsSearchFocused] = useState(false);

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

    const categories = ['all', 'systems', 'ecommerce', 'website'];

    // Filtrar la lista completa de todos los proyectos de projects-data.ts con buscador y categorías simultáneas
    const proyectosFiltrados = useMemo(() => {
        return projectsData.filter((proyecto) => {
            // 1. Filtro de Categoría
            const matchesCategory = selectedCategoryKey === "all" || proyecto.categoryKey === selectedCategoryKey;
            
            // 2. Filtro de Búsqueda
            const currentTranslation = proyecto.translations[lang as "es" | "en"] || proyecto.translations.es;
            const query = searchQuery.toLowerCase().trim();
            
            const matchesSearch = query === "" || 
                currentTranslation.title.toLowerCase().includes(query) ||
                currentTranslation.description.toLowerCase().includes(query) ||
                proyecto.technologies.some(tech => tech.toLowerCase().includes(query)) ||
                t(`projects.categories.${proyecto.categoryKey}`).toLowerCase().includes(query) ||
                proyecto.title.toLowerCase().includes(query);
                
            return matchesCategory && matchesSearch;
        });
    }, [selectedCategoryKey, searchQuery, lang, t]);

    const handleOpenLightbox = (project: Project) => {
        setSelectedProject(project);
        setIsLightboxOpen(true);
    };

    // Textos personalizados según idioma
    const isEs = lang === 'es';
    const pageTitle = isEs ? "Todos los Proyectos Realizados" : "Completed Projects";
    const pageSubtitle = isEs 
        ? "Explorá sitios web, catálogos digitales, e-commerce y sistemas desarrollados para negocios reales."
        : "Explore websites, digital catalogs, e-commerce platforms and private systems developed for real businesses.";

    return (
        <main style={{ minHeight: "100vh", backgroundColor: "#000", color: "#fff", position: "relative", overflowX: "hidden", display: "flex", flexDirection: "column" }}>
            {/* Componente oficial de partículas de la Home */}
            <BackgroundParticles />
            
            {/* Barra de progreso de scroll */}
            <ScrollProgress />

            {/* Navbar Global */}
            <Navbar />

            {/* Efectos y Partículas de Fondo en Mesh adicionales */}
            <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1, overflow: 'hidden' }}>
                <motion.div 
                    style={{ 
                        position: 'absolute',
                        top: 0,
                        left: '20%',
                        width: '550px',
                        height: '550px',
                        borderRadius: '50%',
                        opacity: 0.2,
                        filter: 'blur(140px)',
                        background: `radial-gradient(circle, ${theme.accent}, transparent 70%)`
                    }}
                    animate={{
                        scale: [1, 1.1, 1],
                        opacity: [0.15, 0.22, 0.15],
                    }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div 
                    style={{ 
                        position: 'absolute',
                        bottom: '25%',
                        right: '10%',
                        width: '650px',
                        height: '650px',
                        borderRadius: '50%',
                        opacity: 0.12,
                        filter: 'blur(150px)',
                        background: 'radial-gradient(circle, #6366f1, transparent 70%)'
                    }}
                    animate={{
                        scale: [1, 1.15, 1],
                        opacity: [0.08, 0.15, 0.08],
                    }}
                    transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                />
            </div>

            {/* Cuadrícula interactiva de fondo */}
            <div className="absolute inset-0 opacity-[0.015]" style={{ pointerEvents: 'none', zIndex: 1 }}>
                <div
                    style={{
                        position: 'absolute',
                        inset: 0,
                        backgroundImage: `
                            linear-gradient(${theme.accent} 2px, transparent 2px),
                            linear-gradient(90deg, ${theme.accent} 2px, transparent 2px)
                        `,
                        backgroundSize: "85px 85px"
                    }}
                />
            </div>

            {/* Contenido Principal */}
            <div style={{ position: "relative", zIndex: 10, flexGrow: 1 }} className="w-full flex flex-col items-center">
                
                {/* Sección de Encabezado Principal */}
                <section style={{ position: "relative", width: "100%", maxWidth: "1200px", margin: "0 auto", padding: "180px 24px 40px", textAlign: "center" }}>
                    
                    {/* Migas de Pan (Breadcrumbs) */}
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center justify-center gap-2.5 px-4 py-2 mb-6 rounded-full border border-white/5 bg-[#13141C]/40 backdrop-blur-md"
                        style={{ margin: "0 auto" }}
                    >
                        <svg className="w-4 h-4 text-[#00d9ff]" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                        </svg>
                        <Link href={`/${lang}`} className="text-xs font-semibold text-slate-400 hover:text-[#00d9ff] transition-colors duration-300 no-underline">
                            {isEs ? 'Inicio' : 'Home'}
                        </Link>
                        <span className="text-xs text-slate-600">›</span>
                        <span className="text-xs font-semibold text-[#00d9ff]">
                            {isEs ? 'Proyectos' : 'Projects'}
                        </span>
                    </motion.div>

                    <br />

                    {/* Distintivo Superior */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center gap-2 px-5 py-2.5 mb-6 rounded-full border border-[#00d9ff]/25 bg-[#13141C]/80 backdrop-blur-md"
                    >
                        <span className="w-2 h-2 rounded-full bg-[#00d9ff] shadow-[0_0_10px_#00d9ff]" />
                        <span className="text-xs font-black uppercase tracking-[0.2em] text-[#00d9ff]">
                            {isEs ? "Portfolio Completo" : "Full Portfolio"}
                        </span>
                    </motion.div>

                    {/* Título de Página */}
                    <motion.h1 
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        style={{ 
                            fontSize: "clamp(2.2rem, 6vw, 4.5rem)", 
                            fontWeight: 900, 
                            lineHeight: "1.15", 
                            background: `linear-gradient(135deg, ${theme.text}, ${theme.accentDark})`, 
                            WebkitBackgroundClip: "text", 
                            WebkitTextFillColor: "transparent",
                            marginTop: "16px",
                            marginBottom: "24px"
                        }}
                    >
                        {pageTitle}
                    </motion.h1>

                    {/* Subtítulo de Página */}
                    <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        style={{ fontSize: "clamp(14px, 2vw, 17px)", maxWidth: "720px", margin: "0 auto", color: "#999", lineHeight: "1.6" }}
                    >
                        {pageSubtitle}
                    </motion.p>

                    {/* Buscador de Proyectos con estilo glassmorphism (Exclusivo de esta ruta) */}
                    <motion.div 
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.15 }}
                        style={{
                            width: "100%",
                            maxWidth: "600px",
                            margin: "40px auto 0 auto",
                            padding: "0 16px",
                            position: "relative",
                            zIndex: 20
                        }}
                    >
                        <div style={{
                            position: "relative",
                            width: "100%",
                            padding: "1px",
                            borderRadius: "9999px",
                            background: isSearchFocused 
                                ? "linear-gradient(90deg, #00d9ff, #0099cc, #00d9ff)" 
                                : "linear-gradient(90deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05), rgba(255,255,255,0.1))",
                            boxShadow: isSearchFocused 
                                ? "0 0 35px rgba(0, 217, 255, 0.25)" 
                                : "0 4px 30px rgba(0, 0, 0, 0.5)",
                            transition: "all 0.5s ease"
                        }}>
                            <div style={{
                                position: "relative",
                                display: "flex",
                                alignItems: "center",
                                width: "100%",
                                height: "54px",
                                borderRadius: "9999px",
                                backgroundColor: "rgba(19, 20, 28, 0.85)",
                                backdropFilter: "blur(12px)",
                                WebkitBackdropFilter: "blur(12px)",
                                padding: "0 20px"
                            }}>
                                <span style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    color: isSearchFocused ? "#00d9ff" : "#94a3b8",
                                    transform: isSearchFocused ? "scale(1.1)" : "scale(1)",
                                    filter: isSearchFocused ? "drop-shadow(0 0 8px #00d9ff)" : "none",
                                    transition: "all 0.3s ease"
                                }}>
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </span>
                                <input
                                    type="text"
                                    placeholder={isEs ? "Buscar proyecto, tecnología o tipo de solución…" : "Search project, technology or solution type…"}
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    onFocus={() => setIsSearchFocused(true)}
                                    onBlur={() => setIsSearchFocused(false)}
                                    style={{
                                        flexGrow: 1,
                                        backgroundColor: "transparent",
                                        color: "#ffffff",
                                        fontSize: "16px",
                                        fontFamily: "inherit",
                                        fontWeight: 500,
                                        border: "none",
                                        outline: "none",
                                        padding: "0 16px",
                                        textAlign: "center"
                                    }}
                                />
                                <AnimatePresence>
                                    {searchQuery && (
                                        <motion.button
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.8 }}
                                            onClick={() => setSearchQuery("")}
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                width: "32px",
                                                height: "32px",
                                                borderRadius: "50%",
                                                backgroundColor: "transparent",
                                                border: "none",
                                                color: "#94a3b8",
                                                cursor: "pointer",
                                                transition: "all 0.3s ease"
                                            }}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.color = "#00d9ff";
                                                e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.05)";
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.color = "#94a3b8";
                                                e.currentTarget.style.backgroundColor = "transparent";
                                            }}
                                            aria-label={isEs ? "Limpiar búsqueda" : "Clear search"}
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </motion.button>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    </motion.div>

                    {/* Contador de Resultados Dinámico */}
                    <div className="h-8 mt-4 flex items-center justify-center relative z-20">
                        <AnimatePresence mode="wait">
                            {(searchQuery || selectedCategoryKey !== "all") && (
                                <motion.span
                                    key={`${searchQuery}-${selectedCategoryKey}-${proyectosFiltrados.length}`}
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                    transition={{ duration: 0.2 }}
                                    className="text-xs font-semibold tracking-wider text-[#00d9ff]/80 bg-[#00d9ff]/5 px-4 py-1.5 rounded-full border border-[#00d9ff]/20 shadow-[0_0_15px_rgba(0,217,255,0.05)]"
                                >
                                    {isEs 
                                        ? `Mostrando ${proyectosFiltrados.length} de ${projectsData.length} proyectos` 
                                        : `Showing ${proyectosFiltrados.length} of ${projectsData.length} projects`}
                                </motion.span>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Filtros de Categorías */}
                    <div 
                        className="flex flex-wrap justify-center gap-4 mt-8 mb-4"
                        style={{
                            display: "flex",
                            flexWrap: "wrap",
                            justifyContent: "center",
                            gap: "16px",
                            marginTop: "32px",
                            marginBottom: "32px"
                        }}
                    >
                        {categories.map((catKey) => (
                            <button
                                key={catKey}
                                onClick={() => setSelectedCategoryKey(catKey)}
                                style={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    padding: '10px 24px',
                                    borderRadius: '12px',
                                    fontSize: '14px',
                                    fontWeight: 700,
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.05em',
                                    backgroundColor: selectedCategoryKey === catKey ? 'rgba(0, 217, 255, 0.15)' : 'rgba(255, 255, 255, 0.03)',
                                    border: selectedCategoryKey === catKey ? '1px solid #00d9ff' : '1px solid rgba(255, 255, 255, 0.1)',
                                    color: selectedCategoryKey === catKey ? '#00d9ff' : '#94a3b8',
                                    boxShadow: selectedCategoryKey === catKey ? '0 0 20px rgba(0, 217, 255, 0.3)' : 'none',
                                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                    cursor: 'pointer',
                                    backdropFilter: 'blur(10px)',
                                    minHeight: "44px",
                                    boxSizing: "border-box"
                                }}
                                onMouseEnter={(e) => {
                                    if (selectedCategoryKey !== catKey) {
                                        e.currentTarget.style.borderColor = 'rgba(0, 217, 255, 0.5)';
                                        e.currentTarget.style.color = '#ffffff';
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    if (selectedCategoryKey !== catKey) {
                                        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                                        e.currentTarget.style.color = '#94a3b8';
                                    }
                                }}
                            >
                                {t(`projects.categories.${catKey}`)}
                            </button>
                        ))}
                    </div>
                </section>

                {/* Grilla de Proyectos y Estado Vacío */}
                <section style={{ width: "100%", maxWidth: "1200px", padding: "0 24px 120px 24px" }} className="relative z-20">
                    {proyectosFiltrados.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center md:justify-items-stretch perspective-2000 items-stretch">
                            <AnimatePresence mode="popLayout">
                                {proyectosFiltrados.map((proyecto, idx) => (
                                    <ProjectPageCard
                                        key={proyecto.id}
                                        project={proyecto}
                                        index={idx}
                                        theme={theme}
                                        language={lang}
                                        t={t}
                                        onOpenLightbox={handleOpenLightbox}
                                    />
                                ))}
                            </AnimatePresence>
                        </div>
                    ) : (
                        <motion.div 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-center py-20 px-6 border border-white/5 bg-[#13141C]/30 backdrop-blur-sm rounded-3xl max-w-lg mx-auto"
                        >
                            <svg className="w-16 h-16 text-slate-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <h3 className="text-lg font-bold text-white mb-2">
                                {isEs ? "No encontramos proyectos" : "No projects found"}
                            </h3>
                            <p className="text-sm text-slate-400">
                                {isEs ? "No encontramos proyectos con esa búsqueda." : "No projects found for that search."}
                            </p>
                        </motion.div>
                    )}
                </section>
            </div>

            {/* Footer Global */}
            <Footer />

            {/* Lightbox / Modal */}
            <ProjectLightbox
                project={selectedProject}
                isOpen={isLightboxOpen}
                onClose={() => setIsLightboxOpen(false)}
                lang={lang as "es" | "en"}
                t={t}
            />
        </main>
    );
}
