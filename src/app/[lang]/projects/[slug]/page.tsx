import { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { projectsData } from "@/lib/projects-data";
import ProjectCaseContent from "@/components/ProjectCaseContent";

const BASE_URL = "https://solvatech.com.py";

type Props = {
    params: Promise<{ lang: string; slug: string }>;
};

export function generateStaticParams() {
    return projectsData.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { lang, slug } = await params;
    if (lang !== "en") return {};

    const project = projectsData.find((p) => p.slug === slug);
    if (!project) return {};

    const tr = project.translations.en;
    // No " | SolvaTech": the layout template already appends it.
    const title = `${tr.title}`;

    return {
        title,
        description: tr.description,
        alternates: {
            canonical: `${BASE_URL}/en/projects/${project.slug}`,
            languages: {
                es: `${BASE_URL}/es/proyectos/${project.slug}`,
                "es-PY": `${BASE_URL}/es/proyectos/${project.slug}`,
                en: `${BASE_URL}/en/projects/${project.slug}`,
                "x-default": `${BASE_URL}/es/proyectos/${project.slug}`,
            },
        },
        openGraph: {
            title: `${title} | SolvaTech`,
            description: tr.description,
            url: `${BASE_URL}/en/projects/${project.slug}`,
            siteName: "SolvaTech",
            locale: "en_US",
            type: "article",
            images: [{ url: `${BASE_URL}${project.image}`, alt: tr.alt }],
        },
    };
}

export default async function ProjectDetailPage({ params }: Props) {
    const { lang, slug } = await params;

    // Same convention as the listing: this route is English only.
    if (lang !== "en") {
        if (lang === "es") redirect(`/es/proyectos/${slug}`);
        notFound();
    }

    const project = projectsData.find((p) => p.slug === slug);
    if (!project) notFound();

    const tr = project.translations.en;

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "CreativeWork",
        name: tr.title,
        description: tr.description,
        image: `${BASE_URL}${project.image}`,
        url: `${BASE_URL}/en/projects/${project.slug}`,
        inLanguage: "en",
        ...(project.demoUrl && project.accessType === "live" ? { sameAs: project.demoUrl } : {}),
        creator: {
            "@type": "Organization",
            name: "SolvaTech",
            url: BASE_URL,
        },
    };

    const breadcrumbLd = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: `${BASE_URL}/en` },
            { "@type": "ListItem", position: 2, name: "Projects", item: `${BASE_URL}/en/projects` },
            { "@type": "ListItem", position: 3, name: tr.title },
        ],
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
            />
            <ProjectCaseContent project={project} lang="en" />
        </>
    );
}
