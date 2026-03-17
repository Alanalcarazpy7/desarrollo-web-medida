import { Metadata } from 'next';
import BlogPageContent from '@/components/BlogPageContent';

type Props = {
    params: Promise<{ lang: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { lang } = await params;
    const baseUrl = 'https://solvatech.vercel.app';
    
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
                'en': `${baseUrl}/en/blog`,
                'x-default': `${baseUrl}/es/blog`,
            }
        }
    };
}

export default function BlogPage() {
    return <BlogPageContent />;
}