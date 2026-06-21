import { Metadata } from "next";
import dynamic from "next/dynamic";
import Link from "next/link";
import { whatsappMessages } from "@/lib/whatsapp";


const Navbar = dynamic(() => import("@/components/Navbar"));
const Footer = dynamic(() => import("@/components/Footer"));
const BackgroundParticles = dynamic(() => import("@/components/BackgroundParticles"));
import ServiceCard from "@/components/ServiceCard";
import CTAButton from "@/components/CTAButton";

type Props = {
    params: Promise<{ lang: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { lang } = await params;
    const baseUrl = "https://solvatech.com.py";
    const path = "/servicios/sistemas-informaticos-paraguay";
    const isEs = lang === 'es';

    const title = isEs
      ? "Sistemas a medida para negocios en Paraguay | SolvaTech"
      : "Custom Systems & Custom Software in Paraguay | SolvaTech";

    const description = isEs
      ? "Diseño y desarrollo de sistemas a medida en Paraguay. Carritos de compra, paneles administrativos y software empresarial personalizado."
      : "Design and development of custom systems in Paraguay. Shopping carts, admin dashboards, and custom business software.";

    const keywords = isEs
      ? ["sistemas informaticos asuncion", "software a medida paraguay", "desarrollo de sistemas empresariales", "sistemas informaticos paraguay"]
      : ["custom software development", "enterprise web systems", "business automation software", "custom software paraguay"];
    
    return {
        title,
        description,
        keywords,
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
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
        }
    };
}

