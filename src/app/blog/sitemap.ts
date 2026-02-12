import { MetadataRoute } from 'next'
import { blogPosts } from '@/lib/blog-data'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://solvatech.vercel.app' 

    return blogPosts.map(post => ({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.8,
        alternates: {
            languages: {
                es: `${baseUrl}/blog/${post.slug}`,
                en: `${baseUrl}/blog/${post.slug}`, // Idealmente sería una URL distinta si hubiera routing i18n real, pero aquí el contenido cambia dinámicamente.
            }
        }
    }));
}
