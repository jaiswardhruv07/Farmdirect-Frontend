import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "../services/authService";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    const restoreSession = async () => {
      if (!storedToken) {
        setLoading(false);
        return;
      }

      setToken(storedToken);

      try {
        const response = await getCurrentUser();
        const currentUser = response.data;
        setUser(currentUser);
        localStorage.setItem("user", JSON.stringify(currentUser));
      } catch (error) {
        console.error("Unable to restore session:", error);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setToken(null);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    if (storedUser && !storedToken) {
      localStorage.removeItem("user");
    }

    restoreSession();
  }, []);

  const login = (authData) => {
    const receivedToken = authData.token;
    const receivedUser = authData.user;

    localStorage.setItem("token", receivedToken);

    if (receivedUser) {
      localStorage.setItem("user", JSON.stringify(receivedUser));
    }

    setToken(receivedToken);
    setUser(receivedUser || null);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setToken(null);
    setUser(null);

    navigate("/login", { replace: true });
  };

  const hasPermission = (permission) => {
    return user?.permissions?.includes(permission) ?? false;
  };

  const hasAnyPermission = (permissions) => {
    if (!Array.isArray(permissions)) {
      return false;
    }

    return permissions.some((permission) =>
      user?.permissions?.includes(permission)
    );
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        isAuthenticated: !!token,
        login,
        logout,
        hasPermission,
        hasAnyPermission
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
};
