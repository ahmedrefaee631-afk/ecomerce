"use client";

import { useState, useEffect } from "react";
import { addItemToCart } from "@/app/_actions/addToCart";
import { getUserCart } from "@/app/_actions/getCartData";
import { deleteItem } from "@/app/_actions/deleteCart";

export default function CartClient() {
  const [cart, setCart] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCart();
  }, []);

  async function fetchCart() {
    setLoading(true);
    try {
      const data = await getUserCart();
      setCart(data);
    } catch (err) {
      console.log("Error fetching cart:", err);
    }
    setLoading(false);
  }

  async function handleAdd(productId: string) {
    try {
      await addItemToCart(productId);
      await fetchCart();
    } catch (err) {
      console.log("Error adding to cart:", err);
    }
  }

  async function handleDelete(productId: string) {
    try {
      await deleteItem(productId);
      await fetchCart();
    } catch (err) {
      console.log("Error deleting item:", err);
    }
  }

  if (loading) return <p>Loading Cart...</p>;

  return (
    <div>
      {cart.length === 0 && <p>Cart is empty</p>}
      {cart.map(item => (
        <div key={item._id}>
          {item.name} - {item.price}$
          <button onClick={() => handleAdd(item._id)}>Add More</button>
          <button onClick={() => handleDelete(item._id)}>Remove</button>
        </div>
      ))}
    </div>
  );
}