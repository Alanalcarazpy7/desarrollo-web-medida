import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';


const locales = ['es', 'en'];
const defaultLocale = 'es';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if there is any supported locale in the pathname
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return;

  // SEO Friendly: redirect everything missing a locale to /es permanently (308)
  const url = request.nextUrl.clone();
  url.pathname = `/${defaultLocale}${pathname}`;
  return NextResponse.redirect(url, 308);
}

export const config = {
  // Matcher ignoring `/_next/`, `/api/` y archivos estaticos de `public/`.
  // La lista de extensiones estaba incompleta (solo imagenes + txt/xml): a
  // cualquier otro archivo (videos, PDFs, fuentes) el middleware lo
  // redirigia con 308 a /es/<path>, rompiendo su URL directa (grave en
  // video: corta el soporte de range requests para el seek).
  matcher: [
    '/((?!api|_next/static|_next/image|.*\\.(?:png|jpg|jpeg|svg|gif|webp|avif|ico|txt|xml|mp4|webm|mov|m4v|mp3|wav|pdf|woff|woff2|ttf|otf|css|js|map|json)).*)',
  ],
};
