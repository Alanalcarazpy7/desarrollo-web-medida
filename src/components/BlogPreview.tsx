"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { blogPosts } from "@/lib/blog-data";
import { useLanguage } from "@/context/LanguageContext";

export default function BlogPreview() {
    const { language } = useLanguage();
    const theme = {
        accent: "#00d9ff",
        accentDark: "#0099cc",
        accentGlow: "rgba(0, 217, 255, 0.5)",
        text: "#ffffff",
        textMuted: "#888888",
        bgCard: "#0a0a0a",
    };

    // Show only latest 3 posts
    const previewPosts = blogPosts.slice(0, 3);

    return (
        <section id="blog" className="relative py-32 overflow-hidden" style={{ scrollMarginTop: '100px' }}>
            {/* Background glow */}
            <div className="absolute inset-0 pointer-events-none" style={{ contain: 'paint' }}>
                <div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-20"
                    style={{
                        background: `radial-gradient(circle, ${theme.accent}15, transparent 70%)`,
                        filter: 'blur(100px)',
                    }}
                />
            </div>

            <div className="w-full max-w-7xl mx-auto px-6 md:px-8 relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-20"
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, type: "spring" }}
                        className="inline-flex items-center gap-3 px-6 py-3 mb-8 rounded-full cursor-default"
                        style={{
                            background: `linear-gradient(135deg, ${theme.bgCard}cc, #111111cc)`,
                            border: `2px solid ${theme.accent}30`,
                            backdropFilter: "blur(20px)",
                        }}
                    >
                        <motion.span
                            className="w-3 h-3 rounded-full"
                            style={{ background: theme.accent, boxShadow: `0 0 20px ${theme.accentGlow}` }}
                            animate={{ scale: [1, 1.3, 1], opacity: [1, 0.7, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        />
                        <span className="text-sm font-bold uppercase tracking-[0.2em]" style={{ color: theme.accent }}>
                            Blog & Noticias
                        </span>
                    </motion.div>

                    <h2 className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 px-4" style={{ margin: '1rem 0' }}>
                        <span style={{ color: theme.text }}>Últimas </span>
                        <span
                            style={{
                                background: `linear-gradient(135deg, ${theme.accent}, ${theme.accentDark})`,
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                            }}
                        >
                            Novedades
                        </span>
                    </h2>

                    <p className="text-base md:text-xl max-w-3xl mx-auto leading-relaxed opacity-80" style={{ color: theme.textMuted, margin: '1rem 0' }}>
                        Ideas, guías y estrategias para impulsar tu presencia digital
                    </p>
                </motion.div>

                {/* Blog Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                    {previewPosts.map((post, index) => (
                        <motion.div
                            key={post.slug}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.15, duration: 0.6, type: "spring" }}
                            whileHover={{ y: -8 }}
                        >
                            <Link href={`/${language}/blog/${post.slug}`} className="block h-full">
                                <div
                                    className="group relative h-full rounded-2xl overflow-hidden cursor-pointer"
                                    style={{
                                        background: `linear-gradient(180deg, transparent 0%, ${theme.bgCard} 100%)`,
                                        border: `1px solid rgba(255,255,255,0.06)`,
                                        transition: 'all 0.4s ease',
                                    }}
                                >
                                    {/* Cover Image */}
                                    <div className="relative h-48 overflow-hidden">
                                        <div 
                                            className="absolute inset-0 group-hover:scale-110"
                                            style={{
                                                backgroundImage: `url(${post.image})`,
                                                backgroundSize: 'cover',
                                                backgroundPosition: 'center',
                                                transition: 'transform 0.5s ease'
                                            }} 
                                        />

                                        {/* Overlay gradient */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />

                                        {/* Category badge */}
                                        <div className="absolute top-4 left-4">
                                            <span
                                                className="px-3 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider backdrop-blur-md"
                                                style={{
                                                    background: `${theme.accent}20`,
                                                    color: theme.accent,
                                                    border: `1px solid ${theme.accent}40`,
                                                }}
                                            >
                                                {post.category}
                                            </span>
                                        </div>

                                        {/* Read time */}
                                        <div className="absolute top-4 right-4">
                                            <span className="text-xs font-medium text-white/60">{post.readTime}</span>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-6">
                                        <p className="text-xs font-medium mb-3" style={{ color: theme.textMuted }}>
                                            {post.date}
                                        </p>

                                        <h3
                                            className="text-lg md:text-xl font-bold mb-3 leading-tight group-hover:text-[#00d9ff] transition-colors duration-300 line-clamp-2"
                                            style={{ color: theme.text }}
                                        >
                                            {post.title}
                                        </h3>

                                        <p className="text-sm leading-relaxed mb-6 line-clamp-2" style={{ color: theme.textMuted }}>
                                            {post.excerpt}
                                        </p>

                                        <div className="flex items-center gap-2 text-sm font-bold group-hover:gap-3 transition-all duration-300" style={{ color: theme.accent }}>
                                            Leer artículo
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                            </svg>
                                        </div>
                                    </div>

                                    {/* Hover glow border */}
                                    <div
                                        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                                        style={{ border: `1px solid ${theme.accent}30` }}
                                    />
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>

                {/* CTA Button */}
                <motion.div
                    className="text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                >
                    <Link href={`/${language}/blog`}>
                        <motion.button
                            className="relative px-10 py-4 rounded-full font-bold text-lg overflow-hidden group cursor-pointer"
                            style={{
                                background: 'transparent',
                                border: `2px solid ${theme.accent}`,
                                color: theme.accent,
                            }}
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <span className="relative z-10 flex items-center gap-3">
                                Ver todas las noticias
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </span>

                            {/* Hover fill effect */}
                            <motion.div
                                className="absolute inset-0 rounded-full"
                                style={{ background: theme.accent, opacity: 0 }}
                                whileHover={{ opacity: 0.15 }}
                            />
                        </motion.button>
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
