"use server"
import axios from "axios";
import { getMyToken } from "../_actions/getMyToken";

export async function updateCount(productId : string ,count : number){

const token = await getMyToken()

const {data} = await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
    count
} , {
headers: {
  token: token!
}
})


return data;

}