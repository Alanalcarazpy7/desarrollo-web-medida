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
    const path = "/servicios/desarrollo-web-catalogo";
    
    const title = isEs 
      ? "Catálogo Digital y Menú Online en Paraguay | SolvaTech"
      : "Digital Catalog & Online Menu in Paraguay | SolvaTech";
    const description = isEs
      ? "Desarrollo de catálogos digitales interactivos y menús online con conexión directa a pedidos por WhatsApp en Paraguay. Ideal para tiendas y comidas."
      : "Interactive digital catalogs and online menus with direct WhatsApp ordering in Paraguay. Ideal for stores and restaurants.";

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

export default async function DesarrolloWebCatalogoPage({ params }: Props) {
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
        "Presentación interactiva organizada por categorías",
        "Fotos nítidas de productos, platos o servicios",
        "Descripción detallada con precio visible",
        "Buscador interno rápido para tus clientes",
        "Sistema de carrito de pedidos integrado",
        "Botón final para enviar el pedido ordenado a tu WhatsApp",
        "Panel simple para editar precios y stock",
        "Hosting optimizado para imágenes incluido por 1 año"
    ] : [
        "Interactive layout organized by categories",
        "Sharp photos of products, dishes, or services",
        "Detailed descriptions with visible pricing",
        "Quick internal search engine for your clients",
        "Integrated ordering shopping cart system",
        "Checkout button to send the structured order to your WhatsApp",
        "Simple dashboard to edit prices and stock",
        "Optimized hosting for images included for 1 year"
    ];

    const chooseReasons = isEs ? [
        {
            title: "Pedidos Rápidos y Sin Comisiones",
            desc: "A diferencia de las plataformas de delivery tradicionales, no pagás comisiones sobre tus ventas. Todo el margen queda en tu negocio."
        },
        {
            title: "Facilidad de Uso",
            desc: "Tus clientes no tienen que descargar ninguna aplicación pesada. Acceden desde un enlace web, eligen sus productos y te escriben directamente."
        },
        {
            title: "Autogestionable",
            desc: "Te entregamos un panel administrativo intuitivo para que puedas subir productos nuevos, cambiar precios o desactivar artículos sin depender de un programador."
        }
    ] : [
        {
            title: "Fast Orders & Zero Commissions",
            desc: "Unlike traditional delivery apps, you do not pay commissions on your sales. All the margin stays in your business."
        },
        {
            title: "Easy to Use",
            desc: "Your clients do not need to download heavy apps. They access via a web link, select items, and message you directly."
        },
        {
            title: "Self-Managed",
            desc: "We deliver an intuitive admin panel so you can add new items, change prices, or disable products without depending on a developer."
        }
    ];

    const faqs = isEs ? [
        {
            q: "¿Cómo se reciben los pedidos del catálogo?",
            a: "Cuando el cliente termina de seleccionar los productos en el catálogo, hace clic en 'Enviar pedido'. Esto abre su WhatsApp con un mensaje prellenado que contiene el listado de productos, cantidades, precios, método de pago y la dirección de envío ya organizada."
        },
        {
            q: "¿Tengo un límite de productos a subir?",
            a: "Nosotros te cargamos los primeros 25-30 productos para dejar la estructura lista. Luego, a través del panel de control, podés subir tantos productos como necesites de manera ilimitada."
        },
        {
            q: "¿Es apto para restaurantes y locales de comida?",
            a: "Sí, es excelente como Menú Online o Menú Digital QR. Los clientes en las mesas o desde sus casas pueden escanear el código, armar su pedido y enviártelo al instante."
        }
    ] : [
        {
            q: "How are catalog orders received?",
            a: "When the customer finishes selecting the products in the catalog, they click on 'Send order'. This opens their WhatsApp with a prefilled message containing the list of products, quantities, prices, payment method, and shipping address already organized."
        },
        {
            q: "Is there a limit on the number of products I can upload?",
            a: "We upload the first 25-30 products to leave the structure ready. Afterwards, you can upload as many products as you need via the admin panel, with no limit."
        },
        {
            q: "Is it suitable for restaurants and food spots?",
            a: "Yes, it is excellent as a QR digital menu. Customers at tables or from home can scan the code, build their order, and send it to you instantly."
        }
    ];

    const dict = {
        h1: isEs ? "Catálogo Digital / Menú Online" : "Digital Catalog / Online Menu",
        whyTitle: isEs ? "Ventas Directas y Sin Intermediarios" : "Direct Sales & No Intermediaries",
        whyDesc: isEs 
            ? "Ideal para tiendas, restaurantes, cafeterías, emprendimientos de productos personalizados, accesorios, comidas y negocios locales que reciben pedidos por WhatsApp. Este sistema elimina la fricción de la compra: tus clientes ven de forma clara lo que vendés con fotos y precios actualizados, cargan al carrito y te escriben con el pedido ya listo, ahorrándote horas de conversación y errores manuales."
            : "Ideal for stores, restaurants, cafes, customized product businesses, accessories, meals, and local shops that receive orders via WhatsApp. This system removes purchase friction: your clients clearly see what you sell with updated photos and prices, add to cart, and message you with the order ready, saving you hours of chat and manual mistakes.",
        featuresTitle: isEs ? "¿Qué incluye este servicio?" : "What is included in this service?",
        ventajasTitle: isEs ? "Ventajas Comerciales" : "Commercial Advantages",
        faqsTitle: isEs ? "Preguntas Frecuentes" : "Frequently Asked Questions",
        ctaBtn: isEs ? "Quiero mi catálogo digital" : "Request my digital catalog",
        price: isEs ? "Desde Gs. 650.000 en promoción (Regular Gs. 750.000)" : "Starting at Gs. 650,000 on promo (Regular Gs. 750,000)",
        metaBadge: isEs ? "Servicio Comercial" : "Commercial Service",
        metaSub: isEs ? "Catálogo Digital" : "Digital Catalog",
        advisorRole: isEs ? "Asesor Tecnológico SolvaTech" : "Technology Advisor SolvaTech",
        breadcrumbsHome: isEs ? "Inicio" : "Home",
        breadcrumbsServices: isEs ? "Servicios" : "Services",
        breadcrumbsService: isEs ? "Catálogo / Menú" : "Catalog / Menu",
    };

    const ctaMsg = whatsappMessages[lang as "es" | "en"]?.catalogo || whatsappMessages.es.catalogo;

    const serviceLd = buildServiceJsonLd({
        lang,
        path: "/servicios/desarrollo-web-catalogo",
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
                        eventName="click_cta_catalogo"
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
