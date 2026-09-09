import { useEffect, useState, useRef } from "react";
import "./FarmerPage.css";
import { useAuth } from "../../context/AuthContext";

import tomato from "../../assets/tomato.jpg";
import mango from "../../assets/mango.jpg";
import wheat from "../../assets/wheat.jpg";
import milk from "../../assets/milk.jpg";
import spinach from "../../assets/spinach.jpg";
import banana from "../../assets/banana.jpg";
import logo from "../../assets/less.webp";

// ─── Data ──────────────────────────────────────────────────────────────────
const CAT_EMOJI = {
  All: "📦",
  Vegetables: "🥬",
  Fruits: "🍎",
  Grains: "🌾",
  Dairy: "🥛",
  Other: "📦",
};


const INITIAL_PRODUCTS = [
  { id: 1, name: "Tomatoes", category: "Vegetables", stock: 20, status: "In Stock", price: 30, image: tomato },
  { id: 2, name: "Mangoes", category: "Fruits", stock: 5, status: "Low Stock", price: 80, image: mango },
  { id: 3, name: "Wheat", category: "Grains", stock: 0, status: "Out of Stock", price: 25, image: wheat },
  { id: 4, name: "Milk", category: "Dairy", stock: 15, status: "In Stock", price: 50, image: milk },
  { id: 5, name: "Spinach", category: "Vegetables", stock: 8, status: "In Stock", price: 20, image: spinach },
  { id: 6, name: "Bananas", category: "Fruits", stock: 3, status: "Low Stock", price: 40, image: banana },
];

const INITIAL_ORDERS = [
  { id: "#001", consumer: "Rahul Sharma", product: "Tomatoes", category: "Vegetables", quantity: 2, status: "New Order", date: "Today" },
  { id: "#002", consumer: "Priya Singh", product: "Mangoes", category: "Fruits", quantity: 1, status: "New Order", date: "Today" },
  { id: "#003", consumer: "Amit Kumar", product: "Wheat", category: "Grains", quantity: 4, status: "Completed", date: "Yesterday" },
  { id: "#004", consumer: "Sunita Devi", product: "Milk", category: "Dairy", quantity: 2, status: "Completed", date: "Yesterday" },
  { id: "#005", consumer: "Deepak Rao", product: "Spinach", category: "Vegetables", quantity: 3, status: "New Order", date: "2 days ago" },
  { id: "#006", consumer: "Neha Patel", product: "Bananas", category: "Fruits", quantity: 2, status: "New Order", date: "Today" },
];

const CATEGORIES = ["All", "Vegetables", "Fruits", "Grains", "Dairy"];


const STATUS_NEXT = {
  "New Order": "Completed",
};

const STATUS_COLOR = {
  "New Order": {
    background: "#fff3cd",
    color: "#856404",
  },

  Completed: {
    background: "#d1e7dd",
    color: "#0a3622",
  },
};

const ORDER_STATUSES = [
  "All",
  "New Order",
  "Completed",
];

