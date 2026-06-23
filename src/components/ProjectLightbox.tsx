"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Project } from "@/lib/projects-data";
import { getWhatsAppLink } from "@/lib/whatsapp";

interface ProjectLightboxProps {
    project: Project | null;
    isOpen: boolean;
    onClose: () => void;
    lang: "es" | "en";
    t: (key: string) => any;
}

export default function ProjectLightbox({ project, isOpen, onClose, lang, t }: ProjectLightboxProps) {
    const [showAdminView, setShowAdminView] = useState(false);
    const [isZoomed, setIsZoomed] = useState(false);

    // Reset view state when a new project is loaded
    useEffect(() => {
        setShowAdminView(false);
        setIsZoomed(false);
    }, [project]);

    // Handle ESC key press
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                onClose();
            }
        };
        if (isOpen) {
            window.addEventListener("keydown", handleKeyDown);
            // Disable background scrolling
            document.body.style.overflow = "hidden";
        }
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            document.body.style.overflow = "unset";
        };
    }, [isOpen, onClose]);

    if (!project) return null;

    const currentTranslation = project.translations[lang] || project.translations.es;

    // WhatsApp message setup
    const whatsappMessage = lang === 'en'
        ? `Hi! I saw the project "${currentTranslation.title}" and I would like to quote something similar for my business.`
        : `¡Hola! Vi el proyecto "${currentTranslation.title}" y me gustaría cotizar algo similar para mi negocio.`;
    const whatsappUrl = getWhatsAppLink(whatsappMessage);

    // Badges definitions
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

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-black/90 backdrop-blur-md"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ scale: 0.95, y: 20, opacity: 0 }}
                        animate={{ scale: 1, y: 0, opacity: 1 }}
                        exit={{ scale: 0.95, y: 20, opacity: 0 }}
                        transition={{ type: "spring", damping: 25, stiffness: 220 }}
                        className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-[28px] border border-[#00d9ff]/20 bg-[#13141c] p-6 md:p-10 shadow-[0_0_50px_rgba(0,217,255,0.15)] flex flex-col lg:flex-row gap-6 md:gap-8 scrollbar-thin scrollbar-thumb-white/10"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Botón Cerrar X */}
                        <button
                            onClick={onClose}
                            className="absolute top-5 right-5 z-50 p-2.5 rounded-full border border-white/10 bg-black/60 text-slate-400 hover:text-[#00d9ff] hover:border-[#00d9ff]/40 hover:bg-[#00d9ff]/10 hover:shadow-[0_0_15px_rgba(0,217,255,0.2)] transition-all cursor-pointer"
                            aria-label={lang === "en" ? "Close preview" : "Cerrar muestra"}
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        {/* Columna de Imagen(es) con Efecto Ambient Blur y Ajuste Completo (Sin Recortes) */}
                        <div className="flex-1 lg:flex-[1.4] flex flex-col gap-4 min-w-0">
                            <div
                                className="relative w-full h-[35vh] sm:h-[50vh] lg:h-[550px] rounded-2xl border border-white/10 bg-transparent shadow-inner overflow-hidden select-none flex items-center justify-center group"
                            >
                                {/* Imagen Replicada de Relleno Opacada con Desenfoque Suave */}
                                <motion.img
                                    key={`bg-${showAdminView && project.imageBack ? "admin" : "main"}`}
                                    src={showAdminView && project.imageBack ? project.imageBack : project.image}
                                    alt=""
                                    style={{
                                        position: "absolute",
                                        top: 0,
                                        left: 0,
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "cover",
                                        filter: "blur(8px)",
                                        opacity: 0.14,
                                        transform: "scale(1.05)",
                                        pointerEvents: "none"
                                    }}
                                />

                                {/* Imagen Principal Centrada y Completa */}
                                <motion.img
                                    key={`main-${showAdminView && project.imageBack ? "admin" : "main"}`}
                                    src={showAdminView && project.imageBack ? project.imageBack : project.image}
                                    alt={currentTranslation.alt}
                                    style={{
                                        position: "relative",
                                        zIndex: 10,
                                        maxWidth: "100%",
                                        maxHeight: "100%",
                                        objectFit: "contain",
                                        borderRadius: "12px",
                                        boxShadow: "0 20px 40px rgba(0, 0, 0, 0.8)",
                                        border: "1px solid rgba(255, 255, 255, 0.12)",
                                        pointerEvents: "none"
                                    }}
                                />
                            </div>

                            {/* Selector de Vista (Dual Image) */}
                            {project.imageBack && (
                                <div
                                    className="flex gap-2 justify-center mt-2"
                                    style={{
                                        display: "flex",
                                        gap: "8px",
                                        justifyContent: "center",
                                        marginTop: "8px"
                                    }}
                                >
                                    <button
                                        onClick={() => setShowAdminView(false)}
                                        style={{
                                            display: "inline-flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            minHeight: "38px",
                                            padding: "8px 16px",
                                            boxSizing: "border-box",
                                            borderRadius: "12px",
                                            fontSize: "11px",
                                            fontWeight: 900,
                                            textTransform: "uppercase",
                                            letterSpacing: "0.05em"
                                        }}
                                        className={`transition-all cursor-pointer border ${!showAdminView
                                                ? "bg-[#00d9ff]/20 text-[#00d9ff] border-[#00d9ff]/50 shadow-[0_0_15px_rgba(0,217,255,0.2)]"
                                                : "bg-white/5 text-slate-400 border-white/10 hover:bg-white/10"
                                            }`}
                                    >
                                        {t("projects.mainView")}
                                    </button>
                                    <button
                                        onClick={() => setShowAdminView(true)}
                                        style={{
                                            display: "inline-flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            minHeight: "38px",
                                            padding: "8px 16px",
                                            boxSizing: "border-box",
                                            borderRadius: "12px",
                                            fontSize: "11px",
                                            fontWeight: 900,
                                            textTransform: "uppercase",
                                            letterSpacing: "0.05em"
                                        }}
                                        className={`transition-all cursor-pointer border ${showAdminView
                                                ? "bg-[#00d9ff]/20 text-[#00d9ff] border-[#00d9ff]/50 shadow-[0_0_15px_rgba(0,217,255,0.2)]"
                                                : "bg-white/5 text-slate-400 border-white/10 hover:bg-white/10"
                                            }`}
                                    >
                                        {t("projects.adminPanel")}
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Columna de Detalles del Proyecto (Con espaciado vertical mejorado y sin amontonamiento) */}
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "space-between",
                                flexShrink: 0
                            }}
                            className="w-full lg:w-[360px]"
                        >
                            <div style={{ display: "flex", flexDirection: "column" }}>
                                {/* Encabezado con Badges alineados e integrados */}
                                <div
                                    style={{
                                        display: "flex",
                                        flexWrap: "wrap",
                                        gap: "10px",
                                        alignItems: "center",
                                        marginBottom: "20px",
                                        marginTop: "4px"
                                    }}
                                >
                                    {/* Badge de Categoría */}
                                    <span
                                        style={{
                                            display: "inline-flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            padding: "6px 14px",
                                            minHeight: "28px",
                                            boxSizing: "border-box",
                                            borderRadius: "8px",
                                            fontSize: "10px",
                                            fontWeight: 800,
                                            textTransform: "uppercase",
                                            letterSpacing: "0.05em",
                                            border: "1px solid rgba(255, 255, 255, 0.1)",
                                            backgroundColor: "rgba(10, 10, 15, 0.85)",
                                            color: "#cbd5e1"
                                        }}
                                    >
                                        {t(`projects.categories.${project.categoryKey}`)}
                                    </span>
                                    {/* Badge de Acceso de Alto Contraste Glass */}
                                    <span
                                        style={{
                                            display: "inline-flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            padding: "6px 14px",
                                            minHeight: "28px",
                                            boxSizing: "border-box",
                                            borderRadius: "8px",
                                            fontSize: "10px",
                                            fontWeight: 800,
                                            textTransform: "uppercase",
                                            letterSpacing: "0.05em",
                                            color: badgeColors.text,
                                            borderColor: badgeColors.border,
                                            backgroundColor: 'rgba(10, 10, 15, 0.85)',
                                        }}
                                        className="border backdrop-blur-md"
                                    >
                                        {getAccessBadgeText()}
                                    </span>
                                </div>

                                {/* Título de Proyecto con margen inferior */}
                                <h2
                                    style={{
                                        fontSize: "24px",
                                        fontWeight: 900,
                                        color: "#ffffff",
                                        textTransform: "uppercase",
                                        letterSpacing: "-0.01em",
                                        lineHeight: "1.2",
                                        marginBottom: "24px",
                                        marginTop: "0px"
                                    }}
                                >
                                    {currentTranslation.title}
                                </h2>

                                {/* Descripción con margen inferior */}
                                <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "24px" }}>
                                    <h4 style={{ fontSize: "11px", fontWeight: 900, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.1em", margin: 0 }}>
                                        {lang === "en" ? "About the project" : "Sobre el proyecto"}
                                    </h4>
                                    <p style={{ fontSize: "14px", color: "#cbd5e1", lineHeight: "1.6", margin: 0 }}>
                                        {currentTranslation.description}
                                    </p>
                                </div>

                                {/* Tecnologías con margen inferior */}
                                <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "24px" }}>
                                    <h4 style={{ fontSize: "11px", fontWeight: 900, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.1em", margin: 0 }}>
                                        {t("projects.technologiesLabel")}
                                    </h4>
                                    <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                                        {project.technologies.map((tech) => (
                                            <span
                                                key={tech}
                                                style={{
                                                    display: "inline-flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    padding: "6px 12px",
                                                    minHeight: "26px",
                                                    boxSizing: "border-box",
                                                    borderRadius: "6px",
                                                    fontSize: "10px",
                                                    fontWeight: 700,
                                                    color: "#00d9ff",
                                                    backgroundColor: "rgba(0, 217, 255, 0.05)",
                                                    border: "1px solid rgba(0, 217, 255, 0.2)",
                                                    textTransform: "uppercase",
                                                    letterSpacing: "0.05em"
                                                }}
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Nota Persuasiva de Acceso / Privacidad */}
                                {(project.accessType === "private-system" || project.accessType === "image-only") && (
                                    <div
                                        style={{
                                            padding: "16px",
                                            borderRadius: "16px",
                                            border: "1px solid rgba(255, 170, 0, 0.15)",
                                            backgroundColor: "rgba(255, 170, 0, 0.05)",
                                            fontSize: "12px",
                                            color: "#cbd5e1",
                                            lineHeight: "1.5",
                                            display: "flex",
                                            gap: "12px",
                                            alignItems: "start",
                                            marginBottom: "24px"
                                        }}
                                    >
                                        <svg
                                            style={{ width: "20px", height: "20px", color: "#ffaa00", flexShrink: 0, marginTop: "2px" }}
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 15v2m0-6V9m0 12a9 9 0 110-18 9 9 0 010 18z" />
                                        </svg>
                                        <span>
                                            {project.accessType === "private-system"
                                                ? t("projects.privateSystemNote")
                                                : (lang === "en"
                                                    ? "Visual sample of the project. System hosted on a private or local server."
                                                    : "Muestra visual del proyecto. Sistema/sitio alojado en servidor local o privado.")
                                            }
                                        </span>
                                    </div>
                                )}
                            </div>

                            {/* Botón WhatsApp de Conversión */}
                            <div style={{ paddingTop: "24px", borderTop: "1px solid rgba(255, 255, 255, 0.05)", marginTop: "20px" }}>
                                <a
                                    href={whatsappUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{
                                        display: "inline-flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        gap: "10px",
                                        padding: "12px 24px",
                                        fontSize: "11px",
                                        fontWeight: 900,
                                        color: "#0a0a0a",
                                        borderRadius: "100px",
                                        textTransform: "uppercase",
                                        letterSpacing: "0.05em",
                                        textDecoration: "none",
                                        transition: "all 0.3s ease",
                                        boxShadow: "0 4px 20px rgba(0, 217, 255, 0.35)",
                                        cursor: "pointer",
                                        width: "100%",
                                        minHeight: "48px",
                                        boxSizing: "border-box",
                                        textAlign: "center"
                                    }}
                                    className="bg-[#00d9ff] hover:bg-[#00e5ff] hover:shadow-[0_6px_25px_rgba(0,217,255,0.55)] transition-all duration-300"
                                >
                                    <span>{t("projects.ctaSimilar")}</span>
                                    <svg className="w-4 h-4 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
