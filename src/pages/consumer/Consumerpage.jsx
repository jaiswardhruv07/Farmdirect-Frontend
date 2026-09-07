import React, { useState, useEffect } from "react";

function ConsumerPage({
  onNavigate,
  onAddToCart,
  cartCount,
  user,
  onProfile,
}) {
  const [address, setAddress] = useState("");
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [addressInput, setAddressInput] = useState("");

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isHome, setIsHome] = useState(true);

  // Selected product for product details
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showHelp, setShowHelp] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("kb_saved_address");

    if (saved) {
      setAddress(saved);
    }
  }, []);

  // ALL PRODUCTS
  // Names and prices are dummy for frontend structure only.
  // Later these can come from backend.

  const products = [
    { id: 1, name: "Tomato", category: "Vegetables", price: 40 },
    { id: 2, name: "Broccoli", category: "Vegetables", price: 80 },
    { id: 3, name: "Potato", category: "Vegetables", price: 30 },
    { id: 4, name: "Apple", category: "Fruits", price: 120 },
    { id: 5, name: "Banana", category: "Fruits", price: 50 },
    { id: 6, name: "Mango", category: "Fruits", price: 100 },
    { id: 7, name: "Rice", category: "Grains", price: 70 },
    { id: 8, name: "Wheat", category: "Grains", price: 45 },
    { id: 9, name: "Corn", category: "Grains", price: 60 },
    { id: 10, name: "Milk", category: "Dairy", price: 60 },
    { id: 11, name: "Paneer", category: "Dairy", price: 90 },
    { id: 12, name: "Curd", category: "Dairy", price: 50 },
  ];

  // NEW PRODUCTS
  const newProducts = [
    { id: 101, name: "Fresh Spinach", category: "Vegetables", price: 35 },
    { id: 102, name: "Fresh Strawberry", category: "Fruits", price: 150 },
    { id: 103, name: "Fresh Butter", category: "Dairy", price: 110 },
  ];

  // CATEGORY LIST (built from products, "All" always first)
  const categories = [
    "All",
    ...Array.from(new Set(products.map((p) => p.category))),
  ];

  // SEARCH RESULTS — search looks through ALL products.
  const searchResults = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // CATEGORY FILTER
  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === "All" || product.category === selectedCategory;
    return matchesCategory;
  });

  // NEW PRODUCT FILTER
  const filteredNewProducts = newProducts.filter((product) => {
    const matchesCategory =
      selectedCategory === "All" || product.category === selectedCategory;
    return matchesCategory;
  });

  function handleSaveAddress() {
    if (!addressInput.trim()) return;

    setAddress(addressInput.trim());

    localStorage.setItem("kb_saved_address", addressInput.trim());

    setIsEditingAddress(false);
  }

  return (
    <div className="consumer-page">
      {/* ================= CONSUMER HEADER ================= */}

      <header className="consumer-header">
        <div className="consumer-brand">
          <span className="consumer-brand-icon">🌾</span>

          <div>
            <strong>
              Kisaan <em>Bazar</em>
            </strong>

            <small>Consumer Panel</small>
          </div>
        </div>

        <div className="consumer-header-right">
          <span className="consumer-notification">🔔</span>

          <button
            className="consumer-user"
            onClick={() => setProfileOpen(!profileOpen)}
          >
            <span className="consumer-avatar">
              {user?.name?.charAt(0)?.toUpperCase() || "C"}
            </span>

            <span className="consumer-user-info">
              <strong>{user?.name || "Consumer"}</strong>
              <small>{user?.email || "Consumer Account"}</small>
            </span>

            <span className="consumer-user-arrow">▾</span>
          </button>

          {profileOpen && (
            <div className="consumer-profile-panel">
              <div className="consumer-profile-avatar">
                {user?.name?.charAt(0)?.toUpperCase() || "C"}
              </div>

              <h3>{user?.name || "Consumer"}</h3>

              <p className="consumer-profile-role">Consumer</p>

              <div className="consumer-profile-info">
                <div>
                  <span>Email</span>
                  <strong>{user?.email || "Not available"}</strong>
                </div>

                <div>
                  <span>Delivery Address</span>
                  <strong>{address || "Not added"}</strong>
                </div>
              </div>

              <button
                className="consumer-profile-action"
                onClick={() => {
                  setProfileOpen(false);
                  onProfile?.();
                }}
              >
                View / Update Profile
              </button>
            </div>
          )}
        </div>
      </header>

      {/* ================= MAIN DASHBOARD LAYOUT ================= */}

      <div className="consumer-layout">
        {/* ================= LEFT SIDEBAR ================= */}

        <aside className="consumer-sidebar">
          <div className="consumer-sidebar-menu">
            <button
              className={isHome ? "active" : ""}
              onClick={() => {
                setIsHome(true);
                setSelectedCategory("All");
                setSearchTerm("");
              }}
            >
              <span>🏠</span>
              <span>Home</span>
              <span className="consumer-menu-arrow">›</span>
            </button>

            <button
              className={!isHome ? "active" : ""}
              onClick={() => {
                setIsHome(false);
                setSelectedCategory("All");
                setSearchTerm("");
              }}
            >
              <span>🛍️</span>
              <span>Items</span>
              <span className="consumer-menu-arrow">›</span>
            </button>

            {/* ============ CATEGORY FILTER (shows when "Items" is active) ============ */}
            {!isHome && (
              <div className="consumer-sidebar-categories">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    className={
                      selectedCategory === cat
                        ? "category-btn active"
                        : "category-btn"
                    }
                    onClick={() => setSelectedCategory(cat)}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            )}

            <button onClick={() => onNavigate?.("cart")}>
              <span>🛒</span>

              <span>Cart{cartCount > 0 ? ` (${cartCount})` : ""}</span>

              <span className="consumer-menu-arrow">›</span>
            </button>

            <button onClick={() => onNavigate?.("checkout")}>
              <span>💳</span>
              <span>Checkout</span>
              <span className="consumer-menu-arrow">›</span>
            </button>
          </div>

          <div className="consumer-sidebar-bottom">
            <div className="consumer-sidebar-illustration">👨‍🌾 🌾</div>

            <strong>Fresh from Farmers</strong>

            <span>Better Food • Better Farming</span>
          </div>
        </aside>

        {/* ================= RIGHT SIDE MAIN CONTENT ================= */}

        <main className="consumer-main">
          {/* ================= ADDRESS BAR (single copy) ================= */}

          <div className="address-bar">
            {isEditingAddress ? (
              <div className="address-edit">
                <span className="address-icon">📍</span>

                <input
                  type="text"
                  placeholder="Enter your delivery address"
                  value={addressInput}
                  onChange={(e) => setAddressInput(e.target.value)}
                  autoFocus
                />

                <button onClick={handleSaveAddress}>Save</button>

                <button
                  onClick={() => {
                    setIsEditingAddress(false);
                    setAddressInput("");
                  }}
                >
                  Cancel
                </button>
              </div>
            ) : address ? (
              <p>
                <span className="address-icon">📍</span>

                <span>
                  <strong>Delivering to:</strong> {address}
                </span>

                <button
                  onClick={() => {
                    setAddressInput(address);
                    setIsEditingAddress(true);
                  }}
                >
                  Change
                </button>
              </p>
            ) : (
              <button
                className="add-address-btn"
                onClick={() => setIsEditingAddress(true)}
              >
                📍 + Add your address
              </button>
            )}
          </div>

          {/* ================= SEARCH BAR (single copy) ================= */}

          <div className="search-wrapper">
            <div className="search-container">
              <input
                type="text"
                placeholder="Search Product"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />

              <span>🔍</span>
            </div>

            {searchTerm.trim() && (
              <div className="search-results">
                {searchResults.length > 0 ? (
                  searchResults.map((product) => (
                    <div
                      key={product.id}
                      className="search-result-item"
                      onClick={() => {
                        setSelectedProduct(product);
                        setSearchTerm("");
                      }}
                    >
                      <span>{product.name}</span>

                      <small>{product.category}</small>
                    </div>
                  ))
                ) : (
                  <div className="no-search-result">No products found</div>
                )}
              </div>
            )}
          </div>

          {/* ================= HERO ================= */}

          {isHome && (
            <section className="hero-banner">
              <img
                src="https://picsum.photos/seed/foodapp/900/280"
                alt="New launch advertisement"
                className="hero-image"
              />
            </section>
          )}

          {/* ================= NEW PRODUCTS ================= */}

          <h2>New Products</h2>

          <div className="product-grid">
            {filteredNewProducts.map((product) => (
              <div
                className="product-card"
                key={product.id}
                onClick={() => setSelectedProduct(product)}
              >
                <div className="cross">X</div>

                <p>{product.name}</p>

                <p>₹{product.price}/kg</p>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onAddToCart?.(product);
                  }}
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>

          {/* ================= ALL ITEMS ================= */}

          <h2>All Items</h2>

          <div className="product-grid">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <div
                  className="product-card"
                  key={product.id}
                  onClick={() => setSelectedProduct(product)}
                >
                  <div className="cross">X</div>

                  <p>{product.name}</p>

                  <p>₹{product.price}/kg</p>

                  <small>{product.category}</small>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onAddToCart?.(product);
                    }}
                  >
                    Add to Cart
                  </button>
                </div>
              ))
            ) : (
              <p>No products found.</p>
            )}
          </div>
        </main>
      </div>

      {/* ================= PRODUCT DETAIL ================= */}

      {selectedProduct && (
        <div
          className="product-detail-overlay"
          onClick={() => setSelectedProduct(null)}
        >
          <div
            className="product-detail-card"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="close-detail"
              onClick={() => setSelectedProduct(null)}
            >
              ✕
            </button>

            <div className="product-detail-image">X</div>

            <h2>{selectedProduct.name}</h2>

            <p className="detail-category">{selectedProduct.category}</p>

            <p className="detail-price">
              {selectedProduct.price
                ? `₹${selectedProduct.price}kg`
                : "Price not available"}
            </p>

            <button
              className="detail-cart-button"
              onClick={() => {
                onAddToCart?.(selectedProduct);
                setSelectedProduct(null);
              }}
            >
              Add to Cart
            </button>
          </div>
        </div>
      )}

      {/* ================= HELP PANEL ================= */}

      {showHelp && (
        <div className="help-bar">
          <div className="help-content">
            <h3>Need Help?</h3>

            <p>
              📞 <strong>Contact:</strong> 9321440678
            </p>

            <p>
              ✉️ <strong>Email:</strong> deepshikhamaityyy@gmail.com
            </p>

            <p>
              📍 <strong>Office:</strong> Kisaan Bazar Office, Andheri East,
              Mumbai, Maharashtra - 400069
            </p>
          </div>

          <button className="help-close" onClick={() => setShowHelp(false)}>
            ✕
          </button>
        </div>
      )}

      {/* ================= ABOUT PANEL ================= */}

      {showAbout && (
        <div className="about-bar">
          <div className="about-content">
            <h3>About Kisaan Bazaar</h3>

            <p>
              <strong>Kisaan Bazaar</strong> is a digital platform that
              directly connects farmers with consumers.
            </p>

            <p>
              Our goal is to reduce the role of unnecessary intermediaries
              (middlemen) in the agricultural supply chain. This helps
              farmers receive a better and fairer price for their produce,
              while consumers can buy fresh agricultural products at more
              affordable prices.
            </p>

            <p>
              Kisaan Bazaar aims to create a transparent, fair, and efficient
              marketplace where farmers get better value for their hard work
              and consumers get quality products at reasonable prices.
            </p>

            <div className="about-flow">
              <span>Farmer</span>
              <span>→</span>
              <span>Kisaan Bazaar</span>
              <span>→</span>
              <span>Consumer</span>
            </div>
          </div>

          <button className="about-close" onClick={() => setShowAbout(false)}>
            ✕
          </button>
        </div>
      )}

      {/* ================= FOOTER (Help / About centered) ================= */}

      <footer className="footer">
        <div className="footer-actions">
          <button
            className={showHelp ? "footer-btn active" : "footer-btn"}
            onClick={() => setShowHelp(!showHelp)}
          >
             Help
          </button>

          <button
            className={showAbout ? "footer-btn active" : "footer-btn"}
            onClick={() => setShowAbout(!showAbout)}
          >
             About
          </button>
        </div>

        <button className="footer-more">•••</button>
      </footer>
    </div>
  );
}

export default ConsumerPage;