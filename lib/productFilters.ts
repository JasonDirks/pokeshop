// lib/productFilters.ts
import type { Product, Category } from "./products";

export type ViewMode = "all" | "favourites";

export interface ProductFilterOptions {
  query: string;
  categoryFilter: Category | "All";
  viewMode: ViewMode;
  favouriteIds: Set<number>;
}

/**
 * Normalise a free-text query for case-insensitive matching.
 */
export function normalizeQuery(query: string): string {
  return query.toLowerCase().trim();
}

/**
 * Filter a list of products according to search query, category,
 * and favourites view mode.
 */
export function filterProducts(
  products: Product[],
  { query, categoryFilter, viewMode, favouriteIds }: ProductFilterOptions
): Product[] {
  const normalizedQuery = normalizeQuery(query);

  return products.filter((product) => {
    // Category filter
    if (categoryFilter !== "All" && product.category !== categoryFilter) {
      return false;
    }

    // Text search in name, category, or description
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

    // Favourites view
    if (viewMode === "favourites" && !favouriteIds.has(product.id)) {
      return false;
    }

    return true;
  });
}

