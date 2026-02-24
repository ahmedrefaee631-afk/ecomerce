import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const nextAuthConfig: NextAuthOptions = {
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const res = await fetch(
          "https://ecommerce.routemisr.com/api/v1/auth/signin",
          {
            method: "POST",
            body: JSON.stringify(credentials),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const user = await res.json();

        if (!res.ok) {
          return {
            realTokenFromBackEnd : ""
          }
        }

        return user;
      },
    }),
  ],


callbacks : {
jwt(params){  

console.log("jwt" , params)

     if(params.user){
        
             params.token.realTokenFromBackEnd = params.user.realTokenFromBackEnd
             params.token.role=params.user.role

     }
     

    return params.token
},

session(params){
    console.log("params",params);

    params.session.role= params.token
    return params.session;
},


},
//   secret : process.env.AUTH_SECRET


pages : {
    signIn : "/login"
}

};
