import React from 'react'
import { log } from 'console';
import productDetails from '@/app/api/productdetails';
import { CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default async function Details({params}:any) {
let {details} = await params


let data = await productDetails(details)
console.log(data);



  return (
    <div>
      <h1>Product Details</h1>
     <div className="container w-[80%] mx-auto">
       <div className='flex flex-wrap items-center '>
      <div className='w-full md:w-1/4'>
       <img src={data.imageCover} alt="" />
      </div>
      <div className='w-full md:w-3/4 '>
      <h2>{data.title}</h2>
      <p>{data.description}</p>
      <h5>{data.category.name}</h5>
      <CardFooter>
              <div className='flex justify-between w-full'>
              <h6>{data.price} EGP</h6>
              <h6><i className='fa fa-star text-yellow-500'></i> {data.ratingsAverage}</h6>
              </div>
              </CardFooter>
              <Button className='w-full mt-3 bg-blue-950 text-white'><i className="fa-solid fa-plus "></i> Add To Cart</Button>
      </div>
   </div>
     </div>
    </div>
  )
}
