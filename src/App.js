import { useState } from "react";
import LoginPage from "./login.jsx";
import Signup from "./signup.jsx";
import ConsumerPage from "./Consumerpage.jsx";
import FarmerPage from "./FarmerPage.jsx";
import CartPage from "./cartpage.jsx";
import PaymentPage from "./PaymentPage";
import ProfilePanel from "./profilepanel.jsx";
import AdminPage from "./AdminPage.jsx";
import GovernmentPage from "./GovernmentPage.jsx";
import FPOPage from "./fpo.jsx";
function App() {
  const [page, setPage] = useState("login");
  const [role, setRole] = useState("");
  const [cart, setCart] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [profileOpen, setProfileOpen] = useState(false);

  // ─────────────────────────────────────
  // CART FUNCTIONS
  // ─────────────────────────────────────

  function addToCart(product) {
    setCart((prev) => [...prev, product]);
  }

  function removeFromCart(productId) {
    setCart((prev) =>
      prev.filter((item) => item.id !== productId)
    );
  }

  function updateQuantity(productId, quantity) {
    if (quantity < 1) return;

    setCart((prev) =>
      prev.map((item) =>
        item.id === productId
          ? { ...item, quantity }
          : item
      )
    );
  }

  // ─────────────────────────────────────
  // SIGNUP PAGE
  // ─────────────────────────────────────

  if (page === "signup") {
    return (
      <Signup
        onSignup={({ name, email, password, role }) => {
          console.log("Name:", name);
          console.log("Email:", email);
          console.log("Password:", password);
          console.log("Role:", role);

          setRole(role);

          setCurrentUser({
            name,
            email,
            role,
          });

          setPage("login");
        }}
        onBackToLogin={() => {
          setPage("login");
        }}
      />
    );
  }

  // ─────────────────────────────────────
  // CONSUMER PAGE
  // ─────────────────────────────────────

  if (page === "consumer") {
    return (
      <>
        <ConsumerPage
          onNavigate={setPage}
          onAddToCart={addToCart}
          cartCount={cart.length}
          user={currentUser}
          onProfile={() => setProfileOpen(true)}
        />

        {profileOpen && (
          <ProfilePanel
            user={currentUser}
            onClose={() => setProfileOpen(false)}
          />
        )}
      </>
    );
  }

  // ─────────────────────────────────────
  // FARMER PAGE
  // ─────────────────────────────────────

  if (page === "farmer") {
    return (
      <FarmerPage
        farmer={currentUser}
        onNavigate={setPage}
      />
    );
  }

  // ─────────────────────────────────────
  // ADMIN PAGE
  // ─────────────────────────────────────

  if (page === "admin") {
    return (
      <AdminPage
        onNavigate={setPage}
        user={currentUser}
      />
    );
  }
  // ─────────────────────────────────────
// GOVERNMENT PAGE
// ─────────────────────────────────────

if (page === "government") {
  return (
    <GovernmentPage
      user={currentUser}
      onNavigate={setPage}
    />
  );
}
if (page === "fpo") {
  return (
    <FPOPage
      user={currentUser}
      onNavigate={setPage}
    />
  );
}
  // ─────────────────────────────────────
  // CART PAGE
  // ─────────────────────────────────────

  if (page === "cart") {
    return (
      <CartPage
        cart={cart}
        onRemove={removeFromCart}
        onUpdateQuantity={updateQuantity}
        onNavigate={setPage}
        onAddToCart={addToCart}
      />
    );
  }

  // ─────────────────────────────────────
  // PAYMENT PAGE
  // ─────────────────────────────────────

  if (page === "payment") {
    return (
      <PaymentPage
        cart={cart}
        onNavigate={setPage}
      />
    );
  }

  // ─────────────────────────────────────
  // LOGIN PAGE
  // ─────────────────────────────────────

return (
  <LoginPage
    onLogin={(user) => {
      console.log("Logged in user:", user);

      setCurrentUser(user);
      setRole(user.role);

     if (user.role === "consumer") {
  setPage("consumer");
} else if (user.role === "farmer") {
  setPage("farmer");
} else if (user.role === "admin") {
  setPage("admin");
} else if (user.role === "government") {
  setPage("government");
} else if (user.role === "fpo") {
  setPage("fpo");
} else {
  alert("This account type is not available yet.");
}
    }}

    onNavigateSignup={() => {
      setPage("signup");
    }}

    onNavigateForgotPassword={() => {
      alert("Forgot Password");
    }}
  />
);
 
}

export default App;