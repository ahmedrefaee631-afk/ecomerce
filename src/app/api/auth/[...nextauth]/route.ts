"use server"

import NextAuth, { AuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import axios from "axios"

// Extra props اللي عايزين نخزنها في JWT
interface ExtraUserProps {
  realTokenFromBackEnd: string
  role: string
}

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },

      // هنا ببساطة نرجع أي object (TS مش هيقفل)
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

          // object بسيط، NextAuth هيمسكه كـ user
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
    // نقل بيانات الباك اند للـ JWT
    async jwt({ token, user }) {
      if (user) {
        const u = user as ExtraUserProps
        return {
          ...token,
          realTokenFromBackEnd: u.realTokenFromBackEnd,
          role: u.role,
        }
      }
      return token
    },

    // نقل بيانات JWT للـ session
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

  session: {
    strategy: "jwt",
  },

  pages: {
    signIn: "/auth/signin", // صفحة تسجيل دخول مخصصة
  },
}

export default NextAuth(authOptions)