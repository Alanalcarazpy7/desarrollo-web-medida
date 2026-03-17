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
    const baseUrl = "https://solvatech.vercel.app";
    const path = "/servicios/desarrollo-web-paraguay";
    const isEs = lang === 'es';
    
    const title = isEs 
      ? "Desarrollo Web en Paraguay | Páginas Web y Landing Pages"
      : "Custom Web Development & Landing Pages | SolvaTech";
      
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

export default async function DesarrolloWebParaguayPage({ params }: Props) {
    const { lang } = await params;
    const theme = {
        bg: "#000000",
        card: "rgba(255, 255, 255, 0.03)",
        border: "rgba(255, 255, 255, 0.1)",
        accent: "#00d9ff",
        accentDark: "#0099cc",
        textMain: "#ffffff",
        textSide: "rgba(255, 255, 255, 0.6)"
    };

    return (
        <main style={{ minHeight: "100vh", backgroundColor: theme.bg, color: theme.textMain, overflowX: "hidden", position: "relative" }}>
            <BackgroundParticles />
            <Navbar />
            
            <section style={{ position: "relative", zIndex: 10, width: "100%", maxWidth: "1200px", margin: "0 auto", padding: "150px 24px 80px", display: "flex", flexDirection: "column", gap: "48px" }}>
                <div style={{ textAlign: "center", display: "flex", flexDirection: "column", gap: "24px" }}>
                    <h1 style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)", fontWeight: 800, lineHeight: 1.1, background: `linear-gradient(135deg, ${theme.accent}, ${theme.accentDark})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                        Desarrollo Web en Paraguay
                    </h1>
                    <h2 style={{ fontSize: "clamp(1.2rem, 3vw, 1.8rem)", fontWeight: 600, color: "#d1d5db" }}>
                        Soluciones digitales premium para negocios modernos
                    </h2>
                    <p style={{ fontSize: "clamp(1rem, 2vw, 1.25rem)", maxWidth: "800px", margin: "0 auto", color: "#9ca3af", lineHeight: 1.6 }}>
                        En SolvaTech somos expertos en crear páginas web, tiendas online y aplicaciones a medida. 
                        Ayudamos a empresas en Asunción y todo Paraguay a destacarse en internet con diseños únicos 
                        y rendimiento ultrarrápido.
                    </p>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "32px", marginTop: "48px" }}>
                    <ServiceCard accent={theme.accent} border={"#1f2937"} cardBg={"#0a0a0a"}>
                        <h3 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "16px", color: theme.accent }}>Diseño Web Moderno</h3>
                        <p style={{ color: "#9ca3af", lineHeight: 1.5 }}>Páginas web responsivas que se ven increíbles en cualquier dispositivo, listas para captar clientes.</p>
                    </ServiceCard>
                    <ServiceCard accent={theme.accent} border={"#1f2937"} cardBg={"#0a0a0a"}>
                        <h3 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "16px", color: theme.accent }}>Tiendas Online (E-commerce)</h3>
                        <p style={{ color: "#9ca3af", lineHeight: 1.5 }}>Vende tus productos por todo Paraguay las 24 horas del día con una plataforma segura y fácil de usar.</p>
                    </ServiceCard>
                    <ServiceCard accent={theme.accent} border={"#1f2937"} cardBg={"#0a0a0a"}>
                        <h3 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "16px", color: theme.accent }}>Posicionamiento SEO</h3>
                        <p style={{ color: "#9ca3af", lineHeight: 1.5 }}>Estructura técnica optimizada nativamente para que Google te encuentre rápidamente.</p>
                    </ServiceCard>
                </div>
                
                <div style={{ marginTop: "64px", textAlign: "center" }}>
                    <p style={{ fontSize: "1.125rem", color: "#9ca3af", marginBottom: "32px", maxWidth: "800px", margin: "0 auto" }}>
                        Nuestra agencia de desarrollo de software en Paraguay entiende las necesidades locales. 
                        Ya sea que busques una "landing page económica" para empezar o un "sistema web completo",
                        utilizamos tecnologías de punta para garantizar el éxito de tu proyecto.
                    </p>
                    <CTAButton 
                        href="/#contacto" 
                        accent={theme.accent}
                        padding="16px 32px"
                        fontSize="1.125rem"
                        fontWeight={700}
                        withShadow={false}
                    >
                        Solicitar Presupuesto Gratis
                    </CTAButton>
                </div>
            </section>

            <Footer />
        </main>
    );
}
