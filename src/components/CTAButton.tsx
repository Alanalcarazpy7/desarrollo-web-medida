"use client";

import { ReactNode } from "react";
import Link from "next/link";

interface CTAButtonProps {
    href: string;
    children: ReactNode;
    accent: string;
    padding?: string;
    fontSize?: string;
    fontWeight?: number;
    withShadow?: boolean;
}

export default function CTAButton({ 
    href, 
    children, 
    accent, 
    padding = "16px 32px", 
    fontSize = "1.125rem", 
    fontWeight = 700, 
    withShadow = false 
}: CTAButtonProps) {
    return (
        <a 
            href={href}
            style={{ 
                display: "inline-block", 
                padding, 
                marginTop: "32px", 
                borderRadius: "9999px", 
                backgroundColor: accent, 
                color: "#000", 
                fontWeight, 
                fontSize, 
                textDecoration: "none", 
                transition: "all 0.3s ease"
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.05)";
                if (withShadow) e.currentTarget.style.boxShadow = `0 0 20px ${accent}66`; // 40% opacity hex
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                if (withShadow) e.currentTarget.style.boxShadow = "none";
            }}
        >
            {children}
        </a>
    );
}
