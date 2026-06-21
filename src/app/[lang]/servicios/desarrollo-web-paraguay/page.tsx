import { Metadata } from "next";
import dynamic from "next/dynamic";

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
    const path = "/servicios/desarrollo-web-paraguay";
    const isEs = lang === 'es';
    
    const title = isEs 
      ? "Desarrollo Web en Paraguay | Páginas Web y Landing Pages"
      : "Custom Web Development & Landing Pages";
      
    const description = isEs
      ? "Desarrollamos páginas web y landing pages para negocios en Paraguay (Asunción, Areguá, etc). Más velocidad, mejor SEO y más consultas."
      : "High-performance custom web development and landing pages for your business. Fast, SEO-optimized, and built to convert.";

    const keywords = isEs
      ? ["desarrollo web paraguay", "crear pagina web paraguay", "landing page paraguay", "desarrollo web aregua", "diseño web asuncion", "agencia de software paraguay"]
      : ["custom web development", "landing page design", "seo optimized websites", "web development agency", "nextjs software agency"];

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

export default async function DesarrolloWebParaguayPage({ params }: Props) {
    const { lang } = await params;
    const isEs = lang === 'es';
    
    const theme = {
        bg: "#000000",
        card: "rgba(255, 255, 255, 0.03)",
        border: "rgba(255, 255, 255, 0.1)",
        accent: "#00d9ff",
        accentDark: "#0099cc",
        textMain: "#ffffff",
        textSide: "rgba(255, 255, 255, 0.6)"
    };

    const dict = {
        title: isEs ? "Desarrollo Web en Paraguay" : "Web Development in Paraguay",
        subtitle: isEs ? "Soluciones digitales premium para negocios modernos" : "Premium digital solutions for modern businesses",
        description: isEs 
            ? "En SolvaTech somos expertos en crear páginas web, tiendas online y aplicaciones a medida. Ayudamos a empresas en Asunción y todo Paraguay a destacarse en internet con diseños únicos y rendimiento ultrarrápido."
            : "At SolvaTech we are experts in creating custom websites, online stores, and applications. We help businesses in Asunción and throughout Paraguay stand out on the internet with unique designs and ultra-fast performance.",
        card1Title: isEs ? "Diseño Web Moderno" : "Modern Web Design",
        card1Desc: isEs ? "Páginas web responsivas que se ven increíbles en cualquier dispositivo, listas para captar clientes." : "Responsive websites that look incredible on any device, ready to capture customers.",
        card2Title: isEs ? "Tiendas Online (E-commerce)" : "Online Stores (E-commerce)",
        card2Desc: isEs ? "Vende tus productos por todo Paraguay las 24 horas del día con una plataforma segura y fácil de usar." : "Sell your products all over Paraguay 24 hours a day with a safe and easy-to-use platform.",
        card3Title: isEs ? "Posicionamiento SEO" : "SEO Ranking",
        card3Desc: isEs ? "Estructura técnica optimizada nativamente para que Google te encuentre rápidamente." : "Natively optimized technical structure so Google finds you quickly.",
        conclusion: isEs 
            ? "Nuestra agencia de desarrollo de software en Paraguay entiende las necesidades locales. Ya sea que busques una \"landing page económica\" para empezar o un \"sistema web completo\", utilizamos tecnologías de punta para garantizar el éxito de tu proyecto."
            : "Our software development agency in Paraguay understands local needs. Whether you're looking for an \"affordable landing page\" to start or a \"complete web system\", we use cutting-edge technologies to guarantee the success of your project.",
        cta: isEs ? "Solicitar Presupuesto Gratis" : "Request Free Quote"
    };

    return (
        <main style={{ minHeight: "100vh", backgroundColor: theme.bg, color: theme.textMain, overflowX: "hidden", position: "relative" }}>
            <BackgroundParticles />
            <Navbar />
            
            <section style={{ position: "relative", zIndex: 10, width: "100%", maxWidth: "1200px", margin: "0 auto", padding: "150px 24px 80px", display: "flex", flexDirection: "column", gap: "48px" }}>
                <div style={{ textAlign: "center", display: "flex", flexDirection: "column", gap: "24px" }}>
                    <h1 style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)", fontWeight: 800, lineHeight: 1.1, background: `linear-gradient(135deg, ${theme.accent}, ${theme.accentDark})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                        {dict.title}
                    </h1>
                    <h2 style={{ fontSize: "clamp(1.2rem, 3vw, 1.8rem)", fontWeight: 600, color: "#d1d5db" }}>
                        {dict.subtitle}
                    </h2>
                    <p style={{ fontSize: "clamp(1rem, 2vw, 1.25rem)", maxWidth: "800px", margin: "0 auto", color: "#9ca3af", lineHeight: 1.6 }}>
                        {dict.description}
                    </p>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "32px", marginTop: "48px" }}>
                    <ServiceCard accent={theme.accent} border={"#1f2937"} cardBg={"#0a0a0a"}>
                        <h3 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "16px", color: theme.accent }}>{dict.card1Title}</h3>
                        <p style={{ color: "#9ca3af", lineHeight: 1.5 }}>{dict.card1Desc}</p>
                    </ServiceCard>
                    <ServiceCard accent={theme.accent} border={"#1f2937"} cardBg={"#0a0a0a"}>
                        <h3 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "16px", color: theme.accent }}>{dict.card2Title}</h3>
                        <p style={{ color: "#9ca3af", lineHeight: 1.5 }}>{dict.card2Desc}</p>
                    </ServiceCard>
                    <ServiceCard accent={theme.accent} border={"#1f2937"} cardBg={"#0a0a0a"}>
                        <h3 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "16px", color: theme.accent }}>{dict.card3Title}</h3>
                        <p style={{ color: "#9ca3af", lineHeight: 1.5 }}>{dict.card3Desc}</p>
                    </ServiceCard>
                </div>
                
                <div style={{ marginTop: "64px", textAlign: "center" }}>
                    <p style={{ fontSize: "1.125rem", color: "#9ca3af", marginBottom: "32px", maxWidth: "800px", margin: "0 auto" }}>
                        {dict.conclusion}
                    </p>
                    <CTAButton 
                        href={`/${lang}/#contacto`} 
                        accent={theme.accent}
                        padding="16px 32px"
                        fontSize="1.125rem"
                        fontWeight={700}
                        withShadow={false}
                    >
                        {dict.cta}
                    </CTAButton>
                </div>
            </section>

            <Footer />
        </main>
    );
}
