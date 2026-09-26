import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { projects } from "@/data/projects";

export default function sitemap(): MetadataRoute.Sitemap {
    const base = siteConfig.url.replace(/\/$/, "");

    const statics: MetadataRoute.Sitemap = [
        { url: `${base}/`, changeFrequency: "weekly", priority: 1 },
        { url: `${base}/about`, changeFrequency: "monthly", priority: 0.8 },
        { url: `${base}/projects`, changeFrequency: "weekly", priority: 0.9 },
        { url: `${base}/contact`, changeFrequency: "yearly", priority: 0.5 },
    ];

    const detail: MetadataRoute.Sitemap = projects.map((p) => ({
        url: `${base}/projects/${p.slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.7,
        images: p.image ? [`${base}${p.image}`] : undefined,
    }));

    return [...statics, ...detail];
}
