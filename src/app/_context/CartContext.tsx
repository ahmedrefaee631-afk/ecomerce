"use client";

import React, { useState, createContext, useEffect } from "react";
import { getUserCart } from "../_actions/getCartData";

/* ================== Types ================== */

interface CartContextType {
  cartData: any;
  cartId: any;
  numOfCartItems: number;
  setcartData: React.Dispatch<React.SetStateAction<any>>;
  setnumOfCartItems: React.Dispatch<React.SetStateAction<number>>;
}

/* ================== Context ================== */

export const cartContext = createContext<CartContextType>({
  cartData: null,
  cartId: null,
  numOfCartItems: 0,
  setcartData: () => {},
  setnumOfCartItems: () => {},
});

/* ================== Provider ================== */

export default function CartContextprovider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [cartData, setcartData] = useState<any>(null);
  const [numOfCartItems, setnumOfCartItems] = useState<number>(0);
  const [cartId, setcartId] = useState<any>(null);

  async function getData() {
    try {
      const userDaraCart = await getUserCart();

      setcartData(userDaraCart?.data || null);
      setnumOfCartItems(userDaraCart?.numOfCartItems || 0);
      setcartId(userDaraCart?.cartId || null);
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  }

  useEffect(() => {
    getData();
  }, []);

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