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
    const path = "/terminos-de-servicio";

    const title = isEs ? "Términos de Servicio | SolvaTech" : "Terms of Service | SolvaTech";
    const description = isEs
        ? "Condiciones de uso y contratación de los servicios de desarrollo web de SolvaTech."
        : "Terms of use and engagement for SolvaTech's web development services.";

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

export default async function TerminosDeServicioPage({ params }: Props) {
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
        breadcrumbsPage: isEs ? "Términos de Servicio" : "Terms of Service",
        badge: isEs ? "Legal" : "Legal",
        h1: isEs ? "Términos de Servicio" : "Terms of Service",
        updated: isEs ? "Última actualización: 19 de julio de 2026" : "Last updated: July 19, 2026",
    };

    const sections = isEs
        ? [
              {
                  title: "1. Sobre SolvaTech",
                  body: [
                      "SolvaTech es un estudio de desarrollo web y sistemas informáticos con base en Paraguay, operado por Alan Alcaraz. Estos Términos de Servicio regulan el uso del sitio solvatech.com.py y la contratación de nuestros servicios de desarrollo web, sistemas a medida, hosting, dominio, posicionamiento (SEO) y soporte técnico.",
                      "Al navegar el sitio o contratar alguno de nuestros servicios, aceptás estos términos. Si no estás de acuerdo con alguna parte, te pedimos que no utilices el sitio ni contrates el servicio.",
                  ],
              },
              {
                  title: "2. Descripción de los servicios",
                  body: [
                      "Ofrecemos, entre otros: desarrollo de páginas web y landing pages, catálogos digitales, sistemas a medida, hosting web administrado, registro y configuración de dominios, posicionamiento en Google y Maps, y soporte web básico.",
                      "El alcance exacto, los tiempos de entrega y el precio de cada proyecto se acuerdan de forma particular con cada cliente (habitualmente por WhatsApp o correo electrónico) antes de comenzar el trabajo. Las referencias de precios publicadas en el sitio son orientativas y pueden variar según los requerimientos específicos de cada negocio.",
                  ],
              },
              {
                  title: "3. Proceso de contratación y pago",
                  body: [
                      "La contratación se formaliza cuando ambas partes acuerdan el alcance, el precio y la forma de pago del proyecto, habitualmente por WhatsApp o correo electrónico. El sitio no procesa pagos en línea directamente.",
                      "Los servicios recurrentes (como hosting o soporte mensual) se facturan de forma periódica según lo acordado. La falta de pago de un servicio recurrente puede resultar en la suspensión del mismo, previo aviso al cliente.",
                  ],
              },
              {
                  title: "4. Plazos de entrega",
                  body: [
                      "Los plazos comunicados para cada proyecto son estimados y dependen, entre otras cosas, de la complejidad del trabajo y de que el cliente proporcione a tiempo el contenido, los accesos y la información necesarios (textos, imágenes, credenciales, etc.). Las demoras atribuibles al cliente pueden extender el plazo de entrega original.",
                  ],
              },
              {
                  title: "5. Propiedad intelectual",
                  body: [
                      "Una vez completado el pago acordado por un proyecto, el cliente es dueño del sitio web o sistema entregado (el resultado final del trabajo). SolvaTech se reserva el derecho de utilizar el proyecto, sus capturas de pantalla o una descripción general del trabajo realizado como parte de su portafolio público, salvo que se acuerde expresamente lo contrario con el cliente.",
                      "El software, plantillas, componentes o herramientas internas de desarrollo que SolvaTech utilice como base de su trabajo (y que no sean exclusivos del proyecto del cliente) siguen siendo propiedad de SolvaTech o de sus respectivos autores/licenciantes.",
                  ],
              },
              {
                  title: "6. Responsabilidades del cliente",
                  body: [
                      "El cliente es responsable de proveer el contenido (textos, imágenes, logos, información del negocio) necesario para el proyecto, de la veracidad de esa información, y de contar con los derechos necesarios sobre cualquier material que entregue para su uso en el sitio.",
                  ],
              },
              {
                  title: "7. Garantía y soporte posterior a la entrega",
                  body: [
                      "Tras la entrega de un proyecto, corregimos sin costo adicional los errores (bugs) atribuibles a nuestro desarrollo durante un período razonable a acordar con cada cliente. Cambios de contenido, nuevas funcionalidades o ajustes de diseño posteriores a la entrega no están incluidos salvo que formen parte de un plan de soporte contratado.",
                  ],
              },
              {
                  title: "8. Limitación de responsabilidad",
                  body: [
                      "SolvaTech pone su mejor esfuerzo técnico en cada proyecto, pero no garantiza resultados específicos de negocio (por ejemplo, un volumen determinado de ventas o de posicionamiento en buscadores), ya que estos dependen de múltiples factores fuera de nuestro control.",
                      "En la medida permitida por la ley paraguaya, SolvaTech no será responsable por daños indirectos, pérdida de ingresos o de datos derivados del uso del sitio web o sistema entregado, salvo en casos de negligencia grave o dolo comprobado.",
                  ],
              },
              {
                  title: "9. Cancelaciones",
                  body: [
                      "El cliente puede cancelar un proyecto en curso comunicándolo por escrito. En ese caso, se abona el trabajo efectivamente realizado hasta el momento de la cancelación, según lo acordado al inicio del proyecto.",
                  ],
              },
              {
                  title: "10. Modificaciones a estos términos",
                  body: [
                      "Podemos actualizar estos Términos de Servicio en cualquier momento para reflejar cambios en nuestros servicios o en la normativa aplicable. La fecha de \"última actualización\" al inicio de esta página indica la versión vigente.",
                  ],
              },
              {
                  title: "11. Ley aplicable",
                  body: [
                      "Estos términos se rigen por las leyes de la República del Paraguay. Cualquier disputa se intentará resolver primero de forma directa y amistosa entre las partes.",
                  ],
              },
              {
                  title: "12. Contacto",
                  body: [
                      "Para consultas sobre estos Términos de Servicio, podés escribirnos a solvatech.dev@gmail.com o por WhatsApp al +595 994 295092.",
                  ],
              },
          ]
        : [
              {
                  title: "1. About SolvaTech",
                  body: [
                      "SolvaTech is a web development and software studio based in Paraguay, operated by Alan Alcaraz. These Terms of Service govern the use of the solvatech.com.py website and the engagement of our web development, custom systems, hosting, domain, SEO, and technical support services.",
                      "By browsing the site or hiring any of our services, you accept these terms. If you disagree with any part of them, please do not use the site or hire the service.",
                  ],
              },
              {
                  title: "2. Description of services",
                  body: [
                      "We offer, among others: website and landing page development, digital catalogs, custom systems, managed web hosting, domain registration and setup, Google & Maps SEO, and basic web support.",
                      "The exact scope, delivery time, and price of each project is agreed individually with each client (usually via WhatsApp or email) before work begins. Pricing references published on the site are indicative and may vary depending on each business's specific requirements.",
                  ],
              },
              {
                  title: "3. Engagement and payment process",
                  body: [
                      "An engagement is formalized once both parties agree on the scope, price, and payment terms of the project, usually via WhatsApp or email. The site does not process online payments directly.",
                      "Recurring services (such as hosting or monthly support) are billed periodically as agreed. Non-payment of a recurring service may result in its suspension, after prior notice to the client.",
                  ],
              },
              {
                  title: "4. Delivery timelines",
                  body: [
                      "Timelines communicated for each project are estimates and depend, among other things, on the complexity of the work and on the client providing the necessary content, access, and information (text, images, credentials, etc.) on time. Delays attributable to the client may extend the original delivery timeline.",
                  ],
              },
              {
                  title: "5. Intellectual property",
                  body: [
                      "Once the agreed payment for a project is completed, the client owns the delivered website or system (the final result of the work). SolvaTech reserves the right to use the project, its screenshots, or a general description of the work as part of its public portfolio, unless otherwise expressly agreed with the client.",
                      "Software, templates, components, or internal development tools SolvaTech uses as a basis for its work (and that are not exclusive to the client's project) remain the property of SolvaTech or its respective authors/licensors.",
                  ],
              },
              {
                  title: "6. Client responsibilities",
                  body: [
                      "The client is responsible for providing the content (text, images, logos, business information) needed for the project, for the accuracy of that information, and for holding the necessary rights over any material submitted for use on the site.",
                  ],
              },
              {
                  title: "7. Warranty and post-delivery support",
                  body: [
                      "After a project is delivered, we fix bugs attributable to our development at no extra cost during a reasonable period to be agreed with each client. Content changes, new features, or design adjustments after delivery are not included unless part of a contracted support plan.",
                  ],
              },
              {
                  title: "8. Limitation of liability",
                  body: [
                      "SolvaTech puts its best technical effort into every project but does not guarantee specific business outcomes (for example, a particular sales volume or search engine ranking), as these depend on multiple factors outside our control.",
                      "To the extent permitted by Paraguayan law, SolvaTech will not be liable for indirect damages, loss of revenue, or data loss arising from the use of the delivered website or system, except in cases of proven gross negligence or willful misconduct.",
                  ],
              },
              {
                  title: "9. Cancellations",
                  body: [
                      "The client may cancel an ongoing project by communicating it in writing. In that case, the work actually performed up to the cancellation is billed, as agreed at the start of the project.",
                  ],
              },
              {
                  title: "10. Changes to these terms",
                  body: [
                      'We may update these Terms of Service at any time to reflect changes in our services or applicable regulations. The "last updated" date at the top of this page indicates the current version.',
                  ],
              },
              {
                  title: "11. Governing law",
                  body: [
                      "These terms are governed by the laws of the Republic of Paraguay. Any dispute will first be attempted to be resolved directly and amicably between the parties.",
                  ],
              },
              {
                  title: "12. Contact",
                  body: [
                      "For questions about these Terms of Service, you can write to us at solvatech.dev@gmail.com or via WhatsApp at +595 994 295092.",
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
                    {sections.map((section) => (
                        <section key={section.title} style={{ marginBottom: "36px" }}>
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
