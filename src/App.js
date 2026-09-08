import { Routes, Route, Navigate, useNavigate } from "react-router-dom";

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
import FPOPage from "./pages/fpo/FPOPage";
import ConsumerPage from "./pages/consumer/Consumerpage";

// OTHER
import CartPage from "./pages/cart/cartpage";
import PaymentPage from "./pages/payment/PaymentPage";

function AppRoutes() {
  const navigate = useNavigate();
  const { user, isAuthenticated, loading } = useAuth();

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

      <Route element={<ProtectedRoute allowedRoles={["CONSUMER"]} />}>
        <Route path="/consumer" element={<ConsumerPage />} />
      </Route>

      <Route element={<ProtectedRoute allowedRoles={["ADMIN"]} />}>
        <Route path="/admin" element={<AdminPage />} />
      </Route>

      <Route element={<ProtectedRoute allowedRoles={["GOVERNMENT_OFFICER"]} />}>
        <Route path="/government" element={<GovernmentPage />} />
      </Route>

      <Route element={<ProtectedRoute allowedRoles={["FPO"]} />}>
        <Route path="/fpo" element={<FPOPage />} />
      </Route>

      <Route element={<ProtectedRoute allowedRoles={["BULK_BUYER"]} />}>
        <Route path="/bulkbuyer" element={<BulkBuyerPage />} />
      </Route>

      {/* ================= OTHER PROTECTED ROUTES ================= */}

      <Route element={<ProtectedRoute allowedRoles={["CONSUMER"]} />}>
        <Route path="/cart" element={<CartPage />} />
        <Route path="/payment" element={<PaymentPage />} />
      </Route>

      {/* ================= FALLBACK ================= */}

      <Route
        path="*"
        element={
          isAuthenticated ? (
            <Navigate to={getDashboardPath(user?.role)} replace />
          ) : (
            <Navigate to="/login" replace />
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
