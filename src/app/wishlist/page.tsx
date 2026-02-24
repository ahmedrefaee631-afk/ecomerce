"use client"

import { useEffect, useState } from "react"
import { getWishlist, removeFromWishlist } from "../_actions/wishlist.actions"
import { toast } from "sonner"

export default function WishlistPage() {
  const [products, setProducts] = useState<any[]>([])

  async function loadWishlist() {
    try {
      const data = await getWishlist()
      setProducts(data.data)
    } catch {
      toast.error("Failed to load wishlist")
    }
  }

  async function handleRemove(id: string) {
    try {
      await removeFromWishlist(id)
      toast.success("Removed successfully")
      loadWishlist()
    } catch {
      toast.error("Failed to remove")
    }
  }

  useEffect(() => {
    loadWishlist()
  }, [])

  return (
    <div className="min-h-screen p-10">
      <h1 className="text-3xl font-bold mb-6">My Wishlist</h1>

      {products.length === 0 ? (
        <p>No items in wishlist</p>
      ) : (
        <div className="grid grid-cols-3 gap-6">
          {products.map((item) => (
            <div key={item._id} className="border p-4 rounded-lg shadow">
              <img src={item.imageCover} className="h-40 w-full object-cover mb-3" />
              <h2 className="font-bold">{item.title}</h2>
              <p className="text-green-600 font-semibold">${item.price}</p>

              <button
                onClick={() => handleRemove(item._id)}
                className="mt-3 bg-red-500 text-white px-4 py-2 rounded"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}