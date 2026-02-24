
"use client"

import React, { useContext } from 'react';
import Image from 'next/image';
import { Trash2, Plus, Minus, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';
import { cartContext } from '../_context/CartContext';
import { product } from '@/types/product.type';
import { updateCount } from './updateCount.action';
import { clearCart, deleteItem } from './deleteItem.action';

export default function CartPage() {

const { numOfCartItems , cartData , setnumOfCartItems , setcartData } = useContext(cartContext)

type cartDataItem = {
  count : number,
  price : number,
  product : product,
}



async function handelCountUpdate(productId : string , count : number){

// const res = await updateCount(productId , count)

// console.log(res)

// toast.success("Added success")
// setcartData(res.data)
// setnumOfCartItems(res.numOfCartItems)

toast.promise(()=> updateCount(productId,count), {
  success : function(res) {
    setcartData(res.data)
    setnumOfCartItems(res.numOfCartItems)
    return "Adedd succesfully"
  },
  loading : "loading......adding",
  error : "Error",
  position : "top-center",
})


}


async function handelDeleteItem(productId:string){

const res = await deleteItem(productId)

setcartData(res.data)
setnumOfCartItems(res.numOfCartItems)

toast.success("deleted Sucsess" , {
  position:"top-center"
})

}


async function handelClear(){

const res = await clearCart()

setnumOfCartItems(0)
setcartData(null)
}

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

        <div className="lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start lg:gap-y-8">
          {/* Cart Items List */}
          <div className="lg:col-span-8">
            <div className="bg-white shadow sm:rounded-lg overflow-hidden border border-gray-200">
              <ul role="list" className="divide-y divide-gray-200">
               
               
               
                {/* Product 1 */}
               
              
              {cartData?.products.map((item : cartDataItem)=> 
                 <li className="flex py-6 px-4 sm:px-6 hover:bg-gray-50 transition-colors">
                  <div className="h-24 w-24 shrink-0 overflow-hidden rounded-md border border-gray-200">
                    <Image
                      src={item.product.imageCover}
                      alt="Woman Shawl"
                      width={96}
                      height={96}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>

                  <div className="ml-4 flex flex-1 flex-col">
                    <div>
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <h3>
                          <span className="cursor-pointer hover:underline">{item.product.title}</span>
                        </h3>
                        <p className="ml-4 font-bold text-green-600">${item.price}</p>
                      </div>
                      <p className="mt-1 text-sm text-gray-500">{item.product.brand.name}</p>
                      <p className="mt-1 text-sm text-gray-400">{item.product.category.name}</p>
                    </div>

                    <div className="flex flex-1 items-end justify-between text-sm">
                      <div className="flex items-center space-x-2 border rounded-md p-1 bg-white">
                        
                        
                        <button
                          type="button"
                          className="p-1 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 disabled:opacity-50"
                          aria-label="Decrease quantity"

                          onClick={()=> handelCountUpdate(item.product._id , item.count-1)}


                        >
                          <Minus className="h-4 w-4" />
                        </button>

                        <span className="font-medium text-gray-900 w-8 text-center">{item.count}</span>

                        <button
                          type="button"
                          className="p-1 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
                          aria-label="Increase quantity"

                          onClick={()=> handelCountUpdate(item.product._id , item.count+1)}

                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>

                      <div className="flex">
                        <button
                          type="button"
                          className="flex items-center text-red-500 hover:text-red-700 font-medium transition-colors"
                          onClick={ ()=> handelDeleteItem(item.product._id)}
                      
                      >
                          <Trash2 className="h-4 w-4 mr-1" />
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </li>)}

              </ul>
            </div>

            <div className="mt-6 flex items-center justify-between">
              <Link href="/" className="inline-flex items-center text-indigo-600 hover:text-indigo-500 font-medium">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Continue Shopping
              </Link>

              <button
                type="button"
                className="inline-flex items-center text-red-600 hover:text-red-500 font-medium border border-red-200 rounded-md px-4 py-2 hover:bg-red-50"
                onClick={handelClear}
              
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Clear Cart
              </button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-4 mt-8 lg:mt-0">
            <div className="bg-white shadow sm:rounded-lg overflow-hidden border border-gray-200 p-6">
              <h2 className="text-lg font-medium text-gray-900 border-b border-gray-200 pb-4 mb-4">Order Summary</h2>

              <dl className="mt-2 space-y-4">
                <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                  <dt className="text-sm text-gray-600">Total Items</dt>
                  <dd className="text-sm font-medium text-gray-900">{numOfCartItems}</dd>
                </div>

                <div className="flex items-center justify-between pt-4">
                  <dt className="text-base font-bold text-gray-900">Total Price</dt>
                  <dd className="text-base font-bold text-indigo-600">$ {cartData?.totalCartPrice}</dd>
                </div>
              </dl>

              <div className="mt-6">
                <Link
                  href={"/payment"}
                  type="button"
                  className="w-full flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 transition-colors"
                >
                  Checkout
                </Link>
              </div>

              <div className="mt-4 text-center">
                <p className="text-xs text-gray-500">
                  Taxes and shipping calculated at checkout
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
