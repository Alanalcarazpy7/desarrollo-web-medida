"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

const theme = {
    accent: "#00d9ff",
    accentDark: "#0099cc",
    accentGlow: "rgba(0, 217, 255, 0.4)",
    bgCard: "#0a0a0f",
    bgCardHover: "#111119",
    textMain: "#ffffff",
    textSide: "rgba(255, 255, 255, 0.6)"
};

// Íconos de línea (mismo lenguaje visual que Confianza/Servicios), en vez de
// emojis, para que se vea profesional y no infantil.
const icons = {
    barberia: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
            <circle cx="6" cy="6" r="3" /><circle cx="6" cy="18" r="3" />
            <line x1="20" y1="4" x2="8.12" y2="15.88" /><line x1="14.47" y1="14.48" x2="20" y2="20" /><line x1="8.12" y1="8.12" x2="12" y2="12" />
        </svg>
    ),
    veterinaria: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
            <ellipse cx="7" cy="8" rx="1.8" ry="2.2" /><ellipse cx="12" cy="5.5" rx="1.8" ry="2.2" /><ellipse cx="17" cy="8" rx="1.8" ry="2.2" />
            <ellipse cx="12" cy="16" rx="4.5" ry="3.6" />
        </svg>
    ),
    gimnasio: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
            <rect x="1" y="9" width="3" height="6" rx="1" /><rect x="20" y="9" width="3" height="6" rx="1" />
            <rect x="6" y="7" width="2.5" height="10" rx="1" /><rect x="15.5" y="7" width="2.5" height="10" rx="1" />
            <line x1="8.5" y1="12" x2="15.5" y2="12" />
        </svg>
    ),
    tienda: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
            <line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 01-8 0" />
        </svg>
    ),
    restaurante: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 3v6a2 2 0 002 2v0a2 2 0 002-2V3" /><path d="M6 3v18" />
            <path d="M16 3c0 3-1 4-1 7 0 1 .6 2 2 2v9" />
        </svg>
    ),
    lavadero: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 11l1.5-4.5A2 2 0 018.4 5h7.2a2 2 0 011.9 1.5L19 11" />
            <rect x="3" y="11" width="18" height="6" rx="2" />
            <circle cx="7.5" cy="17.5" r="1.5" /><circle cx="16.5" cy="17.5" r="1.5" />
        </svg>
    ),
    profesionales: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="7" width="20" height="14" rx="2" />
            <path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16" /><line x1="2" y1="13" x2="22" y2="13" />
        </svg>
    ),
    emprendedores: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2c2.5 2 4 5.5 4 9 0 2-1 4-2 5l-2 2-2-2c-1-1-2-3-2-5 0-3.5 1.5-7 4-9z" />
            <circle cx="12" cy="9" r="1.4" /><path d="M9 16l-2 5 4-2M15 16l2 5-4-2" />
        </svg>
    ),
    inmobiliarias: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 11.5L12 4l9 7.5" />
            <path d="M5 10v9a1 1 0 001 1h4v-6h4v6h4a1 1 0 001-1v-9" />
        </svg>
    ),
    tecnicos: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
            <path d="M14.7 6.3a4 4 0 10-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 005.4-5.4l-2.8 2.8-2.8-2.8z" />
        </svg>
    ),
};

