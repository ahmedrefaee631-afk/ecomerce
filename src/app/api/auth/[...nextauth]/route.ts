"use server"

import NextAuth from "next-auth"
import { authOptions } from "@/lib/auth"  // عدّل المسار حسب مشروعك

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST } // App Router محتاج GET و POST