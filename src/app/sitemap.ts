import { MetadataRoute } from 'next'
import { blogPosts } from '@/lib/blog-data'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://solvatech.vercel.app' 
    const locales = ['es', 'en']

    const getAlternates = (path: string) => {
        return {
            languages: {
                es: `${baseUrl}/es${path}`,
                en: `${baseUrl}/en${path}`,
                'x-default': `${baseUrl}/es${path}`,
            }
        }
    }

    const coreRoutes = [
        '',
        '/blog',
        '/servicios/desarrollo-web-paraguay',
        '/servicios/sistemas-informaticos-paraguay'
    ]

    const routesMap: MetadataRoute.Sitemap = locales.flatMap(locale => {
        return coreRoutes.map(route => ({
             url: `${baseUrl}/${locale}${route}`,
             lastModified: new Date('2026-03-17'),
             changeFrequency: 'monthly',
             priority: route === '' ? 1 : 0.9,
             alternates: getAlternates(route)
        }))
    });

    const blogEntries: MetadataRoute.Sitemap = locales.flatMap(locale => {
        return blogPosts.map(post => {
            const path = `/blog/${post.slug}`;
            return {
                url: `${baseUrl}/${locale}${path}`,
                lastModified: new Date(post.date),
                changeFrequency: 'monthly',
                priority: 0.8,
                alternates: getAlternates(path)
            }
        })
    });

    return [...routesMap, ...blogEntries]
}
