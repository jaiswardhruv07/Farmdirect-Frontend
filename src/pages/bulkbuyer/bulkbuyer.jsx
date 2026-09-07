import React, { useState, useEffect } from "react";
import "./bulkbuyer.css";

/* =========================================================
   BULK PRICING HELPERS
   -------------------------------------------------------
   Tiers:
     5–9 kg    -> 0%
     10–19 kg  -> 5%
     20–49 kg  -> 10%
     50–99 kg  -> 15%
     100+ kg   -> 20%
========================================================= */

function getBulkDiscount(quantity) {
  if (quantity >= 100) return 20;
  if (quantity >= 50) return 15;
  if (quantity >= 20) return 10;
  if (quantity >= 10) return 5;
  return 0;
}

function calculateDiscountAmount(price, quantity) {
  const base = price * quantity;
  const discount = getBulkDiscount(quantity);
  return (base * discount) / 100;
}

function calculateFinalPrice(price, quantity) {
  const base = price * quantity;
  return base - calculateDiscountAmount(price, quantity);
}

const MIN_BULK_QTY = 5;
const QTY_STEP = 1; // 1 kg increments — simplest option that still lets buyers land

// exactly on every discount tier boundary (10, 20, 50, 100).

function BulkBuyerPage({
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

  // "home" | "items" | "cart" | "checkout" | "orders"
  const [view, setView] = useState("home");

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [profileOpen, setProfileOpen] = useState(false);

  // quantity chosen per product id (product grid + modal), defaults to 5 kg
  const [quantities, setQuantities] = useState({});

  // the bulk buyer's cart: [{ id, name, category, price, quantity }]
  const [bulkCart, setBulkCart] = useState([]);
  const [checkoutError, setCheckoutError] = useState("");
  const [orderPlaced, setOrderPlaced] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("kb_saved_address");
    if (saved) {
      setAddress(saved);
    }
  }, []);

  // ALL PRODUCTS — same catalog structure as the Consumer Page.
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

  const newProducts = [
    { id: 101, name: "Fresh Spinach", category: "Vegetables", price: 35 },
    { id: 102, name: "Fresh Strawberry", category: "Fruits", price: 150 },
    { id: 103, name: "Fresh Butter", category: "Dairy", price: 110 },
  ];

  const categories = [
    "All",
    ...Array.from(new Set(products.map((p) => p.category))),
  ];

  const searchResults = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === "All" || product.category === selectedCategory;
    return matchesCategory;
  });

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

  function getQuantity(productId) {
    return quantities[productId] ?? MIN_BULK_QTY;
  }

  function setQuantity(productId, value) {
    const clamped = Math.max(MIN_BULK_QTY, value);
    setQuantities((prev) => ({ ...prev, [productId]: clamped }));
  }

  function incrementQuantity(productId) {
    setQuantity(productId, getQuantity(productId) + QTY_STEP);
  }

  function decrementQuantity(productId) {
    setQuantity(productId, getQuantity(productId) - QTY_STEP);
  }

  function goToView(nextView) {
    setView(nextView);
    setSelectedCategory("All");
    setSearchTerm("");
    // Optional hook so a parent app can react to bulk-buyer navigation
    // the same way it does for the Consumer Page, without this page
    // depending on that behavior existing.
    onNavigate?.(nextView);
  }

  function handleAddToBulkCart(product, quantity) {
    if (quantity < MIN_BULK_QTY) return;

    setBulkCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          category: product.category,
          price: product.price,
          quantity,
        },
      ];
    });

    // Let the parent app know a bulk item was added (cart badge counts,
    // shared cart storage, etc.) without assuming its exact shape.
    onAddToCart?.({
      ...product,
      quantity,
      discountPercent: getBulkDiscount(quantity),
      finalPrice: calculateFinalPrice(product.price, quantity),
    });
  }

  function updateCartQuantity(productId, quantity) {
    const clamped = Math.max(MIN_BULK_QTY, quantity);
    setBulkCart((prev) =>
      prev.map((item) =>
        item.id === productId ? { ...item, quantity: clamped } : item
      )
    );
  }

  function removeCartItem(productId) {
    setBulkCart((prev) => prev.filter((item) => item.id !== productId));
  }

  const cartTotalQuantity = bulkCart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const cartSubtotal = bulkCart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const cartTotalDiscount = bulkCart.reduce(
    (sum, item) => sum + calculateDiscountAmount(item.price, item.quantity),
    0
  );

  const cartFinalTotal = bulkCart.reduce(
    (sum, item) => sum + calculateFinalPrice(item.price, item.quantity),
    0
  );

  function handlePlaceOrder() {
    const invalidItem = bulkCart.find((item) => item.quantity < MIN_BULK_QTY);

    if (bulkCart.length === 0) {
      setCheckoutError("Your bulk cart is empty.");
      return;
    }

    if (invalidItem) {
      setCheckoutError(
        "Each bulk order must contain at least 5 kg per product."
      );
      return;
    }

    setCheckoutError("");
    setOrderPlaced(true);
  }

  function renderQuantitySelector(productId) {
    const qty = getQuantity(productId);
    return (
      <div className="bb-qty-selector" onClick={(e) => e.stopPropagation()}>
        <span>Quantity:</span>
        <div className="bb-qty-controls">
          <button
            type="button"
            disabled={qty <= MIN_BULK_QTY}
            onClick={() => decrementQuantity(productId)}
          >
            −
          </button>
          <span className="bb-qty-value">{qty} kg</span>
          <button type="button" onClick={() => incrementQuantity(productId)}>
            +
          </button>
        </div>
        {qty === MIN_BULK_QTY && (
          <small className="bb-min-note">Minimum bulk order is 5 kg.</small>
        )}
      </div>
    );
  }

  function renderPricingBreakdown(product) {
    const qty = getQuantity(product.id);
    const discount = getBulkDiscount(qty);
    const base = product.price * qty;
    const discountAmount = calculateDiscountAmount(product.price, qty);
    const final = calculateFinalPrice(product.price, qty);

    return (
      <div className="bb-pricing" onClick={(e) => e.stopPropagation()}>
        <div className="bb-pricing-row">
          <span>Base price</span>
          <span>₹{base}</span>
        </div>
        <div className="bb-pricing-row">
          <span>Bulk discount</span>
          <span className={discount > 0 ? "bb-discount-value" : ""}>
            {discount}%
          </span>
        </div>
        {discount > 0 && (
          <div className="bb-pricing-row">
            <span>You save</span>
            <span className="bb-discount-value">
              -₹{discountAmount.toFixed(0)}
            </span>
          </div>
        )}
        <div className="bb-pricing-row bb-pricing-total">
          <span>Total</span>
          <span>₹{final.toFixed(0)}</span>
        </div>
      </div>
    );
  }

  function renderProductCard(product) {
    const qty = getQuantity(product.id);
    return (
      <div
        className="bb-product-card"
        key={product.id}
        onClick={() => setSelectedProduct(product)}
      >
        <div className="bb-cross">X</div>

        <p className="bb-product-name">{product.name}</p>
        <small className="bb-product-category">{product.category}</small>
        <p className="bb-product-price">₹{product.price}/kg</p>

        {renderQuantitySelector(product.id)}
        {renderPricingBreakdown(product)}

        <button
          className="bb-add-cart-btn"
          onClick={(e) => {
            e.stopPropagation();
            handleAddToBulkCart(product, qty);
          }}
        >
          Add to Bulk Cart
        </button>
      </div>
    );
  }

  return (
    <div className="bulkbuyer-page">
      {/* ================= HEADER ================= */}

      <header className="bb-header">
        <div className="bb-brand">
          <span className="bb-brand-icon">🌾</span>

          <div>
            <strong>
              Kisaan <em>Bazar</em>
            </strong>
            <small>Bulk Buyer Panel</small>
          </div>
        </div>

        <div className="bb-header-right">
          <span className="bb-notification">🔔</span>

          <button
            className="bb-user"
            onClick={() => setProfileOpen(!profileOpen)}
          >
            <span className="bb-avatar">
              {user?.name?.charAt(0)?.toUpperCase() || "B"}
            </span>

            <span className="bb-user-info">
              <strong>{user?.name || "Bulk Buyer"}</strong>
              <small>{user?.email || "Bulk Buyer Account"}</small>
            </span>

            <span className="bb-user-arrow">▾</span>
          </button>

          {profileOpen && (
            <div className="bb-profile-panel">
              <div className="bb-profile-avatar">
                {user?.name?.charAt(0)?.toUpperCase() || "B"}
              </div>

              <h3>{user?.name || "Bulk Buyer"}</h3>
              <p className="bb-profile-role">Bulk Buyer</p>

              <div className="bb-profile-info">
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
                className="bb-profile-action"
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

      {/* ================= LAYOUT ================= */}

      <div className="bb-layout">
        {/* ================= SIDEBAR ================= */}

        <aside className="bb-sidebar">
          <div className="bb-sidebar-menu">
            <button
              className={view === "home" ? "active" : ""}
              onClick={() => goToView("home")}
            >
              <span>🏠</span>
              <span>Home</span>
              <span className="bb-menu-arrow">›</span>
            </button>

            <button
              className={view === "items" ? "active" : ""}
              onClick={() => goToView("items")}
            >
              <span>🛍️</span>
              <span>Items</span>
              <span className="bb-menu-arrow">›</span>
            </button>

            {view === "items" && (
              <div className="bb-sidebar-categories">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    className={
                      selectedCategory === cat
                        ? "bb-category-btn active"
                        : "bb-category-btn"
                    }
                    onClick={() => setSelectedCategory(cat)}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            )}

            <button
              className={view === "cart" ? "active" : ""}
              onClick={() => goToView("cart")}
            >
              <span>🛒</span>
              <span>
                Cart{(cartCount ?? bulkCart.length) > 0
                  ? ` (${cartCount ?? bulkCart.length})`
                  : ""}
              </span>
              <span className="bb-menu-arrow">›</span>
            </button>

            <button
              className={view === "checkout" ? "active" : ""}
              onClick={() => goToView("checkout")}
            >
              <span>💳</span>
              <span>Checkout</span>
              <span className="bb-menu-arrow">›</span>
            </button>

            <button
              className={view === "orders" ? "active" : ""}
              onClick={() => goToView("orders")}
            >
              <span>📦</span>
              <span>Orders</span>
              <span className="bb-menu-arrow">›</span>
            </button>
          </div>

          <div className="bb-sidebar-bottom">
            <div className="bb-sidebar-illustration">🏢 🌾</div>
            <strong>Business Buying, Simplified</strong>
            <span>Better Rates • Bigger Quantities</span>
          </div>
        </aside>

        {/* ================= MAIN CONTENT ================= */}

        <main className="bb-main">
          {(view === "home" || view === "items") && (
            <>
              {/* ADDRESS */}
              <div className="bb-address-bar">
                {isEditingAddress ? (
                  <div className="bb-address-edit">
                    <span className="bb-address-icon">📍</span>
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
                    <span className="bb-address-icon">📍</span>
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
                    className="bb-add-address-btn"
                    onClick={() => setIsEditingAddress(true)}
                  >
                    📍 + Add your address
                  </button>
                )}
              </div>

              {/* SEARCH */}
              <div className="bb-search-wrapper">
                <div className="bb-search-container">
                  <input
                    type="text"
                    placeholder="Search Product"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <span>🔍</span>
                </div>

                {searchTerm.trim() && (
                  <div className="bb-search-results">
                    {searchResults.length > 0 ? (
                      searchResults.map((product) => (
                        <div
                          key={product.id}
                          className="bb-search-result-item"
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
                      <div className="bb-no-search-result">
                        No products found
                      </div>
                    )}
                  </div>
                )}
              </div>

              {view === "home" && (
                <>
                  <section className="bb-hero-banner">
                    <img
                      src="https://picsum.photos/seed/bulkbuyer/900/280"
                      alt="Bulk buyer promotion"
                      className="bb-hero-image"
                    />
                  </section>

                  {/* BULK PRICING INFO */}
                  <section className="bb-pricing-info">
                    <h3>Bulk Pricing</h3>
                    <div className="bb-pricing-tiers">
                      <div className="bb-tier">
                        <strong>5–9 kg</strong>
                        <span>No discount</span>
                      </div>
                      <div className="bb-tier">
                        <strong>10–19 kg</strong>
                        <span>5% OFF</span>
                      </div>
                      <div className="bb-tier">
                        <strong>20–49 kg</strong>
                        <span>10% OFF</span>
                      </div>
                      <div className="bb-tier">
                        <strong>50–99 kg</strong>
                        <span>15% OFF</span>
                      </div>
                      <div className="bb-tier">
                        <strong>100+ kg</strong>
                        <span>20% OFF</span>
                      </div>
                    </div>
                  </section>
                </>
              )}

              <h2>New Products</h2>
              <div className="bb-product-grid">
                {filteredNewProducts.map(renderProductCard)}
              </div>

              <h2>All Items</h2>
              <div className="bb-product-grid">
                {filteredProducts.length > 0 ? (
                  filteredProducts.map(renderProductCard)
                ) : (
                  <p>No products found.</p>
                )}
              </div>
            </>
          )}

          {/* ================= CART VIEW ================= */}
          {view === "cart" && (
            <section className="bb-cart-view">
              <h2>Bulk Cart</h2>

              {bulkCart.length === 0 ? (
                <p className="bb-empty-state">
                  Your bulk cart is empty. Add products with at least 5 kg to
                  get started.
                </p>
              ) : (
                <>
                  <div className="bb-cart-list">
                    {bulkCart.map((item) => {
                      const discount = getBulkDiscount(item.quantity);
                      const base = item.price * item.quantity;
                      const discountAmount = calculateDiscountAmount(
                        item.price,
                        item.quantity
                      );
                      const final = calculateFinalPrice(
                        item.price,
                        item.quantity
                      );

                      return (
                        <div className="bb-cart-item" key={item.id}>
                          <div className="bb-cart-item-main">
                            <strong>{item.name}</strong>
                            <span>₹{item.price}/kg</span>
                          </div>

                          <div className="bb-qty-controls">
                            <button
                              type="button"
                              disabled={item.quantity <= MIN_BULK_QTY}
                              onClick={() =>
                                updateCartQuantity(
                                  item.id,
                                  item.quantity - QTY_STEP
                                )
                              }
                            >
                              −
                            </button>
                            <span className="bb-qty-value">
                              {item.quantity} kg
                            </span>
                            <button
                              type="button"
                              onClick={() =>
                                updateCartQuantity(
                                  item.id,
                                  item.quantity + QTY_STEP
                                )
                              }
                            >
                              +
                            </button>
                          </div>

                          <div className="bb-cart-item-pricing">
                            {discount > 0 && (
                              <span className="bb-discount-badge">
                                {discount}% OFF
                              </span>
                            )}
                            <span>Base: ₹{base}</span>
                            {discount > 0 && (
                              <span className="bb-discount-value">
                                Discount: -₹{discountAmount.toFixed(0)}
                              </span>
                            )}
                            <strong>Final: ₹{final.toFixed(0)}</strong>
                          </div>

                          <button
                            className="bb-remove-btn"
                            onClick={() => removeCartItem(item.id)}
                          >
                            Remove
                          </button>
                        </div>
                      );
                    })}
                  </div>

                  <div className="bb-cart-summary">
                    <div>
                      <span>Total Quantity</span>
                      <strong>{cartTotalQuantity} kg</strong>
                    </div>
                    <div>
                      <span>Total Amount</span>
                      <strong>₹{cartFinalTotal.toFixed(0)}</strong>
                    </div>
                  </div>

                  <button
                    className="bb-checkout-btn"
                    onClick={() => goToView("checkout")}
                  >
                    Proceed to Checkout
                  </button>
                </>
              )}
            </section>
          )}

          {/* ================= CHECKOUT VIEW ================= */}
          {view === "checkout" && (
            <section className="bb-checkout-view">
              <h2>Checkout</h2>

              {orderPlaced ? (
                <p className="bb-empty-state">
                  Your bulk order has been placed successfully.
                </p>
              ) : bulkCart.length === 0 ? (
                <p className="bb-empty-state">
                  Your bulk cart is empty. Add products before checking out.
                </p>
              ) : (
                <>
                  <table className="bb-order-table">
                    <thead>
                      <tr>
                        <th>Product</th>
                        <th>Quantity</th>
                        <th>Price/kg</th>
                        <th>Discount</th>
                        <th>Final Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bulkCart.map((item) => (
                        <tr key={item.id}>
                          <td>{item.name}</td>
                          <td>{item.quantity} kg</td>
                          <td>₹{item.price}</td>
                          <td>{getBulkDiscount(item.quantity)}%</td>
                          <td>
                            ₹
                            {calculateFinalPrice(
                              item.price,
                              item.quantity
                            ).toFixed(0)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  <div className="bb-checkout-summary">
                    <div>
                      <span>Total Quantity</span>
                      <strong>{cartTotalQuantity} kg</strong>
                    </div>
                    <div>
                      <span>Subtotal</span>
                      <strong>₹{cartSubtotal.toFixed(0)}</strong>
                    </div>
                    <div>
                      <span>Total Discount</span>
                      <strong>-₹{cartTotalDiscount.toFixed(0)}</strong>
                    </div>
                    <div className="bb-checkout-final">
                      <span>Final Amount</span>
                      <strong>₹{cartFinalTotal.toFixed(0)}</strong>
                    </div>
                  </div>

                  <p className="bb-checkout-note">
                    Bulk pricing is automatically applied based on quantity.
                  </p>

                  {checkoutError && (
                    <p className="bb-checkout-error">{checkoutError}</p>
                  )}

                  <button
                    className="bb-checkout-btn"
                    onClick={handlePlaceOrder}
                  >
                    Place Bulk Order
                  </button>
                </>
              )}
            </section>
          )}

          {/* ================= ORDERS VIEW (placeholder) ================= */}
          {view === "orders" && (
            <section className="bb-orders-view">
              <h2>Orders</h2>
              <p className="bb-empty-state">
                Order history will appear here once orders are placed. This
                is placeholder UI — no backend order data is connected yet.
              </p>
            </section>
          )}
        </main>
      </div>

      {/* ================= PRODUCT DETAIL MODAL ================= */}

      {selectedProduct && (
        <div
          className="bb-product-detail-overlay"
          onClick={() => setSelectedProduct(null)}
        >
          <div
            className="bb-product-detail-card"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="bb-close-detail"
              onClick={() => setSelectedProduct(null)}
            >
              ✕
            </button>

            <div className="bb-product-detail-image">X</div>

            <h2>{selectedProduct.name}</h2>
            <p className="bb-detail-category">{selectedProduct.category}</p>
            <p className="bb-detail-price">₹{selectedProduct.price}/kg</p>
            <p className="bb-detail-min">Minimum order: 5 kg</p>

            {renderQuantitySelector(selectedProduct.id)}
            {renderPricingBreakdown(selectedProduct)}

            <button
              className="bb-detail-cart-button"
              onClick={() => {
                handleAddToBulkCart(
                  selectedProduct,
                  getQuantity(selectedProduct.id)
                );
                setSelectedProduct(null);
              }}
            >
              Add to Bulk Cart
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default BulkBuyerPage;
export { getBulkDiscount, calculateDiscountAmount, calculateFinalPrice };