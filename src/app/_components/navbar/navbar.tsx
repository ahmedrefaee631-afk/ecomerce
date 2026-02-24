"use client"
import { cartContext } from '@/app/_context/CartContext'
import { Button } from '@/components/ui/button'
import { signOut, useSession } from 'next-auth/react'
import { lightningCssTransform } from 'next/dist/build/swc/generated-native'
import Link from 'next/link'
import React, { useContext } from 'react'

export default function Navbar() {


    function handelLogOut(){
        signOut({redirect: true  , callbackUrl: "/login"})
    }


const {numOfCartItems} = useContext(cartContext)


let session = useSession()
console.log("session",session)



  return <>
  <nav className='bg-slate-200'>
   <div className="container flex justify-between items-center py-4 w-full md:w-[80%] mx-auto">
   
   <div className='left '>
    <ul className='flex gap-x-4 items-center'>
        <li><Link href="/" className='font-bold text-2xl'> <i className="fa-solid text-green-500 fa-cart-arrow-down"></i> FreshCard</Link></li>
        <li><Link href="/">Home</Link></li>



            <li className='relative'>
             <span className='bg-red-500 text-white text-sm absolute -right-2 -top-5 p-1 rounded-2xl'>{numOfCartItems}</span>
            <Link href="/cards">Carts</Link>
            
            </li>




        <li><Link href="/products">Products</Link></li>
        <li><Link href="/categories">Categories</Link></li>
        <li><Link href="/brands">Brands</Link></li>
    </ul>
   </div>
   <div className="right">
    <ul className='flex gap-x-4'>
        <li><i className='fa-brands fa-facebook'></i></li>
        <li><i className='fa-brands fa-youtube'></i></li>
        <li><i className='fa-brands fa-twitter'></i></li>
        <li><i className='fa-brands fa-linkedin'></i></li>
        



{session.data ?  <li> <Button onClick={handelLogOut} ><Link href="/login">SignOut</Link></Button></li> :<>
        <li><Link href="/register">Register</Link></li>
        <li><Link href="/login">Login</Link></li>
</> }



    </ul>
   </div>
   </div>

  </nav>
  
  </>

  
}
