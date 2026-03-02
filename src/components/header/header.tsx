"use client"
import { AuthContext } from "@/context/authUser/authContext"
import { auth } from "@/services/services.firebase"
import { signOut } from "firebase/auth"
import Link from "next/link"
import { useContext, useTransition } from "react"
import { FiBox, FiLogOut, FiUser } from "react-icons/fi"



export default function Header() {
    const data = auth.currentUser
    const [loading, setLoading] = useTransition()
    async function handleLogout() {
        setLoading(async () => {
            await signOut(auth)

        })
    }
    return <>
        <header className="full py-6 bg-blue-500">
            <div className="w-full mx-auto max-w-4xl">
                <div className="flex justify-between items-center">
                    <Link href={"/"} className="logo text-blue-900"><FiBox size={45} /></Link>
                    <div className="options flex items-center gap-3 font-bold text-white">

                        {!data?.email &&
                            <>
                                <Link href={"/auth/login"}>
                                    Login
                                </Link>
                                <Link href={"/auth/register"}>
                                    Cadastrar usuário

                                </Link></>
                        }
                        
                        {data?.email &&
                            <>
                                <div className="border border-2 rounded-4xl p-1"><FiUser size={30} />
                                </div>
                                <button disabled={loading} onClick={handleLogout} className={`rounded-4xl p-1 ${loading?"opacity-40":"opacity-100"}`}><FiLogOut size={30} />
                                </button>

                            </>
                        }

                    </div>
                </div>
            </div>

        </header>
    </>
}