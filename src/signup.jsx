import { useState } from "react";
import "./signup.css";

function Signup({ onSignup, onBackToLogin }) {
  const [role, setRole] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check name
    if (!name.trim()) {
      alert("Please enter your full name");
      return;
    }

    // Check email
    if (!email.trim()) {
      alert("Please enter your email");
      return;
    }

    // Check password
    if (!password) {
      alert("Please create a password");
      return;
    }

    // Check role
    if (!role) {
      alert("Please select your account type");
      return;
    }

    const user = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      password,
      role,
    };

    // Save account in browser
    localStorage.setItem("kb_user", JSON.stringify(user));

    // Send account information to App.js
    onSignup(user);
  };

  return (
    <div className="signup-page">

      <div className="signup-box">

        <h1>Create Account</h1>

        <p>Join KisaanBazar</p>

        <form onSubmit={handleSubmit}>

          {/* NAME */}

          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          {/* EMAIL */}

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* PASSWORD */}

          <input
            type="password"
            placeholder="Create Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* ROLE */}

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

          {/* CREATE ACCOUNT */}

          <button
            type="submit"
            className="signup-button"
          >
            Create Account
          </button>

        </form>

        {/* LOGIN */}

        <p>
          Already have an account?{" "}

          <button
            type="button"
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