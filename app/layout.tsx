import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "./CartContext";
import NavBar from "./NavBar";

export const metadata: Metadata = {
  title: "Mini PokéShop",
  description: "A tiny Pokémon-themed demo storefront",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          backgroundColor: "#f4f4f5",
        }}
      >
        <CartProvider>
          <NavBar />
          {children}
        </CartProvider>
      </body>
    </html>
  );
}

