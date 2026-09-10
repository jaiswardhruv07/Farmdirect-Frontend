import React, { useState, useEffect } from "react";

import { useAuth } from "../../context/AuthContext";
// Product images
import tomato from "../../assets/tomato.jpg";
import broccoli from "../../assets/broccoli.jpg";
import potato from "../../assets/potato.jpg";
import apple from "../../assets/apple.jpg";
import banana from "../../assets/banana.jpg";
import mango from "../../assets/mango.jpg";
import rice from "../../assets/rice.jpg";
import wheat from "../../assets/wheat.jpg";
import corn from "../../assets/corn.jpg";
import milk from "../../assets/milk.jpg";
import paneer from "../../assets/paneer.jpg";
import curd from "../../assets/curd.jpg";
import spinach from "../../assets/spinach.jpg";

// Farmer listing images
import tom1 from "../../assets/tom1.jpg";
import tom2 from "../../assets/tom2.jpg";
import tom3 from "../../assets/tom3.jpg";
import tom4 from "../../assets/tom4.jpg";
import tom5 from "../../assets/tom5.jpg";

import boc1 from "../../assets/boc1.jpg";
import boc2 from "../../assets/boc2.jpg";
import boc3 from "../../assets/boc3.jpg";
import boc4 from "../../assets/boc4.jpg";

import po1 from "../../assets/po1.jpg";
import po2 from "../../assets/po2.jpg";
import po3 from "../../assets/po3.jpg";
import po4 from "../../assets/po4.jpg";
import po5 from "../../assets/po5.jpg";

import ap1 from "../../assets/ap1.jpg";
import ap2 from "../../assets/ap2.jpg";
import ap3 from "../../assets/ap3.jpg";
import ap4 from "../../assets/ap4.jpg";
import ap5 from "../../assets/ap5.jpg";

import ba1 from "../../assets/ba1.jpg";
import ba2 from "../../assets/ba2.jpg";
import ba3 from "../../assets/ba3.jpg";
import ba4 from "../../assets/ba4.jpg";

import man1 from "../../assets/man1.jpg";
import man2 from "../../assets/man2.jpg";
import man3 from "../../assets/man3.jpg";
import man4 from "../../assets/man4.jpg";
import man5 from "../../assets/man5.jpg";

import ri1 from "../../assets/ri1.jpg";
import ri2 from "../../assets/ri2.jpg";
import ri3 from "../../assets/ri3.jpg";
import ri4 from "../../assets/ri4.jpg";
import ri5 from "../../assets/ri5.jpg";

import co1 from "../../assets/co1.jpg";
import co2 from "../../assets/co2.jpg";
import co3 from "../../assets/co3.jpg";
import co4 from "../../assets/co4.jpg";
import co5 from "../../assets/co5.jpg";
import co6 from "../../assets/co6.jpg";

import mi1 from "../../assets/mi1.jpg";
import mi2 from "../../assets/mi2.jpg";
import mi3 from "../../assets/mi3.jpg";
import mi4 from "../../assets/mi4.jpg";
import mi5 from "../../assets/mi5.jpg";

import pa1 from "../../assets/pa1.jpg";
import pa2 from "../../assets/pa2.jpg";
import pa3 from "../../assets/pa3.jpg";

import cu1 from "../../assets/cu1.jpg";
import cu2 from "../../assets/cu2.jpg";
import cu3 from "../../assets/cu3.jpg";
import cu4 from "../../assets/cu4.jpg";
import cu5 from "../../assets/cu5.jpg";

import w1 from "../../assets/w1.jpg";
import w2 from "../../assets/w2.jpg";
import w3 from "../../assets/w3.jpg";
import w4 from "../../assets/w4.jpg";

import sp1 from "../../assets/sp1.jpg";
import sp2 from "../../assets/sp2.jpg";
import sp3 from "../../assets/sp3.jpg";
import sp4 from "../../assets/sp4.jpg";

import butter from "../../assets/butter.jpg";
import b1 from "../../assets/b1.jpg";
import b2 from "../../assets/b2.jpg";
import b3 from "../../assets/b3.jpg";
import b4 from "../../assets/b4.jpg";

