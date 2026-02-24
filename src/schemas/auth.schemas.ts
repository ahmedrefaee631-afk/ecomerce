import z, { email, string } from "zod";

export const registerschema =z.object({
    name:z.string().nonempty("name is important ").min(3),
    email:z.string().nonempty("email is important ").email(),
    password:z.string().nonempty("password is important ").min(6),
    Repassword:z.string().nonempty("Repassword is important ").min(6),
    phone:z.string().nonempty("phone is important "),
})
.refine(
    (data)=>{
        return data.password===data.Repassword;
    },
    {
        message: "password do not match",
        path:["Repassword"],
    },
);

export const loginSchema = z.object({
    email : z.email(),
    password : z.string().nonempty().min(8),
})

export type loginDataType = z.infer< typeof loginSchema>
