import { useEffect, useState } from "react";
import { getPublicRoles, registerUser } from "../../services/authService";
import bg from "../../assets/bg.jpg";
import "./signup.css";

function Signup({ onBackToLogin }) {
  const [roles, setRoles] = useState({});
  const [role, setRole] = useState("");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const [status, setStatus] = useState("");

  const roleOptions = [
    { name: "FARMER", label: "Farmer", icon: "👨‍🌾" },
    { name: "CONSUMER", label: "Consumer", icon: "🛒" }
  ];

  useEffect(() => {
    let mounted = true;

    getPublicRoles()
      .then((response) => {
        if (mounted) {
          setRoles(
            Object.fromEntries(
              response.data.roles.map(({ name, _id }) => [name, _id])
            )
          );
        }
      })
      .catch((error) => {
        console.error("Unable to load account types:", error);
        if (mounted) {
          setStatus("error");
        }
      });

    return () => {
      mounted = false;
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check first name
    if (!firstName.trim()) {
      alert("Please enter your first name");
      return;
    }

    // Check last name
    if (!lastName.trim()) {
      alert("Please enter your last name");
      return;
    }

    // Check email
    if (!email.trim()) {
      alert("Please enter your email");
      return;
    }

    // Check phone
    if (!phone.trim()) {
      alert("Please enter your phone number");
      return;
    }

    if (!/^[6-9][0-9]{9}$/.test(phone.trim())) {
      alert("Phone number must be a valid 10-digit Indian number");
      return;
    }

    // Check password
    if (!password) {
      alert("Please create a password");
      return;
    }

    if (password.length < 8) {
      alert("Password must be at least 8 characters");
      return;
    }

    // Check role
    if (!role) {
      alert("Please select your account type");
      return;
    }

    const roleId = roles[role];

    if (!roleId) {
      alert("Invalid account type");
      return;
    }

    setStatus("loading");

    try {
      const response = await registerUser({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim().toLowerCase(),
        phone: phone.trim(),
        password,
        roleId
      });

      if (!response.success) {
        throw new Error(response.message || "Registration failed");
      }

      setStatus("success");

      alert("Account created successfully. Please login.");

      if (onBackToLogin) {
        onBackToLogin();
      }
    } catch (error) {
      console.error("Registration error:", error);

      setStatus("error");

      const validationErrors = error.data?.errors
        ?.map(({ field, message }) => `${field}: ${message}`)
        .join("\n");

      if (validationErrors) {
        alert(validationErrors);
      } else if (error.status === 409) {
        alert(error.message || "An account with these details already exists.");
      } else {
        alert(error.message || "Unable to create account. Please try again.");
      }
    }
  };

  return (
    <div className="signup-page" style={{ backgroundImage: `url(${bg})` }}>
      <div className="signup-box">
        <h1>Create Account</h1>

        <p>Join KisaanBazar</p>

        <form onSubmit={handleSubmit}>
          {/* FIRST NAME */}

          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />

          {/* LAST NAME */}

          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />

          {/* PHONE */}

          <input
            type="tel"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
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
            {roleOptions.map(({ name, label, icon }) => (
                <button
                  key={name}
                  type="button"
                  className={role === name ? "role selected" : "role"}
                  disabled={!roles[name]}
                  onClick={() => setRole(name)}
                >
                  {icon}
                  <span>{label}</span>
                </button>
            ))}
          </div>
          {status === "error" && (
            <p role="alert">
              Account types could not be loaded. Please refresh and try again.
            </p>
          )}

          {/* CREATE ACCOUNT */}

          <button
            type="submit"
            className="signup-button"
            disabled={status === "loading"}
          >
            {status === "loading" ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        {/* LOGIN */}

        <p>
          Already have an account?{" "}
          <button type="button" className="back-login" onClick={onBackToLogin}>
            Login
          </button>
        </p>
      </div>
    </div>
  );
}

export default Signup;
