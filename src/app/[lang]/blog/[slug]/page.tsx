import { getPostBySlug } from '@/lib/blog-data';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import BlogPostContent from '@/components/BlogPostContent';

type Props = {
    params: Promise<{ lang: string; slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { lang, slug } = await params;
    const post = getPostBySlug(slug);

    if (!post) {
        return {
            title: 'Artículo no encontrado',
            description: 'El artículo que buscas no existe.'
        };
    }

    const title = lang === 'en' ? post.titleEn || post.title : post.title;
    const description = lang === 'en' ? post.excerptEn || post.excerpt : post.excerpt;
    const baseUrl = 'https://solvatech.com.py';

    return {
        title,
        description,
        keywords: lang === 'en' ? post.keywordsEn : post.keywords,
        alternates: {
            canonical: `${baseUrl}/${lang}/blog/${post.slug}`,
            languages: {
                'es': `${baseUrl}/es/blog/${post.slug}`,
                'es-PY': `${baseUrl}/es/blog/${post.slug}`,
                'en': `${baseUrl}/en/blog/${post.slug}`,
                'x-default': `${baseUrl}/es/blog/${post.slug}`,
            }
        },
        openGraph: {
            title,
            description,
            url: `${baseUrl}/${lang}/blog/${post.slug}`,
            images: [
                {
                    url: post.image,
                    width: 1200,
                    height: 630,
                    alt: title,
                }
            ],
            type: 'article',
            publishedTime: post.date,
            authors: [post.author],
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: [post.image],
        }
    };
}

export default async function BlogPostPage({ params }: Props) {
    const { lang, slug } = await params;
    const post = getPostBySlug(slug);

    if (!post) return notFound();

    const title = lang === 'en' ? post.titleEn || post.title : post.title;
    const description = lang === 'en' ? post.excerptEn || post.excerpt : post.excerpt;
    const baseUrl = 'https://solvatech.com.py';

    const isEs = lang !== 'en';
    const content = isEs ? post.content : post.contentEn || post.content;
    // Palabras reales del artículo (sin las etiquetas HTML).
    const wordCount = content.replace(/<[^>]+>/g, ' ').trim().split(/\s+/).length;

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: title,
        description: description,
        image: post.image,
        author: {
            '@type': 'Person',
            name: post.author,
            url: baseUrl,
        },
        publisher: {
            '@type': 'Organization',
            name: 'SolvaTech',
            logo: {
                '@type': 'ImageObject',
                url: `${baseUrl}/icon.png`
            }
        },
        datePublished: post.date,
        dateModified: post.date,
        // Estos campos son los que hacen que cada artículo se lea como una
        // pieza distinta y no como más de lo mismo: sección, palabras clave
        // propias, idioma y extensión.
        articleSection: isEs ? post.category : post.categoryEn,
        keywords: (isEs ? post.keywords : post.keywordsEn).join(', '),
        inLanguage: isEs ? 'es-PY' : 'en',
        wordCount,
        timeRequired: `PT${parseInt(post.readTime, 10) || 5}M`,
        isPartOf: {
            '@type': 'Blog',
            '@id': `${baseUrl}/${lang}/blog`,
            name: isEs ? 'Blog de SolvaTech' : 'SolvaTech Blog',
        },
        mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': `${baseUrl}/${lang}/blog/${post.slug}`
        }
    };

    const breadcrumbLd = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            { '@type': 'ListItem', position: 1, name: isEs ? 'Inicio' : 'Home', item: `${baseUrl}/${lang}` },
            { '@type': 'ListItem', position: 2, name: 'Blog', item: `${baseUrl}/${lang}/blog` },
            { '@type': 'ListItem', position: 3, name: title },
        ],
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
            />
            <BlogPostContent post={post} />
        </>
    );
}
