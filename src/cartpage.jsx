import React from "react";

function CartPage({
  cart,
  onRemove,
  onUpdateQuantity,
  onNavigate,
  onAddToCart,
}) {
  const total = cart.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  );

  // Same products that are currently available on Consumer Page
  const suggestions = [
    { id: 1, name: "Product 1", price: 0 },
    { id: 2, name: "Product 2", price: 0 },
    { id: 3, name: "Product 3", price: 0 },
  ];

  return (
    <div className="consumer-page">
      <style>{`
        .cart-page {
          min-height: 100vh;
          padding: 25px 40px;
          font-family: Arial, sans-serif;
          background: #f5f3f2;
        }

        .cart-page .navbar {
          display: flex;
          justify-content: center;
          gap: 20px;
          margin-bottom: 25px;
        }

        .cart-page .navbar button {
          background: #332326;
          color: white;
          border: none;
          border-radius: 30px;
          padding: 12px 30px;
          font-size: 15px;
          cursor: pointer;
        }

        .cart-page h2 {
          margin-bottom: 20px;
        }

        .cart-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 20px;
        }

        .cart-card {
          background: white;
          border-radius: 15px;
          padding: 15px;
          text-align: center;
        }

        .cart-card .cross {
          height: 120px;
          background: #c4694a;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 40px;
          color: #cc2727;
          font-weight: bold;
          margin-bottom: 10px;
        }

        .cart-card p {
          margin: 4px 0;
        }

        .quantity-control {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          margin: 10px 0;
        }

        .quantity-control button {
          background: #4a5d3a;
          color: white;
          border: none;
          border-radius: 50%;
          width: 30px;
          height: 30px;
          padding: 0;
          font-size: 18px;
          cursor: pointer;
          margin: 0;
        }

        .quantity-control span {
          font-size: 16px;
          font-weight: bold;
          min-width: 20px;
        }

        .cart-card .remove-btn {
          background: #c94f4f;
          color: white;
          border: none;
          border-radius: 20px;
          padding: 8px 16px;
          font-size: 13px;
          cursor: pointer;
          margin-top: 6px;
        }

        .cart-total {
          margin-top: 30px;
          padding: 20px;
          background: #eadfc4;
          border: 1px solid #c9a15a;
          border-radius: 15px;
          text-align: right;
          font-size: 20px;
          font-weight: bold;
          color: #2f2a1e;
        }

        .continue-btn {
          display: block;
          margin: 20px 0 0 auto;
          background: #5a8f3c;
          color: white;
          border: none;
          border-radius: 30px;
          padding: 13px 35px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
        }

        .continue-btn:hover {
          background: #4a7830;
        }

        /* EMPTY CART */

        .empty-cart {
          text-align: center;
          padding: 45px 20px 30px;
        }

        .empty-cart-icon {
          width: 100px;
          height: 100px;
          margin: 0 auto 20px;
          border-radius: 50%;
          background: #eadfc4;
          border: 2px solid #c9a15a;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 48px;
          box-shadow: 0 8px 20px rgba(74, 93, 58, 0.12);
          animation: cartBounce 1.5s ease-in-out infinite;
        }

        @keyframes cartBounce {
          0%, 100% {
            transform: translateY(0);
          }

          50% {
            transform: translateY(-6px);
          }
        }

        .empty-cart h3 {
          margin: 0 0 10px;
          color: #4a5d3a;
          font-size: 28px;
        }

        .empty-cart p {
          margin: 0 auto;
          max-width: 430px;
          color: #777;
          font-size: 15px;
          line-height: 1.6;
        }

        .empty-cart-message {
          margin-top: 8px !important;
          color: #8b7654 !important;
          font-size: 14px !important;
        }

        .suggestion-title {
          text-align: center;
          margin: 35px 0 20px;
          color: #4a5d3a;
          font-size: 23px;
        }

        .suggestion-subtitle {
          text-align: center;
          color: #777;
          font-size: 14px;
          margin: -10px 0 22px;
        }

        .suggestion-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 22px;
          max-width: 950px;
          margin: 0 auto;
        }

        .suggestion-card {
          background: #eadfc4;
          border: 1px solid #c9a15a;
          border-radius: 18px;
          padding: 15px;
          text-align: center;
          box-shadow: 0 5px 14px rgba(74, 93, 58, 0.08);
          transition: all 0.25s ease;
        }

        .suggestion-card:hover {
          transform: translateY(-5px);
          border-color: #5a8f3c;
          box-shadow: 0 10px 22px rgba(74, 93, 58, 0.15);
        }

        .suggestion-image {
          width: 100%;
          height: 135px;
          background: #d8d5d4;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 50px;
          color: #777;
          font-weight: bold;
          margin-bottom: 12px;
        }

        .suggestion-card p {
          margin: 5px 0;
          font-size: 15px;
          font-weight: 600;
          color: #2f2a1e;
        }

        .suggestion-card p:nth-of-type(2) {
          color: #4a5d3a;
        }

        .suggestion-card button {
          background: #c9a15a;
          color: #2f2a1e;
          border: none;
          border-radius: 25px;
          padding: 10px 22px;
          font-size: 13px;
          font-weight: 700;
          cursor: pointer;
          margin-top: 8px;
          transition: all 0.2s ease;
        }

        .suggestion-card button:hover {
          background: #f2b705;
          transform: translateY(-2px);
        }

        @media (max-width: 800px) {
          .suggestion-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 550px) {
          .suggestion-grid {
            grid-template-columns: 1fr;
          }

          .empty-cart {
            padding-top: 30px;
          }

          .empty-cart h3 {
            font-size: 24px;
          }
        }
      `}</style>

      {/* Navigation Bar */}
      <header className="navbar">
        <button onClick={() => onNavigate?.("consumer")}>
          Home
        </button>
      </header>

      <h2>Your Cart</h2>

      {/* EMPTY CART */}
      {cart.length === 0 && (
        <>
          <div className="empty-cart">

            <div className="empty-cart-icon">
              🛒
            </div>

            <h3>Your Cart is Empty</h3>

            <p>
              Looks like you haven't added anything to your cart yet.
            </p>

            <p className="empty-cart-message">
              🌱 Let's find something fresh for you!
            </p>

          </div>

          <h3 className="suggestion-title">
            ✨ Fresh Picks for You
          </h3>

          <p className="suggestion-subtitle">
            You might find something you like
          </p>

          <div className="suggestion-grid">

            {suggestions.map((product) => (
              <div className="suggestion-card" key={product.id}>

                <div className="suggestion-image">
                  X
                </div>

                <p>{product.name}</p>
                <p>₹{product.price}</p>

                <button
                  onClick={() => onAddToCart?.(product)}
                >
                  Add to Cart
                </button>

              </div>
            ))}

          </div>
        </>
      )}

      {/* CART ITEMS */}
      {cart.length > 0 && (
        <div className="product-grid">

          {cart.map((item) => (
            <div className="product-card" key={item.id}>

              <div className="cross">X</div>

              <div className="product-info">

                <p>{item.name}</p>
                <p>₹{item.price}</p>

                <div className="quantity-control">

                  <button
                    onClick={() =>
                      onUpdateQuantity?.(
                        item.id,
                        Math.max(1, (item.quantity || 1) - 1)
                      )
                    }
                  >
                    −
                  </button>

                  <span>
                    {item.quantity || 1}
                  </span>

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

                <button
                  className="remove-btn"
                  onClick={() => onRemove?.(item.id)}
                >
                  Remove
                </button>

              </div>

            </div>
          ))}

        </div>
      )}

      {/* TOTAL + CONTINUE */}
      {cart.length > 0 && (
        <>
          <div className="cart-total">
            Total Amount: ₹{total}
          </div>

          <button
            className="continue-btn"
            onClick={() => onNavigate?.("payment")}
          >
            Continue
          </button>
        </>
      )}

    </div>
  );
}

export default CartPage;