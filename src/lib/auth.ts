"use server"

import { AuthOptions, DefaultUser } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import axios from "axios"

// خصائص إضافية للمستخدم
interface ExtraUserProps {
  realTokenFromBackEnd: string
  role: string
}

// موسّع DefaultUser
type AppUser = DefaultUser & ExtraUserProps

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },

      // ✅ بدون TypeScript error، نرجع أي
      async authorize(credentials) {
        if (!credentials || !credentials.email || !credentials.password) return null

        try {
          const { data } = await axios.post(
            "https://ecommerce.routemisr.com/api/v1/auth/signin",
            {
              email: credentials.email,
              password: credentials.password,
            }
          )

          // نرجع object بسيط ونتجنب TS errors
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

  session: {
    strategy: "jwt",
  },

  pages: {
    signIn: "/auth/signin",
  },
}