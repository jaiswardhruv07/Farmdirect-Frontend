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
const QTY_STEP = 1;

function PaymentPage({ cart = [], onNavigate, onPlaceOrder, savedAddress = "" }) {
  const [address, setAddress] = useState(
    savedAddress || localStorage.getItem("kb_saved_address") || ""
  );
  const [coupon, setCoupon] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [addressSaved, setAddressSaved] = useState(false);

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  );

  const discount = cart.reduce((sum, item) => {
    const quantity = item.quantity || 1;
    const percent = getBulkDiscount(quantity);
    return sum + (item.price * quantity * percent) / 100;
  }, 0);

  const total = subtotal - discount;

  function handleSaveAddress() {
    if (!address.trim()) return;
    localStorage.setItem("kb_saved_address", address.trim());
    setAddress(address.trim());
    setAddressSaved(true);
  }

  function handlePlaceOrder() {
    if (!address.trim()) {
      alert("Please enter your delivery address.");
      return;
    }

    if (!paymentMethod) {
      alert("Please select a payment method.");
      return;
    }

    onPlaceOrder?.({
      address: address.trim(),
      coupon: coupon.trim(),
      paymentMethod,
    });
  }

  return (
    <div className="payment-page">
      <header className="payment-navbar">
        <button type="button" onClick={() => onNavigate?.("cart")}>
          ← Back to Cart
        </button>
        <h2>Payment</h2>
      </header>

      <section className="payment-section">
        <h3>📍 Delivery Address</h3>
        <textarea
          placeholder="Enter your delivery address"
          value={address}
          onChange={(e) => {
            setAddress(e.target.value);
            setAddressSaved(false);
          }}
        />
        <button
          type="button"
          className="save-address-btn"
          onClick={handleSaveAddress}
        >
          {addressSaved ? "Address Saved ✓" : "Save Address"}
        </button>
      </section>

      <section className="payment-section">
        <h3>🏷️ Discount / Coupon</h3>
        <div className="coupon-box">
          <input
            type="text"
            placeholder="Enter coupon code"
            value={coupon}
            onChange={(e) => setCoupon(e.target.value)}
          />
          <button
            type="button"
            onClick={() =>
              alert(
                coupon.trim()
                  ? `Coupon ${coupon.trim()} added for review.`
                  : "Please enter a coupon code."
              )
            }
          >
            Apply
          </button>
        </div>
      </section>

      <section className="payment-section">
        <h3>🛒 Order Summary</h3>
        <div className="order-items">
          {cart.map((item) => {
            const quantity = item.quantity || 1;
            const itemSubtotal = item.price * quantity;
            const percent = getBulkDiscount(quantity);
            const itemTotal =
              itemSubtotal - (itemSubtotal * percent) / 100;

            return (
              <div className="order-item" key={item.id}>
                <span>
                  {item.name} × {quantity} kg
                </span>
                <span>₹{itemTotal.toFixed(0)}</span>
              </div>
            );
          })}
        </div>

        <div className="payment-breakdown">
          <div>
            <span>Subtotal</span>
            <strong>₹{subtotal.toFixed(0)}</strong>
          </div>
          <div>
            <span>Bulk Discount</span>
            <strong>-₹{discount.toFixed(0)}</strong>
          </div>
        </div>

        <div className="order-total">
          <span>Total Amount</span>
          <span>₹{total.toFixed(0)}</span>
        </div>
      </section>

      <section className="payment-section">
        <h3>💳 Payment Method</h3>

        <label className="payment-option">
          <input
            type="radio"
            name="payment"
            value="upi"
            checked={paymentMethod === "upi"}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          <span>UPI</span>
        </label>

        <label className="payment-option">
          <input
            type="radio"
            name="payment"
            value="card"
            checked={paymentMethod === "card"}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          <span>Credit / Debit Card</span>
        </label>

        <label className="payment-option">
          <input
            type="radio"
            name="payment"
            value="cod"
            checked={paymentMethod === "cod"}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          <span>Cash on Delivery</span>
        </label>
      </section>

      <button
        type="button"
        className="place-order-btn"
        onClick={handlePlaceOrder}
      >
        Place Order • ₹{total.toFixed(0)}
      </button>
    </div>
  );
}

