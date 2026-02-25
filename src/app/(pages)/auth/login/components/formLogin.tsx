"use client"
import Input from "@/components/input/input";
import { email, z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";
import { sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/services/services.firebase";
import toast from "react-hot-toast";
import { useTransition } from "react";
import style from "./form.module.css"
import { FiLoader } from "react-icons/fi";
import { FirebaseError } from "firebase/app";
import Link from "next/link";

const schema = z.object({
    email: z.string().email("Insira um email válido"),
    password: z.string().nonempty("Campo senha é obrigatório").min(8, "Minimo de caracteres são 8")
})

type FormData = z.infer<typeof schema>
export default function FormLogin() {
    const [loading, setLoading] = useTransition()
    const { register, handleSubmit, formState: { errors },watch } = useForm<FormData>({
        resolver: zodResolver(schema),
        mode: "onChange"
    })
    async function handleForm(event: FormData) {
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
   

    return (<>
        <form onSubmit={handleSubmit(handleForm)} className="flex gap-3 flex-col w-full max-w-md">
            <label htmlFor="email" className="font-bold">Email</label>
            <Input type="email" placeholder="Digite seu e-mail" name="email" error={errors.email?.message} register={register} />

            <label htmlFor="password" className="font-bold">Senha</label>
            <Input type="password" placeholder="Digite seu e-mail" name="password" error={errors.password?.message} register={register} />

            <button disabled={loading} className={`w-full flex justify-center bg-blue-600 rounded text-white font-bold py-2 px-2 ${loading && style.button}`}>

                {loading && <FiLoader className="animate-spin" size={28} />}
                {!loading && "Entrar"}

            </button>

            <Link href={"/auth/resend"} className="text-red-500 text-center mt-5">Esqueci minha senha! Clique aqui para recuperar senha.</Link>

        </form></>)
}