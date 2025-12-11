// app/products/page.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { PRODUCTS, Product, Category } from "../../lib/products";
import { useCart } from "../CartContext";

type ViewMode = "all" | "favourites";

function ProductCard(props: {
  product: Product;
  isFavourite: boolean;
  onToggleFavourite: () => void;
  onAddToCart: () => void;
}) {
  const { product, isFavourite, onToggleFavourite, onAddToCart } = props;

  return (
    <article
      style={{
        backgroundColor: "white",
        borderRadius: "12px",
        padding: "1rem",
        boxShadow: "0 4px 16px rgba(0, 0, 0, 0.06)",
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
          <Link
            href={`/products/${product.id}`}
            style={{ textDecoration: "none", color: "#111827" }}
          >
            {product.name}
          </Link>
        </h2>
        <p
          style={{
            color: "#71717a",
            fontSize: "0.9rem",
            marginBottom: "0.25rem",
          }}
        >
          Category: {product.category}
        </p>
        <p
          style={{
            color: "#6b7280",
            fontSize: "0.85rem",
          }}
        >
          {product.description}
        </p>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "0.5rem",
          gap: "0.5rem",
        }}
      >
        <span style={{ fontWeight: 600 }}>£{product.price.toFixed(2)}</span>
        <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
          <button
            type="button"
            onClick={onToggleFavourite}
            style={{
              padding: "0.25rem 0.6rem",
              borderRadius: "999px",
              border: "1px solid #e11d48",
              backgroundColor: isFavourite ? "#e11d48" : "white",
              color: isFavourite ? "white" : "#e11d48",
              fontSize: "0.8rem",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            {isFavourite ? "♥ Favourited" : "♡ Favourite"}
          </button>
          <button
            type="button"
            onClick={onAddToCart}
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
      </div>
    </article>
  );
}

function ProductGrid(props: {
  products: Product[];
  favouriteIds: Set<number>;
  onToggleFavourite: (id: number) => void;
  onAddToCart: (id: number) => void;
}) {
  const { products, favouriteIds, onToggleFavourite, onAddToCart } = props;

  if (products.length === 0) {
    return <p style={{ color: "#555" }}>No products match your search.</p>;
  }

  return (
    <section
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
        gap: "1rem",
      }}
    >
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          isFavourite={favouriteIds.has(product.id)}
          onToggleFavourite={() => onToggleFavourite(product.id)}
          onAddToCart={() => onAddToCart(product.id)}
        />
      ))}
    </section>
  );
}

const ALL_CATEGORIES: Category[] = ["Plush", "Apparel", "Figure", "Home"];

