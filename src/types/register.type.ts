import { registerschema } from "@/schemas/auth.schemas";
import z from "zod";

export type RegisterType = z.infer<typeof registerschema>
