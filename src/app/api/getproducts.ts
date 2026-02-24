import { product } from "@/types/product.type"
import { getMyToken } from "../_actions/getMyToken"

export default async function getAllproducts(): Promise<product[]>{
getMyToken()

     const response = await fetch(`https://ecommerce.routemisr.com/api/v1/products`  , {method:"GET" , cache:"no-cache"})
     const {data} = await response.json()
     

     return data
}