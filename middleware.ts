import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// ── Toggle maintenance mode via .env.local ──────────────────────
// Set NEXT_PUBLIC_MAINTENANCE_MODE=true to take the site down.
// Remove the var (or set to anything else) to restore normal usage.

const MAINTENANCE_MODE = process.env.NEXT_PUBLIC_MAINTENANCE_MODE === "true";

const EXEMPT_PATTERNS = [
  /^\/maintenance(\/.*)?$/, // the maintenance page itself
  /^\/_next\//,             // Next.js static assets (JS, CSS, chunks)
  /^\/api\//,               // API routes (if any)
  /\.(svg|png|jpg|jpeg|gif|ico|webp|avif)$/, // static media
  /\.(woff2?|ttf|otf|eot)$/,                  // fonts
  /\.(json|xml|txt|map)$/,                     // data / sourcemaps
];

function isExempt(pathname: string): boolean {
  return EXEMPT_PATTERNS.some((pattern) => pattern.test(pathname));
}

export function middleware(request: NextRequest) {
  if (MAINTENANCE_MODE && !isExempt(request.nextUrl.pathname)) {
    const url = request.nextUrl.clone();
    url.pathname = "/maintenance";
    return NextResponse.rewrite(url);
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};