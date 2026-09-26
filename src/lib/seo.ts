import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import type { Project } from "@/data/projects";

export function absoluteUrl(path = "/"): string {
    const base = siteConfig.url.replace(/\/$/, "");
    const suffix = path.startsWith("/") ? path : `/${path}`;
    return `${base}${suffix}`;
}

function ogImageUrl(title: string, eyebrow?: string): string {
    const params = new URLSearchParams({ title });
    if (eyebrow) params.set("eyebrow", eyebrow);
    return absoluteUrl(`/api/og?${params.toString()}`);
}

/**
 * Canonical URL + per-page Open Graph / Twitter card built from the same
 * title/description, so no page can ship with a missing or relative OG url.
 */
export function pageMetadata({
    title,
    description,
    path,
    type = "website",
}: {
    title: string;
    description: string;
    path: string;
    type?: "website" | "article";
}): Metadata {
    const url = absoluteUrl(path);
    const image = ogImageUrl(title);
    return {
        title,
        description,
        alternates: { canonical: path },
        openGraph: {
            title,
            description,
            url,
            type,
            siteName: siteConfig.name,
            images: [{ url: image, width: 1200, height: 630, alt: title }],
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: [image],
        },
    };
}

export function personSchema() {
    return {
        "@context": "https://schema.org",
        "@type": "Person",
        name: siteConfig.author,
        url: siteConfig.url,
        image: ogImageUrl(siteConfig.title),
        jobTitle: "AI Engineer",
        email: "mailto:ianshroshan@gmail.com",
        worksFor: {
            "@type": "Organization",
            name: "Tata Consultancy Services",
        },
        knowsAbout: siteConfig.keywords,
        sameAs: Object.values(siteConfig.links),
    };
}

export function webSiteSchema() {
    return {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: siteConfig.name,
        url: siteConfig.url,
        inLanguage: "en",
        about: siteConfig.description,
        publisher: { "@type": "Person", name: siteConfig.author },
    };
}

export function projectSchema(project: Project) {
    const url = absoluteUrl(`/projects/${project.slug}`);
    return {
        "@context": "https://schema.org",
        "@type": "CreativeWork",
        name: project.title,
        headline: project.title,
        description: project.description,
        url,
        image: project.image
            ? absoluteUrl(project.image)
            : ogImageUrl(project.title, project.category),
        keywords: project.tags.join(", "),
        dateCreated: project.year,
        creator: { "@type": "Person", name: siteConfig.author },
        sameAs: [project.github, project.live].filter(Boolean),
    };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
    return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: item.name,
            item: absoluteUrl(item.path),
        })),
    };
}
