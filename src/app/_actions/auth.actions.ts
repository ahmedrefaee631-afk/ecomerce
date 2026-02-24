"use server"

import axios from "axios"

const baseUrl = "https://ecommerce.routemisr.com/api/v1/auth"

export async function forgotPassword(email: string) {
  const { data } = await axios.post(`${baseUrl}/forgotPasswords`, {
    email
  })
  return data
}

export async function verifyResetCode(code: string) {
  const { data } = await axios.post(`${baseUrl}/verifyResetCode`, {
    resetCode: code
  })
  return data
}

export async function resetPassword(email: string, newPassword: string) {
  const { data } = await axios.put(`${baseUrl}/resetPassword`, {
    email,
    newPassword
  })
  return data
}