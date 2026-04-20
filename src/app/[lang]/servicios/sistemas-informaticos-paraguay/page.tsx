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
    const path = "/servicios/sistemas-informaticos-paraguay";
    const isEs = lang === 'es';

    const title = isEs
      ? "Software a Medida en Paraguay | Sistemas Informáticos y Web"
      : "Custom Software Development | Enterprise Web Systems";

    const description = isEs
      ? "Creamos sistemas informáticos y software a medida en Paraguay (Asunción) para automatizar procesos y hacer crecer tu empresa."
      : "Get custom software and enterprise web systems to automate your business processes and scale your operations globally.";

    const keywords = isEs
      ? ["sistemas informaticos asuncion", "software a medida paraguay", "desarrollo de sistemas empresariales", "programación de software paraguay", "programadores en paraguay"]
      : ["custom software development", "enterprise web systems", "business automation software", "custom erp crm development", "software programming agency"];
    
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
        textMain: "#ffffff",
        textSide: "#9ca3af"
    };

    const dict = {
        title: isEs ? "Sistemas Informáticos en Paraguay" : "Desktop and Web Systems in Paraguay",
        subtitle: isEs 
            ? "Software a medida diseñado para hacer crecer y automatizar tu empresa en Asunción y todo el país."
            : "Custom software designed to grow and automate your enterprise globally.",
        description: isEs 
            ? "Desarrollamos sistemas de gestión, plataformas de control de inventario, software de logística y soluciones empresariales (ERP/CRM) 100% personalizadas. Adaptamos la tecnología a tu negocio, no al revés."
            : "We develop management systems, inventory control platforms, logistics software, and 100% custom enterprise solutions (ERP/CRM). We adapt technology to your business, not the other way around.",
        card1Title: isEs ? "Automatización" : "Automation",
        card1Desc: isEs ? "Reduce tareas manuales y optimiza el tiempo de tu equipo en un 60%." : "Reduce manual tasks and optimize your team's time by 60%.",
        card2Title: isEs ? "Control Total" : "Total Control",
        card2Desc: isEs ? "Métricas en tiempo real, control de stock y reportes financieros desde cualquier lugar." : "Real-time metrics, stock control, and financial reporting from anywhere.",
        card3Title: isEs ? "Máxima Seguridad" : "Maximum Security",
        card3Desc: isEs ? "Tus datos encriptados y respaldados con estándares bancarios internacionales." : "Your data encrypted and backed up with international banking standards.",
        card4Title: isEs ? "Escalabilidad" : "Scalability",
        card4Desc: isEs ? "Tu sistema informático crece a medida que tu negocio en Paraguay aumenta sus ventas." : "Your IT system grows as your business increases its sales.",
        conclusionTitle: isEs ? "¿Buscás programadores en Paraguay?" : "Looking for skilled developers?",
        conclusionDesc: isEs 
            ? "Nuestro equipo de desarrolladores Full Stack está listo para analizar tu proyecto. Agenda una reunión gratuita para discutir tu próximo sistema informático o software empresarial a medida."
            : "Our team of Full Stack developers is ready to analyze your project. Schedule a free meeting to discuss your next IT system or custom enterprise software.",
        cta: isEs ? "Cotizar mi Sistema" : "Quote my System"
    };

    return (
        <main style={{ minHeight: "100vh", backgroundColor: theme.bg, color: theme.textMain, position: "relative", overflow: "hidden" }}>
            <BackgroundParticles />
            <Navbar />
            
            <section style={{ position: "relative", zIndex: 10, width: "100%", maxWidth: "1200px", margin: "0 auto", padding: "150px 24px 80px", marginTop: "40px" }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: "24px" }}>
                    <h1 style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)", fontWeight: 800, lineHeight: 1.1, backgroundImage: `linear-gradient(135deg, ${theme.accent}, #ffffff)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                        {dict.title}
                    </h1>
                    <h2 style={{ fontSize: "clamp(1.2rem, 3vw, 1.8rem)", fontWeight: 600, color: "#d1d5db", maxWidth: "800px", borderBottom: `1px solid ${theme.border}`, paddingBottom: "32px" }}>
                        {dict.subtitle}
                    </h2>
                    
                    <p style={{ fontSize: "clamp(1.125rem, 2vw, 1.25rem)", maxWidth: "900px", color: theme.textSide, marginTop: "24px", lineHeight: 1.6 }}>
                        {dict.description}
                    </p>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "24px", marginTop: "80px" }}>
                    <ServiceCard accent={theme.accent} border={theme.border} cardBg={theme.card}>
                        <div style={{ fontSize: "2.25rem", marginBottom: "16px" }}>⚙️</div>
                        <h3 style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: "8px" }}>{dict.card1Title}</h3>
                        <p style={{ color: theme.textSide, fontSize: "0.875rem" }}>{dict.card1Desc}</p>
                    </ServiceCard>
                    <ServiceCard accent={theme.accent} border={theme.border} cardBg={theme.card}>
                        <div style={{ fontSize: "2.25rem", marginBottom: "16px" }}>📊</div>
                        <h3 style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: "8px" }}>{dict.card2Title}</h3>
                        <p style={{ color: theme.textSide, fontSize: "0.875rem" }}>{dict.card2Desc}</p>
                    </ServiceCard>
                    <ServiceCard accent={theme.accent} border={theme.border} cardBg={theme.card}>
                        <div style={{ fontSize: "2.25rem", marginBottom: "16px" }}>🔒</div>
                        <h3 style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: "8px" }}>{dict.card3Title}</h3>
                        <p style={{ color: theme.textSide, fontSize: "0.875rem" }}>{dict.card3Desc}</p>
                    </ServiceCard>
                    <ServiceCard accent={theme.accent} border={theme.border} cardBg={theme.card}>
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
                        href={`/${lang}/#contacto`} 
                        accent={theme.accent}
                        padding="16px 40px"
                        fontSize="1.25rem"
                        fontWeight={800}
                        withShadow={true}
                    >
                        {dict.cta}
                    </CTAButton>
                </div>
            </section>

            <Footer />
        </main>
    );
}
