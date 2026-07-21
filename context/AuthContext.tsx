import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { saveUserToAirtable } from "../lib/airtable";

export type User = {
  name: string;
  email: string;
};

type AuthContextValue = {
  user: User | null;
  hydrated: boolean;
  login: (email: string, password: string, name?: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
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

  const login = async (email: string, password: string, name?: string) => {
    const user = { email, name: name || email.split("@")[0].replace(/[._]/g, " ") };
    persist(user);

    // Save to Airtable in the background, don't block authentication
    saveUserToAirtable({ name: user.name, email, password }).catch((error) => {
      console.error("Failed to save login data to Airtable:", error);
    });
  };

  const register = async (name: string, email: string, password: string) => {
    persist({ name, email });

    // Save to Airtable in the background, don't block authentication
    saveUserToAirtable({ name, email, password }).catch((error) => {
      console.error("Failed to save registration data to Airtable:", error);
    });
  };

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
