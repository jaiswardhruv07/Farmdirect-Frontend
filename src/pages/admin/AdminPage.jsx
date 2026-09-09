import { useState } from "react";
import "./adminpage.css";
import { useAuth } from "../../context/AuthContext";
import tomato from "../../assets/tomato.jpg";
import mango from "../../assets/mango.jpg";
import milk from "../../assets/milk.jpg";
import spinach from "../../assets/spinach.jpg";
import banana from "../../assets/banana.jpg";
import wheat from "../../assets/wheat.jpg";
import logo from "../../assets/less.webp";

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
    image: tomato,
    region: "Maharashtra",
    status: "In Stock",
    detailPrice: 42,
    quantitySold: "1,240 kg",
    revenue: 52080,
    topRegion: "West Bengal",
    farmers: [
      { name: "Ramesh Kumar", quantity: "420 kg", rating: 4.8 },
      { name: "Sita Ram", quantity: "310 kg", rating: 4.6 },
      { name: "Mohan Lal", quantity: "285 kg", rating: 4.5 }
    ],
    regionalPerformance: [
      { region: "West Bengal", sold: "420 kg", revenue: "₹17,640" },
      { region: "Bihar", sold: "310 kg", revenue: "₹13,020" },
      { region: "Uttar Pradesh", sold: "285 kg", revenue: "₹11,970" }
    ]
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
    image: mango,
    region: "Delhi NCR",
    status: "Low Stock",
    detailPrice: 85,
    quantitySold: "890 kg",
    revenue: 75650,
    topRegion: "West Bengal",
    farmers: [
      { name: "Ramesh Kumar", quantity: "360 kg", rating: 4.9 },
      { name: "Mohan Lal", quantity: "280 kg", rating: 4.7 },
      { name: "Sita Ram", quantity: "190 kg", rating: 4.5 }
    ],
    regionalPerformance: [
      { region: "West Bengal", sold: "360 kg", revenue: "₹30,600" },
      { region: "Uttar Pradesh", sold: "280 kg", revenue: "₹23,800" },
      { region: "Bihar", sold: "190 kg", revenue: "₹16,150" }
    ]
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
    image: milk,
    region: "Mumbai",
    status: "In Stock",
    detailPrice: 58,
    quantitySold: "1,560 L",
    revenue: 90480,
    topRegion: "Punjab",
    farmers: [
      { name: "Hari Singh", quantity: "520 L", rating: 4.8 },
      { name: "Sunita Devi", quantity: "410 L", rating: 4.6 },
      { name: "Ramesh Kumar", quantity: "350 L", rating: 4.5 }
    ],
    regionalPerformance: [
      { region: "Punjab", sold: "520 L", revenue: "₹30,160" },
      { region: "Jharkhand", sold: "410 L", revenue: "₹23,780" },
      { region: "West Bengal", sold: "350 L", revenue: "₹20,300" }
    ]
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
    image: spinach,
    region: "Pune",
    status: "Low Stock",
    detailPrice: 32,
    quantitySold: "740 kg",
    revenue: 23680,
    topRegion: "Bihar",
    farmers: [
      { name: "Sita Ram", quantity: "280 kg", rating: 4.7 },
      { name: "Sunita Devi", quantity: "190 kg", rating: 4.5 },
      { name: "Mohan Lal", quantity: "150 kg", rating: 4.4 }
    ],
    regionalPerformance: [
      { region: "Bihar", sold: "280 kg", revenue: "₹8,960" },
      { region: "Jharkhand", sold: "190 kg", revenue: "₹6,080" },
      { region: "Uttar Pradesh", sold: "150 kg", revenue: "₹4,800" }
    ]
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
    image: banana,
    region: "Bengaluru",
    status: "Low Stock",
    detailPrice: 48,
    quantitySold: "1,120 kg",
    revenue: 53760,
    topRegion: "Bihar",
    farmers: [
      { name: "Sita Ram", quantity: "390 kg", rating: 4.6 },
      { name: "Ramesh Kumar", quantity: "320 kg", rating: 4.5 },
      { name: "Sunita Devi", quantity: "240 kg", rating: 4.4 }
    ],
    regionalPerformance: [
      { region: "Bihar", sold: "390 kg", revenue: "₹18,720" },
      { region: "West Bengal", sold: "320 kg", revenue: "₹15,360" },
      { region: "Jharkhand", sold: "240 kg", revenue: "₹11,520" }
    ]
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
    image: wheat,
    region: "Kolkata",
    status: "Out of Stock",
    detailPrice: 38,
    quantitySold: "1,980 kg",
    revenue: 75240,
    topRegion: "Punjab",
    farmers: [
      { name: "Hari Singh", quantity: "720 kg", rating: 4.9 },
      { name: "Mohan Lal", quantity: "510 kg", rating: 4.7 },
      { name: "Sita Ram", quantity: "420 kg", rating: 4.6 }
    ],
    regionalPerformance: [
      { region: "Punjab", sold: "720 kg", revenue: "₹27,360" },
      { region: "Uttar Pradesh", sold: "510 kg", revenue: "₹19,380" },
      { region: "Bihar", sold: "420 kg", revenue: "₹15,960" }
    ]
  }
];


