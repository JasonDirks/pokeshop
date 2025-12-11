// app/NavBar.tsx
"use client";

import Link from "next/link";
import { useCart } from "./CartContext";

export default function NavBar() {
  const { cart } = useCart();

  const totalItems = Object.values(cart).reduce(
    (sum, quantity) => sum + quantity,
    0
  );

  return (
    <header
      style={{
        width: "100%",
        borderBottom: "1px solid #e5e7eb",
        backgroundColor: "white",
      }}
    >
      <nav
        style={{
          maxWidth: "960px",
          margin: "0 auto",
          padding: "0.75rem 2rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "1rem",
          fontFamily:
            "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <span style={{ fontSize: "1.25rem" }}>🧺</span>
          <Link
            href="/"
            style={{
              textDecoration: "none",
              color: "#111827",
              fontWeight: 700,
              fontSize: "1.1rem",
            }}
          >
            Mini PokéShop
          </Link>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            fontSize: "0.9rem",
          }}
        >
          <Link
            href="/products"
            style={{ textDecoration: "none", color: "#374151" }}
          >
            Products
          </Link>
          <Link
            href="/cart"
            style={{ textDecoration: "none", color: "#111827" }}
          >
            Bag{" "}
            <span
              style={{
                marginLeft: "0.25rem",
                padding: "0.1rem 0.5rem",
                borderRadius: "999px",
                border: "1px solid #e11d48",
                fontSize: "0.75rem",
                fontWeight: 600,
                color: "#e11d48",
              }}
            >
              {totalItems}
            </span>
          </Link>
        </div>
      </nav>
    </header>
  );
}

