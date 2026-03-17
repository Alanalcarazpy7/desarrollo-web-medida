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
    const baseUrl = 'https://solvatech.vercel.app';

    return {
        title,
        description,
        keywords: lang === 'en' ? post.keywordsEn : post.keywords,
        alternates: {
            canonical: `${baseUrl}/${lang}/blog/${post.slug}`,
            languages: {
                'es': `${baseUrl}/es/blog/${post.slug}`,
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
    const { slug } = await params;
    const post = getPostBySlug(slug);

    if (!post) return notFound();

    return <BlogPostContent post={post} />;
}
