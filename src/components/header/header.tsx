"use client";
import { AuthContext } from "@/context/authUser/authContext";
import { auth } from "@/services/services.firebase";
import { signOut } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState, useTransition } from "react";
import { FiBox, FiLogOut, FiUser } from "react-icons/fi";

export default function Header() {
  const { authUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!authUser) {
      router.replace("/auth/login");
    }
  }, [authUser]);
  if (!authUser) return null;

  async function handleLogout() {
    try {
      setLoading(true);
      await signOut(auth);
    } finally {
      setLoading(false);
    }
  }
  return (
    <>
      <header className="full py-6 bg-blue-500">
        <div className="w-full mx-auto max-w-4xl">
          <div className="flex justify-between items-center">
            <Link href={"/"} className="logo text-blue-900">
              <FiBox size={45} />
            </Link>
            <div className="options flex items-center gap-3 font-bold text-white">
              {!authUser && (
                <>
                  <Link href={"/auth/login"}>Login</Link>
                  <Link href={"/auth/register"}>Cadastrar usuário</Link>
                </>
              )}

              {authUser && (
                <>
                  <div className="border border-2 rounded-4xl p-1">
                    <FiUser size={30} />
                  </div>
                  <button
                    disabled={loading}
                    onClick={handleLogout}
                    className={`rounded-4xl p-1 ${loading ? "opacity-40" : "opacity-100"}`}
                  >
                    <FiLogOut size={30} />
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
