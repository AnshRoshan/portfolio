"use client";

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    if (typeof console !== "undefined") console.error(error);

    return (
        <html lang="en">
            <body
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    minHeight: "100vh",
                    margin: 0,
                    background: "#07090f",
                    color: "#f2f5fb",
                    fontFamily: "system-ui, sans-serif",
                }}
            >
                <h1 style={{ fontSize: "1.1rem", letterSpacing: "0.2em" }}>
                    SOMETHING BROKE
                </h1>
                <p style={{ color: "#8a93a8" }}>
                    {error.digest ? `Ref: ${error.digest}` : ""}
                </p>
                <button
                    type="button"
                    onClick={reset}
                    style={{
                        marginTop: 16,
                        padding: "10px 22px",
                        borderRadius: 999,
                        border: "1px solid #27272a",
                        background: "transparent",
                        color: "#5eead4",
                        cursor: "pointer",
                    }}
                >
                    Try again
                </button>
            </body>
        </html>
    );
}
