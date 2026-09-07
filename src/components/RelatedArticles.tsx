import Link from "next/link";
import Image from "next/image";
import { blogPosts } from "@/lib/blog-data";

/**
 * Bloque de "para leer antes de decidir" para las páginas de servicio.
 *
 * Por qué existe: el enlazado interno estaba en un solo sentido. Los artículos
 * apuntaban a las páginas de servicio, pero ninguna página de servicio apuntaba
 * al blog, así que los artículos solo se descubrían por el menú y el sitemap.
 * Con esto el rastreo llega al blog desde las páginas que más autoridad
 * reciben, y de paso la persona que está evaluando encuentra el material que
 * responde sus dudas antes de escribir.
 *
 * Es un componente de servidor: los enlaces salen en el HTML inicial.
 */
export default function RelatedArticles({
    lang,
    slugs,
    heading,
}: {
    lang: string;
    slugs: string[];
    heading?: string;
}) {
    const isEs = lang !== "en";
    const posts = slugs
        .map((slug) => blogPosts.find((p) => p.slug === slug))
        .filter((p): p is (typeof blogPosts)[number] => Boolean(p));

    if (posts.length === 0) return null;

    return (
        <section className="svc-reading" aria-labelledby="svc-reading-title">
            <div className="svc-reading-head">
                <span className="svc-reading-eyebrow">{isEs ? "Del blog" : "From the blog"}</span>
                <h2 id="svc-reading-title">
                    {heading ?? (isEs ? "Para leer antes de decidir" : "Worth reading before you decide")}
                </h2>
            </div>

            <div className="svc-reading-grid">
                {posts.map((post) => (
                    <Link
                        key={post.slug}
                        href={`/${lang}/blog/${post.slug}`}
                        className="svc-reading-card"
                    >
                        <span className="svc-reading-thumb">
                            <Image
                                src={post.image}
                                alt=""
                                fill
                                sizes="(min-width:900px) 340px, 100vw"
                                style={{ objectFit: "cover" }}
                            />
                        </span>
                        <span className="svc-reading-body">
                            <span className="svc-reading-cat">{isEs ? post.category : post.categoryEn}</span>
                            <span className="svc-reading-title">{isEs ? post.title : post.titleEn}</span>
                            <span className="svc-reading-excerpt">
                                {isEs ? post.excerpt : post.excerptEn}
                            </span>
                            <span className="svc-reading-meta">
                                {post.readTime} {isEs ? "de lectura" : "read"}
                            </span>
                        </span>
                    </Link>
                ))}
            </div>

            <Link href={`/${lang}/blog`} className="svc-reading-all">
                {isEs ? "Ver todos los artículos" : "See all articles"}
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
            </Link>
        </section>
    );
}
