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

  useEffect(() => {
    const saved = localStorage.getItem("kb_saved_address");

    if (saved) {
      setAddress(saved);
    }
  }, []);

  // ALL PRODUCTS
  // Names and prices are dummy for frontend structure only.
  // Later these can come from backend.

// ALL PRODUCTS
const products = [
  {
    id: 1,
    name: "Product 1",
    category: "Vegetables",
    price: 0,
  },
  {
    id: 2,
    name: "Product 2",
    category: "Vegetables",
    price: 0,
  },
  {
    id: 3,
    name: "Product 3",
    category: "Vegetables",
    price: 0,
  },
  {
    id: 4,
    name: "Product 4",
    category: "Fruits",
    price: 0,
  },
  {
    id: 5,
    name: "Product 5",
    category: "Fruits",
    price: 0,
  },
  {
    id: 6,
    name: "Product 6",
    category: "Fruits",
    price: 0,
  },
  {
    id: 7,
    name: "Product 7",
    category: "Grains",
    price: 0,
  },
  {
    id: 8,
    name: "Product 8",
    category: "Grains",
    price: 0,
  },
  {
    id: 9,
    name: "Product 9",
    category: "Grains",
    price: 0,
  },
  {
    id: 10,
    name: "Product 10",
    category: "Dairy",
    price: 0,
  },
  {
    id: 11,
    name: "Product 11",
    category: "Dairy",
    price: 0,
  },
  {
    id: 12,
    name: "Product 12",
    category: "Dairy",
    price: 0,
  },
];


// NEW PRODUCTS
const newProducts = [
  {
    id: 101,
    name: "Product 13",
    category: "Vegetables",
    price: 0,
  },
  {
    id: 102,
    name: "Product 14",
    category: "Fruits",
    price: 0,
  },
  {
    id: 103,
    name: "Product 15",
    category: "Dairy",
    price: 0,
  },
];


// SEARCH RESULTS
// Search will look through ALL products.
const searchResults = products.filter((product) =>
  product.name
    .toLowerCase()
    .includes(searchTerm.toLowerCase())
);


// CATEGORY FILTER
const filteredProducts = products.filter((product) => {
  const matchesCategory =
    selectedCategory === "All" ||
    product.category === selectedCategory;

  return matchesCategory;
});


// NEW PRODUCT FILTER
const filteredNewProducts = newProducts.filter((product) => {
  const matchesCategory =
    selectedCategory === "All" ||
    product.category === selectedCategory;

  return matchesCategory;
});
  function handleSaveAddress() {
    if (!addressInput.trim()) return;

    setAddress(addressInput.trim());

    localStorage.setItem(
      "kb_saved_address",
      addressInput.trim()
    );

    setIsEditingAddress(false);
  }

  return (
    <div className="consumer-page">

      {/* ================= NAVIGATION BAR ================= */}

      <header className="navbar">

        <button
  onClick={() => {
    setIsHome(true);
    setSelectedCategory("All");
    setSearchTerm("");
  }}
>
  Home
</button>

        <button
          onClick={() => {
            setIsHome(false);
            setSelectedCategory("All");
            setSearchTerm("");
          }}
        >
          Items
        </button>

        <button onClick={() => onNavigate?.("cart")}>
          Cart{cartCount > 0 ? ` (${cartCount})` : ""}
        </button>

        <button
          onClick={() => onNavigate?.("checkout")}
        >
          Checkout
        </button>

        
        <button
          onClick={() => onProfile?.()}
        >
          👤 Profile
        </button>

      </header>


      {/* ================= ADDRESS BAR ================= */}

{/* ================= ADDRESS BAR ================= */}

<div className="address-bar">

  {isEditingAddress ? (

    <div className="address-edit">

      <span className="address-icon">📍</span>

      <input
        type="text"
        placeholder="Enter your delivery address"
        value={addressInput}
        onChange={(e) =>
          setAddressInput(e.target.value)
        }
        autoFocus
      />

      <button onClick={handleSaveAddress}>
        Save
      </button>

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
        <strong>Delivering to:</strong>{" "}
        {address}
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

      {/* ================= SEARCH BAR ================= */}

      {/* Search Bar */}
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


  {/* SEARCH SUGGESTIONS */}

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

            <span>
              {product.name}
            </span>

            <small>
              {product.category}
            </small>

          </div>

        ))

      ) : (

        <div className="no-search-result">
          No products found
        </div>

      )}

    </div>
  )}

</div>


      {/* ================= MAIN LAYOUT ================= */}

      <div className="main-layout">


        {/* ================= SIDEBAR ================= */}

       <aside className="sidebar">

  <h3>Categories</h3>

  <button
    className={selectedCategory === "All" ? "active" : ""}
    onClick={() => {
      setIsHome(false);
      setSelectedCategory("All");
    }}
  >
    All
  </button>

  <button
    className={selectedCategory === "Vegetables" ? "active" : ""}
    onClick={() => {
      setIsHome(false);
      setSelectedCategory("Vegetables");
    }}
  >
    Vegetables
  </button>

  <button
    className={selectedCategory === "Fruits" ? "active" : ""}
    onClick={() => {
      setIsHome(false);
      setSelectedCategory("Fruits");
    }}
  >
    Fruits
  </button>

  <button
    className={selectedCategory === "Grains" ? "active" : ""}
    onClick={() => {
      setIsHome(false);
      setSelectedCategory("Grains");
    }}
  >
    Grains
  </button>

  <button
    className={selectedCategory === "Dairy" ? "active" : ""}
    onClick={() => {
      setIsHome(false);
      setSelectedCategory("Dairy");
    }}
  >
    Dairy
  </button>

</aside>

        {/* ================= MAIN CONTENT ================= */}

        <main className="content">


          {/* ================= HERO ================= */}

         {/* Hero Banner */}
{isHome && (
  <section className="hero-banner">
    <img
      src="https://picsum.photos/seed/foodapp/900/280"
      alt="New launch advertisement"
      className="hero-image"
    />
  </section>
)}++


          {/* ================= NEW PRODUCTS ================= */}

          <h2>New Products</h2>

          <div className="product-grid">

            {filteredNewProducts.map((product) => (

              <div
                className="product-card"
                key={product.id}
                onClick={() =>
                  setSelectedProduct(product)
                }
              >

                <div className="cross">
                  X
                </div>

                <p>
                  {product.name}
                </p>

                <p>
                  ₹{product.price}
                </p>

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

         {/* ALL ITEMS */}

<h2>All Items</h2>

<div className="product-grid">

  {filteredProducts.length > 0 ? (

    filteredProducts.map((product) => (

      <div
        className="product-card"
        key={product.id}
        onClick={() => setSelectedProduct(product)}
      >

        <div className="cross">
          X
        </div>

        <p>
          {product.name}
        </p>

        <p>
          ₹{product.price}
        </p>

        <small>
          {product.category}
        </small>

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

    <p>
      No products found.
    </p>

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

      <div className="product-detail-image">
        X
      </div>

      <h2>{selectedProduct.name}</h2>

      <p className="detail-category">
        {selectedProduct.category}
      </p>

      <p className="detail-price">
        {selectedProduct.price
          ? `₹${selectedProduct.price}`
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

      {/* ================= FOOTER ================= */}

      <footer className="footer">

        <button>Help</button>

        <button>About</button>

        <button>•••</button>

      </footer>

    </div>
  );
}

export default ConsumerPage;