import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (username, password) => {
    if (username === "admin" && password === "admin123") {
      const userData = { role: "admin" };
      setUser(userData);
      return userData;
    } 
    else if (username === "staff" && password === "staff123") {
      const userData = { role: "staff" };
      setUser(userData);
      return userData;
    } 
    else {
      alert("Invalid credentials");
      return null;
    }
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};