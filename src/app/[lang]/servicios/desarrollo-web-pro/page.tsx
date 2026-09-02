import { Metadata } from "next";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import Link from "next/link";

const Navbar = dynamic(() => import("@/components/Navbar"));
const Footer = dynamic(() => import("@/components/Footer"));
const BackgroundParticles = dynamic(() => import("@/components/BackgroundParticles"));
import ServiceCard from "@/components/ServiceCard";
import CTAButton from "@/components/CTAButton";
import ServiceJsonLd from "@/components/ServiceJsonLd";
import { buildServiceJsonLd } from "@/lib/service-schema";
import { whatsappMessages } from "@/lib/whatsapp";

type Props = {
    params: Promise<{ lang: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { lang } = await params;
    const isEs = lang === 'es';

    const baseUrl = "https://solvatech.com.py";
    const path = "/servicios/desarrollo-web-pro";
    
    const title = isEs 
      ? "Diseño Web Profesional y Corporativo en Paraguay | SolvaTech"
      : "Professional & Corporate Web Design in Paraguay | SolvaTech";
    const description = isEs
      ? "Desarrollo de páginas web profesionales y corporativas para empresas en Paraguay. Sitios rápidos, adaptados a celulares y optimizados para Google (SEO)."
      : "Development of professional and corporate websites for businesses in Paraguay. Fast, mobile-responsive, and search engine optimized (SEO).";

    return {
        title,
        description,
        alternates: {
            canonical: `${baseUrl}/${lang}${path}`,
            languages: {
                'es': `${baseUrl}/es${path}`,
                'es-PY': `${baseUrl}/es${path}`,
                'en': `${baseUrl}/en${path}`,
                'x-default': `${baseUrl}/es${path}`,
            }
        },
        openGraph: {
            title,
            description,
            url: `${baseUrl}/${lang}${path}`,
            locale: isEs ? "es_PY" : "en_US",
            type: "website",
        }
    };
}

export default async function DesarrolloWebProPage({ params }: Props) {
    const { lang } = await params;
    const isEs = lang === 'es';
    
    if (lang !== 'es' && lang !== 'en') {
        notFound();
    }

    const theme = {
        bg: "#000000",
        card: "#0a0a0f",
        border: "rgba(0, 217, 255, 0.15)",
        accent: "#00d9ff",
        accentDark: "#0099cc",
        textMain: "#ffffff",
        textSide: "rgba(255, 255, 255, 0.6)"
    };

    const benefits = isEs ? [
        "Diseño 100% exclusivo adaptado al branding corporativo de tu empresa",
        "Estructura avanzada de hasta 8-10 secciones internas independientes",
        "Desarrollo con tecnologías modernas para carga ultrarrápida (Core Web Vitals)",
        "Sección específica para el detalle profundo de cada servicio o sucursal",
        "Estructura técnica optimizada nativamente para SEO local en Paraguay",
        "Formularios de contacto y cotizadores personalizados",
        "Integración de Blog autogestionable para SEO de contenido",
        "Hosting corporativo de alto rendimiento y certificado SSL gratis por 1 año"
    ] : [
        "100% exclusive design tailored to your company's corporate branding",
        "Advanced structure of up to 8-10 independent internal sections",
        "Development with modern technologies for ultra-fast loading (Core Web Vitals)",
        "Specific section for deep detailing of each service or branch office",
        "Natively optimized technical structure for local SEO in Paraguay",
        "Custom contact forms and pricing quote engines",
        "Self-managed Blog integration for content SEO strategy",
        "High-performance corporate hosting and free SSL certificate for 1 year"
    ];

    const chooseReasons = isEs ? [
        {
            title: "Branding de Alto Nivel",
            desc: "Evitamos las plantillas prefabricadas. Diseñamos una interfaz única que transmite el liderazgo, la seriedad y la solidez que tu empresa tiene en el mercado de Paraguay."
        },
        {
            title: "Optimizado para Campañas (SEM/Ads)",
            desc: "Estructuramos Landing Pages internas de alta conversión para que tus campaigns en Google Ads, LinkedIn Ads o Meta Ads conviertan visitas en clientes cualificados."
        },
        {
            title: "Arquitectura 100% Escalable",
            desc: "Construido de forma modular. Si mañana necesitás conectar un CRM corporativo, sistemas de facturación, pasarelas de pago locales o intranet, la web está lista para crecer."
        }
    ] : [
        {
            title: "High-Level Branding",
            desc: "We avoid pre-made templates. We design a unique interface that conveys the leadership, seriousness, and solidity that your company holds in the Paraguayan market."
        },
        {
            title: "Optimized for Campaigns (SEM/Ads)",
            desc: "We structure high-converting internal landing pages so that your campaigns on Google Ads, LinkedIn Ads, or Meta Ads turn visits into qualified customers."
        },
        {
            title: "100% Scalable Architecture",
            desc: "Built in a modular fashion. If tomorrow you need to connect a corporate CRM, billing systems, local payment gateways, or intranet, the website is ready to grow."
        }
    ];

    const faqs = isEs ? [
        {
            q: "¿Para qué tipo de empresas se recomienda el plan Web Pro?",
            a: "Se recomienda para corporaciones, clínicas médicas, inmobiliarias, estudios contables o jurídicos, importadoras y empresas de servicios profesionales que requieren proyectar máxima confianza, detallar múltiples departamentos, divisiones o sucursales."
        },
        {
            q: "¿El sitio web corporativo es autogestionable?",
            a: "Sí. Para secciones dinámicas como Blog, Novedades o sección de Proyectos/Portfolio, integramos un gestor de contenidos muy simple para que tu equipo suba novedades sin depender de nosotros."
        },
        {
            q: "¿El código y el dominio nos pertenecen?",
            a: "Totalmente. Al finalizar el desarrollo y abonar la liquidación final, entregamos el acceso al código fuente completo y las credenciales de administración del dominio y hosting corporativo. El sitio es 100% tuyo."
        }
    ] : [
        {
            q: "What type of companies is the Web Pro plan recommended for?",
            a: "It is recommended for corporations, medical clinics, real estate, accounting or law firms, importers, and professional service companies that require maximum trust, detailing multiple departments, divisions, or branch offices."
        },
        {
            q: "Is the corporate website self-manageable?",
            a: "Yes. For dynamic sections such as Blog, News, or Projects/Portfolio section, we integrate a very simple content management system so that your team can upload updates without relying on us."
        },
        {
            q: "Do we own the code and the domain?",
            a: "Totally. Upon completion of development and final payment, we deliver access to the complete source code and corporate domain/hosting admin credentials. The site is 100% yours."
        }
    ];

    const dict = {
        h1: isEs ? "Desarrollo Web Pro y Corporativo" : "Pro & Corporate Web Development",
        whyTitle: isEs ? "Presencia Corporativa Premium" : "Premium Corporate Presence",
        whyDesc: isEs 
            ? "Una empresa líder necesita una identidad digital que coincida con su realidad operativa. Con la Web Pro, diseñamos interfaces de vanguardia utilizando el stack tecnológico más rápido del mercado (Next.js/React). Esto te da una ventaja competitiva clave: velocidad de carga instantánea en teléfonos celulares y computadoras, mejor indexación orgánica en Google Paraguay, y una experiencia de usuario impecable."
            : "A leading company needs a digital identity that matches its operational reality. With Web Pro, we design cutting-edge interfaces using the fastest technology stack on the market (Next.js/React). This gives you a key competitive advantage: instant loading speed on mobile phones and computers, better organic indexing on Google Paraguay, and an impeccable user experience.",
        featuresTitle: isEs ? "¿Qué incluye este plan?" : "What is included in this plan?",
        ventajasTitle: isEs ? "Ventajas Corporativas" : "Corporate Advantages",
        faqsTitle: isEs ? "Preguntas Frecuentes" : "Frequently Asked Questions",
        ctaBtn: isEs ? "Solicitar propuesta de web corporativa" : "Request corporate website proposal",
        price: isEs ? "Desde Gs. 3.550.000 (Presupuestos según requerimientos)" : "Starting from Gs. 3,550,000 (Based on custom requirements)",
        metaBadge: isEs ? "Servicio Comercial" : "Commercial Service",
        metaSub: isEs ? "Web Corporativa" : "Corporate Web",
        advisorRole: isEs ? "Asesor Tecnológico SolvaTech" : "Technology Advisor SolvaTech",
        breadcrumbsHome: isEs ? "Inicio" : "Home",
        breadcrumbsServices: isEs ? "Servicios" : "Services",
        breadcrumbsService: isEs ? "Web Pro" : "Web Pro",
    };

    const ctaMsg = whatsappMessages[lang as "es" | "en"]?.pro || whatsappMessages.es.pro;

    const serviceLd = buildServiceJsonLd({
        lang,
        path: "/servicios/desarrollo-web-pro",
        name: dict.h1,
        description: dict.whyDesc,
        breadcrumbLabel: dict.breadcrumbsService,
        breadcrumbHome: dict.breadcrumbsHome,
        breadcrumbServices: dict.breadcrumbsServices,
        faqs,
    });

    return (
        <main style={{ minHeight: "100vh", backgroundColor: theme.bg, color: theme.textMain, overflowX: "hidden", position: "relative" }}>
            <ServiceJsonLd nodes={serviceLd} />
            <BackgroundParticles />
            <Navbar />
            
            <section style={{ position: "relative", zIndex: 10, width: "100%", maxWidth: "900px", margin: "0 auto", padding: "140px 24px 80px", display: "flex", flexDirection: "column", gap: "32px" }}>
                {/* Breadcrumbs */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    fontSize: '14px',
                    marginBottom: '8px',
                    fontWeight: 500,
                    flexWrap: 'wrap',
                    padding: '12px 20px',
                    background: 'rgba(0, 0, 0, 0.5)',
                    backdropFilter: 'blur(10px)',
                    borderRadius: '12px',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    width: 'fit-content'
                }}>
                    <svg style={{ width: '16px', height: '16px', color: theme.accent }} fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                    </svg>
                    <Link href={`/${lang}`} style={{ color: '#999', textDecoration: 'none', transition: 'color 0.3s' }}>
                        {dict.breadcrumbsHome}
                    </Link>
                    <span style={{ color: '#666' }}>›</span>
                    <Link href={`/${lang}/servicios`} style={{ color: '#999', textDecoration: 'none', transition: 'color 0.3s' }}>
                        {dict.breadcrumbsServices}
                    </Link>
                    <span style={{ color: '#666' }}>›</span>
                    <span style={{ color: theme.accent, fontWeight: 600 }}>
                        {dict.breadcrumbsService}
                    </span>
                </div>

                {/* Meta Badge */}
                <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '20px' }}>
                    <span style={{
                        padding: '8px 20px',
                        borderRadius: '9999px',
                        fontSize: '11px',
                        fontWeight: 800,
                        textTransform: 'uppercase',
                        letterSpacing: '0.12em',
                        backdropFilter: 'blur(12px)',
                        background: `linear-gradient(135deg, ${theme.accent}30, ${theme.accentDark}20)`,
                        border: `2px solid ${theme.accent}60`,
                        color: '#fff',
                        boxShadow: `0 8px 32px ${theme.accent}40`,
                        position: 'relative'
                    }}>
                        {dict.metaBadge}
                    </span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ color: theme.accent }}>★</span>
                        <span style={{ color: '#ccc', fontSize: '14px', fontWeight: 600 }}>
                            {dict.metaSub}
                        </span>
                    </div>
                </div>

                {/* Title & Line decoration */}
                <div style={{ position: 'relative' }}>
                    <div style={{
                        position: 'absolute',
                        top: '-20px',
                        left: 0,
                        width: '120px',
                        height: '4px',
                        background: `linear-gradient(90deg, ${theme.accent}, transparent)`,
                        borderRadius: '4px'
                    }} />
                    
                    <h1 style={{
                        fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                        fontWeight: 900,
                        lineHeight: 1.1,
                        textShadow: `0 4px 24px rgba(0, 0, 0, 0.8), 0 0 60px ${theme.accent}30`,
                        background: `linear-gradient(135deg, #fff, ${theme.accent}80)`,
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                        margin: '12px 0'
                    }}>
                        {dict.h1}
                    </h1>
                    
                    <div style={{
                        height: '2px',
                        background: `linear-gradient(90deg, ${theme.accent}, ${theme.accentDark}, transparent)`,
                        marginTop: '20px',
                        borderRadius: '2px',
                        width: '100%'
                    }} />
                </div>

                {/* Consultant Info */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    background: 'linear-gradient(135deg, rgba(0, 217, 255, 0.1), rgba(0, 153, 204, 0.05))',
                    width: 'fit-content',
                    padding: '8px 24px 8px 8px',
                    borderRadius: '9999px',
                    border: `2px solid ${theme.accent}40`,
                    backdropFilter: 'blur(16px)',
                    boxShadow: `0 8px 32px ${theme.accent}30`,
                    position: 'relative'
                }}>
                    <div style={{
                        width: '48px',
                        height: '48px',
                        borderRadius: '50%',
                        background: `linear-gradient(135deg, ${theme.accent}, ${theme.accentDark})`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#000',
                        fontWeight: 900,
                        fontSize: '20px',
                        border: '2px solid rgba(255, 255, 255, 0.2)'
                    }}>
                        A
                    </div>
                    <div>
                        <p style={{ fontWeight: 800, color: '#fff', fontSize: '15px', margin: 0 }}>
                            Alan Alcaraz
                        </p>
                        <p style={{ fontSize: '12px', color: theme.accent, fontWeight: 600, margin: 0 }}>
                            {dict.advisorRole}
                        </p>
                    </div>
                </div>

                {/* Price Badge */}
                <div style={{ alignSelf: "flex-start", padding: "12px 28px", background: "rgba(0, 217, 255, 0.05)", border: `1px solid ${theme.border}`, borderRadius: "9999px" }}>
                    <span style={{ fontSize: "1.125rem", fontWeight: 800, color: theme.accent }}>
                        {dict.price}
                    </span>
                </div>

                {/* Content info */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "32px", marginTop: "24px" }}>
                    {/* Desc */}
                    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                        <h2 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "16px" }}>{dict.whyTitle}</h2>
                        <p style={{ color: "#9ca3af", lineHeight: 1.7, fontSize: "1rem", margin: 0 }}>
                            {dict.whyDesc}
                        </p>
                    </div>

                    {/* Features Card */}
                    <ServiceCard accent={theme.accent} border={theme.border} cardBg="#0a0a0f" className="service-card-premium">
                        <h3 style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: "16px", color: theme.accent }}>{dict.featuresTitle}</h3>
                        <ul style={{ display: "flex", flexDirection: "column", gap: "10px", paddingLeft: "0", listStyleType: "none", margin: 0 }}>
                            {benefits.map((benefit, idx) => (
                                <li key={idx} style={{ fontSize: "0.95rem", color: "#bbb", display: "flex", alignItems: "flex-start", gap: "10px" }}>
                                    <span style={{ color: theme.accent, fontWeight: "bold" }}>✓</span>
                                    <span>{benefit}</span>
                                </li>
                            ))}
                        </ul>
                    </ServiceCard>
                </div>

                {/* Por qué elegirnos */}
                <div style={{ marginTop: "40px" }}>
                    <h2 style={{ fontSize: "1.75rem", fontWeight: 800, textAlign: "center", marginBottom: "32px" }}>{dict.ventajasTitle}</h2>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "24px" }}>
                        {chooseReasons.map((reason, idx) => (
                            <div key={idx} style={{ padding: "24px", background: "#050505", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "12px" }}>
                                <h3 style={{ fontSize: "1.15rem", fontWeight: 700, color: theme.accent, marginBottom: "10px" }}>{reason.title}</h3>
                                <p style={{ color: "#9ca3af", fontSize: "0.9rem", lineHeight: 1.5, margin: 0 }}>{reason.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* FAQs específicas */}
                <div style={{ marginTop: "40px" }}>
                    <h2 style={{ fontSize: "1.75rem", fontWeight: 800, textAlign: "center", marginBottom: "32px" }}>{dict.faqsTitle}</h2>
                    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                        {faqs.map((faq, idx) => (
                            <div key={idx} style={{ padding: "24px", background: "#0a0a0f", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "12px" }}>
                                <h3 style={{ fontSize: "1.15rem", fontWeight: 700, color: "#fff", marginBottom: "10px" }}>{faq.q}</h3>
                                <p style={{ color: "#9ca3af", fontSize: "0.95rem", lineHeight: 1.6, margin: 0 }}>{faq.a}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Final CTA */}
                <div style={{ marginTop: "32px", textAlign: "center" }}>
                    <CTAButton 
                        whatsappMessage={ctaMsg}
                        accent={theme.accent}
                        withShadow={true}
                        eventName="click_cta_pro"
                    >
                        {dict.ctaBtn}
                    </CTAButton>
                </div>
            </section>

            <style dangerouslySetInnerHTML={{ __html: `
                .service-card-premium {
                    position: relative;
                    border: 1px solid rgba(255, 255, 255, 0.08) !important;
                    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5) !important;
                    background: #0a0a0f !important;
                    transition: all 0.4s cubic-bezier(0.22, 1, 0.36, 1) !important;
                }
                .service-card-premium:hover {
                    border-color: #00d9ff !important;
                    box-shadow: 0 20px 45px rgba(0, 0, 0, 0.8), 0 0 30px rgba(0, 217, 255, 0.3) !important;
                    transform: translateY(-6px);
                }
            `}} />

            <Footer />
        </main>
    );
}
