"use client";
import { auth } from "@/services/services.firebase";
import { onAuthStateChanged, User } from "firebase/auth";
import { createContext, useState } from "react";

interface AuthContextType {
  authUser: string | null;
}

export const AuthContext = createContext({} as AuthContextType);

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [authUser, setAuthUser] = useState<string | null>("");

  onAuthStateChanged(auth, (user) => {
    setAuthUser(user ? user.email : null);
  });

  return (
    <AuthContext.Provider value={{ authUser }}>{children}</AuthContext.Provider>
  );
}
