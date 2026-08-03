import React, { createContext, useContext, useState, useEffect } from "react";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

interface AuthContextType {
  isAuthenticated: boolean;
  userEmail: string | null;
  isLoading: boolean;
  login: (email: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  updatePassword: (newPassword: string) => Promise<{ success: boolean; error?: string }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const LOCAL_AUTH_KEY = "portfolio_admin_auth";
const LOCAL_PASSWORD_KEY = "portfolio_admin_custom_pass";

const DEFAULT_ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL || "admin@portfolio.com";
const DEFAULT_ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || "admin123";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const initAuth = async () => {
      if (isSupabaseConfigured && supabase) {
        try {
          const { data } = await supabase.auth.getSession();
          if (data.session?.user) {
            setIsAuthenticated(true);
            setUserEmail(data.session.user.email || DEFAULT_ADMIN_EMAIL);
          } else {
            checkLocalSession();
          }

          supabase.auth.onAuthStateChange((_event, session) => {
            if (session?.user) {
              setIsAuthenticated(true);
              setUserEmail(session.user.email || DEFAULT_ADMIN_EMAIL);
            } else {
              checkLocalSession();
            }
          });
        } catch {
          checkLocalSession();
        }
      } else {
        checkLocalSession();
      }
      setIsLoading(false);
    };

    initAuth();
  }, []);

  const checkLocalSession = () => {
    const savedSession = localStorage.getItem(LOCAL_AUTH_KEY);
    if (savedSession) {
      try {
        const parsed = JSON.parse(savedSession);
        if (parsed && parsed.email) {
          setIsAuthenticated(true);
          setUserEmail(parsed.email);
          return;
        }
      } catch {
        // ignore
      }
    }
    setIsAuthenticated(false);
    setUserEmail(null);
  };

  const login = async (email: string, pass: string): Promise<{ success: boolean; error?: string }> => {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password: pass,
        });

        if (error) {
          // If supabase auth fails, fallback check for local default admin credentials
          const customPass = localStorage.getItem(LOCAL_PASSWORD_KEY) || DEFAULT_ADMIN_PASSWORD;
          if (email.toLowerCase() === DEFAULT_ADMIN_EMAIL.toLowerCase() && pass === customPass) {
            localStorage.setItem(LOCAL_AUTH_KEY, JSON.stringify({ email }));
            setIsAuthenticated(true);
            setUserEmail(email);
            return { success: true };
          }
          return { success: false, error: error.message };
        }

        if (data.session) {
          setIsAuthenticated(true);
          setUserEmail(data.session.user.email || email);
          return { success: true };
        }
      } catch (err: any) {
        // Fallback to local auth check
      }
    }

    // Local authentication logic
    const savedCustomPass = localStorage.getItem(LOCAL_PASSWORD_KEY) || DEFAULT_ADMIN_PASSWORD;
    if (email.toLowerCase() === DEFAULT_ADMIN_EMAIL.toLowerCase() && pass === savedCustomPass) {
      localStorage.setItem(LOCAL_AUTH_KEY, JSON.stringify({ email }));
      setIsAuthenticated(true);
      setUserEmail(email);
      return { success: true };
    }

    return { success: false, error: "Invalid email or password" };
  };

  const logout = async () => {
    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.auth.signOut();
      } catch {
        // ignore
      }
    }
    localStorage.removeItem(LOCAL_AUTH_KEY);
    setIsAuthenticated(false);
    setUserEmail(null);
  };

  const updatePassword = async (newPassword: string): Promise<{ success: boolean; error?: string }> => {
    if (isSupabaseConfigured && supabase) {
      try {
        const { error } = await supabase.auth.updateUser({ password: newPassword });
        if (error) {
          localStorage.setItem(LOCAL_PASSWORD_KEY, newPassword);
          return { success: true };
        }
        return { success: true };
      } catch {
        // fallback
      }
    }

    localStorage.setItem(LOCAL_PASSWORD_KEY, newPassword);
    return { success: true };
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        userEmail,
        isLoading,
        login,
        logout,
        updatePassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
