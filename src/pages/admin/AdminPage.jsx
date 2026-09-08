import { useState } from "react";
import "./adminpage.css";
import { useAuth } from "../../context/AuthContext";

const FARMERS = [
  {
    id: "F001",
    name: "Ramesh Kumar",
    location: "West Bengal",
    products: 8,
    sales: 48200,
    status: "Active"
  },
  {
    id: "F002",
    name: "Sita Ram",
    location: "Bihar",
    products: 6,
    sales: 32450,
    status: "Active"
  },
  {
    id: "F003",
    name: "Mohan Lal",
    location: "Uttar Pradesh",
    products: 5,
    sales: 28760,
    status: "Active"
  },
  {
    id: "F004",
    name: "Sunita Devi",
    location: "Jharkhand",
    products: 4,
    sales: 18320,
    status: "Active"
  },
  {
    id: "F005",
    name: "Hari Singh",
    location: "Punjab",
    products: 7,
    sales: 12680,
    status: "Active"
  }
];

const CONSUMERS = [
  {
    id: "C001",
    name: "Rahul Sharma",
    email: "rahul@gmail.com",
    orders: 12,
    spent: 4260,
    status: "Active"
  },
  {
    id: "C002",
    name: "Priya Singh",
    email: "priya@gmail.com",
    orders: 9,
    spent: 3180,
    status: "Active"
  },
  {
    id: "C003",
    name: "Anita Verma",
    email: "anita@gmail.com",
    orders: 7,
    spent: 2860,
    status: "Active"
  },
  {
    id: "C004",
    name: "Suresh Yadav",
    email: "suresh@gmail.com",
    orders: 6,
    spent: 2420,
    status: "Active"
  },
  {
    id: "C005",
    name: "Neha Patel",
    email: "neha@gmail.com",
    orders: 5,
    spent: 1980,
    status: "Active"
  }
];

const PRODUCTS = [
  {
    id: 1,
    name: "Tomatoes",
    category: "Vegetables",
    farmer: "Ramesh Kumar",
    price: 30,
    stock: 20,
    sold: 42,
    emoji: "🍅",
    status: "In Stock"
  },
  {
    id: 2,
    name: "Mangoes",
    category: "Fruits",
    farmer: "Sita Ram",
    price: 80,
    stock: 5,
    sold: 28,
    emoji: "🥭",
    status: "Low Stock"
  },
  {
    id: 3,
    name: "Milk",
    category: "Dairy",
    farmer: "Mohan Lal",
    price: 50,
    stock: 15,
    sold: 24,
    emoji: "🥛",
    status: "In Stock"
  },
  {
    id: 4,
    name: "Spinach",
    category: "Vegetables",
    farmer: "Sunita Devi",
    price: 20,
    stock: 8,
    sold: 18,
    emoji: "🥬",
    status: "Low Stock"
  },
  {
    id: 5,
    name: "Bananas",
    category: "Fruits",
    farmer: "Hari Singh",
    price: 40,
    stock: 3,
    sold: 16,
    emoji: "🍌",
    status: "Low Stock"
  },
  {
    id: 6,
    name: "Wheat",
    category: "Grains",
    farmer: "Ramesh Kumar",
    price: 25,
    stock: 0,
    sold: 12,
    emoji: "🌾",
    status: "Out of Stock"
  }
];

const ORDERS = [
  {
    id: "#007",
    consumer: "Rahul Sharma",
    farmer: "Ramesh Kumar",
    product: "Tomatoes",
    quantity: "2 kg",
    total: 60,
    status: "New Order",
    date: "Today"
  },
  {
    id: "#008",
    consumer: "Priya Singh",
    farmer: "Sita Ram",
    product: "Mangoes",
    quantity: "1 kg",
    total: 80,
    status: "New Order",
    date: "Today"
  },
  {
    id: "#009",
    consumer: "Anita Verma",
    farmer: "Mohan Lal",
    product: "Spinach",
    quantity: "3 kg",
    total: 60,
    status: "Completed",
    date: "Yesterday"
  },
  {
    id: "#010",
    consumer: "Suresh Yadav",
    farmer: "Ramesh Kumar",
    product: "Milk",
    quantity: "2 L",
    total: 100,
    status: "Completed",
    date: "Yesterday"
  },
  {
    id: "#011",
    consumer: "Neha Patel",
    farmer: "Sita Ram",
    product: "Bananas",
    quantity: "2 kg",
    total: 80,
    status: "New Order",
    date: "2 days ago"
  }
];