const businessTypes = {
    es: [
        { label: "Barberías y Peluquerías", icon: "barberia", desc: "Reservas online, agenda digital y galería de cortes y estilos." },
        { label: "Veterinarias y Mascotas", icon: "veterinaria", desc: "Fichas de pacientes, agenda de citas y tienda de productos médicos." },
        { label: "Gimnasios y Centros Fitness", icon: "gimnasio", desc: "Horarios de clases, membresías y registro de alumnos." },
        { label: "Tiendas y E-commerce", icon: "tienda", desc: "Catálogo interactivo, carrito de compras y pasarela de pagos integrada." },
        { label: "Restaurantes y Cafés", icon: "restaurante", desc: "Menú QR digital, pedidos por WhatsApp y mapa de ubicación." },
        { label: "Lavaderos y Talleres", icon: "lavadero", desc: "Turneros en línea, servicios detallados y contacto directo." },
        { label: "Profesionales y Consultores", icon: "profesionales", desc: "Portafolio de servicios, agendamiento y marca personal." },
        { label: "Emprendedores y Startups", icon: "emprendedores", desc: "Landing pages optimizadas para lanzar y validar productos rápido." },
        { label: "Inmobiliarias y Propiedades", icon: "inmobiliarias", desc: "Buscador de inmuebles, galería de fotos y filtros de precios." },
        { label: "Servicios Técnicos", icon: "tecnicos", desc: "Presupuestos en línea, listado de coberturas y botón de llamada." }
    ],
    en: [
        { label: "Barbershops & Salons", icon: "barberia", desc: "Online booking, digital calendar, and styling gallery." },
        { label: "Veterinary Clinics", icon: "veterinaria", desc: "Patient profiles, appointment scheduling, and supplies store." },
        { label: "Gyms & Fitness", icon: "gimnasio", desc: "Class schedules, memberships, and member registration portal." },
        { label: "Clothing & Retail Stores", icon: "tienda", desc: "Interactive catalog, shopping cart, and integrated payments." },
        { label: "Restaurants & Cafes", icon: "restaurante", desc: "Digital QR menu, order via WhatsApp, and location maps." },
        { label: "Car Washes & Workshops", icon: "lavadero", desc: "Online slot booking, detailed services, and direct contact." },
        { label: "Professionals & Consultants", icon: "profesionales", desc: "Service portfolio, scheduling tools, and personal branding." },
        { label: "Entrepreneurs & Startups", icon: "emprendedores", desc: "High-conversion landing pages to launch and validate fast." },
        { label: "Real Estate Agencies", icon: "inmobiliarias", desc: "Property search engine, photo galleries, and price filters." },
        { label: "Technical Services", icon: "tecnicos", desc: "Online quotes, coverage areas list, and direct call buttons." }
    ]
};

