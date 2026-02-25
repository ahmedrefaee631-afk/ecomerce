"use server"

import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

// توسيع الأنواع عشان TS يعرف الخصائص الجديدة
declare module "next-auth" {
  interface User {
    id: string
    name: string
    realTokenFromBackEnd?: string
    role?: string
  }

  interface Session {
    user: User
  }

  interface JWT {
    realTokenFromBackEnd?: string
    role?: string
  }
}

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {},
      async authorize(credentials) {
        // نموذج مستخدم ثابت من الباك اند
        const user = {
          id: "1",
          name: "Ahmed",
          realTokenFromBackEnd: "abcd1234",
          role: "admin",
        }
        return user
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        // ✅ تعريف type محلي داخل callback لتجنب أي خطأ
        const t = token as { realTokenFromBackEnd?: string; role?: string } & typeof token
        t.realTokenFromBackEnd = user.realTokenFromBackEnd
        t.role = user.role
        return t
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        const s = session.user as { realTokenFromBackEnd?: string; role?: string } & typeof session.user
        const t = token as { realTokenFromBackEnd?: string; role?: string } & typeof token
        s.realTokenFromBackEnd = t.realTokenFromBackEnd
        s.role = t.role
      }
      return session
    },
  },
})