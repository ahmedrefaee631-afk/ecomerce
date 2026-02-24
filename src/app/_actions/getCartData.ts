"use server";

import axios from "axios";
import { getMyToken } from "./getMyToken";

export async function getUserCart() {
  const token = await getMyToken();
  if (!token) throw new Error("User not logged in");

  const { data } = await axios.get(
    "https://ecommerce.routemisr.com/api/v1/cart",
    { headers: { token } }
  );

  return data;
}