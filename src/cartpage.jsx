import React from "react";
import "./cartpage.css";

function CartPage({ cart, onRemove, onUpdateQuantity, onNavigate }) {
  const total = cart.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  );

  return (
    <div className="cart-page">

      {/* Top Bar */}
      <header className="cart-navbar">
        <button onClick={() => onNavigate?.("consumer")}>
          ← Back to Shopping
        </button>

        <div className="cart-heading">
          <span className="cart-heading-icon">🛒</span>
          <div>
            <h1>Your Cart</h1>
            <p>Your fresh picks, all in one place</p>
          </div>
        </div>
      </header>

      {cart.length === 0 ? (
        /* ================= EMPTY CART ================= */
        <div className="empty-cart-section">

          <div className="empty-cart-icon">
            🛒
          </div>

          <h2>Your Cart is Empty</h2>

          <p>
            Looks like you haven't added anything to your cart yet.
          </p>

          <button
            className="start-shopping-btn"
            onClick={() => onNavigate?.("consumer")}
          >
            Start Shopping →
          </button>

        </div>
      ) : (
        /* ================= CART WITH ITEMS ================= */
        <div className="cart-content">

          {/* Left Side - Products */}
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

                  {/* Product Image */}
                  <div className="cart-product-image">
                    <span>X</span>
                  </div>

                  {/* Product Details */}
                  <div className="cart-product-details">

                    <div className="product-name-row">
                      <h3>{item.name}</h3>

                      <button
                        className="remove-btn"
                        onClick={() => onRemove?.(item.id)}
                        title="Remove item"
                      >
                        ♡ Remove
                      </button>
                    </div>

                    <p className="product-description">
                      Fresh product from KisaanBazar
                    </p>

                    <div className="product-bottom">

                      <div className="item-price">
                        ₹{item.price}
                      </div>

                      <div className="quantity-control">

                        <button
                          onClick={() =>
                            onUpdateQuantity?.(
                              item.id,
                              Math.max(
                                1,
                                (item.quantity || 1) - 1
                              )
                            )
                          }
                        >
                          −
                        </button>

                        <span>{item.quantity || 1}</span>

                        <button
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

          {/* Right Side - Summary */}
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
              <span>Subtotal</span>
              <span>₹{total}</span>
            </div>

            <div className="summary-row">
              <span>Delivery</span>
              <span className="delivery-text">Calculated later</span>
            </div>

            <div className="summary-divider"></div>

            <div className="summary-total">
              <span>Total Amount</span>
              <strong>₹{total}</strong>
            </div>

            <button
              className="continue-btn"
              onClick={() => onNavigate?.("payment")}
            >
              Continue
              <span>→</span>
            </button>

            <p className="secure-text">
              🌱 Fresh products • Direct from farmers
            </p>

          </aside>

        </div>
      )}

    </div>
  );
}

export default CartPage;