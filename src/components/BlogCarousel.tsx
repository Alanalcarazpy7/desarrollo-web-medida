"use client";

import { motion, useMotionValue, useAnimationFrame, animate } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { blogPosts } from "@/lib/blog-data";
import { useLanguage } from "@/context/LanguageContext";

export default function BlogCarousel() {
    const { language } = useLanguage();
    
    // Configuración
    // Configuración
    const VISIBLE_POSTS_LIMIT = 8;
    const CARD_WIDTH_DESKTOP = 280; // 260px + 24px gap
    const CARD_WIDTH_MOBILE = 240;  // 220px + 24px gap (Super compacto)
    const SPEED_PIXELS_PER_SECOND = 60; // Velocidad de desplazamiento

    // Filtrar y duplicar posts para el efecto infinito
    const recentPosts = blogPosts.slice(0, VISIBLE_POSTS_LIMIT);
    // Duplicamos x4 para asegurar un loop muy largo y suave sin saltos visibles
    const extendedPosts = [...recentPosts, ...recentPosts, ...recentPosts, ...recentPosts];

    const containerRef = useRef<HTMLDivElement>(null);
    const [cardWidth, setCardWidth] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    
    // Motion Value para la posición X
    const x = useMotionValue(0);
    const xRef = useRef(0); // Referencia mutable para el loop sin re-renders

    // Medir el ancho de una card
    useEffect(() => {
        const checkWidth = () => {
            if (window.innerWidth >= 768) {
                setCardWidth(CARD_WIDTH_DESKTOP);
            } else {
                setCardWidth(CARD_WIDTH_MOBILE);
            }
        };
        
        checkWidth();
        window.addEventListener('resize', checkWidth);
        return () => window.removeEventListener('resize', checkWidth);
    }, []);

    // Loop infinito ROBUSTO: Pausa exacta sin reiniciar
    useAnimationFrame((t, delta) => {
        if (cardWidth > 0) {
            const totalWidth = cardWidth * recentPosts.length;
            
            // Solo movemos si NO está en hover. Si está en hover, no restamos nada.
            // Al no restar, xRef.current se mantiene IGUAL, logrando la pausa perfecta.
            if (!isHovered) {
                const moveBy = (SPEED_PIXELS_PER_SECOND * delta) / 1000;
                xRef.current -= moveBy;
            }

            // Lógica de loop infinito de fondo
            if (xRef.current <= -totalWidth) {
                xRef.current += totalWidth; 
            }
            
            x.set(xRef.current);
        }
    });

    // Botones Manuales
    const handleManualScroll = (direction: 'left' | 'right') => {
        const moveAmount = cardWidth;
        const targetX = direction === 'left' 
            ? xRef.current + moveAmount 
            : xRef.current - moveAmount;
        
        // Animamos a la nueva posición y actualizamos la REF al terminar
        animate(x, targetX, {
            duration: 0.5,
            ease: "circOut",
            onUpdate: (latest) => {
                xRef.current = latest;
            }
        });
    };

    return (
        <section 
            id="blog" 
            className="relative py-32 overflow-hidden flex flex-col items-center bg-transparent"
            style={{marginTop: '100px', scrollMarginTop: '100px' }}
        >
            {/* Espaciado EXTRA en el Header */}
            <div className="w-full max-w-7xl px-4 md:px-8 relative z-10 mb-20">
                <div className="flex flex-col items-center text-center">
                    
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, type: "spring" }}
                        className="inline-flex items-center gap-3 px-6 py-3 mb-8 rounded-full cursor-default backdrop-blur-md border border-[#00d9ff]/20 bg-[#00d9ff]/5"
                    >
                        <motion.span
                            className="w-3 h-3 rounded-full bg-[#00d9ff]"
                            animate={{ boxShadow: ["0 0 0 rgba(0,217,255,0)", "0 0 20px rgba(0,217,255,0.5)", "0 0 0 rgba(0,217,255,0)"] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        />
                        <span className="text-sm font-bold uppercase tracking-[0.2em] text-[#00d9ff]">
                            {language === 'es' ? 'Blog & Novedades' : 'Blog & News'}
                        </span>
                    </motion.div>

                    <motion.h2 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0,margin:"1rem 0" }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-6xl font-black mb-8"
                    >
                        <span className="text-white">
                            {language === 'es' ? 'Últimos ' : 'Latest '}
                        </span>
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#00d9ff] to-[#0099cc]">
                            {language === 'es' ? 'Artículos' : 'Articles'}
                        </span>
                    </motion.h2>
                    
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0,margin:"1rem 0" }}
                        viewport={{ once: true }}
                        className="text-gray-400 max-w-2xl text-lg leading-relaxed mb-12"
                    >
                        {language === 'es' 
                            ? 'Explora tendencias en tecnología, estrategias de crecimiento y guías para potenciar tu negocio digital.'
                            : 'Explore technology trends, growth strategies, and guides to boost your digital business.'}
                    </motion.p>
                </div>
                
                {/* Controles Manuales - Rediseñados */}
                <div className="flex justify-end gap-3 mb-8 px-4 w-full max-w-7xl mx-auto">
                    <motion.button 
                        onClick={() => handleManualScroll('left')}
                        className="relative rounded-full border-2 border-[#00d9ff]/40 bg-[#00d9ff]/5 backdrop-blur-sm cursor-pointer overflow-hidden"
                        aria-label="Previous slide"
                        style={{ padding: '12px' }}
                        whileHover={{ 
                            scale: 1.1,
                            borderColor: "rgba(0, 217, 255, 0.8)",
                            backgroundColor: "rgba(0, 217, 255, 0.15)",
                            boxShadow: "0 0 20px rgba(0, 217, 255, 0.5)"
                        }}
                        whileTap={{ scale: 0.9 }}
                        transition={{ duration: 0.2 }}
                    >
                        <svg className="w-5 h-5 text-[#00d9ff]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                        </svg>
                    </motion.button>
                    
                    <motion.button 
                        onClick={() => handleManualScroll('right')}
                        className="relative rounded-full border-2 border-[#00d9ff]/40 bg-[#00d9ff]/5 backdrop-blur-sm cursor-pointer overflow-hidden"
                        aria-label="Next slide"
                        style={{ padding: '12px' }}
                        whileHover={{ 
                            scale: 1.1,
                            borderColor: "rgba(0, 217, 255, 0.8)",
                            backgroundColor: "rgba(0, 217, 255, 0.15)",
                            boxShadow: "0 0 20px rgba(0, 217, 255, 0.5)"
                        }}
                        whileTap={{ scale: 0.9 }}
                        transition={{ duration: 0.2 }}
                    >
                        <svg className="w-5 h-5 text-[#00d9ff]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                        </svg>
                    </motion.button>
                </div>
            </div>

            {/* Carousel Container */}
            <div 
                ref={containerRef} 
                className="w-full max-w-7xl px-4 relative z-30 overflow-x-hidden py-12" 
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {/* Máscaras laterales FUERTES - Cubren completamente los bordes */}
                <div className="absolute left-0 top-0 bottom-0 w-20 md:w-64 bg-gradient-to-r from-[#030014] via-[#030014] via-[#030014] to-transparent z-50 pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-20 md:w-64 bg-gradient-to-l from-[#030014] via-[#030014] via-[#030014] to-transparent z-50 pointer-events-none" />

                {/* Main Content Clipper */}
                <motion.div 
                    className="cursor-grab active:cursor-grabbing flex items-center justify-center" 
                >
                    <motion.div 
                        drag="x"
                        dragConstraints={containerRef} 
                        style={{ x }}
                        className="flex gap-6 w-max"
                        onDragStart={() => setIsHovered(true)}
                        onDragEnd={() => setIsHovered(false)}
                    >
                        {extendedPosts.map((post, index) => {
                            const isDuplicate = index >= recentPosts.length;
                            return (
                            <Link 
                                key={`${post.slug}-${index}-extended`} 
                                href={`/${language}/blog/${post.slug}`}
                                className="relative block flex-shrink-0 group" 
                                aria-hidden={isDuplicate ? "true" : "false"}
                                tabIndex={isDuplicate ? -1 : 0}
                            >
                                <div 
                                    className="w-[220px] md:w-[260px] h-[300px] md:h-[340px] rounded-2xl overflow-hidden bg-[#0a0a0a] border border-white/10 hover:border-[#00d9ff] relative transition-all duration-300 hover:shadow-[0_10px_30px_rgba(0,217,255,0.2)]"
                                >
                                    {/* Image */}
                                    <div className="absolute inset-0 h-full w-full">
                                        <Image 
                                            src={post.image} 
                                            alt={language === 'es' ? post.title : post.titleEn}
                                            fill
                                            className="object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-500" 
                                            sizes="(max-width: 768px) 220px, 260px"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black via-[#000000dd] to-transparent opacity-80 group-hover:opacity-50 transition-opacity duration-500" />
                                    </div>

                                    {/* Content Overlay */}
                                    <div 
                                        className="absolute bottom-0 inset-x-0 flex flex-col justify-end h-full transform transition-transform duration-500"
                                        style={{ padding: '4px 7px' }}
                                    >
                                        <div className="mb-auto flex justify-between items-start opacity-100 group-hover:opacity-100 transition-opacity" style={{ paddingTop: '12px', paddingBottom: '12px' }}>
                                            <span className="rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#00d9ff] text-black border border-[#00d9ff] shadow-[0_0_15px_rgba(0,217,255,0.4)]" style={{ padding: '8px 16px' }}>
                                                {language === 'es' ? post.category : post.categoryEn}
                                            </span>
                                        </div>
                                        
                                        <div className="space-y-4 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                                            {/* Metadata */}
                                            <div className="flex items-center gap-3 text-[10px] text-gray-300 font-medium uppercase tracking-wide border-b border-white/10 pb-3 mb-3">
                                                <div className="flex items-center gap-1.5 text-[#00d9ff]">
                                                     <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                    </svg>
                                                    <span>{post.author}</span>
                                                </div>
                                                <span className="w-1 h-1 rounded-full bg-gray-600" />
                                                <span>{post.date}</span>
                                            </div>

                                            <h3 
                                                className="text-lg md:text-xl font-bold leading-tight text-white group-hover:text-[#00d9ff] transition-colors line-clamp-2 drop-shadow-lg"
                                                style={{ marginBottom: '16px' }}
                                            >                                                {language === 'es' ? post.title : post.titleEn}
                                            </h3>
                                            
                                            <div 
                                                className="flex items-center gap-2 text-[#00d9ff] font-bold text-sm opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-[-10px] group-hover:translate-x-0"
                                                style={{ padding: '8px 4px', marginTop: '16px' }}
                                            >                                                <span>{language === 'es' ? 'Leer Artículo' : 'Read Article'}</span>
                                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                            );
                        })}
                    </motion.div>
                </motion.div>
            </div>

            {/* Espaciado EXTRA antes del botón */}
            <div className="mt-20 text-center z-10 w-full flex justify-center" style={{margin:"2rem 0"}}>
                <Link href={`/${language}/blog`} className="relative group inline-block">
                    <div className="absolute inset-0 bg-[#00d9ff]/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <motion.div
                        className="relative px-12 py-5 bg-[#0a0a0a] border border-[#00d9ff]/30 rounded-full flex items-center gap-4 overflow-hidden shadow-lg shadow-[#00d9ff]/5" style={{padding:"0.5rem"}}
                        whileHover={{ scale: 1.05, borderColor: "rgba(0, 217, 255, 0.8)", boxShadow: "0 0 30px rgba(0, 217, 255, 0.2)" }}
                        whileTap={{ scale: 0.95 }}
                    >
                         <span className="absolute inset-0 bg-gradient-to-r from-[#00d9ff]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"/>
                         
                         <span className="font-bold text-base tracking-widest uppercase text-[#00d9ff] group-hover:text-white transition-colors duration-300 z-10">
                            {language === 'es' ? 'Ver todas las noticias' : 'View all news'}
                         </span>
                         
                         <div className="w-8 h-8 rounded-full bg-[#00d9ff]/10 flex items-center justify-center group-hover:bg-[#00d9ff] transition-all duration-300 z-10">
                             <svg className="w-5 h-5 text-[#00d9ff] group-hover:text-black transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                         </div>
                    </motion.div>
                </Link>
            </div>
        </section>
    );
}
