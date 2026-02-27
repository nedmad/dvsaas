"use client"
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/services/services.firebase";
import toast from "react-hot-toast";
import { useTransition } from "react";
import { FormDataRegister } from "./typeFormZodRegister";
export function utilRegister() {
    const [loading, setLoading] = useTransition()
    async function handleForm(event: FormDataRegister) {
        setLoading(async () => {
            await createUserWithEmailAndPassword(auth, event.email, event.password).then((e) => {
                toast.success("Usuário cadastrado com sucesso")
            }).catch((err) => {
                toast.error("Erro ao cadastrar usuário. Tente novamente mais tarde", {
                    duration: 5000
                })
            })
        })

    }
    return{loading,handleForm}
}