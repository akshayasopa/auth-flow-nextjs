"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { loginRequest, signupRequest } from "@/lib/mockApi";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedSession = localStorage.getItem("session");
    if (savedSession) {
      setUser(JSON.parse(savedSession));
    }
    setLoading(false);
  }, []);

  function login(email, password) {
    return loginRequest(email, password).then((userData) => {
      setUser(userData);
      localStorage.setItem("session", JSON.stringify(userData));
      return userData;
    });
  }

  function signup(name, email, password) {
    return signupRequest(name, email, password).then((userData) => {
      setUser(userData);
      localStorage.setItem("session", JSON.stringify(userData));
      return userData;
    });
  }

  function logout() {
    setUser(null);
    localStorage.removeItem("session");
  }

  const value = { user, loading, login, signup, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}