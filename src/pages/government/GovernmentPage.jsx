import { useState } from "react";
import "./GovermentPage.css";
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
    district: "Nadia",
    products: 8,
    orders: 42,
    sales: 48200,
    status: "Active",
  },
  {
    id: "F002",
    name: "Sita Ram",
    location: "Bihar",
    district: "Patna",
    products: 6,
    orders: 28,
    sales: 32450,
    status: "Active",
  },
  {
    id: "F003",
    name: "Mohan Lal",
    location: "Uttar Pradesh",
    district: "Lucknow",
    products: 5,
    orders: 24,
    sales: 28760,
    status: "Active",
  },
  {
    id: "F004",
    name: "Sunita Devi",
    location: "Jharkhand",
    district: "Ranchi",
    products: 4,
    orders: 18,
    sales: 18320,
    status: "Active",
  },
  {
    id: "F005",
    name: "Hari Singh",
    location: "Punjab",
    district: "Ludhiana",
    products: 7,
    orders: 16,
    sales: 12680,
    status: "Active",
  },
];

const CONSUMERS = [
  {
    id: "C001",
    name: "Rahul Sharma",
    email: "rahul@gmail.com",
    location: "Kolkata",
    orders: 12,
    spent: 4260,
    status: "Active",
  },
  {
    id: "C002",
    name: "Priya Singh",
    email: "priya@gmail.com",
    location: "Patna",
    orders: 9,
    spent: 3180,
    status: "Active",
  },
  {
    id: "C003",
    name: "Anita Verma",
    email: "anita@gmail.com",
    location: "Lucknow",
    orders: 7,
    spent: 2860,
    status: "Active",
  },
  {
    id: "C004",
    name: "Suresh Yadav",
    email: "suresh@gmail.com",
    location: "Ranchi",
    orders: 6,
    spent: 2420,
    status: "Active",
  },
  {
    id: "C005",
    name: "Neha Patel",
    email: "neha@gmail.com",
    location: "Chandigarh",
    orders: 5,
    spent: 1980,
    status: "Active",
  },
];

const FPOS = [
  {
    id: "FPO001",
    name: "Bengal Farmers FPO",
    location: "West Bengal",
    members: 32,
    products: 24,
    status: "Active",
  },
  {
    id: "FPO002",
    name: "Bihar Agro Producers FPO",
    location: "Bihar",
    members: 28,
    products: 19,
    status: "Active",
  },
  {
    id: "FPO003",
    name: "UP Green Farmers FPO",
    location: "Uttar Pradesh",
    members: 25,
    products: 17,
    status: "Active",
  },
  {
    id: "FPO004",
    name: "Jharkhand Rural FPO",
    location: "Jharkhand",
    members: 21,
    products: 14,
    status: "Active",
  },
  {
    id: "FPO005",
    name: "Punjab Harvest FPO",
    location: "Punjab",
    members: 30,
    products: 22,
    status: "Active",
  },
];

