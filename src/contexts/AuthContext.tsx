import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DEMO_USERS } from "@/data/mockData";
import { toast } from "@/components/ui/use-toast";

export interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "employee";
  location?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, location?: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email: string, password: string, location?: string) => {
    const demoUser = Object.values(DEMO_USERS).find(
      (u) => u.email === email && u.password === password
    );

    if (demoUser) {
      const { password: _, ...userWithoutPassword } = demoUser;
      
      // Only add location for employee login
      const userData = demoUser.role === "employee" && location 
        ? { ...userWithoutPassword, location }
        : userWithoutPassword;

      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      
      toast({
        title: "Welcome back!",
        description: `Logged in as ${userData.name}`,
      });
      
      navigate(userData.role === "admin" ? "/admin" : "/dashboard");
    } else {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Invalid credentials",
      });
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};