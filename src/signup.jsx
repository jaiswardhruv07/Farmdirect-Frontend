import { useState } from "react";
import "./signup.css";

function Signup({ onSignup, onBackToLogin }) {
  const [role, setRole] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!role) {
      alert("Please select your account type");
      return;
    }

    const user = {
      name,
      email,
      password,
      role,
    };

    // Save user information in browser
    localStorage.setItem("kb_user", JSON.stringify(user));

    // Send user information to App.js
    onSignup(user);
  };

  return (
    <div className="signup-page">

      <div className="signup-box">

        <h1>Create Account</h1>

        <p>Join KisaanBazar</p>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <h3>I am a:</h3>

          <div className="role-selection">

            {/* FARMER */}
            <button
              type="button"
              className={
                role === "farmer"
                  ? "role selected"
                  : "role"
              }
              onClick={() => setRole("farmer")}
            >
              👨‍🌾
              <span>Farmer</span>
            </button>

            {/* CONSUMER */}
            <button
              type="button"
              className={
                role === "consumer"
                  ? "role selected"
                  : "role"
              }
              onClick={() => setRole("consumer")}
            >
              🛒
              <span>Consumer</span>
            </button>

            {/* FPO */}
            <button
              type="button"
              className={
                role === "fpo"
                  ? "role selected"
                  : "role"
              }
              onClick={() => setRole("fpo")}
            >
              🏢
              <span>FPO</span>
            </button>

            {/* GOVERNMENT */}
            <button
              type="button"
              className={
                role === "government"
                  ? "role selected"
                  : "role"
              }
              onClick={() => setRole("government")}
            >
              🏛️
              <span>Government</span>
            </button>

            {/* ADMIN */}
            <button
              type="button"
              className={
                role === "admin"
                  ? "role selected"
                  : "role"
              }
              onClick={() => setRole("admin")}
            >
              👨‍💻
              <span>Admin</span>
            </button>

          </div>

          <button
            type="submit"
            className="signup-button"
          >
            Create Account
          </button>

        </form>

        <p>
          Already have an account?{" "}

          <button
            className="back-login"
            onClick={onBackToLogin}
          >
            Login
          </button>
        </p>

      </div>

    </div>
  );
}

export default Signup;