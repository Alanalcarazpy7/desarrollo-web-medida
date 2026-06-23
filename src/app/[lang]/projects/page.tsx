import { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import ProyectosPageContent from "@/components/ProyectosPageContent";

type Props = {
    params: Promise<{ lang: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { lang } = await params;
    if (lang !== "en") {
        return {};
    }
    
    const baseUrl = "https://solvatech.com.py";
    const title = "Completed Projects | SolvaTech Paraguay";
    const description = "Explore websites, digital catalogs, e-commerce platforms and private systems developed by SolvaTech for businesses in Paraguay.";

    return {
        title,
        description,
        alternates: {
            canonical: `${baseUrl}/en/projects`,
            languages: {
                "es": `${baseUrl}/es/proyectos`,
                "es-PY": `${baseUrl}/es/proyectos`,
                "en": `${baseUrl}/en/projects`,
                "x-default": `${baseUrl}/es/proyectos`,
            }
        },
        openGraph: {
            title,
            description,
            url: `${baseUrl}/en/projects`,
            locale: "en_US",
            type: "website",
        }
    };
}

export default async function ProjectsEnPage({ params }: Props) {
    const { lang } = await params;
    if (lang !== "en") {
        if (lang === "es") {
            redirect("/es/proyectos");
        }
        notFound();
    }
    
    return <ProyectosPageContent lang="en" />;
}