const REGIONAL_DATA = [
  { region: "West Bengal", farmers: 32, fpos: 5, products: 148, orders: 620, sales: 480000 },
  { region: "Bihar", farmers: 26, fpos: 4, products: 112, orders: 510, sales: 390000 },
  { region: "Uttar Pradesh", farmers: 24, fpos: 3, products: 105, orders: 470, sales: 350000 },
  { region: "Jharkhand", farmers: 18, fpos: 3, products: 82, orders: 390, sales: 280000 },
  { region: "Punjab", farmers: 20, fpos: 3, products: 93, orders: 490, sales: 350000 }
];

const TOP_SELLING_REGION = [...REGIONAL_DATA].sort(
  (a, b) => b.sales - a.sales
)[0]?.region || "N/A";

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
  const [salesPeriod, setSalesPeriod] = useState("month");
  const [orderFilter, setOrderFilter] = useState("all");
  const [stockFilter, setStockFilter] = useState("all");
  const [profileOpen, setProfileOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

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
  const closedStockProducts = PRODUCTS.filter((product) => product.stock === 0);
  const lowStockProducts = PRODUCTS.filter(
    (product) =>
      product.status === "Low Stock" || product.status === "Out of Stock"
  );
  const filteredOrders =
    orderFilter === "pending" ? pendingOrders :
    orderFilter === "closed" ? ORDERS.filter((o) => o.status === "Completed") : ORDERS;
  const filteredStockProducts =
    stockFilter === "closed" ? closedStockProducts :
    stockFilter === "low" ? PRODUCTS.filter((p) => p.status === "Low Stock") : lowStockProducts;
  const monthlySales = [18,25,20,29,34,39,32,30,42,35,44,50];
  const yearlySales = [120,145,132,168,190,215];
  const salesLabels = salesPeriod === "month"
    ? ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
    : ["2021","2022","2023","2024","2025","2026"];
  const salesValues = salesPeriod === "month" ? monthlySales : yearlySales;

  function renderDashboard() {
    return (
      <>
        <div className="admin-title-row">
          <div>
            <h1>Admin Dashboard</h1>
            <p>Complete overview of your Kisaan Connect marketplace</p>
          </div>

          <div className="admin-date">
            📅 Today
            <span>6 September 2026</span>
          </div>
        </div>

        {/* STAT CARDS */}

        <div className="admin-stats">
          <div className="admin-stat-card clickable-stat" onClick={() => { setUserType("all"); setSection("users"); }}>
            <div className="stat-icon green">👥</div>

            <div>
              <span>Total Users</span>
              <strong>{totalUsers}</strong>
              <small>↑ 12% this month</small>
            </div>
          </div>

          <div className="admin-stat-card clickable-stat" onClick={() => { setUserType("farmers"); setSection("users"); }}>
            <div className="stat-icon green">👨‍🌾</div>

            <div>
              <span>Total Farmers</span>
              <strong>{totalFarmers}</strong>
              <small>↑ 8% this month</small>
            </div>
          </div>

          <div className="admin-stat-card clickable-stat" onClick={() => { setUserType("consumers"); setSection("users"); }}>
            <div className="stat-icon gold">🧑</div>

            <div>
              <span>Total Consumers</span>
              <strong>{totalConsumers}</strong>
              <small>↑ 15% this month</small>
            </div>
          </div>

          <div className="admin-stat-card clickable-stat" onClick={() => setSection("products")}>
            <div className="stat-icon green">🌾</div>

            <div>
              <span>Total Products</span>
              <strong>{totalProducts}</strong>
              <small>↑ 6% this month</small>
            </div>
          </div>

          <div className="admin-stat-card clickable-stat" onClick={() => setSection("orders")}>
            <div className="stat-icon gold">📦</div>

            <div>
              <span>Total Orders</span>
              <strong>{totalOrders}</strong>
              <small>↑ 18% this month</small>
            </div>
          </div>

          <div className="admin-stat-card clickable-stat" onClick={() => setSection("sales")}>
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

              <div className="sales-period-toggle">
                <button className={salesPeriod === "month" ? "active" : ""} onClick={() => setSalesPeriod("month")}>Monthly</button>
                <button className={salesPeriod === "year" ? "active" : ""} onClick={() => setSalesPeriod("year")}>Yearly</button>
              </div>
            </div>

            <div className="bar-chart sales-page-chart">
              {salesValues.map((value, index) => (
                <div className="bar-column" key={salesLabels[index]}>
                  <span>₹{value}k</span>
                  <div className="bar" style={{ height: `${Math.max(value * (salesPeriod === "month" ? 3.2 : 2.6), 8)}px` }} />
                  <small>{salesLabels[index]}</small>
                </div>
              ))}
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

                  <div className="product-mini"><img src={product.image} alt={product.name} /></div>

                  <div className="top-info">
                    <strong>{product.name}</strong>
                    <span>Top Region: {product.region}</span>
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

          <div className="admin-card clickable-card" onClick={() => { setOrderFilter("pending"); setSection("orders"); }}>
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

          <div className="admin-card clickable-card" onClick={() => { setStockFilter("closed"); setSection("products"); }}>
            <div className="card-heading">
              <div>
                <h2>⚠️ Low / Closed Stock</h2>
                <p>Click to view closed stock</p>
              </div>

              <button
                className="view-btn"
                onClick={() => setSection("products")}
              >
                View All →
              </button>
            </div>

            <div className="low-stock-list">
              {filteredStockProducts.map((product) => (
                <div className="low-stock-item" key={product.id}>
                  <div className="product-mini"><img src={product.image} alt={product.name} /></div>

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
    if (selectedProduct) {
      return renderProductDetails();
    }

    return (
      <>
        <div className="admin-title-row">
          <div>
            <h1>🌾 Products</h1>
            <p>All products listed by farmers • Click a product for complete details</p>
          </div>
        </div>

        <div className="filter-tabs">
          <button className={stockFilter === "all" ? "active" : ""} onClick={() => setStockFilter("all")}>All Products</button>
          <button className={stockFilter === "low" ? "active" : ""} onClick={() => setStockFilter("low")}>Low Stock</button>
          <button className={stockFilter === "closed" ? "active" : ""} onClick={() => setStockFilter("closed")}>Closed Stock ({closedStockProducts.length})</button>
        </div>

        <div className="admin-card">
          <div className="card-heading">
            <div>
              <h2>Product List</h2>
              <p>Click any product to see ratings, farmers, revenue and regional performance.</p>
            </div>
          </div>

          <div className="table-wrap">
            <table className="admin-table product-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Category</th>
                  <th>Top Region</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Sold</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {(stockFilter === "all" ? PRODUCTS : filteredStockProducts).map((product) => (
                  <tr
                    key={product.id}
                    className="product-row-clickable"
                    onClick={() => setSelectedProduct(product)}
                    title={`View ${product.name} details`}
                  >
                    <td>
                      <div className="table-product">
                        <span className="product-table-image">
                          <img src={product.image} alt={product.name} />
                        </span>
                        <strong>{product.name}</strong>
                      </div>
                    </td>

                    <td>{product.category}</td>
                    <td>{product.topRegion}</td>
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

  function renderProductDetails() {
    const averageRating =
      selectedProduct.farmers.reduce((sum, farmer) => sum + farmer.rating, 0) /
      selectedProduct.farmers.length;

    const totalFarmersForProduct = selectedProduct.farmers.length;

    return (
      <>
        <div className="admin-title-row">
          <div>
            <button
              className="admin-back-btn"
              onClick={() => setSelectedProduct(null)}
            >
              ← Back to Products
            </button>

            <div className="admin-product-detail-header">
              <div className="admin-detail-product-image">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                />
              </div>

              <div>
                <h1>{selectedProduct.name}</h1>
                <p>
                  {selectedProduct.category} • Detailed farmer and regional performance
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="admin-product-detail-stats">
          <div className="admin-detail-stat">
            <span>Average Price</span>
            <strong>₹{selectedProduct.detailPrice}/kg</strong>
          </div>

          <div className="admin-detail-stat">
            <span>Quantity Sold</span>
            <strong>{selectedProduct.quantitySold}</strong>
          </div>

          <div className="admin-detail-stat">
            <span>Total Revenue</span>
            <strong>₹{selectedProduct.revenue.toLocaleString()}</strong>
          </div>

          <div className="admin-detail-stat">
            <span>Total Farmers</span>
            <strong>{totalFarmersForProduct}</strong>
          </div>

          <div className="admin-detail-stat">
            <span>Top Region</span>
            <strong>{selectedProduct.topRegion}</strong>
          </div>
        </div>

        <div className="admin-detail-grid">
          <div className="admin-card">
            <div className="card-heading">
              <div>
                <h2>Top Farmers</h2>
                <p>Farmers selling the highest quantity</p>
              </div>
            </div>

            <div className="admin-top-farmers">
              {selectedProduct.farmers.map((farmer, index) => (
                <div className="admin-top-farmer" key={farmer.name}>
                  <div className="admin-rank">{index + 1}</div>

                  <div className="admin-farmer-avatar">👨‍🌾</div>

                  <div className="admin-top-farmer-info">
                    <strong>{farmer.name}</strong>
                    <span>{farmer.quantity} sold</span>
                  </div>

                  <div className="admin-rating">⭐ {farmer.rating}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="admin-card">
            <div className="card-heading">
              <div>
                <h2>Farmer Ratings</h2>
                <p>Ratings received for this product</p>
              </div>
            </div>

            <div className="admin-rating-summary">
              <strong>{averageRating.toFixed(1)}</strong>

              <div>
                <div className="admin-stars">★★★★★</div>
                <span>Average farmer product rating</span>
              </div>
            </div>

            <div className="admin-rating-bars">
              {selectedProduct.farmers.map((farmer) => (
                <div className="admin-rating-row" key={farmer.name}>
                  <span>{farmer.name}</span>

                  <div className="admin-rating-track">
                    <div
                      className="admin-rating-fill"
                      style={{ width: `${(farmer.rating / 5) * 100}%` }}
                    />
                  </div>

                  <strong>{farmer.rating}</strong>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="admin-card">
          <div className="card-heading">
            <div>
              <h2>Regional Performance</h2>
              <p>How this product is performing across regions</p>
            </div>
          </div>

          <div className="table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Region</th>
                  <th>Quantity Sold</th>
                  <th>Revenue</th>
                </tr>
              </thead>

              <tbody>
                {selectedProduct.regionalPerformance.map((region) => (
                  <tr key={region.region}>
                    <td>
                      <strong>{region.region}</strong>
                    </td>
                    <td>{region.sold}</td>
                    <td>{region.revenue}</td>
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
          <div className="admin-stat-card clickable-stat" onClick={() => setSection("orders")}>
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

        <div className="filter-tabs">
          <button className={orderFilter === "all" ? "active" : ""} onClick={() => setOrderFilter("all")}>All Orders</button>
          <button className={orderFilter === "pending" ? "active" : ""} onClick={() => setOrderFilter("pending")}>Pending Orders ({pendingOrders.length})</button>
          <button className={orderFilter === "closed" ? "active" : ""} onClick={() => setOrderFilter("closed")}>Closed Orders ({ORDERS.filter((o) => o.status === "Completed").length})</button>
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
                {filteredOrders.map((order) => (
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

          <button
            className={reportType === "regional" ? "active" : ""}
            onClick={() => setReportType("regional")}
          >
            📍 Agriculture Report
          </button>

          <button
            className={reportType === "product" ? "active" : ""}
            onClick={() => setReportType("product")}
          >
            🌾 Agriculture Product Report
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

        {reportType === "regional" && (
          <div className="admin-card report-card">
            <div className="card-heading">
              <div>
                <h2>📍 Regional Agriculture Report</h2>
                <p>Farmer participation and marketplace activity by region</p>
              </div>
              <div className="report-highlight">
                <span>Top Region to Sell</span>
                <strong>{TOP_SELLING_REGION}</strong>
              </div>
            </div>

            <div className="table-wrap">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Region</th>
                    <th>Farmers</th>
                    <th>FPOs</th>
                    <th>Products</th>
                    <th>Orders</th>
                    <th>Total Sales</th>
                  </tr>
                </thead>
                <tbody>
                  {REGIONAL_DATA.map((region) => (
                    <tr key={region.region}>
                      <td><strong>{region.region}</strong></td>
                      <td>{region.farmers}</td>
                      <td>{region.fpos}</td>
                      <td>{region.products}</td>
                      <td>{region.orders}</td>
                      <td>₹{region.sales.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {reportType === "product" && (
          <div className="admin-card report-card">
            <div className="card-heading">
              <div>
                <h2>🌾 Agricultural Product Report</h2>
                <p>Product categories, availability, top region and revenue</p>
              </div>
            </div>

            <div className="table-wrap">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Category</th>
                    <th>Top Region to Sell</th>
                    <th>Price</th>
                    <th>Stock</th>
                    <th>Sold</th>
                    <th>Revenue</th>
                  </tr>
                </thead>
                <tbody>
                  {PRODUCTS.map((product) => (
                    <tr key={product.id}>
                      <td>
                        <div className="table-product">
                          <span className="product-table-image">
                            <img src={product.image} alt={product.name} />
                          </span>
                          <strong>{product.name}</strong>
                        </div>
                      </td>
                      <td>{product.category}</td>
                      <td><strong>{TOP_SELLING_REGION}</strong></td>
                      <td>₹{product.price}/kg</td>
                      <td>{product.stock}</td>
                      <td>{product.sold}</td>
                      <td>₹{(product.price * product.sold).toLocaleString()}</td>
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

  function renderSales() {
    return (
      <>
        <div className="admin-title-row">
          <div>
            <h1>₹ Sales</h1>
            <p>Total sales performance of Kisaan Connect</p>
          </div>
          <div className="sales-total-box">
            <span>Total Sales</span>
            <strong>₹{totalSales.toLocaleString()}</strong>
          </div>
        </div>

        <div className="admin-card sales-card sales-page-only">
          <div className="card-heading">
            <div>
              <h2>📊 Sales Overview</h2>
              <p>Revenue trends</p>
            </div>

            <div className="sales-period-toggle">
              <button className={salesPeriod === "month" ? "active" : ""} onClick={() => setSalesPeriod("month")}>Monthly</button>
              <button className={salesPeriod === "year" ? "active" : ""} onClick={() => setSalesPeriod("year")}>Yearly</button>
            </div>
          </div>

          <div className="bar-chart sales-page-chart">
            {salesValues.map((value, index) => (
              <div className="bar-column" key={salesLabels[index]}>
                <span>₹{value}k</span>
                <div className="bar" style={{ height: `${Math.max(value * (salesPeriod === "month" ? 3.2 : 2.6), 8)}px` }} />
                <small>{salesLabels[index]}</small>
              </div>
            ))}
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
        return renderSales();

      default:
        return renderDashboard();
    }
  }

  return (
    <div className="admin-page">
      {/* TOP HEADER */}

      <header className="admin-header">
        <div className="admin-brand">
          <span className="brand-icon"><img src={logo} alt="Kisaan Connect logo" /></span>

          <div>
            <strong>
              Kisaan <em>Connect</em>
            </strong>

            <small>Admin Panel</small>
          </div>
        </div>

        <div className="admin-header-right">
          <span className="notification">🔔</span>

          <div style={{ position: "relative" }}>
            <button className="admin-profile-trigger" onClick={() => setProfileOpen((open) => !open)}>
              <div className="admin-user">
                <div className="admin-avatar">{(user?.name || user?.email || "A").charAt(0).toUpperCase()}</div>
                <span>{user?.name || "Admin"}</span>
                <span>⌄</span>
              </div>
            </button>
            {profileOpen && (
              <div className="admin-profile-card">
                <div className="admin-profile-avatar">{(user?.name || user?.email || "A").charAt(0).toUpperCase()}</div>
                <strong>{user?.name || "Admin"}</strong>
                <span>{user?.email || localStorage.getItem("userEmail") || "No email available"}</span>
              </div>
            )}
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
        <span>Kisaan Connect • Admin Panel</span>

        <span>Better Farming • Better Food • A Stronger India 🌾</span>
      </footer>
    </div>
  );
}

export default AdminPage;