export default function IdealPara() {
    const { language } = useLanguage();
    const activeList = businessTypes[language as "es" | "en"] || businessTypes.es;

    return (
        <section id="ideal-para" style={{ position: "relative", padding: "88px 24px", overflow: "hidden", background: "transparent" }}>
            <div style={{
                position: "absolute",
                bottom: "0",
                right: "10%",
                width: "350px",
                height: "350px",
                borderRadius: "555px",
                background: `radial-gradient(circle, ${theme.accentGlow}, transparent 70%)`,
                filter: "blur(110px)",
                pointerEvents: "none",
                opacity: 0.2
            }} />

            <div style={{ position: "relative", zIndex: 10, maxWidth: "1280px", margin: "0 auto", textAlign: "center" }}>
                <div style={{ marginBottom: "48px" }}>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, type: "spring" }}
                        className="inline-flex items-center gap-3 px-7 py-3.5 mb-6 rounded-full cursor-default"
                        style={{
                            background: `linear-gradient(135deg, ${theme.bgCard}f0, ${theme.bgCardHover}f0)`,
                            border: `2px solid ${theme.accent}55`,
                            boxShadow: `0 0 30px ${theme.accentGlow}`,
                            backdropFilter: "blur(20px)",
                        }}
                    >
                        <motion.span
                            className="w-3 h-3 rounded-full"
                            style={{ background: theme.accent, boxShadow: `0 0 20px ${theme.accentGlow}` }}
                            animate={{ scale: [1, 1.3, 1], opacity: [1, 0.7, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        />
                        <span className="text-base font-black uppercase tracking-[0.22em]" style={{ color: theme.accent }}>
                            {language === 'es' ? "Rubros y Sectores" : "Industries We Serve"}
                        </span>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)", fontWeight: 900, color: theme.textMain }}
                    >
                        {language === 'es' ? "Ideal para negocios como:" : "Ideal for businesses like:"}
                    </motion.h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 w-full mb-20 px-4 justify-center">
                    {activeList.map((biz, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: idx * 0.05, type: "spring", stiffness: 100 }}
                            whileHover={{ y: -6 }}
                            className="ideal-card"
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                textAlign: "center",
                                gap: "16px",
                                padding: "30px 20px",
                                borderRadius: "20px",
                                background: `linear-gradient(160deg, ${theme.bgCard}, rgba(13, 14, 24, 0.5))`,
                                border: "1px solid rgba(255, 255, 255, 0.07)",
                                backdropFilter: "blur(12px)",
                                WebkitBackdropFilter: "blur(12px)",
                                transition: "all 0.35s cubic-bezier(0.22, 1, 0.36, 1)",
                                cursor: "default",
                                position: "relative",
                                overflow: "hidden"
                            }}
                        >
                            {/* Línea superior brillante en hover */}
                            <div className="ideal-card-top-glow" style={{
                                position: "absolute", insetInline: 0, top: 0, height: "2px",
                                background: `linear-gradient(90deg, transparent, ${theme.accent}, transparent)`,
                            }} />

                            <div
                                className="icon-container"
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    width: "60px",
                                    height: "60px",
                                    borderRadius: "16px",
                                    background: `linear-gradient(135deg, ${theme.accent}22, ${theme.accent}08)`,
                                    border: `1px solid ${theme.accent}30`,
                                    color: theme.accent,
                                    boxShadow: "inset 0 0 15px rgba(0, 217, 255, 0.05), 0 4px 12px rgba(0,0,0,0.5)",
                                    transition: "all 0.4s ease"
                                }}
                            >
                                {icons[biz.icon as keyof typeof icons]}
                            </div>

                            <div style={{ display: "flex", flexDirection: "column", gap: "6px", zIndex: 5 }}>
                                <h3 style={{
                                    fontSize: "15px",
                                    fontWeight: 800,
                                    color: "#ffffff",
                                    margin: 0,
                                    textTransform: "uppercase",
                                    letterSpacing: "0.03em"
                                }}>
                                    {biz.label}
                                </h3>
                                <p style={{
                                    fontSize: "12px",
                                    color: "rgba(255, 255, 255, 0.55)",
                                    lineHeight: "1.5",
                                    margin: 0,
                                    fontWeight: 500
                                }}>
                                    {biz.desc}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <style dangerouslySetInnerHTML={{ __html: `
                    .ideal-card-top-glow {
                        opacity: 0;
                        transition: opacity 0.4s ease;
                    }
                    .ideal-card:hover {
                        border-color: ${theme.accent}55 !important;
                        background: linear-gradient(160deg, ${theme.bgCardHover}, rgba(13, 14, 24, 0.85)) !important;
                        box-shadow: 0 16px 38px rgba(0, 217, 255, 0.16), inset 0 0 20px rgba(0, 217, 255, 0.04) !important;
                    }
                    .ideal-card:hover .ideal-card-top-glow {
                        opacity: 1;
                    }
                    .ideal-card:hover .icon-container {
                        transform: scale(1.1) rotate(-4deg) !important;
                        background: linear-gradient(135deg, ${theme.accent}35, ${theme.accent}10) !important;
                        border-color: ${theme.accent} !important;
                        box-shadow: 0 0 24px rgba(0, 217, 255, 0.35) !important;
                    }
                `}} />

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    style={{
                        maxWidth: "700px",
                        marginTop: "16px",
                        marginInline: "auto",
                        padding: "20px 24px",
                        borderRadius: "16px",
                        background: "rgba(0, 217, 255, 0.03)",
                        borderLeft: `4px solid ${theme.accent}`,
                        textAlign: "left"
                    }}
                >
                    <p style={{
                        fontSize: "clamp(0.95rem, 2.5vw, 1.1rem)",
                        color: "#d1d5db",
                        lineHeight: 1.6,
                        margin: 0,
                        fontWeight: 500
                    }}>
                        {language === 'es'
                            ? "Si tu negocio recibe consultas por WhatsApp, Instagram o Facebook, una web puede ayudarte a mostrar todo más ordenado y profesional."
                            : "If your business receives inquiries through WhatsApp, Instagram or Facebook, a website can help you show everything in a more organized and professional way."}
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