export default function FarmerDashboard({ farmer, onNavigate }) {
  const { logout, user: authUser } = useAuth();
  const [section, setSection] = useState("home");

  const [orderCat, setOrderCat] = useState("All");
  const [orderStatus, setOrderStatus] = useState("All");
  const [prodCat, setProdCat] = useState("All");

  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [orders, setOrders] = useState(INITIAL_ORDERS);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showDrawer, setShowDrawer] = useState(false);
  const [toast, setToast] = useState("");

  const [stockModalId, setStockModalId] = useState(null);
  const [stockInput, setStockInput] = useState("");

  const [newProd, setNewProd] = useState({
    name: "",
    category: "Vegetables",
    stock: "",
    price: "",
    image: null,
  });

  const prodFileInputs = useRef({});
  const newProdFileInput = useRef(null);

  const initialFullName = farmer?.name || authUser?.name || "Ramesh Kumar";
  const initialNameParts = initialFullName.trim().split(/\\s+/);

  const [profile, setProfile] = useState({
    name: initialFullName,
    email: farmer?.email || authUser?.email || "",
    place: "",
    dob: "",
    phone: "",
  });
  const [salesView, setSalesView] = useState("month");
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [editingProfile, setEditingProfile] = useState(false);
  const profilePhotoInput = useRef(null);

  function handleProfilePhoto(file) {
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const image = e.target.result;
      setProfilePhoto(image);
      localStorage.setItem("kb_farmer_profile_photo", image);
      showToast("Profile photo updated!");
    };
    reader.readAsDataURL(file);
  }

  function saveFarmerProfile() {
    const firstName = profile.name.trim().split(/\\s+/)[0] || "";
    const surname = profile.name.trim().split(/\\s+/).slice(1).join(" ");
    if (!firstName) {
      showToast("Please enter your name.");
      return;
    }

    const nextProfile = {
      ...profile,
      name: [firstName, surname].filter(Boolean).join(" "),
      phone: profile.phone.trim(),
      place: profile.place.trim(),
      dob: profile.dob,
    };

    setProfile(nextProfile);
    localStorage.setItem("kb_farmer_profile", JSON.stringify(nextProfile));
    setEditingProfile(false);
    showToast("Profile updated successfully!");
  }

  // ─── Toast ────────────────────────────────────────────────────────────────

  const showToast = (msg) => {
    setToast(msg);

    setTimeout(() => {
      setToast("");
    }, 2600);
  };

  // ─── Computed Values ─────────────────────────────────────────────────────

  const remainingOrders = orders.filter(
    (o) => o.status !== "Completed"
  );

  const lowStockProducts = products.filter(
    (p) => p.status === "Low Stock" || p.status === "Out of Stock"
  );

  const filteredOrders = orders.filter((o) => {
    const categoryMatch =
      orderCat === "All" || o.category === orderCat;

    const statusMatch =
      orderStatus === "All" || o.status === orderStatus;

    return categoryMatch && statusMatch;
  });

  const filteredProducts =
    prodCat === "All"
      ? products
      : products.filter((p) => p.category === prodCat);

  // Simple sales calculation
  const totalSales = orders.reduce((total, order) => {
    if (order.status !== "Completed") return total;

    const product = products.find(
      (p) => p.name === order.product
    );

    return total + (product?.price || 0) * order.quantity;
  }, 0);

  // Example estimated profit
  const estimatedProfit = Math.round(totalSales * 0.3);

  // ─── Product Image ───────────────────────────────────────────────────────

  function getProductImage(productName) {
    const product = products.find(
      (p) => p.name === productName
    );

    return product?.image || null;
  }

  function handleProductImage(id, file) {
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (e) => {
      setProducts((prev) =>
        prev.map((p) =>
          p.id === id
            ? { ...p, image: e.target.result }
            : p
        )
      );

      showToast("📷 Photo updated!");
    };

    reader.readAsDataURL(file);
  }

  function triggerProductImageInput(id) {
    if (!prodFileInputs.current[id]) {
      const input = document.createElement("input");

      input.type = "file";
      input.accept = "image/*";

      input.onchange = (e) => {
        handleProductImage(id, e.target.files[0]);
      };

      prodFileInputs.current[id] = input;
    }

    prodFileInputs.current[id].click();
  }

  // ─── Orders ──────────────────────────────────────────────────────────────

  function advanceOrder(id) {
    setOrders((prev) =>
      prev.map((order) => {
        if (order.id !== id) return order;

        const nextStatus = STATUS_NEXT[order.status];

        return nextStatus
          ? { ...order, status: nextStatus }
          : order;
      })
    );

    showToast("✅ Order status updated!");
  }
  function undoOrder(id) {
    setOrders((prev) =>
      prev.map((order) => {
        if (order.id !== id) return order;

        if (order.status === "Completed") {
          return {
            ...order,
            status: "New Order",
          };
        }

        return order;
      })
    );

    showToast("↩️ Order status undone!");
  }
  // ─── Stock (modal based) ───────────────────────────────────────────────────

  const stockModalProduct = products.find(
    (p) => p.id === stockModalId
  );

  function openStockModal(id) {
    const product = products.find((p) => p.id === id);

    setStockModalId(id);
    setStockInput(String(product?.stock ?? ""));
  }

  function closeStockModal() {
    setStockModalId(null);
    setStockInput("");
  }

  function adjustStockInput(delta) {
    setStockInput((prev) => {
      const current = Number(prev) || 0;
      const next = current + delta;

      return String(next < 0 ? 0 : next);
    });
  }

  function saveStockUpdate() {
    if (stockInput === "") {
      alert("Valid quantity दर्ज करें।");
      return;
    }

    const quantity = Number(stockInput);

    if (
      Number.isNaN(quantity) ||
      quantity < 0 ||
      !Number.isFinite(quantity)
    ) {
      alert("Valid quantity दर्ज करें।");
      return;
    }

    setProducts((prev) =>
      prev.map((product) => {
        if (product.id !== stockModalId) return product;

        return {
          ...product,
          stock: quantity,
          status:
            quantity === 0
              ? "Out of Stock"
              : quantity <= 5
              ? "Low Stock"
              : "In Stock",
        };
      })
    );

    showToast("✅ Stock updated!");
    closeStockModal();
  }


  // ─── Remove Product ──────────────────────────────────────────────────────

  function removeProduct(id) {
    if (
      !window.confirm(
        "क्या आप इस product को हटाना चाहते हैं?"
      )
    ) {
      return;
    }

    // Delete product from Products
    const productToRemove = products.find(
      (product) => product.id === id
    );

    if (!productToRemove) return;

    setProducts((prev) =>
      prev.filter((product) => product.id !== id)
    );

    // Delete related orders from All Orders
    setOrders((prev) =>
      prev.filter(
        (order) => order.product !== productToRemove.name
      )
    );

    showToast(
      `🗑️ ${productToRemove.name} removed with its orders`
    );
  }
  // ─── Add Product ─────────────────────────────────────────────────────────
  function handleAddProduct() {
    const name = newProd.name.trim();
    const quantity = Number(newProd.stock);
    const price = Number(newProd.price);

    if (!name) {
      alert("Product का नाम भरें।");
      return;
    }

    if (
      newProd.stock === "" ||
      Number.isNaN(quantity) ||
      quantity < 0
    ) {
      alert("Valid stock quantity दर्ज करें।");
      return;
    }

    if (
      newProd.price !== "" &&
      (Number.isNaN(price) || price < 0)
    ) {
      alert("Valid price दर्ज करें।");
      return;
    }

    // ─── Create New Product ───
    const newProduct = {
      id: Date.now(),
      name,
      category: newProd.category,
      stock: quantity,
      price: price || 0,
      status:
        quantity === 0
          ? "Out of Stock"
          : quantity <= 5
          ? "Low Stock"
          : "In Stock",
      image: newProd.image || null,
    };

    // Add to Products
    setProducts((prev) => [
      ...prev,
      newProduct,
    ]);

    // ─── Automatically Add To All Orders ───
    const newOrder = {
      id: `#${String(orders.length + 1).padStart(3, "0")}`,
      consumer: "Demo Customer",
      product: name,
      category: newProd.category,
      quantity: 1,
      status: "New Order",
      date: "Today",
    };

    setOrders((prev) => [
      ...prev,
      newOrder,
    ]);

    // Reset form
    setNewProd({
      name: "",
      category: "Vegetables",
      stock: "",
      price: "",
      image: null,
    });

    setShowAddModal(false);

    showToast(
      `✅ ${name} added to Products & All Orders!`
    );
  }
  function handleNewProductImage(file) {
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (e) => {
      setNewProd((prev) => ({
        ...prev,
        image: e.target.result,
      }));
    };

    reader.readAsDataURL(file);
  }

  // ─── Navigation ──────────────────────────────────────────────────────────

  const navItems = [
    { key: "home", label: "🏠 Home" },
    { key: "orders", label: "📦 Orders" },
    { key: "products", label: "🌾 Products" },
    { key: "stock", label: "⚠️ Stock" },
    { key: "sales", label: "₹ Sales" },
    { key: "profit", label: "📈 Profit" },
  ];
  // ─── Product Card (Products tab — has photo upload) ───────────────────────

  const ProductCard = ({ p }) => (
    <div className="kb-product-card">

      <div
        className="kb-prod-img-wrap"
        onClick={() =>
          triggerProductImageInput(p.id)
        }
      >
        {p.image ? (
          <img
            src={p.image}
            alt={p.name}
          />
        ) : (
          <span>
            {CAT_EMOJI[p.category]}
          </span>
        )}

        <div className="kb-prod-img-overlay">
          <span>📷</span>
          <span>
            {p.image
              ? "Change Photo"
              : "Add Photo"}
          </span>
        </div>
      </div>

      <div className="kb-product-body">

        <div className="kb-product-name">
          {p.name}
        </div>

        <div className="kb-product-cat">
          {CAT_EMOJI[p.category]} {p.category}
        </div>

        <div className="kb-product-foot">

          <span className="kb-product-price">
            ₹{p.price || "--"}/kg
          </span>

          <span
            className={`kb-stock-badge ${
              p.status === "In Stock"
                ? "kb-si"
                : p.status === "Low Stock"
                ? "kb-sl"
                : "kb-so"
            }`}
          >
            {p.stock} left
          </span>

        </div>

        <div className="kb-product-actions">

          <button
            className="kb-prod-btn kb-prod-update"
            onClick={() =>
              openStockModal(p.id)
            }
          >
            📝 Stock
          </button>

          <button
            className="kb-prod-btn kb-prod-remove"
            onClick={() =>
              removeProduct(p.id)
            }
          >
            🗑️
          </button>

        </div>

      </div>
    </div>
  );

  // ─── Stock Card (Stock tab — NO photo upload, just qty + update) ──────────

  const StockCard = ({ p }) => (
    <div className="kb-stock-card">

      <div className="kb-stock-icon">
        {p.image ? (
          <img
            src={p.image}
            alt={p.name}
            className="kb-stock-product-image"
          />
        ) : (
          <div className="kb-stock-image-fallback">
            {p.name?.charAt(0)?.toUpperCase() || "P"}
          </div>
        )}
      </div>

      <div className="kb-stock-info">
        <strong>{p.name}</strong>
        <span>{p.category}</span>
      </div>

      <div className="kb-stock-qty">
        <span
          className={`kb-stock-badge ${
            p.status === "In Stock"
              ? "kb-si"
              : p.status === "Low Stock"
              ? "kb-sl"
              : "kb-so"
          }`}
        >
          {p.stock} left
        </span>
      </div>

      <button
        className="kb-stock-update-btn"
        onClick={() => openStockModal(p.id)}
      >
        📝 Update Stock
      </button>

    </div>
  );

  // ─── Render ──────────────────────────────────────────────────────────────

  return (
    <>

      <div className="kb-app">

        {/* NAVBAR */}

        <header className="kb-nav">

          <div className="kb-logo">
            <img
              className="kb-logo-image"
              src={logo}
              alt="Kisaan Connect logo"
            />
            <span>Kisaan<em>Connect</em></span>
          </div>

          <nav className="kb-nav-links">

            {navItems.map((item) => (
              <button
                key={item.key}
                className={
                  section === item.key
                    ? "active"
                    : ""
                }
                onClick={() =>
                  setSection(item.key)
                }
              >
                {item.label}
              </button>
            ))}

          </nav>

          <button
            className="kb-farmer-btn"
            onClick={() =>
              setShowDrawer(true)
            }
          >
            👨‍🌾{" "}
            {profile.name.split(" ")[0]}
          </button>

          <button
            className="kb-checkout-btn"
            onClick={logout}
          >
           Logout
          </button>

        </header>

        {/* TRENDING */}

        <div className="kb-trending">

          <strong>🔥 Trending:</strong>

          {products
            .slice(0, 4)
            .map((product) => (
              <span key={product.id}>
                {product.name}
              </span>
            ))}

        </div>

        <main className="kb-main">

          {/* ═════════════════ HOME ═════════════════ */}

          {section === "home" && (
            <>

              <h1 className="kb-page-title">
                Welcome,{" "}
                {profile.name.split(" ")[0]} 👋
              </h1>

              <p className="kb-page-sub">
                अपने orders, products और sales
                एक जगह manage करें।
              </p>

              {/* STAT CARDS */}

              <div className="kb-stats">

                <div
                  className="kb-stat"
                  onClick={() =>
                    setSection("orders")
                  }
                >
                  <div className="kb-stat-icon">
                    📦
                  </div>

                  <div>
                    <h3>Total Orders</h3>
                    <strong>
                      {orders.length}
                    </strong>
                    <small>
                      सभी orders →
                    </small>
                  </div>
                </div>

                <div
                  className="kb-stat"
                  onClick={() => {
                    setSection("orders");
                    setOrderStatus("New Order");
                  }}
                >
                  <div className="kb-stat-icon">
                    🚚
                  </div>

                  <div>
                    <h3>Remaining Orders</h3>
                    <strong>
                      {remainingOrders.length}
                    </strong>
                    <small>
                      Delivery बाकी →
                    </small>
                  </div>
                </div>

                <div
                  className="kb-stat"
                  onClick={() =>
                    setSection("stock")
                  }
                >
                  <div className="kb-stat-icon">
                    ⚠️
                  </div>

                  <div>
                    <h3>Low Stock</h3>
                    <strong>
                      {lowStockProducts.length}
                    </strong>
                    <small>
                      Stock कम है →
                    </small>
                  </div>
                </div>

                <div
                  className="kb-stat"
                  onClick={() =>
                    setSection("sales")
                  }
                >
                  <div className="kb-stat-icon">
                    ₹
                  </div>

                  <div>
                    <h3>Total Sales</h3>

                    <strong>
                      ₹{totalSales}
                    </strong>

                    <small>
                      Sales देखें →
                    </small>
                  </div>
                </div>

              </div>

              {/* RECENT ORDERS */}

              <div className="kb-section">

                <div className="kb-section-head">

                  <h2>
                    📦 Recent Orders
                  </h2>

                  <button
                    className="kb-view-all"
                    onClick={() =>
                      setSection("orders")
                    }
                  >
                    View All
                  </button>

                </div>

                <div className="kb-table-wrap">

                  <table className="kb-table">

                    <thead>
                      <tr>
                        <th>Order ID</th>
                        <th>Consumer</th>
                        <th>Product</th>
                        <th>Qty</th>
                        <th>Status</th>
                        <th>Date</th>
                      </tr>
                    </thead>

                    <tbody>

                      {orders
                        .slice(0, 4)
                        .map((order) => (

                          <tr key={order.id}>

                            <td>{order.id}</td>

                            <td>
                              {order.consumer}
                            </td>

                            <td>

                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: 8,
                                }}
                              >

                                <div
                                  style={{
                                    width: 30,
                                    height: 30,
                                    borderRadius: 8,
                                    background: "#e8eedc",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    fontSize: 16,
                                    overflow: "hidden",
                                  }}
                                >

                                  {getProductImage(
                                    order.product
                                  ) ? (
                                    <img
                                      src={getProductImage(
                                        order.product
                                      )}
                                      style={{
                                        width: "100%",
                                        height: "100%",
                                        objectFit:
                                          "cover",
                                      }}
                                      alt=""
                                    />
                                  ) : (
                                    CAT_EMOJI[
                                      order.category
                                    ]
                                  )}

                                </div>

                                {order.product}

                              </div>

                            </td>

                            <td>
                              {order.quantity}
                            </td>

                            <td>

                              <span
                                className="kb-badge"
                                style={
                                  STATUS_COLOR[
                                    order.status
                                  ]
                                }
                              >
                                {order.status}
                              </span>

                            </td>

                            <td>
                              {order.date}
                            </td>

                          </tr>

                        ))}

                    </tbody>

                  </table>

                </div>

              </div>

              {/* BEST SELLING */}

              <div className="kb-section">

                <h2
                  style={{
                    fontFamily:
                      "Playfair Display,serif",
                    fontSize: 19,
                    color: "#3e582e",
                    marginBottom: 14,
                  }}
                >
                  🏆 Best Selling Products
                </h2>

                <div className="kb-bestsell">

                  {["🥇", "🥈", "🥉"].map(
                    (medal, index) => {

                      const product =
                        products[index];

                      return (
                        <div
                          className="kb-bestsell-item"
                          key={index}
                        >

                          <span
                            style={{
                              fontSize: 22,
                            }}
                          >
                            {medal}
                          </span>

                          <div className="kb-bestsell-thumb">

                            {product?.image ? (
                              <img
                                src={product.image}
                                alt=""
                              />
                            ) : (
                              CAT_EMOJI[
                                product?.category
                              ]
                            )}

                          </div>

                          <div>

                            <strong>
                              {product?.name ||
                                `Product ${
                                  index + 1
                                }`}
                            </strong>

                            <p>
                              {product?.category ||
                                ""}
                            </p>

                          </div>

                        </div>
                      );
                    }
                  )}

                </div>

              </div>

              {/* TRENDING PRODUCTS */}

              <div className="kb-section">

                <h2
                  style={{
                    fontFamily:
                      "Playfair Display,serif",
                    fontSize: 19,
                    color: "#3e582e",
                    marginBottom: 14,
                  }}
                >
                  🔥 Trending Products
                </h2>

                <div className="kb-trend-grid">

                  {products
                    .slice(0, 4)
                    .map((product) => (

                      <div
                        className="kb-trend-item"
                        key={product.id}
                      >

                        <div className="kb-trend-thumb">

                          {product.image ? (
                            <img
                              src={product.image}
                              alt=""
                            />
                          ) : (
                            CAT_EMOJI[
                              product.category
                            ]
                          )}

                        </div>

                        <strong>
                          {product.name}
                        </strong>

                        <span>
                          {product.category}
                        </span>

                      </div>

                    ))}

                </div>

              </div>

            </>
          )}

          {/* ═════════════════ ORDERS ═════════════════ */}

          {section === "orders" && (
            <>

              <h1 className="kb-page-title">
                📦 Orders
              </h1>

              <p className="kb-page-sub">
                Category और status filter
                करके orders manage करें।
              </p>

              <div className="kb-order-highlight">

                <div>
                  <span>Total Orders</span>
                  <strong>
                    {orders.length}
                  </strong>
                </div>

                <div
                  style={{
                    textAlign: "right",
                  }}
                >
                  <span>Remaining</span>

                  <strong
                    style={{
                      color: "#ffd04a",
                    }}
                  >
                    {remainingOrders.length}
                  </strong>

                </div>

              </div>

              {/* CATEGORY FILTER */}

              <div
                className="kb-tabs"
                style={{
                  marginBottom: 10,
                }}
              >

                {CATEGORIES.map((category) => (

                  <button
                    key={category}
                    className={`kb-tab ${
                      orderCat === category
                        ? "active"
                        : ""
                    }`}
                    onClick={() =>
                      setOrderCat(category)
                    }
                  >

                    {category === "All"
                      ? "📦 All"
                      : `${CAT_EMOJI[category]} ${category}`}

                    <span
                      style={{
                        marginLeft: 6,
                        fontSize: 11,
                        opacity: 0.75,
                      }}
                    >
                      (
                      {category === "All"
                        ? orders.length
                        : orders.filter(
                            (o) =>
                              o.category ===
                              category
                          ).length}
                      )
                    </span>

                  </button>

                ))}

              </div>

              {/* STATUS FILTER */}

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  marginBottom: 18,
                  flexWrap: "wrap",
                }}
              >

                <span
                  style={{
                    fontSize: 13,
                    fontWeight: 700,
                    color: "#7a6a50",
                  }}
                >
                  Status:
                </span>

                <div className="kb-status-tabs">

                  {ORDER_STATUSES.map(
                    (status) => (

                      <button
                        key={status}
                        className={`kb-status-tab ${
                          orderStatus === status
                            ? "active"
                            : ""
                        }`}
                        onClick={() =>
                          setOrderStatus(status)
                        }
                      >
                        {status}
                      </button>

                    )
                  )}

                </div>

              </div>

              <div className="kb-section">

                <div className="kb-section-head">

                  <h2>
                    {orderCat === "All"
                      ? "All Orders"
                      : `${CAT_EMOJI[orderCat]} ${orderCat}`}

                    {orderStatus !== "All" &&
                      ` · ${orderStatus}`}
                  </h2>

                  <span
                    style={{
                      fontSize: 13,
                      color: "#7a6a50",
                    }}
                  >
                    {filteredOrders.length}{" "}
                    orders
                  </span>

                </div>

                <div className="kb-table-wrap">

                  <table className="kb-table">

                    <thead>
                      <tr>
                        <th>Order ID</th>
                        <th>Consumer</th>
                        <th>Product</th>
                        <th>Category</th>
                        <th>Qty</th>
                        <th>Status</th>
                        <th>Date</th>
                        <th>Action</th>
                      </tr>
                    </thead>

                    <tbody>

                      {filteredOrders.length ===
                      0 ? (

                        <tr>

                          <td
                            colSpan={8}
                            style={{
                              textAlign: "center",
                              color: "#7a6a50",
                              padding: 28,
                            }}
                          >
                            इस filter में कोई
                            order नहीं है।
                          </td>

                        </tr>

                      ) : (

                        filteredOrders.map(
                          (order) => (

                            <tr
                              key={order.id}
                            >

                              <td>
                                {order.id}
                              </td>

                              <td>
                                {order.consumer}
                              </td>

                              <td>

                                <div
                                  style={{
                                    display: "flex",
                                    alignItems:
                                      "center",
                                    gap: 8,
                                  }}
                                >

                                  <div
                                    style={{
                                      width: 32,
                                      height: 32,
                                      borderRadius: 8,
                                      background:
                                        "#e8eedc",
                                      display: "flex",
                                      alignItems:
                                        "center",
                                      justifyContent:
                                        "center",
                                      fontSize: 16,
                                      overflow:
                                        "hidden",
                                    }}
                                  >

                                    {getProductImage(
                                      order.product
                                    ) ? (

                                      <img
                                        src={getProductImage(
                                          order.product
                                        )}
                                        style={{
                                          width:
                                            "100%",
                                          height:
                                            "100%",
                                          objectFit:
                                            "cover",
                                        }}
                                        alt=""
                                      />

                                    ) : (

                                      CAT_EMOJI[
                                        order.category
                                      ]

                                    )}

                                  </div>

                                  {order.product}

                                </div>

                              </td>

                              <td>
                                {CAT_EMOJI[
                                  order.category
                                ]}{" "}
                                {order.category}
                              </td>

                              <td>
                                {order.quantity}
                              </td>

                              <td>

                                <span
                                  className="kb-badge"
                                  style={
                                    STATUS_COLOR[
                                      order.status
                                    ]
                                  }
                                >
                                  {order.status}
                                </span>

                              </td>

                              <td>
                                {order.date}
                              </td>

                              <td>
                                <div className="kb-order-actions">

                                  {order.status === "New Order" && (
                                    <button
                                      className="kb-order-action-btn"
                                      onClick={() => advanceOrder(order.id)}
                                    >
                                      ✅ Mark Completed
                                    </button>
                                  )}

                                  {order.status === "Completed" && (
                                    <button
                                      className="kb-order-action-btn kb-order-undo-btn"
                                      onClick={() => undoOrder(order.id)}
                                    >
                                      ↩️ Undo
                                    </button>
                                  )}

                                </div>
                              </td>

                            </tr>

                          )
                        )

                      )}

                    </tbody>

                  </table>

                </div>

              </div>

            </>
          )}

          {/* ═════════════════ PRODUCTS ═════════════════ */}

          {section === "products" && (
            <>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent:
                    "space-between",
                  marginBottom: 4,
                  gap: 15,
                  flexWrap: "wrap",
                }}
              >

                <h1 className="kb-page-title">
                  🌾 Products
                </h1>

                <button
                  className="kb-add-btn"
                  onClick={() =>
                    setShowAddModal(true)
                  }
                >
                  + Add Product
                </button>

              </div>

              <p className="kb-page-sub">
                Products की photo के साथ
                manage करें। Photo पर click
                करके change करें।
              </p>

              {/* CATEGORY TABS */}

              <div className="kb-tabs">

                {CATEGORIES.map(
                  (category) => (

                    <button
                      key={category}
                      className={`kb-tab ${
                        prodCat === category
                          ? "active"
                          : ""
                      }`}
                      onClick={() =>
                        setProdCat(category)
                      }
                    >

                      {category === "All"
                        ? "📦 All"
                        : `${CAT_EMOJI[category]} ${category}`}

                    </button>

                  )
                )}

              </div>

              {/* LOW STOCK ALERT */}

              {lowStockProducts.length >
                0 &&
                prodCat === "All" && (

                  <div
                    style={{
                      background: "#fff3cd",
                      border:
                        "1.5px solid #f2b705",
                      borderRadius: 14,
                      padding:
                        "12px 18px",
                      marginBottom: 18,
                      display: "flex",
                      alignItems:
                        "center",
                      gap: 10,
                      fontSize: 13,
                      color: "#856404",
                      fontWeight: 600,
                    }}
                  >
                    ⚠️{" "}
                    {lowStockProducts.length}{" "}
                    product(s) have low
                    stock. Please update
                    your stock.
                  </div>

                )}

              {/* PRODUCT GRID */}

              {filteredProducts.length ===
              0 ? (

                <div
                  className="kb-section"
                  style={{
                    textAlign: "center",
                    padding: 40,
                  }}
                >
                  <h2>
                    No products found
                  </h2>

                  <p>
                    इस category में अभी कोई
                    product नहीं है।
                  </p>
                </div>

              ) : (

                <div className="kb-products-grid">

                  {filteredProducts.map(
                    (product) => (
                      <ProductCard
                        key={product.id}
                        p={product}
                      />
                    )
                  )}

                </div>

              )}

            </>
          )}

          {/* ═════════════════ SALES ═════════════════ */}

          {section === "sales" && (
            <>

              <h1 className="kb-page-title">
                ₹ Sales
              </h1>

              <p className="kb-page-sub">
                आपकी completed orders की
                sales summary।
              </p>

              {/* TOTAL SALES + COMPLETED ORDERS */}
              <div className="kb-sales-grid">

                <div className="kb-sales-card">
                  <span>Total Sales</span>
                  <strong>₹{totalSales}</strong>
                  <small>From completed orders</small>
                </div>

                <div className="kb-sales-card">
                  <span>Completed Orders</span>
                  <strong>
                    {orders.filter((o) => o.status === "Completed").length}
                  </strong>
                  <small>Out of {orders.length} total</small>
                </div>

              </div>


              {/* SALES DETAILS TABLE */}
              <div className="kb-section">

                <div className="kb-section-head">
                  <h2>💰 Completed Sales</h2>
                </div>

                <div className="kb-table-wrap">
                  <table className="kb-table">
                    <thead>
                      <tr>
                        <th>Order ID</th>
                        <th>Consumer</th>
                        <th>Product</th>
                        <th>Qty</th>
                        <th>Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders
                        .filter((o) => o.status === "Completed")
                        .map((order) => {
                          const product = products.find(
                            (p) => p.name === order.product
                          );
                          const amount = (product?.price || 0) * order.quantity;

                          return (
                            <tr key={order.id}>
                              <td>{order.id}</td>
                              <td>{order.consumer}</td>
                              <td>{order.product}</td>
                              <td>{order.quantity}</td>
                              <td>₹{amount}</td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>

              </div>


              {/* SALES GRAPH */}
              <div className="kb-section kb-sales-chart-section">

                <div className="kb-sales-chart-header">

                  <div>
                    <h2>📊 Sales Overview</h2>
                    <p>
                      Track your sales performance
                    </p>
                  </div>

                  <div className="kb-sales-toggle">

                    <button
                      className={
                        salesView === "month"
                          ? "active"
                          : ""
                      }
                      onClick={() =>
                        setSalesView("month")
                      }
                    >
                      Month
                    </button>

                    <button
                      className={
                        salesView === "year"
                          ? "active"
                          : ""
                      }
                      onClick={() =>
                        setSalesView("year")
                      }
                    >
                      Year
                    </button>

                  </div>

                </div>


                <div className="kb-sales-graph">

                  {salesView === "month" ? (

                    <div className="kb-bar-chart">

                      {[
                        { month: "Jan", sale: 12000 },
                        { month: "Feb", sale: 15500 },
                        { month: "Mar", sale: 9800 },
                        { month: "Apr", sale: 18200 },
                        { month: "May", sale: 22100 },
                        { month: "Jun", sale: 19600 },
                        { month: "Jul", sale: 24800 },
                        { month: "Aug", sale: 21400 },
                        { month: "Sep", sale: 27500 },
                        { month: "Oct", sale: 23100 },
                        { month: "Nov", sale: 29800 },
                        { month: "Dec", sale: 32500 },
                      ].map((item) => (

                        <div
                          className="kb-bar-column"
                          key={item.month}
                        >

                          <div className="kb-bar-value">
                            ₹{item.sale}
                          </div>

                          <div
                            className="kb-bar"
                            style={{
                              height:
                                `${(item.sale / 32500) * 180}px`,
                            }}
                          />

                          <span>
                            {item.month}
                          </span>

                        </div>

                      ))}

                    </div>

                  ) : (

                    <div className="kb-bar-chart">

                      {[
                        { year: "2022", sale: 185000 },
                        { year: "2023", sale: 242000 },
                        { year: "2024", sale: 318000 },
                        { year: "2025", sale: 425000 },
                        { year: "2026", sale: 510000 },
                      ].map((item) => (

                        <div
                          className="kb-bar-column"
                          key={item.year}
                        >

                          <div className="kb-bar-value">
                            ₹{item.sale}
                          </div>

                          <div
                            className="kb-bar"
                            style={{
                              height:
                                `${(item.sale / 510000) * 180}px`,
                            }}
                          />

                          <span>
                            {item.year}
                          </span>

                        </div>

                      ))}

                    </div>

                  )}

                </div>

              </div>

            </>
          )}

          {/* ═════════════════ PROFIT ═════════════════ */}

          {section === "profit" && (
            <>

              <h1 className="kb-page-title">
                📈 Profit
              </h1>

              <p className="kb-page-sub">
                आपकी estimated profit
                summary।
              </p>

              <div className="kb-stats">

                <div className="kb-stat">

                  <div className="kb-stat-icon">
                    ₹
                  </div>

                  <div>
                    <h3>Total Sales</h3>

                    <strong>
                      ₹{totalSales}
                    </strong>

                    <small>
                      Revenue
                    </small>
                  </div>

                </div>

                <div className="kb-stat">

                  <div className="kb-stat-icon">
                    📈
                  </div>

                  <div>
                    <h3>Estimated Profit</h3>

                    <strong>
                      ₹{estimatedProfit}
                    </strong>

                    <small>
                      Approx. 30%
                    </small>
                  </div>

                </div>

              </div>

              <div
                className="kb-section"
                style={{
                  padding: 25,
                }}
              >

                <h2>
                  📊 Profit Summary
                </h2>

                <p>
                  Total Revenue:{" "}
                  <strong>
                    ₹{totalSales}
                  </strong>
                </p>

                <p>
                  Estimated Profit:{" "}
                  <strong>
                    ₹{estimatedProfit}
                  </strong>
                </p>

                <p>
                  Estimated Margin:{" "}
                  <strong>30%</strong>
                </p>

                <p
                  style={{
                    color: "#7a6a50",
                    fontSize: 13,
                  }}
                >
                  *Profit is currently
                  estimated at 30% of
                  completed-order sales.
                  Replace this calculation
                  with your actual production,
                  transport and other costs
                  when connecting your backend.
                </p>

              </div>

            </>
          )}
          {/* ═════════════════ STOCK ═════════════════ */}
          {section === "stock" && (
            <>
              <h1 className="kb-page-title">
                ⚠️ Stock
              </h1>

              <p className="kb-page-sub">
                जिन products का stock कम है, वे यहाँ दिखाई देंगे। Photo यहाँ add करने की ज़रूरत नहीं — बस stock update करें।
              </p>

              <div className="kb-section">

                <div className="kb-section-head">
                  <h2>⚠️ Low Stock Products</h2>

                  <span
                    style={{
                      fontSize: 13,
                      color: "#7a6a50",
                    }}
                  >
                    {lowStockProducts.length} products
                  </span>
                </div>

                {lowStockProducts.length === 0 ? (
                  <div
                    style={{
                      textAlign: "center",
                      padding: "40px",
                      color: "#7a6a50",
                    }}
                  >
                    <div
                      style={{
                        fontSize: 45,
                        marginBottom: 10,
                      }}
                    >
                      🎉
                    </div>

                    <h3 style={{ color: "#3e582e" }}>
                      Stock looks good!
                    </h3>

                    <p>
                      सभी products का stock sufficient है।
                    </p>
                  </div>
                ) : (
                  <div className="kb-stock-list">
                    {lowStockProducts.map((product) => (
                      <StockCard
                        key={product.id}
                        p={product}
                      />
                    ))}
                  </div>
                )}

              </div>
            </>
          )}
        </main>

        {/* ═════════════════ PROFILE DRAWER ═════════════════ */}
        {showDrawer && (
          <>
            <div
              className="kb-drawer-overlay"
              onClick={() => setShowDrawer(false)}
            />

            <aside className="kb-drawer">

              {/* PROFILE HEADER */}
              <div className="kb-profile-header">

                <div className="kb-profile-avatar-wrap">
                  <div
                    className="kb-profile-avatar"
                    onClick={() => profilePhotoInput.current?.click()}
                    title="Change profile photo"
                  >
                    {profilePhoto ? (
                      <img
                        src={profilePhoto}
                        alt="Profile"
                        className="kb-profile-avatar-image"
                      />
                    ) : (
                      (profile.name || "F").charAt(0).toUpperCase()
                    )}
                  </div>
</div>

                <div>
                  <h2>My Profile</h2>
                  <p>Manage your account details</p>
                </div>

                <button
                  className="kb-profile-close"
                  onClick={() => setShowDrawer(false)}
                >
                  ×
                </button>

              </div>


              {/* PROFILE CONTENT — Consumer-style layout */}
              <div className="kb-profile-content">
                <div className="kb-profile-editor-heading farmer-profile-heading">
                  <div className="profile-editor-icon">👤</div>
                  <div>
                    <span>MY PROFILE</span>
                    <h2>View &amp; Update Profile</h2>
                    <p>Keep your personal details up to date.</p>
                  </div>
                </div>

                <div className="kb-profile-editor-grid">
                  <label>
                    First Name
                    <input
                      type="text"
                      value={profile.name.trim().split(/\s+/)[0] || ""}
                      readOnly={!editingProfile}
                      onChange={(e) => {
                        const surname = profile.name.trim().split(/\s+/).slice(1).join(" ");
                        setProfile((prev) => ({
                          ...prev,
                          name: [e.target.value, surname].filter(Boolean).join(" "),
                        }));
                      }}
                      placeholder="First name"
                    />
                  </label>

                  <label>
                    Surname
                    <input
                      type="text"
                      value={profile.name.trim().split(/\s+/).slice(1).join(" ")}
                      readOnly={!editingProfile}
                      onChange={(e) => {
                        const firstName = profile.name.trim().split(/\s+/)[0] || "";
                        setProfile((prev) => ({
                          ...prev,
                          name: [firstName, e.target.value].filter(Boolean).join(" "),
                        }));
                      }}
                      placeholder="Surname"
                    />
                  </label>

                  <label>
                    Phone Number
                    <input
                      type="tel"
                      value={profile.phone || ""}
                      readOnly={!editingProfile}
                      onChange={(e) =>
                        setProfile((prev) => ({
                          ...prev,
                          phone: e.target.value.replace(/[^0-9+\- ]/g, ""),
                        }))
                      }
                      placeholder="Phone number"
                    />
                  </label>

                  <label>
                    Date of Birth
                    <input
                      type="date"
                      value={profile.dob || ""}
                      readOnly={!editingProfile}
                      onChange={(e) =>
                        setProfile((prev) => ({
                          ...prev,
                          dob: e.target.value,
                        }))
                      }
                    />
                  </label>

                  <label className="bb-profile-email-field">
                    Email Address
                    <input
                      type="email"
                      value={profile.email || ""}
                      readOnly
                    />
                  </label>

                  <label className="bb-profile-email-field">
                    Place / City
                    <input
                      type="text"
                      value={profile.place || ""}
                      readOnly={!editingProfile}
                      onChange={(e) =>
                        setProfile((prev) => ({
                          ...prev,
                          place: e.target.value,
                        }))
                      }
                      placeholder="Village / city"
                    />
                  </label>
                </div>

                <div className="farmer-profile-photo-section">
                  <div className="farmer-profile-photo-preview">
                    {profilePhoto ? (
                      <img src={profilePhoto} alt="Farmer profile" />
                    ) : (
                      <span>
                        {(profile.name || "F").charAt(0).toUpperCase()}
                      </span>
                    )}
                  </div>

                  <div>
                    <strong>Profile Photo</strong>
                    <p>Add or change your profile image.</p>
                    <button
                      type="button"
                      className="kb-profile-photo-btn farmer-profile-add-photo"
                      onClick={() => profilePhotoInput.current?.click()}
                    >
                      {profilePhoto ? "Change Photo" : "Add Photo"}
                    </button>
                    <input
                      ref={profilePhotoInput}
                      type="file"
                      accept="image/*"
                      style={{ display: "none" }}
                      onChange={(e) => handleProfilePhoto(e.target.files?.[0])}
                    />
                  </div>
                </div>

                <div className="farmer-profile-editor-footer">
                  <button
                    type="button"
                    className="kb-profile-cancel-btn"
                    onClick={() => {
                      if (editingProfile) {
                        try {
                          const saved = localStorage.getItem("kb_farmer_profile");
                          if (saved) setProfile((prev) => ({ ...prev, ...JSON.parse(saved) }));
                        } catch {}
                      }
                      setEditingProfile(false);
                    }}
                  >
                    Cancel
                  </button>

                  {!editingProfile ? (
                    <button
                      type="button"
                      className="kb-profile-save-btn"
                      onClick={() => setEditingProfile(true)}
                    >
                      Update Profile
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="kb-profile-save-btn"
                      onClick={saveFarmerProfile}
                    >
                      Save Profile ✓
                    </button>
                  )}
                </div>
              </div>
            </aside>
          </>
        )}
        {/* ═════════════════ ADD PRODUCT MODAL ═════════════════ */}

        {showAddModal && (
          <div className="kb-modal-overlay">

            <div className="kb-modal">

              <div className="kb-modal-head">

                <h2>
                  🌾 Add New Product
                </h2>

                <button
                  className="kb-modal-close"
                  onClick={() =>
                    setShowAddModal(false)
                  }
                >
                  ✕
                </button>

              </div>

              <div className="kb-form-group">
                <label className="kb-form-label">
                  Product Name
                </label>

                <input
                  className="kb-form-input"
                  type="text"
                  value={newProd.name}
                  onChange={(e) =>
                    setNewProd({
                      ...newProd,
                      name: e.target.value,
                    })
                  }
                  placeholder="e.g. Potatoes"
                />
              </div>

              <div className="kb-form-group">
                <label className="kb-form-label">
                  Category
                </label>

                <select
                  className="kb-form-select"
                  value={newProd.category}
                  onChange={(e) =>
                    setNewProd({
                      ...newProd,
                      category:
                        e.target.value,
                    })
                  }
                >

                  {CATEGORIES
                    .slice(1)
                    .map((category) => (

                      <option
                        key={category}
                        value={category}
                      >
                        {CAT_EMOJI[category]}{" "}
                        {category}
                      </option>

                    ))}

                </select>
              </div>

              <div className="kb-form-group">
                <label className="kb-form-label">
                  Stock Quantity
                </label>

                <input
                  className="kb-form-input"
                  type="number"
                  min="0"
                  value={newProd.stock}
                  onChange={(e) =>
                    setNewProd({
                      ...newProd,
                      stock: e.target.value,
                    })
                  }
                  placeholder="e.g. 25"
                />
              </div>

              <div className="kb-form-group">
                <label className="kb-form-label">
                  Price per kg
                </label>

                <input
                  className="kb-form-input"
                  type="number"
                  min="0"
                  value={newProd.price}
                  onChange={(e) =>
                    setNewProd({
                      ...newProd,
                      price: e.target.value,
                    })
                  }
                  placeholder="e.g. 40"
                />
              </div>

              <div className="kb-form-group">
                <label className="kb-form-label">
                  Product Photo
                </label>

                <div
                  className="kb-img-upload-area"
                  onClick={() =>
                    newProdFileInput.current?.click()
                  }
                >
                  {newProd.image ? (
                    <img
                      className="kb-img-preview"
                      src={newProd.image}
                      alt="Preview"
                    />
                  ) : (
                    <>
                      <span style={{ fontSize: 26 }}>📷</span>
                      <p>Click to upload a product photo</p>
                    </>
                  )}

                  <input
                    ref={newProdFileInput}
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={(e) =>
                      handleNewProductImage(
                        e.target.files[0]
                      )
                    }
                  />
                </div>
              </div>

              <div className="kb-modal-actions">

                <button
                  className="kb-modal-cancel"
                  onClick={() =>
                    setShowAddModal(false)
                  }
                >
                  Cancel
                </button>

                <button
                  className="kb-modal-save"
                  onClick={handleAddProduct}
                >
                  Add Product
                </button>

              </div>

            </div>

          </div>
        )}

        {/* ═════════════════ UPDATE STOCK MODAL ═════════════════ */}

        {stockModalProduct && (
          <div className="kb-modal-overlay">

            <div className="kb-modal">

              <div className="kb-modal-head">
                <h2>📝 Update Stock</h2>

                <button
                  className="kb-modal-close"
                  onClick={closeStockModal}
                >
                  ✕
                </button>
              </div>

              <div className="kb-stock-modal-product">

                <div className="kb-stock-icon">
                  {stockModalProduct.image ? (
                    <img
                      src={stockModalProduct.image}
                      alt={stockModalProduct.name}
                    />
                  ) : (
                    CAT_EMOJI[stockModalProduct.category]
                  )}
                </div>

                <div className="kb-stock-info">
                  <strong>{stockModalProduct.name}</strong>
                  <span>
                    {stockModalProduct.category} · Current: {stockModalProduct.stock}
                  </span>
                </div>

              </div>

              <div className="kb-form-group">
                <label className="kb-form-label">
                  New Stock Quantity
                </label>

                <div className="kb-qty-stepper">

                  <button
                    type="button"
                    onClick={() => adjustStockInput(-5)}
                  >
                    −5
                  </button>

                  <button
                    type="button"
                    onClick={() => adjustStockInput(-1)}
                  >
                    −1
                  </button>

                  <input
                    className="kb-form-input"
                    type="number"
                    min="0"
                    value={stockInput}
                    onChange={(e) =>
                      setStockInput(e.target.value)
                    }
                    placeholder="e.g. 25"
                  />

                  <button
                    type="button"
                    onClick={() => adjustStockInput(1)}
                  >
                    +1
                  </button>

                  <button
                    type="button"
                    onClick={() => adjustStockInput(5)}
                  >
                    +5
                  </button>

                </div>
              </div>

              <div className="kb-modal-actions">

                <button
                  className="kb-modal-cancel"
                  onClick={closeStockModal}
                >
                  Cancel
                </button>

                <button
                  className="kb-modal-save"
                  onClick={saveStockUpdate}
                >
                  Save
                </button>

              </div>

            </div>

          </div>
        )}

        {/* ═════════════════ TOAST ═════════════════ */}

        {toast && (
          <div className="kb-toast">
            {toast}
          </div>
        )}

      </div>

    </>
  );
}