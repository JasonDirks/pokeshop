// app/NavBar.tsx
"use client";

import Link from "next/link";
import { useCart } from "./CartContext";
import styles from "./NavBar.module.css";

export default function NavBar() {
  const { cart } = useCart();

  const totalItems = Object.values(cart).reduce(
    (sum, quantity) => sum + quantity,
    0
  );

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <div className={styles.brand}>
          <span className={styles.logo} aria-hidden="true">
            <span className={styles.logoCenter} />
          </span>
          <Link href="/" className={styles.title}>
            Mini PokéShop
          </Link>
        </div>

        <div className={styles.links}>
          <Link href="/products" className={styles.link}>
            Products
          </Link>
          <Link href="/cart" className={styles.linkActive}>
            Bag
            <span className={styles.bagCount}>{totalItems}</span>
          </Link>
        </div>
      </nav>
    </header>
  );
}