export default function ProductsPage() {
  const [query, setQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<Category | "All">("All");
  const [viewMode, setViewMode] = useState<ViewMode>("all");
  const [favouriteIds, setFavouriteIds] = useState<Set<number>>(new Set());

  const { cart, addToCart, removeFromCart, clearCart } = useCart();

  // Load favourites from localStorage once on mount
  useEffect(() => {
    try {
      const rawFavs = window.localStorage.getItem("pokeshop-favourites");
      if (!rawFavs) return;
      const parsedFavs = JSON.parse(rawFavs) as number[];
      setFavouriteIds(new Set(parsedFavs));
    } catch {
      // ignore parse errors
    }
  }, []);

  // Persist favourites when they change
  useEffect(() => {
    const idsArray = Array.from(favouriteIds);
    window.localStorage.setItem(
      "pokeshop-favourites",
      JSON.stringify(idsArray)
    );
  }, [favouriteIds]);

  const normalizedQuery = query.toLowerCase().trim();

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      if (categoryFilter !== "All" && product.category !== categoryFilter) {
        return false;
      }

      if (normalizedQuery) {
        const inName = product.name.toLowerCase().includes(normalizedQuery);
        const inCategory = product.category
          .toLowerCase()
          .includes(normalizedQuery);
        const inDescription = product.description
          .toLowerCase()
          .includes(normalizedQuery);
        if (!inName && !inCategory && !inDescription) {
          return false;
        }
      }

      if (viewMode === "favourites" && !favouriteIds.has(product.id)) {
        return false;
      }

      return true;
    });
  }, [categoryFilter, favouriteIds, normalizedQuery, viewMode]);

  const handleToggleFavourite = (id: number) => {
    setFavouriteIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleAddToCart = (id: number) => {
    addToCart(id);
  };

  const handleRemoveFromCart = (id: number) => {
    removeFromCart(id);
  };

  const cartItems = useMemo(() => {
    const items: { product: Product; quantity: number }[] = [];

    for (const product of PRODUCTS) {
      const quantity = cart[product.id];
      if (quantity && quantity > 0) {
        items.push({ product, quantity });
      }
    }

    return items;
  }, [cart]);

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
              Search by name, category, or description. Mark favourites to come
              back to later.
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

        {/* Cart summary */}
        <section
          style={{
            marginBottom: "1.5rem",
            padding: "0.75rem 1rem",
            borderRadius: "12px",
            backgroundColor: "white",
            boxShadow: "0 2px 10px rgba(0, 0, 0, 0.04)",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              gap: "1rem",
            }}
          >
            <div style={{ flex: "1 1 auto" }}>
              <h2
                style={{
                  fontSize: "1rem",
                  marginBottom: "0.25rem",
                }}
              >
                Your bag
              </h2>
              {cartItems.length === 0 ? (
                <p style={{ color: "#71717a", fontSize: "0.9rem" }}>
                  Your bag is empty. Add something you like!
                </p>
              ) : (
                <>
                  <p style={{ color: "#111827", fontSize: "0.9rem" }}>
                    {cartTotalItems} item
                    {cartTotalItems !== 1 ? "s" : ""} · Total: £
                    {cartTotalPrice.toFixed(2)}
                  </p>
                  <ul
                    style={{
                      listStyle: "none",
                      padding: 0,
                      marginTop: "0.5rem",
                      marginBottom: 0,
                    }}
                  >
                    {cartItems.map(({ product, quantity }) => (
                      <li
                        key={product.id}
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          gap: "0.5rem",
                          fontSize: "0.85rem",
                          padding: "0.25rem 0",
                        }}
                      >
                        <span>
                          {product.name} × {quantity}
                        </span>
                        <span>£{(product.price * quantity).toFixed(2)}</span>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>

            {cartItems.length > 0 && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.5rem",
                }}
              >
                <button
                  type="button"
                  onClick={clearCart}
                  style={{
                    padding: "0.35rem 0.8rem",
                    borderRadius: "999px",
                    border: "1px solid #e11d48",
                    backgroundColor: "white",
                    color: "#e11d48",
                    fontSize: "0.8rem",
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  Clear bag
                </button>
                {/* Tiny hint: remove 1 Pikachu, etc. */}
                <p
                  style={{
                    color: "#a1a1aa",
                    fontSize: "0.75rem",
                    maxWidth: "160px",
                  }}
                >
                  To remove a single item, click "Add to bag" fewer times next
                  time – in a real app this would be a full cart page with
                  quantity controls.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Controls */}
        <section
          style={{
            marginBottom: "1.5rem",
            display: "flex",
            flexWrap: "wrap",
            gap: "0.75rem",
            alignItems: "center",
          }}
        >
          <input
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search products..."
            style={{
              flex: "1 1 220px",
              maxWidth: "320px",
              padding: "0.5rem 0.75rem",
              borderRadius: "999px",
              border: "1px solid #d4d4d8",
              outline: "none",
            }}
          />
          <select
            value={categoryFilter}
            onChange={(event) =>
              setCategoryFilter(
                event.target.value === "All"
                  ? "All"
                  : (event.target.value as Category)
              )
            }
            style={{
              padding: "0.5rem 0.75rem",
              borderRadius: "999px",
              border: "1px solid #d4d4d8",
              outline: "none",
            }}
          >
            <option value="All">All categories</option>
            {ALL_CATEGORIES.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          <div
            style={{
              display: "inline-flex",
              borderRadius: "999px",
              border: "1px solid #d4d4d8",
              overflow: "hidden",
            }}
          >
            <button
              type="button"
              onClick={() => setViewMode("all")}
              style={{
                padding: "0.4rem 0.8rem",
                border: "none",
                backgroundColor: viewMode === "all" ? "#e11d48" : "white",
                color: viewMode === "all" ? "white" : "#111827",
                fontSize: "0.8rem",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              All
            </button>
            <button
              type="button"
              onClick={() => setViewMode("favourites")}
              style={{
                padding: "0.4rem 0.8rem",
                border: "none",
                backgroundColor:
                  viewMode === "favourites" ? "#e11d48" : "white",
                color: viewMode === "favourites" ? "white" : "#111827",
                fontSize: "0.8rem",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Favourites
            </button>
          </div>
        </section>

        {/* Grid */}
        <ProductGrid
          products={filteredProducts}
          favouriteIds={favouriteIds}
          onToggleFavourite={handleToggleFavourite}
          onAddToCart={handleAddToCart}
        />
      </div>
    </main>
  );
}

