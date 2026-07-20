import { Metadata } from "next";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import Link from "next/link";

const Navbar = dynamic(() => import("@/components/Navbar"));
const Footer = dynamic(() => import("@/components/Footer"));
const BackgroundParticles = dynamic(() => import("@/components/BackgroundParticles"));

type Props = {
    params: Promise<{ lang: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { lang } = await params;
    const isEs = lang === "es";
    const baseUrl = "https://solvatech.com.py";
    const path = "/politica-de-privacidad";

    const title = isEs ? "Política de Privacidad | SolvaTech" : "Privacy Policy | SolvaTech";
    const description = isEs
        ? "Cómo SolvaTech recopila, usa y protege tus datos personales, incluyendo el uso de cookies."
        : "How SolvaTech collects, uses, and protects your personal data, including our use of cookies.";

    return {
        title,
        description,
        robots: { index: true, follow: true },
        alternates: {
            canonical: `${baseUrl}/${lang}${path}`,
            languages: {
                es: `${baseUrl}/es${path}`,
                "es-PY": `${baseUrl}/es${path}`,
                en: `${baseUrl}/en${path}`,
                "x-default": `${baseUrl}/es${path}`,
            },
        },
    };
}

export default async function PoliticaDePrivacidadPage({ params }: Props) {
    const { lang } = await params;
    const isEs = lang === "es";

    if (lang !== "es" && lang !== "en") {
        notFound();
    }

    const theme = {
        bg: "#000000",
        accent: "#00d9ff",
        accentDark: "#0099cc",
        textMain: "#ffffff",
    };

    const dict = {
        breadcrumbsHome: isEs ? "Inicio" : "Home",
        breadcrumbsPage: isEs ? "Política de Privacidad" : "Privacy Policy",
        badge: isEs ? "Legal" : "Legal",
        h1: isEs ? "Política de Privacidad" : "Privacy Policy",
        updated: isEs ? "Última actualización: 19 de julio de 2026" : "Last updated: July 19, 2026",
    };

    const sections = isEs
        ? [
              {
                  title: "1. Quiénes somos",
                  body: [
                      "Esta Política de Privacidad describe cómo SolvaTech (Alan Alcaraz, Paraguay) recopila, usa y protege la información de quienes visitan solvatech.com.py o contratan nuestros servicios de desarrollo web, sistemas, hosting, dominio, SEO y soporte técnico.",
                  ],
              },
              {
                  title: "2. Qué información recopilamos",
                  body: [
                      "Datos que nos das directamente: cuando completás el formulario de contacto o nos escribís por WhatsApp o correo, recibimos tu nombre, teléfono y/o correo electrónico, y el contenido del mensaje que nos envíes.",
                      "Datos de navegación: usamos Google Analytics para entender de forma agregada cómo se usa el sitio (páginas visitadas, tiempo de permanencia, dispositivo, ubicación aproximada). Esta información no identifica a una persona por su nombre.",
                  ],
              },
              {
                  title: "3. Para qué usamos tu información",
                  body: [
                      "Usamos los datos de contacto exclusivamente para responder tu consulta, prepararte una propuesta o cotización, y darle seguimiento a un proyecto en caso de que decidas contratarnos. Usamos los datos de navegación (Google Analytics) para entender qué partes del sitio funcionan bien y mejorar la experiencia general.",
                      "No vendemos ni alquilamos tu información personal a terceros con fines de marketing.",
                  ],
              },
              {
                  title: "4. Cookies y tecnologías similares",
                  body: [
                      "El sitio utiliza cookies de Google Analytics para medir el uso general del sitio de forma agregada. Estas cookies no se usan para identificarte personalmente ni para mostrarte publicidad de terceros.",
                      "Podés bloquear o eliminar las cookies desde la configuración de tu navegador en cualquier momento. Tené en cuenta que esto no afecta el funcionamiento normal del sitio, ya que no usamos cookies estrictamente necesarias para su operación más allá de las de analítica.",
                  ],
              },
              {
                  title: "5. Con quién compartimos tu información",
                  body: [
                      "Solo compartimos información con proveedores estrictamente necesarios para operar el sitio y nuestros servicios: por ejemplo, Google (Analytics), el proveedor de hosting donde vive el sitio, y WhatsApp/Meta cuando nos escribís por ese canal. No compartimos tus datos con terceros para fines publicitarios ajenos a SolvaTech.",
                  ],
              },
              {
                  title: "6. Cuánto tiempo conservamos tus datos",
                  body: [
                      "Conservamos la información de contacto mientras dure la relación comercial (consulta, propuesta o proyecto en curso) y un tiempo razonable después, por motivos administrativos. Si no avanza ningún proyecto, podés pedirnos en cualquier momento que eliminemos tus datos de contacto.",
                  ],
              },
              {
                  title: "7. Seguridad",
                  body: [
                      "Tomamos medidas razonables para proteger la información que nos compartís (por ejemplo, conexión segura HTTPS en el sitio), aunque ningún sistema es 100% infalible. No almacenamos datos de tarjetas de crédito ni de pago en el sitio, ya que los pagos se acuerdan y procesan por fuera del mismo.",
                  ],
              },
              {
                  title: "8. Tus derechos",
                  body: [
                      "Podés pedirnos en cualquier momento acceder a los datos que tenemos sobre vos, corregirlos si están desactualizados, o eliminarlos, escribiéndonos por los medios de contacto de esta página. Vamos a responder tu pedido dentro de un plazo razonable.",
                  ],
              },
              {
                  title: "9. Cambios a esta política",
                  body: [
                      "Podemos actualizar esta Política de Privacidad para reflejar cambios en cómo operamos el sitio o en la normativa aplicable. La fecha de \"última actualización\" al inicio de esta página indica la versión vigente.",
                  ],
              },
              {
                  title: "10. Contacto",
                  body: [
                      "Para cualquier consulta sobre esta Política de Privacidad o para ejercer tus derechos sobre tus datos, podés escribirnos a solvatech.dev@gmail.com o por WhatsApp al +595 994 295092.",
                  ],
              },
          ]
        : [
              {
                  title: "1. Who we are",
                  body: [
                      "This Privacy Policy describes how SolvaTech (Alan Alcaraz, Paraguay) collects, uses, and protects the information of those who visit solvatech.com.py or hire our web development, systems, hosting, domain, SEO, and technical support services.",
                  ],
              },
              {
                  title: "2. What information we collect",
                  body: [
                      "Data you give us directly: when you fill out the contact form or write to us via WhatsApp or email, we receive your name, phone number and/or email address, and the content of the message you send us.",
                      "Browsing data: we use Google Analytics to understand, in aggregate, how the site is used (pages visited, time on site, device, approximate location). This information does not identify a person by name.",
                  ],
              },
              {
                  title: "3. How we use your information",
                  body: [
                      "We use contact data solely to respond to your inquiry, prepare a proposal or quote, and follow up on a project should you decide to hire us. We use browsing data (Google Analytics) to understand what parts of the site work well and improve the overall experience.",
                      "We do not sell or rent your personal information to third parties for marketing purposes.",
                  ],
              },
              {
                  title: "4. Cookies and similar technologies",
                  body: [
                      "The site uses Google Analytics cookies to measure overall site usage in aggregate. These cookies are not used to personally identify you or to show you third-party advertising.",
                      "You can block or delete cookies from your browser settings at any time. This does not affect the site's normal operation, as we do not use cookies strictly necessary for its function beyond analytics.",
                  ],
              },
              {
                  title: "5. Who we share your information with",
                  body: [
                      "We only share information with providers strictly necessary to operate the site and our services: for example, Google (Analytics), the hosting provider where the site lives, and WhatsApp/Meta when you write to us through that channel. We do not share your data with third parties for advertising purposes unrelated to SolvaTech.",
                  ],
              },
              {
                  title: "6. How long we keep your data",
                  body: [
                      "We keep contact information for as long as the business relationship lasts (inquiry, proposal, or ongoing project) and for a reasonable time afterward, for administrative reasons. If no project moves forward, you can ask us at any time to delete your contact data.",
                  ],
              },
              {
                  title: "7. Security",
                  body: [
                      "We take reasonable measures to protect the information you share with us (for example, secure HTTPS connection on the site), although no system is 100% foolproof. We do not store credit card or payment data on the site, as payments are agreed upon and processed outside of it.",
                  ],
              },
              {
                  title: "8. Your rights",
                  body: [
                      "You can ask us at any time to access the data we hold about you, correct it if outdated, or delete it, by writing to us through the contact channels on this page. We will respond to your request within a reasonable time.",
                  ],
              },
              {
                  title: "9. Changes to this policy",
                  body: [
                      'We may update this Privacy Policy to reflect changes in how we operate the site or in applicable regulations. The "last updated" date at the top of this page indicates the current version.',
                  ],
              },
              {
                  title: "10. Contact",
                  body: [
                      "For any questions about this Privacy Policy or to exercise your rights over your data, you can write to us at solvatech.dev@gmail.com or via WhatsApp at +595 994 295092.",
                  ],
              },
          ];

    return (
        <main style={{ minHeight: "100vh", backgroundColor: theme.bg, color: theme.textMain, overflowX: "hidden", position: "relative" }}>
            <BackgroundParticles />
            <Navbar />

            <section style={{ position: "relative", zIndex: 10, width: "100%", maxWidth: "820px", margin: "0 auto", padding: "140px 24px 100px" }}>
                {/* Breadcrumbs */}
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                        fontSize: "14px",
                        marginBottom: "32px",
                        fontWeight: 500,
                        flexWrap: "wrap",
                        padding: "12px 20px",
                        background: "rgba(0, 0, 0, 0.5)",
                        backdropFilter: "blur(10px)",
                        borderRadius: "12px",
                        border: "1px solid rgba(255, 255, 255, 0.1)",
                        width: "fit-content",
                    }}
                >
                    <Link href={`/${lang}`} style={{ color: "#999", textDecoration: "none" }}>
                        {dict.breadcrumbsHome}
                    </Link>
                    <span style={{ color: "#666" }}>›</span>
                    <span style={{ color: theme.accent, fontWeight: 600 }}>{dict.breadcrumbsPage}</span>
                </div>

                <span
                    style={{
                        display: "inline-block",
                        padding: "8px 20px",
                        borderRadius: "9999px",
                        fontSize: "11px",
                        fontWeight: 800,
                        textTransform: "uppercase",
                        letterSpacing: "0.12em",
                        background: `linear-gradient(135deg, ${theme.accent}30, ${theme.accentDark}20)`,
                        border: `2px solid ${theme.accent}60`,
                        color: "#fff",
                        marginBottom: "20px",
                    }}
                >
                    {dict.badge}
                </span>

                <h1
                    style={{
                        fontSize: "clamp(2rem, 5vw, 3.25rem)",
                        fontWeight: 900,
                        lineHeight: 1.1,
                        background: `linear-gradient(135deg, #fff, ${theme.accent}80)`,
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                        margin: "0 0 12px",
                    }}
                >
                    {dict.h1}
                </h1>
                <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "14px", margin: "0 0 48px" }}>{dict.updated}</p>

                <article className="prose prose-invert max-w-none">
                    {sections.map((section, idx) => (
                        <section key={section.title} id={idx === 3 ? "cookies" : undefined} style={{ marginBottom: "36px", scrollMarginTop: "100px" }}>
                            <h2 style={{ color: theme.accent, fontSize: "1.25rem", fontWeight: 700, marginBottom: "12px" }}>{section.title}</h2>
                            {section.body.map((p, i) => (
                                <p key={i} style={{ color: "#b8b8c2", lineHeight: 1.75, fontSize: "0.95rem", marginBottom: "12px" }}>
                                    {p}
                                </p>
                            ))}
                        </section>
                    ))}
                </article>
            </section>

            <Footer />
        </main>
    );
}
