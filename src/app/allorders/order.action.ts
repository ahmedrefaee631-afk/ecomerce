"use server"

import axios from "axios"
import { getMyToken } from "../_actions/getMyToken"
import { jwtDecode } from 'jwt-decode';

export async function getUserOrder (){

    const token = await getMyToken()

    const userData = jwtDecode(token)

    const {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/order/user/${userData.id}` )
return data

}
