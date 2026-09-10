import React, { useState, useEffect } from "react";
import "./bulkbuyer.css";
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
import butter from "../../assets/butter.jpg";
import stawberry from "../../assets/strawberry.jpg";

// Hero carousel images
import farm1 from "../../assets/farm1.jpg";
import farm2 from "../../assets/farm2.jpg";
import farm3 from "../../assets/farm3.jpg";
import farm4 from "../../assets/farm4.jpg";
import farm5 from "../../assets/farm5.jpg";

// Farmer product images — same mapping as Consumer page
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

import b1 from "../../assets/b1.jpg";
import b2 from "../../assets/b2.jpg";
import b3 from "../../assets/b3.jpg";
import b4 from "../../assets/b4.jpg";

import s1 from "../../assets/s1.jpg";
import s2 from "../../assets/s2.jpg";
import s3 from "../../assets/s3.jpg";
import s4 from "../../assets/s4.jpg";
import s5 from "../../assets/s5.jpg";

import logo from "../../assets/less.webp";

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

// Bulk pricing: larger fresh-produce orders commonly land around 10–15% below retail/normal unit pricing, so the discount ramps with quantity.
function getBulkDiscount(quantity) {
  if (quantity >= 1000) return 40;
  if (quantity >= 500) return 30;
  if (quantity >= 250) return 25;
  if (quantity >= 100) return 20;
  return 0;
}

function getBulkPricePerKg(price, quantity) {
  return price * (1 - getBulkDiscount(quantity) / 100);
}

function calculateDiscountAmount(price, quantity) {
  return price * quantity * (getBulkDiscount(quantity) / 100);
}

function calculateFinalPrice(price, quantity) {
  return getBulkPricePerKg(price, quantity) * quantity;
}

const MIN_BULK_QTY = 100;
const QTY_STEP = 1;

