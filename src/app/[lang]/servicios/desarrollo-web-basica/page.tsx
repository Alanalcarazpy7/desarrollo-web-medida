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
    const path = "/servicios/desarrollo-web-basica";
    
    const title = isEs 
      ? "Páginas Web Básicas y Económicas en Paraguay | SolvaTech"
      : "Basic & Affordable Web Design in Paraguay | SolvaTech";
    const description = isEs
      ? "Diseño de páginas web básicas y económicas para negocios en Paraguay. Con botón de WhatsApp, responsive y adaptada a celulares."
      : "Affordable and basic web design for businesses in Paraguay. With WhatsApp button, responsive, and mobile-friendly.";

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

export default async function DesarrolloWebBasicaPage({ params }: Props) {
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
        "Diseño moderno y 100% responsive (celulares y PCs)",
        "Sección principal con presentación de tu negocio",
        "Detalle de tus servicios o productos clave",
        "Formulario de contacto funcional",
        "Ubicación en Google Maps integrada",
        "Botón flotante directo a tu WhatsApp",
        "Enlaces a todas tus redes sociales",
        "6 meses de hosting incluidos (el alojamiento de tu web)"
    ] : [
        "Modern and 100% responsive design (mobile & PC)",
        "Main section presenting your business",
        "Key services or products showcase",
        "Functional contact form",
        "Integrated Google Maps location",
        "Floating WhatsApp button",
        "Links to all your social networks",
        "6 months of hosting included (your website's server space)"
    ];

    const chooseReasons = isEs ? [
        {
            title: "Presencia Profesional al Instante",
            desc: "Ideal para profesionales independientes, pymes y emprendimientos locales que necesitan una vitrina digital limpia y confiable sin gastar de más."
        },
        {
            title: "Optimización de Carga",
            desc: "Desarrollada con código limpio para que cargue en menos de 2 segundos en celulares con conexiones de datos móviles estándar en Paraguay."
        },
        {
            title: "Sin Costos Ocultos",
            desc: "Se realiza un pago único por el desarrollo. No te atamos a contratos de mantenimiento obligatorios."
        }
    ] : [
        {
            title: "Instant Professional Presence",
            desc: "Ideal for independent professionals, small businesses, and local startups that need a clean and reliable digital showcase without overspending."
        },
        {
            title: "Loading Speed Optimization",
            desc: "Developed with clean code so that it loads in less than 2 seconds on mobile phones with standard mobile data connections in Paraguay."
        },
        {
            title: "No Hidden Costs",
            desc: "One-time payment for development. We don't tie you to mandatory maintenance contracts."
        }
    ];

    const faqs = isEs ? [
        {
            q: "¿Cuánto tiempo demora la entrega de la web básica?",
            a: "El tiempo estimado de desarrollo es de 5 a 7 días hábiles, una vez que nos envíes los textos, logotipo e imágenes que querés mostrar en el sitio."
        },
        {
            q: "¿Tengo que pagar mantenimiento mensual?",
            a: "No. El pago es único por el diseño y la programación. Se incluyen 6 meses de hosting sin costo (el alojamiento de tu web) para que primero la tengas funcionando y consigas clientes. Después, el hosting pasa a tener un costo mensual y el dominio se paga aparte, una vez al año."
        },
        {
            q: "¿Puedo agregarle funciones en el futuro?",
            a: "Totalmente. El sitio se construye sobre una arquitectura modular. Si en el futuro querés añadir un catálogo de productos, carrito de compras o pasarelas de pago, podemos escalarla sin problemas."
        }
    ] : [
        {
            q: "How long does it take to deliver a basic website?",
            a: "The estimated development time is 5 to 7 business days, once you send us the texts, logo, and images you want to display on the site."
        },
        {
            q: "Do I have to pay monthly maintenance?",
            a: "No. The payment is one-time for design and coding. 6 months of hosting are included at no cost (your website's server space) so you first get it running and win clients. After that, hosting has a monthly cost and the domain is paid separately, once a year."
        },
        {
            q: "Can I add features in the future?",
            a: "Absolutely. The site is built on a modular architecture. If you want to add a product catalog, shopping cart, or payment gateways in the future, we can scale it without problems."
        }
    ];

    const dict = {
        h1: isEs ? "Web básica para tu negocio" : "Basic website for your business",
        whyTitle: isEs ? "¿Por qué empezar con una Web Básica?" : "Why start with a Basic Website?",
        whyDesc: isEs 
            ? "Tener una página web propia transmite mucha más seriedad y confianza que depender únicamente de perfiles de redes sociales. Con nuestra Web Básica, tendrás un enlace profesional listo para compartir en tus campañas publicitarias y perfiles digitales, centralizando toda tu información en un formato optimizado y directo al grano."
            : "Having your own website conveys much more seriousness and trust than depending solely on social media profiles. With our Basic Web, you will have a professional link ready to share in your advertising campaigns and digital profiles, centralizing all your information in an optimized, straight-to-the-point format.",
        featuresTitle: isEs ? "¿Qué incluye este plan?" : "What is included in this plan?",
        ventajasTitle: isEs ? "Ventajas Comerciales" : "Commercial Advantages",
        faqsTitle: isEs ? "Preguntas Frecuentes" : "Frequently Asked Questions",
        ctaBtn: isEs ? "Solicitar mi web básica por WhatsApp" : "Request my basic website on WhatsApp",
        price: isEs ? "Precio lanzamiento: Gs. 850.000 · pago único (regular Gs. 950.000)" : "Launch price: Gs. 850,000 · one-time payment (regular Gs. 950,000)",
        metaBadge: isEs ? "Servicio Comercial" : "Commercial Service",
        metaSub: isEs ? "Presencia Online" : "Online Presence",
        advisorRole: isEs ? "Asesor Tecnológico SolvaTech" : "Technology Advisor SolvaTech",
        breadcrumbsHome: isEs ? "Inicio" : "Home",
        breadcrumbsServices: isEs ? "Servicios" : "Services",
        breadcrumbsService: isEs ? "Web Básica" : "Basic Web",
    };

    const ctaMsg = whatsappMessages[lang as "es" | "en"]?.basica || whatsappMessages.es.basica;

    const serviceLd = buildServiceJsonLd({
        lang,
        path: "/servicios/desarrollo-web-basica",
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
                        eventName="click_cta_basica"
                    >
                        {dict.ctaBtn}
                    </CTAButton>
                </div>
            </section>

            <style dangerouslySetInnerHTML={{ __html: `
                .service-card-premium {
                    border: 1px solid rgba(0, 217, 255, 0.1) !important;
                    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5) !important;
                    transition: all 0.4s cubic-bezier(0.22, 1, 0.36, 1) !important;
                }
                .service-card-premium:hover {
                    border-color: #00d9ff !important;
                    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.8), 0 0 35px rgba(0, 217, 255, 0.25) !important;
                    transform: translateY(-4px);
                }
            `}} />

            <Footer />
        </main>
    );
}
