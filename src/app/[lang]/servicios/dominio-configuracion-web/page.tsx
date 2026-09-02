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
    const path = "/servicios/dominio-configuracion-web";

    const title = isEs
      ? "Registro de Dominio y Configuración Web en Paraguay | SolvaTech"
      : "Domain Registration & Web Setup in Paraguay | SolvaTech";
    const description = isEs
      ? "Registro de dominios profesionales (incluyendo .com.py), configuración de DNS y correos corporativos. Dejamos tu web lista y funcionando desde el día uno."
      : "Professional domain registration (including .com.py), DNS setup, and corporate email. We leave your website ready and working from day one.";

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

export default async function DominioConfiguracionWebPage({ params }: Props) {
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
        "Registro de tu dominio personalizado (.com, .net, .com.py)",
        "Gestión completa del registro oficial ante NIC.py para dominios .com.py",
        "Configuración y vinculación de DNS apuntando a tu hosting o plataforma",
        "Creación de correos corporativos profesionales (ej. info@tuempresa.com)",
        "Configuración inicial de tu web para que quede lista y funcionando",
        "Asesoramiento en la elección del nombre de dominio más adecuado para tu marca",
        "Protección de privacidad WHOIS incluida",
        "Soporte técnico durante todo el proceso de activación"
    ] : [
        "Custom domain name registration (.com, .net, .com.py)",
        "Full management of the official registration with NIC.py for .com.py domains",
        "DNS setup and linking pointing to your hosting or platform",
        "Creation of professional corporate emails (e.g. info@yourcompany.com)",
        "Initial setup of your website so it's ready and working",
        "Guidance choosing the domain name that best fits your brand",
        "WHOIS privacy protection included",
        "Technical support throughout the entire activation process"
    ];

    const chooseReasons = isEs ? [
        {
            title: "Gestión de Dominio .com.py",
            desc: "Te ayudamos con todo el proceso burocrático y técnico de registro ante el Centro Nacional de Computación (CNC / NIC-PY) para delegar de forma exitosa tu dominio nacional oficial."
        },
        {
            title: "Configuración Lista para Usar",
            desc: "No tenés que tocar nada técnico: nosotros configuramos el DNS, los correos corporativos y dejamos tu web funcionando de punta a punta."
        },
        {
            title: "Asesoramiento en la Elección del Nombre",
            desc: "Te ayudamos a elegir el nombre de dominio que mejor represente tu marca y sea fácil de recordar para tus clientes."
        }
    ] : [
        {
            title: "Domain .com.py Management",
            desc: "We assist you with the entire bureaucratic and technical registration process at the National Computing Center (CNC / NIC-PY) to successfully delegate your official national domain."
        },
        {
            title: "Ready-to-Use Setup",
            desc: "You don't have to touch anything technical: we configure the DNS, corporate emails, and leave your website fully working end to end."
        },
        {
            title: "Guidance Choosing the Name",
            desc: "We help you choose the domain name that best represents your brand and is easy for your customers to remember."
        }
    ];

    const faqs = isEs ? [
        {
            q: "¿Qué diferencia hay entre Hosting y Dominio?",
            a: "El dominio es el nombre único de tu página web (ej. solvatech.com.py) que los clientes escriben en su navegador. El hosting es el espacio físico de almacenamiento en un servidor de internet donde se guardan tus correos, fotos y el código de tu sitio. Son dos servicios separados y complementarios."
        },
        {
            q: "¿Cómo se gestiona el dominio oficial .com.py?",
            a: "Los dominios con terminación .py pertenecen al registro oficial de Paraguay y se gestionan a través del NIC.py. Nos encargamos de realizar la solicitud de registro, el pago de tasas de delegación y el mantenimiento DNS para que no tengas que lidiar con trámites complejos."
        },
        {
            q: "¿Qué pasa si no renuevo mi dominio a tiempo?",
            a: "Te avisamos con anticipación antes de cada vencimiento. Si un dominio no se renueva a tiempo corre riesgo de quedar disponible para que otra persona lo registre, así que te acompañamos para que eso nunca pase."
        }
    ] : [
        {
            q: "What is the difference between Hosting and Domain?",
            a: "The domain is the unique name of your website (e.g. solvatech.com.py) that clients type in their browser. Hosting is the physical storage space on an internet server where your emails, photos, and site code are saved. They're two separate, complementary services."
        },
        {
            q: "How is the official .com.py domain managed?",
            a: "Domains ending in .py belong to the official registry of Paraguay and are managed through NIC.py. We handle the registration request, payment of delegation fees, and DNS maintenance so you don't have to deal with complex paperwork."
        },
        {
            q: "What happens if I don't renew my domain on time?",
            a: "We notify you ahead of each renewal date. If a domain isn't renewed on time, it risks becoming available for someone else to register, so we make sure that never happens."
        }
    ];

    const dict = {
        h1: isEs ? "Dominio + Configuración Web" : "Domain + Web Setup",
        whyTitle: isEs ? "Tu Dirección Profesional en Internet" : "Your Professional Address on the Internet",
        whyDesc: isEs
            ? "Un dominio propio es la base de tu identidad online: reemplaza direcciones genéricas por una dirección profesional con tu marca. Nos encargamos de todo el registro, la configuración de DNS y los correos corporativos, dejando tu web lista para funcionar sin que tengas que tocar nada técnico."
            : "A custom domain is the foundation of your online identity: it replaces generic addresses with a professional one carrying your brand. We handle the entire registration, DNS setup, and corporate emails, leaving your website ready to work without you touching anything technical.",
        featuresTitle: isEs ? "¿Qué incluye este plan?" : "What is included in this plan?",
        ventajasTitle: isEs ? "Ventajas Técnicas" : "Technical Advantages",
        faqsTitle: isEs ? "Preguntas Frecuentes" : "Frequently Asked Questions",
        ctaBtn: isEs ? "Registrar mi dominio" : "Register my domain",
        price: isEs ? "Gs. 250.000 / año" : "Gs. 250,000 / year",
        metaBadge: isEs ? "Servicio Comercial" : "Commercial Service",
        metaSub: isEs ? "Identidad Web" : "Web Identity",
        advisorRole: isEs ? "Asesor Tecnológico SolvaTech" : "Technology Advisor SolvaTech",
        breadcrumbsHome: isEs ? "Inicio" : "Home",
        breadcrumbsServices: isEs ? "Servicios" : "Services",
        breadcrumbsService: isEs ? "Dominio y Configuración" : "Domain & Setup",
    };

    const ctaMsg = whatsappMessages[lang as "es" | "en"]?.dominioConfiguracion || whatsappMessages.es.dominioConfiguracion;

    const serviceLd = buildServiceJsonLd({
        lang,
        path: "/servicios/dominio-configuracion-web",
        name: dict.h1,
        description: dict.whyDesc,
        breadcrumbLabel: dict.breadcrumbsService,
        breadcrumbHome: dict.breadcrumbsHome,
        breadcrumbServices: dict.breadcrumbsServices,
        faqs,
        serviceType: lang === "en" ? "Domain registration & setup" : "Registro de dominio y configuración",
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
                        eventName="click_cta_dominio_configuracion"
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
