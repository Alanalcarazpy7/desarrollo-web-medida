"use client";

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { BlogPost, blogPosts } from '@/lib/blog-data';
import { useLanguage } from '@/context/LanguageContext';
import Navbar from '@/components/Navbar';

const SnowEffect = dynamic(() => import('@/components/SnowEffect'), { 
    ssr: false,
    loading: () => null 
});

const Footer = dynamic(() => import("@/components/Footer"), { ssr: true });

type Props = {
    post: BlogPost;
};

export default function BlogPostContent({ post }: Props) {
    const { language } = useLanguage();

    const theme = {
        accent: "#00d9ff",
        accentDark: "#0099cc",
    };

    // Textos bilingües
    const t = {
        inicio: language === 'es' ? 'Inicio' : 'Home',
        blog: 'Blog',
        autor: language === 'es' ? 'Autor' : 'Author',
        leadEditor: language === 'es' ? 'SolvaTech Editor Principal' : 'SolvaTech Lead Editor',
        lectura: language === 'es' ? 'lectura' : 'read',
        gusto: language === 'es' ? '¿Te gustó este artículo?' : 'Did you like this article?',
        suscribete: language === 'es' ? 'Suscríbete a nuestro newsletter o contáctanos para implementar estas estrategias en tu negocio.' : 'Subscribe to our newsletter or contact us to implement these strategies in your business.',
        contactar: language === 'es' ? 'Contactar Experto' : 'Contact Expert',
        verMas: language === 'es' ? 'Ver más artículos' : 'See more articles',
        seguirLeyendo: language === 'es' ? 'Seguir leyendo' : 'Keep reading'
    };

    const displayTitle = language === 'es' ? post.title : post.titleEn;
    const displayCategory = language === 'es' ? post.category : post.categoryEn;
    const displayContent = language === 'es' ? post.content : (post.contentEn || post.content);

    // Find related posts
    const relatedPosts = blogPosts.filter(p => p.slug !== post.slug).slice(0, 3);

    return (
        <article style={{
            minHeight: '100vh',
            backgroundColor: '#000',
            color: '#fff',
            position: 'relative'
        }}>
            <Navbar />

            {/* Snow Effect */}
            <div style={{ 
                position: 'fixed', 
                inset: 0, 
                pointerEvents: 'none', 
                zIndex: 0 
            }}>
                <SnowEffect />
            </div>

            {/* Hero Cover */}
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                style={{ 
                    position: 'relative', 
                    paddingTop: '140px',
                    paddingBottom: '80px',
                    overflow: 'hidden',
                    minHeight: '65vh',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center'
                }}
            >
                
                {/* Background Image */}
                <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
                    <Image 
                        src={post.image}
                        alt={displayTitle}
                        fill
                        style={{ 
                            objectFit: 'cover', 
                            opacity: 0.25,
                            filter: 'blur(6px)',
                            transform: 'scale(1.1)'
                        }}
                        priority
                    />
                    <div style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(to top, #000 0%, rgba(0, 0, 0, 0.9) 50%, rgba(0, 0, 0, 0.7) 100%)'
                    }} />
                </div>

                {/* Animated Grid pattern */}
                <motion.div 
                    animate={{
                        opacity: [0.04, 0.07, 0.04]
                    }}
                    transition={{ duration: 5, repeat: Infinity }}
                    style={{
                        position: 'absolute',
                        inset: 0,
                        zIndex: 1,
                        backgroundImage: `linear-gradient(${theme.accent} 1.5px, transparent 1.5px), linear-gradient(90deg, ${theme.accent} 1.5px, transparent 1.5px)`,
                        backgroundSize: '60px 60px',
                    }}
                />

                {/* Decorative corner circles */}
                <div style={{ position: 'absolute', top: '20%', left: '5%', width: '300px', height: '300px', borderRadius: '50%', background: `radial-gradient(circle, ${theme.accent}15, transparent 70%)`, filter: 'blur(60px)', zIndex: 1 }} />
                <div style={{ position: 'absolute', bottom: '20%', right: '10%', width: '400px', height: '400px', borderRadius: '50%', background: `radial-gradient(circle, ${theme.accentDark}12, transparent 70%)`, filter: 'blur(80px)', zIndex: 1 }} />

                <div style={{ 
                    maxWidth: '1100px', 
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    paddingLeft: 'clamp(20px, 5vw, 32px)',
                    paddingRight: 'clamp(20px, 5vw, 32px)',
                    position: 'relative',
                    zIndex: 10,
                    width: '100%'
                }}>
                    {/* Breadcrumb con decoración */}
                    <motion.div 
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            fontSize: '14px',
                            marginBottom: '40px',
                            fontWeight: 500,
                            flexWrap: 'wrap',
                            padding: '12px 20px',
                            background: 'rgba(0, 0, 0, 0.5)',
                            backdropFilter: 'blur(10px)',
                            borderRadius: '12px',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            width: 'fit-content'
                        }}
                    >
                        <svg style={{ width: '16px', height: '16px', color: theme.accent }} fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                        </svg>
                        <Link 
                            href="/" 
                            style={{ 
                                color: '#999', 
                                textDecoration: 'none',
                                transition: 'color 0.3s'
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.color = theme.accent}
                            onMouseLeave={(e) => e.currentTarget.style.color = '#999'}
                        >
                            {t.inicio}
                        </Link>
                        <span style={{ color: '#666' }}>›</span>
                        <Link 
                            href="/blog" 
                            style={{ 
                                color: '#999',
                                textDecoration: 'none',
                                transition: 'color 0.3s'
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.color = theme.accent}
                            onMouseLeave={(e) => e.currentTarget.style.color = '#999'}
                        >
                            {t.blog}
                        </Link>
                        <span style={{ color: '#666' }}>›</span>
                        <span style={{ 
                            color: theme.accent,
                            fontWeight: 600,
                            maxWidth: '200px',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap'
                        }}>
                            {displayCategory}
                        </span>
                    </motion.div>

                    {/* Meta con iconos decorativos */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                        style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            alignItems: 'center',
                            gap: '20px',
                            marginBottom: '32px'
                        }}
                    >
                        <span style={{
                            padding: '10px 24px',
                            borderRadius: '9999px',
                            fontSize: '11px',
                            fontWeight: 800,
                            textTransform: 'uppercase',
                            letterSpacing: '0.12em',
                            backdropFilter: 'blur(12px)',
                            background: `linear-gradient(135deg, ${theme.accent}30, ${theme.accentDark}20)`,
                            border: `2px solid ${theme.accent}60`,
                            color: '#fff',
                            boxShadow: `0 8px 32px ${theme.accent}40`,
                            position: 'relative',
                            overflow: 'hidden'
                        }}>
                            <span style={{
                                position: 'absolute',
                                top: 0,
                                left: '-100%',
                                width: '100%',
                                height: '100%',
                                background: `linear-gradient(90deg, transparent, ${theme.accent}30, transparent)`,
                                animation: 'shimmer 3s infinite'
                            }} />
                            {displayCategory}
                        </span>
                        
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <svg style={{ width: '18px', height: '18px', color: theme.accent }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span style={{ color: '#ccc', fontSize: '15px', fontWeight: 600 }}>
                                {post.date}
                            </span>
                        </div>
                        
                        <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: theme.accent, boxShadow: `0 0 8px ${theme.accent}` }} />
                        
                        <span style={{
                            color: '#fff',
                            fontSize: '15px',
                            fontWeight: 700,
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            padding: '8px 16px',
                            background: 'rgba(255, 255, 255, 0.05)',
                            borderRadius: '8px',
                            border: '1px solid rgba(255, 255, 255, 0.1)'
                        }}>
                            <svg style={{ width: '18px', height: '18px', color: theme.accent }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {post.readTime} {t.lectura}
                        </span>
                    </motion.div>

                    {/* Title con decoración */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.7 }}
                        style={{ position: 'relative', marginBottom: '48px' }}
                    >
                        {/* Decorative line */}
                        <div style={{
                            position: 'absolute',
                            top: '-20px',
                            left: 0,
                            width: '120px',
                            height: '4px',
                            background: `linear-gradient(90deg, ${theme.accent}, transparent)`,
                            borderRadius: '4px'
                        }} />
                        
                        <h1 style={{
                            fontSize: 'clamp(2rem, 6vw, 4.5rem)',
                            fontWeight: 900,
                            lineHeight: 1.1,
                            textShadow: `0 4px 24px rgba(0, 0, 0, 0.8), 0 0 60px ${theme.accent}30`,
                            background: `linear-gradient(135deg, #fff, ${theme.accent}80)`,
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text'
                        }}>
                            {displayTitle}
                        </h1>
                        
                        {/* Decorative underline */}
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: '100%' }}
                            transition={{ delay: 0.8, duration: 0.8 }}
                            style={{
                                height: '2px',
                                background: `linear-gradient(90deg, ${theme.accent}, ${theme.accentDark}, transparent)`,
                                marginTop: '20px',
                                borderRadius: '2px'
                            }}
                        />
                    </motion.div>

                    {/* Author con diseño premium */}
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '20px',
                            background: 'linear-gradient(135deg, rgba(0, 217, 255, 0.1), rgba(0, 153, 204, 0.05))',
                            width: 'fit-content',
                            padding: '8px',
                            paddingRight: '32px',
                            borderRadius: '9999px',
                            border: `2px solid ${theme.accent}40`,
                            backdropFilter: 'blur(16px)',
                            boxShadow: `0 8px 32px ${theme.accent}30`,
                            position: 'relative',
                            overflow: 'hidden'
                        }}
                    >
                        {/* Glow effect */}
                        <div style={{
                            position: 'absolute',
                            inset: 0,
                            background: `radial-gradient(circle at 30% 50%, ${theme.accent}20, transparent 60%)`,
                            pointerEvents: 'none'
                        }} />
                        
                        <div style={{
                            width: '64px',
                            height: '64px',
                            borderRadius: '50%',
                            background: `linear-gradient(135deg, ${theme.accent}, ${theme.accentDark})`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#000',
                            fontWeight: 900,
                            fontSize: '28px',
                            boxShadow: `0 8px 24px ${theme.accent}60, inset 0 -2px 8px rgba(0,0,0,0.2)`,
                            border: '3px solid rgba(255, 255, 255, 0.2)',
                            position: 'relative',
                            zIndex: 1
                        }}>
                            {post.author.charAt(0)}
                        </div>
                        <div style={{ position: 'relative', zIndex: 1 }}>
                            <p style={{ fontWeight: 800, color: '#fff', fontSize: '18px', marginBottom: '4px', letterSpacing: '0.02em' }}>
                                {post.author}
                            </p>
                            <p style={{ fontSize: '13px', color: theme.accent, fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <svg style={{ width: '14px', height: '14px' }} fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                {t.leadEditor}
                            </p>
                        </div>
                    </motion.div>
                </div>
            </motion.div>

            {/* Article Content con diseño mejorado */}
            <div style={{ 
                maxWidth: '1100px', 
                marginLeft: 'auto',
                marginRight: 'auto',
                paddingLeft: 'clamp(20px, 5vw, 32px)',
                paddingRight: 'clamp(20px, 5vw, 32px)',
                paddingBottom: '100px',
                position: 'relative',
                zIndex: 20,
                marginTop: '-60px'
            }}>
                <motion.div 
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                    style={{
                        backgroundColor: 'rgba(10, 10, 10, 0.95)',
                        borderRadius: '32px',
                        padding: 'clamp(40px, 7vw, 80px)',
                        border: `2px solid ${theme.accent}20`,
                        boxShadow: `0 32px 96px rgba(0, 0, 0, 0.8), 0 0 80px ${theme.accent}15`,
                        backdropFilter: 'blur(20px)',
                        position: 'relative',
                        overflow: 'hidden'
                    }}
                >
                    {/* Decorative corner accents */}
                    <div style={{ position: 'absolute', top: 0, left: 0, width: '100px', height: '100px', background: `linear-gradient(135deg, ${theme.accent}20, transparent)`, borderTopLeftRadius: '32px' }} />
                    <div style={{ position: 'absolute', bottom: 0, right: 0, width: '150px', height: '150px', background: `linear-gradient(-45deg, ${theme.accentDark}15, transparent)`, borderBottomRightRadius: '32px' }} />
                    
                    {/* Content */}
                    <div
                        style={{
                            color: '#d4d4d4',
                            fontSize: '18px',
                            lineHeight: 1.9,
                            position: 'relative',
                            zIndex: 1,
                            fontFamily: 'system-ui, -apple-system, sans-serif'
                        }}
                        dangerouslySetInnerHTML={{ __html: displayContent }}
                    />
                </motion.div>

                {/* CTA Section más decorada */}
                <motion.div 
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    style={{
                        marginTop: '100px',
                        padding: 'clamp(50px, 8vw, 80px)',
                        borderRadius: '32px',
                        textAlign: 'center',
                        position: 'relative',
                        overflow: 'hidden',
                        border: `2px solid ${theme.accent}40`
                    }}
                >
                    {/* Animated background */}
                    <motion.div 
                        animate={{
                            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                        }}
                        transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                        style={{
                            position: 'absolute',
                            inset: 0,
                            background: `linear-gradient(135deg, ${theme.accent}15, ${theme.accentDark}10, ${theme.accent}15)`,
                            backgroundSize: '200% 200%'
                        }}
                    />
                    
                    {/* Decorative dots */}
                    <div style={{ position: 'absolute', top: '20px', left: '20px', display: 'grid', gridTemplateColumns: 'repeat(3, 8px)', gap: '8px', opacity: 0.3 }}>
                        {[...Array(9)].map((_, i) => (
                            <div key={i} style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: theme.accent }} />
                        ))}
                    </div>
                    <div style={{ position: 'absolute', bottom: '20px', right: '20px', display: 'grid', gridTemplateColumns: 'repeat(3, 8px)', gap: '8px', opacity: 0.3 }}>
                        {[...Array(9)].map((_, i) => (
                            <div key={i} style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: theme.accent }} />
                        ))}
                    </div>

                    <div style={{ position: 'relative', zIndex: 10 }}>
                        <div style={{ marginBottom: '16px', display: 'inline-block' }}>
                            <svg style={{ width: '56px', height: '56px', color: theme.accent }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                        </div>
                        
                        <h3 style={{
                            fontSize: 'clamp(1.75rem, 5vw, 3rem)',
                            fontWeight: 900,
                            marginBottom: '20px',
                            background: `linear-gradient(135deg, #fff, ${theme.accent})`,
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text'
                        }}>
                            {t.gusto}
                        </h3>
                        
                        <p style={{
                            color: '#aaa',
                            marginBottom: '40px',
                            maxWidth: '650px',
                            marginLeft: 'auto',
                            marginRight: 'auto',
                            lineHeight: 1.8,
                            fontSize: 'clamp(15px, 2.5vw, 17px)'
                        }}>
                            {t.suscribete}
                        </p>
                        
                        <div style={{
                            display: 'flex',
                            flexDirection: typeof window !== 'undefined' && window.innerWidth < 640 ? 'column' : 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '20px',
                            flexWrap: 'wrap'
                        }}>
                            <Link href="/#contacto" style={{ textDecoration: 'none' }}>
                                <motion.button
                                    whileHover={{ scale: 1.05, y: -2 }}
                                    whileTap={{ scale: 0.98 }}
                                    style={{
                                        padding: '18px 48px',
                                        borderRadius: '9999px',
                                        fontWeight: 800,
                                        fontSize: '17px',
                                        background: `linear-gradient(135deg, ${theme.accent}, ${theme.accentDark})`,
                                        color: '#000',
                                        border: 'none',
                                        cursor: 'pointer',
                                        boxShadow: `0 12px 40px ${theme.accent}50`,
                                        transition: 'all 0.3s',
                                        position: 'relative',
                                        overflow: 'hidden'
                                    }}
                                >
                                    <span style={{ position: 'relative', zIndex: 1 }}>{t.contactar}</span>
                                </motion.button>
                            </Link>
                            
                            <Link href="/blog" style={{ textDecoration: 'none' }}>
                                <motion.button
                                    whileHover={{ scale: 1.05, y: -2 }}
                                    whileTap={{ scale: 0.98 }}
                                    style={{
                                        padding: '18px 48px',
                                        borderRadius: '9999px',
                                        fontWeight: 800,
                                        fontSize: '17px',
                                        backgroundColor: 'transparent',
                                        color: theme.accent,
                                        border: `2px solid ${theme.accent}`,
                                        cursor: 'pointer',
                                        transition: 'all 0.3s',
                                        backdropFilter: 'blur(8px)'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.backgroundColor = `${theme.accent}20`;
                                        e.currentTarget.style.borderColor = '#fff';
                                        e.currentTarget.style.color = '#fff';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.backgroundColor = 'transparent';
                                        e.currentTarget.style.borderColor = theme.accent;
                                        e.currentTarget.style.color = theme.accent;
                                    }}
                                >
                                    {t.verMas}
                                </motion.button>
                            </Link>
                        </div>
                    </div>
                </motion.div>

                {/* Related Posts con diseño mejorado */}
                {relatedPosts.length > 0 && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.9 }}
                        style={{ marginTop: '120px' }}
                    >
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '32px',
                            marginBottom: '64px',
                            position: 'relative'
                        }}>
                            <motion.div 
                                initial={{ width: 0 }}
                                whileInView={{ width: '100%' }}
                                viewport={{ once: true }}
                                transition={{ duration: 1, delay: 0.2 }}
                                style={{ height: '2px', background: `linear-gradient(90deg, transparent, ${theme.accent}60, transparent)`, flex: 1 }} 
                            />
                            
                            <h3 style={{
                                fontSize: 'clamp(1.75rem, 5vw, 2.5rem)',
                                fontWeight: 900,
                                color: '#fff',
                                whiteSpace: 'nowrap',
                                textShadow: `0 0 40px ${theme.accent}40`,
                                position: 'relative'
                            }}>
                                <span style={{
                                    background: `linear-gradient(135deg, #fff, ${theme.accent})`,
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    backgroundClip: 'text'
                                }}>
                                    {t.seguirLeyendo}
                                </span>
                            </h3>
                            
                            <motion.div 
                                initial={{ width: 0 }}
                                whileInView={{ width: '100%' }}
                                viewport={{ once: true }}
                                transition={{ duration: 1, delay: 0.2 }}
                                style={{ height: '2px', background: `linear-gradient(90deg, transparent, ${theme.accent}60, transparent)`, flex: 1 }} 
                            />
                        </div>
                        
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
                            gap: 'clamp(28px, 5vw, 40px)'
                        }}>
                            {relatedPosts.map((related, index) => {
                                const relatedTitle = language === 'es' ? related.title : related.titleEn;
                                const relatedCategory = language === 'es' ? related.category : related.categoryEn;
                                
                                return (
                                    <Link 
                                        key={related.slug} 
                                        href={`/blog/${related.slug}`}
                                        style={{ textDecoration: 'none', display: 'block' }}
                                    >
                                        <motion.div
                                            initial={{ opacity: 0, y: 40 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: index * 0.15, duration: 0.7 }}
                                            whileHover={{ y: -12 }}
                                            style={{
                                                borderRadius: '24px',
                                                overflow: 'hidden',
                                                backgroundColor: 'rgba(10, 10, 10, 0.8)',
                                                border: `2px solid ${theme.accent}20`,
                                                boxShadow: '0 12px 32px rgba(0, 0, 0, 0.6)',
                                                transition: 'all 0.5s',
                                                cursor: 'pointer',
                                                backdropFilter: 'blur(10px)',
                                                position: 'relative'
                                            }}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.borderColor = `${theme.accent}50`;
                                                e.currentTarget.style.boxShadow = `0 20px 60px ${theme.accent}30`;
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.borderColor = `${theme.accent}20`;
                                                e.currentTarget.style.boxShadow = '0 12px 32px rgba(0, 0, 0, 0.6)';
                                            }}
                                        >
                                            {/* Corner decoration */}
                                            <div style={{
                                                position: 'absolute',
                                                top: 0,
                                                right: 0,
                                                width: '100px',
                                                height: '100px',
                                                background: `radial-gradient(circle at top right, ${theme.accent}15, transparent 70%)`,
                                                pointerEvents: 'none',
                                                zIndex: 1
                                            }} />
                                            
                                            <div style={{ 
                                                height: '200px', 
                                                position: 'relative', 
                                                width: '100%', 
                                                overflow: 'hidden'
                                            }}>
                                                <Image 
                                                    src={related.image} 
                                                    alt={relatedTitle}
                                                    fill
                                                    style={{ 
                                                        objectFit: 'cover',
                                                        opacity: 0.8,
                                                        transition: 'all 0.7s'
                                                    }}
                                                    onMouseEnter={(e) => {
                                                        e.currentTarget.style.transform = 'scale(1.12)';
                                                        e.currentTarget.style.opacity = '1';
                                                    }}
                                                    onMouseLeave={(e) => {
                                                        e.currentTarget.style.transform = 'scale(1)';
                                                        e.currentTarget.style.opacity = '0.8';
                                                    }}
                                                />
                                                <div style={{
                                                    position: 'absolute',
                                                    inset: 0,
                                                    background: 'linear-gradient(to top, rgba(10, 10, 10, 1) 0%, rgba(10, 10, 10, 0.8) 50%, transparent 100%)'
                                                }} />
                                                
                                                <div style={{
                                                    position: 'absolute',
                                                    top: '20px',
                                                    left: '20px',
                                                    zIndex: 2
                                                }}>
                                                    <span style={{
                                                        fontSize: '10px',
                                                        fontWeight: 800,
                                                        textTransform: 'uppercase',
                                                        letterSpacing: '0.12em',
                                                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                                                        backdropFilter: 'blur(12px)',
                                                        padding: '8px 16px',
                                                        borderRadius: '10px',
                                                        color: theme.accent,
                                                        border: `1px solid ${theme.accent}50`,
                                                        boxShadow: `0 4px 16px ${theme.accent}30`
                                                    }}>
                                                        {relatedCategory}
                                                    </span>
                                                </div>
                                            </div>

                                            <div style={{ padding: '28px' }}>
                                                <p style={{
                                                    fontSize: '12px',
                                                    color: '#777',
                                                    marginBottom: '16px',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '10px'
                                                }}>
                                                    <svg style={{ width: '14px', height: '14px', color: theme.accent }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                    </svg>
                                                    {related.date} 
                                                    <span style={{ 
                                                        width: '4px', 
                                                        height: '4px', 
                                                        backgroundColor: theme.accent, 
                                                        borderRadius: '50%'
                                                    }} />
                                                    {related.readTime}
                                                </p>
                                                
                                                <h4 style={{
                                                    fontSize: '18px',
                                                    fontWeight: 700,
                                                    color: '#fff',
                                                    lineHeight: 1.4,
                                                    marginBottom: '12px'
                                                }}>
                                                    {relatedTitle}
                                                </h4>
                                            </div>
                                        </motion.div>
                                    </Link>
                                );
                            })}
                        </div>
                    </motion.div>
                )}
                
                <div style={{ paddingBottom: '60px' }}>
                    <Footer />
                </div>
            </div>
        </article>
    );
}
