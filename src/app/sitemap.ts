import { MetadataRoute } from 'next'
import { blogPosts } from '@/lib/blog-data'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://solvatech.vercel.app' 

    const blogEntries: MetadataRoute.Sitemap = blogPosts.map(post => ({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.8,
        alternates: {
            languages: {
                es: `${baseUrl}/blog/${post.slug}`,
                en: `${baseUrl}/blog/${post.slug}`,
            }
        }
    }))

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
        {
            url: `${baseUrl}/servicios/desarrollo-web-paraguay`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.9,
            alternates: {
                languages: {
                    es: `${baseUrl}/servicios/desarrollo-web-paraguay`,
                    en: `${baseUrl}/servicios/desarrollo-web-paraguay`,
                }
            }
        },
        {
            url: `${baseUrl}/servicios/sistemas-informaticos-paraguay`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.9,
            alternates: {
                languages: {
                    es: `${baseUrl}/servicios/sistemas-informaticos-paraguay`,
                    en: `${baseUrl}/servicios/sistemas-informaticos-paraguay`,
                }
            }
        },
        ...blogEntries
    ]
}
