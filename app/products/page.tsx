// app/products/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";

type Product = {
  id: number;
  name: string;
  price: number;
  category: string; // e.g. "Plush", "Figure", "Apparel"
};

const PRODUCTS: Product[] = [
  { id: 1, name: "Pikachu Plush", price: 19.99, category: "Plush" },
  { id: 2, name: "Eevee Hoodie", price: 39.99, category: "Apparel" },
  { id: 3, name: "Charizard Figure", price: 29.99, category: "Figure" },
  { id: 4, name: "Poké Ball Mug", price: 14.99, category: "Home" },
  { id: 5, name: "Gengar Beanie", price: 24.99, category: "Apparel" },
  { id: 6, name: "Bulbasaur Planter", price: 21.99, category: "Home" },
];

export default function ProductsPage() {
  const [query, setQuery] = useState("");

  const normalizedQuery = query.toLowerCase().trim();

  const filteredProducts = PRODUCTS.filter((product) => {
    if (!normalizedQuery) return true;
    const inName = product.name.toLowerCase().includes(normalizedQuery);
    const inCategory = product.category.toLowerCase().includes(normalizedQuery);
    return inName || inCategory;
  });

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
          maxWidth: "960px",
          margin: "0 auto",
        }}
      >
        <header
          style={{
            marginBottom: "1.5rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          <div>
            <h1 style={{ fontSize: "1.75rem", marginBottom: "0.25rem" }}>
              Products
            </h1>
            <p style={{ color: "#555" }}>
              Search by name or category (e.g. &quot;Plush&quot;, &quot;Apparel&quot;).
            </p>
          </div>

          <Link
            href="/"
            style={{
              textDecoration: "none",
              color: "#e11d48",
              fontWeight: 600,
            }}
          >
            ⬅ Back home
          </Link>
        </header>

        <section
          style={{
            marginBottom: "1.5rem",
          }}
        >
          <input
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search products..."
            style={{
              width: "100%",
              maxWidth: "320px",
              padding: "0.5rem 0.75rem",
              borderRadius: "999px",
              border: "1px solid #d4d4d8",
              outline: "none",
            }}
          />
        </section>

        <section
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
            gap: "1rem",
          }}
        >
          {filteredProducts.length === 0 ? (
            <p style={{ color: "#555" }}>No products match your search.</p>
          ) : (
            filteredProducts.map((product) => (
              <article
                key={product.id}
                style={{
                  backgroundColor: "white",
                  borderRadius: "12px",
                  padding: "1rem",
                  boxShadow: "0 4px 16px rgba(0,0,0,0.06)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  gap: "0.5rem",
                }}
              >
                <div>
                  <h2
                    style={{
                      fontSize: "1.1rem",
                      marginBottom: "0.25rem",
                    }}
                  >
                    {product.name}
                  </h2>
                  <p
                    style={{
                      color: "#71717a",
                      fontSize: "0.9rem",
                    }}
                  >
                    Category: {product.category}
                  </p>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginTop: "0.5rem",
                  }}
                >
                  <span style={{ fontWeight: 600 }}>
                    £{product.price.toFixed(2)}
                  </span>
                  <button
                    type="button"
                    style={{
                      padding: "0.4rem 0.9rem",
                      borderRadius: "999px",
                      border: "none",
                      backgroundColor: "#e11d48",
                      color: "white",
                      fontSize: "0.85rem",
                      fontWeight: 600,
                      cursor: "pointer",
                    }}
                  >
                    Add to bag
                  </button>
                </div>
              </article>
            ))
          )}
        </section>
      </div>
    </main>
  );
}