import stawberry from "../../assets/strawberry.jpg";
import s1 from "../../assets/s1.jpg";
import s2 from "../../assets/s2.jpg";
import s3 from "../../assets/s3.jpg";
import s4 from "../../assets/s4.jpg";
import s5 from "../../assets/s5.jpg";

// Hero carousel images
import farm1 from "../../assets/farm1.jpg";
import farm2 from "../../assets/farm2.jpg";
import farm3 from "../../assets/farm3.jpg";
import farm4 from "../../assets/farm4.jpg";
import farm5 from "../../assets/farm5.jpg";

import logo from "../../assets/less.webp";

function LocationIcon({ className = "address-location-icon" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

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
  const [searchFocused, setSearchFocused] = useState(false);
  const [heroIndex, setHeroIndex] = useState(0);
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
  const [customerReviews, setCustomerReviews] = useState({});
  const [reviewDrafts, setReviewDrafts] = useState({});
  const [farmerQuantities, setFarmerQuantities] = useState({});
  const [cartQuantityOverrides, setCartQuantityOverrides] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("kb_cart_quantity_overrides") || "{}");
    } catch {
      return {};
    }
  });
  const [appliedCoupon, setAppliedCoupon] = useState("");
  const [showProfileEditor, setShowProfileEditor] = useState(false);
  const [profileForm, setProfileForm] = useState({
    firstName: user?.name?.split(" ")[0] || "",
    surname: user?.name?.split(" ").slice(1).join(" ") || "",
    phone: "",
    dob: ""
  });
  const { logout } = useAuth();

  const heroImages = [farm1, farm2, farm3, farm4, farm5];
  const searchSuggestions = ["Tomato", "Potato", "Apple", "Banana", "Mango", "Spinach"];

  useEffect(() => {
    if (!isHome) return undefined;
    const timer = window.setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % heroImages.length);
    }, 4200);
    return () => window.clearInterval(timer);
  }, [isHome]);

  function getFarmerQuantity(listing) {
    const value = Number(farmerQuantities[listing.id]);
    return Number.isFinite(value) && value > 0 ? value : 1;
  }

  function setFarmerQuantity(listingId, value, stock) {
    const numeric = Number(value);
    if (!Number.isFinite(numeric)) return;
    const clamped = Math.max(1, Math.min(Number(stock) || 1, numeric));
    setFarmerQuantities((prev) => ({ ...prev, [listingId]: clamped }));
  }

  function changeFarmerQuantity(listing, delta) {
    setFarmerQuantity(listing.id, getFarmerQuantity(listing) + delta, listing.stock);
  }

  function handleConsumerAddToCart(product, quantity = 1) {
    const safeQuantity = Math.max(1, Number(quantity) || 1);

    // Keep the exact quantity selected on the farmer listing even if the
    // parent cart handler normalizes an item back to quantity 1.
    setCartQuantityOverrides((prev) => ({
      ...prev,
      [product.id]: (Number(prev[product.id]) || 0) + safeQuantity,
    }));

    onAddToCart?.({ ...product, quantity: safeQuantity }, safeQuantity);
    setCartToast(`${product.name} • ${safeQuantity} kg added to cart`);
    window.clearTimeout(window.__kbCartToastTimer);
    window.__kbCartToastTimer = window.setTimeout(() => setCartToast(""), 2200);
  }

  function getCartQuantity(item) {
    const override = Number(cartQuantityOverrides[item.id]);
    return Number.isFinite(override) && override > 0
      ? override
      : Math.max(1, Number(item.quantity) || 1);
  }

  function setCartItemQuantity(itemId, quantity) {
    const safeQuantity = Math.max(1, Number(quantity) || 1);
    setCartQuantityOverrides((prev) => ({ ...prev, [itemId]: safeQuantity }));
    onUpdateQuantity?.(itemId, safeQuantity);
  }

  function removeCartItem(itemId) {
    setCartQuantityOverrides((prev) => {
      const next = { ...prev };
      delete next[itemId];
      return next;
    });
    onRemove?.(itemId);
  }

  useEffect(() => {
    const saved = localStorage.getItem("kb_saved_address");
    if (saved) {
      setAddress(saved);
      setPaymentAddress(saved);
    }

    const savedProfile = localStorage.getItem("kb_consumer_profile");
    if (savedProfile) {
      try {
        setProfileForm((prev) => ({ ...prev, ...JSON.parse(savedProfile) }));
      } catch {
        // Ignore malformed local profile data.
      }
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
      main: tomato,
      farmers: [tom1, tom2, tom3, tom4, tom5]
    },
    2: {
      main: broccoli,
      farmers: [boc1, boc2, boc3, boc4]
    },
    3: {
      main: potato,
      farmers: [po1, po2, po3, po4, po5]
    },
    4: {
      main: apple,
      farmers: [ap1, ap2, ap3, ap4, ap5]
    },
    5: {
      main: banana,
      farmers: [ba1, ba2, ba3, ba4]
    },
    6: {
      main: mango,
      farmers: [man1, man2, man3, man4, man5]
    },
    7: {
      main: rice,
      farmers: [ri1, ri2, ri3, ri4, ri5]
    },
    8: {
      main: wheat,
      farmers: [w1, w2, w3, w4]
    },
    9: {
      main: corn,
      farmers: [co1, co2, co3, co4, co5, co6]
    },
    10: {
      main: milk,
      farmers: [mi1, mi2, mi3, mi4, mi5]
    },
    11: {
      main: paneer,
      farmers: [pa1, pa2, pa3]
    },
    12: {
      main: curd,
      farmers: [cu1, cu2, cu3, cu4, cu5]
    },
    101: {
  main: spinach,
  farmers: [sp1, sp2, sp3, sp4]
},
102: {
  main: stawberry,
  farmers: [s1, s2, s3, s4, s5]
},
103: {
  main: butter,
  farmers: [b1, b2, b3, b4]
},
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
        image,
        rating: [4.8, 4.6, 4.5, 4.7, 4.4][index % 5],
        reviewCount: 12 + ((productId * 3 + index * 5) % 19),
        description: `Fresh ${productName.toLowerCase()} supplied by ${farmer.name}, carefully selected and packed for quality and freshness.`,
        reviews: [
          { name: "Anita Sharma", rating: 5, text: `Very fresh ${productName.toLowerCase()} and good quality.` },
          { name: "Raj Mehta", rating: [4, 5, 4, 5, 4][index % 5], text: "Good packaging, accurate quantity and reliable farmer." }
        ]
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
    (sum, item) => sum + item.price * getCartQuantity(item),
    0
  );

  const cartDiscount = cart.reduce((sum, item) => {
    const quantity = getCartQuantity(item);
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

  const amountBeforeCoupon = Math.max(0, cartSubtotal - cartDiscount);
  const couponDiscount =
    appliedCoupon === "LOVE"
      ? amountBeforeCoupon * 0.5
      : appliedCoupon === "GO-FARM"
        ? amountBeforeCoupon
        : 0;
  const cartTotal = Math.max(0, amountBeforeCoupon - couponDiscount);
  const cartItemCount = cart.reduce(
    (sum, item) => sum + getCartQuantity(item),
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

  function updateConsumerOrderStatus(orderId, nextStatus) {
    setOrders((prev) => prev.map((order) => order.id === orderId ? { ...order, status: nextStatus } : order));
  }

  function submitConsumerReview(orderId, itemId) {
    const key = `${orderId}-${itemId}`;
    const draft = reviewDrafts[key] || {};
    const text = (draft.text || "").trim();
    if (!text) return;
    const reviewData = { rating: Number(draft.rating || 5), text, name: user?.name || "You" };
    setCustomerReviews((prev) => ({ ...prev, [key]: reviewData }));
    setOrders((prev) => prev.map((order) => order.id === orderId ? { ...order, items: order.items.map((item) => item.id === itemId ? { ...item, customerReview: reviewData } : item) } : order));
    setReviewDrafts((prev) => ({ ...prev, [key]: { rating: Number(draft.rating || 5), text: "" } }));
  }

  function applyCoupon() {
    const code = coupon.trim().toUpperCase().replace(/\s+/g, "");

    if (!code) {
      setAppliedCoupon("");
      return;
    }

    if (code === "LOVE") {
      setAppliedCoupon("LOVE");
      setCoupon("LOVE");
      return;
    }

    if (code === "GO-FARM" || code === "GO-FARM") {
      setAppliedCoupon("GO-FARM");
      setCoupon("GO-FARM");
      return;
    }

    setAppliedCoupon("");
    alert("Invalid coupon. Try LOVE or GO-FARM.");
  }

  function saveConsumerProfile() {
    const firstName = profileForm.firstName.trim();
    const surname = profileForm.surname.trim();

    if (!firstName) {
      alert("Please enter your first name.");
      return;
    }

    const nextProfile = {
      firstName,
      surname,
      phone: profileForm.phone.trim(),
      dob: profileForm.dob
    };

    localStorage.setItem("kb_consumer_profile", JSON.stringify(nextProfile));
    setProfileForm(nextProfile);
    setShowProfileEditor(false);
    setProfileOpen(false);
    setCartToast("Profile updated successfully ✓");
    window.clearTimeout(window.__kbCartToastTimer);
    window.__kbCartToastTimer = window.setTimeout(() => setCartToast(""), 2200);
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
      items: cart.map((item) => ({ ...item, quantity: getCartQuantity(item) })),
      totalQuantity: cartItemCount,
      subtotal: cartSubtotal,
      discount: cartDiscount,
      total: cartTotal,
      couponDiscount,
      address: paymentAddress.trim(),
      coupon: appliedCoupon || "",
      paymentMethod,
      status: "Order Placed"
    };

    setOrders((previous) => [newOrder, ...previous]);
    setAddress(paymentAddress.trim());
    localStorage.setItem("kb_saved_address", paymentAddress.trim());

    if (onClearCart) onClearCart();
    else cart.forEach((item) => onRemove?.(item.id));
    setCartQuantityOverrides({});

    setCoupon("");
    setAppliedCoupon("");
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
            src={logo}
            alt="GO-FARM logo"
          />
          <div>
            <strong>
              GO-FARM 
            </strong>
            <small>Consumer Panel</small>
          </div>
        </div>

        <div className="consumer-header-right">
          <button
            className="consumer-user"
            onClick={() => setProfileOpen(!profileOpen)}
          >
            <span className="consumer-avatar">
              {(profileForm.firstName || user?.name || "C").charAt(0).toUpperCase()}
            </span>
            <span className="consumer-user-info">
              <strong>{[profileForm.firstName, profileForm.surname].filter(Boolean).join(" ") || user?.name || "Consumer"}</strong>
              <small>{user?.email || "Consumer Account"}</small>
            </span>
            <span className="consumer-user-arrow">▾</span>
          </button>
          <button
            type="button"
            className="header-logout-btn"
            onClick={logout}
          >
            Logout
          </button>

          {profileOpen && (
            <div className="consumer-profile-panel">
              <div className="consumer-profile-avatar">
                {(profileForm.firstName || user?.name || "C").charAt(0).toUpperCase()}
              </div>
              <h3>{[profileForm.firstName, profileForm.surname].filter(Boolean).join(" ") || user?.name || "Consumer"}</h3>
              <p className="consumer-profile-role">Consumer</p>
              <div className="consumer-profile-info">
                <div>
                  <span>Email</span>
                  <strong>{user?.email || "Not available"}</strong>
                </div>
                <div>
                  <span>Phone</span>
                  <strong>{profileForm.phone || "Not added"}</strong>
                </div>
                <div>
                  <span>Date of Birth</span>
                  <strong>{profileForm.dob || "Not added"}</strong>
                </div>
                <div>
                  <span>Delivery Address</span>
                  <strong>{address || "Not added"}</strong>
                </div>
              </div>
              <button
                type="button"
                className="consumer-profile-action"
                onClick={() => setShowProfileEditor(true)}
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
                    <LocationIcon />
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
                    <LocationIcon />
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
                    <LocationIcon /> <span>+ Add your address</span>
                  </button>
                )}
              </div>

              <div className="search-wrapper">
                <div className="search-container">
                  <input
                    type="text"
                    placeholder="Search Product"
                    value={searchTerm}
                    onFocus={() => setSearchFocused(true)}
                    onBlur={() => window.setTimeout(() => setSearchFocused(false), 140)}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <span>🔍</span>
                </div>

                {(searchFocused || searchTerm.trim()) && (
                  <div
                    className="search-results"
                    onMouseDown={(e) => e.preventDefault()}
                  >
                    {searchTerm.trim() ? (
                      searchResults.length > 0 ? (
                        searchResults.map((product) => (
                          <div
                            key={product.id}
                            className="search-result-item"
                            onClick={() => {
                              setSelectedProduct(product);
                              setSearchTerm("");
                              setSearchFocused(false);
                            }}
                          >
                            <span>{product.name}</span>
                            <small>{product.category}</small>
                          </div>
                        ))
                      ) : (
                        <div className="no-search-result">No products found</div>
                      )
                    ) : (
                      <>
                        <div className="search-suggestion-heading">Popular picks</div>
                        {searchSuggestions.map((name) => (
                          <div
                            key={name}
                            className="search-suggestion-chip"
                            onClick={() => {
                              setSearchTerm(name);
                              setSearchFocused(false);
                            }}
                          >
                            <span>⌕</span>{name}
                          </div>
                        ))}
                      </>
                    )}
                  </div>
                )}
              </div>

              {isHome && (
                <>
                  <section className="hero-banner" aria-label="GO-FARM farm highlights">
                    <img
                      src={heroImages[heroIndex]}
                      alt={`GO-FARM farm highlight ${heroIndex + 1}`}
                      className="hero-image"
                    />
                    <div className="hero-overlay" />
                    <div className="hero-copy">
                      <span className="hero-kicker">FRESH • DIRECT • FARM TO HOME</span>
                      <h3>Fresh from farmers, picked for you.</h3>
                      <p>Discover trusted local produce and shop directly from the farmers who grow it.</p>
                    </div>
                    <button className="hero-arrow hero-prev" type="button" onClick={() => setHeroIndex((heroIndex - 1 + heroImages.length) % heroImages.length)} aria-label="Previous banner">‹</button>
                    <button className="hero-arrow hero-next" type="button" onClick={() => setHeroIndex((heroIndex + 1) % heroImages.length)} aria-label="Next banner">›</button>
                    <div className="hero-dots">
                      {heroImages.map((_, index) => (
                        <button key={index} type="button" className={index === heroIndex ? "active" : ""} onClick={() => setHeroIndex(index)} aria-label={`Show banner ${index + 1}`} />
                      ))}
                    </div>
                  </section>
                  <div className="promo-marquee" aria-label="Offers">
                    <div className="promo-marquee-track">
                      <span>🌾 Fresh farm produce</span><span>✦ Direct farmer prices</span><span>🚚 Reliable doorstep delivery</span><span>✦ New seasonal picks every week</span><span>🌱 Support local farmers</span><span>✦ Fresh farm produce</span><span>🚚 Reliable doorstep delivery</span>
                    </div>
                  </div>
                  <section className="home-ad-rail" aria-label="GO-FARM highlights">
                    <article className="home-ad-card home-ad-card-primary">
                      <span className="home-ad-label">FRESH PICK</span>
                      <strong>Farm-fresh produce, straight to your home.</strong>
                      <small>Browse today's farmer listings →</small>
                    </article>
                    <article className="home-ad-card">
                      <span className="home-ad-icon">✦</span>
                      <div><strong>Direct farmer prices</strong><small>Compare farmers before you buy.</small></div>
                    </article>
                    <article className="home-ad-card">
                      <span className="home-ad-icon">🚚</span>
                      <div><strong>Easy doorstep delivery</strong><small>Simple shopping from local farms.</small></div>
                    </article>
                  </section>
                </>
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
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedProduct(product);
                      }}
                    >
                      View Farmers &amp; Prices
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
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedProduct(product);
                        }}
                      >
                        View Farmers &amp; Prices
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
                                onClick={() => removeCartItem(item.id)}
                                title="Remove item"
                              >
                                ♡ Remove
                              </button>
                            </div>
                            <p className="product-description">
                              {item.farmer
                                ? `${item.farmer} • ${item.region || "Farmer listing"}`
                                : "Fresh product from GO-FARM"}
                            </p>
                            <div className="product-bottom">
                              <div className="item-price">₹{item.price}</div>
                              <div className="quantity-control">
                                <button
                                  type="button"
                                  onClick={() =>
                                    setCartItemQuantity(
                                      item.id,
                                      Math.max(1, getCartQuantity(item) - 1)
                                    )
                                  }
                                >
                                  −
                                </button>
                                <input
                                  className="consumer-qty-input"
                                  type="number"
                                  min="1"
                                  step="1"
                                  value={getCartQuantity(item)}
                                  onChange={(e) => setCartItemQuantity(item.id, Math.max(1, Number(e.target.value) || 1))}
                                />
                                <button
                                  type="button"
                                  onClick={() =>
                                    setCartItemQuantity(item.id, getCartQuantity(item) + 1)
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
                    
                    {couponDiscount > 0 && (
                      <div className="summary-row coupon-summary-row">
                        <span>Discount</span>
                        <span>-₹{couponDiscount.toFixed(0)}</span>
                      </div>
                    )}
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
                <h3><LocationIcon className="delivery-heading-icon" /> Delivery Address</h3>
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
                  <button type="button" onClick={applyCoupon}>
                    Apply Coupon
                  </button>
                </div>
              </section>

              <section className="payment-section">
                <h3>🛒 Order Summary</h3>
                <div className="order-items">
                  {cart.map((item) => {
                    const quantity = getCartQuantity(item);
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
                  
                  {couponDiscount > 0 && (
                    <div className="coupon-total-row">
                      <span>Discount</span>
                      <strong>-₹{couponDiscount.toFixed(0)}</strong>
                    </div>
                  )}
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
                    Track your successful GO-FARM purchases in one place.
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
                          <div className="ordered-product-row consumer-order-product-rich" key={`${order.id}-${item.id}`}>
                            <img src={item.image || item.productImage} alt={item.name} className="consumer-order-product-image" />
                            <div>
                              <strong>{item.name}</strong>
                              <span>{item.farmer ? `${item.farmer} • ${item.region || ""} • ` : ""}{item.quantity || 1} kg × ₹{item.price}</span>
                            </div>
                            <strong>₹{(item.price * (item.quantity || 1)).toFixed(0)}</strong>
                            {order.status === "Shipped" && (() => {
                              const reviewKey = `${order.id}-${item.id}`;
                              const review = customerReviews[reviewKey] || item.customerReview;
                              const draft = reviewDrafts[reviewKey] || { rating: 5, text: "" };
                              return review ? <div className="consumer-review-submitted">★ {review.rating}/5 · {review.text}</div> : (
                                <div className="consumer-review-box">
                                  <div className="consumer-star-rating" aria-label="Rate this item">
                                    {[1,2,3,4,5].map((star) => <button key={star} type="button" className={star <= draft.rating ? "active" : ""} onClick={() => setReviewDrafts((prev) => ({ ...prev, [reviewKey]: { ...draft, rating: star } }))}>★</button>)}
                                  </div>
                                  <input value={draft.text} placeholder="Write a review for this farmer's item" onChange={(e) => setReviewDrafts((prev) => ({ ...prev, [reviewKey]: { ...draft, text: e.target.value } }))} />
                                  <button type="button" onClick={() => submitConsumerReview(order.id, item.id)}>Submit Review</button>
                                </div>
                              );
                            })()}
                          </div>
                        ))}
                      </div>

                      <div className="consumer-order-summary">
                        <div>
                          <span>Subtotal</span>
                          <strong>₹{order.subtotal.toFixed(0)}</strong>
                        </div>
                        <div>
                          <span></span>
                          <strong>-₹{order.discount.toFixed(0)}</strong>
                        </div>
                        {order.couponDiscount > 0 && (
                          <div>
                            <span>Coupon Discount</span>
                            <strong>-₹{order.couponDiscount.toFixed(0)}</strong>
                          </div>
                        )}
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

                      <div className="consumer-order-status-actions">
                        {order.status === "Order Placed" && <button type="button" onClick={() => updateConsumerOrderStatus(order.id, "Shipped")}>Mark as Shipped</button>}
                        {order.status === "Shipped" && <span>✓ Order shipped — you can review the products below.</span>}
                        {order.status === "Delivered" && <span>✓ Delivered</span>}
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </section>
          )}
        </main>
      </div>


      {showProfileEditor && (
        <div className="consumer-profile-overlay" onClick={() => setShowProfileEditor(false)}>
          <div className="consumer-profile-editor" onClick={(e) => e.stopPropagation()}>
            <button type="button" className="profile-editor-close" onClick={() => setShowProfileEditor(false)}>✕</button>
            <div className="profile-editor-heading">
              <div className="profile-editor-icon">👤</div>
              <div>
                <span>MY PROFILE</span>
                <h2>View &amp; Update Profile</h2>
                <p>Keep your personal details up to date for a smoother checkout.</p>
              </div>
            </div>

            <div className="profile-editor-grid">
              <label>
                First Name
                <input
                  type="text"
                  value={profileForm.firstName}
                  onChange={(e) => setProfileForm((prev) => ({ ...prev, firstName: e.target.value }))}
                  placeholder="First name"
                />
              </label>
              <label>
                Surname
                <input
                  type="text"
                  value={profileForm.surname}
                  onChange={(e) => setProfileForm((prev) => ({ ...prev, surname: e.target.value }))}
                  placeholder="Surname"
                />
              </label>
              <label>
                Phone Number
                <input
                  type="tel"
                  value={profileForm.phone}
                  onChange={(e) => setProfileForm((prev) => ({ ...prev, phone: e.target.value.replace(/[^0-9+\- ]/g, "") }))}
                  placeholder="Phone number"
                />
              </label>
              <label>
                Date of Birth
                <input
                  type="date"
                  value={profileForm.dob}
                  onChange={(e) => setProfileForm((prev) => ({ ...prev, dob: e.target.value }))}
                />
              </label>
              <label className="profile-email-field">
                Email Address
                <input type="email" value={user?.email || ""} readOnly />
              </label>
            </div>

            <div className="profile-editor-footer">
              <button type="button" className="profile-cancel-btn" onClick={() => setShowProfileEditor(false)}>Cancel</button>
              <button type="button" className="profile-save-btn" onClick={saveConsumerProfile}>Save Profile ✓</button>
            </div>
          </div>
        </div>
      )}

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
                    <span className="consumer-listing-rating">★ {listing.rating} ({listing.reviewCount} reviews)</span>
                    <p className="consumer-listing-description">{listing.description}</p>
                  </div>

                  <div className="consumer-listing-reviews">
                    {listing.reviews.map((review, idx) => <div key={idx}><strong>{review.name}</strong> · ★ {review.rating}<span>{review.text}</span></div>)}
                  </div>
                  <div className="farmer-listing-price">
                    <strong>₹{listing.price}/kg</strong>
                    <span>Farmer listing</span>
                    <div className="farmer-listing-actions">
                      <div className="farmer-quantity-control">
                        <label htmlFor={`farmer-qty-${listing.id}`}>Quantity (kg)</label>
                        <div className="farmer-quantity-row">
                          <button type="button" onClick={() => changeFarmerQuantity(listing, -1)} disabled={listing.stock <= 0 || getFarmerQuantity(listing) <= 1}>−</button>
                          <input
                            id={`farmer-qty-${listing.id}`}
                            type="number"
                            min="1"
                            max={listing.stock}
                            step="1"
                            value={getFarmerQuantity(listing)}
                            onChange={(e) => setFarmerQuantity(listing.id, e.target.value, listing.stock)}
                          />
                          <button type="button" onClick={() => changeFarmerQuantity(listing, 1)} disabled={listing.stock <= 0 || getFarmerQuantity(listing) >= listing.stock}>+</button>
                        </div>
                      </div>
                      <button
                        type="button"
                        className="farmer-add-cart-btn"
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
                          }, getFarmerQuantity(listing));
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
              <LocationIcon className="help-location-icon" /> <strong>Office:</strong> GO-FARM Office, Andheri East,
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
            <h3>About GO-FARM</h3>
            <p>
              <strong>GO-FARM</strong> is a digital platform that
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
              GO-FARM aims to create a transparent, fair, and efficient
              marketplace where farmers get better value for their hard work and
              consumers get quality products at reasonable prices.
            </p>
            <div className="about-flow">
              <span>Farmer</span>
              <span>→</span>
              <span>GO-FARM</span>
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
