import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (storedToken) {
      setToken(storedToken);
    }

    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        localStorage.removeItem("user");
      }
    }

    setLoading(false);
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
  };

  // Check whether the authenticated user has a specific permission
  const hasPermission = (permission) => {
    return user?.permissions?.includes(permission) ?? false;
  };

  // Check whether the authenticated user has at least one permission
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
