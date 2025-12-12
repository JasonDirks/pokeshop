// app/page.tsx
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="app-page">
      <div className="app-page-inner">
        {/* Hero section */}
        <section
          style={{
            borderRadius: "16px",
            padding: "2.5rem 2rem",
            background:
              "linear-gradient(135deg, #e11d48, #fb7185 40%, #f97316 100%)",
            color: "white",
            boxShadow: "0 20px 40px rgba(0,0,0,0.18)",
            marginBottom: "2rem",
          }}
        >
          <p
            style={{
              fontSize: "0.85rem",
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              margin: 0,
              opacity: 0.9,
            }}
          >
            Welcome to
          </p>
          <h1
            style={{
              fontSize: "2.25rem",
              margin: "0.25rem 0 0.75rem",
            }}
          >
            Mini PokéShop
          </h1>
          <p
            style={{
              maxWidth: "32rem",
              margin: "0 0 1.5rem",
              fontSize: "0.98rem",
              lineHeight: 1.5,
            }}
          >
            A tiny Pokémon Center–style demo storefront where you can browse
            plush, apparel, and home goods, mark favourites, and build your bag
            with a simple, modern React + Next.js experience.
          </p>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              gap: "0.75rem",
            }}
          >
            <Link
              href="/products"
              className="button-pill button-primary"
              style={{
                padding: "0.7rem 1.6rem",
                textDecoration: "none",
                fontSize: "0.95rem",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.4rem",
              }}
            >
              Start browsing
              <span aria-hidden="true">→</span>
            </Link>
            <p
              style={{
                margin: 0,
                fontSize: "0.85rem",
                opacity: 0.9,
              }}
            >
              No login, no payment — just a demo built with Next.js, TypeScript,
              and React.
            </p>
          </div>
        </section>

        {/* Category highlights */}
        <section>
          <h2
            style={{
              fontSize: "1.25rem",
              marginBottom: "0.75rem",
            }}
          >
            Explore by category
          </h2>
          <p
            style={{
              marginTop: 0,
              marginBottom: "1.25rem",
              fontSize: "0.95rem",
              color: "#4b5563",
            }}
          >
            Use the catalogue to search, filter, favourite products, and add
            them to your bag.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
              gap: "1rem",
            }}
          >
            <div
              style={{
                borderRadius: "12px",
                padding: "1rem",
                backgroundColor: "#ffffff",
                boxShadow: "0 4px 16px rgba(0,0,0,0.04)",
                display: "flex",
                flexDirection: "column",
                gap: "0.25rem",
              }}
            >
              <span style={{ fontSize: "1.4rem" }}>🧸</span>
              <h3
                style={{
                  margin: "0.25rem 0",
                  fontSize: "1rem",
                }}
              >
                Plush & friends
              </h3>
              <p
                style={{
                  margin: 0,
                  fontSize: "0.85rem",
                  color: "#6b7280",
                }}
              >
                Soft companions for your desk or sofa. Try favouriting a few to
                find them again quickly.
              </p>
            </div>

            <div
              style={{
                borderRadius: "12px",
                padding: "1rem",
                backgroundColor: "#ffffff",
                boxShadow: "0 4px 16px rgba(0,0,0,0.04)",
                display: "flex",
                flexDirection: "column",
                gap: "0.25rem",
              }}
            >
              <span style={{ fontSize: "1.4rem" }}>👕</span>
              <h3
                style={{
                  margin: "0.25rem 0",
                  fontSize: "1rem",
                }}
              >
                Apparel
              </h3>
              <p
                style={{
                  margin: 0,
                  fontSize: "0.85rem",
                  color: "#6b7280",
                }}
              >
                Tees and hoodies to show off your favourite Pokémon — filter by
                category on the products page.
              </p>
            </div>

            <div
              style={{
                borderRadius: "12px",
                padding: "1rem",
                backgroundColor: "#ffffff",
                boxShadow: "0 4px 16px rgba(0,0,0,0.04)",
                display: "flex",
                flexDirection: "column",
                gap: "0.25rem",
              }}
            >
              <span style={{ fontSize: "1.4rem" }}>🏠</span>
              <h3
                style={{
                  margin: "0.25rem 0",
                  fontSize: "1rem",
                }}
              >
                Home & desk
              </h3>
              <p
                style={{
                  margin: 0,
                  fontSize: "0.85rem",
                  color: "#6b7280",
                }}
              >
                Small touches that bring the world of Pokémon into your everyday
                space.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

