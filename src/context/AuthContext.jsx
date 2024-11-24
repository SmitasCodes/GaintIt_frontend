import { useContext, useState, createContext } from "react";

export const AuthContext = createContext();

export const useAuth = () => {
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
      setUsername(user.username);
    } else {
      setIsLoggedIn(false);
      setUsername(user.username);
    }

    // useEffect(() => {
    //   checkAuthStatus();
    // }, [isLoggedIn]);

    return (
      <AuthContext.Provider
        value={{
          isLoggedIn,
          username,
          checkAuth,
        }}
      >
        {children}
      </AuthContext.Provider>
    );
  };
};

export { AuthProvider };
