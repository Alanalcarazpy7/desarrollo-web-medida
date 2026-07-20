"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { trackEvent } from "@/lib/analytics";
import { getWhatsAppLink } from "@/lib/whatsapp";

export default function Contacto() {
    const { t, language } = useLanguage();
    const [formData, setFormData] = useState({
        nombre: "",
        email: "",
        telefono: "",
        tipoProyecto: "",
        presupuesto: "",
        mensaje: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [validationError, setValidationError] = useState<string | null>(null);

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
        setValidationError(null);

        // Required field validation
        if (!formData.nombre.trim() || !formData.telefono.trim() || !formData.tipoProyecto || !formData.presupuesto || !formData.mensaje.trim()) {
            setValidationError(t('contact.form.validationError') || "Por favor, completa todos los campos obligatorios (*)");
            return;
        }

        setIsSubmitting(true);

        setTimeout(() => {
            trackEvent("submit_contact_form", {
                project_type: formData.tipoProyecto,
                budget: formData.presupuesto,
                lang: language
            });

            const whatsappMessage = language === 'en'
                ? `Hello, I want to inquire about a project for SolvaTech.

Name: ${formData.nombre.trim()}
Email: ${formData.email.trim() || 'Not specified'}
WhatsApp: ${formData.telefono.trim()}
Project Type: ${formData.tipoProyecto}
Budget: ${formData.presupuesto}
Details: ${formData.mensaje.trim()}`
                : `Hola, quiero consultar por un proyecto para SolvaTech.

Nombre: ${formData.nombre.trim()}
Email: ${formData.email.trim() || 'No especificado'}
WhatsApp: ${formData.telefono.trim()}
Tipo de proyecto: ${formData.tipoProyecto}
Presupuesto: ${formData.presupuesto}
Detalles: ${formData.mensaje.trim()}`;

            const whatsappUrl = getWhatsAppLink(whatsappMessage);
            window.open(whatsappUrl, "_blank");

            setIsSubmitting(false);
            setSubmitSuccess(true);
            setFormData({
                nombre: "",
                email: "",
                telefono: "",
                tipoProyecto: "",
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
            titulo: t('contact.methods.whatsapp.title'),
            descripcion: t('contact.methods.whatsapp.desc'),
            valor: "+595 994 295092",
            link: "https://wa.me/595994295092",
            onClick: () => trackEvent('click_whatsapp', { source: 'contact_card', lang: language })
        },
        {
            icon: (
                <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
            ),
            titulo: t('contact.methods.email.title'),
            descripcion: t('contact.methods.email.desc'),
            valor: "solvatech.dev@gmail.com",
            link: "mailto:solvatech.dev@gmail.com",
            onClick: () => trackEvent('click_email', { source: 'contact_card', lang: language })
        },
        {
            icon: (
                <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 9.75L12 3l9 6.75M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                </svg>
            ),
            titulo: t('contact.methods.instagram.title'),
            descripcion: t('contact.methods.instagram.desc'),
            valor: "@alandev_py",
            link: "https://www.instagram.com/alandev_py/",
            onClick: () => trackEvent('click_instagram', { source: 'contact_card', lang: language })
        },
    ];

    const budgetOptions = t('contact.form.budgetOptions') as string[] || [];
    const projectOptions = t('contact.form.projectOptions') as Array<{ value: string; label: string }> || [];

    return (
        <section
            id="contacto"
            className="relative overflow-hidden flex justify-center"
            style={{
                marginTop: '80px',
                scrollMarginTop: '100px'
            }}
        >
            <div className="section-tablet-pad w-full max-w-7xl px-6 md:px-8 relative z-10">
                {/* Encabezado */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16 md:mb-20"
                >
                    {/* Badge */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
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
                            {t('contact.badge')}
                        </span>
                    </motion.div>

                    {/* Título */}
                    <h2 className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 px-4" style={{ margin: '1rem 0' }}>
                        <span style={{ color: theme.text }}>{t('contact.titleStart')} </span>
                        <br className="md:hidden" />
                        <span
                            style={{
                                background: `linear-gradient(135deg, ${theme.accent}, #0099cc)`,
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                            }}
                        >
                            {t('contact.titleHighlight')}
                        </span>
                    </h2>

                    {/* Subtítulo */}
                    <div className="flex justify-center w-full px-6">
                        <p className="text-base md:text-xl text-slate-300 max-w-2xl leading-relaxed text-center" style={{ margin: '1rem 0' }}>
                            {t('contact.subtitle')}
                        </p>
                    </div>
                </motion.div>

                <div className="grid lg:grid-cols-3 gap-8 md:gap-12 items-stretch">
                    {/* Left Side - Contact Methods */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="lg:col-span-1"
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            height: '100%'
                        }}
                    >
                        {contactMethods.map((method, index) => (
                            <motion.a
                                key={method.titulo}
                                href={method.link}
                                onClick={method.onClick}
                                aria-label={`Contactar por ${method.titulo}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
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
                                    flex: 1,
                                    maxHeight: '160px',
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

                    {/* Right Side - Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="lg:col-span-2"
                    >
                        <form onSubmit={handleSubmit} style={{
                            padding: '24px',
                            borderRadius: '24px',
                            backgroundColor: 'rgba(10, 10, 10, 0.8)',
                            border: '1px solid rgba(255, 255, 255, 0.08)',
                            backdropFilter: 'blur(20px)',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '16px',
                            boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
                            justifyContent: 'center'
                        }}>
                            <div>
                                <h3 style={{ fontSize: '24px', fontWeight: 800, color: theme.text, marginBottom: '2px', letterSpacing: '-0.02em' }}>
                                    {t('contact.form.title')}
                                </h3>
                                <p style={{ color: theme.textMuted, fontSize: '13px' }}>{t('contact.form.subtitle')}</p>
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
                                    {t('contact.form.success')}
                                </motion.div>
                            )}

                            {validationError && (
                                <div style={{
                                    padding: '10px',
                                    borderRadius: '8px',
                                    backgroundColor: 'rgba(255, 50, 100, 0.1)',
                                    border: '1px solid rgba(255, 50, 100, 0.2)',
                                    color: '#ff3264',
                                    textAlign: 'center',
                                    fontWeight: 600,
                                    fontSize: '13px'
                                }}>
                                    {validationError}
                                </div>
                            )}

                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                    <label htmlFor="nombre" style={{ fontSize: '12px', fontWeight: 600, color: theme.textMuted, marginLeft: '4px' }}>{t('contact.form.name')}</label>
                                    <motion.input
                                        id="nombre"
                                        whileFocus={{ scale: 1.01, backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
                                        type="text"
                                        value={formData.nombre}
                                        onChange={(e) => { setValidationError(null); setFormData({ ...formData, nombre: e.target.value }); }}
                                        placeholder={t('contact.form.namePlaceholder')}
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
                                    <label htmlFor="email" style={{ fontSize: '12px', fontWeight: 600, color: theme.textMuted, marginLeft: '4px' }}>{t('contact.form.email')}</label>
                                    <motion.input
                                        id="email"
                                        whileFocus={{ scale: 1.01, backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        placeholder={t('contact.form.emailPlaceholder')}
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
                                    <label htmlFor="whatsapp-form" style={{ fontSize: '12px', fontWeight: 600, color: theme.textMuted, marginLeft: '4px' }}>{t('contact.form.whatsapp')}</label>
                                    <motion.input
                                        id="whatsapp-form"
                                        whileFocus={{ scale: 1.01, backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
                                        type="tel"
                                        value={formData.telefono}
                                        onChange={(e) => { setValidationError(null); setFormData({ ...formData, telefono: e.target.value }); }}
                                        placeholder={t('contact.form.whatsappPlaceholder') || "+595 9..."}
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
                                    <label htmlFor="projectType" style={{ fontSize: '12px', fontWeight: 600, color: theme.textMuted, marginLeft: '4px' }}>{t('contact.form.projectType')}</label>
                                    <div className="relative">
                                        <motion.select
                                            id="projectType"
                                            whileFocus={{ scale: 1.01, backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
                                            value={formData.tipoProyecto}
                                            onChange={(e) => { setValidationError(null); setFormData({ ...formData, tipoProyecto: e.target.value }); }}
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
                                            <option value="" style={{ backgroundColor: '#000', color: '#fff' }}>{t('contact.form.projectTypePlaceholder')}</option>
                                            {projectOptions.map((option) => (
                                                <option key={option.value} value={option.label} style={{ backgroundColor: '#000', color: '#fff' }}>{option.label}</option>
                                            ))}
                                        </motion.select>
                                        <div style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: theme.accent }}>
                                            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                    <label htmlFor="presupuesto" style={{ fontSize: '12px', fontWeight: 600, color: theme.textMuted, marginLeft: '4px' }}>{t('contact.form.budget')}</label>
                                    <div className="relative">
                                        <motion.select
                                            id="presupuesto"
                                            whileFocus={{ scale: 1.01, backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
                                            value={formData.presupuesto}
                                            onChange={(e) => { setValidationError(null); setFormData({ ...formData, presupuesto: e.target.value }); }}
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
                                            <option value="" style={{ backgroundColor: '#000', color: '#fff' }}>{t('contact.form.budgetPlaceholder')}</option>
                                            {budgetOptions.map((option) => (
                                                <option key={option} value={option} style={{ backgroundColor: '#000', color: '#fff' }}>{option}</option>
                                            ))}
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
                                <label htmlFor="detalles" style={{ fontSize: '12px', fontWeight: 600, color: theme.textMuted, marginLeft: '4px' }}>{t('contact.form.details')}</label>
                                <motion.textarea
                                    id="detalles"
                                    whileFocus={{ scale: 1.01, backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
                                    rows={6}
                                    value={formData.mensaje}
                                    onChange={(e) => { setValidationError(null); setFormData({ ...formData, mensaje: e.target.value }); }}
                                    placeholder={t('contact.form.detailsPlaceholder')}
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
                                    padding: '16px',
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
                                <span className="relative z-10">{isSubmitting ? t('contact.form.sending') : t('contact.form.submit')}</span>
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