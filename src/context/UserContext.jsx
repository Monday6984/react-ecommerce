import { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  // Load user from LocalStorage
  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) setUser(JSON.parse(stored));
  }, []);

  // Sync user to LocalStorage
  useEffect(() => {
    if (user) localStorage.setItem("user", JSON.stringify(user));
    else localStorage.removeItem("user");
  }, [user]);

  function login(email, password) {
    // Fake auth for now
    setUser({ email });
  }

  function signup(email, password) {
    // Fake signup
    setUser({ email });
  }

  function logout() {
    setUser(null);
  }

  return (
    <UserContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
