"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import usersData from "@/data/users.json";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type Role = "super_admin" | "institute" | "mentor" | "student";

export type SubRole =
  | "super_admin"
  | "content_manager"
  | "operations"
  | "analyst";

export interface User {
  id: string;
  email: string;
  role: Role;
  subRole?: SubRole;
  name: string;
  avatar: string;
  studentPath?: string;
  instituteId?: string | null;
  [key: string]: unknown;
}

interface LoginResult {
  success: boolean;
  error?: string;
}

interface AuthContextValue {
  user: User | null;
  login: (email: string, password: string) => LoginResult;
  logout: () => void;
  isLoading: boolean;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const STORAGE_KEY = "sainya_user";

const ROLE_ROUTES: Record<Role, string> = {
  super_admin: "/admin/dashboard",
  institute: "/institute/dashboard",
  mentor: "/mentor/dashboard",
  student: "/student/dashboard",
};

/**
 * Strip the password field before persisting or exposing user data.
 */
function sanitizeUser(raw: Record<string, unknown>): User {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password, ...rest } = raw;
  return rest as User;
}

// ---------------------------------------------------------------------------
// Context
// ---------------------------------------------------------------------------

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

// ---------------------------------------------------------------------------
// Provider
// ---------------------------------------------------------------------------

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Restore session from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setUser(JSON.parse(stored) as User);
      }
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    } finally {
      setIsLoading(false);
    }
  }, []);

  function login(email: string, password: string): LoginResult {
    const match = usersData.users.find(
      (u) => u.email === email && u.password === password
    );

    if (!match) {
      return { success: false, error: "Invalid email or password" };
    }

    const safeUser = sanitizeUser(match as unknown as Record<string, unknown>);
    setUser(safeUser);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(safeUser));

    const destination = ROLE_ROUTES[safeUser.role] ?? "/login";
    router.push(destination);

    return { success: true };
  }

  function logout() {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
    router.push("/login");
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (ctx === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return ctx;
}
