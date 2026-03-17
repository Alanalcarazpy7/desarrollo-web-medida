import { Metadata } from "next";
import dynamic from "next/dynamic";

const Navbar = dynamic(() => import("@/components/Navbar"));
const Footer = dynamic(() => import("@/components/Footer"));
const BackgroundParticles = dynamic(() => import("@/components/BackgroundParticles"));

export const metadata: Metadata = {
    title: "Desarrollo Web en Paraguay | Páginas y Sistemas a Medida",
    description: "Agencia de desarrollo web en Paraguay. Creamos páginas web modernas, tiendas online y software a medida para potenciar negocios en Asunción y todo el país.",
    keywords: ["desarrollo web paraguay", "crear pagina web paraguay", "agencia de software paraguay", "diseño web asuncion", "programadores en paraguay"],
    openGraph: {
        title: "Desarrollo Web en Paraguay | SolvaTech",
        description: "Expertos en páginas web y software a medida en Paraguay.",
        url: "https://solvatech.vercel.app/servicios/desarrollo-web-paraguay",
    }
};

export default function DesarrolloWebParaguayPage() {
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
                    <article style={{ padding: "32px", borderRadius: "16px", backgroundColor: "#0a0a0a", border: `1px solid #1f2937`, transition: "border-color 0.3s ease" }}
                             onMouseEnter={(e) => e.currentTarget.style.borderColor = theme.accent}
                             onMouseLeave={(e) => e.currentTarget.style.borderColor = "#1f2937"}>
                        <h3 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "16px", color: theme.accent }}>Diseño Web Moderno</h3>
                        <p style={{ color: "#9ca3af", lineHeight: 1.5 }}>Páginas web responsivas que se ven increíbles en cualquier dispositivo, listas para captar clientes.</p>
                    </article>
                    <article style={{ padding: "32px", borderRadius: "16px", backgroundColor: "#0a0a0a", border: `1px solid #1f2937`, transition: "border-color 0.3s ease" }}
                             onMouseEnter={(e) => e.currentTarget.style.borderColor = theme.accent}
                             onMouseLeave={(e) => e.currentTarget.style.borderColor = "#1f2937"}>
                        <h3 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "16px", color: theme.accent }}>Tiendas Online (E-commerce)</h3>
                        <p style={{ color: "#9ca3af", lineHeight: 1.5 }}>Vende tus productos por todo Paraguay las 24 horas del día con una plataforma segura y fácil de usar.</p>
                    </article>
                    <article style={{ padding: "32px", borderRadius: "16px", backgroundColor: "#0a0a0a", border: `1px solid #1f2937`, transition: "border-color 0.3s ease" }}
                             onMouseEnter={(e) => e.currentTarget.style.borderColor = theme.accent}
                             onMouseLeave={(e) => e.currentTarget.style.borderColor = "#1f2937"}>
                        <h3 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "16px", color: theme.accent }}>Posicionamiento SEO</h3>
                        <p style={{ color: "#9ca3af", lineHeight: 1.5 }}>Estructura técnica optimizada nativamente para que Google te encuentre rápidamente.</p>
                    </article>
                </div>
                
                <div style={{ marginTop: "64px", textAlign: "center" }}>
                    <p style={{ fontSize: "1.125rem", color: "#9ca3af", marginBottom: "32px", maxWidth: "800px", margin: "0 auto" }}>
                        Nuestra agencia de desarrollo de software en Paraguay entiende las necesidades locales. 
                        Ya sea que busques una "landing page económica" para empezar o un "sistema web completo",
                        utilizamos tecnologías de punta para garantizar el éxito de tu proyecto.
                    </p>
                    <a href="/#contacto" 
                       style={{ display: "inline-block", padding: "16px 32px", marginTop: "32px", borderRadius: "9999px", backgroundColor: theme.accent, color: "#000", fontWeight: 700, fontSize: "1.125rem", textDecoration: "none", transition: "transform 0.2s ease" }}
                       onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05)"}
                       onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}>
                        Solicitar Presupuesto Gratis
                    </a>
                </div>
            </section>

            <Footer />
        </main>
    );
}
