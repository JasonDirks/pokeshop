// app/products/page.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { PRODUCTS, Product, Category } from "../../lib/products";
import { useCart } from "../CartContext";
import styles from "./ProductsPage.module.css";
import { filterProducts } from "../../lib/productFilters";

type ViewMode = "all" | "favourites";

function ProductCard(props: {
  product: Product;
  isFavourite: boolean;
  onToggleFavourite: () => void;
  onAddToCart: () => void;
}) {
  const { product, isFavourite, onToggleFavourite, onAddToCart } = props;

  const favouriteClassName = isFavourite
    ? `${styles.favouriteButton} ${styles.favouriteButtonActive}`
    : styles.favouriteButton;

  return (
    <article className={styles.card}>
      <div>
        <h2 className={styles.cardTitle}>
          <Link href={`/products/${product.id}`} className={styles.cardLink}>
            {product.name}
          </Link>
        </h2>
        <p className={styles.cardCategory}>Category: {product.category}</p>
        <p className={styles.cardDescription}>{product.description}</p>
      </div>
      <div className={styles.cardFooter}>
        <span className={styles.cardPrice}>
          £{product.price.toFixed(2)}
        </span>
        <div className={styles.cardActions}>
          <button
            type="button"
            onClick={onToggleFavourite}
            className={favouriteClassName}
          >
            {isFavourite ? "♥ Favourited" : "♡ Favourite"}
          </button>
          <button
            type="button"
            onClick={onAddToCart}
            className={`${styles.addButton} button-pill button-primary`}
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
    <section className={styles.grid}>
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

  const { cart, addToCart, clearCart } = useCart();

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

  const filteredProducts = useMemo(() => {
    return filterProducts(PRODUCTS, {
      query,
      categoryFilter,
      viewMode,
      favouriteIds,
    });
  }, [query, categoryFilter, viewMode, favouriteIds]);

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
    <main className="app-page">
      <div className="app-page-inner">
        <header className={styles.header}>
          <div>
            <h1 className={styles.headerTitle}>Products</h1>
            <p className={styles.headerSubtitle}>
              Search by name, category, or description. Mark favourites to come
              back to later.
            </p>
          </div>

          <Link href="/" className={styles.backLink}>
            ⬅ Back home
          </Link>
        </header>

        {/* Cart summary */}
        <section className={styles.cartSection}>
          <div className={styles.cartHeader}>
            <div>
              <h2 className={styles.cartTitle}>Your bag</h2>
              {cartItems.length === 0 ? (
                <p className={styles.cartTextEmpty}>
                  Your bag is empty. Add something you like!
                </p>
              ) : (
                <>
                  <p className={styles.cartText}>
                    {cartTotalItems} item
                    {cartTotalItems !== 1 ? "s" : ""} · Total: £
                    {cartTotalPrice.toFixed(2)}
                  </p>
                  <ul className={styles.cartList}>
                    {cartItems.map(({ product, quantity }) => (
                      <li
                        key={product.id}
                        className={styles.cartListItem}
                      >
                        <span className={styles.cartItemName}>
                          {product.name} × {quantity}
                        </span>
                        <span className={styles.cartItemPrice}>
                          £{(product.price * quantity).toFixed(2)}
                        </span>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>

            {cartItems.length > 0 && (
              <div className={styles.clearButtonWrapper}>
                <button
                  type="button"
                  onClick={clearCart}
                  className={`${styles.clearButton} button-pill button-outline`}
                >
                  Clear bag
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Controls */}
        <section className={styles.controls}>
          <input
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search products..."
            className={styles.searchInput}
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
            className={styles.categorySelect}
          >
            <option value="All">All categories</option>
            {ALL_CATEGORIES.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          <div className={styles.viewToggleGroup}>
            <button
              type="button"
              onClick={() => setViewMode("all")}
              className={
                viewMode === "all"
                  ? styles.viewToggleButtonActive
                  : styles.viewToggleButton
              }
            >
              All
            </button>
            <button
              type="button"
              onClick={() => setViewMode("favourites")}
              className={
                viewMode === "favourites"
                  ? styles.viewToggleButtonActive
                  : styles.viewToggleButton
              }
            >
              Favourites
            </button>
          </div>
        </section>

        {/* Grid */}
        <section className={styles.gridSection}>
          <ProductGrid
            products={filteredProducts}
            favouriteIds={favouriteIds}
            onToggleFavourite={handleToggleFavourite}
            onAddToCart={handleAddToCart}
          />
        </section>
      </div>
    </main>
  );
}

