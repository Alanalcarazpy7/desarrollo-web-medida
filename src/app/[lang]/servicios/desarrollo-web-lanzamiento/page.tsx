import { Metadata } from "next";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import Link from "next/link";


const Navbar = dynamic(() => import("@/components/Navbar"));
const Footer = dynamic(() => import("@/components/Footer"));
const BackgroundParticles = dynamic(() => import("@/components/BackgroundParticles"));
import ServiceCard from "@/components/ServiceCard";
import CTAButton from "@/components/CTAButton";
import { whatsappMessages } from "@/lib/whatsapp";

type Props = {
    params: Promise<{ lang: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { lang } = await params;
    const isEs = lang === 'es';

    const baseUrl = "https://solvatech.com.py";
    const path = "/servicios/desarrollo-web-lanzamiento";
    
    const title = isEs 
      ? "Página Web Promo Lanzamiento en Paraguay | SolvaTech"
      : "Web Development Launch Promo in Paraguay | SolvaTech";
    const description = isEs
      ? "Diseño de página web económica con la Promo Lanzamiento en Paraguay. Presencia online rápida, adaptada a celulares y botón de WhatsApp para tu negocio."
      : "Affordable web design with our Launch Promo in Paraguay. Quick online presence, mobile friendly, and WhatsApp button for your business.";

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

export default async function PromoLanzamientoPage({ params }: Props) {
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
        "Diseño moderno y 100% adaptable a teléfonos celulares y tablets",
        "Botón flotante directo para que los clientes te contacten por WhatsApp",
        "Sección de contacto directa con formulario básico o datos de contacto",
        "Configuración de tu ubicación geográfica con mapa interactivo",
        "Optimización básica de velocidad para conexiones móviles locales",
        "Enlaces directos a tus perfiles de redes sociales (Instagram, Facebook)",
        "Configuración inicial de hosting y dominio (se adquiere por separado o incluido)",
        "Entrega rápida garantizada en un plazo máximo de 3 a 5 días hábiles"
    ] : [
        "Modern design 100% adaptable to mobile phones and tablets",
        "Floating direct button for customers to contact you via WhatsApp",
        "Direct contact section with basic form or contact information",
        "Configuration of your geographical location with an interactive map",
        "Basic speed optimization for local mobile connections",
        "Direct links to your social media profiles (Instagram, Facebook)",
        "Initial domain and hosting setup (purchased separately or included)",
        "Guaranteed fast delivery within a maximum of 3 to 5 business days"
    ];

    const chooseReasons = isEs ? [
        {
            title: "Bajo Costo Inicial",
            desc: "La opción más económica del mercado para digitalizar tu negocio sin comprometer la calidad visual ni la velocidad de carga."
        },
        {
            title: "Entrega Ultra Rápida",
            desc: "Tu negocio estará en línea en tiempo récord. Entregamos el sitio listo y funcionando en un plazo de 3 a 5 días hábiles."
        },
        {
            title: "Enfoque Comercial",
            desc: "Diseñada específicamente para incentivar el contacto directo de clientes potenciales hacia tu número de WhatsApp."
        }
    ] : [
        {
            title: "Low Initial Cost",
            desc: "The most affordable option on the market to digitize your business without compromising visual quality or loading speed."
        },
        {
            title: "Ultra Fast Delivery",
            desc: "Your business will be online in record time. We deliver the site up and running within a maximum of 3 to 5 business days."
        },
        {
            title: "Commercial Focus",
            desc: "Specifically designed to encourage direct contact from potential customers to your WhatsApp number."
        }
    ];

    const faqs = isEs ? [
        {
            q: "¿Qué incluye exactamente la Promo Lanzamiento?",
            a: "Incluye una página de aterrizaje (Landing Page) profesional de una sola sección extendida, donde se muestra de forma compacta quién sos, qué ofrecés, tu galería/servicios, mapa de ubicación y botón directo a WhatsApp."
        },
        {
            q: "¿Tengo que pagar mensualidades por el mantenimiento?",
            a: "No. Este servicio es de pago único para el diseño y maquetación web. Las únicas tarifas periódicas que deberás renovar anualmente son el dominio y el hosting (que rondan los Gs. 250.000 anuales)."
        },
        {
            q: "¿Puedo agregar más páginas o secciones en el futuro?",
            a: "Sí, claro. Al estar construida con tecnología modular y moderna, podés escalar a planes superiores (como Web Estándar o Pro) agregando páginas de servicios, blogs o catálogos cuando tu negocio crezca."
        }
    ] : [
        {
            q: "What exactly is included in the Launch Promo?",
            a: "It includes a professional single-page layout (Landing Page) where your bio, services/products, location map, and direct WhatsApp buttons are displayed compactly."
        },
        {
            q: "Do I have to pay monthly fees for maintenance?",
            a: "No. This service is a one-time payment for design and web page setup. The only recurring fees are the domain and hosting renewals (approx Gs. 250,000 annually)."
        },
        {
            q: "Can I add more pages or sections in the future?",
            a: "Yes, absolutely. Since it is built with modern modular technology, you can upgrade to superior plans (such as Standard or Pro) by adding service pages, blogs, or catalogs as your business grows."
        }
    ];

    const dict = {
        h1: isEs ? "Promo Lanzamiento Web" : "Launch Promo Website Development",
        whyTitle: isEs ? "Tu primera página web en tiempo récord" : "Your first website in record time",
        whyDesc: isEs 
            ? "Tener presencia en internet hoy en día es indispensable. Con la Promo Lanzamiento de SolvaTech, obtenés una página web optimizada para teléfonos móviles, veloz y con llamados directos a la acción por un costo accesible. La opción ideal para emprendedores, profesionales independientes y pequeños comercios que desean comenzar a recibir clientes de Google y redes sociales."
            : "Having an online presence today is essential. With SolvaTech's Launch Promo, you get a fast website optimized for mobile phones, complete with direct calls to action at an affordable cost. The ideal option for entrepreneurs, freelancers, and small businesses looking to start attracting clients from Google and social media.",
        featuresTitle: isEs ? "¿Qué incluye este plan?" : "What is included in this plan?",
        ventajasTitle: isEs ? "Ventajas de Lanzar con SolvaTech" : "Advantages of Launching with SolvaTech",
        faqsTitle: isEs ? "Preguntas Frecuentes" : "Frequently Asked Questions",
        ctaBtn: isEs ? "Quiero contratar la Promo Lanzamiento" : "I want to get the Launch Promo",
        price: isEs ? "Gs. 550.000 / pago único" : "Gs. 550,000 / one-time payment",
        metaBadge: isEs ? "Servicio Comercial" : "Commercial Service",
        metaSub: isEs ? "Desarrollo Web Inicial" : "Initial Web Development",
        advisorRole: isEs ? "Asesor Tecnológico SolvaTech" : "Technology Advisor SolvaTech",
        breadcrumbsHome: isEs ? "Inicio" : "Home",
        breadcrumbsServices: isEs ? "Servicios" : "Services",
        breadcrumbsService: isEs ? "Promo Lanzamiento" : "Launch Promo",
    };

    const ctaMsg = whatsappMessages[lang as "es" | "en"]?.promo || whatsappMessages.es.promo;

    return (
        <main style={{ minHeight: "100vh", backgroundColor: theme.bg, color: theme.textMain, overflowX: "hidden", position: "relative" }}>
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
                        eventName="click_cta_lanzamiento"
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
