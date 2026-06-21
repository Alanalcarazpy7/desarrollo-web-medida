"use client";

import { ReactNode } from "react";

interface ServiceCardProps {
    children: ReactNode;
    accent: string;
    border: string;
    cardBg: string;
    className?: string;
    style?: React.CSSProperties;
}

export default function ServiceCard({ children, accent, border, cardBg, className = "", style = {} }: ServiceCardProps) {
    return (
        <article 
            className={className}
            style={{ 
                padding: "32px", 
                borderRadius: "16px", 
                backgroundColor: cardBg, 
                border: `1px solid ${border}`, 
                transition: "all 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
                cursor: "default",
                width: "100%",
                ...style
            }}
        >
            {children}
        </article>
    );
}
