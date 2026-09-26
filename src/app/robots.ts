import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

export default function robots(): MetadataRoute.Robots {
    const base = siteConfig.url.replace(/\/$/, "");
    return {
        rules: [
            {
                userAgent: "*",
                allow: "/",
                disallow: "/api/",
            },
            {
                // OG images are generated under /api/og — crawlers must be
                // able to fetch them.
                userAgent: "*",
                allow: "/api/og",
            },
        ],
        sitemap: `${base}/sitemap.xml`,
        host: base,
    };
}
