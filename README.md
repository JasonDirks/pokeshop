## Features

### Product catalogue

- Small catalogue of Pokémon–themed products (plush, apparel, home items, figures).
- Search by name, category, or description.
- Filter by category via dropdown.

### Favourites

- Mark products as favourites with a heart button.
- Toggle between:
  - **All** products
  - **Favourites** only
- Favourites are persisted in `localStorage` so they survive page refreshes.

### Global cart (bag)

- Cart state is provided via a `CartProvider` using React Context.
- Any page can read and update the cart via a `useCart()` hook.
- “Add to bag” works from both:
  - The main product grid (`/products`)
  - Individual product detail pages (`/products/[id]`)
- Cart contents are persisted to `localStorage`.

### Cart page

- Dedicated `/cart` page that shows:
  - Line items with name, unit price, quantity, and line total.
  - `+` / `−` buttons to adjust quantity per item.
  - Overall item count and total price.
- Global nav shows a live bag count on every page.
- “Clear bag” button and a “Checkout (demo)” action to simulate flow. 
