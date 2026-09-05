import React, { useState, useEffect } from "react";

function ConsumerPage({ onNavigate, onAddToCart, cartCount, user,onProfile }) {
  const [address, setAddress] = useState("");
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [addressInput, setAddressInput] = useState("");
const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
useEffect(() => {
  const saved = localStorage.getItem("kb_saved_address");
  if (saved) setAddress(saved);
}, []);
const products = [
  { id: 1, name: "Product 1", price: 0 },
  { id: 2, name: "Product 2", price: 0 },
  { id: 3, name: "Product 3", price: 0 },
];

const filteredProducts = products.filter((product) =>
  product.name.toLowerCase().includes(searchTerm.toLowerCase())
);

function handleSaveAddress() {
  if (!addressInput.trim()) return;
  setAddress(addressInput.trim());
  localStorage.setItem("kb_saved_address", addressInput.trim());
  setIsEditingAddress(false);
}
  return (
    <div className="consumer-page">

      {/* Navigation Bar */}
      <header className="navbar">
  <button>Home</button>
  <button>Items</button>
  <button onClick={() => onNavigate?.("cart")}>
    Cart{cartCount > 0 ? ` (${cartCount})` : ""}
  </button>
  <button onClick={() => onNavigate?.("checkout")}>Checkout</button>
 <button onClick={() => onNavigate?.("farmer")}>
  Switch
</button>
<button onClick={() => onProfile?.()}>
  👤 Profile
</button>
</header>
{/* Address Bar */}
<div className="address-bar">
  {isEditingAddress ? (
    <div className="address-edit">
      <input
        type="text"
        placeholder="Enter your delivery address"
        value={addressInput}
        onChange={(e) => setAddressInput(e.target.value)}
        autoFocus
      />
      <button onClick={handleSaveAddress}>Save</button>
      <button onClick={() => setIsEditingAddress(false)}>Cancel</button>
    </div>
  ) : address ? (
    <p>
      📍 Delivering to: <strong>{address}</strong>{" "}
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
    <button onClick={() => setIsEditingAddress(true)}>
      + Add your address
    </button>
  )}
</div>

      {/* Search Bar */}
      <div className="search-container">
  <input
    type="text"
    placeholder="Search Product"
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
  />
  <span>🔍</span>
</div>
      {/* Main Layout */}
      <div className="main-layout">

        {/* Left Sidebar */}
        <aside className="sidebar">

  <h3>Categories</h3>

  <button
    className={selectedCategory === "All" ? "active" : ""}
    onClick={() => setSelectedCategory("All")}
  >
    All
  </button>

  <button
    className={selectedCategory === "Vegetables" ? "active" : ""}
    onClick={() => setSelectedCategory("Vegetables")}
  >
    Vegetables
  </button>

  <button
    className={selectedCategory === "Fruits" ? "active" : ""}
    onClick={() => setSelectedCategory("Fruits")}
  >
    Fruits
  </button>

  <button
    className={selectedCategory === "Grains" ? "active" : ""}
    onClick={() => setSelectedCategory("Grains")}
  >
    Grains
  </button>

  <button
    className={selectedCategory === "Dairy" ? "active" : ""}
    onClick={() => setSelectedCategory("Dairy")}
  >
    Dairy
  </button>

</aside>

        {/* Main Content */}
        <main className="content">

          {/* Hero Banner */}
          <section className="hero-banner">
  <img
    src="https://picsum.photos/seed/foodapp/900/280"
    alt="New launch advertisement"
    className="hero-image"
  />
</section>

          {/* New Products */}
          <h2>New Product:</h2>

<div className="product-grid">
  {filteredProducts.map((product) => (
    <div className="product-card" key={product.id}>
      
      <div className="cross">X</div>

      <p>{product.name}</p>
      <p>₹{product.price}</p>

      <button onClick={() => onAddToCart?.(product)}>
        Add to Cart
      </button>

    </div>
  ))}
</div>

</main>
</div>
      {/* Footer */}
      <footer className="footer">
  <button>Help</button>
  <button>About</button>
  <button>•••</button>
</footer>

    </div>
  );
}

export default ConsumerPage;