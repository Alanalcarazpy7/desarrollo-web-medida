import { MetadataRoute } from 'next'
import { blogPosts } from '@/lib/blog-data'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://solvatech.vercel.app'
  const locales = ['es', 'en'] as const

  const getAlternates = (path: string) => ({
    languages: {
      "es-PY": `${baseUrl}/es${path}`,
      en: `${baseUrl}/en${path}`,
      'x-default': `${baseUrl}/es${path}`,
    },
  })

  const coreRoutes = [
    { path: '', date: '2026-03-17' },
    { path: '/blog', date: '2026-03-17' },
    { path: '/servicios/desarrollo-web-paraguay', date: '2026-03-07' },
    { path: '/servicios/sistemas-informaticos-paraguay', date: '2026-03-07' },
  ] as const

  const routesMap: MetadataRoute.Sitemap = locales.flatMap((locale) =>
    coreRoutes.map((route) => ({
      url: `${baseUrl}/${locale}${route.path}`,
      lastModified: new Date(route.date),
      changeFrequency: 'monthly' as const,
      priority: route.path === '' ? 1 : 0.9,
      alternates: getAlternates(route.path),
    }))
  )

  const blogEntries: MetadataRoute.Sitemap = blogPosts.flatMap((post) => {
    const path = `/blog/${post.slug}`
    const hasEn = Boolean(post.titleEn?.trim() && post.contentEn?.trim())
    const availableLocales = hasEn ? (['es', 'en'] as const) : (['es'] as const)

    return availableLocales.map((locale) => ({
      url: `${baseUrl}/${locale}${path}`,
      lastModified: new Date(post.date),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
      alternates: {
        languages: {
          "es-PY": `${baseUrl}/es${path}`,
          ...(hasEn ? { en: `${baseUrl}/en${path}` } : {}),
          'x-default': `${baseUrl}/es${path}`,
        },
      },
    }))
  })

  return [...routesMap, ...blogEntries]
}
