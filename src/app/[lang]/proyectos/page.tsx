import { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import ProyectosPageContent from "@/components/ProyectosPageContent";

type Props = {
    params: Promise<{ lang: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { lang } = await params;
    if (lang !== "es") {
        return {};
    }
    
    const baseUrl = "https://solvatech.com.py";
    const title = "Proyectos realizados | SolvaTech Paraguay";
    const description = "Conocé proyectos web, catálogos digitales, e-commerce y sistemas privados desarrollados por SolvaTech para negocios en Paraguay.";

    return {
        title,
        description,
        alternates: {
            canonical: `${baseUrl}/es/proyectos`,
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
            url: `${baseUrl}/es/proyectos`,
            locale: "es_PY",
            type: "website",
        }
    };
}

export default async function ProyectosEsPage({ params }: Props) {
    const { lang } = await params;
    if (lang !== "es") {
        if (lang === "en") {
            redirect("/en/projects");
        }
        notFound();
    }
    
    return <ProyectosPageContent lang="es" />;
}
