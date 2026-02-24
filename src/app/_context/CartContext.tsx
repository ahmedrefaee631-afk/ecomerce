import React, { useState, createContext, useEffect } from "react";
import { getUserCart } from "../_actions/getCartData";

export const cartContext = createContext({});

export default function CartContextprovider({
  children,
}: {
  children: React.ReactNode;
}) {
  
    const [cartData, setcartData] = useState(null);
  const [numOfCartItems, setnumOfCartItems] = useState(0);
  const [cartId, setcartId] = useState(null);

async function getData(){
   const userDaraCart = await getUserCart()

console.log(userDaraCart);
setcartData(userDaraCart.data)

setnumOfCartItems(userDaraCart.numOfCartItems)

setcartId(userDaraCart.cartId)

}
 

useEffect(function(){
    getData()
},[])


  return (
    <cartContext.Provider
      value={{
        cartData,
        cartId,
        numOfCartItems,
        setcartData,
        setnumOfCartItems,
      }}
    >
      {children}
    </cartContext.Provider>
  );
}
