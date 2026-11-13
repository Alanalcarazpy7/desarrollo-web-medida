import { Metadata } from "next";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import Link from "next/link";

const Navbar = dynamic(() => import("@/components/Navbar"));
const Footer = dynamic(() => import("@/components/Footer"));
const BackgroundParticles = dynamic(() => import("@/components/BackgroundParticles"));
import ServiceCard from "@/components/ServiceCard";
import ServiceDetailContent from "@/components/ServiceDetailContent";
import CTAButton from "@/components/CTAButton";
import ServiceJsonLd from "@/components/ServiceJsonLd";
import RelatedArticles from "@/components/RelatedArticles";
import { buildServiceJsonLd } from "@/lib/service-schema";
import { whatsappMessages } from "@/lib/whatsapp";

type Props = {
    params: Promise<{ lang: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { lang } = await params;
    const isEs = lang === 'es';

    const baseUrl = "https://solvatech.com.py";
    const path = "/servicios/posicionamiento-google";
    
    const title = isEs 
      ? "Posicionamiento SEO en Google y Maps en Paraguay"
      : "Google SEO & Google Maps Ranking in Paraguay";
    const description = isEs
      ? "SEO para negocios en Paraguay: revisión técnica, páginas de servicios y visibilidad local. Priorizamos búsquedas relevantes y medimos consultas, sin prometer posiciones."
      : "SEO for businesses in Paraguay: technical review, service pages and local visibility. We prioritise relevant searches and measure enquiries without ranking guarantees.";

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
            title: `${title} | SolvaTech`,
            description,
            url: `${baseUrl}/${lang}${path}`,
            locale: isEs ? "es_PY" : "en_US",
            type: "website",
        }
    };
}

