import React, { createContext, useContext, useState, useCallback } from "react";

export type UserRole = 
  | "super_admin" 
  | "student" 
  | "thesis_supervisor" 
  | "hod" 
  | "faculty" 
  | "finance";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: UserRole) => void;
  loginWithGoogle: (role: UserRole) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

const MOCK_USERS: Record<UserRole, User> = {
  super_admin: { id: "1", name: "Dr. Sarah Johnson", email: "admin@saiacs.edu", role: "super_admin" },
  student: { id: "2", name: "Priya Sharma", email: "priya@saiacs.edu", role: "student" },
  thesis_supervisor: { id: "3", name: "Dr. James Thomas", email: "james@saiacs.edu", role: "thesis_supervisor" },
  hod: { id: "4", name: "Dr. Ruth David", email: "ruth@saiacs.edu", role: "hod" },
  faculty: { id: "5", name: "Prof. Mark Philip", email: "mark@saiacs.edu", role: "faculty" },
  finance: { id: "6", name: "Rachel George", email: "rachel@saiacs.edu", role: "finance" },
};

export const ROLE_LABELS: Record<UserRole, string> = {
  super_admin: "Admin (Academic Dean)",
  student: "Student",
  thesis_supervisor: "Thesis Supervisor",
  hod: "Head of Department",
  faculty: "Faculty",
  finance: "Finance Team",
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = useCallback((_email: string, _password: string, role: UserRole) => {
    setUser(MOCK_USERS[role]);
  }, []);

  const loginWithGoogle = useCallback((role: UserRole) => {
    setUser(MOCK_USERS[role]);
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, loginWithGoogle, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
