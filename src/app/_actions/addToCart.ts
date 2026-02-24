"use server";

import axios from "axios";
import { getMyToken } from "./getMyToken";

export async function addItemToCart(productId: string) {
  const token = await getMyToken();
  if (!token) throw new Error("User not logged in");

  const { data } = await axios.post(
    "https://ecommerce.routemisr.com/api/v1/cart",
    { productId },
    { headers: { token } }
  );

  return data;
}