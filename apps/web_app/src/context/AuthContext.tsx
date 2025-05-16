import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { User, AuthContextType } from "@/types/AuthContext";
import { AUTH_SERVICE_URL } from "@/config";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // 🟡 1. Fetch user info (e.g. on page refresh or app start)
  const fetchUser = async () => {
    try {
      const res = await fetch(`${AUTH_SERVICE_URL}/api/me`, {
        credentials: "include", // Send cookies with the request
      });

      if (res.ok) {
        const data = await res.json();
        return data;
      } else {
        return null;
      }
    } catch {
      return null;
    }
  };

  // 🟢 2. Login — no token is returned, just rely on cookie
  const login = async (credentials: { email: string; password: string }) => {
    const response = await fetch(`${AUTH_SERVICE_URL}/api/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include", // Important for sending cookies
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      throw new Error("Login failed");
    }

    const fetchedUser = await fetchUser(); // Fetch user info after login
    setUser(fetchedUser);
    setIsAuthenticated(!!fetchedUser);
  };

  // 🔴 3. Logout — backend clears cookie
  const logout = async () => {
    await fetch(`${AUTH_SERVICE_URL}/api/logout`, {
      method: "POST",
      credentials: "include",
    });
    
    setUser(null);
  };

  // 🔁 4. On mount, fetch user data
  useEffect(() => {
    async function loadUser() {
      setIsLoading(true);
      try {
        const u = await fetchUser();
        setUser(u);
      } catch (error) {
        console.error("Failed to fetch user:", error);
      } finally {
        setIsLoading(false);
      }
    }
    loadUser();
  }, []);

  useEffect(() => {
    // This useEffect will always reference the latest `user` value, no mismatches in state
    setIsAuthenticated(!!user);
  }, [user]);

  return (
    <AuthContext.Provider
      value={{ user, login, logout, isAuthenticated, isLoading }}
    >
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