function PaymentPage({ cart = [], onNavigate, onPlaceOrder, savedAddress = "" }) {
  const [address, setAddress] = useState(
    savedAddress || localStorage.getItem("kb_saved_address") || ""
  );
  const [coupon, setCoupon] = useState("");
  const [couponMessage, setCouponMessage] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState("");
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

  const bulkTotal = Math.max(0, subtotal - discount);
  const couponCode = appliedCoupon.toUpperCase();
  const couponDiscount = couponCode === "KISAANCONNECT" ? bulkTotal : couponCode === "LOVE" ? bulkTotal * 0.5 : 0;
  const total = Math.max(0, bulkTotal - couponDiscount);

  function handleSaveAddress() {
    if (!address.trim()) return;
    localStorage.setItem("kb_saved_address", address.trim());
    setAddress(address.trim());
    setAddressSaved(true);
  }

  function applyCoupon() {
    const code = coupon.trim().toUpperCase();
    if (!code) {
      setAppliedCoupon("");
      setCouponMessage("Please enter a coupon code.");
      return;
    }
    if (code === "LOVE") {
      setAppliedCoupon("LOVE");
      setCouponMessage("LOVE applied — 50% OFF ✓");
      return;
    }
    if (code === "KISAANCONNECT") {
      setAppliedCoupon("KISAANCONNECT");
      setCouponMessage("KISAANCONNECT applied — your order is FREE ✓");
      return;
    }
    setAppliedCoupon("");
    setCouponMessage("Invalid coupon. Try LOVE or KISAANCONNECT.");
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
        <h3><span className="payment-heading-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9"><path d="M12 21s7-6.2 7-12A7 7 0 0 0 5 9c0 5.8 7 12 7 12Z"/><circle cx="12" cy="9" r="2.4"/></svg></span> Delivery Address</h3>
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
          <button type="button" onClick={applyCoupon}>Apply</button>
        </div>
        {couponMessage && <p className={`coupon-message ${appliedCoupon ? "success" : "error"}`}>{couponMessage}</p>}
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
          {appliedCoupon && (
            <div>
              <span>{appliedCoupon} Coupon</span>
              <strong>-₹{couponDiscount.toFixed(0)}</strong>
            </div>
          )}
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
  const { logout } = useAuth();

  const [address, setAddress] = useState("");
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [addressInput, setAddressInput] = useState("");

  const [searchTerm, setSearchTerm] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const [heroIndex, setHeroIndex] = useState(0);
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

  const heroImages = [farm1, farm2, farm3, farm4, farm5];

  useEffect(() => {
    if (view !== "home") return undefined;

    const timer = window.setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % heroImages.length);
    }, 4200);

    return () => window.clearInterval(timer);
  }, [view, heroImages.length]);

  const searchSuggestions = ["Tomato", "Potato", "Apple", "Banana", "Mango", "Spinach"];
  const [cartNotification, setCartNotification] = useState("");
  const [customerReviews, setCustomerReviews] = useState({});
  const [reviewDrafts, setReviewDrafts] = useState({});
  const [cartQuantityDrafts, setCartQuantityDrafts] = useState({});
  const [showProfileEditor, setShowProfileEditor] = useState(false);
  const [profileForm, setProfileForm] = useState({
    firstName: user?.name?.split(" ")[0] || "",
    surname: user?.name?.split(" ").slice(1).join(" ") || "",
    phone: "",
    dob: ""
  });

  useEffect(() => {
    const saved = localStorage.getItem("kb_saved_address");
    if (saved) {
      setAddress(saved);
    }
    const savedProfile = localStorage.getItem("kb_bulkbuyer_profile");
    if (savedProfile) {
      try {
        setProfileForm((prev) => ({ ...prev, ...JSON.parse(savedProfile) }));
      } catch {}
    }
  }, []);

  const productImages = {
    1: { main: tomato, farmers: [tom1, tom2, tom3, tom4, tom5] },
    2: { main: broccoli, farmers: [boc1, boc2, boc3, boc4] },
    3: { main: potato, farmers: [po1, po2, po3, po4, po5] },
    4: { main: apple, farmers: [ap1, ap2, ap3, ap4, ap5] },
    5: { main: banana, farmers: [ba1, ba2, ba3, ba4] },
    6: { main: mango, farmers: [man1, man2, man3, man4, man5] },
    7: { main: rice, farmers: [ri1, ri2, ri3, ri4, ri5] },
    8: { main: wheat, farmers: [w1, w2, w3, w4] },
    9: { main: corn, farmers: [co1, co2, co3, co4, co5, co6] },
    10: { main: milk, farmers: [mi1, mi2, mi3, mi4, mi5] },
    11: { main: paneer, farmers: [pa1, pa2, pa3] },
    12: { main: curd, farmers: [cu1, cu2, cu3, cu4, cu5] },
    101: { main: spinach, farmers: [sp1, sp2, sp3, sp4] },
    102: { main: stawberry, farmers: [s1, s2, s3, s4, s5] },
    103: { main: butter, farmers: [b1, b2, b3, b4] },
  };

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
    image: productImages[product.id]?.main,
    farmerListings: farmers.map((farmer, index) => ({
      id: `${product.id}-${farmer.id}`,
      productId: product.id,
      farmerId: farmer.id,
      farmer: farmer.name,
      region: farmer.region,
      price: product.price + (index - 2) * 2,
      marketPrice: (product.price + (index - 2) * 2) / 0.92,
      stock: 250 + ((product.id * 13 + index * 37) % 751),

      // Product image for this farmer listing — same image mapping as Consumer.
      productImage:
        productImages[product.id]?.farmers?.[index] ||
        productImages[product.id]?.main,

      // Farmer listing image — same farmer-wise image mapping as Consumer page.
      // These are the images shown in the farmer list after clicking a product.
      farmerImage:
        productImages[product.id]?.farmers?.[index] ||
        productImages[product.id]?.main,
      rating: [4.8, 4.6, 4.5, 4.7, 4.4][index % 5],
      reviewCount: 12 + ((product.id * 3 + index * 5) % 19),
      description: `Fresh ${product.name.toLowerCase()} supplied by ${farmer.name}, carefully selected and packed for quality and freshness.`,
      reviews: [
        { name: "Anita Sharma", rating: 5, text: `Very fresh ${product.name.toLowerCase()} and good quality.` },
        { name: "Raj Mehta", rating: [4, 5, 4, 5, 4][index % 5], text: "Good packaging, accurate quantity and reliable farmer." }
      ],
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

  function saveBulkBuyerProfile() {
    const firstName = profileForm.firstName.trim();
    const surname = profileForm.surname.trim();
    if (!firstName) {
      alert("Please enter your first name.");
      return;
    }
    const nextProfile = { firstName, surname, phone: profileForm.phone.trim(), dob: profileForm.dob };
    localStorage.setItem("kb_bulkbuyer_profile", JSON.stringify(nextProfile));
    setProfileForm(nextProfile);
    setShowProfileEditor(false);
    setProfileOpen(false);
    setCartNotification("Profile updated successfully ✓");
    window.clearTimeout(window.__bbCartNotificationTimer);
    window.__bbCartNotificationTimer = window.setTimeout(() => setCartNotification(""), 2200);
  }

  function getQuantity(productId) {
    return quantities[productId] ?? MIN_BULK_QTY;
  }

  function setQuantity(productId, value) {
    const numeric = Number(value);
    const safeValue = Number.isFinite(numeric) ? numeric : MIN_BULK_QTY;
    const clamped = Math.max(MIN_BULK_QTY, Math.round(safeValue * 100) / 100);
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

  function updateOrderStatus(orderId, nextStatus) {
    setOrders((prev) => prev.map((order) => order.id === orderId ? { ...order, status: nextStatus } : order));
  }

  function submitCustomerReview(orderId, itemId) {
    const key = `${orderId}-${itemId}`;
    const draft = reviewDrafts[key] || {};
    const text = (draft.text || "").trim();
    if (!text) return;
    const reviewData = { rating: Number(draft.rating || 5), text, name: user?.name || "You" };
    setCustomerReviews((prev) => ({ ...prev, [key]: reviewData }));
    setOrders((prev) => prev.map((order) => order.id === orderId ? { ...order, items: order.items.map((item) => item.id === itemId ? { ...item, customerReview: reviewData } : item) } : order));
    setReviewDrafts((prev) => ({ ...prev, [key]: { rating: Number(draft.rating || 5), text: "" } }));
  }

  function handleAddToBulkCart(product, quantity) {
    const numericQuantity = Number(quantity);
    if (!Number.isFinite(numericQuantity) || numericQuantity < MIN_BULK_QTY) {
      setCartNotification(`Minimum bulk quantity is ${MIN_BULK_QTY} kg`);
      return;
    }

    setBulkCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);

      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + numericQuantity,
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
          marketPrice: product.marketPrice || product.price / 0.95,
          quantity: numericQuantity,
          farmer: product.farmer,
          farmerId: product.farmerId,
          region: product.region,
          farmerImage: product.farmerImage,
          productImage: product.productImage,
          image: product.productImage,
          description: product.description,
          rating: product.rating,
          reviewCount: product.reviewCount,
        },
      ];
    });

    onAddToCart?.({
      ...product,
      quantity: numericQuantity,
      discountPercent: getBulkDiscount(numericQuantity),
      finalPrice: calculateFinalPrice(product.price, numericQuantity),
    });

    setCartNotification(`✓ ${product.name} • ${numericQuantity} kg added to cart`);
    window.clearTimeout(window.__bbCartNotificationTimer);

    window.__bbCartNotificationTimer = window.setTimeout(() => {
      setCartNotification("");
    }, 2200);
  }

  function updateCartQuantity(productId, quantity) {
    const numeric = Number(quantity);
    const safeValue = Number.isFinite(numeric) ? numeric : MIN_BULK_QTY;
    const clamped = Math.max(MIN_BULK_QTY, Math.round(safeValue * 100) / 100);

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
        "Each bulk order must contain at least 100 kg per product."
      );
      goToView("cart");
      return;
    }

    const couponCode = (paymentDetails.coupon || "").trim().toUpperCase();
    const couponDiscount = couponCode === "KISAANCONNECT"
      ? cartFinalTotal
      : couponCode === "LOVE"
        ? cartFinalTotal * 0.5
        : 0;
    const orderTotal = Math.max(0, cartFinalTotal - couponDiscount);

    const newOrder = {
      id: `BB-${Date.now()}`,
      createdAt: new Date().toLocaleString(),
      items: bulkCart.map((item) => ({ ...item })),
      totalQuantity: cartTotalQuantity,
      subtotal: cartSubtotal,
      discount: cartTotalDiscount + couponDiscount,
      bulkDiscount: cartTotalDiscount,
      couponDiscount,
      total: orderTotal,
      address:
        paymentDetails.address ||
        address ||
        "Not provided",
      coupon: paymentDetails.coupon || "",
      paymentMethod:
        paymentDetails.paymentMethod || "Not selected",
      status: "Order Placed",
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
            Minimum bulk order is 100 kg.
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
          <span className="bb-brand-icon">
            <img src={logo} alt="Kisaan Connect logo" />
          </span>

          <div>
            <strong>
              Kisaan <em>Connect</em>
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
              {(profileForm.firstName || user?.name || "B")
                .charAt(0)
                .toUpperCase()}
            </span>

            <span className="bb-user-info">
              <strong>
                {[profileForm.firstName, profileForm.surname].filter(Boolean).join(" ") || user?.name || "Bulk Buyer"}
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
              logout();
            }}
          >
            ↪ Logout
          </button>

          {profileOpen && (
            <div className="bb-profile-panel">
              <div className="bb-profile-avatar">
                {(profileForm.firstName || user?.name || "B")
                  ?.charAt(0)
                  ?.toUpperCase() || "B"}
              </div>

              <h3>
                {[profileForm.firstName, profileForm.surname].filter(Boolean).join(" ") || user?.name || "Bulk Buyer"}
              </h3>

              <p className="bb-profile-role">
                Bulk Buyer
              </p>

              <div className="bb-profile-info">
                <div><span>Email</span><strong>{user?.email || "Not available"}</strong></div>
                <div><span>Phone</span><strong>{profileForm.phone || "Not added"}</strong></div>
                <div><span>Date of Birth</span><strong>{profileForm.dob || "Not added"}</strong></div>
                <div><span>Delivery Address</span><strong>{address || "Not added"}</strong></div>
              </div>

              <button
                type="button"
                className="bb-profile-action"
                onClick={() => setShowProfileEditor(true)}
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
                    <span className="bb-address-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9"><path d="M12 21s7-6.2 7-12A7 7 0 0 0 5 9c0 5.8 7 12 7 12Z"/><circle cx="12" cy="9" r="2.4"/></svg></span>

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
                    <span className="bb-address-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9"><path d="M12 21s7-6.2 7-12A7 7 0 0 0 5 9c0 5.8 7 12 7 12Z"/><circle cx="12" cy="9" r="2.4"/></svg></span>

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
                    onFocus={() => setSearchFocused(true)}
                    onBlur={() => window.setTimeout(() => setSearchFocused(false), 140)}
                    onChange={(e) =>
                      setSearchTerm(
                        e.target.value
                      )
                    }
                  />
                  <span>🔍</span>
                </div>

                {(searchFocused || searchTerm.trim()) && (
                  <div className="bb-search-results" onMouseDown={(e) => e.preventDefault()}>
                    {searchTerm.trim() ? (
                      searchResults.length > 0 ? searchResults.map((product) => (
                        <div key={product.id} className="bb-search-result-item" onClick={() => { setSelectedProduct(product); setSearchTerm(""); setSearchFocused(false); }}>
                          <span>{product.name}</span><small>{product.category}</small>
                        </div>
                      )) : <div className="bb-no-search-result">No products found</div>
                    ) : (
                      <>
                        <div className="bb-search-suggestion-heading">Popular bulk picks</div>
                        {searchSuggestions.map((name) => (
                          <div key={name} className="bb-search-suggestion-chip" onClick={() => { setSearchTerm(name); setSearchFocused(false); }}>
                            <span>⌕</span>{name}
                          </div>
                        ))}
                      </>
                    )}
                  </div>
                )}
              </div>

              {view === "home" && (
                <>
                  <section className="bb-hero-banner" aria-label="Kisaan Connect farm highlights">
                    <img key={heroIndex} src={heroImages[heroIndex]} alt={`Kisaan Connect farm highlight ${heroIndex + 1}`} className="bb-hero-image" />
                    <div className="bb-hero-overlay" />
                    <div className="bb-hero-copy">
                      <span className="bb-hero-kicker">FRESH • DIRECT • BULK SMART</span>
                      <h3>Better quantities. Better farmer prices.</h3>
                      <p>Source fresh produce directly and unlock better value as your order grows.</p>
                    </div>
                    <button className="bb-hero-arrow bb-hero-prev" type="button" onClick={() => setHeroIndex((heroIndex - 1 + heroImages.length) % heroImages.length)} aria-label="Previous banner">‹</button>
                    <button className="bb-hero-arrow bb-hero-next" type="button" onClick={() => setHeroIndex((heroIndex + 1) % heroImages.length)} aria-label="Next banner">›</button>
                    <div className="bb-hero-dots">
                      {heroImages.map((_, index) => <button key={index} type="button" className={index === heroIndex ? "active" : ""} onClick={() => setHeroIndex(index)} aria-label={`Show banner ${index + 1}`} />)}
                    </div>
                  </section>
                  <div className="bb-promo-marquee" aria-label="Bulk buyer highlights">
                    <div className="bb-promo-marquee-track">
                      <span>🌾 Fresh farm supply</span><span>✦ 100 kg minimum</span><span>📦 Quantity-based savings</span><span>✦ Direct farmer sourcing</span><span>🚚 Reliable delivery</span><span>✦ Fresh farm supply</span><span>📦 Quantity-based savings</span>
                    </div>
                  </div>

                  <section className="bb-pricing-info">
                    <h3>Bulk Pricing</h3>

                    <div className="bb-pricing-tiers">
                      <div className="bb-tier">
                        <strong>100–249 kg</strong>
                        <span>20% OFF</span>
                      </div>
                      <div className="bb-tier">
                        <strong>250–499 kg</strong>
                        <span>25% OFF</span>
                      </div>
                      <div className="bb-tier">
                        <strong>500–999 kg</strong>
                        <span>30% OFF</span>
                      </div>
                      <div className="bb-tier">
                        <strong>1000+ kg</strong>
                        <span>40% OFF</span>
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
                <div className="bb-empty-cart-section">
                  <div className="bb-empty-cart-icon">🛒</div>
                  <h2>Your Cart is Empty</h2>
                  <p>Looks like you haven't added anything to your bulk cart yet.</p>
                  <button type="button" className="bb-start-shopping-btn" onClick={() => goToView("home")}>
                    Start Shopping →
                  </button>
                </div>
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
                          <div className="bb-cart-product-image"><img src={item.productImage || item.image} alt={item.name} /></div>
                          <div className="bb-cart-item-main">
                            <strong>
                              {item.name}
                            </strong>
                            <span className="bb-cart-price-line">
                              <del>₹{(item.marketPrice || item.price / 0.95).toFixed(0)}/kg</del>
                              <strong>₹{getBulkPricePerKg(item.price, item.quantity).toFixed(2)}/kg</strong>
                              <em>{discount}% off</em>
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

                            <input
                              className="bb-qty-input"
                              type="number"
                              min={MIN_BULK_QTY}
                              step={QTY_STEP}
                              value={cartQuantityDrafts[item.id] ?? item.quantity}
                              onChange={(e) => setCartQuantityDrafts((prev) => ({ ...prev, [item.id]: e.target.value }))}
                              onBlur={(e) => {
                                const value = e.target.value;
                                updateCartQuantity(item.id, value === "" ? MIN_BULK_QTY : value);
                                setCartQuantityDrafts((prev) => { const next = { ...prev }; delete next[item.id]; return next; });
                              }}
                            />
                            <span className="bb-qty-unit">kg</span>

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

                    <div>
                      <span>Average Bulk Price</span>
                      <strong>₹{cartTotalQuantity ? (cartFinalTotal / cartTotalQuantity).toFixed(2) : "0.00"}/kg</strong>
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
                        {order.items.map((item) => {
                          const reviewKey = `${order.id}-${item.id}`;
                          const review = customerReviews[reviewKey] || item.customerReview;
                          const draft = reviewDrafts[reviewKey] || { rating: 5, text: "" };
                          return (
                            <div className="bb-order-product-row bb-order-product-rich" key={item.id}>
                              <img src={item.productImage || item.image} alt={item.name} className="bb-order-product-image" />
                              <div className="bb-order-product-info"><strong>{item.name}</strong><small>{item.category} • {item.farmer || "Farmer listing"}</small><span>{item.quantity} kg × ₹{item.price}</span></div>
                              <strong>₹{calculateFinalPrice(item.price, item.quantity).toFixed(0)}</strong>
                              {order.status === "Shipped" && (review ? <div className="bb-review-submitted">★ {review.rating}/5 · {review.text}</div> : <div className="bb-review-box">
                                      <div className="bb-star-rating" aria-label="Rate this item">
                                        {[1,2,3,4,5].map((star) => <button key={star} type="button" className={star <= draft.rating ? "active" : ""} onClick={() => setReviewDrafts((prev) => ({ ...prev, [reviewKey]: { ...draft, rating: star } }))}>★</button>)}
                                      </div>
                                      <input value={draft.text} placeholder="Write a review for this farmer's item" onChange={(e) => setReviewDrafts((prev) => ({ ...prev, [reviewKey]: { ...draft, text: e.target.value } }))} />
                                      <button type="button" onClick={() => submitCustomerReview(order.id, item.id)}>Submit Review</button>
                                    </div>)}
                            </div>
                          );
                        })}
                      </div>
                      <div className="bb-order-status-actions">
                        {order.status === "Order Placed" && <button type="button" onClick={() => updateOrderStatus(order.id, "Shipped")}>Mark as Shipped</button>}
                        {order.status === "Shipped" && <button type="button" onClick={() => updateOrderStatus(order.id, "Delivered")}></button>}
                        {order.status === "Shipped" && <span>✓ Review unlocked after shipment</span>}
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

<button
  className="bb-help-close"
  onClick={() => setFooterPanel(null)}
  aria-label="Close help"
>
  ✕
</button>


  </section>
)}


  {footerPanel === "about" && (

  <section className="bb-about-bar">
    <div className="bb-about-content">
      <h3>About Kisaan connect</h3>


  <p>
    <strong>Kisaan connect</strong> is a digital platform that
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
    Kisaan connect aims to create a transparent, fair, and efficient
    marketplace where farmers get better value for their hard work
    and consumers get quality products at reasonable prices.
  </p>

  <div className="bb-about-flow">
    <span>Farmer</span>
    <span>→</span>
    <span>Kisaan connect</span>
    <span>→</span>
    <span>Consumer</span>
  </div>
</div>

<button
  className="bb-about-close"
  onClick={() => setFooterPanel(null)}
  aria-label="Close about"
>
  ✕
</button>
```

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
            Help
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
            About
          </button>
        </div>

        <span className="bb-footer-more">
          Kisaan Bazar • Bulk Buyer
        </span>
      </footer>

      {/* ================= PRODUCT DETAIL MODAL ================= */}

      {showProfileEditor && (
        <div className="bb-profile-overlay" onClick={() => setShowProfileEditor(false)}>
          <div className="bb-profile-editor" onClick={(e) => e.stopPropagation()}>
            <button type="button" className="bb-profile-editor-close" onClick={() => setShowProfileEditor(false)}>✕</button>
            <div className="bb-profile-editor-heading">
              <div className="bb-profile-editor-icon">👤</div>
              <div><span>MY PROFILE</span><h2>View &amp; Update Profile</h2><p>Keep your personal details up to date for a smoother checkout.</p></div>
            </div>
            <div className="bb-profile-editor-grid">
              <label>First Name<input type="text" value={profileForm.firstName} onChange={(e) => setProfileForm((prev) => ({ ...prev, firstName: e.target.value }))} placeholder="First name" /></label>
              <label>Surname<input type="text" value={profileForm.surname} onChange={(e) => setProfileForm((prev) => ({ ...prev, surname: e.target.value }))} placeholder="Surname" /></label>
              <label>Phone Number<input type="tel" value={profileForm.phone} onChange={(e) => setProfileForm((prev) => ({ ...prev, phone: e.target.value.replace(/[^0-9+\- ]/g, "") }))} placeholder="Phone number" /></label>
              <label>Date of Birth<input type="date" value={profileForm.dob} onChange={(e) => setProfileForm((prev) => ({ ...prev, dob: e.target.value }))} /></label>
              <label className="bb-profile-email-field">Email Address<input type="email" value={user?.email || ""} readOnly /></label>
            </div>
            <div className="bb-profile-editor-footer">
              <button type="button" className="bb-profile-cancel-btn" onClick={() => setShowProfileEditor(false)}>Cancel</button>
              <button type="button" className="bb-profile-save-btn" onClick={saveBulkBuyerProfile}>Save Profile ✓</button>
            </div>
          </div>
        </div>
      )}

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
                  const discountPercent = getBulkDiscount(qty);
                  const bulkPricePerKg = getBulkPricePerKg(listing.price, qty);
                  const marketPrice = listing.marketPrice || listing.price / 0.95;
                  const savingsPerKg = marketPrice - bulkPricePerKg;

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
                        <small>{listing.stock} kg available</small>
                        <span className="bb-listing-rating">★ {listing.rating} ({listing.reviewCount} reviews)</span>
                        <p className="bb-listing-description">{listing.description}</p>
                      </div>

                      {/* PRICE */}
                      <div className="bb-farmer-listing-price">
                        <span className="bb-market-price">Market ₹{marketPrice.toFixed(0)}/kg</span>
                        <strong className="bb-bulk-price">₹{bulkPricePerKg.toFixed(2)}/kg</strong>
                        <span className="bb-discount-badge">{discountPercent}% bulk discount</span>
                        <small>Save ₹{savingsPerKg.toFixed(2)}/kg</small>
                      </div>

                      <div className="bb-listing-reviews">
                        {listing.reviews.map((review, idx) => <div key={idx}><strong>{review.name}</strong> · ★ {review.rating}<span>{review.text}</span></div>)}
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

                          <input
                            className="bb-qty-input"
                            type="number"
                            min={MIN_BULK_QTY}
                            step={QTY_STEP}
                            value={quantities[listing.id] ?? qty}
                            onChange={(e) => {
                              const value = e.target.value;
                              setQuantities((prev) => ({
                                ...prev,
                                [listing.id]: value === "" ? "" : Number(value),
                              }));
                            }}
                            onBlur={(e) =>
                              setQuantity(
                                listing.id,
                                e.target.value === "" ? MIN_BULK_QTY : Number(e.target.value)
                              )
                            }
                            onClick={(e) => e.stopPropagation()}
                          />
                          <span className="bb-qty-unit">kg</span>

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
                            const typedQuantity = Number(quantities[listing.id] ?? qty);
                            const safeQuantity = Number.isFinite(typedQuantity) && typedQuantity >= MIN_BULK_QTY
                              ? Math.round(typedQuantity)
                              : MIN_BULK_QTY;
                            setQuantity(listing.id, safeQuantity);
                            handleAddToBulkCart(listingProduct, safeQuantity);
                            setSelectedProduct(null);
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
