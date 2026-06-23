"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

export default function IdealPara() {
    const { language } = useLanguage();

    const theme = {
        accent: "#00d9ff",
        accentDark: "#0099cc",
        accentGlow: "rgba(0, 217, 255, 0.4)",
        bgCard: "#0a0a0f",
        textMain: "#ffffff",
        textSide: "rgba(255, 255, 255, 0.6)"
    };

    const businessTypes = {
        es: [
            { 
                label: "Barberías y Peluquerías", 
                emoji: "💈", 
                desc: "Reservas online, agenda digital y galería de cortes y estilos." 
            },
            { 
                label: "Veterinarias y Mascotas", 
                emoji: "🐾", 
                desc: "Fichas de pacientes, agenda de citas y tienda de productos médicos." 
            },
            { 
                label: "Gimnasios y Centros Fitness", 
                emoji: "💪", 
                desc: "Horarios de clases, membresías y registro de alumnos." 
            },
            { 
                label: "Tiendas y E-commerce", 
                emoji: "👕", 
                desc: "Catálogo interactivo, carrito de compras y pasarela de pagos integrada." 
            },
            { 
                label: "Restaurantes y Cafés", 
                emoji: "🍔", 
                desc: "Menú QR digital, pedidos por WhatsApp y mapa de ubicación." 
            },
            { 
                label: "Lavaderos y Talleres", 
                emoji: "🚗", 
                desc: "Turneros en línea, servicios detallados y contacto directo." 
            },
            { 
                label: "Profesionales y Consultores", 
                emoji: "💼", 
                desc: "Portafolio de servicios, agendamiento y marca personal." 
            },
            { 
                label: "Emprendedores y Startups", 
                emoji: "💡", 
                desc: "Landing pages optimizadas para lanzar y validar productos rápido." 
            },
            { 
                label: "Inmobiliarias y Propiedades", 
                emoji: "🏠", 
                desc: "Buscador de inmuebles, galería de fotos y filtros de precios." 
            },
            { 
                label: "Servicios Técnicos", 
                emoji: "🛠️", 
                desc: "Presupuestos en línea, listado de coberturas y botón de llamada." 
            }
        ],
        en: [
            { 
                label: "Barbershops & Salons", 
                emoji: "💈", 
                desc: "Online booking, digital calendar, and styling gallery." 
            },
            { 
                label: "Veterinary Clinics", 
                emoji: "🐾", 
                desc: "Patient profiles, appointment scheduling, and supplies store." 
            },
            { 
                label: "Gyms & Fitness", 
                emoji: "💪", 
                desc: "Class schedules, memberships, and member registration portal." 
            },
            { 
                label: "Clothing & Retail Stores", 
                emoji: "👕", 
                desc: "Interactive catalog, shopping cart, and integrated payments." 
            },
            { 
                label: "Restaurants & Cafes", 
                emoji: "🍔", 
                desc: "Digital QR menu, order via WhatsApp, and location maps." 
            },
            { 
                label: "Car Washes & Workshops", 
                emoji: "🚗", 
                desc: "Online slot booking, detailed services, and direct contact." 
            },
            { 
                label: "Professionals & Consultants", 
                emoji: "💼", 
                desc: "Service portfolio, scheduling tools, and personal branding." 
            },
            { 
                label: "Entrepreneurs & Startups", 
                emoji: "💡", 
                desc: "High-conversion landing pages to launch and validate fast." 
            },
            { 
                label: "Real Estate Agencies", 
                emoji: "🏠", 
                desc: "Property search engine, photo galleries, and price filters." 
            },
            { 
                label: "Technical Services", 
                emoji: "🛠️", 
                desc: "Online quotes, coverage areas list, and direct call buttons." 
            }
        ]
    };

    const activeList = businessTypes[language as "es" | "en"] || businessTypes.es;

    return (
        <section id="ideal-para" style={{ position: "relative", padding: "80px 24px", overflow: "hidden", background: "transparent" }}>
            {/* Background Glow */}
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
                {/* Header */}
                <div style={{ marginBottom: "48px" }}>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)", fontWeight: 900, color: theme.textMain }}
                    >
                        {language === 'es' ? "Ideal para negocios como:" : "Ideal for businesses like:"}
                    </motion.h2>
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 w-full mb-12 px-4 justify-center">
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
                                padding: "28px 20px",
                                borderRadius: "20px",
                                background: "rgba(13, 14, 24, 0.5)",
                                border: "1px solid rgba(255, 255, 255, 0.06)",
                                backdropFilter: "blur(12px)",
                                WebkitBackdropFilter: "blur(12px)",
                                transition: "all 0.3s cubic-bezier(0.22, 1, 0.36, 1)",
                                cursor: "default",
                                position: "relative",
                                overflow: "hidden"
                            }}
                        >
                            {/* Circle Emoji Icon with subtle cyber neon glow */}
                            <div 
                                className="emoji-container"
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    width: "64px",
                                    height: "64px",
                                    borderRadius: "50%",
                                    backgroundColor: "rgba(0, 217, 255, 0.04)",
                                    border: "1px solid rgba(0, 217, 255, 0.15)",
                                    fontSize: "28px",
                                    boxShadow: "inset 0 0 15px rgba(0, 217, 255, 0.05), 0 4px 12px rgba(0,0,0,0.5)",
                                    transition: "all 0.4s ease"
                                }}
                            >
                                {biz.emoji}
                            </div>

                            {/* Card text */}
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
                    .ideal-card {
                        transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1) !important;
                    }
                    .ideal-card:hover {
                        border-color: #00d9ff !important;
                        background: rgba(13, 14, 24, 0.85) !important;
                        box-shadow: 0 12px 35px rgba(0, 217, 255, 0.18), inset 0 0 20px rgba(0, 217, 255, 0.05) !important;
                    }
                    .ideal-card:hover .emoji-container {
                        transform: scale(1.1) rotate(6deg) !important;
                        background-color: rgba(0, 217, 255, 0.1) !important;
                        border-color: #00d9ff !important;
                        box-shadow: 0 0 20px rgba(0, 217, 255, 0.3) !important;
                    }
                `}} />

                {/* Footer Quote */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    style={{
                        maxWidth: "700px",
                        margin: "0 auto",
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
