// app/products/[id]/page.tsx
import Link from "next/link";
import { PRODUCTS } from "../../../lib/products";
import ProductDetailClient from "./ProductDetailClient";

type ProductPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const resolvedParams = await params;
  const idNumber = Number(resolvedParams.id);
  const product = PRODUCTS.find((p) => p.id === idNumber);

  if (!product) {
    return (
      <main
        style={{
          minHeight: "100vh",
          padding: "2rem",
          fontFamily:
            "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        }}
      >
        <h1>Product not found</h1>
        <p>No product found for id: {resolvedParams.id}</p>
        <p style={{ marginTop: "1rem" }}>
          <Link href="/products">⬅ Back to products</Link>
        </p>
      </main>
    );
  }

  // Render the client component that can use useCart()
  return <ProductDetailClient product={product} />;
}

