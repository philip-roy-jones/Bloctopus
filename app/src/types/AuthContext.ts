interface User {
  id: string;
  email: string;
  role: string;
  displayName: string;
}

interface AuthContextType {
  user: User | null;
  login: (credentials: { email: string; password: string }) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

export type { User, AuthContextType };