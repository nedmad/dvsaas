"use client"
import Input from "@/components/input/input";
import { email, z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";
import style from "./form.module.css"
import { FiLoader } from "react-icons/fi";
import { utilRegister } from "@/utils/auth/register/register";
import {schemaRegister} from "@/utils/auth/register/schemaZodRegister"
import { FormDataRegister } from "@/utils/auth/register/typeFormZodRegister";
import ButtonGoogle from "@/components/auth/buttonLoginGoogle/buttongoogle";

export default function FormRegister() {
    const {loading,handleForm} = utilRegister()
    const { register, handleSubmit, formState: { errors } } = useForm<FormDataRegister>({
        resolver: zodResolver(schemaRegister),
        mode: "onChange"
    })
   
    return (<section className="flex flex-col ">
        <ButtonGoogle />

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

        </form></section>)
}