"use client";

import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { useState, MouseEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { trackEvent } from "@/lib/analytics";
import { getWhatsAppLink } from "@/lib/whatsapp";
import { Project, projectsData } from "@/lib/projects-data";
import ProjectLightbox from "./ProjectLightbox";

// Componente de tarjeta de proyecto
function ProjectCard({
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

    // Badges según tipo de acceso (Estilo Premium Glass con borde brillante)
    const getAccessBadgeText = () => {
        if (project.accessType === "live") return t("projects.badgeLive");
        if (project.accessType === "private-system") return t("projects.badgePrivate");
        return t("projects.badgeSample"); // image-only
    };

    const getAccessBadgeColors = () => {
        if (project.accessType === "live") return { text: "#00ffcc", border: "rgba(0, 255, 204, 0.4)" };
        if (project.accessType === "private-system") return { text: "#ffaa00", border: "rgba(255, 170, 0, 0.4)" };
        return { text: "#00d9ff", border: "rgba(0, 217, 255, 0.4)" }; // image-only
    };

    const badgeColors = getAccessBadgeColors();

    const handleCardClick = (e: MouseEvent) => {
        if (!isLive) {
            e.preventDefault();
            trackEvent('click_project_view', { project: currentTranslation.title, lang: language, source: 'card_click' });
            onOpenLightbox(project);
        } else {
            trackEvent('click_project_view', { project: currentTranslation.title, lang: language, source: 'image' });
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
            transition={{ duration: 0.5, delay: index * 0.1 }}
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
                {/* Borde con gradiente animado */}
                <div className="absolute -inset-[3px] rounded-[27px] bg-gradient-to-r from-cyan-500 via-white to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-md" />

                {/* Contenedor de contenido de la tarjeta */}
                <div className="relative w-full h-full rounded-[24px] overflow-hidden border border-white/10 flex flex-col grow shadow-2xl" style={{ backgroundColor: '#13141C' }}>

                    {/* Sección de imagen */}
                    <div 
                        className="relative aspect-[16/10] w-full shrink-0 block overflow-hidden group-image-container" 
                        style={{ perspective: '1000px' }}
                    >
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
                                {/* FRENTE */}
                                <div className="absolute inset-0 w-full h-full" style={{ backfaceVisibility: "hidden" }}>
                                    <Image
                                        src={project.image}
                                        alt={currentTranslation.alt}
                                        fill
                                        className={`object-cover ${project.objectPosition === 'left' ? 'object-left' : 'object-center'}`}
                                        priority={index < 2}
                                    />
                                </div>

                                {/* DORSO (ADMIN) */}
                                <div className="absolute inset-0 w-full h-full bg-[#13141C]" style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}>
                                    <Image
                                        src={project.imageBack}
                                        alt={`${currentTranslation.title} Admin`}
                                        fill
                                        className="object-cover object-left-top"
                                    />
                                </div>
                            </motion.div>
                        ) : (
                            // SIN FLIP
                            <motion.div
                                className="w-full h-full"
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
                                    priority={index < 2}
                                />
                            </motion.div>
                        )}

                        {/* Etiqueta de categoría (siempre visible y estática) */}
                        <div className="absolute top-4 right-4 z-20 pointer-events-none" style={{ transform: 'translateZ(20px)' }}>
                            <div
                                style={{
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
                                }}
                            >
                                <span className="text-[10px] font-bold text-[#00d9ff] uppercase tracking-wider">
                                    {t(`projects.categories.${project.categoryKey}`)}
                                </span>
                            </div>
                        </div>

                        {/* Etiqueta de Tipo de Acceso (Premium Glass, alta legibilidad) */}
                        <div className="absolute top-4 left-4 z-20 pointer-events-none" style={{ transform: 'translateZ(20px)' }}>
                            <div 
                                style={{
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
                                }}
                            >
                                <span 
                                    style={{ color: badgeColors.text }} 
                                    className="text-[10px] font-bold uppercase tracking-wider"
                                >
                                    {getAccessBadgeText()}
                                </span>
                            </div>
                        </div>

                        {/* Superposición al pasar el cursor */}
                        <motion.div
                            className="absolute inset-0 z-10"
                            variants={{
                                rest: { opacity: 0 },
                                hover: { opacity: 1 }
                            }}
                            transition={{ duration: 0.4, ease: "easeInOut" }}
                            style={{ backgroundColor: "rgba(0, 50, 100, 0.4)" }}
                        />

                        {/* Hover Overlay Icon */}
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

                    {/* Sección de contenido de la card con espaciado consistente */}
                    <div
                        className="relative flex flex-col gap-5 z-10 grow"
                        style={{ padding: '28px 24px 32px 24px', backgroundColor: 'transparent' }}
                    >
                        {/* Tecnologías */}
                        <div className="flex flex-wrap gap-1.5">
                            {project.technologies.map((tech: string) => (
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
                                        borderRadius: '6px',
                                        transition: 'all 0.3s ease',
                                        cursor: 'default'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.backgroundColor = 'rgba(0, 217, 255, 0.15)';
                                        e.currentTarget.style.borderColor = theme.accent;
                                        e.currentTarget.style.boxShadow = '0 0 10px rgba(0, 217, 255, 0.2)';
                                        e.currentTarget.style.transform = 'translateY(-1px)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.backgroundColor = 'rgba(0, 217, 255, 0.05)';
                                        e.currentTarget.style.borderColor = 'rgba(0, 217, 255, 0.15)';
                                        e.currentTarget.style.boxShadow = 'none';
                                        e.currentTarget.style.transform = 'translateY(0)';
                                    }}
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>

                        {/* Contenido de texto principal */}
                        <div className="space-y-3 pb-2 flex-grow">
                            <h3 className="text-xl font-black text-white uppercase tracking-tight leading-snug group-hover:text-[#00d9ff] transition-colors duration-300">
                                {currentTranslation.title}
                            </h3>
                            <p className="text-xs text-slate-300 leading-relaxed pr-2 line-clamp-3">
                                {currentTranslation.description}
                            </p>
                        </div>

                        {/* Botones de acción (Alineación y paddings controlados por Inline-Flex para centrado vertical perfecto) */}
                        <div className="mt-auto pt-5 border-t border-white/5 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                            {isLive ? (
                                <a
                                    href={mainActionUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        trackEvent('click_project_view', { project: currentTranslation.title, lang: language, source: 'cta' });
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
                                        boxShadow: "0 4px 15 rgba(0, 217, 255, 0.35)",
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
                                        trackEvent('click_project_view', { project: currentTranslation.title, lang: language, source: 'cta_preview' });
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
                                    trackEvent('click_whatsapp', { source: 'project_similar', project: currentTranslation.title, lang: language });
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

                    {/* Superposición brillante al pasar el cursor */}
                    <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/10 via-transparent to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none mix-blend-overlay" />

                    {/* Borde de resplandor interior */}
                    <div className="absolute inset-0 border-2 border-cyan-500/0 group-hover:border-cyan-500/50 rounded-[24px] transition-colors duration-300 pointer-events-none" />
                </div>
            </motion.div >
        </motion.div >
    );
}

export default function Proyectos() {
    const { t, language } = useLanguage();
    const [selectedCategoryKey, setSelectedCategoryKey] = useState("all");
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);

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

    // Mostrar solo los proyectos destacados (featured: true) en la home
    const proyectosDestacados = projectsData.filter((p) => p.featured === true);

    // Aplicar filtro de categorías sobre los proyectos destacados
    const proyectosFiltrados =
        selectedCategoryKey === "all"
            ? proyectosDestacados
            : proyectosDestacados.filter((p) => p.categoryKey === selectedCategoryKey);

    const handleOpenLightbox = (project: Project) => {
        setSelectedProject(project);
        setIsLightboxOpen(true);
    };

    const viewAllHref = language === 'en' ? '/en/projects' : '/es/proyectos';

    return (
        <section
            id="proyectos"
            className="relative overflow-hidden flex flex-col items-center w-full min-h-screen"
            style={{
                marginTop: '140px',
                scrollMarginTop: '100px'
            }}
        >
            {/* Patrón de fondo optimizado (contain: paint) */}
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

            {/* Elementos de fondo */}
            <div className="w-full max-w-7xl px-6 md:px-8 relative z-10">

                {/* Encabezado Principal Centrado */}
                <div className="flex flex-col items-center text-center w-full mb-12">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8 }}
                        className="text-center max-w-4xl flex flex-col items-center"
                    >
                        {/* Distintivo */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.5 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, type: "spring" }}
                            className="inline-flex items-center gap-3 px-6 py-3 mb-6 rounded-full cursor-default"
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
                                {t('projects.badge')}
                            </span>
                        </motion.div>

                        {/* Título (Una Sola Línea) */}
                        <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-center" style={{ marginTop: '16px', marginBottom: '24px', lineHeight: '1.15', whiteSpace: 'nowrap' }}>
                            <span style={{ color: theme.text }}>{t('projects.titleStart')} </span>
                            <span
                                style={{
                                    background: `linear-gradient(135deg, ${theme.accent}, ${theme.accentDark})`,
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent",
                                }}
                            >
                                {t('projects.titleHighlight')}
                            </span>
                        </h2>

                        {/* Subtítulo */}
                        <p className="text-base md:text-xl leading-relaxed text-center" style={{ color: theme.textMuted, marginTop: '16px', marginBottom: '32px', maxWidth: '600px' }}>
                            {t('projects.subtitle')}
                        </p>
                    </motion.div>
                </div>

                {/* Fila de Filtros y CTA (Filtros a la izquierda, Ver todos los proyectos a la derecha) */}
                <div 
                    className="flex flex-col lg:flex-row items-center justify-between gap-6 mb-12 w-full"
                    style={{
                        display: "flex",
                        flexWrap: "wrap",
                        justifyContent: "space-between",
                        alignItems: "center",
                        gap: "16px",
                        marginBottom: "48px"
                    }}
                >
                    {/* Filtros */}
                    <div 
                        className="flex flex-wrap justify-center lg:justify-start gap-4"
                        style={{
                            display: "flex",
                            flexWrap: "wrap",
                            gap: "16px",
                            justifyContent: "center"
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

                    {/* Botón Ver todos los proyectos */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="flex justify-center lg:justify-end shrink-0"
                    >
                        <Link
                            href={viewAllHref}
                            onClick={() => trackEvent('click_view_all_projects', { lang: language })}
                            style={{
                                display: "inline-flex",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: "8px",
                                padding: "12px 28px",
                                fontSize: "12px",
                                fontWeight: 900,
                                color: "#00d9ff",
                                border: "1px solid rgba(0, 217, 255, 0.4)",
                                backgroundColor: "rgba(0, 217, 255, 0.03)",
                                borderRadius: "100px",
                                textTransform: "uppercase",
                                letterSpacing: "0.1em",
                                textDecoration: "none",
                                boxShadow: "0 4px 15px rgba(0, 217, 255, 0.1)",
                                cursor: "pointer",
                                minHeight: "48px",
                                boxSizing: "border-box"
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.borderColor = "#00d9ff";
                                e.currentTarget.style.backgroundColor = "rgba(0, 217, 255, 0.1)";
                                e.currentTarget.style.boxShadow = "0 6px 20px rgba(0, 217, 255, 0.25)";
                                e.currentTarget.style.transform = "translateY(-1px)";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.borderColor = "rgba(0, 217, 255, 0.4)";
                                e.currentTarget.style.backgroundColor = "rgba(0, 217, 255, 0.03)";
                                e.currentTarget.style.boxShadow = "0 4px 15px rgba(0, 217, 255, 0.1)";
                                e.currentTarget.style.transform = "translateY(0)";
                            }}
                            className="transition-all duration-300"
                        >
                            <span>{t('projects.viewAll')}</span>
                            <svg 
                                className="w-4 h-4 text-[#00d9ff]"
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24" 
                                strokeWidth={3}
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </Link>
                    </motion.div>
                </div>

                {/* Cuadrícula 3D de proyectos */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center md:justify-items-stretch perspective-2000 pb-24 items-stretch">
                    <AnimatePresence mode="popLayout">
                        {proyectosFiltrados.map((proyecto, index) => (
                            <ProjectCard
                                key={proyecto.id}
                                project={proyecto}
                                index={index}
                                theme={theme}
                                language={language}
                                t={t}
                                onOpenLightbox={handleOpenLightbox}
                            />
                        ))}
                    </AnimatePresence>
                </div>
            </div>

            {/* Lightbox / Modal */}
            <ProjectLightbox
                project={selectedProject}
                isOpen={isLightboxOpen}
                onClose={() => setIsLightboxOpen(false)}
                lang={language as "es" | "en"}
                t={t}
            />
        </section>
    );
}
