export default async function productDetails(details:any){
    let res = await fetch(`https://ecommerce.routemisr.com/api/v1/products/${details}` , {method:"GET"})
    let {data} = await res.json()
    return data
}