import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";
import { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: {},
        password: {},
      },

      async authorize(credentials) {
        try {
          const { data } = await axios.post(
            "https://ecommerce.routemisr.com/api/v1/auth/signin",
            {
              email: credentials?.email,
              password: credentials?.password,
            }
          );

          if (data?.token) {
            return {
              id: data.user._id,
              email: data.user.email,
              realTokenFromBackEnd: data.token,
            };
          }

          return null;
        } catch {
          return null;
        }
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.realTokenFromBackEnd =
          (user as any).realTokenFromBackEnd;
      }
      return token;
    },

    async session({ session, token }) {
      (session as any).realTokenFromBackEnd =
        token.realTokenFromBackEnd;
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };