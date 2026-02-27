import { z } from "zod"

export const schemaRegister = z.object({
    email: z.string().email("Insira um email válido!"),
    password: z.string().nonempty("Campo senha é obrigatório!").min(8, "Minimo de caracteres são 8"),
    confirmPass: z.string().nonempty("Confirme sua senha!")
}).refine((data) => data.password === data.confirmPass, {
    message: "Senha não coincidem",
    path: ["confirmPass"]
})