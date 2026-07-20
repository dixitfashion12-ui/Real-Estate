import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type User = {
  name: string;
  email: string;
};

type AuthContextValue = {
  user: User | null;
  hydrated: boolean;
  login: (email: string, name?: string) => void;
  register: (name: string, email: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

const STORAGE_KEY = "homzy:user";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [hydrated, setHydrated] = useState(false);

  // Client-only load; SSR renders logged-out to keep markup deterministic.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setUser(JSON.parse(raw));
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, []);

  const persist = (u: User | null) => {
    setUser(u);
    try {
      if (u) localStorage.setItem(STORAGE_KEY, JSON.stringify(u));
      else localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
  };

  const login = (email: string, name?: string) =>
    persist({ email, name: name || email.split("@")[0].replace(/[._]/g, " ") });

  const register = (name: string, email: string) => persist({ name, email });

  const logout = () => persist(null);

  return (
    <AuthContext.Provider value={{ user, hydrated, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}