export default async function SistemasInformaticosParaguayPage({ params }: Props) {
    const { lang } = await params;
    const isEs = lang === 'es';

    const theme = {
        bg: "#000000",
        card: "#050505",
        border: "#1f2937",
        accent: "#00d9ff",
        accentDark: "#0099cc",
        textMain: "#ffffff",
        textSide: "#9ca3af"
    };

    const dict = {
        title: isEs ? "Sistemas a Medida para tu negocio" : "Custom Systems for your business",
        subtitle: isEs 
            ? "Soluciones personalizadas para negocios que necesitan algo más completo que una web tradicional."
            : "Customized solutions for businesses that need something more complete than a traditional website.",
        description: isEs 
            ? "Para proyectos como carritos de compra, paneles administrativos, gestión de pedidos, reservas, usuarios, automatizaciones o sistemas internos. Desarrollamos la herramienta exacta que tu operación necesita."
            : "For projects like shopping carts, administrative panels, order management, bookings, users, automations, or internal systems. We build the exact tool your operation requires.",
        card1Title: isEs ? "Cotización" : "Custom Quote",
        card1Desc: isEs ? "Presupuesto y alcance diseñados según tus necesidades." : "Scope and budget designed according to your exact needs.",
        card2Title: isEs ? "Funciones a Medida" : "Custom Features",
        card2Desc: isEs ? "Paneles de administración, reservas, usuarios y más." : "Admin panels, reservation systems, users roles and more.",
        card3Title: isEs ? "Integraciones" : "Integrations",
        card3Desc: isEs ? "Conectamos tu sistema con pasarelas de pago, APIs o bases de datos." : "Connect with payment gateways, third-party APIs, or databases.",
        card4Title: isEs ? "Soporte Técnico" : "Dedicated Support",
        card4Desc: isEs ? "Soporte y acompañamiento técnico post-lanzamiento según alcance." : "Post-launch technical support and maintenance adjusted to scope.",
        priceText: isEs ? "Desde Gs. 5.900.000" : "Starting from Gs. 5,900,000",
        conclusionTitle: isEs ? "¿Tenés un proyecto en mente?" : "Have a project in mind?",
        conclusionDesc: isEs 
            ? "Agenda una consulta rápida por WhatsApp. Analizamos tu idea y te armamos una propuesta clara con alcances y cotización personalizada."
            : "Schedule a quick consultation via WhatsApp. We analyze your idea and prepare a clear proposal with custom scope and pricing.",
        cta: isEs ? "Cotizar sistema a medida" : "Quote custom system"
    };

    const ctaMsg = whatsappMessages[lang as "es" | "en"]?.sistema || whatsappMessages.es.sistema;

    return (
        <main style={{ minHeight: "100vh", backgroundColor: theme.bg, color: theme.textMain, position: "relative", overflow: "hidden" }}>
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
                        {isEs ? 'Inicio' : 'Home'}
                    </Link>
                    <span style={{ color: '#666' }}>›</span>
                    <Link href={`/${lang}/servicios`} style={{ color: '#999', textDecoration: 'none', transition: 'color 0.3s' }}>
                        {isEs ? 'Servicios' : 'Services'}
                    </Link>
                    <span style={{ color: '#666' }}>›</span>
                    <span style={{ color: theme.accent, fontWeight: 600 }}>
                        {isEs ? 'Sistemas a Medida' : 'Custom Software'}
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
                        {isEs ? 'Servicio Comercial' : 'Commercial Service'}
                    </span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ color: theme.accent }}>★</span>
                        <span style={{ color: '#ccc', fontSize: '14px', fontWeight: 600 }}>
                            {isEs ? 'Desarrollo de Software' : 'Software Development'}
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
                        {dict.title}
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
                            {isEs ? 'Asesor Tecnológico SolvaTech' : 'Technology Advisor SolvaTech'}
                        </p>
                    </div>
                </div>

                {/* Price Badge */}
                <div style={{ alignSelf: "flex-start", padding: "12px 28px", background: "rgba(0, 217, 255, 0.05)", border: `1px solid ${theme.border}`, borderRadius: "9999px" }}>
                    <span style={{ fontSize: "1.125rem", fontWeight: 800, color: theme.accent }}>
                        {dict.priceText}
                    </span>
                </div>

                {/* Subtitle / Desc */}
                <div>
                    <h2 style={{ fontSize: "clamp(1.2rem, 3vw, 1.5rem)", fontWeight: 700, color: "#d1d5db", marginBottom: "16px" }}>
                        {dict.subtitle}
                    </h2>
                    <p style={{ fontSize: "1rem", color: theme.textSide, lineHeight: 1.7, margin: 0 }}>
                        {dict.description}
                    </p>
                </div>


                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "24px", marginTop: "80px" }}>
                    <ServiceCard accent={theme.accent} border={theme.border} cardBg={theme.card} className="service-card-premium">
                        <div style={{ fontSize: "2.25rem", marginBottom: "16px" }}>⚙️</div>
                        <h3 style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: "8px" }}>{dict.card1Title}</h3>
                        <p style={{ color: theme.textSide, fontSize: "0.875rem" }}>{dict.card1Desc}</p>
                    </ServiceCard>
                    <ServiceCard accent={theme.accent} border={theme.border} cardBg={theme.card} className="service-card-premium">
                        <div style={{ fontSize: "2.25rem", marginBottom: "16px" }}>📊</div>
                        <h3 style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: "8px" }}>{dict.card2Title}</h3>
                        <p style={{ color: theme.textSide, fontSize: "0.875rem" }}>{dict.card2Desc}</p>
                    </ServiceCard>
                    <ServiceCard accent={theme.accent} border={theme.border} cardBg={theme.card} className="service-card-premium">
                        <div style={{ fontSize: "2.25rem", marginBottom: "16px" }}>🔒</div>
                        <h3 style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: "8px" }}>{dict.card3Title}</h3>
                        <p style={{ color: theme.textSide, fontSize: "0.875rem" }}>{dict.card3Desc}</p>
                    </ServiceCard>
                    <ServiceCard accent={theme.accent} border={theme.border} cardBg={theme.card} className="service-card-premium">
                        <div style={{ fontSize: "2.25rem", marginBottom: "16px" }}>🚀</div>
                        <h3 style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: "8px" }}>{dict.card4Title}</h3>
                        <p style={{ color: theme.textSide, fontSize: "0.875rem" }}>{dict.card4Desc}</p>
                    </ServiceCard>
                </div>

                <div style={{ marginTop: "96px", backgroundColor: "#0a0a0a", border: `1px solid rgba(0, 217, 255, 0.3)`, padding: "40px", borderRadius: "24px", textAlign: "center" }}>
                    <h2 style={{ fontSize: "clamp(1.875rem, 3vw, 2.25rem)", fontWeight: 700, marginBottom: "24px" }}>{dict.conclusionTitle}</h2>
                    <p style={{ color: theme.textSide, fontSize: "1.125rem", marginBottom: "32px", maxWidth: "800px", margin: "0 auto" }}>
                        {dict.conclusionDesc}
                    </p>
                    <CTAButton 
                        whatsappMessage={ctaMsg}
                        accent={theme.accent}
                        padding="16px 40px"
                        fontSize="1.25rem"
                        fontWeight={800}
                        withShadow={true}
                        eventName="click_cta_sistemas"
                    >
                        {dict.cta}
                    </CTAButton>
                </div>
            </section>

            <style dangerouslySetInnerHTML={{ __html: `
                .service-card-premium {
                    position: relative;
                    border: 1px solid rgba(255, 255, 255, 0.08) !important;
                    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5) !important;
                    background: #050505 !important;
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
