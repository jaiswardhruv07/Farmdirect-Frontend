import { useState } from "react";
import "./fpo.css";

/* ================= FARMER DATA ================= */

const FARMERS = [
  {
    id: "F001",
    name: "Ramesh Kumar",
    state: "West Bengal",
    district: "Nadia",
    products: 8,
    orders: 42,
    sales: 48200,
    status: "Active",
  },
  {
    id: "F002",
    name: "Sita Ram",
    state: "Bihar",
    district: "Patna",
    products: 6,
    orders: 28,
    sales: 32450,
    status: "Active",
  },
  {
    id: "F003",
    name: "Mohan Lal",
    state: "Uttar Pradesh",
    district: "Lucknow",
    products: 5,
    orders: 24,
    sales: 28760,
    status: "Active",
  },
  {
    id: "F004",
    name: "Sunita Devi",
    state: "Jharkhand",
    district: "Ranchi",
    products: 4,
    orders: 18,
    sales: 18320,
    status: "Active",
  },
  {
    id: "F005",
    name: "Hari Singh",
    state: "Punjab",
    district: "Ludhiana",
    products: 7,
    orders: 16,
    sales: 12680,
    status: "Inactive",
  },
];

/* ================= PRODUCT DATA ================= */

const PRODUCTS = [
  {
    id: "P001",
    name: "Tomatoes",
    category: "Vegetables",
    price: 42,
    sold: 1240,
    revenue: 52080,
    topRegion: "West Bengal",
    emoji: "🍅",
    status: "Active",
    quantitySold: "1,240 kg",
    farmers: [
      { name: "Ramesh Kumar", quantity: "420 kg", rating: 4.8 },
      { name: "Sita Ram", quantity: "310 kg", rating: 4.6 },
      { name: "Mohan Lal", quantity: "285 kg", rating: 4.5 },
    ],
    regionalPerformance: [
      { region: "West Bengal", sold: "420 kg", revenue: "₹17,640" },
      { region: "Bihar", sold: "310 kg", revenue: "₹13,020" },
      { region: "Uttar Pradesh", sold: "285 kg", revenue: "₹11,970" },
    ],
  },
  {
    id: "P002",
    name: "Mangoes",
    category: "Fruits",
    price: 85,
    sold: 890,
    revenue: 75650,
    topRegion: "West Bengal",
    emoji: "🥭",
    status: "Active",
    quantitySold: "890 kg",
    farmers: [
      { name: "Ramesh Kumar", quantity: "360 kg", rating: 4.9 },
      { name: "Mohan Lal", quantity: "280 kg", rating: 4.7 },
      { name: "Sita Ram", quantity: "190 kg", rating: 4.5 },
    ],
    regionalPerformance: [
      { region: "West Bengal", sold: "360 kg", revenue: "₹30,600" },
      { region: "Uttar Pradesh", sold: "280 kg", revenue: "₹23,800" },
      { region: "Bihar", sold: "190 kg", revenue: "₹16,150" },
    ],
  },
  {
    id: "P003",
    name: "Milk",
    category: "Dairy",
    price: 58,
    sold: 1560,
    revenue: 90480,
    topRegion: "Punjab",
    emoji: "🥛",
    status: "Active",
    quantitySold: "1,560 L",
    farmers: [
      { name: "Hari Singh", quantity: "520 L", rating: 4.8 },
      { name: "Sunita Devi", quantity: "410 L", rating: 4.6 },
      { name: "Ramesh Kumar", quantity: "350 L", rating: 4.5 },
    ],
    regionalPerformance: [
      { region: "Punjab", sold: "520 L", revenue: "₹30,160" },
      { region: "Jharkhand", sold: "410 L", revenue: "₹23,780" },
      { region: "West Bengal", sold: "350 L", revenue: "₹20,300" },
    ],
  },
  {
    id: "P004",
    name: "Spinach",
    category: "Vegetables",
    price: 32,
    sold: 740,
    revenue: 23680,
    topRegion: "Bihar",
    emoji: "🥬",
    status: "Active",
    quantitySold: "740 kg",
    farmers: [
      { name: "Sita Ram", quantity: "280 kg", rating: 4.7 },
      { name: "Sunita Devi", quantity: "190 kg", rating: 4.5 },
      { name: "Mohan Lal", quantity: "150 kg", rating: 4.4 },
    ],
    regionalPerformance: [
      { region: "Bihar", sold: "280 kg", revenue: "₹8,960" },
      { region: "Jharkhand", sold: "190 kg", revenue: "₹6,080" },
      { region: "Uttar Pradesh", sold: "150 kg", revenue: "₹4,800" },
    ],
  },
  {
    id: "P005",
    name: "Bananas",
    category: "Fruits",
    price: 48,
    sold: 1120,
    revenue: 53760,
    topRegion: "Bihar",
    emoji: "🍌",
    status: "Active",
    quantitySold: "1,120 kg",
    farmers: [
      { name: "Sita Ram", quantity: "390 kg", rating: 4.6 },
      { name: "Ramesh Kumar", quantity: "320 kg", rating: 4.5 },
      { name: "Sunita Devi", quantity: "240 kg", rating: 4.4 },
    ],
    regionalPerformance: [
      { region: "Bihar", sold: "390 kg", revenue: "₹18,720" },
      { region: "West Bengal", sold: "320 kg", revenue: "₹15,360" },
      { region: "Jharkhand", sold: "240 kg", revenue: "₹11,520" },
    ],
  },
  {
    id: "P006",
    name: "Wheat",
    category: "Grains",
    price: 38,
    sold: 1980,
    revenue: 75240,
    topRegion: "Punjab",
    emoji: "🌾",
    status: "Active",
    quantitySold: "1,980 kg",
    farmers: [
      { name: "Hari Singh", quantity: "720 kg", rating: 4.9 },
      { name: "Mohan Lal", quantity: "510 kg", rating: 4.7 },
      { name: "Sita Ram", quantity: "420 kg", rating: 4.6 },
    ],
    regionalPerformance: [
      { region: "Punjab", sold: "720 kg", revenue: "₹27,360" },
      { region: "Uttar Pradesh", sold: "510 kg", revenue: "₹19,380" },
      { region: "Bihar", sold: "420 kg", revenue: "₹15,960" },
    ],
  },
];

