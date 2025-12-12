// app/cart/page.tsx
"use client";

import Link from "next/link";
import { useCart } from "../CartContext";
import { PRODUCTS, type Product } from "../../lib/products";
import styles from "./CartPage.module.css";

interface CartItem {
  product: Product;
  quantity: number;
}

export default function CartPage() {
  const { cart, addToCart, removeFromCart, clearCart } = useCart();

  const cartItems: CartItem[] = PRODUCTS.map((product) => {
    const quantity = cart[product.id];
    if (!quantity || quantity <= 0) return null;
    return { product, quantity };
  }).filter((item): item is CartItem => item !== null);

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.quantity * item.product.price,
    0
  );
  const hasItems = cartItems.length > 0;

  return (
    <main className="app-page">
      <div className="app-page-inner">
        <header className={styles.header}>
          <div>
            <h1 className={styles.title}>Your bag</h1>
            <p className={styles.subtitle}>
              Review your picks before you (pretend to) check out. This is a
              demo cart built with React, Next.js, and shared cart state.
            </p>
          </div>
          <Link href="/products" className={styles.backLink}>
            ⬅ Back to products
          </Link>
        </header>

        <section className={styles.cartShell}>
          {/* Left: items */}
          <section className={styles.itemsSection}>
            {!hasItems ? (
              <div className={styles.emptyState}>
                <p>Your bag is empty.</p>
                <p className={styles.emptyHint}>
                  Browse the products and add something you like.
                </p>
                <Link
                  href="/products"
                  className={`button-pill button-primary ${styles.emptyButton}`}
                >
                  Start shopping
                </Link>
              </div>
            ) : (
              <ul className={styles.itemList}>
                {cartItems.map(({ product, quantity }) => (
                  <li key={product.id} className={styles.itemRow}>
                    <div className={styles.itemInfo}>
                      <p className={styles.itemName}>{product.name}</p>
                      <p className={styles.itemCategory}>{product.category}</p>
                      <p className={styles.itemPrice}>
                        £{product.price.toFixed(2)} each
                      </p>
                    </div>
                    <div className={styles.itemControls}>
                      <div className={styles.quantityControls}>
                        <button
                          type="button"
                          className="button-pill button-outline"
                          onClick={() => removeFromCart(product.id)}
                        >
                          −
                        </button>
                        <span className={styles.quantity}>{quantity}</span>
                        <button
                          type="button"
                          className="button-pill button-primary"
                          onClick={() => addToCart(product.id)}
                        >
                          +
                        </button>
                      </div>
                      <p className={styles.itemTotal}>
                        £{(product.price * quantity).toFixed(2)}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </section>

          {/* Right: summary */}
          <aside className={styles.summarySection}>
            <div className={styles.summaryCard}>
              <h2 className={styles.summaryTitle}>Order summary</h2>
              <dl className={styles.summaryList}>
                <div className={styles.summaryRow}>
                  <dt>Items</dt>
                  <dd>{totalItems}</dd>
                </div>
                <div className={styles.summaryRow}>
                  <dt>Subtotal</dt>
                  <dd>£{totalPrice.toFixed(2)}</dd>
                </div>
                <div className={styles.summaryRowMuted}>
                  <dt>Shipping</dt>
                  <dd>Free (demo)</dd>
                </div>
              </dl>

              <button
                type="button"
                className={`button-pill button-primary ${styles.checkoutButton}`}
                disabled={!hasItems}
              >
                Checkout (demo)
              </button>

              {hasItems && (
                <button
                  type="button"
                  onClick={clearCart}
                  className={`button-pill button-outline ${styles.clearButton}`}
                >
                  Clear bag
                </button>
              )}

              <p className={styles.summaryNote}>
                This is a demo store – no real purchases, just a way to practice
                building a Pokémon Center–style checkout flow.
              </p>
            </div>
          </aside>
        </section>
      </div>
    </main>
  );
}

