import { useState } from "react";
import LoginPage from "./login.jsx";
import Signup from "./signup.jsx";
import ConsumerPage from "./Consumerpage.jsx";
import FarmerPage from "./FarmerPage.jsx";
import CartPage from "./cartpage.jsx";
import PaymentPage from "./PaymentPage";
import ProfilePanel from "./profilepanel.jsx";
function App() {
  const [page, setPage] = useState("login");
  const [role, setRole] = useState("");
  const [cart, setCart] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [profileOpen, setProfileOpen] = useState(false);

function addToCart(product) {
  setCart((prev) => [...prev, product]);
}

function removeFromCart(productId) {
  setCart((prev) => prev.filter((item) => item.id !== productId));
}
function updateQuantity(productId, quantity) {
  if (quantity < 1) return;
  setCart((prev) =>
    prev.map((item) => (item.id === productId ? { ...item, quantity } : item))
  );
}

  // SIGNUP PAGE
  if (page === "signup") {
    return (
      <Signup
        onSignup={({ name, email, password, role }) => {
          console.log("Name:", name);
          console.log("Email:", email);
          console.log("Password:", password);
          console.log("Role:", role);

          setRole(role);
           setCurrentUser({ name, email, role });
          setPage("login");
        }}
        onBackToLogin={() => {
          setPage("login");
        }}
      />
    );
  }

  // CONSUMER PAGE
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

  // FARMER PAGE
  if (page === "farmer") {
    return <FarmerPage />;
  }
  // CART PAGE
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
if (page === "payment") {
  return (
    <PaymentPage
      cart={cart}
      onNavigate={setPage}
    />
  );
}

  // LOGIN PAGE
  return (
    <LoginPage
      onLogin={({ email, password, remember, role }) => {
        console.log("Email:", email);
        console.log("Password:", password);
        console.log("Remember:", remember);
        console.log("Selected Role:", role);

        setRole(role);
          setCurrentUser((prev) => ({
  ...prev,
  email,
  role,
}));

        if (role === "consumer") {
          setPage("consumer");
        }

        if (role === "farmer") {
          setPage("farmer");
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