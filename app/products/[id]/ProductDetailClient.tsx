// app/products/[id]/ProductDetailClient.tsx
"use client";

import Link from "next/link";
import { type Product, PRODUCTS } from "../../../lib/products";
import { useCart } from "../../CartContext";

export default function ProductDetailClient({ product }: { product: Product }) {
  const { cart, addToCart } = useCart();

  const cartItems = PRODUCTS.filter((p) => cart[p.id] && cart[p.id] > 0).map(
    (p) => ({
      product: p,
      quantity: cart[p.id],
    })
  );

  const cartTotalItems = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );
  const cartTotalPrice = cartItems.reduce(
    (sum, item) => sum + item.quantity * item.product.price,
    0
  );

  return (
    <main
      style={{
        minHeight: "100vh",
        padding: "2rem",
        fontFamily:
          "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        backgroundColor: "#f4f4f5",
      }}
    >
      <div
        style={{
          maxWidth: "720px",
          margin: "0 auto",
        }}
      >
        {/* Mini bag summary */}
        <section
          style={{
            marginBottom: "1.5rem",
            padding: "0.75rem 1rem",
            borderRadius: "12px",
            backgroundColor: "white",
            boxShadow: "0 2px 10px rgba(0, 0, 0, 0.04)",
          }}
        >
          <h2
            style={{
              fontSize: "0.95rem",
              marginBottom: "0.25rem",
            }}
          >
            Your bag
          </h2>
          {cartItems.length === 0 ? (
            <p style={{ color: "#71717a", fontSize: "0.85rem" }}>
              Your bag is empty.
            </p>
          ) : (
            <p style={{ color: "#111827", fontSize: "0.85rem" }}>
              {cartTotalItems} item
              {cartTotalItems !== 1 ? "s" : ""} · Total: £
              {cartTotalPrice.toFixed(2)}
            </p>
          )}
        </section>

        {/* Product detail card */}
        <div
          style={{
            backgroundColor: "white",
            borderRadius: "12px",
            padding: "2rem",
            boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
          }}
        >
          <div
            style={{
              marginBottom: "1.5rem",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "1rem",
            }}
          >
            <h1 style={{ fontSize: "1.75rem" }}>{product.name}</h1>
            <Link
              href="/products"
              style={{
                textDecoration: "none",
                color: "#e11d48",
                fontWeight: 600,
                fontSize: "0.9rem",
              }}
            >
              ⬅ Back to products
            </Link>
          </div>

          <p
            style={{
              color: "#71717a",
              fontSize: "0.95rem",
              marginBottom: "0.5rem",
            }}
          >
            Category: {product.category}
          </p>
          <p
            style={{
              color: "#6b7280",
              fontSize: "0.95rem",
              marginBottom: "1rem",
            }}
          >
            {product.description}
          </p>

          <p
            style={{
              fontSize: "1.1rem",
              fontWeight: 600,
              marginBottom: "1.5rem",
            }}
          >
            Price: £{product.price.toFixed(2)}
          </p>

          <button
            type="button"
            onClick={() => addToCart(product.id)}
            style={{
              padding: "0.6rem 1.4rem",
              borderRadius: "999px",
              border: "none",
              backgroundColor: "#e11d48",
              color: "white",
              fontSize: "0.95rem",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Add to bag
          </button>
        </div>
      </div>
    </main>
  );
}

