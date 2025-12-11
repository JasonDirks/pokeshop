// lib/products.ts

export type Category = "Plush" | "Apparel" | "Figure" | "Home";

export type Product = {
  id: number;
  slug: string; // for nicer URLs later if you want
  name: string;
  price: number;
  category: Category;
  description: string;
};

export const PRODUCTS: Product[] = [
  {
    id: 1,
    slug: "pikachu-plush",
    name: "Pikachu Plush",
    price: 19.99,
    category: "Plush",
    description: "A soft Pikachu plush perfect for cuddling or display.",
  },
  {
    id: 2,
    slug: "eevee-hoodie",
    name: "Eevee Hoodie",
    price: 39.99,
    category: "Apparel",
    description: "A cosy Eevee hoodie for Trainers of all ages.",
  },
  {
    id: 3,
    slug: "charizard-figure",
    name: "Charizard Figure",
    price: 29.99,
    category: "Figure",
    description: "A detailed Charizard figure for collectors and fans.",
  },
  {
    id: 4,
    slug: "pokeball-mug",
    name: "Poké Ball Mug",
    price: 14.99,
    category: "Home",
    description: "A sturdy mug inspired by the iconic Poké Ball design.",
  },
  {
    id: 5,
    slug: "gengar-beanie",
    name: "Gengar Beanie",
    price: 24.99,
    category: "Apparel",
    description: "A playful Gengar beanie to keep you warm in style.",
  },
  {
    id: 6,
    slug: "bulbasaur-planter",
    name: "Bulbasaur Planter",
    price: 21.99,
    category: "Home",
    description:
      "A charming Bulbasaur planter for succulents and small plants.",
  },
];

export function getProductById(id: number): Product | undefined {
  return PRODUCTS.find((product) => product.id === id);
}

