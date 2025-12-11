// app/page.tsx
import Link from "next/link";

export default function HomePage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        padding: "2rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily:
          "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        backgroundColor: "#f4f4f5",
      }}
    >
      <div
        style={{
          maxWidth: "600px",
          backgroundColor: "white",
          borderRadius: "12px",
          padding: "2rem",
          boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
        }}
      >
        <h1 style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>
          Mini PokéShop
        </h1>
        <p style={{ marginBottom: "1rem", color: "#555" }}>
          A tiny Pokémon-themed storefront demo built with Next.js and
          TypeScript.
        </p>
        <p style={{ marginBottom: "2rem", color: "#555" }}>
          Browse a small set of products and try out search &amp; filtering —
          just like a miniature version of a Pokémon Center eCommerce
          experience.
        </p>

        <Link
          href="/products"
          style={{
            display: "inline-block",
            padding: "0.75rem 1.5rem",
            borderRadius: "999px",
            textDecoration: "none",
            backgroundColor: "#e11d48",
            color: "white",
            fontWeight: 600,
          }}
        >
          Go to Products
        </Link>
      </div>
    </main>
  );
}

