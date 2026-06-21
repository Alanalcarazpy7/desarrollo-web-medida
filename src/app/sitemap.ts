import { MetadataRoute } from 'next'
import { blogPosts } from '@/lib/blog-data'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://solvatech.com.py'
  const locales = ['es', 'en'] as const

  const getAlternates = (path: string) => ({
    languages: {
      es: `${baseUrl}/es${path}`,
      "es-PY": `${baseUrl}/es${path}`,
      en: `${baseUrl}/en${path}`,
      'x-default': `${baseUrl}/es${path}`,
    },
  })

  const coreRoutes = [
    { path: '', date: '2026-03-17' },
    { path: '/blog', date: '2026-03-17' },
    { path: '/servicios', date: '2026-06-21' },
    { path: '/servicios/desarrollo-web-paraguay', date: '2026-03-07' },
    { path: '/servicios/sistemas-informaticos-paraguay', date: '2026-06-21' },
    { path: '/servicios/desarrollo-web-basica', date: '2026-06-21' },
    { path: '/servicios/desarrollo-web-estandar', date: '2026-06-21' },
    { path: '/servicios/desarrollo-web-pro', date: '2026-06-21' },
    { path: '/servicios/desarrollo-web-catalogo', date: '2026-06-21' },
    { path: '/servicios/posicionamiento-google', date: '2026-06-21' },
    { path: '/servicios/dominio-hosting', date: '2026-06-21' },
    { path: '/servicios/soporte-web-basico', date: '2026-06-21' },
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
          es: `${baseUrl}/es${path}`,
          "es-PY": `${baseUrl}/es${path}`,
          ...(hasEn ? { en: `${baseUrl}/en${path}` } : {}),
          'x-default': `${baseUrl}/es${path}`,
        },
      },
    }))
  })

  return [...routesMap, ...blogEntries]
}

