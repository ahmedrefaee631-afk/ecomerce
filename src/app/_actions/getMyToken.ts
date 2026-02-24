"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function getMyToken() {
  const session = await getServerSession(authOptions);
  return (session as any)?.realTokenFromBackEnd || null;
}