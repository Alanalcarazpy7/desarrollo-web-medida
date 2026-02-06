"use client";

import { motion, useInView, Variants } from "framer-motion";
import { useRef, ReactNode } from "react";

type AnimationVariant =
    | "fadeInUp"    // Ascenso suave (Default)
    | "slideLeft"   // Entra desde izquierda
    | "slideRight"  // Entra desde derecha
    | "scaleUp";    // Crece suavemente

interface SectionRevealProps {
    children: ReactNode;
    width?: "fit-content" | "100%";
    delay?: number;
    threshold?: number;
    variant?: AnimationVariant;
    duration?: number;
}

export default function SectionReveal({
    children,
    width = "100%",
    delay = 0,
    threshold = 0.15,
    variant = "fadeInUp",
    duration = 0.8
}: SectionRevealProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, {
        once: true, // Changed to true - prevents re-animation on scroll
        amount: threshold,
        margin: "0px 0px -100px 0px"
    });

    // Variants Definition - Removed blur filter to prevent layout issues
    const variantsMap: Record<AnimationVariant, Variants> = {
        fadeInUp: {
            hidden: { opacity: 0, y: 40 },
            visible: { opacity: 1, y: 0 }
        },
        slideLeft: {
            hidden: { opacity: 0, x: -60 },
            visible: { opacity: 1, x: 0 }
        },
        slideRight: {
            hidden: { opacity: 0, x: 60 },
            visible: { opacity: 1, x: 0 }
        },
        scaleUp: {
            hidden: { opacity: 0, scale: 0.92 },
            visible: { opacity: 1, scale: 1 }
        }
    };

    const selectedVariant = variantsMap[variant] || variantsMap.fadeInUp;

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={{
                hidden: {
                    ...selectedVariant.hidden,
                    transition: {
                        duration: 0.5,
                        ease: "easeOut"
                    }
                },
                visible: {
                    ...selectedVariant.visible,
                    transition: {
                        duration: duration,
                        delay: delay,
                        ease: [0.25, 0.1, 0.25, 1] // Curva suave premium
                    }
                }
            }}
            style={{ width, position: "relative", overflow: "hidden" }}
        >
            {children}
        </motion.div>
    );
}

