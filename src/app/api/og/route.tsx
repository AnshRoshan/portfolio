import { readFile } from "node:fs/promises";
import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";
import { siteConfig } from "@/config/site";

export const runtime = "nodejs";

// Turbopack build workers don't implement fetch() of file: URLs, so read the
// bundled font from disk instead.
const interBold = readFile(
    new URL("../../../assets/fonts/Inter-Bold.ttf", import.meta.url)
).then((buf) =>
    buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength)
);

export async function GET(req: NextRequest) {
    try {
        const fontBold = await interBold;
        const { searchParams } = req.nextUrl;

        const rawTitle = searchParams.get("title") || siteConfig.title;
        const title =
            rawTitle.length > 110 ? `${rawTitle.slice(0, 110)}…` : rawTitle;
        const eyebrow = searchParams.get("eyebrow") || "Gen AI Developer";
        const host = siteConfig.url.replace(/^https?:\/\//, "");

        return new ImageResponse(
            <div
                style={{
                    position: "relative",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    width: "100%",
                    height: "100%",
                    padding: "72px",
                    background: "#0a0a0b",
                    fontFamily: "Inter",
                    overflow: "hidden",
                }}
            >
                {/* Mint glow */}
                <div
                    style={{
                        position: "absolute",
                        top: -220,
                        right: -160,
                        width: 640,
                        height: 640,
                        background:
                            "radial-gradient(circle, rgba(34,211,238,0.22), rgba(34,211,238,0) 70%)",
                    }}
                />

                {/* Brand */}
                <div style={{ display: "flex", alignItems: "center" }}>
                    <div
                        style={{
                            width: 16,
                            height: 16,
                            borderRadius: 9999,
                            background: "#22d3ee",
                        }}
                    />
                    <div
                        style={{
                            marginLeft: 16,
                            fontSize: 30,
                            color: "#e7e7ea",
                        }}
                    >
                        Ansh Roshan
                    </div>
                </div>

                {/* Eyebrow + title */}
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            fontSize: 24,
                            color: "#22d3ee",
                            textTransform: "uppercase",
                            letterSpacing: 5,
                        }}
                    >
                        <div
                            style={{
                                width: 44,
                                height: 3,
                                background: "#22d3ee",
                                marginRight: 18,
                            }}
                        />
                        {eyebrow}
                    </div>
                    <div
                        style={{
                            marginTop: 28,
                            fontSize: 72,
                            lineHeight: 1.05,
                            color: "#f4f4f5",
                            maxWidth: 980,
                        }}
                    >
                        {title}
                    </div>
                </div>

                {/* Footer */}
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        fontSize: 24,
                        color: "#9a9aa4",
                    }}
                >
                    <div style={{ display: "flex" }}>{host}</div>
                    <div style={{ display: "flex" }}>@anshzero</div>
                </div>
            </div>,
            {
                width: 1200,
                height: 630,
                headers: {
                    "Cache-Control":
                        "public, max-age=31536000, s-maxage=31536000, immutable",
                },
                fonts: [
                    {
                        name: "Inter",
                        data: fontBold,
                        style: "normal",
                        weight: 700,
                    },
                ],
            }
        );
    } catch {
        return new Response("Failed to generate image", { status: 500 });
    }
}
