"use client";

import { useState, useRef, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";

// Componentes de Bandera SVG para mejor renderizado en Windows/Chrome
const FlagES = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 750 500" width="24" height="24" className="rounded-full shadow-sm">
        <rect width="750" height="500" fill="#c60b1e"/>
        <rect width="750" height="250" y="125" fill="#ffc400"/>
        <g transform="translate(186, 219) scale(0.26)">
            {/* Escudo simplificado para tamaño pequeño si es necesario, pero franjas bastan para reconocimiento rápido */ }
        </g>
    </svg>
);

const FlagGB = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 30" width="24" height="24" className="rounded-full shadow-sm">
        <clipPath id="s">
            <path d="M0,0 v30 h60 v-30 z"/>
        </clipPath>
        <clipPath id="t">
            <path d="M30,15 h30 v15 z v-15 h-30 z h-30 v-15 z v15 h30 z"/>
        </clipPath>
        <g clipPath="url(#s)">
            <path d="M0,0 v30 h60 v-30 z" fill="#012169"/>
            <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6"/>
            <path d="M0,0 L60,30 M60,0 L0,30" clipPath="url(#t)" stroke="#C8102E" strokeWidth="4"/>
            <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10"/>
            <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6"/>
        </g>
    </svg>
);

const languages = [
    { code: "es", label: "ES", flag: <FlagES /> },
    { code: "en", label: "EN", flag: <FlagGB /> },
];

export default function LanguageSwitcher() {
    const { language, setLanguage } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    const selected = languages.find(l => l.code === language) || languages[0];

    // Close on outside click
    useEffect(() => {
        function handleClick(e: MouseEvent) {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClick);
        return () => document.removeEventListener("mousedown", handleClick);
    }, []);

    const handleSelect = (langCode: string) => {
        setLanguage(langCode as "es" | "en");
        setIsOpen(false);
    };

    return (
        <div ref={ref} className="relative z-50">
            {/* Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-3 px-3 py-2 rounded-full transition-all duration-300 cursor-pointer hover:bg-white/10"
                style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(10px)',
                }}
                aria-label="Cambiar idioma"
            >
                {/* Bandera seleccionada */}
                <span className="flex items-center justify-center w-6 h-6 overflow-hidden rounded-full border border-white/20">
                    {selected.flag}
                </span>
                
                {/* Texto */}
                <span className="text-xs font-bold tracking-wider text-white hidden sm:block">
                    {selected.label}
                </span>

                {/* Icono flecha */}
                <svg
                    className={`w-3 h-3 text-white/70 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {/* Dropdown */}
            {isOpen && (
                <div
                    className="absolute left-0 xl:right-0 top-full mt-2 w-48 rounded-xl overflow-hidden shadow-2xl origin-top-left xl:origin-top-right transition-all duration-200"
                    style={{
                        background: '#0a0a0a',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        zIndex: 1000,
                    }}
                >
                    {languages.map((lang) => (
                        <button
                            key={lang.code}
                            onClick={() => handleSelect(lang.code)}
                            className={`w-full flex items-center gap-3 px-4 py-3 text-sm transition-all duration-200 cursor-pointer hover:bg-white/5 ${
                                selected.code === lang.code
                                    ? 'bg-white/5'
                                    : ''
                            }`}
                        >
                            <span className="flex items-center justify-center w-6 h-6 overflow-hidden rounded-full border border-white/20">
                                {lang.flag}
                            </span>
                            <span 
                                className={`font-medium tracking-wide ${ selected.code === lang.code ? 'text-[#00d9ff]' : 'text-white' }`}
                            >
                                {lang.code === "es" ? "Español" : "English"}
                            </span>
                            
                            {selected.code === lang.code && (
                                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-[#00d9ff] shadow-[0_0_10px_#00d9ff]" />
                            )}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
