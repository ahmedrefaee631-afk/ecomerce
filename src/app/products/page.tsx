import { log } from 'console'
import React from 'react'
import getAllproducts from '../api/getproducts'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from 'next/link'
import Image from 'next/image'
import { product } from '@/types/product.type'
import AddToCartBtn from './AddToCartBtn'

export default async function Products() {

const data = await getAllproducts()
console.log(data);


  return <>

    <h1>products page</h1>
<div className="container mx-auto md:w-[80%]">
  <div className='flex flex-wrap'>
      {data.map((product:product , indx)=>{
     return <Card key={indx} className='w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-2'>
<Link href={`/products/${product.id}`}>
               <Card className='px-2'>
               <CardHeader>
               <CardTitle><Image width={10} height={100} className='w-full' src={product.imageCover} alt="" /></CardTitle>
               <CardDescription>{product.category.name}</CardDescription>
               </CardHeader>
               <CardContent>
              <p className='font-bold line-clamp-1'>{product.title}</p>
              </CardContent>
              <CardFooter>
              <div className='flex justify-between w-full'>
              <h6>{product.price} EGP</h6>
              <h6><i className='fa fa-star text-yellow-500'></i> {product.ratingsAverage}</h6>
              </div>
              </CardFooter>
              </Card>
</Link>

<AddToCartBtn productId = {product._id} />

     </Card>
    })}
</div>
</div>
  </>
}
