import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://solvatech.vercel.app' 

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 1,
            alternates: {
                languages: {
                    es: baseUrl,
                    en: baseUrl,
                }
            }
        },
        {
            url: `${baseUrl}/blog`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.9,
            alternates: {
                languages: {
                    es: `${baseUrl}/blog`,
                    en: `${baseUrl}/blog`,
                }
            }
        },
        // Otras rutas estáticas si las hubiera
    ]
}
