"use client";

import { ReactNode } from "react";

interface ServiceCardProps {
    children: ReactNode;
    accent: string;
    border: string;
    cardBg: string;
}

export default function ServiceCard({ children, accent, border, cardBg }: ServiceCardProps) {
    return (
        <article 
            style={{ 
                padding: "32px", 
                borderRadius: "16px", 
                backgroundColor: cardBg, 
                border: `1px solid ${border}`, 
                transition: "border-color 0.3s ease",
                cursor: "default"
            }}
            onMouseEnter={(e) => e.currentTarget.style.borderColor = accent}
            onMouseLeave={(e) => e.currentTarget.style.borderColor = border}
        >
            {children}
        </article>
    );
}
