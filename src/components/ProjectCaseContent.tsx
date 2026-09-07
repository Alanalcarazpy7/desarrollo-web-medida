import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { Project, projectsData } from "@/lib/projects-data";
import { getProjectCase } from "@/lib/project-cases";
import { testimonialsData } from "@/lib/testimonials-data";
import { getWhatsAppLink } from "@/lib/whatsapp";
import RelatedArticles from "@/components/RelatedArticles";

const Navbar = dynamic(() => import("@/components/Navbar"));
const Footer = dynamic(() => import("@/components/Footer"));

/**
 * Página de un proyecto.
 *
 * Regla de contenido: acá NO se inventa nada. Se usa únicamente lo que ya está
 * cargado en projects-data (título, descripción, etiquetas de lo que se hizo,
 * capturas, enlace al sitio) y, si existe, el testimonio real y aprobado del
 * cliente. Nada de métricas de resultados ("+40% de ventas") ni frases del
 * cliente que nadie dijo: si no hay dato confirmado, la sección no aparece.
 */

/** El id del testimonio no siempre coincide con el slug del proyecto. */
const TESTIMONIAL_BY_SLUG: Record<string, string> = {
    "academia-gps": "academia-gps",
    "morinigo-y-asociados": "morinigo-asociados",
    "gestion-de-residencias": "gestion-de-residencias",
};

const CATEGORY_LABEL: Record<Project["categoryKey"], { es: string; en: string }> = {
    website: { es: "Página web", en: "Website" },
    ecommerce: { es: "Tienda online", en: "Online store" },
    systems: { es: "Sistema a medida", en: "Custom system" },
};

/** Artículos que mejor acompañan a cada tipo de proyecto. */
const ARTICLES_BY_CATEGORY: Record<Project["categoryKey"], string[]> = {
    website: [
        "cuanto-cuesta-pagina-web-paraguay",
        "landing-page-vs-sitio-web",
        "importancia-web-profesional-2026",
    ],
    ecommerce: [
        "medios-de-pago-online-paraguay",
        "tendencias-ecommerce-2026",
        "menu-digital-qr-restaurantes-paraguay",
    ],
    systems: [
        "importancia-web-profesional-2026",
        "cuanto-cuesta-pagina-web-paraguay",
        "guia-seo-local-paraguay",
    ],
};

function IconArrow() {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
    );
}

function IconCheck() {
    return (
        <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M4 10.5l4 4 8-9" />
        </svg>
    );
}

function IconWa() {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12.04 2c-5.46 0-9.9 4.43-9.9 9.9 0 1.75.46 3.45 1.32 4.95L2 22l5.3-1.38a9.9 9.9 0 0 0 4.73 1.2h.01c5.46 0 9.9-4.43 9.9-9.9 0-2.64-1.03-5.13-2.9-7A9.82 9.82 0 0 0 12.04 2Zm5.8 14.06c-.24.68-1.4 1.3-1.94 1.35-.5.05-1.13.07-1.82-.11-.42-.13-.96-.31-1.65-.61-2.9-1.25-4.8-4.17-4.94-4.36-.15-.19-1.19-1.58-1.19-3.02 0-1.43.75-2.14 1.02-2.43.27-.29.59-.36.79-.36l.56.01c.18.01.42-.07.66.5.24.58.82 2.01.89 2.16.07.14.12.31.02.5-.09.19-.14.31-.28.48-.14.17-.29.37-.42.5-.14.14-.28.29-.12.57.16.28.71 1.17 1.53 1.9 1.05.93 1.94 1.22 2.22 1.36.28.14.44.12.6-.07.16-.19.69-.8.87-1.08.18-.28.36-.23.61-.14.25.09 1.6.76 1.87.9.28.14.46.21.53.32.07.12.07.66-.17 1.34Z" />
        </svg>
    );
}

