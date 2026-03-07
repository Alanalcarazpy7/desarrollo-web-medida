import { Metadata } from "next";
import dynamic from "next/dynamic";

const Navbar = dynamic(() => import("@/components/Navbar"), { ssr: false });
const Footer = dynamic(() => import("@/components/Footer"), { ssr: false });
const BackgroundParticles = dynamic(() => import("@/components/BackgroundParticles"), { ssr: false });

export const metadata: Metadata = {
    title: "Sistemas Informáticos en Paraguay | Software a Medida",
    description: "Desarrollo de software y sistemas informáticos a medida en Asunción, Paraguay. Automatiza tu negocio con plataformas web innovadoras y seguras.",
    keywords: ["sistemas informaticos asuncion", "software a medida paraguay", "desarrollo de sistemas empresariales", "programación de software paraguay"],
    openGraph: {
        title: "Sistemas Informáticos y Software | SolvaTech Paraguay",
        description: "Automatización y desarrollo de sistemas a medida para empresas paraguayas.",
        url: "https://solvatech.vercel.app/servicios/sistemas-informaticos-paraguay",
    }
};

export default function SistemasInformaticosParaguayPage() {
    const theme = {
        bg: "#000000",
        card: "#050505",
        border: "#1f2937",
        accent: "#00d9ff",
        textMain: "#ffffff",
        textSide: "#9ca3af"
    };

    return (
        <main style={{ minHeight: "100vh", backgroundColor: theme.bg, color: theme.textMain, position: "relative", overflow: "hidden" }}>
            <BackgroundParticles />
            <Navbar />
            
            <section style={{ position: "relative", zIndex: 10, width: "100%", maxWidth: "1200px", margin: "0 auto", padding: "150px 24px 80px", marginTop: "40px" }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: "24px" }}>
                    <h1 style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)", fontWeight: 800, lineHeight: 1.1, backgroundImage: `linear-gradient(135deg, ${theme.accent}, #ffffff)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                        Sistemas Informáticos en Paraguay
                    </h1>
                    <h2 style={{ fontSize: "clamp(1.2rem, 3vw, 1.8rem)", fontWeight: 600, color: "#d1d5db", maxWidth: "800px", borderBottom: `1px solid ${theme.border}`, paddingBottom: "32px" }}>
                        Software a medida diseñado para hacer crecer y automatizar tu empresa en Asunción y todo el país.
                    </h2>
                    
                    <p style={{ fontSize: "clamp(1.125rem, 2vw, 1.25rem)", maxWidth: "900px", color: theme.textSide, marginTop: "24px", lineHeight: 1.6 }}>
                        Desarrollamos sistemas de gestión, plataformas de control de inventario, software de logística y soluciones empresariales (ERP/CRM) 100% personalizadas. Adaptamos la tecnología a tu negocio, no al revés.
                    </p>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "24px", marginTop: "80px" }}>
                    <div style={{ backgroundColor: theme.card, padding: "24px", borderRadius: "16px", border: `1px solid ${theme.border}`, transition: "border-color 0.3s ease" }}
                         onMouseEnter={(e) => e.currentTarget.style.borderColor = theme.accent}
                         onMouseLeave={(e) => e.currentTarget.style.borderColor = theme.border}>
                        <div style={{ fontSize: "2.25rem", marginBottom: "16px" }}>⚙️</div>
                        <h3 style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: "8px" }}>Automatización</h3>
                        <p style={{ color: theme.textSide, fontSize: "0.875rem" }}>Reduce tareas manuales y optimiza el tiempo de tu equipo en un 60%.</p>
                    </div>
                    <div style={{ backgroundColor: theme.card, padding: "24px", borderRadius: "16px", border: `1px solid ${theme.border}`, transition: "border-color 0.3s ease" }}
                         onMouseEnter={(e) => e.currentTarget.style.borderColor = theme.accent}
                         onMouseLeave={(e) => e.currentTarget.style.borderColor = theme.border}>
                        <div style={{ fontSize: "2.25rem", marginBottom: "16px" }}>📊</div>
                        <h3 style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: "8px" }}>Control Total</h3>
                        <p style={{ color: theme.textSide, fontSize: "0.875rem" }}>Métricas en tiempo real, control de stock y reportes financieros desde cualquier lugar.</p>
                    </div>
                    <div style={{ backgroundColor: theme.card, padding: "24px", borderRadius: "16px", border: `1px solid ${theme.border}`, transition: "border-color 0.3s ease" }}
                         onMouseEnter={(e) => e.currentTarget.style.borderColor = theme.accent}
                         onMouseLeave={(e) => e.currentTarget.style.borderColor = theme.border}>
                        <div style={{ fontSize: "2.25rem", marginBottom: "16px" }}>🔒</div>
                        <h3 style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: "8px" }}>Máxima Seguridad</h3>
                        <p style={{ color: theme.textSide, fontSize: "0.875rem" }}>Tus datos encriptados y respaldados con estándares bancarios internacionales.</p>
                    </div>
                    <div style={{ backgroundColor: theme.card, padding: "24px", borderRadius: "16px", border: `1px solid ${theme.border}`, transition: "border-color 0.3s ease" }}
                         onMouseEnter={(e) => e.currentTarget.style.borderColor = theme.accent}
                         onMouseLeave={(e) => e.currentTarget.style.borderColor = theme.border}>
                        <div style={{ fontSize: "2.25rem", marginBottom: "16px" }}>🚀</div>
                        <h3 style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: "8px" }}>Escalabilidad</h3>
                        <p style={{ color: theme.textSide, fontSize: "0.875rem" }}>Tu sistema informático crece a medida que tu negocio en Paraguay aumenta sus ventas.</p>
                    </div>
                </div>

                <div style={{ marginTop: "96px", backgroundColor: "#0a0a0a", border: `1px solid rgba(0, 217, 255, 0.3)`, padding: "40px", borderRadius: "24px", textAlign: "center" }}>
                    <h2 style={{ fontSize: "clamp(1.875rem, 3vw, 2.25rem)", fontWeight: 700, marginBottom: "24px" }}>¿Buscás programadores en Paraguay?</h2>
                    <p style={{ color: theme.textSide, fontSize: "1.125rem", marginBottom: "32px", maxWidth: "800px", margin: "0 auto" }}>
                        Nuestro equipo de desarrolladores Full Stack está listo para analizar tu proyecto. Agenda una reunión gratuita para discutir tu próximo sistema informático o software empresarial a medida.
                    </p>
                    <a href="/#contacto" 
                       style={{ display: "inline-block", padding: "16px 40px", marginTop: "32px", backgroundColor: theme.accent, color: "#000", fontWeight: 800, fontSize: "1.25rem", borderRadius: "9999px", textDecoration: "none", transition: "all 0.3s ease" }}
                       onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.05)"; e.currentTarget.style.boxShadow = `0 0 20px rgba(0, 217, 255, 0.4)`; }}
                       onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "none"; }}>
                        Cotizar mi Sistema
                    </a>
                </div>
            </section>

            <Footer />
        </main>
    );
}
