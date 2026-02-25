"use client"
import Input from "@/components/input/input";
import { email, z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/services/services.firebase";
import toast from "react-hot-toast";
import { useTransition } from "react";
import style from "./form.module.css"
import { FiLoader } from "react-icons/fi";

const schema = z.object({
    email: z.string().email("Insira um email válido!"),
    password: z.string().nonempty("Campo senha é obrigatório!").min(8, "Minimo de caracteres são 8"),
    confirmPass: z.string().nonempty("Confirme sua senha!")
}).refine((data) => data.password === data.confirmPass, {
    message: "Senha não coincidem",
    path: ["confirmPass"]
})

type FormData = z.infer<typeof schema>
export default function FormRegister() {
    const [loading, setLoading] = useTransition()
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(schema),
        mode: "onChange"
    })
    async function handleForm(event: FormData) {
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
    return (<>
        <form onSubmit={handleSubmit(handleForm)} className="flex gap-3 flex-col w-full max-w-md">
            <label htmlFor="email" className="font-bold">Email</label>
            <Input type="email" placeholder="Digite seu e-mail" name="email" error={errors.email?.message} register={register} />

            <label htmlFor="password" className="font-bold">Senha</label>
            <Input type="password" placeholder="Digite sua senha" name="password" error={errors.password?.message} register={register} />

            <label htmlFor="confirmPass" className="font-bold">Confirme sua senha</label>
            <Input type="password" placeholder="Confirme sua senha" name="confirmPass" error={errors.confirmPass?.message} register={register} />


            <button disabled={loading} className={`w-full flex justify-center bg-blue-600 rounded text-white font-bold py-2 px-2 ${loading && style.button}`}>

                {loading && <FiLoader className="animate-spin" size={28} />}
                {!loading && "Cadastrar"}

            </button>

        </form></>)
}