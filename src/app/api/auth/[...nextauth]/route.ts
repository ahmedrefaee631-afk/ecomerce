"use server"

import NextAuth, { AuthOptions, DefaultUser } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import axios from "axios"



interface ExtraUserProps {
  realTokenFromBackEnd: string
  role: string
}
type AppUser = DefaultUser & ExtraUserProps

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        if (!credentials) return null

        try {
          const { data } = await axios.post(
            "https://ecommerce.routemisr.com/api/v1/auth/signin",
            {
              email: credentials.email,
              password: credentials.password,
            }
          )

          return {
            id: String(data.id),
            name: data.name || data.email || "User",
            email: data.email,
            realTokenFromBackEnd: data.realTokenFromBackEnd,
            role: data.role,
          }
        } catch (err) {
          console.error("Login error:", err)
          return null
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        return {
          ...token,
          realTokenFromBackEnd: (user as any).realTokenFromBackEnd,
          role: (user as any).role,
        }
      }
      return token
    },

    async session({ session, token }) {
      if (session.user) {
        return {
          ...session,
          user: {
            ...session.user,
            realTokenFromBackEnd: (token as any).realTokenFromBackEnd,
            role: (token as any).role,
          },
        }
      }
      return session
    },
  },

  session: { strategy: "jwt" },
  pages: { signIn: "/auth/signin" },
}

export default NextAuth(authOptions)
const handler = NextAuth(authOptions)
export {handler as GET , handler as POST}