const PRODUCTS = [
  {
    id: 1,
    image: tomato,
    name: "Tomatoes",
    category: "Vegetables",
    farmer: "Ramesh Kumar",
    region: "West Bengal",
    price: 30,
    stock: 20,
    sold: 42,
    orders: 42,
    revenue: 1260,
    emoji: "🍅",
    status: "In Stock",
     detailPrice: 42,
    quantitySold: "1,240 kg",
    detailRevenue: 52080,
    topRegion: "West Bengal",
    farmers: [{ name: "Ramesh Kumar", quantity: "420 kg", rating: 4.8 }, { name: "Sita Ram", quantity: "310 kg", rating: 4.6 }, { name: "Mohan Lal", quantity: "285 kg", rating: 4.5 }],
    regional: [{ region: "West Bengal", quantity: "420 kg", revenue: "₹17,640" }, { region: "Bihar", quantity: "310 kg", revenue: "₹13,020" }, { region: "Uttar Pradesh", quantity: "285 kg", revenue: "₹11,970" }],
  },
  {
    id: 2,
    image: mango,
    name: "Mangoes",
    category: "Fruits",
    farmer: "Sita Ram",
    region: "Bihar",
    price: 80,
    stock: 5,
    sold: 28,
    orders: 28,
    revenue: 2240,
    emoji: "🥭",
    status: "Low Stock",
     detailPrice: 85,
    quantitySold: "890 kg",
    detailRevenue: 75650,
    topRegion: "West Bengal",
    farmers: [{ name: "Ramesh Kumar", quantity: "360 kg", rating: 4.9 }, { name: "Mohan Lal", quantity: "280 kg", rating: 4.7 }, { name: "Sita Ram", quantity: "190 kg", rating: 4.5 }],
    regional: [{ region: "West Bengal", quantity: "360 kg", revenue: "₹30,600" }, { region: "Uttar Pradesh", quantity: "280 kg", revenue: "₹23,800" }, { region: "Bihar", quantity: "190 kg", revenue: "₹16,150" }],
  },
  {
    id: 3,
    image: milk,
    name: "Milk",
    category: "Dairy",
    farmer: "Mohan Lal",
    region: "Uttar Pradesh",
    price: 50,
    stock: 15,
    sold: 24,
    orders: 24,
    revenue: 1200,
    emoji: "🥛",
    status: "In Stock",
     detailPrice: 58,
    quantitySold: "1,560 L",
    detailRevenue: 90480,
    topRegion: "Punjab",
    farmers: [{ name: "Hari Singh", quantity: "520 L", rating: 4.8 }, { name: "Sunita Devi", quantity: "410 L", rating: 4.6 }, { name: "Ramesh Kumar", quantity: "350 L", rating: 4.5 }],
    regional: [{ region: "Punjab", quantity: "520 L", revenue: "₹30,160" }, { region: "Jharkhand", quantity: "410 L", revenue: "₹23,780" }, { region: "West Bengal", quantity: "350 L", revenue: "₹20,300" }],
  },
  {
    id: 4,
    image: spinach,
    name: "Spinach",
    category: "Vegetables",
    farmer: "Sunita Devi",
    region: "Jharkhand",
    price: 20,
    stock: 8,
    sold: 18,
    orders: 18,
    revenue: 360,
    emoji: "🥬",
    status: "Low Stock",
     detailPrice: 32,
    quantitySold: "740 kg",
    detailRevenue: 23680,
    topRegion: "Bihar",
    farmers: [{ name: "Sita Ram", quantity: "280 kg", rating: 4.7 }, { name: "Sunita Devi", quantity: "190 kg", rating: 4.5 }, { name: "Mohan Lal", quantity: "150 kg", rating: 4.4 }],
    regional: [{ region: "Bihar", quantity: "280 kg", revenue: "₹8,960" }, { region: "Jharkhand", quantity: "190 kg", revenue: "₹6,080" }, { region: "Uttar Pradesh", quantity: "150 kg", revenue: "₹4,800" }],
  },
  {
    id: 5,
    image: banana,
    name: "Bananas",
    category: "Fruits",
    farmer: "Hari Singh",
    region: "Punjab",
    price: 40,
    stock: 3,
    sold: 16,
    orders: 16,
    revenue: 640,
    emoji: "🍌",
    status: "Low Stock",
     detailPrice: 48,
    quantitySold: "1,120 kg",
    detailRevenue: 53760,
    topRegion: "Bihar",
    farmers: [{ name: "Sita Ram", quantity: "390 kg", rating: 4.6 }, { name: "Ramesh Kumar", quantity: "320 kg", rating: 4.5 }, { name: "Sunita Devi", quantity: "240 kg", rating: 4.4 }],
    regional: [{ region: "Bihar", quantity: "390 kg", revenue: "₹18,720" }, { region: "West Bengal", quantity: "320 kg", revenue: "₹15,360" }, { region: "Jharkhand", quantity: "240 kg", revenue: "₹11,520" }],
  },
  {
    id: 6,
    image: wheat,
    name: "Wheat",
    category: "Grains",
    farmer: "Ramesh Kumar",
    region: "West Bengal",
    price: 25,
    stock: 0,
    sold: 12,
    orders: 12,
    revenue: 300,
    emoji: "🌾",
    status: "Out of Stock",
     detailPrice: 38,
    quantitySold: "1,980 kg",
    detailRevenue: 75240,
    topRegion: "Punjab",
    farmers: [{ name: "Hari Singh", quantity: "720 kg", rating: 4.9 }, { name: "Mohan Lal", quantity: "510 kg", rating: 4.7 }, { name: "Sita Ram", quantity: "420 kg", rating: 4.6 }],
    regional: [{ region: "Punjab", quantity: "720 kg", revenue: "₹27,360" }, { region: "Uttar Pradesh", quantity: "510 kg", revenue: "₹19,380" }, { region: "Bihar", quantity: "420 kg", revenue: "₹15,960" }],
  },
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
    date: "Today",
  },
  {
    id: "#008",
    consumer: "Priya Singh",
    farmer: "Sita Ram",
    product: "Mangoes",
    quantity: "1 kg",
    total: 80,
    status: "New Order",
    date: "Today",
  },
  {
    id: "#009",
    consumer: "Anita Verma",
    farmer: "Mohan Lal",
    product: "Spinach",
    quantity: "3 kg",
    total: 60,
    status: "Completed",
    date: "Yesterday",
  },
  {
    id: "#010",
    consumer: "Suresh Yadav",
    farmer: "Ramesh Kumar",
    product: "Milk",
    quantity: "2 L",
    total: 100,
    status: "Completed",
    date: "Yesterday",
  },
  {
    id: "#011",
    consumer: "Neha Patel",
    farmer: "Sita Ram",
    product: "Bananas",
    quantity: "2 kg",
    total: 80,
    status: "New Order",
    date: "2 days ago",
  },
];

const REGIONAL_DATA = [
  {
    region: "West Bengal",
    farmers: 32,
    fpos: 5,
    products: 148,
    orders: 620,
    sales: 480000,
  },
  {
    region: "Bihar",
    farmers: 26,
    fpos: 4,
    products: 112,
    orders: 510,
    sales: 390000,
  },
  {
    region: "Uttar Pradesh",
    farmers: 24,
    fpos: 3,
    products: 105,
    orders: 470,
    sales: 350000,
  },
  {
    region: "Jharkhand",
    farmers: 18,
    fpos: 3,
    products: 82,
    orders: 390,
    sales: 280000,
  },
  {
    region: "Punjab",
    farmers: 20,
    fpos: 3,
    products: 93,
    orders: 490,
    sales: 350000,
  },
];

