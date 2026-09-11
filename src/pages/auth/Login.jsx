import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { loginUser } from "../../services/authService";
import loginImage from "../../assets/image.png";

export default function LoginPage({
  onLogin,
  onNavigateSignup,
  onNavigateForgotPassword,
}) {
  const { login } = useAuth();

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    setStatus("");

    if (!validateForm()) {
      return;
    }

    setStatus("loading");

    try {
      const response = await loginUser(email.trim(), password);

      if (!response.success) {
        throw new Error(response.message || "Login failed");
      }

      const { user, token } = response.data;

      // Existing authentication logic
      login({ user, token });

      setStatus("success");

      // Existing App.js navigation
      if (onLogin) {
        onLogin(user);
      }
    } catch (error) {
      console.error("Login error:", error);

      setStatus("error");

      if (error.status === 401) {
        alert("Invalid email or password");
      } else {
        alert(error.message || "Unable to login. Please try again.");
      }
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
          background: #f7f6f3;
        }

        /* =====================================================
           MAIN LOGIN PAGE
        ===================================================== */

        .login-page {
          min-height: 100vh;
          width: 100%;
          display: flex;
          background: #f7f6f3;
        }

        /* =====================================================
           LEFT SIDE
        ===================================================== */

     .login-left {
  position: relative;
  width: 51%;
  min-height: 100vh;
  overflow: hidden;

  display: flex;
  flex-direction: column;
  justify-content: center;

  padding: 60px 62px;

  color: white;

  background-image: url("/image.png");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

        /*
          If you don't have farm-login.jpg,
          remove the url("/farm-login.jpg") part.

          You can also replace it with your existing
          farmer/corn image path.
        */

        .login-left::after {
          content: "";
          position: absolute;
          inset: 0;

          background: linear-gradient(
            90deg,
            rgba(83, 92, 57, 0.30),
            rgba(83, 92, 57, 0.05)
          );

          pointer-events: none;
        }

        .login-left > * {
          position: relative;
          z-index: 1;
        }

        /* =====================================================
           BRAND
        ===================================================== */

        .brand {
          font-size: 42px;
          line-height: 1.1;
          font-weight: 700;
          letter-spacing: -1px;

          margin-bottom: 16px;

          color: #ffffff;
        }

        .brand span {
          color: #dce9c7;
        }

        /* =====================================================
           TAGLINE
        ===================================================== */

        .tagline {
          font-size: 18px;
          line-height: 1.55;

          color: #ffffff;

          max-width: 490px;

          margin-bottom: 48px;
        }

        /* =====================================================
           STORY
        ===================================================== */

        .story-title {
          margin: 0 0 14px;

          font-size: 25px;
          line-height: 1.3;

          font-weight: 700;

          color: #e3edcf;
        }

        .story-text {
          margin: 0;

          max-width: 500px;

          font-size: 16px;
          line-height: 1.7;

          color: #ffffff;
        }

        /* =====================================================
           STATS
        ===================================================== */

        .stats {
          display: flex;
          align-items: flex-start;

          gap: 48px;

          margin-top: 48px;
        }

        .stat-number {
          font-size: 28px;
          line-height: 1;

          font-weight: 700;

          color: #ffffff;

          margin-bottom: 8px;
        }

        .stat-label {
          font-size: 14px;
          line-height: 1.3;

          color: #f0f1eb;
        }

        /* =====================================================
           RIGHT SIDE
        ===================================================== */

        .login-right {
          width: 49%;
          min-height: 100vh;

          display: flex;
          align-items: center;
          justify-content: center;

          padding: 40px;
        }

        /* =====================================================
           LOGIN CARD
        ===================================================== */

        .login-card {
          width: 100%;
          max-width: 505px;

          padding: 40px 40px 38px;

          background: #ffffff;

          border-radius: 21px;

          box-shadow:
            0 12px 35px rgba(0, 0, 0, 0.08);

          border: 1px solid rgba(0, 0, 0, 0.02);
        }

        /* =====================================================
           TITLE
        ===================================================== */

        .login-title {
          margin: 0 0 7px;

          font-size: 34px;
          line-height: 1.2;

          font-weight: 700;

          letter-spacing: -0.5px;

          color: #25343a;
        }

        .login-subtitle {
          margin: 0 0 30px;

          font-size: 15px;
          line-height: 1.5;

          color: #899093;
        }

        /* =====================================================
           FORM
        ===================================================== */

        .form-group {
          margin-bottom: 20px;
        }

        .form-label {
          display: block;

          margin-bottom: 8px;

          font-size: 14px;
          line-height: 1.3;

          font-weight: 700;

          color: #293438;
        }

        .input-wrapper {
          position: relative;
          width: 100%;
        }

        .input-field {
          width: 100%;

          height: 52px;

          padding: 0 16px;

          border: 1px solid #d9ddda;
          border-radius: 12px;

          background: #ffffff;

          color: #30383b;

          font-size: 15px;

          outline: none;

          transition: border-color 0.2s ease,
                      box-shadow 0.2s ease;
        }

        .input-field::placeholder {
          color: #9ba2a4;
        }

        .input-field:focus {
          border-color: #687844;

          box-shadow:
            0 0 0 3px rgba(104, 120, 68, 0.10);
        }

        .password-input {
          padding-right: 70px;
        }

        /* =====================================================
           SHOW PASSWORD
        ===================================================== */

        .show-password {
          position: absolute;

          right: 15px;
          top: 50%;

          transform: translateY(-50%);

          padding: 0;

          border: none;

          background: transparent;

          color: #686868;

          cursor: pointer;

          font-size: 13px;
          font-weight: 600;
        }

        .show-password:hover {
          color: #535c39;
        }

        /* =====================================================
           ERRORS
        ===================================================== */

        .error-text {
          margin-top: 6px;

          color: #c0392b;

          font-size: 12px;
          line-height: 1.3;
        }

        /* =====================================================
           REMEMBER / FORGOT
        ===================================================== */

        .login-options {
          display: flex;
          align-items: center;
          justify-content: space-between;

          margin: 8px 0 25px;
        }

        .remember-label {
          display: flex;
          align-items: center;

          gap: 7px;

          color: #737879;

          font-size: 13px;

          cursor: pointer;
        }

        .remember-label input {
          width: 14px;
          height: 14px;

          accent-color: #535c39;

          cursor: pointer;
        }

        .forgot-button {
          padding: 0;

          border: none;

          background: transparent;

          color: #5d5d5d;

          cursor: pointer;

          font-size: 13px;
          font-weight: 700;
        }

        .forgot-button:hover {
          color: #535c39;
        }

        /* =====================================================
           LOGIN BUTTON
        ===================================================== */

        .login-button {
          width: 100%;

          height: 55px;

          padding: 0;

          border: none;
          border-radius: 12px;

          background: #535c39;

          color: #ffffff;

          font-size: 16px;
          font-weight: 700;

          cursor: pointer;

          transition:
            background 0.2s ease,
            transform 0.1s ease;
        }

        .login-button:hover {
          background: #647040;
        }

        .login-button:active {
          transform: scale(0.99);
        }

        .login-button:disabled {
          opacity: 0.65;

          cursor: not-allowed;
        }

        /* =====================================================
           STATUS
        ===================================================== */

        .status-message {
          text-align: center;

          margin-top: 15px;

          font-size: 13px;
        }

        .success {
          color: #607a28;
        }

        /* =====================================================
           SIGN UP
        ===================================================== */

        .signup-text {
          text-align: center;

          margin-top: 22px;

          color: #858585;

          font-size: 14px;
        }

        .signup-button {
          padding: 20px;
        
          border: none;
        
          background: transparent;

          color: #535c39;

          font-weight: 700;

          cursor: pointer;

          font-size: 14px;
        }

        .signup-button:hover {
          color: #394026;
        }

        /* =====================================================
           TABLET
        ===================================================== */

        @media (max-width: 1000px) {

          .login-left {
            padding: 45px;
          }

          .brand {
            font-size: 36px;
          }

          .tagline {
            font-size: 16px;
          }

          .story-title {
            font-size: 22px;
          }

          .story-text {
            font-size: 14px;
          }

          .stats {
            gap: 30px;
          }

          .stat-number {
            font-size: 24px;
          }

        }

        /* =====================================================
           MOBILE
        ===================================================== */

        @media (max-width: 850px) {

          .login-page {
            flex-direction: column;
          }

          .login-left {
            width: 100%;
            min-height: auto;

            padding: 45px 30px;
          }

          .login-right {
            width: 100%;
            min-height: auto;

            padding: 30px 20px;
          }

          .login-card {
            max-width: 500px;

            padding: 32px 25px;
          }

          .brand {
            font-size: 34px;
          }

          .stats {
            margin-top: 35px;
          }

        }

        /* =====================================================
           SMALL MOBILE
        ===================================================== */

        @media (max-width: 500px) {

          .login-left {
            padding: 35px 22px;
          }

          .brand {
            font-size: 30px;
          }

          .tagline {
            font-size: 15px;
            margin-bottom: 35px;
          }

          .story-title {
            font-size: 21px;
          }

          .story-text {
            font-size: 14px;
          }

          .stats {
            gap: 25px;
          }

          .stat-number {
            font-size: 21px;
          }

          .stat-label {
            font-size: 12px;
          }

          .login-right {
            padding: 20px 15px;
          }

          .login-card {
            padding: 28px 20px;
            border-radius: 17px;
          }

          .login-title {
            font-size: 29px;
          }

        }

      `}</style>

      <div className="login-page">

        {/* =====================================================
            LEFT SIDE
        ===================================================== */}

        <section
          className="login-left"
          style={{ backgroundImage: `url(${loginImage})` }}
        >

          <div className="brand">
            <span>GO-FARM</span>
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
            GO-FARM creates a simple connection between
            farmers and consumers, making it easier to discover,
            sell and buy fresh agricultural products.
          </p>

          <div className="stats">

            <div>
              <div className="stat-number">
                100+
              </div>

              <div className="stat-label">
                Farmers
              </div>
            </div>

            <div>
              <div className="stat-number">
                500+
              </div>

              <div className="stat-label">
                Products
              </div>
            </div>

            <div>
              <div className="stat-number">
                1000+
              </div>

              <div className="stat-label">
                Consumers
              </div>
            </div>

          </div>

        </section>

        {/* =====================================================
            RIGHT SIDE
        ===================================================== */}

        <section className="login-right">

          <div className="login-card">

            <h1 className="login-title">
              Welcome Back
            </h1>

            <p className="login-subtitle">
              Login to your GO-FARM account
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

              {/* LOGIN */}

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

              Don't have an account?{" "}

              <button
                type="button"
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