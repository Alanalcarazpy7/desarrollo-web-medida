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
        { path: '', date: '2026-03-17' }, 
        { path: '/blog', date: '2026-03-17' },
        { path: '/servicios/desarrollo-web-paraguay', date: '2026-03-07' },
        { path: '/servicios/sistemas-informaticos-paraguay', date: '2026-03-07' }
    ]

    const routesMap: MetadataRoute.Sitemap = locales.flatMap(locale => {
        return coreRoutes.map(route => ({
             url: `${baseUrl}/${locale}${route.path}`,
             lastModified: new Date(route.date),
             changeFrequency: 'monthly',
             priority: route.path === '' ? 1 : 0.9,
             alternates: getAlternates(route.path)
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
