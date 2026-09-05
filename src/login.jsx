import { useState } from "react";

export default function LoginPage({
  onLogin,
  onNavigateSignup,
  onNavigateForgotPassword,
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("");

  const validateForm = () => {
    const newErrors = {};

    if (!email.trim()) {
      newErrors.email = "Please enter your email";
    } else if (!email.includes("@")) {
      newErrors.email = "Please enter a valid email";
    }

    if (!password) {
      newErrors.password = "Please enter your password";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setStatus("");

    if (!validateForm()) {
      return;
    }

    const savedUser = JSON.parse(
      localStorage.getItem("kb_user")
    );

    if (!savedUser) {
      setStatus("error");
      alert("No account found. Please sign up first.");
      return;
    }

    if (
      email.trim() === savedUser.email &&
      password === savedUser.password
    ) {
      setStatus("loading");

      setTimeout(() => {
        setStatus("success");

        if (onLogin) {
          onLogin(savedUser);
        }
      }, 500);
    } else {
      setStatus("error");
      alert("Invalid email or password");
    }
  };

  return (
    <>
      <style>{`
        * {
          box-sizing: border-box;
        }

        body {
          margin: 0;
          font-family: Arial, Helvetica, sans-serif;
          background: #f7f3f1;
        }

        .login-page {
          min-height: 100vh;
          display: flex;
          background: #f7f3f1;
        }

        /* LEFT SIDE */

        .login-left {
          width: 50%;
          min-height: 100vh;
          background: #3b2428;
          color: white;
          padding: 55px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .brand {
          font-size: 42px;
          font-weight: 700;
          margin-bottom: 15px;
        }

        .brand span {
          color: #e7b8a8;
        }

        .tagline {
          font-size: 19px;
          line-height: 1.6;
          color: #eadedb;
          max-width: 480px;
          margin-bottom: 45px;
        }

        .story-title {
          font-size: 25px;
          margin-bottom: 15px;
        }

        .story-text {
          font-size: 16px;
          line-height: 1.7;
          color: #dbcac6;
          max-width: 480px;
        }

        .stats {
          display: flex;
          gap: 45px;
          margin-top: 45px;
        }

        .stat-number {
          font-size: 28px;
          font-weight: bold;
        }

        .stat-label {
          color: #cdbbb7;
          font-size: 13px;
          margin-top: 5px;
        }

        /* RIGHT SIDE */

        .login-right {
          width: 50%;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 35px;
        }

        .login-card {
          width: 100%;
          max-width: 470px;
          background: white;
          padding: 42px;
          border-radius: 22px;
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.08);
        }

        .login-title {
          font-size: 32px;
          color: #302124;
          margin: 0 0 8px;
        }

        .login-subtitle {
          color: #777;
          margin-bottom: 30px;
        }

        .form-group {
          margin-bottom: 20px;
        }

        .form-label {
          display: block;
          font-size: 14px;
          font-weight: 600;
          color: #332326;
          margin-bottom: 8px;
        }

        .input-wrapper {
          position: relative;
        }

        .input-field {
          width: 100%;
          padding: 14px 16px;
          border: 1px solid #d5cecc;
          border-radius: 12px;
          font-size: 15px;
          outline: none;
          transition: 0.2s;
        }

        .input-field:focus {
          border-color: #633b42;
          box-shadow: 0 0 0 3px rgba(99, 59, 66, 0.1);
        }

        .password-input {
          padding-right: 70px;
        }

        .show-password {
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
          border: none;
          background: transparent;
          color: #633b42;
          cursor: pointer;
          font-size: 13px;
          font-weight: 600;
        }

        .error-text {
          color: #c0392b;
          font-size: 12px;
          margin-top: 6px;
        }

        /* REMEMBER + FORGOT */

        .login-options {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin: 8px 0 25px;
        }

        .remember-label {
          display: flex;
          align-items: center;
          gap: 7px;
          color: #666;
          font-size: 13px;
        }

        .forgot-button {
          border: none;
          background: transparent;
          color: #633b42;
          cursor: pointer;
          font-size: 13px;
          font-weight: 600;
        }

        /* LOGIN BUTTON */

        .login-button {
          width: 100%;
          padding: 15px;
          border: none;
          border-radius: 13px;
          background: #3b2428;
          color: white;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: 0.2s;
        }

        .login-button:hover {
          background: #4b2d32;
        }

        .login-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .status-message {
          text-align: center;
          margin-top: 15px;
          font-size: 13px;
        }

        .success {
          color: #287a45;
        }

        /* SIGN UP */

        .signup-text {
          text-align: center;
          margin-top: 25px;
          color: #777;
          font-size: 14px;
        }

        .signup-button {
          border: none;
          background: transparent;
          color: #633b42;
          font-weight: 700;
          cursor: pointer;
          font-size: 14px;
        }

        /* MOBILE */

        @media (max-width: 850px) {
          .login-page {
            flex-direction: column;
          }

          .login-left,
          .login-right {
            width: 100%;
            min-height: auto;
          }

          .login-left {
            padding: 40px 25px;
          }

          .login-right {
            padding: 25px;
          }

          .stats {
            margin-top: 30px;
          }
        }
      `}</style>

      <div className="login-page">

        {/* LEFT SECTION */}

        <section className="login-left">

          <div className="brand">
            Kisaan<span>Bazar</span>
          </div>

          <div className="tagline">
            Connecting farmers directly with consumers.
            <br />
            Fresh products. Fair prices. Better connections.
          </div>

          <h2 className="story-title">
            From Farm to Your Home
          </h2>

          <p className="story-text">
            KisaanBazar creates a simple connection between
            farmers and consumers, making it easier to discover,
            sell and buy fresh agricultural products.
          </p>

          <div className="stats">

            <div>
              <div className="stat-number">100+</div>
              <div className="stat-label">Farmers</div>
            </div>

            <div>
              <div className="stat-number">500+</div>
              <div className="stat-label">Products</div>
            </div>

            <div>
              <div className="stat-number">1000+</div>
              <div className="stat-label">Consumers</div>
            </div>

          </div>

        </section>

        {/* RIGHT SECTION */}

        <section className="login-right">

          <div className="login-card">

            <h1 className="login-title">
              Welcome Back
            </h1>

            <p className="login-subtitle">
              Login to your KisaanBazar account
            </p>

            <form onSubmit={handleSubmit}>

              {/* EMAIL */}

              <div className="form-group">

                <label className="form-label">
                  Email
                </label>

                <input
                  className="input-field"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                {errors.email && (
                  <div className="error-text">
                    {errors.email}
                  </div>
                )}

              </div>

              {/* PASSWORD */}

              <div className="form-group">

                <label className="form-label">
                  Password
                </label>

                <div className="input-wrapper">

                  <input
                    className="input-field password-input"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />

                  <button
                    type="button"
                    className="show-password"
                    onClick={() =>
                      setShowPassword(!showPassword)
                    }
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>

                </div>

                {errors.password && (
                  <div className="error-text">
                    {errors.password}
                  </div>
                )}

              </div>

              {/* REMEMBER + FORGOT */}

              <div className="login-options">

                <label className="remember-label">

                  <input
                    type="checkbox"
                    checked={remember}
                    onChange={(e) =>
                      setRemember(e.target.checked)
                    }
                  />

                  Remember me

                </label>

                <button
                  type="button"
                  className="forgot-button"
                  onClick={onNavigateForgotPassword}
                >
                  Forgot Password?
                </button>

              </div>

              {/* LOGIN BUTTON */}

              <button
                type="submit"
                className="login-button"
                disabled={status === "loading"}
              >
                {status === "loading"
                  ? "Logging in..."
                  : "Log In"}
              </button>

              {status === "success" && (
                <div className="status-message success">
                  Login successful!
                </div>
              )}

            </form>

            {/* SIGN UP */}

            <div className="signup-text">

              Don't have an account?

              <button
                className="signup-button"
                onClick={onNavigateSignup}
              >
                Sign Up
              </button>

            </div>

          </div>

        </section>

      </div>
    </>
  );
}