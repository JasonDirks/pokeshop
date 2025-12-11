// app/CartContext.tsx
"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export type Cart = Record<number, number>; // productId -> quantity

type CartContextValue = {
  cart: Cart;
  addToCart: (productId: number) => void;
  removeFromCart: (productId: number) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Cart>({});

  // Load cart once on mount from localStorage
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem("pokeshop-cart");
      if (!raw) return;
      const parsed = JSON.parse(raw) as Cart;
      setCart(parsed);
    } catch {
      // ignore invalid JSON
    }
  }, []);

  // Persist cart whenever it changes
  useEffect(() => {
    window.localStorage.setItem("pokeshop-cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (productId: number) => {
    setCart((prev) => {
      const next: Cart = { ...prev };
      next[productId] = (next[productId] || 0) + 1;
      return next;
    });
  };

  const removeFromCart = (productId: number) => {
    setCart((prev) => {
      const next: Cart = { ...prev };
      if (!next[productId]) return next;
      next[productId] = next[productId] - 1;
      if (next[productId] <= 0) {
        delete next[productId];
      }
      return next;
    });
  };

  const clearCart = () => setCart({});

  const value: CartContextValue = {
    cart,
    addToCart,
    removeFromCart,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return ctx;
}

