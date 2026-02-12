"use client";

import { useLanguage } from "@/context/LanguageContext";
import { blogPosts } from '@/lib/blog-data';
import Link from 'next/link';
import BlogCard from "@/components/BlogCard";
import Navbar from "@/components/Navbar";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useMemo } from "react";

const SnowEffect = dynamic(() => import("@/components/SnowEffect"), { 
    ssr: false,
    loading: () => null
});

const Footer = dynamic(() => import("@/components/Footer"), { ssr: true });

export default function BlogPageContent() {
    const { language } = useLanguage();
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");

    const theme = {
        accent: "#00d9ff",
        accentDark: "#0099cc",
        text: "#ffffff",
        textMuted: "#888888",
    };

    // Get unique categories
    const categories = useMemo(() => {
        const cats = new Set(blogPosts.map(post => language === 'es' ? post.category : post.categoryEn));
        return ['all', ...Array.from(cats)];
    }, [language]);

    // Filter posts
    const filteredPosts = useMemo(() => {
        return blogPosts.filter(post => {
            const title = language === 'es' ? post.title : post.titleEn;
            const excerpt = language === 'es' ? post.excerpt : post.excerptEn;
            const category = language === 'es' ? post.category : post.categoryEn;
            
            const matchesSearch = searchTerm === "" || 
                title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                category.toLowerCase().includes(searchTerm.toLowerCase());
            
            const matchesCategory = selectedCategory === "all" || category === selectedCategory;
            
            return matchesSearch && matchesCategory;
        });
    }, [searchTerm, selectedCategory, language]);

    return (
        <main style={{
            minHeight: '100vh',
            backgroundColor: '#000',
            color: '#fff',
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            overflowX: 'hidden',
            position: 'relative'
        }}>
            <Navbar />
            
            {/* Snow Effect - Background Layer */}
            <div style={{ 
                position: 'fixed', 
                inset: 0, 
                pointerEvents: 'none', 
                zIndex: 0 
            }}>
                <SnowEffect />
            </div>

            {/* ContentWrapper - Reduced spacing from navbar */}
            <div style={{ 
                position: 'relative', 
                zIndex: 10, 
                paddingTop: '100px' // Increased to clear Navbar but keep it tight 
            }}>
                
                {/* Hero Header */}
                <section style={{ 
                    position: 'relative', 
                    width: '100%', 
                    overflow: 'hidden',
                    paddingTop: '30px', // Reduced padding
                    paddingBottom: '0px' // Removed bottom padding
                }}>
                    {/* Background Effects */}
                    <div style={{ 
                        position: 'absolute', 
                        inset: 0, 
                        pointerEvents: 'none' 
                    }}>
                        <motion.div 
                            style={{ 
                                position: 'absolute',
                                top: 0,
                                left: '25%',
                                width: '600px',
                                height: '600px',
                                borderRadius: '50%',
                                opacity: 0.3,
                                filter: 'blur(120px)',
                                background: `radial-gradient(circle, ${theme.accent}, transparent 70%)`
                            }}
                            animate={{
                                scale: [1, 1.2, 1],
                                opacity: [0.2, 0.35, 0.2],
                                x: [0, 50, 0],
                            }}
                            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                        />
                        <motion.div 
                            style={{ 
                                position: 'absolute',
                                bottom: 0,
                                right: '25%',
                                width: '700px',
                                height: '700px',
                                borderRadius: '50%',
                                opacity: 0.2,
                                filter: 'blur(140px)',
                                background: 'radial-gradient(circle, #6366f1, transparent 70%)'
                            }}
                            animate={{
                                scale: [1, 1.3, 1],
                                opacity: [0.15, 0.25, 0.15],
                                x: [0, -50, 0],
                            }}
                            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                        />
                    </div>

                    <div style={{ 
                        maxWidth: '1280px', 
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        paddingLeft: 'clamp(16px, 5vw, 32px)', 
                        paddingRight: 'clamp(16px, 5vw, 32px)',
                        position: 'relative',
                        zIndex: 20
                    }}>
                        
                        {/* Compact Header Layout */}
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            textAlign: 'center',
                            gap: '20px',
                            maxWidth: '900px',
                            marginLeft: 'auto',
                            marginRight: 'auto'
                        }}>
                        

                            {/* Main Title Compact */}
                            <motion.h1 
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                                style={{
                                    fontSize: 'clamp(2rem, 5vw, 3.5rem)', // Reduced size
                                    fontWeight: 900,
                                    lineHeight: 1.1,
                                    margin: 0
                                }}
                            >
                                <span style={{ color: '#fff' }}>
                                    {language === 'es' ? 'Conocimiento' : 'Knowledge'}
                                </span>{' '}
                                <span 
                                    style={{
                                        background: `linear-gradient(135deg, ${theme.accent} 0%, ${theme.accentDark} 100%)`,
                                        WebkitBackgroundClip: "text",
                                        WebkitTextFillColor: "transparent",
                                    }}
                                >
                                    {language === 'es' ? 'Digital' : 'Digital'}
                                </span>
                            </motion.h1>

                            {/* Ultra Compact Description */}
                            <motion.p 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5, delay: 0.1 }}
                                style={{
                                    fontSize: 'clamp(14px, 2vw, 16px)',
                                    color: '#999',
                                    maxWidth: '600px',
                                    margin: 0
                                }}
                            >
                                {language === 'es' 
                                    ? 'Insights sobre desarrollo web, estrategia digital y tecnología.'
                                    : 'Insights on web development, digital strategy, and technology.'}
                            </motion.p>
                        </div>
                    </div>
                </section>

                {/* Search and Filter Section - Moved Up & Compacted */}
                <section style={{
                    position: 'relative',
                    paddingTop: '0px', // Removed padding
                    paddingBottom: '20px'
                }}>
                    <div style={{ 
                        maxWidth: '1280px', 
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        paddingLeft: 'clamp(16px, 5vw, 32px)', 
                        paddingRight: 'clamp(16px, 5vw, 32px)'
                    }}>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '16px', // Reduced gap
                                marginBottom: '20px' // Reduced margin
                            }}
                        >
                            {/* Search Bar */}
                            <div style={{
                                position: 'relative',
                                width: '100%',
                                maxWidth: '600px',
                                marginLeft: 'auto',
                                marginRight: 'auto'
                            }}>
                                <svg 
                                    style={{
                                        position: 'absolute',
                                        left: '20px',
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                        width: '20px',
                                        height: '20px',
                                        color: '#666',
                                        pointerEvents: 'none'
                                    }}
                                    fill="none" 
                                    viewBox="0 0 24 24" 
                                    stroke="currentColor"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                                <input
                                    type="text"
                                    placeholder={language === 'es' ? 'Buscar artículos...' : 'Search articles...'}
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    style={{
                                        width: '100%',
                                        padding: '16px 20px 16px 56px',
                                        borderRadius: '9999px',
                                        backgroundColor: 'rgba(255, 255, 255, 0.05)',
                                        border: '1px solid rgba(255, 255, 255, 0.1)',
                                        color: '#fff',
                                        fontSize: '16px',
                                        outline: 'none',
                                        transition: 'all 0.3s'
                                    }}
                                    onFocus={(e) => {
                                        e.target.style.borderColor = 'rgba(0, 217, 255, 0.5)';
                                        e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.08)';
                                    }}
                                    onBlur={(e) => {
                                        e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                                        e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                                    }}
                                />
                            </div>

                            {/* Category Filters */}
                            <div style={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                gap: '12px',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                {categories.map((cat) => (
                                    <motion.button
                                        key={cat}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => setSelectedCategory(cat)}
                                        style={{
                                            padding: '10px 24px',
                                            borderRadius: '9999px',
                                            backgroundColor: selectedCategory === cat 
                                                ? 'rgba(0, 217, 255, 0.2)' 
                                                : 'rgba(255, 255, 255, 0.05)',
                                            border: selectedCategory === cat 
                                                ? '1px solid rgba(0, 217, 255, 0.5)' 
                                                : '1px solid rgba(255, 255, 255, 0.1)',
                                            color: selectedCategory === cat ? theme.accent : '#999',
                                            fontSize: '14px',
                                            fontWeight: 600,
                                            cursor: 'pointer',
                                            transition: 'all 0.3s',
                                            textTransform: 'capitalize'
                                        }}
                                    >
                                        {cat === 'all' ? (language === 'es' ? 'Todos' : 'All') : cat}
                                    </motion.button>
                                ))}
                            </div>

                            {/* Results Count */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                style={{
                                    textAlign: 'center',
                                    color: '#666',
                                    fontSize: '14px',
                                    fontWeight: 500
                                }}
                            >
                                {language === 'es' 
                                    ? `${filteredPosts.length} artículo${filteredPosts.length !== 1 ? 's' : ''} encontrado${filteredPosts.length !== 1 ? 's' : ''}`
                                    : `${filteredPosts.length} article${filteredPosts.length !== 1 ? 's' : ''} found`}
                            </motion.div>
                        </motion.div>
                    </div>
                </section>

                {/* Articles Section */}
                <section style={{ 
                    position: 'relative',
                    paddingTop: '20px',
                    paddingBottom: '80px'
                }}>
                    <div style={{ 
                        maxWidth: '1280px', 
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        paddingLeft: 'clamp(16px, 5vw, 32px)', 
                        paddingRight: 'clamp(16px, 5vw, 32px)'
                    }}>
                        
                        {/* Articles Grid */}
                        <AnimatePresence mode="wait">
                            {filteredPosts.length > 0 ? (
                                <motion.div 
                                    key="grid"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.5 }}
                                    style={{
                                        display: 'grid',
                                        gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 350px), 1fr))',
                                        gap: 'clamp(24px, 4vw, 40px)'
                                    }}
                                >
                                    {filteredPosts.map((post, index) => (
                                        <BlogCard 
                                            key={post.slug}
                                            {...post}
                                            index={index}
                                        />
                                    ))}
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="empty"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    style={{
                                        textAlign: 'center',
                                        padding: '80px 20px',
                                        color: '#666'
                                    }}
                                >
                                    <svg 
                                        style={{ 
                                            width: '64px', 
                                            height: '64px', 
                                            marginLeft: 'auto',
                                            marginRight: 'auto',
                                            marginBottom: '24px',
                                            opacity: 0.5
                                        }} 
                                        fill="none" 
                                        viewBox="0 0 24 24" 
                                        stroke="currentColor"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <h3 style={{ 
                                        fontSize: '24px', 
                                        fontWeight: 700, 
                                        marginBottom: '12px',
                                        color: '#999'
                                    }}>
                                        {language === 'es' ? 'No se encontraron artículos' : 'No articles found'}
                                    </h3>
                                    <p style={{ fontSize: '16px', color: '#666' }}>
                                        {language === 'es' 
                                            ? 'Intenta ajustar tus filtros de búsqueda' 
                                            : 'Try adjusting your search filters'}
                                    </p>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* CTA Section */}
                        {filteredPosts.length > 0 && (
                            <motion.div 
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                                style={{ marginTop: 'clamp(60px, 10vw, 120px)' }}
                            >
                                <div style={{
                                    position: 'relative',
                                    overflow: 'hidden',
                                    borderRadius: '24px',
                                    background: 'linear-gradient(to bottom right, #0a0a0a, #0a0a0f, #0a0a0a)',
                                    border: '1px solid rgba(255, 255, 255, 0.1)',
                                    padding: 'clamp(40px, 8vw, 80px) clamp(20px, 5vw, 40px)'
                                }}>
                                    
                                    {/* Background Effects */}
                                    <div style={{ 
                                        position: 'absolute', 
                                        inset: 0, 
                                        overflow: 'hidden' 
                                    }}>
                                        <motion.div
                                            style={{
                                                position: 'absolute',
                                                top: 0,
                                                right: 0,
                                                width: '400px',
                                                height: '400px',
                                                borderRadius: '50%',
                                                opacity: 0.2,
                                                filter: 'blur(100px)',
                                                background: `radial-gradient(circle, ${theme.accent}, transparent)`
                                            }}
                                            animate={{
                                                scale: [1, 1.2, 1],
                                                opacity: [0.2, 0.3, 0.2]
                                            }}
                                            transition={{ duration: 8, repeat: Infinity }}
                                        />
                                        <motion.div
                                            style={{
                                                position: 'absolute',
                                                bottom: 0,
                                                left: 0,
                                                width: '400px',
                                                height: '400px',
                                                borderRadius: '50%',
                                                opacity: 0.15,
                                                filter: 'blur(100px)',
                                                background: 'radial-gradient(circle, #6366f1, transparent)'
                                            }}
                                            animate={{
                                                scale: [1, 1.3, 1],
                                                opacity: [0.15, 0.25, 0.15]
                                            }}
                                            transition={{ duration: 10, repeat: Infinity, delay: 1 }}
                                        />
                                    </div>

                                    {/* Content */}
                                    <div style={{ 
                                        position: 'relative', 
                                        zIndex: 10, 
                                        textAlign: 'center',
                                        maxWidth: '800px',
                                        marginLeft: 'auto',
                                        marginRight: 'auto'
                                    }}>
                                        <motion.div
                                            initial={{ scale: 0.9 }}
                                            whileInView={{ scale: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.5 }}
                                            style={{
                                                display: 'inline-flex',
                                                alignItems: 'center',
                                                gap: '8px',
                                                padding: '8px 16px',
                                                borderRadius: '9999px',
                                                backgroundColor: 'rgba(0, 217, 255, 0.1)',
                                                border: '1px solid rgba(0, 217, 255, 0.3)',
                                                marginBottom: '24px'
                                            }}
                                        >
                                            <svg style={{ width: '16px', height: '16px', color: theme.accent }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                            </svg>
                                            <span style={{
                                                fontSize: '11px',
                                                fontWeight: 700,
                                                textTransform: 'uppercase',
                                                letterSpacing: '0.1em',
                                                color: theme.accent
                                            }}>
                                                {language === 'es' ? 'Empecemos' : "Let's Start"}
                                            </span>
                                        </motion.div>

                                        <h3 style={{
                                            fontSize: 'clamp(1.75rem, 5vw, 3.5rem)',
                                            fontWeight: 900,
                                            marginBottom: '24px',
                                            background: 'linear-gradient(to right, #fff, #ccc, #fff)',
                                            WebkitBackgroundClip: 'text',
                                            WebkitTextFillColor: 'transparent'
                                        }}>
                                            {language === 'es' ? '¿Listo para transformar tu presencia digital?' : 'Ready to transform your digital presence?'}
                                        </h3>
                                        
                                        <p style={{
                                            color: '#999',
                                            fontSize: 'clamp(16px, 2vw, 18px)',
                                            marginBottom: '40px',
                                            lineHeight: 1.7,
                                            maxWidth: '600px',
                                            marginLeft: 'auto',
                                            marginRight: 'auto'
                                        }}>
                                            {language === 'es' 
                                                ? 'Conversemos sobre tu proyecto y descubramos cómo podemos ayudarte a alcanzar tus objetivos.'
                                                : "Let's talk about your project and discover how we can help you achieve your goals."}
                                        </p>

                                        <Link href="/#contacto" style={{ textDecoration: 'none' }}>
                                            <motion.button
                                                whileHover={{ scale: 1.05, boxShadow: '0 12px 48px rgba(0, 217, 255, 0.4)' }}
                                                whileTap={{ scale: 0.95 }}
                                                style={{
                                                    position: 'relative',
                                                    padding: 'clamp(16px, 3vw, 20px) clamp(32px, 6vw, 48px)',
                                                    borderRadius: '9999px',
                                                    fontWeight: 700,
                                                    fontSize: 'clamp(16px, 2vw, 18px)',
                                                    overflow: 'hidden',
                                                    backgroundColor: theme.accent,
                                                    color: '#000',
                                                    border: 'none',
                                                    cursor: 'pointer',
                                                    boxShadow: `0 8px 32px rgba(0, 217, 255, 0.3)`,
                                                    transition: 'all 0.3s'
                                                }}
                                            >
                                                <span style={{
                                                    position: 'relative',
                                                    zIndex: 10,
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '8px'
                                                }}>
                                                    {language === 'es' ? 'Contactar Ahora' : 'Contact Now'}
                                                    <svg style={{ width: '20px', height: '20px' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                                    </svg>
                                                </span>
                                            </motion.button>
                                        </Link>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </div>
                </section>
            </div>

            <Footer />
            
            {/* Keyframes para animaciones */}
            <style jsx global>{`
                @keyframes gradient {
                    0%, 100% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                }
            `}</style>
        </main>
    );
}
