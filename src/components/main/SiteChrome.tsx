"use client";

import { usePathname } from "next/navigation";
import BackgroundVideo from "@/components/main/BackgroundVideo";
import CursorGlow from "@/components/main/CursorGlow";
import Footer from "@/components/main/Footer";
import Navbar from "@/components/main/Navbar";
import ScrollProgress from "@/components/sub/ScrollProgress";

/**
 * Renders the site shell (video backdrop, cursor glow, scroll bar, nav,
 * footer) around page content. The keyed <main> replays the page-in
 * transition on every route change.
 */
export function SiteChrome({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    return (
        <>
            <BackgroundVideo />
            <CursorGlow />
            <ScrollProgress />
            <Navbar />
            <main key={pathname} className="page-in flex-grow">
                {children}
            </main>
            <Footer />
        </>
    );
}
