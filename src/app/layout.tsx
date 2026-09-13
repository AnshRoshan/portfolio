import { SiteChrome } from "@/components/main/SiteChrome";
import { ThemeProvider } from "@/components/main/theme-provider";
import { siteConfig } from "@/config/site";
import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-sans",
    display: "swap",
});

const spaceGrotesk = Space_Grotesk({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
    variable: "--font-display",
    display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
    subsets: ["latin"],
    weight: ["400", "500"],
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
        { media: "(prefers-color-scheme: light)", color: "white" },
        { media: "(prefers-color-scheme: dark)", color: "black" },
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
                {/* biome-ignore lint/security/noDangerouslySetInnerHtml: pre-paint theme script */}
                <script
                    dangerouslySetInnerHTML={{
                        __html: `try{var t=localStorage.getItem("portfolio-theme");var c=document.documentElement.classList;t==="light"?c.remove("dark"):c.add("dark")}catch(e){}`,
                    }}
                />
            </head>
            <body
                className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} flex min-h-[100dvh] w-full flex-col overflow-x-clip bg-ink text-paper antialiased selection:bg-accent selection:text-ink`}
            >
                <ThemeProvider>
                    <SiteChrome>{children}</SiteChrome>
                </ThemeProvider>
            </body>
        </html>
    );
}
