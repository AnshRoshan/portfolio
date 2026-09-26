import typography from "@tailwindcss/typography";
import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

const config = {
    darkMode: "class",
    content: ["./src/**/*.{ts,tsx}"],
    prefix: "",
    theme: {
        container: {
            center: true,
            padding: "2rem",
            screens: {
                "2xl": "1400px",
            },
        },
        extend: {
            colors: {
                // Cool Ink + Mint brand palette. Namespaced as `brand-*` so it does not
                // clash with the shadcn `accent`/`muted` tokens (which are grays).
                // Use these instead of hardcoded hex going forward.
                brand: {
                    ink: "#0a0a0b",
                    surface: "#131316",
                    paper: "#e7e7ea",
                    muted: "#9a9aa4",
                    mint: "#22d3ee",
                    "mint-bright": "#67e8f9",
                },
                border: "hsl(var(--border))",
                input: "hsl(var(--input))",
                ring: "hsl(var(--ring))",
                background: "hsl(var(--background))",
                foreground: "hsl(var(--foreground))",
                primary: {
                    DEFAULT: "hsl(var(--primary))",
                    foreground: "hsl(var(--primary-foreground))",
                },
                secondary: {
                    DEFAULT: "hsl(var(--secondary))",
                    foreground: "hsl(var(--secondary-foreground))",
                },
                destructive: {
                    DEFAULT: "hsl(var(--destructive))",
                    foreground: "hsl(var(--destructive-foreground))",
                },
                muted: {
                    DEFAULT: "hsl(var(--muted))",
                    foreground: "hsl(var(--muted-foreground))",
                },
                accent: {
                    DEFAULT: "hsl(var(--accent))",
                    foreground: "hsl(var(--accent-foreground))",
                },
                popover: {
                    DEFAULT: "hsl(var(--popover))",
                    foreground: "hsl(var(--popover-foreground))",
                },
                card: {
                    DEFAULT: "hsl(var(--card))",
                    foreground: "hsl(var(--card-foreground))",
                },
            },
            borderRadius: {
                lg: "var(--radius)",
                md: "calc(var(--radius) - 2px)",
                sm: "calc(var(--radius) - 4px)",
            },
            keyframes: {
                "accordion-down": {
                    from: { height: "0" },
                    to: { height: "var(--radix-accordion-content-height)" },
                },
                "accordion-up": {
                    from: { height: "var(--radix-accordion-content-height)" },
                    to: { height: "0" },
                },
                spotlight: {
                    "0%": {
                        opacity: "0",
                        transform: "translate(-72%, -62%) scale(0.5)",
                    },
                    "100%": {
                        opacity: "1",
                        transform: "translate(-50%,-40%) scale(1)",
                    },
                },
            },
            animation: {
                "accordion-down": "accordion-down 0.2s ease-out",
                "accordion-up": "accordion-up 0.2s ease-out",
                spotlight: "spotlight 2s ease .75s 1 forwards",
            },
        },
    },
    plugins: [tailwindcssAnimate, typography, addVariablesForColors],
} satisfies Config;

// Flatten a (possibly nested) Tailwind color palette into a single-level map.
// Inlined because Tailwind v4 no longer ships the internal
// `tailwindcss/lib/util/flattenColorPalette` module.
function flattenColorPalette(
    colors: Record<string, any> = {}
): Record<string, string> {
    return Object.assign(
        {},
        ...Object.entries(colors).flatMap(([color, values]) =>
            typeof values === "object" && values !== null
                ? Object.entries(flattenColorPalette(values)).map(
                      ([key, val]) => ({
                          [color + (key === "DEFAULT" ? "" : `-${key}`)]: val,
                      })
                  )
                : [{ [color]: values }]
        )
    );
}

// This plugin adds each Tailwind color as a global CSS variable, e.g. var(--gray-200).
function addVariablesForColors({ addBase, theme }: any) {
    let allColors = flattenColorPalette(theme("colors"));
    let newVars = Object.fromEntries(
        Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
    );

    addBase({
        ":root": newVars,
    });
}

export default config;
