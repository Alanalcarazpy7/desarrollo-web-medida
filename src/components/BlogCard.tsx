"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { useState } from "react";

interface BlogCardProps {
    slug: string;
    title: string;
    titleEn: string;
    excerpt: string;
    excerptEn: string;
    date: string;
    readTime: string;
    author: string;
    category: string;
    categoryEn: string;
    image: string;
    index: number;
}

export default function BlogCard({
    slug,
    title,
    titleEn,
    excerpt,
    excerptEn,
    date,
    readTime,
    author,
    category,
    categoryEn,
    image,
    index
}: BlogCardProps) {
    const { language } = useLanguage();
    const [isHovered, setIsHovered] = useState(false);
    
    const displayTitle = language === 'es' ? title : titleEn;
    const displayExcerpt = language === 'es' ? excerpt : excerptEn;
    const displayCategory = language === 'es' ? category : categoryEn;
    const readMoreText = language === 'es' ? "Leer más" : "Read more";

    return (
        <motion.article
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ 
                delay: index * 0.1, 
                duration: 0.7,
                ease: [0.25, 0.46, 0.45, 0.94]
            }}
            style={{ height: '100%' }}
        >
            <Link 
                href={`/blog/${slug}`} 
                style={{ 
                    textDecoration: 'none', 
                    display: 'block',
                    height: '100%'
                }}
            >
                <motion.div
                    onHoverStart={() => setIsHovered(true)}
                    onHoverEnd={() => setIsHovered(false)}
                    animate={{
                        y: isHovered ? -12 : 0
                    }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    style={{
                        position: 'relative',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        background: 'linear-gradient(to bottom, #0a0a0a, #050505)',
                        borderRadius: '20px',
                        overflow: 'hidden',
                        border: `1px solid ${isHovered ? 'rgba(0, 217, 255, 0.3)' : 'rgba(255, 255, 255, 0.05)'}`,
                        boxShadow: isHovered ? '0 24px 72px rgba(0, 217, 255, 0.25)' : 'none',
                        transition: 'border-color 0.4s, box-shadow 0.4s',
                        cursor: 'pointer'
                    }}
                >
                    
                    {/* Animated Glow Effect */}
                    <motion.div 
                        style={{
                            position: 'absolute',
                            inset: 0,
                            opacity: isHovered ? 0.15 : 0,
                            pointerEvents: 'none',
                            borderRadius: '20px',
                            background: 'radial-gradient(circle at 50% 50%, rgba(0, 217, 255, 0.4), transparent 70%)',
                            transition: 'opacity 0.4s'
                        }}
                    />

                    {/* Image Container */}
                    <div style={{ 
                        position: 'relative', 
                        width: '100%', 
                        aspectRatio: '16/9',
                        overflow: 'hidden'
                    }}>
                        <motion.div
                            animate={{
                                scale: isHovered ? 1.15 : 1
                            }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                            style={{
                                position: 'relative',
                                width: '100%',
                                height: '100%'
                            }}
                        >
                            <Image 
                                src={image} 
                                alt={displayTitle}
                                fill
                                style={{ 
                                    objectFit: 'cover',
                                    filter: isHovered ? 'brightness(1.1)' : 'brightness(1)',
                                    transition: 'filter 0.4s'
                                }}
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                priority={index < 3}
                            />
                        </motion.div>
                        
                        {/* Gradient overlay */}
                        <div style={{
                            position: 'absolute',
                            inset: 0,
                            background: 'linear-gradient(to top, #0a0a0a, rgba(10, 10, 10, 0.3), transparent)',
                            opacity: isHovered ? 0.4 : 0.6,
                            transition: 'opacity 0.4s'
                        }} />

                        {/* Category badge */}
                        <div style={{
                            position: 'absolute',
                            top: '16px',
                            left: '16px',
                            zIndex: 10
                        }}>
                            <motion.span
                                animate={{
                                    scale: isHovered ? 1.1 : 1,
                                    y: isHovered ? -2 : 0
                                }}
                                transition={{ duration: 0.3 }}
                                style={{
                                    display: 'inline-block',
                                    padding: '8px 16px',
                                    fontSize: '10px',
                                    fontWeight: 700,
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.1em',
                                    borderRadius: '9999px',
                                    backdropFilter: 'blur(12px)',
                                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                                    border: '1px solid rgba(0, 217, 255, 0.5)',
                                    color: '#00d9ff',
                                    boxShadow: isHovered ? '0 8px 24px rgba(0, 217, 255, 0.4)' : '0 4px 12px rgba(0, 0, 0, 0.3)',
                                    transition: 'box-shadow 0.3s'
                                }}
                            >
                                {displayCategory}
                            </motion.span>
                        </div>

                        {/* Read time indicator */}
                        <div style={{
                            position: 'absolute',
                            top: '16px',
                            right: '16px',
                            zIndex: 10
                        }}>
                            <motion.div
                                animate={{
                                    scale: isHovered ? 1.05 : 1
                                }}
                                transition={{ duration: 0.3 }}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '6px',
                                    padding: '8px 12px',
                                    borderRadius: '9999px',
                                    backdropFilter: 'blur(12px)',
                                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                                    border: '1px solid rgba(255, 255, 255, 0.1)'
                                }}
                            >
                                <motion.svg 
                                    animate={{
                                        rotate: isHovered ? 360 : 0
                                    }}
                                    transition={{ duration: 0.6 }}
                                    style={{ width: '14px', height: '14px', color: '#999' }} 
                                    fill="none" 
                                    viewBox="0 0 24 24" 
                                    stroke="currentColor"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </motion.svg>
                                <span style={{
                                    fontSize: '10px',
                                    fontWeight: 600,
                                    color: '#ccc',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.05em'
                                }}>
                                    {readTime}
                                </span>
                            </motion.div>
                        </div>
                    </div>

                    {/* Content */}
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        flexGrow: 1,
                        padding: 'clamp(24px, 4vw, 32px) clamp(20px, 3vw, 28px)',
                        position: 'relative'
                    }}>
                        
                        {/* Date */}
                        <motion.div 
                            animate={{
                                x: isHovered ? 4 : 0
                            }}
                            transition={{ duration: 0.3 }}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                marginBottom: '16px'
                            }}
                        >
                            <svg style={{ width: '14px', height: '14px', color: '#666' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span style={{
                                fontSize: '12px',
                                fontWeight: 500,
                                color: isHovered ? '#00d9ff' : '#00d9ff',
                                textTransform: 'uppercase',
                                letterSpacing: '0.05em',
                                transition: 'color 0.3s'
                            }}>
                                {date}
                            </span>
                        </motion.div>

                        {/* Title */}
                        <motion.h3 
                            animate={{
                                color: isHovered ? '#00d9ff' : '#fff'
                            }}
                            transition={{ duration: 0.3 }}
                            style={{
                                fontSize: 'clamp(20px, 3vw, 26px)',
                                fontWeight: 700,
                                marginBottom: '12px',
                                lineHeight: 1.3,
                                display: '-webkit-box',
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: 'vertical',
                                overflow: 'hidden'
                            }}
                        >
                            {displayTitle}
                        </motion.h3>

                        {/* Excerpt */}
                        <p style={{
                            color: '#999',
                            fontSize: 'clamp(14px, 2vw, 15px)',
                            lineHeight: 1.7,
                            marginBottom: '24px',
                            display: '-webkit-box',
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                            flexGrow: 1,
                            transition: 'color 0.3s'
                        }}>
                            {displayExcerpt}
                        </p>

                        {/* Footer */}
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            paddingTop: '20px',
                            borderTop: `1px solid ${isHovered ? 'rgba(0, 217, 255, 0.2)' : 'rgba(255, 255, 255, 0.05)'}`,
                            transition: 'border-color 0.3s'
                        }}>
                            
                            {/* Author */}
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '12px'
                            }}>
                                <motion.div 
                                    animate={{
                                        scale: isHovered ? 1.1 : 1,
                                        rotate: isHovered ? 5 : 0
                                    }}
                                    transition={{ duration: 0.3 }}
                                    style={{
                                        width: '40px',
                                        height: '40px',
                                        borderRadius: '50%',
                                        background: 'linear-gradient(135deg, #00d9ff, #0099cc)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        boxShadow: isHovered ? '0 8px 24px rgba(0, 217, 255, 0.5)' : '0 4px 12px rgba(0, 217, 255, 0.3)',
                                        transition: 'box-shadow 0.3s'
                                    }}
                                >
                                    <span style={{
                                        fontSize: '16px',
                                        fontWeight: 700,
                                        color: '#000'
                                    }}>
                                        {author.charAt(0)}
                                    </span>
                                </motion.div>
                                <div style={{
                                    display: 'flex',
                                    flexDirection: 'column'
                                }}>
                                    <span style={{
                                        fontSize: '13px',
                                        fontWeight: 600,
                                        color: '#fff'
                                    }}>
                                        {author}
                                    </span>
                                    <span style={{
                                        fontSize: '10px',
                                        color: '#666',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.05em'
                                    }}>
                                        {language === 'es' ? 'Autor' : 'Author'}
                                    </span>
                                </div>
                            </div>

                            {/* Read more CTA */}
                            <motion.div 
                                animate={{
                                    x: isHovered ? 8 : 0
                                }}
                                transition={{ duration: 0.3 }}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    fontSize: '14px',
                                    fontWeight: 700,
                                    color: '#00d9ff'
                                }}
                            >
                                <span className="hidden sm:inline">
                                    {readMoreText}
                                </span>
                                <motion.svg 
                                    style={{ width: '20px', height: '20px' }}
                                    fill="none" 
                                    viewBox="0 0 24 24" 
                                    stroke="currentColor"
                                    animate={{
                                        x: isHovered ? [0, 6, 0] : 0
                                    }}
                                    transition={{
                                        duration: isHovered ? 1.2 : 0,
                                        repeat: isHovered ? Infinity : 0
                                    }}
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </motion.svg>
                            </motion.div>
                        </div>
                    </div>

                    {/* Decorative corner accent */}
                    <motion.div 
                        animate={{
                            opacity: isHovered ? 0.3 : 0,
                            scale: isHovered ? 1 : 0.8
                        }}
                        transition={{ duration: 0.4 }}
                        style={{
                            position: 'absolute',
                            bottom: 0,
                            right: 0,
                            width: '160px',
                            height: '160px',
                            pointerEvents: 'none'
                        }}
                    >
                        <div style={{
                            position: 'absolute',
                            bottom: 0,
                            right: 0,
                            width: '100%',
                            height: '100%',
                            background: 'linear-gradient(to top left, rgba(0, 217, 255, 0.2), transparent)',
                            borderRadius: '100% 0 0 0',
                            filter: 'blur(30px)'
                        }} />
                    </motion.div>
                </motion.div>
            </Link>
        </motion.article>
    );
}