const TOP_SELLING_REGION = [...REGIONAL_DATA].sort(
  (a, b) => b.sales - a.sales
)[0]?.region || "N/A";

const MONTHLY_SALES = [
  { month: "Jan", value: 18 },
  { month: "Feb", value: 25 },
  { month: "Mar", value: 20 },
  { month: "Apr", value: 29 },
  { month: "May", value: 34 },
  { month: "Jun", value: 39 },
  { month: "Jul", value: 32 },
  { month: "Aug", value: 30 },
  { month: "Sep", value: 42 },
  { month: "Oct", value: 35 },
  { month: "Nov", value: 44 },
  { month: "Dec", value: 50 },
];

function GovernmentPage({ user, onNavigate }) {
  const {logout}=useAuth();
  const [section, setSection] = useState("dashboard");
  const [userType, setUserType] = useState("all");
  const [reportType, setReportType] = useState("farmer");
  const [orderStatus, setOrderStatus] = useState("all");
  const [profileOpen, setProfileOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const totalFarmers = 120;
  const totalFPOs = 18;
  const totalConsumers = 85;
  const totalRegions = 12;
  const totalProducts = 540;
  const totalOrders = 2480;
  const totalSales = 1860000;

  const pendingOrders = ORDERS.filter(
    (order) => order.status === "New Order"
  );

  const filteredOrders =
    orderStatus === "pending"
      ? ORDERS.filter((order) => order.status === "New Order")
      : orderStatus === "completed"
      ? ORDERS.filter((order) => order.status === "Completed")
      : ORDERS;

  function goToSection(name) {
    setSection(name);
    setSelectedProduct(null);
    setProfileOpen(false);
  }

  function renderDashboard() {
    return (
      <>
        <div className="gov-title-row">
          <div>
            <h1>Government Dashboard</h1>
            <p>
              Agricultural marketplace and farmer activity overview
            </p>
          </div>

          <div className="gov-date">
            📅 Today
            <span>6 September 2026</span>
          </div>
        </div>

        <div className="gov-stats">
          <button
            className="gov-stat-card"
            onClick={() => {
              setSection("users");
              setUserType("farmers");
            }}
          >
            <div className="gov-stat-icon green">👨‍🌾</div>
            <div>
              <span>Total Farmers</span>
              <strong>{totalFarmers}</strong>
              <small>View farmer information →</small>
            </div>
          </button>

          <button
            className="gov-stat-card"
            onClick={() => {
              setSection("users");
              setUserType("fpos");
            }}
          >
            <div className="gov-stat-icon gold">🏢</div>
            <div>
              <span>Total FPOs</span>
              <strong>{totalFPOs}</strong>
              <small>View FPO information →</small>
            </div>
          </button>

          <button
            className="gov-stat-card"
            onClick={() => {
              setSection("users");
              setUserType("consumers");
            }}
          >
            <div className="gov-stat-icon gold">🧑</div>
            <div>
              <span>Total Consumers</span>
              <strong>{totalConsumers}</strong>
              <small>View consumer information →</small>
            </div>
          </button>

          <button
            className="gov-stat-card"
            onClick={() => setSection("reports")}
          >
            <div className="gov-stat-icon green">📍</div>
            <div>
              <span>Regions Covered</span>
              <strong>{totalRegions}</strong>
              <small>View regional report →</small>
            </div>
          </button>

          <button
            className="gov-stat-card"
            onClick={() => setSection("products")}
          >
            <div className="gov-stat-icon green">🌾</div>
            <div>
              <span>Products Listed</span>
              <strong>{totalProducts}</strong>
              <small>View product registry →</small>
            </div>
          </button>

          <button
            className="gov-stat-card"
            onClick={() => setSection("sales")}
          >
            <div className="gov-stat-icon gold">₹</div>
            <div>
              <span>Total Farmer Sales</span>
              <strong>₹18.6L</strong>
              <small>View sales graph →</small>
            </div>
          </button>
        </div>

        <div className="gov-main-grid">
          <div className="gov-card gov-welcome-card">
            <div>
              <span className="gov-eyebrow">Government Monitoring</span>
              <h2>
                Welcome, {user?.name || "Government Officer"} 👋
              </h2>
              <p>
                Monitor farmers, FPOs, consumers, products, orders,
                regional activity and farmer revenue from one place.
              </p>
            </div>

            <div className="gov-welcome-icon">🏛️</div>
          </div>

          <div className="gov-card">
            <div className="gov-card-heading">
              <div>
                <h2>📊 Sales Overview</h2>
                <p>Farmer sales trend throughout the year</p>
              </div>
              <button
                className="gov-view-btn"
                onClick={() => setSection("sales")}
              >
                Details →
              </button>
            </div>

            <div className="gov-bar-chart">
              {MONTHLY_SALES.map((item) => (
                <div className="gov-bar-column" key={item.month}>
                  <span>₹{item.value}k</span>

                  <div
                    className="gov-bar"
                    style={{
                      height: `${item.value * 3.2}px`,
                    }}
                  />

                  <small>{item.month}</small>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="gov-card">
          <div className="gov-card-heading">
            <div>
              <h2>📍 Regional Agriculture Report</h2>
              <p>
                Farmer participation and marketplace activity by region
              </p>
            </div>

            <button
              className="gov-view-btn"
              onClick={() => setSection("reports")}
            >
              Full Report →
            </button>
          </div>

          <div className="gov-summary-row">
            <div>
              <span>Total Farmers</span>
              <strong>120</strong>
            </div>

            <div>
              <span>Total FPOs</span>
              <strong>18</strong>
            </div>

            <div>
              <span>Regions</span>
              <strong>12</strong>
            </div>

            <div>
              <span>Total Sales</span>
              <strong>₹18.6L</strong>
            </div>
          </div>

          <div className="gov-table-wrap">
            <table className="gov-table">
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
                    <td>
                      <strong>{region.region}</strong>
                    </td>
                    <td>{region.farmers}</td>
                    <td>{region.fpos}</td>
                    <td>{region.products}</td>
                    <td>{region.orders}</td>
                    <td>
                      ₹{region.sales.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="gov-card">
          <div className="gov-card-heading">
            <div>
              <h2>🌾 Agricultural Product Report</h2>
              <p>
                Product categories, availability and farmer contribution
              </p>
            </div>

            <button
              className="gov-view-btn"
              onClick={() => setSection("products")}
            >
              View Products →
            </button>
          </div>

          <div className="gov-product-mini-grid">
            {PRODUCTS.map((product) => (
              <div
                  className="gov-product-mini-card gov-product-mini-clickable"
                  key={product.id}
                  onClick={() => {
                    setSection("products");
                    setSelectedProduct(product);
                  }}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      setSection("products");
                      setSelectedProduct(product);
                    }
                  }}
                >
                <div className="gov-product-icon">
                  <img src={product.image} alt={product.name} />
                </div>

                <div>
                  <strong>{product.name}</strong>
                  <span>
                    {product.category} • {product.region}
                  </span>
                </div>

                <strong className="gov-mini-price">
                  ₹{product.price}
                </strong>
              </div>
            ))}
          </div>
        </div>

        <div className="gov-card">
          <div className="gov-card-heading">
            <div>
              <h2>📦 Marketplace Activity</h2>
              <p>Current marketplace impact indicators</p>
            </div>
          </div>

          <div className="gov-impact-grid">
            <div>
              <strong>120+</strong>
              <span>Farmers connected directly</span>
            </div>

            <div>
              <strong>₹18.6L</strong>
              <span>Farmer sales generated</span>
            </div>

            <div>
              <strong>2,480+</strong>
              <span>Marketplace orders</span>
            </div>

            <div>
              <strong>540+</strong>
              <span>Agricultural products listed</span>
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
    } else if (userType === "fpos") {
      users = FPOS;
    }

    return (
      <>
        <div className="gov-title-row">
          <div>
            <h1>👥 Users</h1>
            <p>
              Government view of farmers, FPOs and consumers
            </p>
          </div>
        </div>

        <div className="gov-filter-tabs">
          <button
            className={userType === "all" ? "active" : ""}
            onClick={() => setUserType("all")}
          >
            All Users
          </button>

          <button
            className={userType === "farmers" ? "active" : ""}
            onClick={() => setUserType("farmers")}
          >
            👨‍🌾 Farmers ({totalFarmers})
          </button>

          <button
            className={userType === "fpos" ? "active" : ""}
            onClick={() => setUserType("fpos")}
          >
            🏢 FPOs ({totalFPOs})
          </button>

          <button
            className={userType === "consumers" ? "active" : ""}
            onClick={() => setUserType("consumers")}
          >
            🧑 Consumers ({totalConsumers})
          </button>
        </div>

        {userType === "all" ? (
          <div className="gov-user-summary-grid">
            <button
              className="gov-user-summary-card"
              onClick={() => setUserType("farmers")}
            >
              <div>👨‍🌾</div>
              <strong>{totalFarmers}</strong>
              <span>Farmers</span>
              <small>View farmer accounts →</small>
            </button>

            <button
              className="gov-user-summary-card"
              onClick={() => setUserType("fpos")}
            >
              <div>🏢</div>
              <strong>{totalFPOs}</strong>
              <span>FPOs</span>
              <small>View FPO accounts →</small>
            </button>

            <button
              className="gov-user-summary-card"
              onClick={() => setUserType("consumers")}
            >
              <div>🧑</div>
              <strong>{totalConsumers}</strong>
              <span>Consumers</span>
              <small>View consumer accounts →</small>
            </button>
          </div>
        ) : (
          <div className="gov-card">
            <div className="gov-table-wrap">
              <table className="gov-table">
                <thead>
                  {userType === "farmers" && (
                    <tr>
                      <th>ID</th>
                      <th>Farmer</th>
                      <th>Region</th>
                      <th>District</th>
                      <th>Products</th>
                      <th>Orders</th>
                      <th>Total Sales</th>
                      <th>Status</th>
                    </tr>
                  )}

                  {userType === "consumers" && (
                    <tr>
                      <th>ID</th>
                      <th>Consumer</th>
                      <th>Email</th>
                      <th>Location</th>
                      <th>Orders</th>
                      <th>Total Spent</th>
                      <th>Status</th>
                    </tr>
                  )}

                  {userType === "fpos" && (
                    <tr>
                      <th>ID</th>
                      <th>FPO Name</th>
                      <th>Location</th>
                      <th>Members</th>
                      <th>Products</th>
                      <th>Status</th>
                    </tr>
                  )}
                </thead>

                <tbody>
                  {userType === "farmers" &&
                    users.map((farmer) => (
                      <tr key={farmer.id}>
                        <td>{farmer.id}</td>
                        <td>
                          <strong>{farmer.name}</strong>
                        </td>
                        <td>{farmer.location}</td>
                        <td>{farmer.district}</td>
                        <td>{farmer.products}</td>
                        <td>{farmer.orders}</td>
                        <td>
                          ₹{farmer.sales.toLocaleString()}
                        </td>
                        <td>
                          <span className="gov-status completed">
                            {farmer.status}
                          </span>
                        </td>
                      </tr>
                    ))}

                  {userType === "consumers" &&
                    users.map((consumer) => (
                      <tr key={consumer.id}>
                        <td>{consumer.id}</td>
                        <td>
                          <strong>{consumer.name}</strong>
                        </td>
                        <td>{consumer.email}</td>
                        <td>{consumer.location}</td>
                        <td>{consumer.orders}</td>
                        <td>
                          ₹{consumer.spent.toLocaleString()}
                        </td>
                        <td>
                          <span className="gov-status completed">
                            {consumer.status}
                          </span>
                        </td>
                      </tr>
                    ))}

                  {userType === "fpos" &&
                    users.map((fpo) => (
                      <tr key={fpo.id}>
                        <td>{fpo.id}</td>
                        <td>
                          <strong>{fpo.name}</strong>
                        </td>
                        <td>{fpo.location}</td>
                        <td>{fpo.members}</td>
                        <td>{fpo.products}</td>
                        <td>
                          <span className="gov-status completed">
                            {fpo.status}
                          </span>
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

  function renderProductDetails() {
    if (!selectedProduct) return null;

    const averageRating =
      selectedProduct.farmers.length > 0
        ? (
            selectedProduct.farmers.reduce(
              (sum, farmer) => sum + farmer.rating,
              0
            ) / selectedProduct.farmers.length
          ).toFixed(1)
        : "0.0";

    return (
      <>
        <div className="gov-product-detail-top">
          <button
            className="gov-product-back-btn"
            onClick={() => setSelectedProduct(null)}
          >
            ← Back to Products
          </button>
        </div>

        <div className="gov-product-detail-header">
          <div className="gov-detail-product-image">
            <img
              src={selectedProduct.image}
              alt={selectedProduct.name}
            />
          </div>

          <div className="gov-detail-product-info">
            <span className="gov-eyebrow">
              {selectedProduct.category}
            </span>
            <h1>{selectedProduct.name}</h1>
            <p>
              Government marketplace performance and farmer contribution
              details
            </p>
            <div className="gov-detail-meta">
              <span>📍 {selectedProduct.region}</span>
              <span>👨‍🌾 {selectedProduct.farmer}</span>
              <span>⭐ {averageRating} / 5</span>
            </div>
          </div>
        </div>

        <div className="gov-product-detail-stats">
          <div className="gov-detail-stat">
            <span>Average Price / kg</span>
            <strong>₹{selectedProduct.detailPrice}</strong>
          </div>

          <div className="gov-detail-stat">
            <span>Quantity Sold</span>
            <strong>{selectedProduct.quantitySold}</strong>
          </div>

          <div className="gov-detail-stat">
            <span>Total Revenue</span>
            <strong>
              ₹{selectedProduct.detailRevenue.toLocaleString()}
            </strong>
          </div>

          <div className="gov-detail-stat">
            <span>Total Farmers</span>
            <strong>{selectedProduct.farmers.length}</strong>
          </div>

          <div className="gov-detail-stat">
            <span>Top Region</span>
            <strong>{selectedProduct.topRegion}</strong>
          </div>
        </div>

        <div className="gov-product-detail-grid">
          <div className="gov-card gov-top-farmers">
            <div className="gov-card-heading">
              <div>
                <h2>👨‍🌾 Top Farmers</h2>
                <p>Farmers contributing the highest quantity</p>
              </div>
            </div>

            <div className="gov-top-farmer-list">
              {selectedProduct.farmers.map((farmer, index) => (
                <div className="gov-top-farmer" key={farmer.name}>
                  <span className="gov-farmer-rank">
                    #{index + 1}
                  </span>

                  <div className="gov-farmer-avatar">
                    {farmer.name.charAt(0)}
                  </div>

                  <div className="gov-top-farmer-info">
                    <strong>{farmer.name}</strong>
                    <span>{farmer.quantity} sold</span>
                  </div>

                  <div className="gov-rating">
                    ⭐ {farmer.rating}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="gov-card">
            <div className="gov-card-heading">
              <div>
                <h2>⭐ Farmer Ratings</h2>
                <p>Average rating: {averageRating} / 5</p>
              </div>
            </div>

            <div className="gov-rating-summary">
              <strong>{averageRating}</strong>
              <div>
                <div className="gov-stars">★★★★★</div>
                <span>Based on farmer performance</span>
              </div>
            </div>

            <div className="gov-rating-bars">
              {selectedProduct.farmers.map((farmer) => (
                <div className="gov-rating-row" key={farmer.name}>
                  <span>{farmer.name}</span>
                  <div className="gov-rating-track">
                    <div
                      className="gov-rating-fill"
                      style={{
                        width: `${(farmer.rating / 5) * 100}%`,
                      }}
                    />
                  </div>
                  <strong>{farmer.rating}</strong>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="gov-card">
          <div className="gov-card-heading">
            <div>
              <h2>📍 Regional Performance</h2>
              <p>Product sales performance by region</p>
            </div>
          </div>

          <div className="gov-table-wrap">
            <table className="gov-table">
              <thead>
                <tr>
                  <th>Region</th>
                  <th>Quantity Sold</th>
                  <th>Revenue</th>
                </tr>
              </thead>

              <tbody>
                {selectedProduct.regional.map((item) => (
                  <tr key={item.region}>
                    <td>
                      <strong>{item.region}</strong>
                    </td>
                    <td>{item.quantity}</td>
                    <td>{item.revenue}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </>
    );
  }

  function renderProducts() {
    if (selectedProduct) {
      return renderProductDetails();
    }

    return (
      <>
        <div className="gov-title-row">
          <div>
            <h1>🌾 Product Registry</h1>
            <p>
              Complete agricultural product listing across the marketplace
            </p>
          </div>
        </div>

        <div className="gov-summary-row">
          <div>
            <span>Total Products</span>
            <strong>{totalProducts}</strong>
          </div>

          <div>
            <span>Categories</span>
            <strong>4+</strong>
          </div>

          <div>
            <span>Low Stock</span>
            <strong>3</strong>
          </div>

          <div>
            <span>Out of Stock</span>
            <strong>1</strong>
          </div>
        </div>

        <div className="gov-card">
          <div className="gov-product-click-hint">
            Click any product row to view detailed performance →
          </div>

          <div className="gov-table-wrap">
            <table className="gov-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Category</th>
                  <th>Top Region to Sell</th>
                  <th>Region</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Sold</th>
                  <th>Revenue</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {PRODUCTS.map((product) => (
                  <tr
                    key={product.id}
                    className="gov-product-row-clickable"
                    onClick={() => setSelectedProduct(product)}
                    title={`View ${product.name} details`}
                  >
                    <td>
                      <div className="gov-product-name">
                        <span>
                          <img src={product.image} alt={product.name} />
                        </span>
                        <strong>{product.name}</strong>
                      </div>
                    </td>

                    <td>{product.category}</td>
                    <td>{product.topRegion}</td>
                    <td>{product.region}</td>
                    <td>₹{product.price}</td>
                    <td>{product.stock}</td>
                    <td>{product.sold}</td>
                    <td>₹{product.revenue.toLocaleString()}</td>

                    <td>
                      <span
                        className={
                          product.status === "In Stock"
                            ? "gov-status completed"
                            : product.status === "Out of Stock"
                            ? "gov-status out"
                            : "gov-status low"
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
        <div className="gov-title-row">
          <div>
            <h1>📦 Orders</h1>
            <p>
              Monitor marketplace orders and transaction status
            </p>
          </div>
        </div>

        <div className="gov-summary-row">
          <div>
            <span>Total Orders</span>
            <strong>{totalOrders}</strong>
          </div>

          <div>
            <span>Pending Orders</span>
            <strong>840</strong>
          </div>

          <div>
            <span>Completed</span>
            <strong>1640</strong>
          </div>

          <div>
            <span>Total Value</span>
            <strong>₹18.6L</strong>
          </div>
        </div>

        <div className="gov-filter-tabs">
          <button
            className={orderStatus === "all" ? "active" : ""}
            onClick={() => setOrderStatus("all")}
          >
            All Orders
          </button>

          <button
            className={orderStatus === "pending" ? "active" : ""}
            onClick={() => setOrderStatus("pending")}
          >
            Pending
          </button>

          <button
            className={orderStatus === "completed" ? "active" : ""}
            onClick={() => setOrderStatus("completed")}
          >
            Complete Orders
          </button>
        </div>

        <div className="gov-card">
          <div className="gov-table-wrap">
            <table className="gov-table">
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
                            ? "gov-status completed"
                            : "gov-status new"
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

        <div className="gov-card">
          <div className="gov-card-heading">
            <div>
              <h2>⏰ Orders Requiring Attention</h2>
              <p>Recent orders currently waiting for action</p>
            </div>
          </div>

          <div className="gov-pending-list">
            {pendingOrders.map((order) => (
              <div className="gov-pending-item" key={order.id}>
                <div>
                  <strong>{order.id}</strong>
                  <span>{order.product}</span>
                  <small>
                    {order.consumer} → {order.farmer}
                  </small>
                </div>

                <span className="gov-status new">
                  {order.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </>
    );
  }

  function renderSales() {
    return (
      <>
        <div className="gov-title-row">
          <div>
            <h1>₹ Sales & Revenue</h1>
            <p>
              Farmer revenue and marketplace sales performance
            </p>
          </div>
        </div>

        <div className="gov-summary-row">
          <div>
            <span>Total Farmer Sales</span>
            <strong>₹18.6L</strong>
          </div>

          <div>
            <span>Top Farmer</span>
            <strong>Ramesh Kumar</strong>
          </div>

          <div>
            <span>Top Region</span>
            <strong>West Bengal</strong>
          </div>

          <div>
            <span>Growth</span>
            <strong>+22%</strong>
          </div>
        </div>

        <div className="gov-card gov-sales-card">
          <div className="gov-card-heading">
            <div>
              <h2>📊 Monthly Farmer Sales</h2>
              <p>
                Marketplace revenue generated for farmers
              </p>
            </div>
          </div>

          <div className="gov-large-chart">
            {MONTHLY_SALES.map((item) => (
              <div className="gov-large-bar-column" key={item.month}>
                <span>₹{item.value}k</span>

                <div
                  className="gov-large-bar"
                  style={{
                    height: `${item.value * 4}px`,
                  }}
                />

                <small>{item.month}</small>
              </div>
            ))}
          </div>
        </div>

        <div className="gov-card">
          <div className="gov-card-heading">
            <div>
              <h2>👨‍🌾 Farmer Sales Performance</h2>
              <p>
                Revenue generated by individual farmers
              </p>
            </div>
          </div>

          <div className="gov-table-wrap">
            <table className="gov-table">
              <thead>
                <tr>
                  <th>Top Region to Sell</th>
                  <th>Products</th>
                  <th>Orders</th>
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
                    <td>{farmer.orders}</td>
                    <td>
                      ₹{farmer.sales.toLocaleString()}
                    </td>
                    <td>
                      <span className="gov-status completed">
                        {farmer.status}
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

  function renderReports() {
    return (
      <>
        <div className="gov-title-row">
          <div>
            <h1>📊 Government Reports</h1>
            <p>
              Detailed agricultural and marketplace reports
            </p>
          </div>
        </div>

        <div className="gov-filter-tabs">
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
            className={reportType === "fpo" ? "active" : ""}
            onClick={() => setReportType("fpo")}
          >
            🏢 FPO Report
          </button>

          <button
            className={reportType === "regional" ? "active" : ""}
            onClick={() => setReportType("regional")}
          >
            📍 Regional Agriculture
          </button>

          <button
            className={reportType === "product" ? "active" : ""}
            onClick={() => setReportType("product")}
          >
            🌾 Agricultural Products
          </button>
        </div>

        {reportType === "farmer" && (
          <div className="gov-card">
            <div className="gov-card-heading">
              <div>
                <h2>👨‍🌾 Farmer Performance Report</h2>
                <p>
                  Farmer participation, products, orders and revenue
                </p>
              </div>
            </div>

            <div className="gov-table-wrap">
              <table className="gov-table">
                <thead>
                  <tr>
                    <th>Top Region to Sell</th>
                    <th>Region</th>
                    <th>District</th>
                    <th>Products</th>
                    <th>Orders</th>
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
                      <td>{farmer.district}</td>
                      <td>{farmer.products}</td>
                      <td>{farmer.orders}</td>
                      <td>
                        ₹{farmer.sales.toLocaleString()}
                      </td>
                      <td>
                        <span className="gov-status completed">
                          {farmer.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {reportType === "consumer" && (
          <div className="gov-card">
            <div className="gov-card-heading">
              <div>
                <h2>🧑 Consumer Activity Report</h2>
                <p>
                  Consumer purchase and marketplace participation
                </p>
              </div>
            </div>

            <div className="gov-table-wrap">
              <table className="gov-table">
                <thead>
                  <tr>
                    <th>Consumer</th>
                    <th>Email</th>
                    <th>Location</th>
                    <th>Orders</th>
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
                      <td>{consumer.location}</td>
                      <td>{consumer.orders}</td>
                      <td>
                        ₹{consumer.spent.toLocaleString()}
                      </td>
                      <td>
                        <span className="gov-status completed">
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

        {reportType === "fpo" && (
          <div className="gov-card">
            <div className="gov-card-heading">
              <div>
                <h2>🏢 FPO Participation Report</h2>
                <p>
                  Farmer Producer Organisation activity
                </p>
              </div>
            </div>

            <div className="gov-table-wrap">
              <table className="gov-table">
                <thead>
                  <tr>
                    <th>FPO</th>
                    <th>Location</th>
                    <th>Members</th>
                    <th>Products</th>
                    <th>Status</th>
                  </tr>
                </thead>

                <tbody>
                  {FPOS.map((fpo) => (
                    <tr key={fpo.id}>
                      <td>
                        <strong>{fpo.name}</strong>
                      </td>
                      <td>{fpo.location}</td>
                      <td>{fpo.members}</td>
                      <td>{fpo.products}</td>
                      <td>
                        <span className="gov-status completed">
                          {fpo.status}
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
          <div className="gov-card">
            <div className="gov-card-heading">
              <div>
                <h2>📍 Regional Agriculture Report</h2>
                <p>
                  Agricultural marketplace activity across regions
                </p>
              </div>
            </div>

            <div className="gov-summary-row">
              <div>
                <span>Farmers</span>
                <strong>120</strong>
              </div>

              <div>
                <span>FPOs</span>
                <strong>18</strong>
              </div>

              <div>
                <span>Products</span>
                <strong>540</strong>
              </div>

              <div>
                <span>Orders</span>
                <strong>2,480</strong>
              </div>
            </div>

            <div className="gov-table-wrap">
              <table className="gov-table">
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
                      <td>
                        <strong>{region.region}</strong>
                      </td>
                      <td>{region.farmers}</td>
                      <td>{region.fpos}</td>
                      <td>{region.products}</td>
                      <td>{region.orders}</td>
                      <td>
                        ₹{region.sales.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {reportType === "product" && (
          <div className="gov-card">
            <div className="gov-card-heading">
              <div>
                <h2>🌾 Agricultural Product Report</h2>
                <p>
                  Product category, availability, top selling region and revenue report
                </p>
              </div>
            </div>

            <div className="gov-table-wrap">
              <table className="gov-table">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Category</th>
                    <th>Top Region to Sell</th>
                    <th>Region</th>
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
                        <div className="gov-product-name">
                          <span>
                            <img src={product.image} alt={product.name} />
                          </span>
                          <strong>{product.name}</strong>
                        </div>
                      </td>
                      <td>{product.category}</td>
                      <td>{TOP_SELLING_REGION}</td>
                      <td>₹{product.price}</td>
                      <td>{product.stock}</td>
                      <td>{product.sold}</td>
                      <td>
                        ₹{product.revenue.toLocaleString()}
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

      case "sales":
        return renderSales();

      case "reports":
        return renderReports();

      default:
        return renderDashboard();
    }
  }

  return (
    <div className="government-page">

      <header className="government-header">

        <div className="government-brand">
          <span className="government-brand-icon">
            <img src={logo} alt="Kisaan Connect logo" />
          </span>

          <div>
            <strong>
              Kisaan <em>Connect</em>
            </strong>

            <small>Government Panel</small>
          </div>
        </div>

        <div className="government-header-right">

          <span className="government-notification">
            🔔
          </span>

          <button
            className="government-user"
            onClick={() => setProfileOpen(!profileOpen)}
          >
            <div className="government-avatar">
              🏛️
            </div>

            <div className="government-user-text">
              <strong>
                {user?.name || "Government Officer"}
              </strong>

              <span>Government</span>
            </div>

            <span className="profile-arrow">
              {profileOpen ? "⌃" : "⌄"}
            </span>
          </button>
          <button
  className="government-logout-btn"
  onClick={logout}
>
  Logout
</button>

          {profileOpen && (
            <div className="government-profile-panel">

              <div className="profile-panel-top">
                <div className="profile-large-avatar">
                  🏛️
                </div>

                <div>
                  <strong>
                    {user?.name || "Government Officer"}
                  </strong>

                  <span>
                    {user?.email || "government@example.com"}
                  </span>
                </div>
              </div>

              <div className="profile-info-row">
                <span>Full Name</span>
                <strong>
                  {user?.name || "Government Officer"}
                </strong>
              </div>

              <div className="profile-info-row">
                <span>Email</span>
                <strong>
                  {user?.email || "government@example.com"}
                </strong>
              </div>

              <div className="profile-info-row">
                <span>Account Type</span>
                <strong>Government</strong>
              </div>

              <button className="add-information-btn">
                + Add Information
              </button>
            </div>
          )}

        </div>

      </header>

      <div className="government-layout">

        <aside className="government-sidebar">

          <div className="government-sidebar-menu">

            <button
              className={
                section === "dashboard" ? "active" : ""
              }
              onClick={() => goToSection("dashboard")}
            >
              <span>🏠</span>
              Dashboard
            </button>

            <button
              className={
                section === "users" ? "active" : ""
              }
              onClick={() => goToSection("users")}
            >
              <span>👥</span>
              Users
            </button>

            <button
              className={
                section === "products" ? "active" : ""
              }
              onClick={() => goToSection("products")}
            >
              <span>🌾</span>
              Products
            </button>

            <button
              className={
                section === "orders" ? "active" : ""
              }
              onClick={() => goToSection("orders")}
            >
              <span>📦</span>
              Orders
            </button>

            <button
              className={
                section === "sales" ? "active" : ""
              }
              onClick={() => goToSection("sales")}
            >
              <span>₹</span>
              Sales
            </button>

            <button
              className={
                section === "reports" ? "active" : ""
              }
              onClick={() => goToSection("reports")}
            >
              <span>📊</span>
              Reports
              <span className="government-menu-arrow">
                ▾
              </span>
            </button>

          </div>

          <div className="government-sidebar-bottom">

            <div className="government-illustration">
              👨‍🌾🌾
            </div>

            <strong>
              Empowering Farmers
            </strong>

            <span>
              Better Farming • Better India
            </span>

          </div>

        </aside>

        <main className="government-main">
          {renderContent()}
        </main>

      </div>

      <footer className="government-footer">
        <span>
          Kisaan Connect • Government Panel
        </span>

        <span>
          Better Farming • Better Food • A Stronger India 🌾
        </span>
      </footer>

    </div>
  );
}

export default GovernmentPage;