import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { User, AuthContextType } from "@/types/AuthContext";
import { UnauthorizedError } from "@/errors/UnauthorizedError";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // 🟡 1. Fetch user info (e.g. on page refresh or app start)
  const fetchUser = async () => {
    try {
      const res = await fetch(`/api/users/me`, {
        credentials: "include", // Send cookies with the request
      });

      if (res.ok) {
        const data = await res.json();
        return data;
      } else if (res.status === 401) {
        return null;
      } else {
        console.warn("Unexpected response:", res.status);
        return null;
      }
    } catch (err) {
      console.error("Fetch failed:", err);
      return null;
    }
  };

  // 🟢 2. Login — no token is returned, just rely on cookie
  const login = async (credentials: { email: string; password: string }) => {
    const response = await fetch(`/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include", // Important for sending cookies
      body: JSON.stringify(credentials),
    });
    console.log("Login response: ", await response.json());
    if (!response.ok) {
      if (response.status === 401) {
        throw new UnauthorizedError("Invalid email or password");
      }
      throw new Error("Login failed");
    }

    const fetchedUser = await fetchUser(); // Fetch user info after login
    setUser(fetchedUser);
  };

  // 🔴 3. Logout — backend clears cookie
  const logout = async () => {
    await fetch(`/api/auth/logout`, {
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

  return (
    <AuthContext.Provider
      value={{ user, login, logout, isAuthenticated: !!user, isLoading }}
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
