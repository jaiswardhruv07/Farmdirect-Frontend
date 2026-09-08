import { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate
} from "react-router-dom";

import { useAuth } from "./context/AuthContext";
import ProtectedRoute from "./routes/ProtectedRoute";

// AUTH
import LoginPage from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";

// ROLE
import AdminPage from "./pages/admin/AdminPage";
import BulkBuyerPage from "./pages/bulkbuyer/bulkbuyer";
import FarmerPage from "./pages/farmer/FarmerPage";
import GovernmentPage from "./pages/government/GovernmentPage";
import FPOPage from "./pages/fpo/fpo";
import ConsumerPage from "./pages/consumer/Consumerpage";

function AppRoutes() {
  const navigate = useNavigate();

  const { user, isAuthenticated, loading } = useAuth();

  // ================= CONSUMER CART =================

  const [cart, setCart] = useState([]);

  const handleAddToCart = (product) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === product.id);

      if (existing) {
        return prevCart.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: (item.quantity || 1) + 1
              }
            : item
        );
      }

      return [
        ...prevCart,
        {
          ...product,
          quantity: 1
        }
      ];
    });
  };

  const handleRemoveFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const handleUpdateQuantity = (productId, quantity) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId
          ? {
              ...item,
              quantity: Math.max(1, quantity)
            }
          : item
      )
    );
  };

  const handleClearCart = () => {
    setCart([]);
  };

  // ================= DASHBOARD =================

  const getDashboardPath = (role) => {
    switch (role) {
      case "CONSUMER":
        return "/consumer";

      case "FARMER":
        return "/farmer";

      case "ADMIN":
        return "/admin";

      case "GOVERNMENT_OFFICER":
        return "/government";

      case "FPO":
        return "/fpo";

      case "BULK_BUYER":
        return "/bulkbuyer";

      default:
        return "/";
    }
  };

  // ================= LOGIN =================

  const handleLogin = (loggedInUser) => {
    console.log("Logged in user:", loggedInUser);

    navigate(getDashboardPath(loggedInUser.role));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Routes>
      {/* ================= AUTH ================= */}

      <Route
        path="/"
        element={
          isAuthenticated ? (
            <Navigate to={getDashboardPath(user?.role)} replace />
          ) : (
            <LoginPage
              onLogin={handleLogin}
              onNavigateSignup={() => navigate("/signup")}
              onNavigateForgotPassword={() => {
                alert("Forgot Password");
              }}
            />
          )
        }
      />

      <Route
        path="/login"
        element={
          isAuthenticated ? (
            <Navigate to={getDashboardPath(user?.role)} replace />
          ) : (
            <LoginPage
              onLogin={handleLogin}
              onNavigateSignup={() => navigate("/signup")}
              onNavigateForgotPassword={() => {
                alert("Forgot Password");
              }}
            />
          )
        }
      />

      <Route
        path="/signup"
        element={
          isAuthenticated ? (
            <Navigate to={getDashboardPath(user?.role)} replace />
          ) : (
            <Signup onBackToLogin={() => navigate("/")} />
          )
        }
      />

      {/* ================= PROTECTED ROLE ROUTES ================= */}

      <Route element={<ProtectedRoute allowedRoles={["FARMER"]} />}>
        <Route path="/farmer" element={<FarmerPage />} />
      </Route>

      {/* ================= CONSUMER ================= */}

      <Route element={<ProtectedRoute allowedRoles={["CONSUMER"]} />}>
        <Route
          path="/consumer"
          element={
            <ConsumerPage
              user={user}
              cart={cart}
              cartCount={cart.reduce(
                (total, item) => total + (item.quantity || 1),
                0
              )}
              onAddToCart={handleAddToCart}
              onRemove={handleRemoveFromCart}
              onUpdateQuantity={handleUpdateQuantity}
              onClearCart={handleClearCart}
            />
          }
        />
      </Route>

      {/* ================= ADMIN ================= */}

      <Route element={<ProtectedRoute allowedRoles={["ADMIN"]} />}>
        <Route path="/admin" element={<AdminPage />} />
      </Route>

      {/* ================= GOVERNMENT ================= */}

      <Route element={<ProtectedRoute allowedRoles={["GOVERNMENT_OFFICER"]} />}>
        <Route path="/government" element={<GovernmentPage />} />
      </Route>

      {/* ================= FPO ================= */}

      <Route element={<ProtectedRoute allowedRoles={["FPO"]} />}>
        <Route path="/fpo" element={<FPOPage />} />
      </Route>

      {/* ================= BULK BUYER ================= */}

      <Route element={<ProtectedRoute allowedRoles={["BULK_BUYER"]} />}>
        <Route path="/bulkbuyer" element={<BulkBuyerPage />} />
      </Route>

      {/* ================= FALLBACK ================= */}

      <Route
        path="*"
        element={
          isAuthenticated ? (
            <Navigate to={getDashboardPath(user?.role)} replace />
          ) : (
            <Navigate to="/" replace />
          )
        }
      />
    </Routes>
  );
}

function App() {
  return <AppRoutes />;
}

export default App;
