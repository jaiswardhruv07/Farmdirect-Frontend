import React, { useState } from "react";
import "./paymentpage.css";

function PaymentPage({ cart, onNavigate }) {
  const [address, setAddress] = useState(
    localStorage.getItem("kb_saved_address") || ""
  );

  const [coupon, setCoupon] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");

  const total = cart.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  );

  function handlePlaceOrder() {
    if (!address.trim()) {
      alert("Please enter your delivery address.");
      return;
    }

    if (!paymentMethod) {
      alert("Please select a payment method.");
      return;
    }

    alert("Order placed successfully!");
  }

  return (
    <div className="payment-page">

      {/* Header */}
      <header className="payment-navbar">
        <button onClick={() => onNavigate?.("cart")}>
          ← Back to Cart
        </button>

        <h2>Payment</h2>
      </header>


      {/* Delivery Address */}
      <section className="payment-section">
        <h3>📍 Delivery Address</h3>

        <textarea
          placeholder="Enter your delivery address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />

        <button
          className="save-address-btn"
          onClick={() => {
            if (address.trim()) {
              localStorage.setItem(
                "kb_saved_address",
                address.trim()
              );
              alert("Address saved!");
            }
          }}
        >
          Save Address
        </button>
      </section>


      {/* Coupon */}
      <section className="payment-section">
        <h3>🏷️ Discount / Coupon</h3>

        <div className="coupon-box">
          <input
            type="text"
            placeholder="Enter coupon code"
            value={coupon}
            onChange={(e) => setCoupon(e.target.value)}
          />

          <button onClick={() => alert("Coupon will be applied later.")}>
            Apply
          </button>
        </div>
      </section>


      {/* Order Summary */}
      <section className="payment-section">
        <h3>🛒 Order Summary</h3>

        <div className="order-items">
          {cart.map((item) => (
            <div className="order-item" key={item.id}>
              <span>
                {item.name} × {item.quantity || 1}
              </span>

              <span>
                ₹{item.price * (item.quantity || 1)}
              </span>
            </div>
          ))}
        </div>

        <div className="order-total">
          <span>Total Amount</span>
          <span>₹{total}</span>
        </div>
      </section>


      {/* Payment Methods */}
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


      {/* Place Order */}
      <button
        className="place-order-btn"
        onClick={handlePlaceOrder}
      >
        Place Order
      </button>

    </div>
  );
}

export default PaymentPage;