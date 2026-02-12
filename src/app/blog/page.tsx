import { Metadata } from 'next';
import BlogPageContent from '@/components/BlogPageContent';

export const metadata: Metadata = {
    title: {
        absolute: 'Blog - SolvaTech | Conocimiento Digital',
    },
    description: 'Insights sobre desarrollo web, estrategia digital y tecnología. Aprende cómo transformar tu negocio con las últimas tendencias digitales.',
    keywords: ['blog desarrollo web', 'tecnología paraguay', 'marketing digital', 'seo consejos', 'transformación digital'],
    alternates: {
        canonical: 'https://solvatech.vercel.app/blog',
        languages: {
            'es-PY': 'https://solvatech.vercel.app/blog',
            'en-US': 'https://solvatech.vercel.app/blog',
        }
    }
};

export default function BlogPage() {
    return <BlogPageContent />;
}