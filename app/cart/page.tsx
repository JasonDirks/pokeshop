// app/cart/page.tsx
"use client";

import Link from "next/link";
import { PRODUCTS } from "../../lib/products";
import { useCart } from "../CartContext";

export default function CartPage() {
  const { cart, addToCart, removeFromCart, clearCart } = useCart();

  const cartItems = PRODUCTS.filter((p) => cart[p.id] && cart[p.id] > 0).map(
    (product) => ({
      product,
      quantity: cart[product.id],
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
          backgroundColor: "white",
          borderRadius: "12px",
          padding: "2rem",
          boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
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
            <h1 style={{ fontSize: "1.5rem", marginBottom: "0.25rem" }}>
              Your bag
            </h1>
            {cartItems.length === 0 ? (
              <p style={{ color: "#71717a", fontSize: "0.9rem" }}>
                Your bag is empty. Browse products to add something you like.
              </p>
            ) : (
              <p style={{ color: "#111827", fontSize: "0.9rem" }}>
                {cartTotalItems} item
                {cartTotalItems !== 1 ? "s" : ""} · Total: £
                {cartTotalPrice.toFixed(2)}
              </p>
            )}
          </div>
          <Link
            href="/products"
            style={{
              textDecoration: "none",
              color: "#e11d48",
              fontWeight: 600,
              fontSize: "0.9rem",
            }}
          >
            ⬅ Continue shopping
          </Link>
        </header>

        {cartItems.length === 0 ? (
          <></>
        ) : (
          <>
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                marginBottom: "1.5rem",
              }}
            >
              {cartItems.map(({ product, quantity }) => (
                <li
                  key={product.id}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "1rem",
                    padding: "0.75rem 0",
                    borderBottom: "1px solid #e5e7eb",
                  }}
                >
                  <div>
                    <p
                      style={{
                        margin: 0,
                        fontSize: "0.95rem",
                        fontWeight: 500,
                      }}
                    >
                      {product.name}
                    </p>
                    <p
                      style={{
                        margin: 0,
                        fontSize: "0.8rem",
                        color: "#6b7280",
                      }}
                    >
                      £{product.price.toFixed(2)} each
                    </p>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => removeFromCart(product.id)}
                      style={{
                        width: "28px",
                        height: "28px",
                        borderRadius: "999px",
                        border: "1px solid #d4d4d8",
                        backgroundColor: "white",
                        cursor: "pointer",
                        fontWeight: 600,
                      }}
                    >
                      −
                    </button>
                    <span
                      style={{
                        minWidth: "24px",
                        textAlign: "center",
                        fontSize: "0.9rem",
                      }}
                    >
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => addToCart(product.id)}
                      style={{
                        width: "28px",
                        height: "28px",
                        borderRadius: "999px",
                        border: "1px solid #e11d48",
                        backgroundColor: "#e11d48",
                        color: "white",
                        cursor: "pointer",
                        fontWeight: 600,
                      }}
                    >
                      +
                    </button>
                    <span
                      style={{
                        fontSize: "0.9rem",
                        fontWeight: 500,
                        minWidth: "70px",
                        textAlign: "right",
                      }}
                    >
                      £{(product.price * quantity).toFixed(2)}
                    </span>
                  </div>
                </li>
              ))}
            </ul>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "1rem",
              }}
            >
              <button
                type="button"
                onClick={clearCart}
                style={{
                  padding: "0.5rem 1rem",
                  borderRadius: "999px",
                  border: "1px solid #e11d48",
                  backgroundColor: "white",
                  color: "#e11d48",
                  fontSize: "0.9rem",
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                Clear bag
              </button>
              <button
                type="button"
                style={{
                  padding: "0.6rem 1.4rem",
                  borderRadius: "999px",
                  border: "none",
                  backgroundColor: "#16a34a",
                  color: "white",
                  fontSize: "0.95rem",
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                Checkout (demo)
              </button>
            </div>
          </>
        )}
      </div>
    </main>
  );
}

