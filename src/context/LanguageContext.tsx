"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { dictionary, Language } from "@/lib/dictionary";
import { useParams, useRouter, usePathname } from "next/navigation";

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string) => any;
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

     const t = (key: string) => {
        const keys = key.split('.');
        let value: any = dictionary[language];
        
        for (const k of keys) {
            if (value && typeof value === 'object' && k in value) {
                value = value[k as keyof typeof value];
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