/* ================= ORDER DATA ================= */

const ORDERS = [
  {
    id: "#FPO-007",
    product: "Tomatoes",
    farmer: "Ramesh Kumar",
    quantity: "40 kg",
    amount: 1680,
    status: "Completed",
    date: "06 Sep 2026",
  },
  {
    id: "#FPO-008",
    product: "Mangoes",
    farmer: "Sita Ram",
    quantity: "25 kg",
    amount: 2125,
    status: "Completed",
    date: "05 Sep 2026",
  },
  {
    id: "#FPO-009",
    product: "Milk",
    farmer: "Hari Singh",
    quantity: "60 L",
    amount: 3480,
    status: "New",
    date: "05 Sep 2026",
  },
  {
    id: "#FPO-010",
    product: "Spinach",
    farmer: "Sunita Devi",
    quantity: "30 kg",
    amount: 960,
    status: "Completed",
    date: "04 Sep 2026",
  },
  {
    id: "#FPO-011",
    product: "Wheat",
    farmer: "Mohan Lal",
    quantity: "80 kg",
    amount: 3040,
    status: "New",
    date: "04 Sep 2026",
  },
];

/* ================= REGIONAL DATA ================= */

const REGIONS = [
  {
    region: "West Bengal",
    farmers: 32,
    products: 118,
    orders: 520,
    sold: "4,820 kg",
    rating: 4.7,
    revenue: 428000,
  },
  {
    region: "Bihar",
    farmers: 28,
    products: 96,
    orders: 430,
    sold: "4,120 kg",
    rating: 4.5,
    revenue: 356000,
  },
  {
    region: "Uttar Pradesh",
    farmers: 25,
    products: 89,
    orders: 390,
    sold: "3,760 kg",
    rating: 4.6,
    revenue: 328000,
  },
  {
    region: "Jharkhand",
    farmers: 21,
    products: 72,
    orders: 310,
    sold: "2,940 kg",
    rating: 4.4,
    revenue: 246000,
  },
  {
    region: "Punjab",
    farmers: 30,
    products: 104,
    orders: 460,
    sold: "4,580 kg",
    rating: 4.8,
    revenue: 398000,
  },
];