export default function ProjectCaseContent({
    project,
    lang,
}: {
    project: Project;
    lang: "es" | "en";
}) {
    const isEs = lang === "es";
    const tr = project.translations[lang] ?? project.translations.es;
    const listPath = isEs ? `/${lang}/proyectos` : `/${lang}/projects`;
    const kase = getProjectCase(project.slug);

    // Solo se muestra el testimonio si el cliente lo autorizó de verdad.
    const testimonialId = TESTIMONIAL_BY_SLUG[project.slug];
    const testimonial = testimonialId
        ? testimonialsData.find(
              (t) => t.id === testimonialId && t.hasPermission && t.isApproved && t.testimonialText
          )
        : undefined;

    const others = projectsData
        .filter((p) => p.slug !== project.slug && p.categoryKey === project.categoryKey)
        .slice(0, 3);

    const waMessage = isEs
        ? `Hola, vi el proyecto "${tr.title}" en la web y quiero algo parecido para mi negocio.`
        : `Hi, I saw the "${tr.title}" project on your site and I want something similar for my business.`;

    const isLive = project.accessType === "live" && Boolean(project.demoUrl);

    return (
        <main className="pc">
            <Navbar />

            <div className="pc-wrap">
                {/* Migas */}
                <nav className="pc-crumbs" aria-label={isEs ? "Ruta de navegación" : "Breadcrumb"}>
                    <Link href={`/${lang}`}>{isEs ? "Inicio" : "Home"}</Link>
                    <span aria-hidden>›</span>
                    <Link href={listPath}>{isEs ? "Proyectos" : "Projects"}</Link>
                    <span aria-hidden>›</span>
                    <span className="pc-crumbs-now">{tr.title}</span>
                </nav>

                {/* Encabezado */}
                <header className="pc-head">
                    <div className="pc-badges">
                        <span className="pc-badge">{CATEGORY_LABEL[project.categoryKey][lang]}</span>
                        {/* Se dice de frente si el trabajo fue para un cliente o
                            si es un proyecto propio de muestra. */}
                        {kase && (
                            <span className={`pc-badge pc-badge-${kase.kind}`}>
                                {kase.kind === "client"
                                    ? isEs
                                        ? "Proyecto para cliente"
                                        : "Client project"
                                    : isEs
                                      ? "Proyecto propio · demo"
                                      : "Own project · demo"}
                            </span>
                        )}
                    </div>
                    <h1 className="pc-h1">{tr.title}</h1>
                    <p className="pc-lead">{tr.description}</p>

                    <div className="pc-actions">
                        {isLive ? (
                            <a
                                className="pc-btn"
                                href={project.demoUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {isEs ? "Ver el sitio" : "Visit the site"} <IconArrow />
                            </a>
                        ) : (
                            <span className="pc-private">
                                {project.accessType === "private-system"
                                    ? isEs
                                        ? "Sistema privado: se muestra solo con capturas"
                                        : "Private system: shown through screenshots only"
                                    : isEs
                                      ? "Proyecto mostrado con capturas"
                                      : "Project shown through screenshots"}
                            </span>
                        )}
                        <a
                            className="pc-btn-wa"
                            href={getWhatsAppLink(waMessage)}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <IconWa /> {isEs ? "Quiero algo así" : "I want something like this"}
                        </a>
                    </div>
                </header>

                {/* Capturas */}
                <div className="pc-shots">
                    <figure className="pc-shot">
                        <Image
                            src={project.image}
                            alt={tr.alt}
                            width={1400}
                            height={900}
                            sizes="(min-width:1100px) 1040px, 100vw"
                            style={{
                                width: "100%",
                                height: "auto",
                                display: "block",
                                objectPosition: project.objectPosition ?? "center",
                            }}
                            priority
                        />
                    </figure>
                    {project.imageBack && (
                        <figure className="pc-shot">
                            <Image
                                src={project.imageBack}
                                alt={
                                    isEs
                                        ? `Vista interna del proyecto ${tr.title}`
                                        : `Internal view of the ${tr.title} project`
                                }
                                width={1400}
                                height={900}
                                sizes="(min-width:1100px) 1040px, 100vw"
                                style={{ width: "100%", height: "auto", display: "block" }}
                            />
                            <figcaption>
                                {isEs ? "Vista de administración" : "Admin view"}
                            </figcaption>
                        </figure>
                    )}
                </div>

                {/* El punto de partida */}
                {kase && (
                    <section className="pc-block">
                        <span className="pc-step">{isEs ? "01 · El punto de partida" : "01 · The starting point"}</span>
                        <h2>{isEs ? "Qué necesitaba el negocio" : "What the business needed"}</h2>
                        <p className="pc-text">{kase.situation[lang]}</p>
                    </section>
                )}

                {/* Cómo se resolvió */}
                {kase && (
                    <section className="pc-block">
                        <span className="pc-step">{isEs ? "02 · La solución" : "02 · The solution"}</span>
                        <h2>{isEs ? "Cómo se resolvió" : "How it was solved"}</h2>
                        <ol className="pc-steps">
                            {kase.approach[lang].map((line, i) => (
                                <li key={line}>
                                    <span className="pc-steps-n">{String(i + 1).padStart(2, "0")}</span>
                                    <span>{line}</span>
                                </li>
                            ))}
                        </ol>
                    </section>
                )}

                {/* Resultado: solo si el cliente confirmó un dato real */}
                {kase?.result && (
                    <section className="pc-block">
                        <span className="pc-step">{isEs ? "03 · El resultado" : "03 · The result"}</span>
                        <h2>{isEs ? "Qué cambió después" : "What changed afterwards"}</h2>
                        <p className="pc-text">{kase.result[lang]}</p>
                    </section>
                )}

                {/* Qué se hizo */}
                {project.technologies.length > 0 && (
                    <section className="pc-block">
                        <h2>{isEs ? "Qué incluye el proyecto" : "What the project includes"}</h2>
                        <ul className="pc-did">
                            {project.technologies.map((item) => (
                                <li key={item}>
                                    <IconCheck /> {item}
                                </li>
                            ))}
                        </ul>
                    </section>
                )}

                {/* Testimonio real, si existe */}
                {testimonial && (
                    <section className="pc-block">
                        <h2>{isEs ? "Lo que dijo el cliente" : "What the client said"}</h2>
                        <blockquote className="pc-quote">
                            {testimonial.testimonialText}
                            <footer>
                                {testimonial.clientName
                                    ? `${testimonial.clientName} · ${testimonial.businessName}`
                                    : testimonial.businessName}
                            </footer>
                        </blockquote>
                    </section>
                )}

                {/* Cierre */}
                <section className="pc-cta">
                    <h2>
                        {isEs
                            ? "¿Querés algo parecido para tu negocio?"
                            : "Want something like this for your business?"}
                    </h2>
                    <p>
                        {isEs
                            ? "Contame qué necesitás y te paso alcance, precio y fecha de entrega. Trabajás directo conmigo, sin intermediarios."
                            : "Tell me what you need and I will send you scope, price and delivery date. You work directly with me, no middlemen."}
                    </p>
                    <div className="pc-actions">
                        <a
                            className="pc-btn"
                            href={getWhatsAppLink(waMessage)}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {isEs ? "Pedir presupuesto" : "Get a quote"} <IconArrow />
                        </a>
                        <Link className="pc-btn-ghost" href={`/${lang}/servicios`}>
                            {isEs ? "Ver planes y servicios" : "See plans and services"}
                        </Link>
                    </div>
                </section>

                {/* Otros proyectos del mismo tipo */}
                {others.length > 0 && (
                    <section className="pc-block pc-more">
                        <div className="pc-more-head">
                            <div>
                                <span className="pc-step">
                                    {CATEGORY_LABEL[project.categoryKey][lang]}
                                </span>
                                <h2>{isEs ? "Otros proyectos parecidos" : "Other similar projects"}</h2>
                                <p className="pc-more-sub">
                                    {isEs
                                        ? "Trabajos del mismo tipo, para que veas más ejemplos antes de decidir."
                                        : "Projects of the same kind, so you can see more examples before deciding."}
                                </p>
                            </div>
                            <Link href={listPath} className="pc-all pc-all-top">
                                {isEs ? "Ver todos" : "See all"} <IconArrow />
                            </Link>
                        </div>

                        <div className="pc-others">
                            {others.map((other, i) => {
                                const otherTr = other.translations[lang] ?? other.translations.es;
                                const href = isEs
                                    ? `/${lang}/proyectos/${other.slug}`
                                    : `/${lang}/projects/${other.slug}`;
                                return (
                                    <Link
                                        key={other.slug}
                                        href={href}
                                        className="pc-other"
                                        style={{ animationDelay: `${i * 90}ms` }}
                                    >
                                        <span className="pc-other-thumb">
                                            <Image
                                                src={other.image}
                                                alt=""
                                                fill
                                                sizes="(min-width:900px) 320px, 100vw"
                                                style={{ objectFit: "cover", objectPosition: "top" }}
                                            />
                                            <span className="pc-other-veil" aria-hidden />
                                            <span className="pc-other-cat">
                                                {CATEGORY_LABEL[other.categoryKey][lang]}
                                            </span>
                                        </span>
                                        <span className="pc-other-body">
                                            <span className="pc-other-title">{otherTr.title}</span>
                                            <span className="pc-other-desc">{otherTr.description}</span>
                                            <span className="pc-other-go">
                                                {isEs ? "Ver el caso" : "View the case"} <IconArrow />
                                            </span>
                                        </span>
                                    </Link>
                                );
                            })}
                        </div>
                    </section>
                )}
            </div>

            <RelatedArticles lang={lang} slugs={ARTICLES_BY_CATEGORY[project.categoryKey]} />

            <Footer />
        </main>
    );
}
