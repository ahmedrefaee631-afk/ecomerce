import {NextAuthOptions} from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { email } from "zod"
export const nextAuthConfig : NextAuthOptions = {
      providers : [
        Credentials({
            credentials:{
                email:{label: "Email", type: "email"} ,
                password: {label: "password", type: "password"},
            },
            authorize: async function(Credentials){
                 const res = await fetch(
                  "https://ecommerce.routemisr.com/api/v1/auth/signin",
                  {
               
          method: "POST",
          body: JSON.stringify(this.credentials),
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

            const finalResponse = await res.json()

            if(finalResponse.message !== "success") 
            return null;
            return finalResponse.user
            },
        }),
      ],    
      pages: {
        signIn:"/login"
      }
};