/* ================= MONTHLY SALES ================= */

const MONTHLY_SALES = [
  18, 25, 20, 29, 34, 39, 32, 30, 42, 35, 44, 50,
];

/* ================= COMPONENT ================= */

function FPOPage({ user, onNavigate }) {
  const [section, setSection] = useState("dashboard");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [reportType, setReportType] = useState("farmer");
  const [profileOpen, setProfileOpen] = useState(false);

  const totalFarmerSales = FARMERS.reduce(
    (sum, farmer) => sum + farmer.sales,
    0
  );

  const totalProductRevenue = PRODUCTS.reduce(
    (sum, product) => sum + product.revenue,
    0
  );

  const totalOrders = ORDERS.length;

 const navigate = (page) => {
  setSection(page);
  setProfileOpen(false);
};
  /* ================= DASHBOARD ================= */

  const renderDashboard = () => (
    <>
      <div className="fpo-title-row">
        <div>
          <h1>FPO Dashboard</h1>
          <p>
            Monitor farmers, agricultural products and marketplace activity.
          </p>
        </div>

        <div className="fpo-date">
          06 September 2026
          <span>Sunday</span>
        </div>
      </div>

      <div className="fpo-stats">
        <button
          className="fpo-stat-card"
          onClick={() => navigate("farmers")}
        >
          <div className="fpo-stat-icon green">👨‍🌾</div>
          <div>
            <span>Total Farmers</span>
            <strong>120</strong>
            <small>Registered farmers</small>
          </div>
        </button>

        <div className="fpo-stat-card consumer-stat">
          <div className="fpo-stat-icon gold">🛒</div>
          <div>
            <span>Total Consumers</span>
            <strong>85</strong>
          </div>
        </div>

        <button
          className="fpo-stat-card"
          onClick={() => navigate("products")}
        >
          <div className="fpo-stat-icon green">🌾</div>
          <div>
            <span>Products</span>
            <strong>540</strong>
            <small>Listed products</small>
          </div>
        </button>

        <button
          className="fpo-stat-card"
          onClick={() => navigate("orders")}
        >
          <div className="fpo-stat-icon gold">📦</div>
          <div>
            <span>Orders</span>
            <strong>2,480</strong>
            <small>Marketplace orders</small>
          </div>
        </button>

        <div className="fpo-stat-card">
          <div className="fpo-stat-icon green">💰</div>
          <div>
            <span>Farmer Revenue</span>
            <strong>₹18.6L</strong>
            <small>Farmer earnings</small>
          </div>
        </div>

        <div className="fpo-stat-card">
          <div className="fpo-stat-icon gold">📍</div>
          <div>
            <span>Regions</span>
            <strong>12</strong>
            <small>Active regions</small>
          </div>
        </div>
      </div>

      <div className="fpo-main-grid">
        <div className="fpo-card fpo-welcome-card">
          <div>
            <span className="fpo-eyebrow">Farmer Producer Organisation</span>

            <h2>Empowering Our Farmers</h2>

            <p>
              Track farmer performance, agricultural products, orders and
              regional growth from one central FPO dashboard.
            </p>
          </div>

          <div className="fpo-welcome-icon">🌾</div>
        </div>

        <div className="fpo-card">
          <div className="fpo-card-heading">
            <div>
              <h2>Farmer Revenue Overview</h2>
              <p>Monthly revenue generated through farmer sales</p>
            </div>

            <button
              className="fpo-view-btn"
              onClick={() => navigate("reports")}
            >
              View Report
            </button>
          </div>

          <div className="fpo-bar-chart">
            {MONTHLY_SALES.map((value, index) => (
              <div className="fpo-bar-column" key={index}>
                <span>₹{value}L</span>
                <div
                  className="fpo-bar"
                  style={{ height: `${value * 3.2}px` }}
                ></div>
                <small>
                  {[
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
                    "Dec",
                  ][index]}
                </small>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="fpo-card">
        <div className="fpo-card-heading">
          <div>
            <h2>Top Farmer Performance</h2>
            <p>Farmers generating the highest sales</p>
          </div>

          <button
            className="fpo-view-btn"
            onClick={() => navigate("farmers")}
          >
            View Farmers
          </button>
        </div>

        <div className="fpo-farmer-performance">
          {FARMERS.slice(0, 5).map((farmer, index) => (
            <div className="fpo-performance-item" key={farmer.id}>
              <div className="fpo-rank">{index + 1}</div>

              <div className="fpo-performance-avatar">👨‍🌾</div>

              <div className="fpo-performance-info">
                <strong>{farmer.name}</strong>
                <span>
                  {farmer.state} • {farmer.district}
                </span>
              </div>

              <div className="fpo-performance-products">
                <span>Products</span>
                <strong>{farmer.products}</strong>
              </div>

              <div className="fpo-performance-orders">
                <span>Orders</span>
                <strong>{farmer.orders}</strong>
              </div>

              <div className="fpo-performance-sales">
                <span>Total Sales</span>
                <strong>₹{farmer.sales.toLocaleString()}</strong>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="fpo-dashboard-lower-grid">
        <div className="fpo-card">
          <div className="fpo-card-heading">
            <div>
              <h2>Regional Agriculture</h2>
              <p>Farmer and marketplace performance by region</p>
            </div>

            <button
              className="fpo-view-btn"
              onClick={() => {
                setReportType("regional");
                navigate("reports");
              }}
            >
              Full Report
            </button>
          </div>

          <div className="fpo-table-wrap">
            <table className="fpo-table">
              <thead>
                <tr>
                  <th>Region</th>
                  <th>Farmers</th>
                  <th>Orders</th>
                  <th>Rating</th>
                  <th>Revenue</th>
                </tr>
              </thead>

              <tbody>
                {REGIONS.map((region) => (
                  <tr key={region.region}>
                    <td>
                      <strong>{region.region}</strong>
                    </td>
                    <td>{region.farmers}</td>
                    <td>{region.orders}</td>
                    <td>⭐ {region.rating}</td>
                    <td>₹{region.revenue.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="fpo-card">
          <div className="fpo-card-heading">
            <div>
              <h2>Recent Orders</h2>
              <p>Latest farmer orders</p>
            </div>

            <button
              className="fpo-view-btn"
              onClick={() => navigate("orders")}
            >
              View All
            </button>
          </div>

          <div className="fpo-pending-list">
            {ORDERS.slice(0, 4).map((order) => (
              <div className="fpo-pending-item" key={order.id}>
                <div>
                  <strong>{order.id}</strong>
                  <span>{order.product}</span>
                  <small>{order.farmer}</small>
                </div>

                <div className="fpo-order-right">
                  <strong>₹{order.amount.toLocaleString()}</strong>

                  <span
                    className={`fpo-status ${
                      order.status === "Completed"
                        ? "completed"
                        : "new"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );

  /* ================= FARMERS ================= */

  const renderFarmers = () => (
    <>
      <div className="fpo-title-row">
        <div>
          <h1>Farmers</h1>
          <p>Complete information and performance of FPO farmers.</p>
        </div>
      </div>

      <div className="fpo-summary-row">
        <div>
          <span>Total Farmers</span>
          <strong>120</strong>
        </div>

        <div>
          <span>Active Farmers</span>
          <strong>114</strong>
        </div>

        <div>
          <span>Total Farmer Sales</span>
          <strong>₹18.6L</strong>
        </div>

        <div>
          <span>Average Orders</span>
          <strong>24</strong>
        </div>
      </div>

      <div className="fpo-card">
        <div className="fpo-card-heading">
          <div>
            <h2>All Farmer Information</h2>
            <p>Farmer-wise marketplace performance</p>
          </div>
        </div>

        <div className="fpo-table-wrap">
          <table className="fpo-table">
            <thead>
              <tr>
                <th>Farmer</th>
                <th>State</th>
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
                    <div className="fpo-farmer-name">
                      <span>👨‍🌾</span>
                      <div>
                        <strong>{farmer.name}</strong>
                        <small>{farmer.id}</small>
                      </div>
                    </div>
                  </td>

                  <td>{farmer.state}</td>

                  <td>{farmer.district}</td>

                  <td>{farmer.products}</td>

                  <td>{farmer.orders}</td>

                  <td>
                    <strong>
                      ₹{farmer.sales.toLocaleString()}
                    </strong>
                  </td>

                  <td>
                    <span
                      className={`fpo-status ${
                        farmer.status === "Active"
                          ? "completed"
                          : "low"
                      }`}
                    >
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

  /* ================= PRODUCTS ================= */

  const renderProducts = () => {
    if (selectedProduct) {
      return renderProductDetails();
    }

    return (
      <>
        <div className="fpo-title-row">
          <div>
            <h1>Products</h1>
            <p>
              Agricultural products listed by farmers across the marketplace.
            </p>
          </div>
        </div>

        <div className="fpo-summary-row">
          <div>
            <span>Total Products</span>
            <strong>540</strong>
          </div>

          <div>
            <span>Product Categories</span>
            <strong>8</strong>
          </div>

          <div>
            <span>Total Sold</span>
            <strong>7,530</strong>
          </div>

          <div>
            <span>Product Revenue</span>
            <strong>₹3.9L</strong>
          </div>
        </div>

        <div className="fpo-card">
          <div className="fpo-card-heading">
            <div>
              <h2>Product List</h2>
              <p>Click any product to see detailed farmer performance.</p>
            </div>
          </div>

          <div className="fpo-table-wrap">
            <table className="fpo-table fpo-clickable-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Category</th>
                  <th>Average Price</th>
                  <th>Sold</th>
                  <th>Revenue</th>
                  <th>Top Region</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {PRODUCTS.map((product) => (
                  <tr
                    key={product.id}
                    onClick={() => setSelectedProduct(product)}
                  >
                    <td>
                      <div className="fpo-product-name">
                        <span>{product.emoji}</span>

                        <div>
                          <strong>{product.name}</strong>
                          <small>{product.id}</small>
                        </div>
                      </div>
                    </td>

                    <td>{product.category}</td>

                    <td>₹{product.price}/kg</td>

                    <td>{product.sold.toLocaleString()} kg</td>

                    <td>
                      <strong>
                        ₹{product.revenue.toLocaleString()}
                      </strong>
                    </td>

                    <td>{product.topRegion}</td>

                    <td>
                      <span className="fpo-status completed">
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
  };

  /* ================= PRODUCT DETAILS ================= */

  const renderProductDetails = () => (
    <>
      <div className="fpo-title-row">
        <div>
          <button
            className="fpo-back-btn"
            onClick={() => setSelectedProduct(null)}
          >
            ← Back to Products
          </button>

          <h1>
            {selectedProduct.emoji} {selectedProduct.name}
          </h1>

          <p>
            {selectedProduct.category} • Detailed farmer and regional
            performance
          </p>
        </div>
      </div>

      <div className="fpo-product-detail-stats">
        <div className="fpo-detail-stat">
          <span>Average Price</span>
          <strong>₹{selectedProduct.price}/kg</strong>
        </div>

        <div className="fpo-detail-stat">
          <span>Quantity Sold</span>
          <strong>{selectedProduct.quantitySold}</strong>
        </div>

        <div className="fpo-detail-stat">
          <span>Total Revenue</span>
          <strong>
            ₹{selectedProduct.revenue.toLocaleString()}
          </strong>
        </div>

        <div className="fpo-detail-stat">
          <span>Top Region</span>
          <strong>{selectedProduct.topRegion}</strong>
        </div>
      </div>

      <div className="fpo-detail-grid">
        <div className="fpo-card">
          <div className="fpo-card-heading">
            <div>
              <h2>Top Farmers</h2>
              <p>Farmers selling the highest quantity</p>
            </div>
          </div>

          <div className="fpo-top-farmers">
            {selectedProduct.farmers.map((farmer, index) => (
              <div className="fpo-top-farmer" key={farmer.name}>
                <div className="fpo-rank">{index + 1}</div>

                <div className="fpo-performance-avatar">
                  👨‍🌾
                </div>

                <div className="fpo-top-farmer-info">
                  <strong>{farmer.name}</strong>
                  <span>{farmer.quantity} sold</span>
                </div>

                <div className="fpo-rating">
                  ⭐ {farmer.rating}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="fpo-card">
          <div className="fpo-card-heading">
            <div>
              <h2>Farmer Ratings</h2>
              <p>Ratings received for this product</p>
            </div>
          </div>

          <div className="fpo-rating-summary">
            <strong>4.7</strong>

            <div>
              <div className="fpo-stars">★★★★★</div>
              <span>Average farmer product rating</span>
            </div>
          </div>

          <div className="fpo-rating-bars">
            {selectedProduct.farmers.map((farmer) => (
              <div className="fpo-rating-row" key={farmer.name}>
                <span>{farmer.name}</span>

                <div className="fpo-rating-track">
                  <div
                    className="fpo-rating-fill"
                    style={{
                      width: `${(farmer.rating / 5) * 100}%`,
                    }}
                  ></div>
                </div>

                <strong>{farmer.rating}</strong>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="fpo-card">
        <div className="fpo-card-heading">
          <div>
            <h2>Regional Performance</h2>
            <p>How this product is performing across regions</p>
          </div>
        </div>

        <div className="fpo-table-wrap">
          <table className="fpo-table">
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

  /* ================= ORDERS ================= */

  const renderOrders = () => (
    <>
      <div className="fpo-title-row">
        <div>
          <h1>Orders</h1>
          <p>Track orders received for farmers and their products.</p>
        </div>
      </div>

      <div className="fpo-summary-row">
        <div>
          <span>Total Orders</span>
          <strong>2,480</strong>
        </div>

        <div>
          <span>Completed</span>
          <strong>2,180</strong>
        </div>

        <div>
          <span>Pending</span>
          <strong>210</strong>
        </div>

        <div>
          <span>Total Order Value</span>
          <strong>₹18.6L</strong>
        </div>
      </div>

      <div className="fpo-card">
        <div className="fpo-card-heading">
          <div>
            <h2>All Orders</h2>
            <p>Farmer-wise order information</p>
          </div>
        </div>

        <div className="fpo-table-wrap">
          <table className="fpo-table">
            <thead>
              <tr>
                <th>Order</th>
                <th>Product</th>
                <th>Farmer</th>
                <th>Quantity</th>
                <th>Amount</th>
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

                  <td>{order.product}</td>

                  <td>{order.farmer}</td>

                  <td>{order.quantity}</td>

                  <td>
                    <strong>
                      ₹{order.amount.toLocaleString()}
                    </strong>
                  </td>

                  <td>
                    <span
                      className={`fpo-status ${
                        order.status === "Completed"
                          ? "completed"
                          : "new"
                      }`}
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

  /* ================= REPORTS ================= */

  const renderReports = () => (
    <>
      <div className="fpo-title-row">
        <div>
          <h1>Reports</h1>
          <p>
            Detailed farmer, regional and agricultural product reports.
          </p>
        </div>
      </div>

      <div className="fpo-filter-tabs">
        <button
          className={reportType === "farmer" ? "active" : ""}
          onClick={() => setReportType("farmer")}
        >
          👨‍🌾 Farmer Performance
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
          🌾 Agricultural Product
        </button>
      </div>

      {reportType === "farmer" && (
        <div className="fpo-card">
          <div className="fpo-card-heading">
            <div>
              <h2>Farmer Performance Report</h2>
              <p>Complete farmer-wise performance information</p>
            </div>
          </div>

          <div className="fpo-table-wrap">
            <table className="fpo-table">
              <thead>
                <tr>
                  <th>Farmer</th>
                  <th>State</th>
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

                    <td>{farmer.state}</td>

                    <td>{farmer.district}</td>

                    <td>{farmer.products}</td>

                    <td>{farmer.orders}</td>

                    <td>
                      <strong>
                        ₹{farmer.sales.toLocaleString()}
                      </strong>
                    </td>

                    <td>
                      <span
                        className={`fpo-status ${
                          farmer.status === "Active"
                            ? "completed"
                            : "low"
                        }`}
                      >
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

      {reportType === "regional" && (
        <div className="fpo-card">
          <div className="fpo-card-heading">
            <div>
              <h2>Regional Agriculture Report</h2>
              <p>
                Farmer benefit, product sales and marketplace performance
                by region.
              </p>
            </div>
          </div>

          <div className="fpo-table-wrap">
            <table className="fpo-table">
              <thead>
                <tr>
                  <th>Region</th>
                  <th>Farmers</th>
                  <th>Products Sold</th>
                  <th>Total Orders</th>
                  <th>Average Rating</th>
                  <th>Farmer Revenue</th>
                </tr>
              </thead>

              <tbody>
                {REGIONS.map((region) => (
                  <tr key={region.region}>
                    <td>
                      <strong>{region.region}</strong>
                    </td>

                    <td>{region.farmers}</td>

                    <td>{region.sold}</td>

                    <td>{region.orders}</td>

                    <td>⭐ {region.rating}</td>

                    <td>
                      <strong>
                        ₹{region.revenue.toLocaleString()}
                      </strong>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="fpo-report-highlight">
            <div>
              <span>Highest Farmer Revenue</span>
              <strong>West Bengal</strong>
            </div>

            <div>
              <span>Highest Product Sales</span>
              <strong>West Bengal</strong>
            </div>

            <div>
              <span>Highest Average Rating</span>
              <strong>Punjab • ⭐ 4.8</strong>
            </div>
          </div>
        </div>
      )}

      {reportType === "product" && (
        <div className="fpo-card">
          <div className="fpo-card-heading">
            <div>
              <h2>Agricultural Product Report</h2>
              <p>
                Product-wise sales, revenue and top-performing regions.
              </p>
            </div>
          </div>

          <div className="fpo-table-wrap">
            <table className="fpo-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Category</th>
                  <th>Average Price</th>
                  <th>Sold</th>
                  <th>Revenue</th>
                  <th>Top Region</th>
                </tr>
              </thead>

              <tbody>
                {PRODUCTS.map((product) => (
                  <tr key={product.id}>
                    <td>
                      <div className="fpo-product-name">
                        <span>{product.emoji}</span>
                        <strong>{product.name}</strong>
                      </div>
                    </td>

                    <td>{product.category}</td>

                    <td>₹{product.price}/kg</td>

                    <td>{product.sold.toLocaleString()} kg</td>

                    <td>
                      <strong>
                        ₹{product.revenue.toLocaleString()}
                      </strong>
                    </td>

                    <td>{product.topRegion}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );

  /* ================= CONTENT SWITCH ================= */

  const renderContent = () => {
    switch (section) {
      case "farmers":
        return renderFarmers();

      case "products":
        return renderProducts();

      case "orders":
        return renderOrders();

      case "reports":
        return renderReports();

      default:
        return renderDashboard();
    }
  };

  /* ================= MAIN RETURN ================= */

  return (
    <div className="fpo-page">

      {/* HEADER */}

      <header className="fpo-header">
        <div className="fpo-brand">
          <div className="fpo-brand-icon">
  <img src="/LESS.WEBP" alt="Kisaan Connect logo" />
</div>

          <div>
            <strong>
              Kisaan <em>Connect</em>
            </strong>

            <small>FPO Panel</small>
          </div>
        </div>

        <div className="fpo-header-right">

          <div className="fpo-notification">
            🔔
          </div>
          <div className="fpo-header-right">

 

  <button
    className="fpo-user"
    onClick={() => setProfileOpen(!profileOpen)}
  >
    <div className="fpo-avatar">
      F
    </div>

    <div className="fpo-user-text">
      <strong>
        {user?.name || "FPO Manager"}
      </strong>

      <span>
        {user?.email || "fpo@kisaanbazar.com"}
      </span>
    </div>

    <span className="fpo-profile-arrow">
      {profileOpen ? "⌃" : "⌄"}
    </span>
  </button>

  {/* LOGOUT BUTTON */}
  <button
    className="fpo-logout-btn"
    onClick={() => onNavigate("login")}
  >
    Logout
  </button>

  {profileOpen && (
    <div className="fpo-profile-panel">

      <div className="fpo-profile-top">

        <div className="fpo-large-avatar">
          🌾
        </div>

        <div>
          <strong>
            {user?.name || "FPO Manager"}
          </strong>

          <span>
            Farmer Producer Organisation
          </span>
        </div>

      </div>

      <div className="fpo-profile-info-row">
        <span>Role</span>
        <strong>FPO Manager</strong>
      </div>

      <div className="fpo-profile-info-row">
        <span>Organisation</span>
        <strong>Kisaan Connect FPO</strong>
      </div>

      <div className="fpo-profile-info-row">
        <span>Farmers</span>
        <strong>120</strong>
      </div>

      <div className="fpo-profile-info-row">
        <span>Regions</span>
        <strong>12</strong>
      </div>

      <button className="fpo-information-btn">
        Add / Update Information
      </button>

    </div>
  )}

</div>

          
          {profileOpen && (
            <div className="fpo-profile-panel">

              <div className="fpo-profile-top">

                <div className="fpo-large-avatar">
                  🌾
                </div>

                <div>
                  <strong>
                    {user?.name || "FPO Manager"}
                  </strong>

                  <span>
                    Farmer Producer Organisation
                  </span>
                </div>

              </div>

              <div className="fpo-profile-info-row">
                <span>Role</span>
                <strong>FPO Manager</strong>
              </div>

              <div className="fpo-profile-info-row">
                <span>Organisation</span>
                <strong>Kisaan Connect FPO</strong>
              </div>

              <div className="fpo-profile-info-row">
                <span>Farmers</span>
                <strong>120</strong>
              </div>

              <div className="fpo-profile-info-row">
                <span>Regions</span>
                <strong>12</strong>
              </div>

              <button className="fpo-information-btn">
                Add / Update Information
              </button>

            </div>
          )}

        </div>
      </header>

      {/* BODY */}

      <div className="fpo-layout">

        {/* SIDEBAR */}

        <aside className="fpo-sidebar">

          <div className="fpo-sidebar-menu">

            <button
              className={section === "dashboard" ? "active" : ""}
              onClick={() => {
                setSelectedProduct(null);
                navigate("dashboard");
              }}
            >
              <span>🏠</span>
              <span>Dashboard</span>
              <span className="fpo-menu-arrow">›</span>
            </button>

            <button
              className={section === "farmers" ? "active" : ""}
              onClick={() => {
                setSelectedProduct(null);
                navigate("farmers");
              }}
            >
              <span>👨‍🌾</span>
              <span>Farmers</span>
              <span className="fpo-menu-arrow">›</span>
            </button>

            <button
              className={
                section === "products" && !selectedProduct
                  ? "active"
                  : ""
              }
              onClick={() => {
                setSelectedProduct(null);
                navigate("products");
              }}
            >
              <span>🌾</span>
              <span>Products</span>
              <span className="fpo-menu-arrow">›</span>
            </button>

            <button
              className={section === "orders" ? "active" : ""}
              onClick={() => {
                setSelectedProduct(null);
                navigate("orders");
              }}
            >
              <span>📦</span>
              <span>Orders</span>
              <span className="fpo-menu-arrow">›</span>
            </button>

            <button
              className={section === "reports" ? "active" : ""}
              onClick={() => {
                setSelectedProduct(null);
                navigate("reports");
              }}
            >
              <span>📊</span>
              <span>Reports</span>
              <span className="fpo-menu-arrow">›</span>
            </button>

          </div>

          <div className="fpo-sidebar-bottom">
            <div className="fpo-illustration">
              👨‍🌾🌾
            </div>

            <strong>
              Empowering Farmers
            </strong>

            <span>
              Stronger Farmers • Better Markets
            </span>
          </div>

        </aside>

        {/* MAIN */}

        <main className="fpo-main">
          {renderContent()}
        </main>

      </div>

      {/* FOOTER */}

      <footer className="fpo-footer">
        <span>
          © 2026 Kisaan Connect • FPO Management Panel
        </span>

        <span>
          Empowering Farmers • Building Better Markets
        </span>
      </footer>

    </div>
  );
}

export default FPOPage;