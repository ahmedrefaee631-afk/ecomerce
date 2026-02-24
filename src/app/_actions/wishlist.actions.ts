"use server"

import axios from "axios"
import { getMyToken } from "./getMyToken"

const baseUrl = "https://ecommerce.routemisr.com/api/v1/wishlist"

export async function getWishlist() {
  const token = await getMyToken()
  if (!token) throw new Error("No token found")

  const { data } = await axios.get(`${baseUrl}/wishlist`, {
    headers: { token: token as string }
  })

  return data
}

export async function addToWishlist(productId: string) {
  const token = await getMyToken()
  if (!token) throw new Error("No token found")

  const { data } = await axios.post(
    `${baseUrl}/wishlist`,
    { productId },
    { headers: { token: token as string } }
  )

  return data
}

export async function removeFromWishlist(productId: string) {
  const token = await getMyToken()
  if (!token) throw new Error("No token found")

  const { data } = await axios.delete(
    `${baseUrl}/wishlist/${productId}`,
    { headers: { token: token as string } }
  )

  return data
}