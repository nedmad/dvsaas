"use client"
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/services/services.firebase";
import toast from "react-hot-toast";
import { useTransition } from "react";
import { FirebaseError } from "firebase/app";
import { FormDataLogin } from "./typeFormZodLogin";



export function utilLogin() {
    const [loading, setLoading] = useTransition()

    async function handleFormLogin(event: FormDataLogin) {
        setLoading(async () => {
            await signInWithEmailAndPassword(auth, event.email, event.password).then((e) => {
                toast.success("Login efetuado com sucesso!!")
            }).catch((error) => {
                if (error instanceof FirebaseError) {
                    switch (error.code) {
                        case "auth/invalid-credential":
                            toast.error("Erro na credencial inserida. Insira as credenciais corretas.", {
                                duration: 5000
                            })
                            break
                        default:
                            toast.error("Erro ao efetuar login. Tente novamente mais tarde", {
                                duration: 5000
                            })


                    }
                }

            })
        })

    }

    return{
        loading,
        handleFormLogin
    }
}