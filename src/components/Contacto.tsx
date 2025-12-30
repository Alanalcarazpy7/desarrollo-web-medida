"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

export default function Contacto() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const [formData, setFormData] = useState({
        nombre: "",
        email: "",
        telefono: "",
        empresa: "",
        presupuesto: "",
        mensaje: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);

    const theme = {
        bg: "#000000",
        bgCard: "#0a0a0a",
        accent: "#00d9ff",
        accentGlow: "rgba(0, 217, 255, 0.5)",
        text: "#ffffff",
        textMuted: "#888888",
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        setTimeout(() => {
            const whatsappMessage = `
🌟 *Nuevo Cliente Potencial* 🌟

👤 *Nombre:* ${formData.nombre}
📧 *Email:* ${formData.email}
📱 *Teléfono:* ${formData.telefono}
🏢 *Empresa:* ${formData.empresa}
💰 *Presupuesto:* ${formData.presupuesto}

📝 *Mensaje:*
${formData.mensaje}
      `.trim();

            const whatsappUrl = `https://wa.me/595982880043?text=${encodeURIComponent(whatsappMessage)}`;
            window.open(whatsappUrl, "_blank");

            setIsSubmitting(false);
            setSubmitSuccess(true);
            setFormData({
                nombre: "",
                email: "",
                telefono: "",
                empresa: "",
                presupuesto: "",
                mensaje: "",
            });

            setTimeout(() => setSubmitSuccess(false), 5000);
        }, 1000);
    };

    const contactMethods = [
        {
            icon: (
                <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
            ),
            titulo: "WhatsApp",
            descripcion: "Respuesta inmediata",
            valor: "+595 982 880 043",
            link: "https://wa.me/595982880043",
        },
        {
            icon: (
                <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
            ),
            titulo: "Email",
            descripcion: "Escríbenos",
            valor: "alantechxpy@gmail.com",
            link: "mailto:alantechxpy@gmail.com",
        },
        {
            icon: (
                <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 9.75L12 3l9 6.75M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                </svg>
            ),
            titulo: "Instagram",
            descripcion: "Síguenos",
            valor: "@alandev_py",
            link: "https://www.instagram.com/alandev_py/",
        },
    ];

    return (
        <section
            id="contacto"
            ref={ref}
            className="relative overflow-hidden flex justify-center"
            style={{
                marginTop: '140px',
                scrollMarginTop: '100px'
            }}
        >

            <div className="w-full max-w-7xl px-6 md:px-8 relative z-10">
                {/* Encabezado */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16 md:mb-20"
                >
                    {/* Badge */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ duration: 0.6, type: "spring" }}
                        className="inline-flex items-center gap-3 px-6 py-3 mb-8 rounded-full cursor-default"
                        style={{
                            background: `rgba(10, 10, 10, 0.8)`,
                            border: `1px solid ${theme.accent}30`,
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
                            Hablemos de Tu Proyecto
                        </span>
                    </motion.div>

                    {/* Título */}
                    <h2 className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 px-4" style={{ margin: '1rem 0' }}>
                        <span style={{ color: theme.text }}>¿Listo para </span>
                        <br className="md:hidden" />
                        <span
                            style={{
                                background: `linear-gradient(135deg, ${theme.accent}, #0099cc)`,
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                            }}
                        >
                            Empezar?
                        </span>
                    </h2>

                    {/* Subtítulo */}
                    <div className="flex justify-center w-full px-6">
                        <p className="text-base md:text-xl text-slate-400 max-w-2xl leading-relaxed text-center opacity-80" style={{ margin: '1rem 0' }}>
                            Conversemos sobre cómo podemos llevar tu negocio al siguiente nivel digital
                        </p>
                    </div>
                </motion.div>

                <div className="grid lg:grid-cols-3 gap-8 md:gap-12 items-stretch">
                    {/* Left Side - Contact Methods (1 col) - Balanced Height */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="lg:col-span-1"
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between', // Distribución de botones
                            height: '100%'
                        }}
                    >
                        {contactMethods.map((method, index) => (
                            <motion.a
                                key={method.titulo}
                                href={method.link}
                                aria-label={`Contactar por ${method.titulo}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                initial={{ opacity: 0, x: -30 }}
                                animate={isInView ? { opacity: 1, x: 0 } : {}}
                                transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                                whileHover={{ x: 5, scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '16px',
                                    padding: '24px',
                                    borderRadius: '20px',
                                    backgroundColor: 'rgba(20, 20, 20, 0.6)',
                                    border: '1px solid rgba(255, 255, 255, 0.15)',
                                    boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
                                    textDecoration: 'none',
                                    cursor: 'pointer',
                                    position: 'relative',
                                    overflow: 'hidden',
                                    flex: 1, // Permitir que los elementos crezcan si es necesario
                                    maxHeight: '160px', // Evitar estiramiento excesivo
                                    marginBottom: index !== contactMethods.length - 1 ? '24px' : '0'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.borderColor = theme.accent;
                                    e.currentTarget.style.backgroundColor = 'rgba(0, 217, 255, 0.08)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)';
                                    e.currentTarget.style.backgroundColor = 'rgba(20, 20, 20, 0.6)';
                                }}
                            >
                                <div style={{
                                    width: '48px',
                                    height: '48px',
                                    borderRadius: '12px',
                                    backgroundColor: 'rgba(0, 217, 255, 0.1)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: theme.accent,
                                    flexShrink: 0
                                }}>
                                    {method.icon}
                                </div>
                                <div>
                                    <p style={{ fontSize: '12px', color: theme.textMuted, marginBottom: '2px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{method.descripcion}</p>
                                    <h3 style={{ fontSize: '16px', fontWeight: 700, color: theme.text, marginBottom: '2px' }}>{method.titulo}</h3>
                                    <p style={{ fontSize: '13px', color: theme.accent, fontWeight: 500 }}>{method.valor}</p>
                                </div>
                            </motion.a>
                        ))}
                    </motion.div>

                    {/* Right Side - Contact Form (2 cols) - Compacted */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="lg:col-span-2"
                    >
                        <form onSubmit={handleSubmit} style={{
                            padding: '24px', // Padding reducido
                            borderRadius: '24px', // Radio de borde reducido
                            backgroundColor: 'rgba(10, 10, 10, 0.8)',
                            border: '1px solid rgba(255, 255, 255, 0.08)',
                            backdropFilter: 'blur(20px)',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '16px', // Espaciado ajustado
                            boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
                            justifyContent: 'center'
                        }}>
                            <div style={{ marginBottom: '0px' }}>
                                <h3 style={{ fontSize: '24px', fontWeight: 800, color: theme.text, marginBottom: '2px', letterSpacing: '-0.02em' }}>
                                    Cuéntanos tu Visión
                                </h3>
                                <p style={{ color: theme.textMuted, fontSize: '13px' }}>Completa el formulario y te responderemos en breve.</p>
                            </div>

                            {submitSuccess && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    style={{
                                        padding: '10px',
                                        borderRadius: '8px',
                                        backgroundColor: 'rgba(0, 255, 128, 0.1)',
                                        border: '1px solid rgba(0, 255, 128, 0.2)',
                                        color: '#00ff80',
                                        textAlign: 'center',
                                        fontWeight: 600,
                                        fontSize: '13px'
                                    }}>
                                    ✅ ¡Mensaje enviado!
                                </motion.div>
                            )}

                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                    <label htmlFor="nombre" style={{ fontSize: '12px', fontWeight: 600, color: theme.textMuted, marginLeft: '4px' }}>NOMBRE</label>
                                    <motion.input
                                        id="nombre"
                                        whileFocus={{ scale: 1.01, backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
                                        type="text"
                                        required
                                        value={formData.nombre}
                                        onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                                        placeholder="Tu nombre completo"
                                        style={{
                                            width: '100%',
                                            padding: '12px 16px', // Padding menor
                                            borderRadius: '10px',
                                            backgroundColor: 'rgba(255, 255, 255, 0.03)',
                                            border: '1px solid rgba(255, 255, 255, 0.1)',
                                            color: theme.text,
                                            outline: 'none',
                                            transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
                                            fontSize: '14px'
                                        }}
                                        onFocus={(e) => { e.target.style.borderColor = theme.accent; e.target.style.boxShadow = `0 0 0 2px ${theme.accent}15`; }}
                                        onBlur={(e) => { e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)'; e.target.style.boxShadow = 'none'; }}
                                    />
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                    <label htmlFor="email" style={{ fontSize: '12px', fontWeight: 600, color: theme.textMuted, marginLeft: '4px' }}>EMAIL</label>
                                    <motion.input
                                        id="email"
                                        whileFocus={{ scale: 1.01, backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
                                        type="email"
                                        required
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        placeholder="tu@email.com"
                                        style={{
                                            width: '100%',
                                            padding: '12px 16px',
                                            borderRadius: '10px',
                                            backgroundColor: 'rgba(255, 255, 255, 0.03)',
                                            border: '1px solid rgba(255, 255, 255, 0.1)',
                                            color: theme.text,
                                            outline: 'none',
                                            transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
                                            fontSize: '14px'
                                        }}
                                        onFocus={(e) => { e.target.style.borderColor = theme.accent; e.target.style.boxShadow = `0 0 0 2px ${theme.accent}15`; }}
                                        onBlur={(e) => { e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)'; e.target.style.boxShadow = 'none'; }}
                                    />
                                </div>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                    <label htmlFor="whatsapp-form" style={{ fontSize: '12px', fontWeight: 600, color: theme.textMuted, marginLeft: '4px' }}>WHATSAPP</label>
                                    <motion.input
                                        id="whatsapp-form"
                                        whileFocus={{ scale: 1.01, backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
                                        type="tel"
                                        value={formData.telefono}
                                        onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                                        placeholder="+595 9..."
                                        style={{
                                            width: '100%',
                                            padding: '12px 16px',
                                            borderRadius: '10px',
                                            backgroundColor: 'rgba(255, 255, 255, 0.03)',
                                            border: '1px solid rgba(255, 255, 255, 0.1)',
                                            color: theme.text,
                                            outline: 'none',
                                            transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
                                            fontSize: '14px'
                                        }}
                                        onFocus={(e) => { e.target.style.borderColor = theme.accent; e.target.style.boxShadow = `0 0 0 2px ${theme.accent}15`; }}
                                        onBlur={(e) => { e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)'; e.target.style.boxShadow = 'none'; }}
                                    />
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                    <label htmlFor="presupuesto" style={{ fontSize: '12px', fontWeight: 600, color: theme.textMuted, marginLeft: '4px' }}>PRESUPUESTO</label>
                                    <div className="relative">
                                        <motion.select
                                            id="presupuesto"
                                            whileFocus={{ scale: 1.01, backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
                                            value={formData.presupuesto}
                                            onChange={(e) => setFormData({ ...formData, presupuesto: e.target.value })}
                                            style={{
                                                width: '100%',
                                                padding: '12px 16px',
                                                borderRadius: '10px',
                                                backgroundColor: 'rgba(255, 255, 255, 0.03)',
                                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                                color: theme.text,
                                                outline: 'none',
                                                transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
                                                cursor: 'pointer',
                                                appearance: 'none',
                                                fontSize: '14px'
                                            }}
                                            onFocus={(e) => { e.target.style.borderColor = theme.accent; e.target.style.boxShadow = `0 0 0 2px ${theme.accent}15`; }}
                                            onBlur={(e) => { e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)'; e.target.style.boxShadow = 'none'; }}
                                        >
                                            <option value="" style={{ backgroundColor: '#000', color: '#fff' }}>Seleccionar rango...</option>
                                            <option value="Menos de 1.000.000 Gs" style={{ backgroundColor: '#000', color: '#fff' }}>Menos de 1.000.000 Gs</option>
                                            <option value="1.000.000 Gs - 3.000.000 Gs" style={{ backgroundColor: '#000', color: '#fff' }}>1.000.000 Gs - 3.000.000 Gs</option>
                                            <option value="3.000.000 Gs - 5.000.000 Gs" style={{ backgroundColor: '#000', color: '#fff' }}>3.000.000 Gs - 5.000.000 Gs</option>
                                            <option value="Más de 5.000.000 Gs" style={{ backgroundColor: '#000', color: '#fff' }}>Más de 5.000.000 Gs</option>
                                        </motion.select>
                                        <div style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: theme.accent }}>
                                            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                <label htmlFor="detalles" style={{ fontSize: '12px', fontWeight: 600, color: theme.textMuted, marginLeft: '4px' }}>DETALLES</label>
                                <motion.textarea
                                    id="detalles"
                                    whileFocus={{ scale: 1.01, backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
                                    required
                                    rows={6}
                                    value={formData.mensaje}
                                    onChange={(e) => setFormData({ ...formData, mensaje: e.target.value })}
                                    placeholder="Descríbenos brevemente el sistema, aplicación o sitio web que tienes en mente..."
                                    style={{
                                        width: '100%',
                                        padding: '12px 16px',
                                        borderRadius: '10px',
                                        backgroundColor: 'rgba(255, 255, 255, 0.03)',
                                        border: '1px solid rgba(255, 255, 255, 0.1)',
                                        color: theme.text,
                                        outline: 'none',
                                        transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
                                        resize: 'none',
                                        fontSize: '14px',
                                        lineHeight: 1.5
                                    }}
                                    onFocus={(e) => { e.target.style.borderColor = theme.accent; e.target.style.boxShadow = `0 0 0 2px ${theme.accent}15`; }}
                                    onBlur={(e) => { e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)'; e.target.style.boxShadow = 'none'; }}
                                />
                            </div>

                            <motion.button
                                type="submit"
                                disabled={isSubmitting}
                                whileHover={{ scale: 1.02, boxShadow: `0 0 40px ${theme.accent}60` }}
                                whileTap={{ scale: 0.98 }}
                                style={{
                                    width: '100%',
                                    padding: '16px', // Botón más compacto
                                    borderRadius: '12px',
                                    background: `linear-gradient(135deg, ${theme.accent}, #0099ff)`,
                                    color: '#000',
                                    fontWeight: 900,
                                    fontSize: '15px',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.1em',
                                    border: 'none',
                                    boxShadow: `0 0 30px ${theme.accentGlow}`,
                                    cursor: 'pointer',
                                    marginTop: '4px',
                                    position: 'relative',
                                    overflow: 'hidden'
                                }}
                            >
                                <span className="relative z-10">{isSubmitting ? "..." : "Enviar"}</span>
                                <motion.div
                                    style={{
                                        position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                                        background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
                                    }}
                                    animate={{ x: ['-100%', '200%'] }}
                                    transition={{ duration: 2, repeat: Infinity, ease: 'linear', repeatDelay: 1 }}
                                />
                            </motion.button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}