function BulkBuyerPage({
  onNavigate,
  onAddToCart,
  cartCount,
  user,
  onProfile,
  onLogout,
}) {
  const [address, setAddress] = useState("");
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [addressInput, setAddressInput] = useState("");

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const [view, setView] = useState("home");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const [quantities, setQuantities] = useState({});
  const [bulkCart, setBulkCart] = useState([]);
  const [checkoutError, setCheckoutError] = useState("");
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orders, setOrders] = useState([]);
  const [footerPanel, setFooterPanel] = useState(null);
  const [cartNotification, setCartNotification] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("kb_saved_address");
    if (saved) {
      setAddress(saved);
    }
  }, []);

  const farmers = [
    {
      id: "F001",
      name: "Ramesh Kumar",
      region: "West Bengal",
      image: "/farmer-images/F001/farmer.jpg",
    },
    {
      id: "F002",
      name: "Sita Ram",
      region: "Bihar",
      image: "/farmer-images/F002/farmer.jpg",
    },
    {
      id: "F003",
      name: "Mohan Lal",
      region: "Uttar Pradesh",
      image: "/farmer-images/F003/farmer.jpg",
    },
    {
      id: "F004",
      name: "Sunita Devi",
      region: "Jharkhand",
      image: "/farmer-images/F004/farmer.jpg",
    },
    {
      id: "F005",
      name: "Hari Singh",
      region: "Punjab",
      image: "/farmer-images/F005/farmer.jpg",
    },
  ];

  const productCatalog = [
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
    { id: 101, name: "Fresh Spinach", category: "Vegetables", price: 35 },
    { id: 102, name: "Fresh Strawberry", category: "Fruits", price: 150 },
    { id: 103, name: "Fresh Butter", category: "Dairy", price: 110 },
  ];

  const products = productCatalog.map((product) => ({
    ...product,
    farmerListings: farmers.map((farmer, index) => ({
      id: `${product.id}-${farmer.id}`,
      productId: product.id,
      farmerId: farmer.id,
      farmer: farmer.name,
      region: farmer.region,
      price: product.price + (index - 2) * 2,
      stock: 40 + ((product.id + index * 7) % 45),

      // Product image uploaded by each farmer for this product.
      productImage: `/farmer-images/${farmer.id}/${product.id}.jpg`,

      // Farmer profile image uploaded by the farmer.
      farmerImage: farmer.image,
    })),
  }));

  const newProducts = products.filter((product) =>
    [101, 102, 103].includes(product.id)
  );

  const categories = [
    "All",
    ...Array.from(new Set(products.map((p) => p.category))),
  ];

  const searchResults = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === "All" ||
      product.category === selectedCategory;
    return matchesCategory;
  });

  const filteredNewProducts = newProducts.filter((product) => {
    const matchesCategory =
      selectedCategory === "All" ||
      product.category === selectedCategory;
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
    setQuantities((prev) => ({
      ...prev,
      [productId]: clamped,
    }));
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
    onNavigate?.(nextView);
  }

  function handleAddToBulkCart(product, quantity) {
    if (quantity < MIN_BULK_QTY) return;

    setBulkCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);

      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + quantity,
              }
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
          farmer: product.farmer,
          farmerId: product.farmerId,
          region: product.region,
          farmerImage: product.farmerImage,
          productImage: product.productImage,
        },
      ];
    });

    onAddToCart?.({
      ...product,
      quantity,
      discountPercent: getBulkDiscount(quantity),
      finalPrice: calculateFinalPrice(product.price, quantity),
    });

    setCartNotification(`✓ ${product.name} added to cart`);
    window.clearTimeout(window.__bbCartNotificationTimer);

    window.__bbCartNotificationTimer = window.setTimeout(() => {
      setCartNotification("");
    }, 2200);
  }

  function updateCartQuantity(productId, quantity) {
    const clamped = Math.max(MIN_BULK_QTY, quantity);

    setBulkCart((prev) =>
      prev.map((item) =>
        item.id === productId
          ? { ...item, quantity: clamped }
          : item
      )
    );
  }

  function removeCartItem(productId) {
    setBulkCart((prev) =>
      prev.filter((item) => item.id !== productId)
    );
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
    (sum, item) =>
      sum + calculateDiscountAmount(item.price, item.quantity),
    0
  );

  const cartFinalTotal = bulkCart.reduce(
    (sum, item) =>
      sum + calculateFinalPrice(item.price, item.quantity),
    0
  );

  function handlePlaceOrder(paymentDetails = {}) {
    const invalidItem = bulkCart.find(
      (item) => item.quantity < MIN_BULK_QTY
    );

    if (bulkCart.length === 0) {
      setCheckoutError("Your bulk cart is empty.");
      goToView("cart");
      return;
    }

    if (invalidItem) {
      setCheckoutError(
        "Each bulk order must contain at least 5 kg per product."
      );
      goToView("cart");
      return;
    }

    const newOrder = {
      id: `BB-${Date.now()}`,
      createdAt: new Date().toLocaleString(),
      items: bulkCart.map((item) => ({ ...item })),
      totalQuantity: cartTotalQuantity,
      subtotal: cartSubtotal,
      discount: cartTotalDiscount,
      total: cartFinalTotal,
      address:
        paymentDetails.address ||
        address ||
        "Not provided",
      coupon: paymentDetails.coupon || "",
      paymentMethod:
        paymentDetails.paymentMethod || "Not selected",
      status: "Order Successful",
    };

    setOrders((prev) => [newOrder, ...prev]);
    setBulkCart([]);
    setCheckoutError("");
    setOrderPlaced(true);
    goToView("orders");
  }

  function renderQuantitySelector(productId) {
    const qty = getQuantity(productId);

    return (
      <div
        className="bb-qty-selector"
        onClick={(e) => e.stopPropagation()}
      >
        <span>Quantity:</span>

        <div className="bb-qty-controls">
          <button
            type="button"
            disabled={qty <= MIN_BULK_QTY}
            onClick={() => decrementQuantity(productId)}
          >
            −
          </button>

          <span className="bb-qty-value">
            {qty} kg
          </span>

          <button
            type="button"
            onClick={() => incrementQuantity(productId)}
          >
            +
          </button>
        </div>

        {qty === MIN_BULK_QTY && (
          <small className="bb-min-note">
            Minimum bulk order is 5 kg.
          </small>
        )}
      </div>
    );
  }

  function renderPricingBreakdown(product) {
    const qty = getQuantity(product.id);
    const discount = getBulkDiscount(qty);
    const base = product.price * qty;
    const discountAmount = calculateDiscountAmount(
      product.price,
      qty
    );
    const final = calculateFinalPrice(
      product.price,
      qty
    );

    return (
      <div
        className="bb-pricing"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bb-pricing-row">
          <span>Base price</span>
          <span>₹{base}</span>
        </div>

        <div className="bb-pricing-row">
          <span>Bulk discount</span>
          <span
            className={
              discount > 0
                ? "bb-discount-value"
                : ""
            }
          >
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
    const lowestPrice = Math.min(
      ...product.farmerListings.map(
        (listing) => listing.price
      )
    );

    return (
      <div
        className="bb-product-card"
        key={product.id}
        onClick={() => setSelectedProduct(product)}
      >
        <div className="bb-cross">
          <img
            src={product.farmerListings[0]?.productImage}
            alt={`${product.name} product`}
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />

          {!product.farmerListings[0]?.productImage && (
            <span>Product Image</span>
          )}
        </div>

        <p className="bb-product-name">
          {product.name}
        </p>

        <small className="bb-product-category">
          {product.category}
        </small>

        <p className="bb-product-price">
          From ₹{lowestPrice}/kg
        </p>

        <div className="bb-farmer-count">
          {product.farmerListings.length} Farmers Available
        </div>

        <button
          className="bb-add-cart-btn"
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setSelectedProduct(product);
          }}
        >
          View Farmers &amp; Prices
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
          <button
            className="bb-user"
            onClick={() =>
              setProfileOpen(!profileOpen)
            }
          >
            <span className="bb-avatar">
              {user?.name
                ?.charAt(0)
                ?.toUpperCase() || "B"}
            </span>

            <span className="bb-user-info">
              <strong>
                {user?.name || "Bulk Buyer"}
              </strong>
              <small>
                {user?.email ||
                  "Bulk Buyer Account"}
              </small>
            </span>

            <span className="bb-user-arrow">
              ▾
            </span>
          </button>

          <button
            type="button"
            className="bb-logout-btn"
            onClick={() => {
              setProfileOpen(false);
              onLogout?.();
            }}
          >
            ↪ Logout
          </button>

          {profileOpen && (
            <div className="bb-profile-panel">
              <div className="bb-profile-avatar">
                {user?.name
                  ?.charAt(0)
                  ?.toUpperCase() || "B"}
              </div>

              <h3>
                {user?.name || "Bulk Buyer"}
              </h3>

              <p className="bb-profile-role">
                Bulk Buyer
              </p>

              <div className="bb-profile-info">
                <div>
                  <span>Email</span>
                  <strong>
                    {user?.email ||
                      "Not available"}
                  </strong>
                </div>

                <div>
                  <span>Delivery Address</span>
                  <strong>
                    {address || "Not added"}
                  </strong>
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
              className={
                view === "home"
                  ? "active"
                  : ""
              }
              onClick={() =>
                goToView("home")
              }
            >
              <span>🏠</span>
              <span>Home</span>
              <span className="bb-menu-arrow">
                ›
              </span>
            </button>

            <button
              className={
                view === "items"
                  ? "active"
                  : ""
              }
              onClick={() =>
                goToView("items")
              }
            >
              <span>🛍️</span>
              <span>Items</span>
              <span className="bb-menu-arrow">
                ›
              </span>
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
                    onClick={() =>
                      setSelectedCategory(cat)
                    }
                  >
                    {cat}
                  </button>
                ))}
              </div>
            )}

            <button
              className={
                view === "cart"
                  ? "active"
                  : ""
              }
              onClick={() =>
                goToView("cart")
              }
            >
              <span>🛒</span>
              <span>
                Cart
                {(cartCount ??
                  bulkCart.length) > 0
                  ? ` (${cartCount ??
                      bulkCart.length})`
                  : ""}
              </span>
              <span className="bb-menu-arrow">
                ›
              </span>
            </button>

            <button
              className={
                view === "orders"
                  ? "active"
                  : ""
              }
              onClick={() =>
                goToView("orders")
              }
            >
              <span>📦</span>
              <span>Orders</span>
              <span className="bb-menu-arrow">
                ›
              </span>
            </button>
          </div>

          <div className="bb-sidebar-bottom">
            <div className="bb-sidebar-illustration">
              🏢 🌾
            </div>
            <strong>
              Business Buying, Simplified
            </strong>
            <span>
              Better Rates • Bigger Quantities
            </span>
          </div>
        </aside>

        {/* ================= MAIN CONTENT ================= */}

        <main className="bb-main">
          {(view === "home" ||
            view === "items") && (
            <>
              {/* ADDRESS */}

              <div className="bb-address-bar">
                {isEditingAddress ? (
                  <div className="bb-address-edit">
                    <span className="bb-address-icon">
                      📍
                    </span>

                    <input
                      type="text"
                      placeholder="Enter your delivery address"
                      value={addressInput}
                      onChange={(e) =>
                        setAddressInput(
                          e.target.value
                        )
                      }
                      autoFocus
                    />

                    <button
                      onClick={
                        handleSaveAddress
                      }
                    >
                      Save
                    </button>

                    <button
                      onClick={() => {
                        setIsEditingAddress(
                          false
                        );
                        setAddressInput("");
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                ) : address ? (
                  <p>
                    <span className="bb-address-icon">
                      📍
                    </span>

                    <span>
                      <strong>
                        Delivering to:
                      </strong>{" "}
                      {address}
                    </span>

                    <button
                      onClick={() => {
                        setAddressInput(
                          address
                        );
                        setIsEditingAddress(
                          true
                        );
                      }}
                    >
                      Change
                    </button>
                  </p>
                ) : (
                  <button
                    className="bb-add-address-btn"
                    onClick={() =>
                      setIsEditingAddress(true)
                    }
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
                    onChange={(e) =>
                      setSearchTerm(
                        e.target.value
                      )
                    }
                  />
                  <span>🔍</span>
                </div>

                {searchTerm.trim() && (
                  <div className="bb-search-results">
                    {searchResults.length > 0 ? (
                      searchResults.map(
                        (product) => (
                          <div
                            key={product.id}
                            className="bb-search-result-item"
                            onClick={() => {
                              setSelectedProduct(
                                product
                              );
                              setSearchTerm("");
                            }}
                          >
                            <span>
                              {product.name}
                            </span>
                            <small>
                              {product.category}
                            </small>
                          </div>
                        )
                      )
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
                      src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1400&q=85"
                      alt="Farm field during harvest season"
                      className="bb-hero-image"
                    />
                  </section>

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
                {filteredNewProducts.map(
                  renderProductCard
                )}
              </div>

              <h2>All Items</h2>

              <div className="bb-product-grid">
                {filteredProducts.length > 0 ? (
                  filteredProducts.map(
                    renderProductCard
                  )
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
                  Your bulk cart is empty. Add
                  products with at least 5 kg to
                  get started.
                </p>
              ) : (
                <>
                  <div className="bb-cart-list">
                    {bulkCart.map((item) => {
                      const discount =
                        getBulkDiscount(
                          item.quantity
                        );

                      const base =
                        item.price *
                        item.quantity;

                      const discountAmount =
                        calculateDiscountAmount(
                          item.price,
                          item.quantity
                        );

                      const final =
                        calculateFinalPrice(
                          item.price,
                          item.quantity
                        );

                      return (
                        <div
                          className="bb-cart-item"
                          key={item.id}
                        >
                          <div className="bb-cart-item-main">
                            <strong>
                              {item.name}
                            </strong>
                            <span>
                              ₹{item.price}/kg
                            </span>
                          </div>

                          <div className="bb-qty-controls">
                            <button
                              type="button"
                              disabled={
                                item.quantity <=
                                MIN_BULK_QTY
                              }
                              onClick={() =>
                                updateCartQuantity(
                                  item.id,
                                  item.quantity -
                                    QTY_STEP
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
                                  item.quantity +
                                    QTY_STEP
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

                            <span>
                              Base: ₹{base}
                            </span>

                            {discount > 0 && (
                              <span className="bb-discount-value">
                                Discount:
                                -₹
                                {discountAmount.toFixed(
                                  0
                                )}
                              </span>
                            )}

                            <strong>
                              Final: ₹
                              {final.toFixed(0)}
                            </strong>
                          </div>

                          <button
                            className="bb-remove-btn"
                            onClick={() =>
                              removeCartItem(
                                item.id
                              )
                            }
                          >
                            Remove
                          </button>
                        </div>
                      );
                    })}
                  </div>

                  <div className="bb-cart-summary">
                    <div>
                      <span>
                        Total Quantity
                      </span>
                      <strong>
                        {cartTotalQuantity} kg
                      </strong>
                    </div>

                    <div>
                      <span>
                        Total Amount
                      </span>
                      <strong>
                        ₹
                        {cartFinalTotal.toFixed(
                          0
                        )}
                      </strong>
                    </div>
                  </div>

                  {checkoutError && (
                    <p className="bb-checkout-error">
                      {checkoutError}
                    </p>
                  )}

                  <button
                    className="bb-place-order-btn"
                    onClick={() => {
                      setCheckoutError("");
                      goToView("payment");
                    }}
                  >
                    Continue to Payment →
                  </button>
                </>
              )}
            </section>
          )}

          {/* ================= PAYMENT VIEW ================= */}

          {view === "payment" && (
            <PaymentPage
              cart={bulkCart}
              onNavigate={goToView}
              onPlaceOrder={handlePlaceOrder}
              savedAddress={address}
            />
          )}

          {/* ================= ORDERS VIEW ================= */}

          {view === "orders" && (
            <section className="bb-orders-view">
              <div className="bb-orders-heading">
                <div>
                  <h2>Orders</h2>
                  <p>
                    Successfully placed bulk
                    orders will appear here.
                  </p>
                </div>

                <span className="bb-orders-count">
                  {orders.length}{" "}
                  {orders.length === 1
                    ? "Order"
                    : "Orders"}
                </span>
              </div>

              {orders.length === 0 ? (
                <p className="bb-empty-state">
                  No orders yet. Add products to
                  your cart and place an order.
                </p>
              ) : (
                <div className="bb-order-history">
                  {orders.map((order) => (
                    <article
                      className="bb-order-card"
                      key={order.id}
                    >
                      <div className="bb-order-card-top">
                        <div>
                          <span className="bb-order-label">
                            Order ID
                          </span>
                          <strong>
                            {order.id}
                          </strong>
                        </div>

                        <span className="bb-order-status">
                          ✓ {order.status}
                        </span>
                      </div>

                      <div className="bb-order-meta">
                        <span>
                          Placed:{" "}
                          {order.createdAt}
                        </span>

                        <span>
                          {order.totalQuantity} kg
                        </span>

                        <strong>
                          ₹
                          {order.total.toFixed(
                            0
                          )}
                        </strong>
                      </div>

                      <div className="bb-order-products">
                        {order.items.map(
                          (item) => (
                            <div
                              className="bb-order-product-row"
                              key={item.id}
                            >
                              <span>
                                <strong>
                                  {item.name}
                                </strong>
                                <small>
                                  {item.category}
                                </small>
                              </span>

                              <span>
                                {item.quantity} kg
                              </span>

                              <strong>
                                ₹
                                {calculateFinalPrice(
                                  item.price,
                                  item.quantity
                                ).toFixed(0)}
                              </strong>
                            </div>
                          )
                        )}
                      </div>

                      <div className="bb-order-total-row">
                        <span>
                          Subtotal ₹
                          {order.subtotal.toFixed(
                            0
                          )}
                        </span>

                        <span>
                          Discount -₹
                          {order.discount.toFixed(
                            0
                          )}
                        </span>

                        <strong>
                          Total ₹
                          {order.total.toFixed(0)}
                        </strong>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </section>
          )}
        </main>
      </div>

      {/* ================= HELP / ABOUT ================= */}

      {footerPanel === "help" && (
        <section className="bb-help-bar">
          <div className="bb-help-content">
            <h3>Help &amp; Support</h3>
            <p>
              Need help with bulk buying,
              delivery, payment, or your order?
            </p>
            <p>
              <strong>Contact Support:</strong>{" "}
              Please use the Kisaan Bazar support
              contact provided by your
              project/admin team.
            </p>
            <p>
              <strong>Bulk Buyer Help:</strong>{" "}
              For quantity and discount questions,
              check the Bulk Pricing section before
              placing your order.
            </p>
          </div>

          <button
            className="bb-help-close"
            onClick={() =>
              setFooterPanel(null)
            }
            aria-label="Close help"
          >
            ✕
          </button>
        </section>
      )}

      {footerPanel === "about" && (
        <section className="bb-about-bar">
          <div className="bb-about-content">
            <h3>About this App</h3>

            <p>
              <strong>Kisaan Bazar</strong> is a
              digital marketplace designed to make
              agricultural buying simpler, more
              transparent, and more accessible.
            </p>

            <p>
              The Bulk Buyer panel helps businesses
              and institutions purchase larger
              quantities while automatically
              applying the available bulk pricing
              discounts.
            </p>

            <div className="bb-about-flow">
              <span>Browse Products</span>
              <span>→</span>
              <span>Choose Quantity</span>
              <span>→</span>
              <span>Get Bulk Discount</span>
              <span>→</span>
              <span>Place Order</span>
            </div>
          </div>

          <button
            className="bb-about-close"
            onClick={() =>
              setFooterPanel(null)
            }
            aria-label="Close about"
          >
            ✕
          </button>
        </section>
      )}

      <footer className="bb-footer">
        <div className="bb-footer-actions">
          <button
            className={`bb-footer-btn ${
              footerPanel === "help"
                ? "active"
                : ""
            }`}
            onClick={() =>
              setFooterPanel(
                footerPanel === "help"
                  ? null
                  : "help"
              )
            }
          >
            Help &amp; Support
          </button>

          <button
            className={`bb-footer-btn ${
              footerPanel === "about"
                ? "active"
                : ""
            }`}
            onClick={() =>
              setFooterPanel(
                footerPanel === "about"
                  ? null
                  : "about"
              )
            }
          >
            About this App
          </button>
        </div>

        <span className="bb-footer-more">
          Kisaan Bazar • Bulk Buyer
        </span>
      </footer>

      {/* ================= PRODUCT DETAIL MODAL ================= */}

      {selectedProduct && (
        <div
          className="bb-product-detail-overlay"
          onClick={() =>
            setSelectedProduct(null)
          }
        >
          <div
            className="bb-product-detail-card"
            onClick={(e) =>
              e.stopPropagation()
            }
          >
            <button
              className="bb-close-detail"
              onClick={() =>
                setSelectedProduct(null)
              }
            >
              ✕
            </button>

            <div className="bb-product-detail-image">
              <img
                src={
                  selectedProduct
                    .farmerListings[0]
                    ?.productImage
                }
                alt={`${selectedProduct.name} product`}
                onError={(e) => {
                  e.currentTarget.style.display =
                    "none";
                }}
              />
            </div>

            <h2>
              {selectedProduct.name}
            </h2>

            <p className="bb-detail-category">
              {selectedProduct.category}
            </p>

            <p className="bb-detail-min">
              Choose a farmer to buy this product
              directly.
            </p>

            <div className="bb-farmer-listings">
              {selectedProduct.farmerListings.map(
                (listing) => {
                  const listingProduct = {
                    ...selectedProduct,
                    id: listing.id,
                    price: listing.price,
                    farmer: listing.farmer,
                    farmerId: listing.farmerId,
                    region: listing.region,
                    stock: listing.stock,
                    farmerImage:
                      listing.farmerImage,
                    productImage:
                      listing.productImage,
                  };

                  const qty = getQuantity(
                    listing.id
                  );

                  return (
                    <div
                      className="bb-farmer-listing"
                      key={listing.id}
                    >
                      {/* FARMER IMAGE */}
                      <div className="bb-farmer-listing-image">
                        <img
                          src={listing.farmerImage}
                          alt={`${listing.farmer} farmer`}
                          onError={(e) => {
                            e.currentTarget.style.display =
                              "none";
                          }}
                        />
                        <span>
                          Farmer Image
                        </span>
                      </div>

                      {/* FARMER DETAILS */}
                      <div className="bb-farmer-listing-info">
                        <strong>
                          {listing.farmer}
                        </strong>
                        <span>
                          {listing.region}
                        </span>
                        <small>
                          {listing.stock} kg
                          available
                        </small>
                      </div>

                      {/* PRICE */}
                      <div className="bb-farmer-listing-price">
                        <strong>
                          ₹{listing.price}/kg
                        </strong>
                        <span>
                          Bulk price by quantity
                        </span>
                      </div>

                      {/* QUANTITY + ADD */}
                      <div className="bb-farmer-listing-actions">
                        <div
                          className="bb-qty-controls"
                          onClick={(e) =>
                            e.stopPropagation()
                          }
                        >
                          <button
                            type="button"
                            disabled={
                              qty <=
                              MIN_BULK_QTY
                            }
                            onClick={() =>
                              decrementQuantity(
                                listing.id
                              )
                            }
                          >
                            −
                          </button>

                          <span className="bb-qty-value">
                            {qty} kg
                          </span>

                          <button
                            type="button"
                            onClick={() =>
                              incrementQuantity(
                                listing.id
                              )
                            }
                          >
                            +
                          </button>
                        </div>

                        <button
                          type="button"
                          className="bb-detail-cart-button"
                          onClick={() => {
                            handleAddToBulkCart(
                              listingProduct,
                              qty
                            );
                            setSelectedProduct(
                              null
                            );
                          }}
                        >
                          Add from{" "}
                          {listing.farmer}
                        </button>
                      </div>
                    </div>
                  );
                }
              )}
            </div>
          </div>
        </div>
      )}

      {cartNotification && (
        <div className="bb-cart-notification">
          {cartNotification}
        </div>
      )}
    </div>
  );
}

export default BulkBuyerPage;
export {
  getBulkDiscount,
  calculateDiscountAmount,
  calculateFinalPrice,
};
