"use client";

import React, { createContext, useContext } from "react";
import { dictionary, Language } from "@/lib/dictionary";
import { useParams, useRouter, usePathname } from "next/navigation";

/**
 * `t` resuelve una clave con puntos ("pricing.plans.0.name") contra el
 * diccionario, que es heterogéneo: la mayoría de las claves devuelven texto,
 * pero algunas devuelven arrays u objetos (planes, FAQ, opciones de
 * formulario). Tiparlo como union obligaría a castear en cada `{t("...")}`
 * dentro del JSX; los pocos lugares que esperan array ya castean a mano.
 * Por eso acá el `any` es deliberado y está acotado a esta firma.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Translate = (key: string) => any;

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: Translate;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children, initialLang }: { children: React.ReactNode, initialLang: Language }) => {
    const params = useParams();
    const router = useRouter();
    const pathname = usePathname();
    
    // In scenarios where params might not be ready, fallback to initialLang
    const language = (params?.lang as Language) || initialLang;

    const handleSetLanguage = (lang: Language) => {
        if (!pathname) return;
        
        document.cookie = `NEXT_LOCALE=${lang}; path=/; max-age=31536000`;
        
        let newPath = pathname;
        if (pathname.startsWith('/es/') || pathname.startsWith('/en/')) {
            const cleanPath = pathname.replace(/\/$/, '');
            if (lang === 'en' && cleanPath === '/es/proyectos') {
                newPath = '/en/projects';
            } else if (lang === 'es' && cleanPath === '/en/projects') {
                newPath = '/es/proyectos';
            } else {
                newPath = `/${lang}${pathname.substring(3)}`;
            }
        } else if (pathname === '/es' || pathname === '/en') {
             newPath = `/${lang}`;
        }
        
        router.push(newPath);
    };

    const t: Translate = (key: string) => {
        const keys = key.split('.');
        let value: unknown = dictionary[language];

        for (const k of keys) {
            if (value && typeof value === 'object' && k in value) {
                value = (value as Record<string, unknown>)[k];
            } else {
                return key; // Return key if not found
            }
        }

        return value !== undefined ? value : key;
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error("useLanguage must be used within a LanguageProvider");
    }
    return context;
};
