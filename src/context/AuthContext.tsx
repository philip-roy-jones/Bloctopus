import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import {User, AuthContextType}  from "@/types/AuthContext";
import { AUTH_SERVICE_URL } from "@/config";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  // 🟡 1. Fetch user info (e.g. on page refresh or app start)
  const fetchUser = async () => {
    try {
      const res = await fetch("/api/me", {
        credentials: "include", // Send cookies with the request
      });

      if (res.ok) {
        const data = await res.json();
        setUser(data);
      } else {
        setUser(null);
      }
    } catch {
      setUser(null);
    }
  };

  // 🟢 2. Login — no token is returned, just rely on cookie
  const login = async (credentials: { email: string; password: string }) => {
    await fetch(`${AUTH_SERVICE_URL}/api/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include", // Important for sending cookies
      body: JSON.stringify(credentials),
    });

    await fetchUser(); // Get user info after login
  };

  // 🔴 3. Logout — backend clears cookie
  const logout = async () => {
    await fetch(`${AUTH_SERVICE_URL}/api/logout`, {
      method: "POST",
      credentials: "include",
    });
    setUser(null);
  };

  // 🔁 4. On mount, check if already logged in
  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}



export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}