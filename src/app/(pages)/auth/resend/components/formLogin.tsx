"use client"
import Input from "@/components/input/input";
import {  z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/services/services.firebase";
import toast from "react-hot-toast";
import { useTransition } from "react";
import style from "./form.module.css"
import { FiLoader } from "react-icons/fi";
import { FirebaseError } from "firebase/app";

const schema = z.object({
    email: z.string().email("Insira um email válido")
})

type FormData = z.infer<typeof schema>
export default function FormLogin() {
    const [loading, setLoading] = useTransition()
    const { register, handleSubmit, formState: { errors }, watch } = useForm<FormData>({
        resolver: zodResolver(schema),
        mode: "onChange"
    })
    async function handleForm(event: FormData) {
        setLoading(async () => {
            await sendPasswordResetEmail(auth, event.email).then((e) => {
                toast.success("E-mail enviado com sucesso!!")
            }).catch((error) => {
                if (error instanceof FirebaseError) {
                    switch (error.code) {
                        case "auth/invalid-credential":
                            toast.error("Erro na credencial inserida. Insira as credenciais correta.", {
                                duration: 5000
                            })
                            break
                        default:
                            toast.error("Erro ao enviar email de recuperação. Tente novamente mais tarde", {
                                duration: 5000
                            })


                    }
                }

            })
        })

    }



    return (<section>
        <form onSubmit={handleSubmit(handleForm)} className="flex gap-3 flex-col w-full max-w-md">
            <h1 className="text-center font-bold text-xl mb-5">Digite seu E-mail para recuperação de senha</h1>

            <label htmlFor="email" className="font-bold">Email</label>
            <Input type="email" placeholder="Digite seu e-mail" name="email" error={errors.email?.message} register={register} />



            <button disabled={loading} className={`w-full flex justify-center bg-blue-600 rounded text-white font-bold py-2 px-2 ${loading && style.button}`}>

                {loading && <FiLoader className="animate-spin" size={28} />}
                {!loading && "Enviar recuperação"}

            </button>


        </form></section>)
}