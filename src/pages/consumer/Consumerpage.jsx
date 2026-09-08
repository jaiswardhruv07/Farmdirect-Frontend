import React, { useState, useEffect } from "react";

function ConsumerPage({
  onNavigate,
  onAddToCart,
  cartCount,
  user,
  onProfile,
  cart = [],
  onRemove,
  onUpdateQuantity,
  onClearCart
}) {
  const [address, setAddress] = useState("");
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [addressInput, setAddressInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isHome, setIsHome] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showHelp, setShowHelp] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [consumerView, setConsumerView] = useState("home");
  const [orders, setOrders] = useState([]);
  const [paymentAddress, setPaymentAddress] = useState("");
  const [coupon, setCoupon] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [addressSaved, setAddressSaved] = useState(false);
  const [cartToast, setCartToast] = useState("");

  function handleConsumerAddToCart(product) {
    onAddToCart?.(product);
    setCartToast(`${product.name} added to cart`);
    window.clearTimeout(window.__kbCartToastTimer);
    window.__kbCartToastTimer = window.setTimeout(() => setCartToast(""), 2200);
  }

  useEffect(() => {
    const saved = localStorage.getItem("kb_saved_address");
    if (saved) {
      setAddress(saved);
      setPaymentAddress(saved);
    }
  }, []);

  /*
    FARMER LISTING IMAGE STRUCTURE
    ------------------------------
    Every farmer + product combination has its own image path.

    Example:
      /farmer-images/F001/1.jpg
      /farmer-images/F002/1.jpg
      /farmer-images/F003/1.jpg

    Later the farmer/backend can replace the `image` value with
    the uploaded image URL/path for that exact listing.

    IMPORTANT:
    The product-level `image` below is only the fallback/thumbnail
    used on the product grid. Product Detail uses farmerListings[].image.
  */
  const farmers = [
    { id: "F001", name: "Ramesh Kumar", region: "West Bengal" },
    { id: "F002", name: "Sita Ram", region: "Bihar" },
    { id: "F003", name: "Mohan Lal", region: "Uttar Pradesh" },
    { id: "F004", name: "Sunita Devi", region: "Jharkhand" },
    { id: "F005", name: "Hari Singh", region: "Punjab" }
  ];

  const productImages = {
    1: {
      main: "/src/assets/tomato.jpg",
      farmers: [
        "src/assets/tom1.jpg",
        "src/assets/tom2.jpg",
        "src/assets/tom3.jpg",
        "src/assets/tom4.jpg",
        "src/assets/tom5.jpg"
      ]
    },
    2: {
      main: "src/assets/broccoli.jpg",
      farmers: [
        "src/assets/boc1.jpg",
        "src/assets/boc2.jpg",
        "src/assets/boc3.jpg",
        "src/assets/boc4.jpg"
      ]
    },
    3: {
      main: "src/assets/potato.jpg",
      farmers: [
        "src/assets/po1.jpg",
        "src/assets/po2.jpg",
        "src/assets/po3.jpg",
        "src/assets/po4.jpg",
        "src/assets/po5.jpg"
      ]
    },
    4: {
      main: "src/assets/apple.jpg",
      farmers: [
        "src/assets/ap1.jpg",
        "src/assets/ap2.jpg",
        "src/assets/ap3.jpg",
        "src/assets/ap4.jpg",
        "src/assets/ap5.jpg"
      ]
    },
    5: {
      main: "src/assets/banana.jpg",
      farmers: [
        "src/assets/ba1.jpg",
        "src/assets/ba2.jpg",
        "src/assets/ba3.jpg",
        "src/assets/ba4.jpg"
      ]
    },
    6: {
      main: "src/assets/mango.jpg",
      farmers: [
        "src/assets/man1.jpg",
        "src/assets/man2.jpg",
        "src/assets/man3.jpg",
        "src/assets/man4.jpg",
        "src/assets/man5.jpg"
      ]
    },
    7: {
      main: "src/assets/rice.jpg",
      farmers: [
        "src/assets/ri1.jpg",
        "src/assets/ri2.jpg",
        "src/assets/ri3.jpg",
        "src/assets/ri4.jpg",
        "src/assets/ri5.jpg"
      ]
    },
    8: {
      main: "src/assets/wheat.jpg",
      farmers: [
        "src/assets/wi1.jpg",
        "src/assets/wi2.jpg",
        "src/assets/wi3.jpg",
        "src/assets/wi4.jpg"
      ]
    },
    9: {
      main: "src/assets/corn.jpg",
      farmers: [
        "src/assets/co1.jpg",
        "src/assets/co2.jpg",
        "src/assets/co3.jpg",
        "src/assets/co4.jpg",
        "src/assets/co5.jpg",
        "src/assets/co6.jpg"
      ]
    },
    10: {
      main: "src/assets/milk.jpg",
      farmers: [
        "src/assets/mi1.jpg",
        "src/assets/mi2.jpg",
        "src/assets/mi3.jpg",
        "src/assets/mi4.jpg",
        "src/assets/mi5.jpg"
      ]
    },
    11: {
      main: "src/assets/paneer.jpg",
      farmers: [
        "src/assets/pa1.jpg",
        "src/assets/pa2.jpg",
        "src/assets/pa3.jpg"
      ]
    },
    12: {
      main: "src/assets/curd.jpg",
      farmers: [
        "src/assets/cu1.jpg",
        "src/assets/cu2.jpg",
        "src/assets/cu3.jpg",
        "src/assets/cu4.jpg",
        "src/assets/cu5.jpg"
      ]
    }
  };

  function createFarmerListings(productId, productName, basePrice) {
    const farmerImagePaths = productImages[productId]?.farmers || [];

    return farmerImagePaths.map((image, index) => {
      const farmer = farmers[index % farmers.length];

      return {
        id: `${productId}-${farmer.id}-${index + 1}`,
        productId,
        productName,
        farmerId: farmer.id,
        farmer: farmer.name,
        region: farmer.region,
        price: basePrice + (index - 2) * 2,
        stock: 40 + ((productId + index * 7) % 45),
        image
      };
    });
  }

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
    { id: 12, name: "Curd", category: "Dairy", price: 50 }
  ].map((product) => {
    const farmerListings = createFarmerListings(
      product.id,
      product.name,
      product.price
    );

    return {
      ...product,
      farmerListings,
      image: productImages[product.id]?.main
    };
  });

  const newProducts = [
    { id: 101, name: "Fresh Spinach", category: "Vegetables", price: 35 },
    { id: 102, name: "Fresh Strawberry", category: "Fruits", price: 150 },
    { id: 103, name: "Fresh Butter", category: "Dairy", price: 110 }
  ].map((product) => {
    const farmerListings = createFarmerListings(
      product.id,
      product.name,
      product.price
    );
    return {
      ...product,
      farmerListings,
      image: farmerListings[0]?.image
    };
  });

  const categories = [
    "All",
    ...Array.from(new Set(products.map((p) => p.category)))
  ];

  const searchResults = [...products, ...newProducts].filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredProducts = products.filter(
    (product) =>
      selectedCategory === "All" || product.category === selectedCategory
  );

  const filteredNewProducts = newProducts.filter(
    (product) =>
      selectedCategory === "All" || product.category === selectedCategory
  );

  function handleSaveAddress() {
    if (!addressInput.trim()) return;
    setAddress(addressInput.trim());
    setPaymentAddress(addressInput.trim());
    localStorage.setItem("kb_saved_address", addressInput.trim());
    setIsEditingAddress(false);
  }

  const cartSubtotal = cart.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  );

  const cartDiscount = cart.reduce((sum, item) => {
    const quantity = item.quantity || 1;
    const percent =
      quantity >= 100
        ? 20
        : quantity >= 50
          ? 15
          : quantity >= 20
            ? 10
            : quantity >= 10
              ? 5
              : 0;
    return sum + (item.price * quantity * percent) / 100;
  }, 0);

  const cartTotal = cartSubtotal - cartDiscount;
  const cartItemCount = cart.reduce(
    (sum, item) => sum + (item.quantity || 1),
    0
  );

  function openConsumerView(view) {
    if (view === "payment" && cart.length === 0) {
      setConsumerView("cart");
      return;
    }
    if (view === "payment") {
      setPaymentAddress(
        address || localStorage.getItem("kb_saved_address") || ""
      );
    }
    setConsumerView(view);
  }

  function handlePlaceConsumerOrder() {
    if (!paymentAddress.trim()) {
      alert("Please enter your delivery address.");
      return;
    }
    if (!paymentMethod) {
      alert("Please select a payment method.");
      return;
    }

    const newOrder = {
      id: `CB-${Date.now()}`,
      createdAt: new Date().toLocaleString(),
      items: cart.map((item) => ({ ...item })),
      totalQuantity: cartItemCount,
      subtotal: cartSubtotal,
      discount: cartDiscount,
      total: cartTotal,
      address: paymentAddress.trim(),
      coupon: coupon.trim(),
      paymentMethod,
      status: "Order Successful"
    };

    setOrders((previous) => [newOrder, ...previous]);
    setAddress(paymentAddress.trim());
    localStorage.setItem("kb_saved_address", paymentAddress.trim());

    if (onClearCart) onClearCart();
    else cart.forEach((item) => onRemove?.(item.id));

    setCoupon("");
    setPaymentMethod("");
    setAddressSaved(false);
    setConsumerView("orders");
  }

  function ProductImage({ product, className = "" }) {
    return (
      <div className={className}>
        {product?.image && (
          <img
            src={product.image}
            alt={product?.name || "Product"}
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
        )}
        <span>Product Image</span>
      </div>
    );
  }

  return (
    <div className="consumer-page">
      {cartToast && (
        <div className="consumer-cart-toast" role="status" aria-live="polite">
          ✓ {cartToast}
        </div>
      )}

      <header className="consumer-header">
        <div className="consumer-brand">
          <img
            className="consumer-brand-icon"
            src="/less.webp"
            alt="Kisaan connect logo"
          />
          <div>
            <strong>
              Kisaan <em>Connect</em>
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

      <div className="consumer-layout">
        <aside className="consumer-sidebar">
          <div className="consumer-sidebar-menu">
            <button
              className={isHome ? "active" : ""}
              onClick={() => {
                setIsHome(true);
                setConsumerView("home");
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
                setConsumerView("home");
                setSelectedCategory("All");
                setSearchTerm("");
              }}
            >
              <span>🛍️</span>
              <span>Items</span>
              <span className="consumer-menu-arrow">›</span>
            </button>

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

            <button
              className={consumerView === "cart" ? "active" : ""}
              onClick={() => openConsumerView("cart")}
            >
              <span>🛒</span>
              <span>Cart{cartCount > 0 ? ` (${cartCount})` : ""}</span>
              <span className="consumer-menu-arrow">›</span>
            </button>

            <button
              className={consumerView === "orders" ? "active" : ""}
              onClick={() => setConsumerView("orders")}
            >
              <span>📦</span>
              <span>Orders</span>
              <span className="consumer-menu-arrow">›</span>
            </button>
          </div>

          <div className="consumer-sidebar-bottom">
            <div className="consumer-sidebar-illustration">👨‍🌾 🌾</div>
            <strong>Fresh from Farmers</strong>
            <span>Better Food • Better Farming</span>
          </div>
        </aside>

        <main className="consumer-main">
          {consumerView === "home" && (
            <>
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

              {isHome && (
                <section className="hero-banner">
                  <img
                    src="https://picsum.photos/seed/foodapp/900/280"
                    alt="New launch advertisement"
                    className="hero-image"
                  />
                </section>
              )}

              <h2>New Products</h2>
              <div className="product-grid">
                {filteredNewProducts.map((product) => (
                  <div
                    className="product-card"
                    key={product.id}
                    onClick={() => setSelectedProduct(product)}
                  >
                    <ProductImage
                      product={product}
                      className="product-card-image"
                    />
                    <p>{product.name}</p>
                    <p>
                      From ₹
                      {Math.min(
                        ...product.farmerListings.map((item) => item.price)
                      )}
                      /kg
                    </p>
                    <small>
                      {product.farmerListings.length} farmer listings
                    </small>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleConsumerAddToCart({
                          ...product,
                          ...product.farmerListings[0],
                          id: product.farmerListings[0].id,
                          name: product.name,
                          image: product.farmerListings[0].image
                        });
                      }}
                    >
                      Add to Cart
                    </button>
                  </div>
                ))}
              </div>

              <h2>All Items</h2>
              <div className="product-grid">
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((product) => (
                    <div
                      className="product-card"
                      key={product.id}
                      onClick={() => setSelectedProduct(product)}
                    >
                      <ProductImage
                        product={product}
                        className="product-card-image"
                      />
                      <p>{product.name}</p>
                      <p>
                        From ₹
                        {Math.min(
                          ...product.farmerListings.map((item) => item.price)
                        )}
                        /kg
                      </p>
                      <small>
                        {product.category} • {product.farmerListings.length}{" "}
                        farmer listings
                      </small>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleConsumerAddToCart({
                            ...product,
                            ...product.farmerListings[0],
                            id: product.farmerListings[0].id,
                            name: product.name,
                            image: product.farmerListings[0].image
                          });
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
            </>
          )}

          {consumerView === "cart" && (
            <section className="consumer-inner-view cart-page">
              <div className="cart-navbar">
                <button type="button" onClick={() => setConsumerView("home")}>
                  ← Back to Shopping
                </button>
                <div className="cart-heading">
                  <span className="cart-heading-icon">🛒</span>
                  <div>
                    <h1>Your Cart</h1>
                    <p>Your fresh picks, all in one place</p>
                  </div>
                </div>
              </div>

              {cart.length === 0 ? (
                <div className="empty-cart-section">
                  <div className="empty-cart-icon">🛒</div>
                  <h2>Your Cart is Empty</h2>
                  <p>Looks like you haven't added anything to your cart yet.</p>
                  <button
                    type="button"
                    className="start-shopping-btn"
                    onClick={() => setConsumerView("home")}
                  >
                    Start Shopping →
                  </button>
                </div>
              ) : (
                <div className="cart-content">
                  <div className="cart-items-section">
                    <div className="items-heading">
                      <h2>Shopping Bag</h2>
                      <span>
                        {cart.length} {cart.length === 1 ? "item" : "items"}
                      </span>
                    </div>
                    <div className="cart-items">
                      {cart.map((item) => (
                        <div className="cart-item" key={item.id}>
                          <ProductImage
                            product={item}
                            className="cart-product-image"
                          />
                          <div className="cart-product-details">
                            <div className="product-name-row">
                              <h3>{item.name}</h3>
                              <button
                                type="button"
                                className="remove-btn"
                                onClick={() => onRemove?.(item.id)}
                                title="Remove item"
                              >
                                ♡ Remove
                              </button>
                            </div>
                            <p className="product-description">
                              {item.farmer
                                ? `${item.farmer} • ${item.region || "Farmer listing"}`
                                : "Fresh product from KisaanBazar"}
                            </p>
                            <div className="product-bottom">
                              <div className="item-price">₹{item.price}</div>
                              <div className="quantity-control">
                                <button
                                  type="button"
                                  onClick={() =>
                                    onUpdateQuantity?.(
                                      item.id,
                                      Math.max(1, (item.quantity || 1) - 1)
                                    )
                                  }
                                >
                                  −
                                </button>
                                <span>{item.quantity || 1}</span>
                                <button
                                  type="button"
                                  onClick={() =>
                                    onUpdateQuantity?.(
                                      item.id,
                                      (item.quantity || 1) + 1
                                    )
                                  }
                                >
                                  +
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <aside className="order-summary">
                    <div className="summary-header">
                      <span>🧾</span>
                      <h2>Order Summary</h2>
                    </div>
                    <div className="summary-row">
                      <span>Items</span>
                      <span>{cart.length}</span>
                    </div>
                    <div className="summary-row">
                      <span>Quantity</span>
                      <span>{cartItemCount} kg</span>
                    </div>
                    <div className="summary-row">
                      <span>Subtotal</span>
                      <span>₹{cartSubtotal.toFixed(0)}</span>
                    </div>
                    <div className="summary-row">
                      <span>Bulk Discount</span>
                      <span className="delivery-text">
                        -₹{cartDiscount.toFixed(0)}
                      </span>
                    </div>
                    <div className="summary-divider"></div>
                    <div className="summary-total">
                      <span>Total Amount</span>
                      <strong>₹{cartTotal.toFixed(0)}</strong>
                    </div>
                    <button
                      type="button"
                      className="continue-btn"
                      onClick={() => openConsumerView("payment")}
                    >
                      Continue <span>→</span>
                    </button>
                    <p className="secure-text">
                      🌱 Fresh products • Direct from farmers
                    </p>
                  </aside>
                </div>
              )}
            </section>
          )}

          {consumerView === "payment" && (
            <section className="consumer-inner-view payment-page">
              <header className="payment-navbar">
                <button type="button" onClick={() => setConsumerView("cart")}>
                  ← Back to Cart
                </button>
                <h2>Payment</h2>
              </header>

              <section className="payment-section">
                <h3>📍 Delivery Address</h3>
                <textarea
                  placeholder="Enter your delivery address"
                  value={paymentAddress}
                  onChange={(e) => {
                    setPaymentAddress(e.target.value);
                    setAddressSaved(false);
                  }}
                />
                <button
                  type="button"
                  className="save-address-btn"
                  onClick={() => {
                    if (!paymentAddress.trim()) return;
                    localStorage.setItem(
                      "kb_saved_address",
                      paymentAddress.trim()
                    );
                    setAddress(paymentAddress.trim());
                    setPaymentAddress(paymentAddress.trim());
                    setAddressSaved(true);
                  }}
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
                    const percent =
                      quantity >= 100
                        ? 20
                        : quantity >= 50
                          ? 15
                          : quantity >= 20
                            ? 10
                            : quantity >= 10
                              ? 5
                              : 0;
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
                    <strong>₹{cartSubtotal.toFixed(0)}</strong>
                  </div>
                  <div>
                    <span>Bulk Discount</span>
                    <strong>-₹{cartDiscount.toFixed(0)}</strong>
                  </div>
                </div>
                <div className="order-total">
                  <span>Total Amount</span>
                  <span>₹{cartTotal.toFixed(0)}</span>
                </div>
              </section>

              <section className="payment-section">
                <h3>💳 Payment Method</h3>
                <label className="payment-option">
                  <input
                    type="radio"
                    name="consumer-payment"
                    value="upi"
                    checked={paymentMethod === "upi"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <span>UPI</span>
                </label>
                <label className="payment-option">
                  <input
                    type="radio"
                    name="consumer-payment"
                    value="card"
                    checked={paymentMethod === "card"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <span>Credit / Debit Card</span>
                </label>
                <label className="payment-option">
                  <input
                    type="radio"
                    name="consumer-payment"
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
                onClick={handlePlaceConsumerOrder}
              >
                Place Order • ₹{cartTotal.toFixed(0)}
              </button>
            </section>
          )}

          {consumerView === "orders" && (
            <section className="consumer-inner-view orders-page">
              <div className="orders-header">
                <div>
                  <span className="orders-kicker">CONSUMER ORDERS</span>
                  <h1>My Orders</h1>
                  <p>
                    Track your successful Kisaan connect purchases in one place.
                  </p>
                </div>
                <button
                  type="button"
                  className="orders-shop-btn"
                  onClick={() => setConsumerView("home")}
                >
                  Continue Shopping →
                </button>
              </div>

              {orders.length === 0 ? (
                <div className="orders-empty">
                  <div className="orders-empty-icon">📦</div>
                  <h2>No Orders Yet</h2>
                  <p>Your completed orders will appear here after payment.</p>
                  <button type="button" onClick={() => setConsumerView("home")}>
                    Start Shopping
                  </button>
                </div>
              ) : (
                <div className="orders-list">
                  {orders.map((order) => (
                    <article className="consumer-order-card" key={order.id}>
                      <div className="consumer-order-top">
                        <div>
                          <span className="order-success-badge">
                            ✓ {order.status}
                          </span>
                          <h2>Order #{order.id}</h2>
                          <p>{order.createdAt}</p>
                        </div>
                        <strong className="consumer-order-total">
                          ₹{order.total.toFixed(0)}
                        </strong>
                      </div>

                      <div className="consumer-order-grid">
                        <div className="order-info-box">
                          <span>Order ID</span>
                          <strong>{order.id}</strong>
                        </div>
                        <div className="order-info-box">
                          <span>Date & Time</span>
                          <strong>{order.createdAt}</strong>
                        </div>
                        <div className="order-info-box">
                          <span>Quantity</span>
                          <strong>{order.totalQuantity} kg</strong>
                        </div>
                        <div className="order-info-box">
                          <span>Payment Method</span>
                          <strong>{order.paymentMethod.toUpperCase()}</strong>
                        </div>
                      </div>

                      <div className="ordered-products">
                        <h3>Ordered Products</h3>
                        {order.items.map((item) => (
                          <div
                            className="ordered-product-row"
                            key={`${order.id}-${item.id}`}
                          >
                            <div>
                              <strong>{item.name}</strong>
                              <span>
                                {item.farmer
                                  ? `${item.farmer} • ${item.region || ""} • `
                                  : ""}
                                {item.quantity || 1} kg × ₹{item.price}
                              </span>
                            </div>
                            <strong>
                              ₹{(item.price * (item.quantity || 1)).toFixed(0)}
                            </strong>
                          </div>
                        ))}
                      </div>

                      <div className="consumer-order-summary">
                        <div>
                          <span>Subtotal</span>
                          <strong>₹{order.subtotal.toFixed(0)}</strong>
                        </div>
                        <div>
                          <span>Discount</span>
                          <strong>-₹{order.discount.toFixed(0)}</strong>
                        </div>
                        <div className="order-summary-total">
                          <span>Total</span>
                          <strong>₹{order.total.toFixed(0)}</strong>
                        </div>
                      </div>

                      <div className="consumer-order-details">
                        <div>
                          <span>Delivery Address</span>
                          <strong>{order.address}</strong>
                        </div>
                        <div>
                          <span>Payment Method</span>
                          <strong>
                            {order.paymentMethod === "cod"
                              ? "Cash on Delivery"
                              : order.paymentMethod === "upi"
                                ? "UPI"
                                : "Credit / Debit Card"}
                          </strong>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </section>
          )}
        </main>
      </div>

      {selectedProduct && (
        <div
          className="product-detail-overlay"
          onClick={() => setSelectedProduct(null)}
        >
          <div
            className="product-detail-card farmer-detail-card"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="close-detail"
              onClick={() => setSelectedProduct(null)}
            >
              ✕
            </button>

            <h2>{selectedProduct.name}</h2>
            <p className="detail-category">{selectedProduct.category}</p>

            <div className="farmer-listings">
              {selectedProduct.farmerListings?.map((listing) => (
                <article className="farmer-listing" key={listing.id}>
                  <div className="farmer-listing-image">
                    <img
                      src={listing.image}
                      alt={`${listing.productName} from ${listing.farmer}`}
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                    <span>Product Image</span>
                  </div>

                  <div className="farmer-listing-info">
                    <strong>{listing.farmer}</strong>
                    <span>{listing.region}</span>
                    <small>Stock: {listing.stock} kg</small>
                  </div>

                  <div className="farmer-listing-price">
                    <strong>₹{listing.price}/kg</strong>
                    <span>Farmer listing</span>
                    <div className="farmer-listing-actions">
                      <button
                        type="button"
                        disabled={listing.stock <= 0}
                        onClick={() => {
                          handleConsumerAddToCart({
                            ...selectedProduct,
                            ...listing,
                            id: listing.id,
                            name: selectedProduct.name,
                            category: selectedProduct.category,
                            image: listing.image,
                            farmerId: listing.farmerId,
                            farmer: listing.farmer,
                            region: listing.region,
                            stock: listing.stock,
                            listingId: listing.id,
                            productId: selectedProduct.id
                          });
                          setSelectedProduct(null);
                        }}
                      >
                        {listing.stock > 0 ? "Add to Cart" : "Out of Stock"}
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      )}

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
              📍 <strong>Office:</strong> Kisaan connect Office, Andheri East,
              Mumbai, Maharashtra - 400069
            </p>
          </div>
          <button className="help-close" onClick={() => setShowHelp(false)}>
            ✕
          </button>
        </div>
      )}

      {showAbout && (
        <div className="about-bar">
          <div className="about-content">
            <h3>About Kisaan connect</h3>
            <p>
              <strong>Kisaan connect</strong> is a digital platform that
              directly connects farmers with consumers.
            </p>
            <p>
              Our goal is to reduce the role of unnecessary intermediaries
              (middlemen) in the agricultural supply chain. This helps farmers
              receive a better and fairer price for their produce, while
              consumers can buy fresh agricultural products at more affordable
              prices.
            </p>
            <p>
              Kisaan connect aims to create a transparent, fair, and efficient
              marketplace where farmers get better value for their hard work and
              consumers get quality products at reasonable prices.
            </p>
            <div className="about-flow">
              <span>Farmer</span>
              <span>→</span>
              <span>Kisaan connect</span>
              <span>→</span>
              <span>Consumer</span>
            </div>
          </div>
          <button className="about-close" onClick={() => setShowAbout(false)}>
            ✕
          </button>
        </div>
      )}

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
