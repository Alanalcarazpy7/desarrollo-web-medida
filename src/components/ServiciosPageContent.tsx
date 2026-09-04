"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { getWhatsAppLink, whatsappMessages } from "@/lib/whatsapp";

const SnowEffect = dynamic(() => import("@/components/SnowEffect"), { 
    ssr: false,
    loading: () => null
});

import { trackEvent } from "@/lib/analytics";

const Navbar = dynamic(() => import("@/components/Navbar"));
const Footer = dynamic(() => import("@/components/Footer"), { ssr: true });

interface ServiceItem {
    id: string;
    title: string;
    subtitle: string;
    price: string;
    priceSub: string;
    benefits: string[];
    whatsappKey: string;
    link: string;
    icon: string;
    image: string;
    category: string;
    categoryEn: string;
    delivery: string;
    type: string;
}

interface ServiciosPageContentProps {
    lang: string;
}

export default function ServiciosPageContent({ lang }: ServiciosPageContentProps) {
    const isEs = lang === 'es';
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);

    const theme = {
        accent: "#00d9ff",
        accentDark: "#0099cc",
        text: "#ffffff",
        textMuted: "#888888",
    };

    const mainServices: ServiceItem[] = useMemo(() => [
        {
            id: "promo_lanzamiento",
            title: isEs ? "Promo Lanzamiento" : "Launch Promo",
            subtitle: isEs ? "Ideal para empezar online" : "Ideal to start online",
            price: isEs ? "Gs. 850.000" : "Gs. 850,000",
            priceSub: isEs ? "Precio regular Gs. 950.000" : "Regular price Gs. 950,000",
            benefits: isEs 
                ? ["Diseño responsive", "Botón directo a WhatsApp", "Sección de contacto"]
                : ["Responsive design", "Direct WhatsApp button", "Contact section"],
            whatsappKey: "promo",
            link: `/${lang}/servicios/desarrollo-web-lanzamiento`,
            icon: "🚀",
            image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80",
            category: "Desarrollo Web",
            categoryEn: "Web Development",
            delivery: isEs ? "Entrega en 3-5 días" : "3-5 days delivery",
            type: isEs ? "PAGO ÚNICO" : "ONE-TIME"
        },
        {
            id: "web_basica",
            title: isEs ? "Web Básica" : "Basic Website",
            subtitle: isEs ? "Para presencia online directa" : "For quick online presence",
            price: isEs ? "Gs. 750.000" : "Gs. 750,000",
            priceSub: isEs ? "Pago único" : "One-time payment",
            benefits: isEs 
                ? ["Diseño profesional", "Adaptado a celulares", "Contacto y ubicación"]
                : ["Professional design", "Mobile friendly", "Contact and location"],
            whatsappKey: "basica",
            link: `/${lang}/servicios/desarrollo-web-basica`,
            icon: "📱",
            image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80",
            category: "Desarrollo Web",
            categoryEn: "Web Development",
            delivery: isEs ? "Entrega en 5-7 días" : "5-7 days delivery",
            type: isEs ? "PAGO ÚNICO" : "ONE-TIME"
        },
        {
            id: "catalogo_digital",
            title: isEs ? "Catálogo / Menú" : "Digital Catalog / Menu",
            subtitle: isEs ? "Productos o servicios online" : "Online products & services",
            price: isEs ? "Desde Gs. 650.000" : "From Gs. 650,000",
            priceSub: isEs ? "Regular desde Gs. 750.000" : "Regular from Gs. 750,000",
            benefits: isEs 
                ? ["Categorías y fotos", "Botón de pedido a WhatsApp", "Ideal para tiendas y comidas"]
                : ["Categories & photos", "WhatsApp order button", "Ideal for shops & restaurants"],
            whatsappKey: "catalogo",
            link: `/${lang}/servicios/desarrollo-web-catalogo`,
            icon: "📋",
            image: "https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?auto=format&fit=crop&w=600&q=80",
            category: "Desarrollo Web",
            categoryEn: "Web Development",
            delivery: isEs ? "Entrega en 5-7 días" : "5-7 days delivery",
            type: isEs ? "PAGO ÚNICO" : "ONE-TIME"
        },
        {
            id: "web_estandar",
            title: isEs ? "Web Estándar" : "Standard Website",
            subtitle: isEs ? "Diseño completo de marca" : "Complete brand website",
            price: isEs ? "Gs. 1.250.000" : "Gs. 1,250,000",
            priceSub: isEs ? "Pago único" : "One-time payment",
            benefits: isEs 
                ? ["Varias secciones principales", "Inicio, nosotros, servicios", "Optimización responsive"]
                : ["Several main sections", "Home, about, services", "Mobile optimization"],
            whatsappKey: "estandar",
            link: `/${lang}/servicios/desarrollo-web-estandar`,
            icon: "💻",
            image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=600&q=80",
            category: "Desarrollo Web",
            categoryEn: "Web Development",
            delivery: isEs ? "Entrega en 7-10 días" : "7-10 days delivery",
            type: isEs ? "PAGO ÚNICO" : "ONE-TIME"
        },
        {
            id: "web_pro",
            title: isEs ? "Web Pro" : "Web Pro",
            subtitle: isEs ? "Empresas en crecimiento" : "Growing enterprises",
            price: isEs ? "Desde Gs. 3.550.000" : "From Gs. 3,550,000",
            priceSub: isEs ? "Pago único o desde ese monto" : "One-time or starting from",
            benefits: isEs 
                ? ["Diseño 100% personalizado", "Más páginas internas", "Estructura profesional"]
                : ["100% custom design", "More internal pages", "Professional structure"],
            whatsappKey: "pro",
            link: `/${lang}/servicios/desarrollo-web-pro`,
            icon: "💎",
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80",
            category: "Desarrollo Web",
            categoryEn: "Web Development",
            delivery: isEs ? "Entrega en 10-15 días" : "10-15 days delivery",
            type: isEs ? "PAGO ÚNICO" : "ONE-TIME"
        },
        {
            id: "sistemas_medida",
            title: isEs ? "Sistemas a Medida" : "Custom Systems",
            subtitle: isEs ? "Automatización y gestión" : "Automation & management",
            price: isEs ? "Desde Gs. 5.900.000" : "From Gs. 5,900,000",
            priceSub: isEs ? "Presupuesto según alcance" : "Budget based on scope",
            benefits: isEs 
                ? ["Funcionalidades a medida", "Panel administrativo", "Gestión de pedidos/reservas"]
                : ["Custom features", "Admin control panel", "Order/booking management"],
            whatsappKey: "sistema",
            link: `/${lang}/servicios/sistemas-informaticos-paraguay`,
            icon: "⚙️",
            image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80",
            category: "Sistemas",
            categoryEn: "Systems",
            delivery: isEs ? "Según requerimiento" : "Based on requirements",
            type: isEs ? "PAGO ÚNICO" : "ONE-TIME"
        },
        {
            id: "posicionamiento_google",
            title: isEs ? "Google & Maps SEO" : "Google & Maps SEO",
            subtitle: isEs ? "Visibilidad en búsquedas" : "Search engine visibility",
            price: isEs ? "Gs. 275.000 / mes" : "Gs. 275,000 / month",
            priceSub: isEs ? "Pago mensual" : "Monthly payment",
            benefits: isEs 
                ? ["Optimización de perfil local", "Presencia en Google y Maps", "Mejor visibilidad SEO"]
                : ["Local profile optimization", "Presence on Google & Maps", "Better SEO visibility"],
            whatsappKey: "seo",
            link: `/${lang}/servicios/posicionamiento-google`,
            icon: "📈",
            image: "https://images.unsplash.com/photo-1562577309-4932fdd64cd1?auto=format&fit=crop&w=600&q=80",
            category: "SEO & Marketing",
            categoryEn: "SEO & Marketing",
            delivery: isEs ? "Resultados continuos" : "Continuous results",
            type: isEs ? "PLAN MENSUAL" : "MONTHLY PLAN"
        },
        {
            id: "hosting_web_administrado",
            title: isEs ? "Hosting Web Administrado" : "Managed Web Hosting",
            subtitle: isEs ? "Servidor rápido y sin preocupaciones" : "Fast, worry-free server",
            price: isEs ? "Gs. 120.000 / mes" : "Gs. 120,000 / month",
            priceSub: isEs ? "Suscripción mensual" : "Monthly subscription",
            benefits: isEs
                ? ["Servidor SSD rápido y estable", "SSL y backups incluidos", "Monitoreo y soporte técnico"]
                : ["Fast, stable SSD server", "SSL and backups included", "Monitoring & technical support"],
            whatsappKey: "hostingAdministrado",
            link: `/${lang}/servicios/hosting-web-administrado`,
            icon: "🖥️",
            image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=600&q=80",
            category: "Hosting & Soporte",
            categoryEn: "Hosting & Support",
            delivery: isEs ? "Activación en 24hs" : "24h activation",
            type: isEs ? "PLAN MENSUAL" : "MONTHLY PLAN"
        },
        {
            id: "dominio_configuracion_web",
            title: isEs ? "Dominio + Configuración Web" : "Domain + Web Setup",
            subtitle: isEs ? "Tu dirección profesional" : "Your professional address",
            price: isEs ? "Gs. 250.000 / año" : "Gs. 250,000 / year",
            priceSub: isEs ? "Renovación anual" : "Annual renewal",
            benefits: isEs
                ? ["Dominio personalizado", "Configuración de DNS y correos", "Web lista y funcionando"]
                : ["Custom domain name", "DNS & email setup", "Website ready and working"],
            whatsappKey: "dominioConfiguracion",
            link: `/${lang}/servicios/dominio-configuracion-web`,
            icon: "🌐",
            image: "https://images.unsplash.com/photo-1564760290292-23341e4df6ec?auto=format&fit=crop&w=600&q=80",
            category: "Hosting & Soporte",
            categoryEn: "Hosting & Support",
            delivery: isEs ? "Activación en 24hs" : "24h activation",
            type: isEs ? "PLAN ANUAL" : "ANNUAL PLAN"
        },
        {
            id: "soporte_web_basico",
            title: isEs ? "Soporte Web Básico" : "Basic Web Support",
            subtitle: isEs ? "Actualizaciones del sitio" : "Website updates",
            price: isEs ? "Gs. 45.000 / mes" : "Gs. 45,000 / month",
            priceSub: isEs ? "Soporte mensual básico" : "Basic monthly support",
            benefits: isEs 
                ? ["Cambios simples de contenido", "Ajustes menores de diseño", "Soporte rápido"]
                : ["Simple content edits", "Minor layout adjustments", "Quick support response"],
            whatsappKey: "soporte",
            link: `/${lang}/servicios/soporte-web-basico`,
            icon: "🔧",
            image: "https://images.unsplash.com/photo-1600132806608-231446b2e7af?auto=format&fit=crop&w=600&q=80",
            category: "Hosting & Soporte",
            categoryEn: "Hosting & Support",
            delivery: isEs ? "Respuesta <48 horas" : "Response <48 hours",
            type: isEs ? "PLAN MENSUAL" : "MONTHLY PLAN"
        }
    ], [isEs, lang]);

    // Unique Categories
    const categories = useMemo(() => {
        const cats = new Set(mainServices.map(s => isEs ? s.category : s.categoryEn));
        return ['all', ...Array.from(cats)];
    }, [mainServices, isEs]);

    // Filtered Services
    const filteredServices = useMemo(() => {
        return mainServices.filter(service => {
            const matchesSearch = searchTerm === "" || 
                service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                service.subtitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (isEs ? service.category : service.categoryEn).toLowerCase().includes(searchTerm.toLowerCase());
            
            const matchesCategory = selectedCategory === "all" || 
                (isEs ? service.category : service.categoryEn) === selectedCategory;

            return matchesSearch && matchesCategory;
        });
    }, [mainServices, searchTerm, selectedCategory, isEs]);

    const chooseReasons = useMemo(() => [
        {
            title: isEs ? "Experiencia Comercial" : "Business Focus",
            desc: isEs 
                ? "Diseñamos pensando en tus ventas. Integra botones directos a WhatsApp para captar clientes al instante."
                : "We design with sales in mind. We integrate direct WhatsApp buttons to capture clients instantly."
        },
        {
            title: isEs ? "Rendimiento y SEO" : "Performance & SEO",
            desc: isEs 
                ? "Sitios rápidos, optimizados para dispositivos móviles y estructurados para posicionarse en Google."
                : "Fast websites, optimized for mobile devices and structured to rank high in Google search."
        },
        {
            title: isEs ? "Soporte Continuo" : "Ongoing Support",
            desc: isEs 
                ? "Estamos para ayudarte a mantener tu sitio funcionando sin problemas con planes de soporte accesibles."
                : "We are here to help you keep your site running smoothly with affordable support plans."
        }
    ], [isEs]);

    const generalCtaMsg = whatsappMessages[lang as "es" | "en"]?.general || whatsappMessages.es.general;
    const generalCtaLink = getWhatsAppLink(generalCtaMsg);

    return (
        <main style={{ minHeight: "100vh", backgroundColor: "#000", color: "#fff", position: "relative", overflowX: "hidden", display: "flex", flexDirection: "column" }}>
            <Navbar />
            
            {/* Snow Effect - Background Layer */}
            <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
                <SnowEffect />
            </div>

            {/* Background Particles layer */}
            <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1 }}>
                {/* Visual mesh glows similar to Blog page */}
                <motion.div 
                    style={{ 
                        position: 'absolute',
                        top: 0,
                        left: '20%',
                        width: '500px',
                        height: '500px',
                        borderRadius: '50%',
                        opacity: 0.25,
                        filter: 'blur(130px)',
                        background: `radial-gradient(circle, ${theme.accent}, transparent 70%)`
                    }}
                    animate={{
                        scale: [1, 1.15, 1],
                        opacity: [0.15, 0.25, 0.15],
                    }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div 
                    style={{ 
                        position: 'absolute',
                        bottom: '20%',
                        right: '15%',
                        width: '600px',
                        height: '600px',
                        borderRadius: '50%',
                        opacity: 0.15,
                        filter: 'blur(150px)',
                        background: 'radial-gradient(circle, #6366f1, transparent 70%)'
                    }}
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.1, 0.2, 0.1],
                    }}
                    transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                />
            </div>

            {/* Content Wrapper */}
            <div style={{ position: "relative", zIndex: 10, flexGrow: 1 }}>
                
                {/* Banner superior */}
                <section style={{ position: "relative", width: "100%", maxWidth: "1200px", margin: "0 auto", padding: "160px 24px 40px", textAlign: "center" }}>
                    <motion.h1 
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        style={{ 
                            fontSize: "clamp(2rem, 5vw, 3.8rem)", 
                            fontWeight: 900, 
                            lineHeight: 1.1, 
                            background: `linear-gradient(135deg, ${theme.accent}, ${theme.accentDark})`, 
                            WebkitBackgroundClip: "text", 
                            WebkitTextFillColor: "transparent",
                            margin: 0
                        }}
                    >
                        {isEs ? "Servicios Digitales" : "Digital Services"}
                    </motion.h1>
                    <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        style={{ fontSize: "clamp(14px, 2vw, 16px)", maxWidth: "700px", margin: "16px auto 0", color: "#999", lineHeight: 1.6 }}
                    >
                        {isEs 
                            ? "Creamos páginas web, catálogos digitales, sistemas simples y soluciones online para tu negocio."
                            : "We build websites, digital catalogs, simple management software, and online solutions for your business."}
                    </motion.p>
                </section>

                {/* Search & Filter Section */}
                <section style={{ position: 'relative', paddingBottom: '30px' }}>
                    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
                        <motion.div
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '20px' }}
                        >
                            {/* Search Input */}
                            <div style={{ position: 'relative', width: '100%', maxWidth: '600px', margin: '0 auto' }}>
                                <svg 
                                    style={{
                                        position: 'absolute',
                                        left: '20px',
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                        width: '20px',
                                        height: '20px',
                                        color: '#666',
                                        pointerEvents: 'none'
                                    }}
                                    fill="none" 
                                    viewBox="0 0 24 24" 
                                    stroke="currentColor"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                                <input
                                    type="text"
                                    placeholder={isEs ? 'Buscar servicios...' : 'Search services...'}
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    style={{
                                        width: '100%',
                                        padding: '16px 20px 16px 56px',
                                        borderRadius: '9999px',
                                        backgroundColor: 'rgba(255, 255, 255, 0.05)',
                                        border: '1px solid rgba(255, 255, 255, 0.1)',
                                        color: '#fff',
                                        fontSize: '16px',
                                        outline: 'none',
                                        transition: 'all 0.3s'
                                    }}
                                    onFocus={(e) => {
                                        e.target.style.borderColor = 'rgba(0, 217, 255, 0.5)';
                                        e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.08)';
                                    }}
                                    onBlur={(e) => {
                                        e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                                        e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                                    }}
                                />
                            </div>

                            {/* Category Filter Pills */}
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center' }}>
                                {categories.map((cat) => (
                                    <motion.button
                                        key={cat}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => setSelectedCategory(cat)}
                                        style={{
                                            padding: '10px 24px',
                                            borderRadius: '9999px',
                                            backgroundColor: selectedCategory === cat 
                                                ? 'rgba(0, 217, 255, 0.2)' 
                                                : 'rgba(255, 255, 255, 0.05)',
                                            border: selectedCategory === cat 
                                                ? '1px solid rgba(0, 217, 255, 0.5)' 
                                                : '1px solid rgba(255, 255, 255, 0.1)',
                                            color: selectedCategory === cat ? theme.accent : '#999',
                                            fontSize: '14px',
                                            fontWeight: 600,
                                            cursor: 'pointer',
                                            transition: 'all 0.3s',
                                            textTransform: 'capitalize'
                                        }}
                                    >
                                        {cat === 'all' ? (isEs ? 'Todos' : 'All') : cat}
                                    </motion.button>
                                ))}
                            </div>

                            {/* Results Count */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                style={{ textAlign: 'center', color: '#666', fontSize: '14px', fontWeight: 500 }}
                            >
                                {isEs 
                                    ? `${filteredServices.length} servicio${filteredServices.length !== 1 ? 's' : ''} encontrado${filteredServices.length !== 1 ? 's' : ''}`
                                    : `${filteredServices.length} service${filteredServices.length !== 1 ? 's' : ''} found`}
                            </motion.div>
                        </motion.div>
                    </div>
                </section>

                {/* Services Grid Section */}
                <section style={{ position: 'relative', paddingBottom: '80px' }}>
                    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
                        <AnimatePresence mode="wait">
                            {filteredServices.length > 0 ? (
                                <motion.div 
                                    key="grid"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.5 }}
                                    style={{
                                        display: 'grid',
                                        gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 350px), 1fr))',
                                        gap: '32px'
                                    }}
                                >
                                    {filteredServices.map((service, index) => {
                                        const serviceMsg = whatsappMessages[lang as "es" | "en"]?.[service.whatsappKey as keyof typeof whatsappMessages['es']] || whatsappMessages.es[service.whatsappKey as keyof typeof whatsappMessages['es']];
                                        const whatsappLink = getWhatsAppLink(serviceMsg);
                                        const isHovered = hoveredCardId === service.id;

                                        const handleCardClick = (e: React.MouseEvent) => {
                                            const target = e.target as HTMLElement;
                                            if (target.closest('.whatsapp-pill-btn')) {
                                                return;
                                            }
                                            trackEvent('click_service_detail', { source: 'services_list', service: service.title, lang });
                                            router.push(service.link);
                                        };

                                        return (
                                            <motion.article
                                                key={service.id}
                                                initial={{ opacity: 0, y: 40 }}
                                                whileInView={{ opacity: 1, y: 0 }}
                                                viewport={{ once: true, margin: "-50px" }}
                                                transition={{ 
                                                    delay: index * 0.08, 
                                                    duration: 0.6,
                                                    ease: [0.25, 0.46, 0.45, 0.94]
                                                }}
                                                style={{ height: '100%' }}
                                                onMouseEnter={() => setHoveredCardId(service.id)}
                                                onMouseLeave={() => setHoveredCardId(null)}
                                            >
                                                <div
                                                    onClick={handleCardClick}
                                                    style={{
                                                        position: 'relative',
                                                        height: '100%',
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        background: 'linear-gradient(to bottom, #0a0a0a, #050505)',
                                                        borderRadius: '20px',
                                                        overflow: 'hidden',
                                                        border: `1px solid ${isHovered ? 'rgba(0, 217, 255, 0.5)' : 'rgba(255, 255, 255, 0.05)'}`,
                                                        boxShadow: isHovered ? '0 30px 90px rgba(0, 217, 255, 0.45), 0 0 40px rgba(0, 217, 255, 0.2)' : 'none',
                                                        transition: 'border-color 0.4s, box-shadow 0.4s, transform 0.4s',
                                                        transform: isHovered ? 'translateY(-12px)' : 'translateY(0px)',
                                                        cursor: 'pointer'
                                                    }}
                                                >
                                                    {/* Animated Glow Effect inside card */}
                                                    <div 
                                                        style={{
                                                            position: 'absolute',
                                                            inset: 0,
                                                            opacity: isHovered ? 0.3 : 0,
                                                            pointerEvents: 'none',
                                                            borderRadius: '20px',
                                                            background: 'radial-gradient(circle at 50% 50%, rgba(0, 217, 255, 0.6), transparent 70%)',
                                                            transition: 'opacity 0.4s',
                                                            zIndex: 1
                                                        }}
                                                    />

                                                    {/* Image Container 16:9 */}
                                                    <div style={{ 
                                                        position: 'relative', 
                                                        width: '100%', 
                                                        aspectRatio: '16/9',
                                                        overflow: 'hidden',
                                                        zIndex: 2
                                                    }}>
                                                        <div
                                                            style={{
                                                                position: 'relative',
                                                                width: '100%',
                                                                height: '100%',
                                                                transform: isHovered ? 'scale(1.12)' : 'scale(1)',
                                                                transition: 'transform 0.6s ease-out'
                                                            }}
                                                        >
                                                            <Image 
                                                                src={service.image} 
                                                                alt={service.title}
                                                                fill
                                                                style={{ 
                                                                    objectFit: 'cover',
                                                                    filter: isHovered ? 'brightness(1.1)' : 'brightness(0.95)',
                                                                    transition: 'filter 0.4s'
                                                                }}
                                                                sizes="(max-width: 768px) 100vw, 350px"
                                                            />
                                                        </div>
                                                        
                                                        {/* Gradient overlay */}
                                                        <div style={{
                                                            position: 'absolute',
                                                            inset: 0,
                                                            background: 'linear-gradient(to top, #0a0a0a, rgba(10, 10, 10, 0.1), transparent)',
                                                            opacity: isHovered ? 0.4 : 0.6,
                                                            transition: 'opacity 0.4s'
                                                        }} />

                                                        {/* Category badge */}
                                                        <div style={{ position: 'absolute', top: '16px', left: '16px', zIndex: 10 }}>
                                                            <span
                                                                style={{
                                                                    display: 'inline-block',
                                                                    padding: '8px 16px',
                                                                    fontSize: '10px',
                                                                    fontWeight: 700,
                                                                    textTransform: 'uppercase',
                                                                    letterSpacing: '0.1em',
                                                                    borderRadius: '9999px',
                                                                    backdropFilter: 'blur(12px)',
                                                                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                                                                    border: '1px solid rgba(0, 217, 255, 0.5)',
                                                                    color: '#00d9ff',
                                                                    boxShadow: isHovered ? '0 8px 24px rgba(0, 217, 255, 0.4)' : '0 4px 12px rgba(0, 0, 0, 0.3)',
                                                                    transition: 'box-shadow 0.3s'
                                                                }}
                                                            >
                                                                {isEs ? service.category : service.categoryEn}
                                                            </span>
                                                        </div>

                                                        {/* Billing Type badge */}
                                                        <div style={{ position: 'absolute', top: '16px', right: '16px', zIndex: 10 }}>
                                                            <div
                                                                style={{
                                                                    display: 'flex',
                                                                    alignItems: 'center',
                                                                    padding: '8px 12px',
                                                                    borderRadius: '9999px',
                                                                    backdropFilter: 'blur(12px)',
                                                                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                                                                    border: '1px solid rgba(255, 255, 255, 0.1)'
                                                                }}
                                                            >
                                                                <span style={{ fontSize: '9px', fontWeight: 700, color: '#ccc', letterSpacing: '0.05em' }}>
                                                                    {service.type}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Card Body Content */}
                                                    <div style={{
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        flexGrow: 1,
                                                        padding: '24px 20px',
                                                        position: 'relative',
                                                        zIndex: 2
                                                    }}>
                                                        
                                                        {/* Delivery time (using same structure as blog date) */}
                                                        <div 
                                                            style={{
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                gap: '8px',
                                                                marginBottom: '12px',
                                                                transform: isHovered ? 'translateX(4px)' : 'translateX(0px)',
                                                                transition: 'transform 0.3s'
                                                            }}
                                                        >
                                                            <svg style={{ width: '14px', height: '14px', color: '#666' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                            </svg>
                                                            <span style={{ fontSize: '11px', fontWeight: 600, color: '#00d9ff', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                                                {service.delivery}
                                                            </span>
                                                        </div>

                                                        {/* Title */}
                                                        <h3 
                                                            style={{
                                                                fontSize: 'clamp(20px, 3vw, 24px)',
                                                                fontWeight: 700,
                                                                marginBottom: '4px',
                                                                lineHeight: 1.3,
                                                                color: isHovered ? '#00d9ff' : '#fff',
                                                                transition: 'color 0.3s'
                                                            }}
                                                        >
                                                            {service.title}
                                                        </h3>

                                                        {/* Subtitle */}
                                                        <p style={{ color: '#999', fontSize: '14px', lineHeight: 1.5, marginBottom: '16px' }}>
                                                            {service.subtitle}
                                                        </p>

                                                        {/* Pricing details */}
                                                        <div style={{
                                                            margin: "8px 0 20px",
                                                            padding: "12px 16px",
                                                            background: "rgba(0, 217, 255, 0.03)",
                                                            borderRadius: "12px",
                                                            border: "1px solid rgba(0, 217, 255, 0.08)",
                                                            display: "flex",
                                                            flexDirection: "column",
                                                            gap: "2px"
                                                        }}>
                                                            <span style={{ fontSize: "1.25rem", fontWeight: 800, color: "#fff" }}>
                                                                {service.price}
                                                            </span>
                                                            <span style={{ fontSize: "0.75rem", color: "#666" }}>
                                                                {service.priceSub}
                                                            </span>
                                                        </div>

                                                        {/* Benefits checklist */}
                                                        <ul style={{ display: "flex", flexDirection: "column", gap: "8px", paddingLeft: "0", margin: "0 0 24px 0", listStyleType: "none", flexGrow: 1 }}>
                                                            {service.benefits.map((benefit, bIdx) => (
                                                                <li key={bIdx} style={{ fontSize: "0.85rem", color: "#bbb", display: "flex", alignItems: "center", gap: "8px" }}>
                                                                    <span style={{ color: '#00d9ff', fontWeight: 'bold' }}>✓</span> {benefit}
                                                                </li>
                                                            ))}
                                                        </ul>

                                                        {/* Divider */}
                                                        <div style={{
                                                            paddingTop: '20px',
                                                            borderTop: `1px solid ${isHovered ? 'rgba(0, 217, 255, 0.2)' : 'rgba(255, 255, 255, 0.05)'}`,
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'space-between',
                                                            transition: 'border-color 0.3s'
                                                        }}>
                                                            {/* Details Link */}
                                                            <div 
                                                                style={{
                                                                    display: 'flex',
                                                                    alignItems: 'center',
                                                                    gap: '6px',
                                                                    fontSize: '14px',
                                                                    fontWeight: 700,
                                                                    color: isHovered ? '#00d9ff' : '#999',
                                                                    transition: 'color 0.3s'
                                                                }}
                                                                className="details-link"
                                                            >
                                                                <span>{isEs ? 'Ver detalles' : 'Details'}</span>
                                                                <svg 
                                                                    style={{ 
                                                                        width: '16px', 
                                                                        height: '16px',
                                                                        transform: isHovered ? 'translateX(6px)' : 'translateX(0px)',
                                                                        transition: 'transform 0.3s'
                                                                    }} 
                                                                    fill="none" 
                                                                    viewBox="0 0 24 24" 
                                                                    stroke="currentColor"
                                                                >
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                                                </svg>
                                                            </div>

                                                            {/* Direct WhatsApp Button */}
                                                            <a 
                                                                href={whatsappLink} 
                                                                target="_blank" 
                                                                rel="noopener noreferrer" 
                                                                onClick={() => trackEvent('click_whatsapp', { source: 'services_list', service: service.title, lang })}
                                                                style={{
                                                                    display: 'flex',
                                                                    alignItems: 'center',
                                                                    gap: '8px',
                                                                    padding: '10px 20px',
                                                                    borderRadius: '9999px',
                                                                    backgroundColor: '#25D366',
                                                                    color: '#000',
                                                                    fontSize: '13px',
                                                                    fontWeight: 800,
                                                                    textDecoration: 'none',
                                                                    cursor: 'pointer',
                                                                    transition: 'all 0.3s ease',
                                                                    boxShadow: isHovered ? '0 8px 24px rgba(37, 211, 102, 0.4)' : 'none',
                                                                    border: 'none',
                                                                    zIndex: 10
                                                                }}
                                                                className="whatsapp-pill-btn"
                                                            >
                                                                <svg style={{ width: '16px', height: '16px', fill: '#000' }} viewBox="0 0 24 24">
                                                                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.73-1.45L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.625 1.451 5.403.002 9.794-4.382 9.797-9.77.001-2.61-1.01-5.059-2.846-6.897-1.837-1.836-4.287-2.845-6.894-2.846-5.407 0-9.8 4.393-9.803 9.782-.002 1.702.451 3.361 1.311 4.8l-.297 1.085.345.349 1.433-.298-.169.349zm11.505-4.759c-.269-.134-1.593-.787-1.839-.877-.246-.09-.425-.134-.604.134-.18.269-.696.877-.853 1.055-.157.179-.314.202-.583.067-.269-.134-1.138-.419-2.167-1.338-.802-.715-1.343-1.6-1.5-1.869-.157-.269-.017-.414.118-.548.121-.121.269-.314.404-.471.134-.157.179-.269.269-.449.09-.179.045-.336-.022-.471-.067-.134-.604-1.458-.828-1.997-.218-.526-.459-.454-.604-.461-.133-.006-.289-.008-.445-.008-.157 0-.414.058-.631.291-.218.232-.828.808-.828 1.97 0 1.163.846 2.288.964 2.446.118.157 1.666 2.544 4.037 3.568.564.244 1.004.389 1.348.498.567.18 1.083.155 1.492.094.456-.068 1.593-.651 1.817-1.278.223-.628.223-1.166.157-1.278-.067-.112-.246-.179-.516-.314z"/>
                                                                </svg>
                                                                <span>WhatsApp</span>
                                                            </a>
                                                        </div>
                                                    </div>

                                                    {/* Decorative corner accent inside card */}
                                                    <div 
                                                        style={{
                                                            position: 'absolute',
                                                            bottom: 0,
                                                            right: 0,
                                                            width: '160px',
                                                            height: '160px',
                                                            pointerEvents: 'none',
                                                            opacity: isHovered ? 0.35 : 0,
                                                            transform: isHovered ? 'scale(1)' : 'scale(0.8)',
                                                            transition: 'opacity 0.4s, transform 0.4s',
                                                            zIndex: 1
                                                        }}
                                                    >
                                                        <div style={{
                                                            position: 'absolute',
                                                            bottom: 0,
                                                            right: 0,
                                                            width: '100%',
                                                            height: '100%',
                                                            background: 'linear-gradient(to top left, rgba(0, 217, 255, 0.45), transparent)',
                                                            borderRadius: '100% 0 0 0',
                                                            filter: 'blur(30px)'
                                                        }} />
                                                    </div>
                                                </div>
                                            </motion.article>
                                        );
                                    })}
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="empty"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    style={{ textAlign: 'center', padding: '80px 20px', color: '#666' }}
                                >
                                    <svg 
                                        style={{ 
                                            width: '64px', 
                                            height: '64px', 
                                            margin: '0 auto 24px',
                                            opacity: 0.5
                                        }} 
                                        fill="none" 
                                        viewBox="0 0 24 24" 
                                        stroke="currentColor"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <h3 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '12px', color: '#999' }}>
                                        {isEs ? 'No se encontraron servicios' : 'No services found'}
                                    </h3>
                                    <p style={{ fontSize: '16px', color: '#666' }}>
                                        {isEs 
                                            ? 'Intenta ajustar tus filtros de búsqueda' 
                                            : 'Try adjusting your search filters'}
                                    </p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </section>

                {/* Por qué elegir SolvaTech */}
                <section style={{ position: "relative", width: "100%", maxWidth: "1200px", margin: "0 auto", padding: "40px 24px 80px" }}>
                    <div style={{ textAlign: "center", marginBottom: "48px" }}>
                        <h2 style={{ fontSize: "2.25rem", fontWeight: 800, color: "#fff" }}>
                            {isEs ? "Por qué elegir SolvaTech" : "Why Choose SolvaTech"}
                        </h2>
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px" }}>
                        {chooseReasons.map((reason, rIdx) => (
                            <div key={rIdx} style={{ padding: "32px", background: "#050505", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "16px" }}>
                                <h3 style={{ fontSize: "1.25rem", fontWeight: 700, color: theme.accent, marginBottom: "12px" }}>
                                    {reason.title}
                                </h3>
                                <p style={{ color: "#999", fontSize: "0.95rem", lineHeight: 1.6, margin: 0 }}>
                                    {reason.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* CTA Final */}
                <section style={{ position: "relative", width: "100%", maxWidth: "900px", margin: "0 auto", padding: "0 24px 120px" }}>
                    <div style={{ padding: "48px", background: "linear-gradient(135deg, #0a0a0f 0%, #050505 100%)", border: `1px solid ${theme.accent}33`, borderRadius: "24px", textAlign: "center", boxShadow: `0 0 40px ${theme.accent}11` }}>
                        <h2 style={{ fontSize: "1.75rem", fontWeight: 800, color: "#fff", marginBottom: "16px" }}>
                            {isEs ? "¿No sabés qué tipo de web necesitás?" : "Not sure what kind of website you need?"}
                        </h2>
                        <p style={{ color: "#999", fontSize: "1.05rem", marginBottom: "32px", maxWidth: "600px", margin: "0 auto 24px" }}>
                            {isEs 
                                ? "Escribinos y te orientamos de forma gratuita según las necesidades específicas de tu negocio."
                                : "Write to us and we will guide you for free based on the specific needs of your business."}
                        </p>
                        <a 
                            href={generalCtaLink} 
                            style={{ textDecoration: 'none' }}
                            onClick={() => trackEvent('click_whatsapp', { source: 'services_footer_cta', lang })}
                        >
                            <motion.button
                                whileHover={{ scale: 1.05, boxShadow: `0 12px 48px ${theme.accent}40` }}
                                whileTap={{ scale: 0.95 }}
                                style={{
                                    padding: '16px 40px',
                                    borderRadius: '9999px',
                                    fontWeight: 700,
                                    fontSize: '16px',
                                    backgroundColor: theme.accent,
                                    color: '#000',
                                    border: 'none',
                                    cursor: 'pointer',
                                    boxShadow: `0 8px 32px rgba(0, 217, 255, 0.3)`,
                                    transition: 'all 0.3s'
                                }}
                            >
                                {isEs ? "Escribinos por WhatsApp" : "Write to us on WhatsApp"}
                            </motion.button>
                        </a>
                    </div>
                </section>
            </div>

            <Footer />

            <style jsx global>{`
                .whatsapp-pill-btn:hover {
                    background-color: #20ba59 !important;
                    transform: scale(1.08) !important;
                    box-shadow: 0 8px 24px rgba(37, 211, 102, 0.6) !important;
                }
                .details-link:hover {
                    color: #fff !important;
                }
                .whatsapp-icon-btn:hover {
                    background-color: rgba(37, 211, 102, 0.25) !important;
                    border-color: rgba(37, 211, 102, 0.5) !important;
                    transform: scale(1.1);
                }
            `}</style>
        </main>
    );
}
