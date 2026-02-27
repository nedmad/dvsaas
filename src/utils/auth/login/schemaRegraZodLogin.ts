import z from "zod";

export const schemaLogin = z.object({
    email: z.string().email("Insira um email válido"),
    password: z.string().nonempty("Campo senha é obrigatório").min(8, "Minimo de caracteres são 8")
})