export default async function PosicionamientoGooglePage({ params }: Props) {
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
        "Puesta a punto de tu Perfil de Empresa de Google (el que sale en Maps)",
        "Búsqueda de las palabras que tus clientes realmente escriben en Google",
        "Revisión de tu página web: títulos, textos y velocidad",
        "Conexión con las herramientas de Google para seguir tu posición",
        "Reescritura de los textos de la web para que Google entienda de qué trata",
        "Trabajo de ubicación: que aparezcas en las búsquedas de tu zona",
        "Ayuda para conseguir más reseñas y responderlas bien",
        "Reporte mensual: cuántos te encontraron, te visitaron y te llamaron"
    ] : [
        "Tune-up of your Google Business Profile (the one on Maps)",
        "Finding the words your clients actually type into Google",
        "Review of your website: titles, copy and speed",
        "Connection with Google's tools to track your position",
        "Rewriting the website copy so Google understands what it is about",
        "Location work: showing up in searches in your area",
        "Help getting more reviews and replying to them well",
        "Monthly report: how many found you, visited you and called you"
    ];

    const chooseReasons = isEs ? [
        {
            title: "Tráfico Local Directo",
            desc: "Revisamos la información que encuentra quien busca tu servicio y tu zona real de atención. Los resultados locales dependen de varios factores; aparecer no garantiza una llamada."
        },
        {
            title: "Sin Costo por Clic",
            desc: "Google no cobra por cada clic de un resultado orgánico. La revisión, el contenido y el mantenimiento sí necesitan trabajo y presupuesto; los distinguimos de una campaña de anuncios."
        },
        {
            title: "Confianza y Autoridad",
            desc: "Servicios bien explicados, datos de contacto consistentes y referencias reales ayudan a evaluar tu negocio. El contenido debe resolver dudas, además de ser rastreable."
        }
    ] : [
        {
            title: "Direct Local Traffic",
            desc: "We review the information people find when searching for your service and actual service area. Local results depend on several factors; appearing does not guarantee a call."
        },
        {
            title: "No Cost-Per-Click",
            desc: "Google does not charge per click on an organic result. Review, content and maintenance still require work and a budget; we distinguish these from an advertising campaign."
        },
        {
            title: "Trust and Authority",
            desc: "Clear service explanations, consistent contact details and real references help people assess your business. Content should answer questions as well as be crawlable."
        }
    ];

    const faqs = isEs ? [
        {
            q: "¿En cuánto tiempo se empiezan a ver los resultados del SEO local?",
            a: "Depende del estado del sitio, el rastreo y la competencia. Acordamos entregables y revisiones de períodos equivalentes; no una fecha de posicionamiento. Algunas correcciones se comprueban al publicarse y su efecto en búsquedas puede tardar más."
        },
        {
            q: "¿Necesito tener una página web para usar el servicio de Google Maps?",
            a: "Un negocio elegible puede tener un Perfil de Empresa sin web. Un sitio propio permite explicar servicios y condiciones con más detalle. La elegibilidad, verificación y aparición del perfil dependen de las reglas de Google."
        },
        {
            q: "¿Qué pasa si suspendo el servicio mensual de SEO?",
            a: "Las mejoras publicadas permanecen mientras mantengas el sitio. Al pausar se detienen las tareas recurrentes; la posición puede variar con el contenido, la competencia y los cambios del buscador, sin que podamos anticipar una caída concreta."
        }
    ] : [
        {
            q: "How long does it take to start seeing local SEO results?",
            a: "It depends on site condition, crawling and competition. We agree deliverables and equivalent-period reviews, not a ranking date. Some fixes can be checked at publication while their search effects may take longer."
        },
        {
            q: "Do I need a website to use the Google Maps optimization service?",
            a: "An eligible business can have a Business Profile without a website. Your own site explains services and terms in more depth. Profile eligibility, verification and appearance depend on Google's rules."
        },
        {
            q: "What happens if I pause the monthly SEO service?",
            a: "Published improvements remain while the site is maintained. Pausing stops recurring tasks; rankings can change with content, competition and search engine updates, without a predictable decline."
        }
    ];

    const dict = {
        h1: isEs ? "Posicionamiento en Google y Maps" : "Google & Google Maps SEO Ranking",
        whyTitle: isEs ? "Mejorá la información que encuentra tu próximo cliente" : "Improve what your next customer finds",
        whyDesc: isEs 
            ? "Revisamos cómo se presentan tu negocio y tus servicios en búsquedas. Organizamos las prioridades técnicas y de contenido para que una persona de tu zona pueda entender qué ofrecés y cómo consultar. Si corresponde, revisamos también el Perfil de Empresa."
            : "We review how your business and services appear in search. Technical and content priorities help people in your area understand your offer and how to enquire. Where applicable, we also review the Business Profile.",
        featuresTitle: isEs ? "¿Qué incluye este servicio?" : "What is included in this service?",
        ventajasTitle: isEs ? "Ventajas del SEO Local" : "Local SEO Advantages",
        faqsTitle: isEs ? "Preguntas Frecuentes" : "Frequently Asked Questions",
        ctaBtn: isEs ? "Quiero mejorar mi posicionamiento en Google" : "I want to improve my Google search ranking",
        price: isEs ? "Desde Gs. 275.000 mensual" : "Starting at Gs. 275,000 monthly",
        metaBadge: isEs ? "Servicio de Optimización" : "Optimization Service",
        metaSub: isEs ? "SEO Local" : "Local SEO",
        advisorRole: isEs ? "Asesor Tecnológico SolvaTech" : "Technology Advisor SolvaTech",
        breadcrumbsHome: isEs ? "Inicio" : "Home",
        breadcrumbsServices: isEs ? "Servicios" : "Services",
        breadcrumbsService: isEs ? "Google & Maps SEO" : "Google & Maps SEO",
    };

    const ctaMsg = whatsappMessages[lang as "es" | "en"]?.seo || whatsappMessages.es.seo;

    const serviceLd = buildServiceJsonLd({
        lang,
        path: "/servicios/posicionamiento-google",
        name: dict.h1,
        description: dict.whyDesc,
        breadcrumbLabel: dict.breadcrumbsService,
        breadcrumbHome: dict.breadcrumbsHome,
        breadcrumbServices: dict.breadcrumbsServices,
        faqs,
        serviceType: lang === "en" ? "Local SEO" : "Posicionamiento SEO local",
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

                <ServiceDetailContent lang={lang} slug="posicionamiento-google" />

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
                        eventName="click_cta_seo"
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

            <RelatedArticles
                lang={lang}
                slugs={[
                    "guia-seo-local-paraguay",
                    "importancia-velocidad-web",
                    "pagina-web-para-gimnasios-paraguay",
                ]}
            />

            <Footer />
        </main>
    );
}
