"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { WhatsAppIcon } from "./Icons";
import { trackEvent } from "@/lib/analytics";
import { useLanguage } from "@/context/LanguageContext";
import { getWhatsAppLink, whatsappMessages } from "@/lib/whatsapp";

export default function WhatsAppButton() {
    const { language } = useLanguage();
    const [isHovered, setIsHovered] = useState(false);

    const theme = {
        whatsapp: "#25D366",
        whatsappDark: "#128C7E",
        text: "#ffffff",
        accentGlow: "rgba(37, 211, 102, 0.4)",
    };

    return (
        <motion.div
            data-fab
            className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-[100]"
            initial={{ scale: 0, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8, type: "spring", bounce: 0.4 }}
        >
            <div className="relative group">
                {/* Efecto de onda dinámico - Fondo pulsante */}
                <motion.div
                    className="absolute inset-0 rounded-full"
                    style={{ background: theme.whatsapp }}
                    animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.3, 0, 0.3],
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />

                <motion.a
                    href={getWhatsAppLink(whatsappMessages[language].general)}
                    aria-label="Contactar por WhatsApp"
                    target="_blank"
                    rel="noopener noreferrer"
                    onHoverStart={() => setIsHovered(true)}
                    onHoverEnd={() => setIsHovered(false)}
                    onClick={() => trackEvent('click_whatsapp', { source: 'floating_button', lang: language })}
                    layout
                    whileHover={{ scale: 1.05, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative flex items-center rounded-full backdrop-blur-xl overflow-hidden shadow-2xl cursor-pointer"
                    style={{
                        background: `linear-gradient(135deg, ${theme.whatsapp}dd, ${theme.whatsappDark}dd)`,
                        border: `2px solid rgba(255, 255, 255, 0.23)`,
                        boxShadow: `0 15px 35px rgba(37, 211, 102, 0.4)`,
                        height: '64px',
                        width: isHovered ? 'auto' : '64px',
                        padding: isHovered ? '0 28px' : '0 16px',
                        transition: 'all 0.5s cubic-bezier(0.22, 1, 0.36, 1)'
                    }}
                >
                    {/* Efecto de brillo animado */}
                    <motion.div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                            background: `linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)`,
                        }}
                        animate={{ x: ["-200%", "200%"] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    />

                    {/* Contenedor de icono - Tamaño fijo para evitar desplazamientos */}
                    <div className="relative z-10 flex items-center justify-center w-8 h-8 flex-shrink-0">
                        <motion.div
                            className="w-full h-full"
                            animate={{
                                rotate: isHovered ? [0, -15, 15, -15, 0] : [0, 5, -5, 0],
                                scale: isHovered ? 1.2 : 1.1
                            }}
                            transition={{
                                duration: isHovered ? 0.5 : 3,
                                repeat: isHovered ? 0 : Infinity,
                            }}
                        >
                            <WhatsAppIcon />
                        </motion.div>
                    </div>

                    <AnimatePresence>
                        {isHovered && (
                            <motion.span
                                initial={{ width: 0, opacity: 0, marginLeft: 0 }}
                                animate={{ width: "auto", opacity: 1, marginLeft: 12 }}
                                exit={{ width: 0, opacity: 0, marginLeft: 0 }}
                                className="font-bold text-lg text-white whitespace-nowrap overflow-hidden relative z-10 tracking-tight"
                            >
                                WhatsApp
                            </motion.span>
                        )}
                    </AnimatePresence>
                </motion.a>

                {/* Notificación Premium - Fuera del overflow-hidden */}
                <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{
                        scale: 1,
                        opacity: 1,
                        x: isHovered ? 10 : 0 // Desplazar ligeramente cuando la etiqueta se expande
                    }}
                    className="absolute -top-1 -right-1 z-[110] flex items-center justify-center w-6 h-6 rounded-full text-[10px] font-bold border border-white/20 shadow-lg pointer-events-none"
                    style={{
                        background: `linear-gradient(135deg, #ff3366, #ff0044)`,
                        color: 'white',
                        boxShadow: '0 4px 12px rgba(255, 0, 68, 0.4)'
                    }}
                >
                    <span className="relative z-10">1</span>
                    <motion.div
                        className="absolute inset-0 rounded-full bg-white opacity-20"
                        animate={{ scale: [1, 1.4, 1], opacity: [0.2, 0, 0.2] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    />
                </motion.div>
            </div>
        </motion.div>
    );
}