function AdminPage({ onNavigate, user }) {
  const { logout } = useAuth();
  const [section, setSection] = useState("dashboard");
  const [reportType, setReportType] = useState("farmer");
  const [userType, setUserType] = useState("all");

  const totalFarmers = FARMERS.length;
  const totalConsumers = CONSUMERS.length;
  const totalUsers = totalFarmers + totalConsumers;

  const totalProducts = PRODUCTS.length;
  const totalOrders = ORDERS.length;

  const totalSales = ORDERS.reduce(
    (sum, order) => (order.status === "Completed" ? sum + order.total : sum),
    0
  );

  const pendingOrders = ORDERS.filter((order) => order.status === "New Order");

  const lowStockProducts = PRODUCTS.filter(
    (product) =>
      product.status === "Low Stock" || product.status === "Out of Stock"
  );

  function renderDashboard() {
    return (
      <>
        <div className="admin-title-row">
          <div>
            <h1>Admin Dashboard</h1>
            <p>Complete overview of your Kisaan Bazar marketplace</p>
          </div>

          <div className="admin-date">
            📅 Today
            <span>6 September 2026</span>
          </div>
        </div>

        {/* STAT CARDS */}

        <div className="admin-stats">
          <div className="admin-stat-card">
            <div className="stat-icon green">👥</div>

            <div>
              <span>Total Users</span>
              <strong>{totalUsers}</strong>
              <small>↑ 12% this month</small>
            </div>
          </div>

          <div className="admin-stat-card">
            <div className="stat-icon green">👨‍🌾</div>

            <div>
              <span>Total Farmers</span>
              <strong>{totalFarmers}</strong>
              <small>↑ 8% this month</small>
            </div>
          </div>

          <div className="admin-stat-card">
            <div className="stat-icon gold">🧑</div>

            <div>
              <span>Total Consumers</span>
              <strong>{totalConsumers}</strong>
              <small>↑ 15% this month</small>
            </div>
          </div>

          <div className="admin-stat-card">
            <div className="stat-icon green">🌾</div>

            <div>
              <span>Total Products</span>
              <strong>{totalProducts}</strong>
              <small>↑ 6% this month</small>
            </div>
          </div>

          <div className="admin-stat-card">
            <div className="stat-icon gold">📦</div>

            <div>
              <span>Total Orders</span>
              <strong>{totalOrders}</strong>
              <small>↑ 18% this month</small>
            </div>
          </div>

          <div className="admin-stat-card">
            <div className="stat-icon green">₹</div>

            <div>
              <span>Total Sales</span>
              <strong>₹{totalSales.toLocaleString()}</strong>
              <small>↑ 22% this month</small>
            </div>
          </div>
        </div>

        {/* MAIN DASHBOARD GRID */}

        <div className="admin-dashboard-grid">
          {/* SALES GRAPH */}

          <div className="admin-card sales-card">
            <div className="card-heading">
              <div>
                <h2>📊 Sales Overview</h2>
                <p>Revenue & order trends</p>
              </div>

              <button>Month ▾</button>
            </div>

            <div className="bar-chart">
              {[18, 25, 20, 29, 34, 39, 32, 30, 42, 35, 44, 50].map(
                (height, index) => {
                  const months = [
                    "Jan",
                    "Feb",
                    "Mar",
                    "Apr",
                    "May",
                    "Jun",
                    "Jul",
                    "Aug",
                    "Sep",
                    "Oct",
                    "Nov",
                    "Dec"
                  ];

                  return (
                    <div className="bar-column" key={months[index]}>
                      <span>₹{height}k</span>

                      <div
                        className="bar"
                        style={{
                          height: `${height * 3.2}px`
                        }}
                      />

                      <small>{months[index]}</small>
                    </div>
                  );
                }
              )}
            </div>
          </div>

          {/* TOP PRODUCTS */}

          <div className="admin-card">
            <div className="card-heading">
              <div>
                <h2>🏆 Top Selling Products</h2>
                <p>Based on completed orders</p>
              </div>
            </div>

            <div className="top-list">
              {PRODUCTS.slice(0, 5).map((product, index) => (
                <div className="top-item" key={product.id}>
                  <div className="rank">{index + 1}</div>

                  <div className="product-mini">{product.emoji}</div>

                  <div className="top-info">
                    <strong>{product.name}</strong>
                    <span>{product.category}</span>
                  </div>

                  <div className="top-sales">
                    <strong>{product.sold}</strong>
                    <span>orders</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* PENDING ORDERS */}

          <div className="admin-card">
            <div className="card-heading">
              <div>
                <h2>⏰ Pending Orders</h2>
                <p>Orders that need attention</p>
              </div>
            </div>

            <div className="pending-list">
              {pendingOrders.map((order) => (
                <div className="pending-item" key={order.id}>
                  <div>
                    <strong>{order.id}</strong>
                    <span>{order.product}</span>
                    <small>{order.consumer}</small>
                  </div>

                  <span className="status new">New Order</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* LOWER GRID */}

        <div className="admin-lower-grid">
          {/* RECENT ORDERS */}

          <div className="admin-card recent-card">
            <div className="card-heading">
              <div>
                <h2>📦 Recent Orders</h2>
                <p>Latest orders from consumers</p>
              </div>

              <button className="view-btn" onClick={() => setSection("orders")}>
                View All →
              </button>
            </div>

            <div className="table-wrap">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Order</th>
                    <th>Consumer</th>
                    <th>Farmer</th>
                    <th>Product</th>
                    <th>Qty</th>
                    <th>Status</th>
                  </tr>
                </thead>

                <tbody>
                  {ORDERS.map((order) => (
                    <tr key={order.id}>
                      <td>{order.id}</td>
                      <td>{order.consumer}</td>
                      <td>{order.farmer}</td>
                      <td>{order.product}</td>
                      <td>{order.quantity}</td>

                      <td>
                        <span
                          className={
                            order.status === "Completed"
                              ? "status completed"
                              : "status new"
                          }
                        >
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* TOP FARMERS */}

          <div className="admin-card">
            <div className="card-heading">
              <div>
                <h2>👨‍🌾 Top Farmers</h2>
                <p>By total sales</p>
              </div>

              <button
                className="view-btn"
                onClick={() => {
                  setSection("reports");
                  setReportType("farmer");
                }}
              >
                View All →
              </button>
            </div>

            <div className="farmer-list">
              {FARMERS.map((farmer, index) => (
                <div className="farmer-item" key={farmer.id}>
                  <span className="farmer-rank">
                    {index === 0 ? "👑" : index + 1}
                  </span>

                  <div className="farmer-avatar">👨‍🌾</div>

                  <div className="farmer-info">
                    <strong>{farmer.name}</strong>
                    <span>{farmer.products} products</span>
                  </div>

                  <strong className="farmer-sales">
                    ₹{farmer.sales.toLocaleString()}
                  </strong>
                </div>
              ))}
            </div>
          </div>

          {/* LOW STOCK */}

          <div className="admin-card">
            <div className="card-heading">
              <div>
                <h2>⚠️ Low Stock Products</h2>
                <p>Products that need attention</p>
              </div>

              <button
                className="view-btn"
                onClick={() => setSection("products")}
              >
                View All →
              </button>
            </div>

            <div className="low-stock-list">
              {lowStockProducts.map((product) => (
                <div className="low-stock-item" key={product.id}>
                  <div className="product-mini">{product.emoji}</div>

                  <div>
                    <strong>{product.name}</strong>

                    <span>{product.category}</span>
                  </div>

                  <span className="stock-number">{product.stock} left</span>

                  <span
                    className={
                      product.stock === 0 ? "status out" : "status low"
                    }
                  >
                    {product.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </>
    );
  }

  function renderUsers() {
    let users = [];

    if (userType === "farmers") {
      users = FARMERS;
    } else if (userType === "consumers") {
      users = CONSUMERS;
    }

    return (
      <>
        <div className="admin-title-row">
          <div>
            <h1>👥 Users</h1>
            <p>Manage all farmers and consumers</p>
          </div>
        </div>

        <div className="filter-tabs">
          <button
            className={userType === "all" ? "active" : ""}
            onClick={() => setUserType("all")}
          >
            All Users ({totalUsers})
          </button>

          <button
            className={userType === "farmers" ? "active" : ""}
            onClick={() => setUserType("farmers")}
          >
            👨‍🌾 Farmers ({totalFarmers})
          </button>

          <button
            className={userType === "consumers" ? "active" : ""}
            onClick={() => setUserType("consumers")}
          >
            🧑 Consumers ({totalConsumers})
          </button>
        </div>

        {userType === "all" ? (
          <div className="user-summary-grid">
            <div
              className="user-summary-card"
              onClick={() => setUserType("farmers")}
            >
              <div>👨‍🌾</div>
              <h2>{totalFarmers}</h2>
              <p>Farmers</p>
              <span>View Farmer Accounts →</span>
            </div>

            <div
              className="user-summary-card"
              onClick={() => setUserType("consumers")}
            >
              <div>🧑</div>
              <h2>{totalConsumers}</h2>
              <p>Consumers</p>
              <span>View Consumer Accounts →</span>
            </div>
          </div>
        ) : (
          <div className="admin-card">
            <div className="table-wrap">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>{userType === "farmers" ? "Location" : "Email"}</th>

                    <th>{userType === "farmers" ? "Products" : "Orders"}</th>

                    <th>{userType === "farmers" ? "Sales" : "Spent"}</th>

                    <th>Status</th>
                  </tr>
                </thead>

                <tbody>
                  {users.map((user) => (
                    <tr key={user.id}>
                      <td>{user.id}</td>

                      <td>
                        <strong>{user.name}</strong>
                      </td>

                      <td>
                        {userType === "farmers" ? user.location : user.email}
                      </td>

                      <td>
                        {userType === "farmers" ? user.products : user.orders}
                      </td>

                      <td>
                        ₹
                        {(userType === "farmers"
                          ? user.sales
                          : user.spent
                        ).toLocaleString()}
                      </td>

                      <td>
                        <span className="status completed">{user.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </>
    );
  }

  function renderProducts() {
    return (
      <>
        <div className="admin-title-row">
          <div>
            <h1>🌾 Products</h1>
            <p>All products listed by farmers</p>
          </div>
        </div>

        <div className="admin-card">
          <div className="table-wrap">
            <table className="admin-table product-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Category</th>
                  <th>Farmer</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Sold</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {PRODUCTS.map((product) => (
                  <tr key={product.id}>
                    <td>
                      <div className="table-product">
                        <span>{product.emoji}</span>

                        <strong>{product.name}</strong>
                      </div>
                    </td>

                    <td>{product.category}</td>

                    <td>{product.farmer}</td>

                    <td>₹{product.price}/kg</td>

                    <td>{product.stock}</td>

                    <td>{product.sold}</td>

                    <td>
                      <span
                        className={
                          product.status === "In Stock"
                            ? "status completed"
                            : product.status === "Out of Stock"
                              ? "status out"
                              : "status low"
                        }
                      >
                        {product.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </>
    );
  }

  function renderOrders() {
    return (
      <>
        <div className="admin-title-row">
          <div>
            <h1>📦 Orders</h1>
            <p>Monitor all marketplace orders</p>
          </div>
        </div>

        <div className="admin-stats order-mini-stats">
          <div className="admin-stat-card">
            <div className="stat-icon green">📦</div>

            <div>
              <span>Total Orders</span>
              <strong>{totalOrders}</strong>
            </div>
          </div>

          <div className="admin-stat-card">
            <div className="stat-icon gold">⏰</div>

            <div>
              <span>Pending</span>
              <strong>{pendingOrders.length}</strong>
            </div>
          </div>

          <div className="admin-stat-card">
            <div className="stat-icon green">✅</div>

            <div>
              <span>Completed</span>
              <strong>
                {ORDERS.filter((o) => o.status === "Completed").length}
              </strong>
            </div>
          </div>
        </div>

        <div className="admin-card">
          <div className="table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Consumer</th>
                  <th>Farmer</th>
                  <th>Product</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>

              <tbody>
                {ORDERS.map((order) => (
                  <tr key={order.id}>
                    <td>
                      <strong>{order.id}</strong>
                    </td>

                    <td>{order.consumer}</td>

                    <td>{order.farmer}</td>

                    <td>{order.product}</td>

                    <td>{order.quantity}</td>

                    <td>₹{order.total}</td>

                    <td>
                      <span
                        className={
                          order.status === "Completed"
                            ? "status completed"
                            : "status new"
                        }
                      >
                        {order.status}
                      </span>
                    </td>

                    <td>{order.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </>
    );
  }

  function renderReports() {
    return (
      <>
        <div className="admin-title-row">
          <div>
            <h1>📊 Reports</h1>
            <p>Detailed marketplace performance reports</p>
          </div>
        </div>

        <div className="report-tabs">
          <button
            className={reportType === "farmer" ? "active" : ""}
            onClick={() => setReportType("farmer")}
          >
            👨‍🌾 Farmer Report
          </button>

          <button
            className={reportType === "consumer" ? "active" : ""}
            onClick={() => setReportType("consumer")}
          >
            🧑 Consumer Report
          </button>
        </div>

        {reportType === "farmer" ? (
          <div className="admin-card report-card">
            <div className="card-heading">
              <div>
                <h2>👨‍🌾 Farmer Performance Report</h2>

                <p>Sales and product performance of farmers</p>
              </div>
            </div>

            <div className="table-wrap">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Farmer</th>
                    <th>Region</th>
                    <th>Products</th>
                    <th>Total Sales</th>
                    <th>Status</th>
                  </tr>
                </thead>

                <tbody>
                  {FARMERS.map((farmer) => (
                    <tr key={farmer.id}>
                      <td>
                        <strong>{farmer.name}</strong>
                      </td>

                      <td>{farmer.location}</td>

                      <td>{farmer.products}</td>

                      <td>₹{farmer.sales.toLocaleString()}</td>

                      <td>
                        <span className="status completed">
                          {farmer.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="admin-card report-card">
            <div className="card-heading">
              <div>
                <h2>🧑 Consumer Purchase Report</h2>

                <p>Consumer orders and purchase activity</p>
              </div>
            </div>

            <div className="table-wrap">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Consumer</th>
                    <th>Email</th>
                    <th>Total Orders</th>
                    <th>Total Spent</th>
                    <th>Status</th>
                  </tr>
                </thead>

                <tbody>
                  {CONSUMERS.map((consumer) => (
                    <tr key={consumer.id}>
                      <td>
                        <strong>{consumer.name}</strong>
                      </td>

                      <td>{consumer.email}</td>

                      <td>{consumer.orders}</td>

                      <td>₹{consumer.spent.toLocaleString()}</td>

                      <td>
                        <span className="status completed">
                          {consumer.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* REPORT SUMMARY */}

        <div className="report-summary">
          <div>
            <span>Total Farmers</span>
            <strong>{totalFarmers}</strong>
          </div>

          <div>
            <span>Total Consumers</span>
            <strong>{totalConsumers}</strong>
          </div>

          <div>
            <span>Total Products</span>
            <strong>{totalProducts}</strong>
          </div>

          <div>
            <span>Completed Sales</span>
            <strong>₹{totalSales.toLocaleString()}</strong>
          </div>
        </div>
      </>
    );
  }

  function renderContent() {
    switch (section) {
      case "dashboard":
        return renderDashboard();

      case "users":
        return renderUsers();

      case "products":
        return renderProducts();

      case "orders":
        return renderOrders();

      case "reports":
        return renderReports();

      case "sales":
        return renderDashboard();

      default:
        return renderDashboard();
    }
  }

  return (
    <div className="admin-page">
      {/* TOP HEADER */}

      <header className="admin-header">
        <div className="admin-brand">
          <span className="brand-icon">🌾</span>

          <div>
            <strong>
              Kisaan <em>Bazar</em>
            </strong>

            <small>Admin Panel</small>
          </div>
        </div>

        <div className="admin-header-right">
          <span className="notification">🔔</span>

          <div className="admin-user">
            <div className="admin-avatar">A</div>

            <span>Admin</span>
            <span>⌄</span>
          </div>

          <button className="admin-logout-btn" onClick={logout}>
            Logout
          </button>
        </div>
      </header>

      {/* BODY */}

      <div className="admin-layout">
        {/* SIDEBAR */}

        <aside className="admin-sidebar">
          <div className="sidebar-menu">
            <button
              className={section === "dashboard" ? "active" : ""}
              onClick={() => setSection("dashboard")}
            >
              <span>🏠</span>
              Dashboard
            </button>

            <button
              className={section === "users" ? "active" : ""}
              onClick={() => setSection("users")}
            >
              <span>👥</span>
              Users
            </button>

            <button
              className={section === "products" ? "active" : ""}
              onClick={() => setSection("products")}
            >
              <span>🌾</span>
              Products
            </button>

            <button
              className={section === "orders" ? "active" : ""}
              onClick={() => setSection("orders")}
            >
              <span>📦</span>
              Orders
            </button>

            <button
              className={section === "sales" ? "active" : ""}
              onClick={() => setSection("sales")}
            >
              <span>₹</span>
              Sales
            </button>

            <button
              className={section === "reports" ? "active" : ""}
              onClick={() => setSection("reports")}
            >
              <span>📊</span>
              Reports
              <span className="menu-arrow">▾</span>
            </button>

            <button>
              <span>⚙️</span>
              Settings
            </button>
          </div>

          {/* SIDEBAR BOTTOM */}

          <div className="sidebar-bottom">
            <div className="farmer-illustration">👨‍🌾🌾</div>

            <strong>Empowering Farmers</strong>

            <span>Building a Better Tomorrow</span>
          </div>
        </aside>

        {/* MAIN CONTENT */}

        <main className="admin-main">{renderContent()}</main>
      </div>

      {/* FOOTER */}

      <footer className="admin-footer">
        <span>Kisaan Bazar • Admin Panel</span>

        <span>Better Farming • Better Food • A Stronger India 🌾</span>
      </footer>
    </div>
  );
}

export default AdminPage;
