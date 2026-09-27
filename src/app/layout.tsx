import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Sora } from "next/font/google";
import { SiteChrome } from "@/components/main/SiteChrome";
import { JsonLd } from "@/components/seo/json-ld";
import { siteConfig } from "@/config/site";
import { personSchema, webSiteSchema } from "@/lib/seo";
import "./globals.css";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-sans",
    display: "swap",
});

const sora = Sora({
    subsets: ["latin"],
    // only the weights actually rendered across the site
    weight: ["600"],
    variable: "--font-display",
    display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
    subsets: ["latin"],
    weight: ["400"],
    variable: "--font-mono",
    display: "swap",
});

const ogImage = `/api/og?title=${encodeURIComponent(siteConfig.title)}`;

export const metadata: Metadata = {
    title: {
        default: siteConfig.title,
        // Page titles render as "About · Ansh Roshan", etc.
        template: `%s · ${siteConfig.name}`,
    },
    description: siteConfig.description,
    metadataBase: new URL(siteConfig.url),
    applicationName: siteConfig.name,
    authors: [{ name: siteConfig.author, url: siteConfig.url }],
    creator: siteConfig.author,
    keywords: siteConfig.keywords,
    alternates: {
        canonical: "/",
    },
    openGraph: {
        type: "website",
        locale: "en_US",
        url: siteConfig.url,
        siteName: siteConfig.name,
        title: siteConfig.title,
        description: siteConfig.description,
        images: [
            { url: ogImage, width: 1200, height: 630, alt: siteConfig.title },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: siteConfig.title,
        description: siteConfig.description,
        creator: "@anshzero",
        images: [ogImage],
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
        },
    },
    icons: { icon: "/icon.png", apple: "/apple-icon.png" },
};

// viewport is other theme in mobile devices
export const viewport: Viewport = {
    themeColor: [
        { media: "(prefers-color-scheme: light)", color: "#f7f8fa" },
        { media: "(prefers-color-scheme: dark)", color: "#07090f" },
    ],
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className="dark" suppressHydrationWarning>
            <head>
                <script
                    dangerouslySetInnerHTML={{
                        __html: `try{var t=localStorage.getItem("portfolio-theme");var c=document.documentElement.classList;t==="light"?c.remove("dark"):c.add("dark")}catch(e){}`,
                    }}
                />
                <JsonLd data={personSchema()} />
                <JsonLd data={webSiteSchema()} />
            </head>
            <body
                className={`${inter.variable} ${sora.variable} ${jetbrainsMono.variable} flex min-h-[100dvh] w-full flex-col overflow-x-clip bg-ink text-paper antialiased selection:bg-accent selection:text-ink`}
            >
                <SiteChrome>{children}</SiteChrome>
            </body>
        </html>
    );
}
