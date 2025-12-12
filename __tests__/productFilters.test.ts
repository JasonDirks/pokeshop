// __tests__/productFilters.test.ts
import {
  filterProducts,
  normalizeQuery,
  type ProductFilterOptions,
} from "../lib/productFilters";
import type { Product, Category } from "../lib/products";

const makeProduct = (overrides: Partial<Product>): Product => ({
  id: 1,
  name: "Pikachu Plush",
  category: "Plush" as Category,
  description: "Soft Pikachu plush toy.",
  price: 19.99,
  ...overrides,
});

describe("normalizeQuery", () => {
  it("lowercases and trims the query", () => {
    expect(normalizeQuery("  PikAChu  ")).toBe("pikachu");
  });

  it("returns empty string for whitespace-only queries", () => {
    expect(normalizeQuery("   ")).toBe("");
  });
});

describe("filterProducts", () => {
  const baseProducts: Product[] = [
    makeProduct({ id: 1, name: "Pikachu Plush", category: "Plush" as Category }),
    makeProduct({
      id: 2,
      name: "Charizard Hoodie",
      category: "Apparel" as Category,
    }),
    makeProduct({ id: 3, name: "Bulbasaur Mug", category: "Home" as Category }),
  ];

  const defaultOptions: ProductFilterOptions = {
    query: "",
    categoryFilter: "All",
    viewMode: "all",
    favouriteIds: new Set<number>(),
  };

  const run = (options: Partial<ProductFilterOptions> = {}) =>
    filterProducts(baseProducts, { ...defaultOptions, ...options });

  it("returns all products when no filters are applied", () => {
    const result = run();
    expect(result).toHaveLength(3);
  });

  it("filters by category", () => {
    const result = run({ categoryFilter: "Plush" });
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe("Pikachu Plush");
  });

  it("filters by search query in the name", () => {
    const result = run({ query: "hoodie" });
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe("Charizard Hoodie");
  });

  it("filters by search query in the description", () => {
    const productsWithDesc: Product[] = [
      makeProduct({
        id: 10,
        name: "Eevee Figure",
        category: "Figure" as Category,
        description: "Collectible Eevee figure for your shelf.",
      }),
    ];
    const result = filterProducts(productsWithDesc, {
      ...defaultOptions,
      query: "shelf",
    });
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe("Eevee Figure");
  });

  it("returns only favourite products in favourites view mode", () => {
    const favourites = new Set<number>([1, 3]);
    const result = run({ viewMode: "favourites", favouriteIds: favourites });
    expect(result).toHaveLength(2);
    const names = result.map((p) => p.name);
    expect(names).toContain("Pikachu Plush");
    expect(names).toContain("Bulbasaur Mug");
  });

  it("returns empty list when no products match query + category + favourites", () => {
    const result = run({
      query: "nonexistent",
      categoryFilter: "Plush",
      viewMode: "favourites",
      favouriteIds: new Set<number>(),
    });
    expect(result).toHaveLength(0);
  });
});

