import { loginschema } from "@/schemas/auth.schemas";
import z from "zod";

export type LoginType = z.infer<typeof loginschema>
