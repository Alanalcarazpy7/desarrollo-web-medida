"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

export default function ScrollProgress() {
    const { scrollYProgress } = useScroll();
    const [isVisible, setIsVisible] = useState(false);

    // Spring animations for smooth movement
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
    });

    const pathLength = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30
    });

    // Theme consistent with the site
    const theme = {
        accent: "#00d9ff",
        accentDark: "#0099cc",
        accentGlow: "rgba(0, 217, 255, 0.4)",
        bgNav: "#050505",
    };

    useEffect(() => {
        const handleScroll = () => {
            setIsVisible(window.scrollY > 300);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            {/* Top Progress Bar - Synced with Navbar style */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-1.5 z-[100] origin-left"
                style={{
                    scaleX,
                    background: `linear-gradient(90deg, ${theme.accent}, ${theme.accentDark}, ${theme.accent})`,
                    boxShadow: `0 0 20px ${theme.accentGlow}`
                }}
            />

            {/* Premium Scroll to Top Button */}
            <motion.div
                className="fixed bottom-8 left-8 z-[90]"
                initial={{ opacity: 0, scale: 0.5, y: 20 }}
                animate={{
                    opacity: isVisible ? 1 : 0,
                    scale: isVisible ? 1 : 0.5,
                    y: isVisible ? 0 : 20
                }}
                transition={{ duration: 0.4, ease: "easeOut" }}
            >
                <div className="relative group">
                    {/* Background Glow */}
                    <div
                        className="absolute -inset-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500"
                    />

                    {/* Main Button Container */}
                    <button
                        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                        className="relative w-16 h-16 rounded-full flex items-center justify-center backdrop-blur-xl transition-all duration-300 overflow-hidden cursor-pointer"
                        style={{
                            background: `rgba(10, 10, 10, 0.8)`,
                            border: `2px solid rgba(0, 217, 255, 0.23)`,
                            boxShadow: `0 10px 30px rgba(0,0,0,0.5)`,
                        }}
                    >
                        {/* Interactive Shine */}
                        <motion.div
                            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                            style={{
                                background: `radial-gradient(circle at center, rgba(0, 217, 255, 0.1) 0%, transparent 70%)`
                            }}
                        />

                        {/* Circular Progress Path */}
                        <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none">
                            <circle
                                cx="32"
                                cy="32"
                                r="30"
                                fill="none"
                                stroke="rgba(255,255,255,0.05)"
                                strokeWidth="3"
                            />
                            <motion.circle
                                cx="32"
                                cy="32"
                                r="30"
                                fill="none"
                                stroke={theme.accent}
                                strokeWidth="3"
                                strokeLinecap="round"
                                style={{ pathLength }}
                            />
                        </svg>

                        {/* Minimalist Arrow */}
                        <motion.svg
                            className="w-6 h-6 relative z-10"
                            fill="none"
                            stroke={theme.accent}
                            viewBox="0 0 24 24"
                            strokeWidth={2.5}
                            animate={{ y: [0, -3, 0] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
                        </motion.svg>

                        {/* Hover particle effect */}
                        <motion.div
                            className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100"
                            initial={false}
                        >
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[110%] h-[110%] border border-cyan-500/20 rounded-full animate-ping" />
                        </motion.div>
                    </button>
                </div>
            </motion.div>
        </>
    );
}