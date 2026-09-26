/**
 * Renders schema.org JSON-LD. Data is always built from static, in-repo
 * strings (siteConfig / projects data) — never user input.
 */
export function JsonLd({ data }: { data: object }) {
    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
    );
}
