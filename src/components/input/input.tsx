"use client"
import { RegisterOptions, UseFormRegister } from "react-hook-form"

interface InputProps{
    type: "text"|"password"|"email"
    placeholder:string
    name:string
    error?: string | undefined
    register: UseFormRegister<any>
    rules?: RegisterOptions
}

export default function Input({ type,placeholder,error,name,register,rules}: InputProps) {
    return (<>
        <input type={type} placeholder={placeholder} {...register(name,rules)} className="border border-black rounded py-2 px-2" />
        {error&& <p className="text-red-500">{error}</p>}
    </>)

}