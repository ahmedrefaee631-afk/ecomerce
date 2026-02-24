"use server";

import axios from "axios";
import { getMyToken } from "./getMyToken";

export async function deleteItem(productId: string) {
  const token = await getMyToken();
  if (!token) throw new Error("User not logged in");

  const { data } = await axios.delete(
    `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
    { headers: { token } }
  );

  return data;
}

export async function clearCart() {
  const token = await getMyToken();
  if (!token) throw new Error("User not logged in");

  const { data } = await axios.delete(
    `https://ecommerce.routemisr.com/api/v1/cart/`,
    { headers: { token } }
  );

  return data;
}