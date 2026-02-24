import { Category } from "@/types/product.type"

export default async function getallcategories() : Promise<Category[]>{
     const response = await fetch(`https://ecommerce.routemisr.com/api/v1/categories`  , {method:"GET" , cache:"no-cache"})
     const {data} = await response.json()
     

     return data
}