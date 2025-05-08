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
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [isBlocked, setIsBlocked] = useState(false);

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
    /*
    const response = await fetch(`${AUTH_SERVICE_URL}/api/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include", // Important for sending cookies
      body: JSON.stringify(credentials),
    });

    const responseData = await response.json();
    console.log("Login response:", responseData);

    await fetchUser(); // Get user info after login
    */
    // TODO: Replace with actual login logic
    if (isBlocked) {
      throw new Error("Too many failed attempts. Please try again later.");
    }

    try {
      if (
        credentials.email === "jonephil@oregonstate.edu" &&
        credentials.password === "password"
      ) {
        const testUser = {
          id: "1",
          email: "jonephil@oregonstate.edu",
          role: "user",
          displayName: "Philip Jones",
        };
        setUser(testUser);
        setFailedAttempts(0); // Reset failed attempts on successful login
      } else {
        throw new Error("Invalid credentials");
      }
    } catch (error) {
      setFailedAttempts((prev) => prev + 1);

      if (failedAttempts + 1 >= 5) {
        setIsBlocked(true);
        setTimeout(() => {
          setIsBlocked(false);
          setFailedAttempts(0); // Reset failed attempts after block period
        }, 15 * 60 * 1000); // 15 minutes
      }

      throw error;
    }
  };

  // 🔴 3. Logout — backend clears cookie
  const logout = async () => {
    /*
    await fetch(`${AUTH_SERVICE_URL}/api/logout`, {
      method: "POST",
      credentials: "include",
    });
    */
    setUser(null);
  };

  // 🔁 4. On mount, check if already logged in
  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, login, logout, isAuthenticated: !!user }}
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
