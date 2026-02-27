import { z } from "zod"
import { schemaLogin } from "./schemaRegraZodLogin"


export type FormDataLogin = z.infer<typeof schemaLogin>