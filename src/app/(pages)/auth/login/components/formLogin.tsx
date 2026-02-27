"use client"
import Input from "@/components/input/input";
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";
import style from "./form.module.css"
import { FiLoader } from "react-icons/fi";
import Link from "next/link";
import ButtonGoogle from "@/components/auth/buttonLoginGoogle/buttongoogle";
import { utilLogin } from "@/utils/auth/login/login";
import { FormDataLogin } from "@/utils/auth/login/typeFormZodLogin";
import { schemaLogin } from "@/utils/auth/login/schemaRegraZodLogin";

export default function FormLogin() {
  const {handleFormLogin,loading} = utilLogin()

    const { register, handleSubmit, formState: { errors }, watch } = useForm<FormDataLogin>({
        resolver: zodResolver(schemaLogin),
        mode: "onChange"
    })



    return (
        <section className="flex flex-col ">
            <ButtonGoogle />

            <form onSubmit={handleSubmit(handleFormLogin)} className="flex gap-3 flex-col w-full max-w-md">
                <label htmlFor="email" className="font-bold">Email</label>
                <Input type="email" placeholder="Digite seu e-mail" name="email" error={errors.email?.message} register={register} />

                <label htmlFor="password" className="font-bold">Senha</label>
                <Input type="password" placeholder="Digite seu e-mail" name="password" error={errors.password?.message} register={register} />

                <button disabled={loading} className={`w-full flex justify-center bg-blue-600 rounded text-white font-bold py-2 px-2 ${loading && style.button}`}>

                    {loading && <FiLoader className="animate-spin" size={28} />}
                    {!loading && "Entrar"}

                </button>

                <Link href={"/auth/resend"} className="text-blue-500 text-center mt-5">Esqueci minha senha! Clique aqui para recuperar senha.</Link>

            </form>
        </section>)
}