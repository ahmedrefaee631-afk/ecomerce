"use server"

import axios from "axios"
import { getMyToken } from "../_actions/getMyToken"
import { jwtDecode } from 'jwt-decode';

interface MyToken {
  id: string
}

export async function getUserOrder() {
  const token = await getMyToken()

  if (!token) return null

  const userData = jwtDecode<MyToken>(token)

  const { data } = await axios.get(
    `https://ecommerce.routemisr.com/api/v1/order/user/${userData.id}`
  )

  return data
}