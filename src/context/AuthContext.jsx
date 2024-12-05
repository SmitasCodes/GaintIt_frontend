import {
  useContext,
  useState,
  createContext,
  useEffect,
  useCallback,
} from "react";

const AuthContext = createContext();

const useAuth = () => {
  return useContext(AuthContext) || {};
};

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const userString = localStorage.getItem("user");
    return userString ? JSON.parse(userString) : null;
  });

  const checkAuth = useCallback(() => {
    const userString = localStorage.getItem("user");
    setUser(userString ? JSON.parse(userString) : null);
  }, []);

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!user,
        username: user?.username || null,
        token: user?.token || null,
        checkAuth,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, useAuth };
