import { getPostBySlug } from '@/lib/blog-data';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import BlogPostContent from '@/components/BlogPostContent';

type Props = {
    params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const post = getPostBySlug(slug);

    if (!post) {
        return {
            title: 'Artículo no encontrado',
            description: 'El artículo que buscas no existe.'
        };
    }

    return {
        title: post.title,
        description: post.excerpt,
        keywords: post.keywords,
        alternates: {
            canonical: `https://solvatech.vercel.app/blog/${post.slug}`,
            languages: {
                'es-PY': `https://solvatech.vercel.app/blog/${post.slug}`,
                'en-US': `https://solvatech.vercel.app/blog/${post.slug}`,
            }
        },
        openGraph: {
            title: post.title,
            description: post.excerpt,
            url: `https://solvatech.vercel.app/blog/${post.slug}`,
            images: [
                {
                    url: post.image,
                    width: 1200,
                    height: 630,
                    alt: post.title,
                }
            ],
            type: 'article',
            publishedTime: post.date,
            authors: [post.author],
        },
        twitter: {
            card: 'summary_large_image',
            title: post.title,
            description: post.excerpt,
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
