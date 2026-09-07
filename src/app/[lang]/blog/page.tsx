import { Metadata } from 'next';
import BlogPageContent from '@/components/BlogPageContent';
import { blogPosts } from '@/lib/blog-data';

type Props = {
    params: Promise<{ lang: string }>;
    searchParams: Promise<{ q?: string; cat?: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { lang } = await params;
    const baseUrl = 'https://solvatech.com.py';
    
    return {
        title: {
            absolute: lang === 'es' ? 'Blog - SolvaTech | Conocimiento Digital' : 'Blog - SolvaTech | Digital Knowledge',
        },
        description: lang === 'es' 
            ? 'Insights sobre desarrollo web, estrategia digital y tecnología. Aprende cómo transformar tu negocio con las últimas tendencias.'
            : 'Insights on web development, digital strategy, and technology. Learn how to transform your business with the latest trends.',
        keywords: ['blog desarrollo web', 'tecnología paraguay', 'marketing digital', 'seo consejos', 'transformación digital'],
        alternates: {
            canonical: `${baseUrl}/${lang}/blog`,
            languages: {
                'es': `${baseUrl}/es/blog`,
                'es-PY': `${baseUrl}/es/blog`,
                'en': `${baseUrl}/en/blog`,
                'x-default': `${baseUrl}/es/blog`,
            }
        }
    };
}

export default async function BlogPage({ params, searchParams }: Props) {
    const { lang } = await params;
    const { q, cat } = await searchParams;
    const isEs = lang !== 'en';
    const baseUrl = 'https://solvatech.com.py';

    // Le dice a Google que esto es el índice del blog y qué artículos lo
    // componen. Sin esto, el listado se leía como una página cualquiera y los
    // artículos solo se descubrían por el sitemap.
    const blogLd = {
        '@context': 'https://schema.org',
        '@type': 'Blog',
        '@id': `${baseUrl}/${lang}/blog`,
        url: `${baseUrl}/${lang}/blog`,
        name: isEs ? 'Blog de SolvaTech' : 'SolvaTech Blog',
        description: isEs
            ? 'Guías de desarrollo web, dominios, medios de pago y posicionamiento para negocios de Paraguay.'
            : 'Guides on web development, domains, payments and search positioning for businesses in Paraguay.',
        inLanguage: isEs ? 'es-PY' : 'en',
        publisher: {
            '@type': 'Organization',
            name: 'SolvaTech',
            logo: { '@type': 'ImageObject', url: `${baseUrl}/icon.png` },
        },
        blogPost: blogPosts.map((post) => ({
            '@type': 'BlogPosting',
            headline: isEs ? post.title : post.titleEn,
            description: isEs ? post.excerpt : post.excerptEn,
            url: `${baseUrl}/${lang}/blog/${post.slug}`,
            image: post.image,
            datePublished: post.date,
            author: { '@type': 'Person', name: post.author },
        })),
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(blogLd) }}
            />
            <BlogPageContent initialQuery={q ?? ''} initialCategory={cat ?? 'all'} />
        </>
    );
}