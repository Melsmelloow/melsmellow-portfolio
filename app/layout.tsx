import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const SITE_URL = "https://melcarlo.dev"; // swap in real domain once you have one

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Mel Carlo Iguis — Software Engineer (Frontend / Full Stack)",
    template: "%s — Mel Carlo Iguis",
  },
  description:
    "Portfolio of Mel Carlo Iguis, a software engineer with 4+ years building React/Next.js frontends, full-stack apps (Node.js, Django, Spring Boot), and CI/CD pipelines. Based in Taguig, Philippines.",
  keywords: [
    "Mel Carlo Iguis",
    "Software Engineer",
    "Frontend Developer",
    "Full Stack Developer",
    "React Developer",
    "Next.js Developer",
    "Philippines Software Engineer",
  ],
  authors: [{ name: "Mel Carlo Iguis" }],
  creator: "Mel Carlo Iguis",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: "Mel Carlo Iguis — Software Engineer (Frontend / Full Stack)",
    description:
      "4+ years building scalable web apps, frontend systems, REST APIs, and CI/CD workflows.",
    siteName: "Mel Carlo Iguis — Portfolio",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mel Carlo Iguis — Software Engineer",
    description:
      "4+ years building scalable web apps, frontend systems, REST APIs, and CI/CD workflows.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Mel Carlo Iguis",
  jobTitle: "Software Engineer",
  description:
    "Software Engineer specializing in frontend, full-stack, and DevOps/CI-CD.",
  url: SITE_URL,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Taguig",
    addressCountry: "PH",
  },
  sameAs: [
    "https://github.com/Melsmelloow",
    "https://github.com/melsmellow",
    "https://linkedin.com/in/mel-carlo-iguis",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={jetbrainsMono.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body>{children}</body>
      <Script
        defer
        src="https://static.cloudflareinsights.com/beacon.min.js"
        data-cf-beacon='{"token": "b5e5a0a9a19743c9a2dabb91ddbab158"}'
        strategy="afterInteractive"
      />
    </html>
  );
}
