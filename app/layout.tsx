import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mel Carlo Iguis — Portfolio",
  description: "Software Engineer (Frontend / Full Stack). Building scalable web apps and CI/CD workflows.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={jetbrainsMono.variable}>
      <body>{children}</body>
      {/* Cloudflare Web Analytics — replace data-cf-beacon token below
          with your own from the Cloudflare dashboard (Analytics > Web
          Analytics > Add a site). Loads after the page is interactive
          so it never blocks render. */}
      <Script
        defer
        src="https://static.cloudflareinsights.com/beacon.min.js"
        data-cf-beacon='{"token": "b5e5a0a9a19743c9a2dabb91ddbab158"}'
        strategy="afterInteractive"
      />
    </html>
  );
}
