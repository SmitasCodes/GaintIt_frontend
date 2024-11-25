import { useContext, useState, createContext, useEffect } from "react";

const AuthContext = createContext();

const useAuth = () => {
  return useContext(AuthContext) || {};
};

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [username, setUsername] = useState(null);

  const checkAuth = () => {
    const userString = localStorage.getItem("user");
    const userObj = JSON.parse(userString);

    if (userObj) {
      setIsLoggedIn(true);
      setUsername(userObj.username);
    } else {
      setIsLoggedIn(false);
      setUsername(null);
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    checkAuth();
  };

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        username,
        checkAuth,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, useAuth };
