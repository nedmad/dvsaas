import { z } from "zod"
import { schemaRegister } from "./schemaZodRegister";

export type FormDataRegister = z.infer<typeof schemaRegister>