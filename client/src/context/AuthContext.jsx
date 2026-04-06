import { createContext, useContext, useState, useEffect } from "react";
const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [ user, setUser ] = useState(null);

  useEffect(() => {
    const raw = localStorage.getItem("user");
    if (raw) setUser(JSON.parse(raw));
  }, []);

  const login = usr => {
    setUser(usr);
    localStorage.setItem("user", JSON.stringify(usr));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
export const useAuth = () => useContext(AuthContext);