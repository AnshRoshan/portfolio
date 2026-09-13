import Hero from "@/components/main/Hero";
import Marquee from "@/components/main/Marquee";
import NowBuilding from "@/components/main/NowBuilding";
import Projects from "@/components/main/Projects";
import { siteConfig } from "@/config/site";

const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.author,
    url: siteConfig.url,
    jobTitle: "Artificial Intelligence Engineer",
    sameAs: [
        siteConfig.links.github,
        siteConfig.links.linkedin,
        siteConfig.links.twitter,
    ],
};

export default function Home() {
    return (
        <div className="flex w-full flex-col">
            {/* biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD structured data */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <Hero />
            <Marquee />
            <Projects />
            <NowBuilding />
        </div>
    );
}
