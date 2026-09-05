import { useState } from "react";

/**
 * KisaanBazar — Farmer Page
 *
 * Matches the wireframe: top nav (Home / Analysis / Orders / Forcast / Switch),
 * a "Farmers!" banner pill + search bar, two promo banners, a Categories
 * pill-row, and a Products grid. Same palette/type system as the login page
 * (login.jsx) so the two screens feel like one app.
 */

const NAV_ITEMS = ["Home", "Analysis", "Orders", "Forcast", "Switch"];

const CATEGORIES = ["Vegetables", "Fruits", "Grains", "Dairy"];

const PRODUCTS = [
  { id: 1, name: "Tomatoes", price: "₹28/kg" },
  { id: 2, name: "Wheat", price: "₹22/kg" },
  { id: 3, name: "Onions", price: "₹18/kg" },
  { id: 4, name: "Milk", price: "₹52/L" },
  { id: 5, name: "Potatoes", price: "₹15/kg" },
];

function PlaceholderThumb({ label }) {
  return (
    <div className="fp-thumb">
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        <line x1="0" y1="0" x2="100" y2="100" />
        <line x1="100" y1="0" x2="0" y2="100" />
      </svg>
      {label && <span className="fp-thumb-label">{label}</span>}
    </div>
  );
}

export default function FarmerPage({ activeNav = "Forcast", onNavigate, onSearch }) {
  const [active, setActive] = useState(activeNav);
  const [query, setQuery] = useState("");

  function handleNavClick(item) {
    setActive(item);
    onNavigate?.(item);
  }

  function handleSearchSubmit(e) {
    e.preventDefault();
    onSearch?.(query);
  }

  return (
    <div className="fp-page">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600&family=Work+Sans:wght@400;500;600&display=swap');

        .fp-page {
          --clay: #b5654a;
          --oxblood: #4a2328;
          --oxblood-deep: #331519;
          --wheat: #d8a73e;
          --wheat-dark: #a67d26;
          --cream: #f6efe4;
          --paper: #fbf7ef;
          --rose: #e3c2ac;
          --rose-soft: #f1ddce;
          --ink: #2a1d18;
          --ink-soft: #6b5a50;

          min-height: 100vh;
          width: 100%;
          background: var(--cream);
          font-family: 'Work Sans', sans-serif;
          color: var(--ink);
        }

        .fp-page * { box-sizing: border-box; }

        .fp-nav {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          background: var(--oxblood-deep);
          padding: 0.85rem 1.5rem;
          flex-wrap: wrap;
        }

        .fp-nav-item {
          border: none;
          background: var(--oxblood);
          color: #e8d2c4;
          font-family: 'Work Sans', sans-serif;
          font-size: 0.88rem;
          font-weight: 500;
          padding: 0.55rem 1.3rem;
          border-radius: 999px;
          cursor: pointer;
          transition: background 0.15s ease, color 0.15s ease;
        }

        .fp-nav-item:hover { background: #5c2c32; }

        .fp-nav-item.fp-active {
          background: var(--wheat);
          color: var(--oxblood-deep);
          font-weight: 600;
        }

        .fp-toolbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          padding: 1.25rem 1.5rem;
          flex-wrap: wrap;
        }

        .fp-hello-pill {
          background: var(--rose);
          font-family: 'Fraunces', serif;
          font-weight: 500;
          font-size: 1.15rem;
          color: var(--oxblood-deep);
          padding: 0.7rem 2rem;
          border-radius: 999px;
        }

        .fp-search {
          flex: 1 1 320px;
          max-width: 460px;
          display: flex;
          align-items: center;
          background: var(--paper);
          border-radius: 999px;
          padding: 0.15rem 0.15rem 0.15rem 1.2rem;
          box-shadow: inset 0 0 0 1.5px rgba(74,35,40,0.12);
        }

        .fp-search input {
          flex: 1;
          border: none;
          background: transparent;
          outline: none;
          font-size: 0.95rem;
          font-family: 'Work Sans', sans-serif;
          color: var(--ink);
          padding: 0.55rem 0;
        }

        .fp-search input::placeholder { color: #a89485; }

        .fp-search-btn {
          width: 42px;
          height: 42px;
          border-radius: 50%;
          border: none;
          background: var(--oxblood);
          color: var(--cream);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          flex-shrink: 0;
        }

        .fp-search-btn:hover { background: var(--oxblood-deep); }

        .fp-section {
          padding: 0 1.5rem 2rem;
        }

        .fp-section-title {
          font-family: 'Fraunces', serif;
          font-weight: 600;
          font-size: 1.15rem;
          color: var(--oxblood-deep);
          margin: 0 0 0.9rem;
        }

        .fp-banners {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
          margin-bottom: 2rem;
        }

        .fp-thumb {
          position: relative;
          background: var(--rose-soft);
          border-radius: 12px;
          aspect-ratio: 16 / 8;
          overflow: hidden;
        }

        .fp-thumb svg {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
        }

        .fp-thumb svg line {
          stroke: rgba(74,35,40,0.28);
          stroke-width: 1;
        }

        .fp-thumb-label {
          position: absolute;
          bottom: 0.5rem;
          left: 0.7rem;
          font-size: 0.75rem;
          color: var(--ink-soft);
          background: rgba(251,247,239,0.85);
          padding: 0.15rem 0.5rem;
          border-radius: 6px;
        }

        .fp-categories {
          display: flex;
          gap: 0.75rem;
          flex-wrap: wrap;
        }

        .fp-category-pill {
          background: var(--oxblood-deep);
          color: var(--wheat);
          border: none;
          font-family: 'Work Sans', sans-serif;
          font-size: 0.85rem;
          font-weight: 500;
          padding: 0.6rem 1.6rem;
          border-radius: 999px;
          cursor: pointer;
          transition: background 0.15s ease;
        }

        .fp-category-pill:hover { background: var(--oxblood); }

        .fp-products {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
          gap: 1rem;
        }

        .fp-product-card .fp-thumb { aspect-ratio: 1 / 1; margin-bottom: 0.6rem; }

        .fp-product-name {
          font-size: 0.9rem;
          font-weight: 500;
          margin: 0;
        }

        .fp-product-price {
          font-size: 0.8rem;
          color: var(--ink-soft);
          margin: 0.1rem 0 0;
        }

        @media (max-width: 640px) {
          .fp-banners { grid-template-columns: 1fr; }
          .fp-toolbar { flex-direction: column; align-items: stretch; }
          .fp-hello-pill { text-align: center; }
        }
      `}</style>

      <nav className="fp-nav">
        {NAV_ITEMS.map((item) => (
          <button
            key={item}
            className={`fp-nav-item ${active === item ? "fp-active" : ""}`}
            onClick={() => handleNavClick(item)}
          >
            {item}
          </button>
        ))}
      </nav>

      <div className="fp-toolbar">
        <div className="fp-hello-pill">Farmers!</div>
        <form className="fp-search" onSubmit={handleSearchSubmit}>
          <input
            type="text"
            placeholder="Search Product"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit" className="fp-search-btn" aria-label="Search">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="7" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </button>
        </form>
      </div>

      <section className="fp-section">
        <div className="fp-banners">
          <PlaceholderThumb label="Seasonal harvest" />
          <PlaceholderThumb label="This week's demand" />
        </div>
      </section>

      <section className="fp-section">
        <h2 className="fp-section-title">Categories</h2>
        <div className="fp-categories">
          {CATEGORIES.map((cat) => (
            <button key={cat} className="fp-category-pill">
              {cat}
            </button>
          ))}
        </div>
      </section>

      <section className="fp-section">
        <h2 className="fp-section-title">Products</h2>
        <div className="fp-products">
          {PRODUCTS.map((p) => (
            <div key={p.id} className="fp-product-card">
              <PlaceholderThumb />
              <p className="fp-product-name">{p.name}</p>
              <p className="fp-product-price">{p.price}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}