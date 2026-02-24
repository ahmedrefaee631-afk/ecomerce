"use server"

import axios from "axios"
import { getMyToken } from "../_actions/getMyToken"

export type shippingAddressType = {
  shippingAddress: {
    phone: string,
    city: string,
    details: string,
  }
}

export async function createCashOrder(
  cartId: string,
  shippingAddress: shippingAddressType
) {

  const token = await getMyToken()

  const { data } = await axios.post(
    `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
    { shippingAddress },
    {
      headers: {
        token: token as string
      }
    }
  )

  return data
}


export async function createVisaOrder(cartId : string ,shippingAddress : shippingAddressType){

const token = await getMyToken()

const {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000` , shippingAddress , {
headers: {
  token: token!
}
})

return data

}