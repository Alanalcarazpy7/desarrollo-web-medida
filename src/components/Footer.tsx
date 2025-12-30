"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function Footer() {
    const currentYear = 2026;

    const theme = {
        bg: "#050505",
        accent: "#00d9ff",
        text: "#ffffff",
        textMuted: "#888888",
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

    const sections = {
        servicios: [
            { label: "Desarrollo Web", href: "#servicios" },
            { label: "E-commerce", href: "#servicios" },
            { label: "Aplicaciones Web", href: "#servicios" },
            { label: "Diseño UI/UX", href: "#servicios" },
        ],
        empresa: [
            { label: "Sobre Nosotros", href: "#inicio" },
            { label: "Proyectos", href: "#proyectos" },
            { label: "Proceso", href: "#proceso" },
            { label: "Contacto", href: "#contacto" },
        ],
        legal: [
            { label: "Términos", href: "#" },
            { label: "Privacidad", href: "#" },
            { label: "Cookies", href: "#" },
        ],
    };

    const listStyle = {
        display: 'flex',
        flexDirection: 'column' as const,
        gap: '12px',
    };

    const linkStyle = {
        color: theme.textMuted,
        fontSize: '14px',
        textDecoration: 'none',
        transition: 'color 0.2s ease',
        cursor: 'pointer',
    };

    return (
        <footer style={{
            // backgroundColor: theme.bg, -> Removed
            borderTop: '1px solid rgba(255, 255, 255, 0.15)',
            boxShadow: '0 -10px 40px rgba(0, 0, 0, 0.5)',
            position: 'relative',
            paddingTop: '80px',
            paddingBottom: '40px',
            overflow: 'hidden',
            marginTop: '100px' // Margen para separar de Contacto
        }}>

            {/* Resplandor de fondo */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '600px',
                height: '600px',
                background: `radial-gradient(circle, ${theme.accent}15, transparent 70%)`,
                pointerEvents: 'none'
            }} />

            <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 10 }}>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : '1.5fr 1fr 1fr',
                    gap: isMobile ? '40px 20px' : '60px',
                    marginBottom: '64px',
                    textAlign: isMobile ? 'center' : 'left'
                }}>

                    <div style={{
                        gridColumn: isMobile ? 'span 2' : 'auto',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: isMobile ? 'center' : 'flex-start'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
                            <div className="relative" style={{ width: '48px', height: '48px' }}>
                                {/* Anillos orbitales estáticos para el footer */}
                                <div
                                    className="absolute inset-0 rounded-full border"
                                    style={{ borderColor: `${theme.accent}30`, borderRadius: '50%' }}
                                />
                                <div
                                    className="absolute inset-0 rounded-full border"
                                    style={{ borderColor: `${theme.accent}20`, transform: "rotate(60deg)", borderRadius: '50%' }}
                                />

                                {/* Core del logo */}
                                <div
                                    className="relative w-full h-full rounded-xl flex items-center justify-center overflow-hidden"
                                    style={{
                                        background: `linear-gradient(135deg, #0a0a0a, #111111)`,
                                        border: `1px solid ${theme.accent}40`,
                                        boxShadow: `0 0 20px rgba(0, 217, 255, 0.3), inset 0 0 10px ${theme.accent}10`,
                                        borderRadius: '12px'
                                    }}
                                >
                                    <span
                                        className="relative z-10 text-xl font-black tracking-wider"
                                        style={{
                                            color: theme.accent,
                                            textShadow: `0 0 10px rgba(0, 217, 255, 0.5)`,
                                        }}
                                    >
                                        A
                                    </span>
                                </div>
                            </div>

                            <div className="flex flex-col items-start">
                                <div className="flex items-baseline gap-1">
                                    <span
                                        className="text-2xl font-black tracking-[0.15em] uppercase"
                                        style={{ color: theme.text }}
                                    >
                                        ALAN
                                    </span>
                                    <span
                                        className="text-2xl font-light tracking-[0.15em] uppercase"
                                        style={{ color: theme.textMuted }}
                                    >
                                        DEV
                                    </span>
                                </div>
                                <div
                                    className="h-px mt-1"
                                    style={{
                                        background: `linear-gradient(90deg, ${theme.accent}, transparent)`,
                                        width: "100%"
                                    }}
                                />
                            </div>
                        </div>
                        <p style={{ color: theme.textMuted, lineHeight: 1.6, maxWidth: '400px', fontSize: '15px' }}>
                            Creando el futuro digital con soluciones web premium, diseño de vanguardia y tecnología de alto rendimiento.
                        </p>
                    </div>

                    {/* Enlaces */}
                    <div className="flex flex-col items-center lg:items-start">
                        <h4 style={{ color: theme.text, fontWeight: 700, marginBottom: '20px' }}>Servicios</h4>
                        <div style={listStyle}>
                            {sections.servicios.map((item) => (
                                <a key={item.label} href={item.href} style={linkStyle} className="footer-link">
                                    {item.label}
                                </a>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col items-center lg:items-start">
                        <h4 style={{ color: theme.text, fontWeight: 700, marginBottom: '20px' }}>Empresa</h4>
                        <div style={listStyle}>
                            {sections.empresa.map((item) => (
                                <a key={item.label} href={item.href} style={linkStyle} className="footer-link">
                                    {item.label}
                                </a>
                            ))}
                        </div>
                    </div>


                </div>

                <div style={{
                    borderTop: '1px solid rgba(255, 255, 255, 0.15)',
                    paddingTop: '32px',
                    display: 'flex',
                    flexDirection: isMobile ? 'column' : 'row',
                    gap: '24px',
                    alignItems: 'center',
                    justifyContent: isMobile ? 'center' : 'space-between',
                }}>
                    <p style={{ color: theme.textMuted, fontSize: '14px', margin: 0 }}>
                        © {currentYear} AlanDev. Todos los derechos reservados.
                    </p>

                    <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
                        {sections.legal.map((item) => (
                            <a
                                key={item.label}
                                href={item.href}
                                style={{
                                    color: theme.textMuted,
                                    fontSize: '14px',
                                    textDecoration: 'none',
                                    transition: 'color 0.2s ease',
                                    cursor: 'pointer'
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.color = theme.accent}
                                onMouseLeave={(e) => e.currentTarget.style.color = theme.textMuted}
                            >
                                {item.label}
                            </a>
                        ))}
                    </div>
                </div>
            </div>

            <style jsx global>{`
                .footer-link:hover {
                    color: ${theme.accent} !important;
                    padding-left: 4px;
                }
            `}</style>
        </footer>
    );
}