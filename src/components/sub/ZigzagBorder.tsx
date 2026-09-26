"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Full zigzag pill border with a rainbow laser "comet" running over it.
 *
 * Why client + measured: a fixed viewBox stretched with
 * preserveAspectRatio="none" scales x and y differently, so the comet's
 * constant path-speed becomes a variable *screen* speed and it bunches at the
 * rounded ends. We instead measure the button and build the path in real pixel
 * coords (1:1, no stretch) → perfectly uniform motion. ResizeObserver keeps it
 * correct if the button reflows.
 */
const AMP = 2.5; // tooth height (small)
const STEP = 6; // vertex sampling

function tri(v: number) {
    const f = ((v % 1) + 1) % 1;
    return Math.abs(f * 2 - 1);
}

// Static zigzag outline (rounded pill) in pixel coords; seam sits mid-top (a
// straight stretch) so there's no hitch at a corner.
function buildPath(w: number, h: number) {
    const R = h / 2;
    const perim = 2 * (w - 2 * R) + 2 * Math.PI * R;
    const teeth = Math.max(8, Math.round(perim / 14));
    const PERIOD = perim / teeth; // whole teeth → seamless wave
    const pts: Array<[number, number]> = [];
    let s = 0;
    const off = (sv: number) => AMP * tri(sv / PERIOD);
    const add = (x: number, y: number, nx: number, ny: number) => {
        const o = off(s);
        pts.push([x + nx * o, y + ny * o]);
    };
    const line = (
        x0: number,
        y0: number,
        x1: number,
        y1: number,
        nx: number,
        ny: number
    ) => {
        const len = Math.hypot(x1 - x0, y1 - y0);
        const n = Math.max(1, Math.round(len / STEP));
        for (let i = 0; i < n; i++) {
            const t = i / n;
            add(x0 + (x1 - x0) * t, y0 + (y1 - y0) * t, nx, ny);
            s += len / n;
        }
    };
    const arc = (cx: number, cy: number, a0: number, a1: number) => {
        const len = R * Math.abs(a1 - a0);
        const n = Math.max(1, Math.round(len / STEP));
        for (let i = 0; i < n; i++) {
            const a = a0 + (a1 - a0) * (i / n);
            add(
                cx + R * Math.cos(a),
                cy + R * Math.sin(a),
                -Math.cos(a),
                -Math.sin(a)
            );
            s += len / n;
        }
    };
    const mid = w / 2;
    line(mid, 0, w - R, 0, 0, 1); // top (right half)
    arc(w - R, R, -Math.PI / 2, 0); // top-right
    line(w, R, w, h - R, -1, 0); // right
    arc(w - R, h - R, 0, Math.PI / 2); // bottom-right
    line(w - R, h, R, h, 0, -1); // bottom
    arc(R, h - R, Math.PI / 2, Math.PI); // bottom-left
    line(0, h - R, 0, R, 1, 0); // left
    arc(R, R, Math.PI, Math.PI * 1.5); // top-left
    line(R, 0, mid, 0, 0, 1); // top (left half) → back to seam
    return `M${pts.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join("L")}Z`;
}

// Comet layers over the base border (pathLength normalised to 1000). All share
// a leading edge advancing 0→1000 (clockwise); the short/thick/opaque head
// leads, longer/thinner/fainter layers trail → a tapered fading tail.
const LAYERS = [
    { len: 445, width: 8, opacity: 0.3, blur: true },
    { len: 566, width: 2.5, opacity: 0.32, blur: false },
    { len: 297, width: 3.5, opacity: 0.6, blur: false },
    { len: 132, width: 5, opacity: 1, blur: false },
];

export default function ZigzagBorder() {
    const ref = useRef<HTMLSpanElement>(null);
    const [size, setSize] = useState({ w: 0, h: 0 });

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const ro = new ResizeObserver(() => {
            const r = el.getBoundingClientRect();
            setSize({ w: Math.round(r.width), h: Math.round(r.height) });
        });
        ro.observe(el);
        return () => ro.disconnect();
    }, []);

    const { w, h } = size;
    const d = w > 0 && h > 0 ? buildPath(w, h) : "";

    return (
        <span
            ref={ref}
            aria-hidden
            className="pointer-events-none absolute inset-0"
        >
            {d ? (
                <svg
                    className="absolute inset-0 h-full w-full overflow-visible"
                    viewBox={`0 0 ${w} ${h}`}
                >
                    <title>decorative border</title>
                    <defs>
                        <linearGradient
                            id="zz-rainbow"
                            gradientUnits="objectBoundingBox"
                            x1="0"
                            y1="0"
                            x2="1"
                            y2="1"
                        >
                            {/* lime→green→emerald→teal→cyan→blue→purple→pink→red→lime */}
                            <stop offset="0%" stopColor="#a3e635" />
                            <stop offset="10%" stopColor="#22c55e" />
                            <stop offset="22%" stopColor="#34d399" />
                            <stop offset="33%" stopColor="#2dd4bf" />
                            <stop offset="44%" stopColor="#22d3ee" />
                            <stop offset="56%" stopColor="#4d5bff" />
                            <stop offset="68%" stopColor="#8b5cf6" />
                            <stop offset="80%" stopColor="#f472b6" />
                            <stop offset="90%" stopColor="#ff3d77" />
                            <stop offset="100%" stopColor="#a3e635" />
                        </linearGradient>
                        <filter
                            id="zz-glow"
                            x="-20%"
                            y="-20%"
                            width="140%"
                            height="140%"
                        >
                            <feGaussianBlur stdDeviation="2" />
                        </filter>
                    </defs>

                    {/* Full faint border */}
                    <path
                        d={d}
                        fill="none"
                        stroke="url(#zz-rainbow)"
                        strokeWidth={1.5}
                        strokeOpacity={0.22}
                        strokeLinejoin="round"
                        vectorEffect="non-scaling-stroke"
                    />

                    {/* Laser comet running over it */}
                    {LAYERS.map((l) => (
                        <path
                            key={l.len}
                            d={d}
                            pathLength={1000}
                            fill="none"
                            stroke="url(#zz-rainbow)"
                            strokeWidth={l.width}
                            strokeOpacity={l.opacity}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeDasharray={`${l.len} ${1000 - l.len}`}
                            vectorEffect="non-scaling-stroke"
                            filter={l.blur ? "url(#zz-glow)" : undefined}
                        >
                            <animate
                                attributeName="stroke-dashoffset"
                                values={`${l.len};${l.len - 1000}`}
                                dur="4.5s"
                                calcMode="linear"
                                repeatCount="indefinite"
                            />
                        </path>
                    ))}
                </svg>
            ) : null}
        </span>
    );
}
