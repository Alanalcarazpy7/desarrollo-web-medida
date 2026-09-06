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
    const path = "/servicios/desarrollo-web-estandar";
    
    const title = isEs 
      ? "Desarrollo de Páginas Web Estándar en Paraguay | SolvaTech"
      : "Standard Web Design & Business Pages in Paraguay | SolvaTech";
    const description = isEs
      ? "Diseño de páginas web estándar y profesionales para empresas en Paraguay. Con secciones completas de servicios, nosotros, mapa y WhatsApp."
      : "Standard and professional web design for companies in Paraguay. Features complete sections for services, about us, map, and WhatsApp.";

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

export default async function DesarrolloWebEstandarPage({ params }: Props) {
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
        "Diseño a medida de tu marca, no una plantilla base",
        "6 a 10 secciones o páginas: una por cada servicio o rubro",
        "Sección de novedades o blog para publicar vos mismo y sumar contenido",
        "Galería de fotos ampliada y sección 'Nosotros' / 'Quiénes somos'",
        "Cada página con su título y textos claros para que Google la entienda",
        "Carga rápida: la web abre al toque en el celular",
        "Formulario de contacto profesional y mapa de Google Maps",
        "3 rondas de cambios antes de publicar",
        "6 meses de hosting incluidos (el alojamiento de tu web)"
    ] : [
        "Custom design for your brand, not a base template",
        "6 to 10 sections or pages: one per service or line of business",
        "News or blog section you can update yourself to keep adding content",
        "Expanded photo gallery and an 'About Us' section",
        "Each page with a clear title and copy so Google understands it",
        "Fast loading: the site opens instantly on mobile",
        "Professional contact form and Google Maps location",
        "3 rounds of changes before launch",
        "6 months of hosting included (your website's server space)"
    ];

    const chooseReasons = isEs ? [
        {
            title: "Mayor Credibilidad para tu Marca",
            desc: "Ideal para empresas en crecimiento y consultores profesionales en Asunción y todo Paraguay que buscan proyectar una imagen digital consolidada."
        },
        {
            title: "Preparado para Campañas (ADS)",
            desc: "Al tener secciones y páginas internas bien explicadas, tus anuncios en Google Ads o Meta Ads dirigirán a contenidos específicos de alta conversión."
        },
        {
            title: "Navegación Intuitiva",
            desc: "Desarrollada para que el usuario encuentre en menos de 3 clics toda la información sobre tu negocio y envíe una consulta."
        }
    ] : [
        {
            title: "Greater Credibility for Your Brand",
            desc: "Ideal for growing businesses and professional consultants in Asunción and all of Paraguay seeking to project a consolidated digital image."
        },
        {
            title: "Ready for Advertising Campaigns (Ads)",
            desc: "With well-explained sections and internal pages, your Google Ads or Meta Ads will point to specific high-converting content."
        },
        {
            title: "Intuitive Navigation",
            desc: "Developed so that the user finds all the information about your business and sends an inquiry in less than 3 clicks."
        }
    ];

    const faqs = isEs ? [
        {
            q: "¿En qué se diferencia de la Web Básica?",
            a: "La Web Básica es una sola página (hasta 4 secciones) con un diseño de base adaptado a tu marca: sirve para que te encuentren y te escriban. La Web Estándar es un sitio de varias páginas con diseño a medida, una página por cada servicio, sección de novedades o blog y galería ampliada. Es el salto de 'tener presencia' a 'contar bien todo lo que hacés'."
        },
        {
            q: "¿Qué secciones contiene la Web Estándar?",
            a: "Habitualmente incluye: Inicio (Banner de impacto), Nosotros (Misión/Visión), Servicios (Listado detallado), Proyectos o Galería de trabajos, Formulario de contacto y Mapa de ubicación física."
        },
        {
            q: "¿Con este plan voy a aparecer primero en Google?",
            a: "La web se entrega bien armada para Google: cada página con su título claro, textos ordenados y carga rápida. Con eso empezás a aparecer cuando te buscan por el nombre de tu negocio. Posicionar para búsquedas más competidas es un trabajo aparte y continuo (Perfil de Empresa, reseñas, contenido); es un servicio mensual que se contrata por separado."
        },
        {
            q: "¿El dominio y el hosting están incluidos?",
            a: "Se incluyen 6 meses de hosting sin costo (el alojamiento de tu web). La idea es que primero tengas la web funcionando y consigas clientes; recién después el hosting pasa a tener un costo mensual. El dominio se paga aparte, una vez al año."
        }
    ] : [
        {
            q: "How is it different from the Basic Web?",
            a: "The Basic Web is a single page (up to 4 sections) with a base design adapted to your brand: it gets you found and messaged. The Standard Web is a multi-page site with custom design, one page per service, a blog or news section and an expanded gallery. It is the jump from 'having a presence' to 'explaining everything you do well'."
        },
        {
            q: "What sections does the Standard Web contain?",
            a: "It typically includes: Home (impact banner), About Us (mission/vision), Services (detailed listing), Projects or Gallery, Contact Form, and physical location Map."
        },
        {
            q: "With this plan will I appear first on Google?",
            a: "The site is delivered well built for Google: each page with a clear title, tidy copy and fast loading. That gets you showing up when people search for your business name. Ranking for more competitive searches is separate, ongoing work (Business Profile, reviews, content); it is a monthly service hired separately."
        },
        {
            q: "Are the domain and hosting included?",
            a: "6 months of hosting are included at no cost (your website's server space). The idea is that you first get the site running and win clients; only after that does hosting become a monthly cost. The domain is paid separately, once a year."
        }
    ];

    const dict = {
        h1: isEs ? "Web estándar para tu negocio" : "Standard website for your business",
        whyTitle: isEs ? "Estructura Sólida y Profesional" : "Solid & Professional Structure",
        whyDesc: isEs 
            ? "Ideal para empresas, consultorios, firmas profesionales y negocios que necesitan detallar múltiples líneas de servicios o productos de forma clara y ordenada. La Web Estándar permite organizar el contenido de manera jerárquica para guiar al usuario por un embudo de ventas que culmina en consultas cualificadas vía formulario o de manera directa por WhatsApp."
            : "Ideal for companies, clinics, professional firms, and businesses that need to detail multiple lines of services or products in a clear and orderly manner. The Standard Web allows content to be organized hierarchically to guide the user through a sales funnel that ends in qualified inquiries via form or directly through WhatsApp.",
        featuresTitle: isEs ? "¿Qué incluye este plan?" : "What is included in this plan?",
        ventajasTitle: isEs ? "Ventajas Comerciales" : "Commercial Advantages",
        faqsTitle: isEs ? "Preguntas Frecuentes" : "Frequently Asked Questions",
        ctaBtn: isEs ? "Consultar mi web estándar" : "Request my standard website",
        price: isEs ? "Desde Gs. 1.250.000 pago único" : "Starting from Gs. 1,250,000 (one-time payment)",
        metaBadge: isEs ? "Servicio Comercial" : "Commercial Service",
        metaSub: isEs ? "Web Estándar" : "Standard Web",
        advisorRole: isEs ? "Asesor Tecnológico SolvaTech" : "Technology Advisor SolvaTech",
        breadcrumbsHome: isEs ? "Inicio" : "Home",
        breadcrumbsServices: isEs ? "Servicios" : "Services",
        breadcrumbsService: isEs ? "Web Estándar" : "Standard Web",
    };

    const ctaMsg = whatsappMessages[lang as "es" | "en"]?.estandar || whatsappMessages.es.estandar;

    const serviceLd = buildServiceJsonLd({
        lang,
        path: "/servicios/desarrollo-web-estandar",
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
                        eventName="click_cta_estandar"
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
