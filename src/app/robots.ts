import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: '/private/',
        },
        sitemap: [
            'https://solvatech.vercel.app/sitemap.xml',
            'https://solvatech.vercel.app/blog/sitemap.xml'
        ],
    }
}
