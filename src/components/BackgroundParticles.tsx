"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function BackgroundParticles() {
    const theme = {
        accent: "#00d9ff",
        accentGlow: "rgba(0, 217, 255, 0.5)",
    };

    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-60 select-none z-0">
            {[...Array(150)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute rounded-full"
                    style={{
                        width: Math.random() * 5 + 2,
                        height: Math.random() * 5 + 2,
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 120 - 20}%`, // Empieza ligeramente fuera de pantalla
                        background: theme.accent,
                        boxShadow: `0 0 15px ${theme.accentGlow}`,
                    }}
                    animate={{
                        y: [0, -200], // Movimiento ascendente continuo
                        opacity: [0, 0.9, 0], // Opacidad variable para visibilidad
                        scale: [0.5, 1.4, 0.5], // Pulso de tamaño
                        x: [0, Math.random() * 60 - 30], // Balanceo lateral
                    }}
                    transition={{
                        duration: Math.random() * 10 + 5,
                        repeat: Infinity,
                        ease: "linear",
                        delay: Math.random() * 5,
                    }}
                />
            ))}
        </div>
    );
}
