"use client"
import { Button } from '@/components/ui/button'
import React, { useContext } from 'react'
import { addItemToCart } from '../_actions/addToCart'
import { toast } from 'sonner'
import { cartContext } from '../_context/CartContext'

export default  function AddToCartBtn({productId} : {productId : string}) {
  
const {setcartData , setnumOfCartItems} =  useContext(cartContext)


  async function handelAddItem(){
  const data = await  addItemToCart(productId)


  if(data.status == "success"){
    toast.success("product added", {position:'top-center'})
    setnumOfCartItems(data.numOfCartItems)
    setcartData(data.data)

}else{
    toast.error("error" , {position:'top-center'})
  }






  }
  
  return <>
  
  <Button onClick={handelAddItem}>
    <i className='fa-solid fa-plus'>Add To Cart</i>
  </Button>
  
  </>


  
}
