"use client"
import { auth } from "@/services/services.firebase";
import { User } from "firebase/auth";
import { createContext } from "react";

interface AuthContextType{
    authUser: User | null
}

export const AuthContext = createContext({} as AuthContextType)

export default function AuthProvider({children}:{children: React.ReactNode}){
    const data = auth
    const authUser = data.currentUser
    
 

    return <AuthContext.Provider value={{authUser}}>{children}</AuthContext.Provider>
}