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
      alert("Please select Farmer or Consumer");
      return;
    }

    onSignup({
      name,
      email,
      password,
      role,
    });
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

            <button
              type="button"
              className={role === "farmer" ? "role selected" : "role"}
              onClick={() => setRole("farmer")}
            >
              👨‍🌾
              <span>Farmer</span>
            </button>

            <button
              type="button"
              className={role === "consumer" ? "role selected" : "role"}
              onClick={() => setRole("consumer")}
            >
              🛒
              <span>Consumer</span>
            </button>

          </div>

          <button type="submit" className="signup-button">
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