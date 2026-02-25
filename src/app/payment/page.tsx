"use client"

import React, { useContext } from 'react'
import { useForm } from "react-hook-form"
import { cartContext } from '@/app/_context/CartContext'
import { createCashOrder, createVisaOrder } from './payment.action'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

interface shippingAddressType {
  shippingAddress: {
    city: string;
    phone: string;
    details: string;
  }
}

export default function PaymentPage() {
  const router = useRouter()
  const context = useContext(cartContext)
  
  if (!context) return null

  // destructure values from context (لاحظ الحروف الصغيرة)
  const { cartId, setnumOfCartItems, setcartData } = context

  const { register, handleSubmit, watch } = useForm({
    defaultValues: {
      details: "",
      phone: "",
      city: "",
      type: "cash"
    },
  })

  const paymentType = watch("type")

  async function handlePayment(value: any) {
    const userData: shippingAddressType = {
      shippingAddress: {
        city: value.city,
        phone: value.phone,
        details: value.details
      }
    }

    if (value.type === "cash") {
      try {
        const res = await createCashOrder(cartId, userData)
        setnumOfCartItems(0) // تم تعديل الحروف
        setcartData(null)     // تم تعديل الحروف
        toast.success("Order created successfully!", { position: "top-center" })
        setTimeout(() => router.push('/allorders'), 2000)
      } catch (error) {
        toast.error("Failed to create order")
      }
    } else {
      try {
        const res = await createVisaOrder(cartId, userData)
        window.open(res.session.url)
        toast.info("Online payment is coming soon")
      } catch (error) {
        toast.error("Failed to create online payment")
      }
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Shipping Details</h2>
        
        <form onSubmit={handleSubmit(handlePayment)} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Address Details</label>
            <input
              {...register("details", { required: true })}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 outline-none focus:border-indigo-500"
              placeholder="Apartment, street, etc."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Phone Number</label>
            <input
              {...register("phone", { required: true })}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 outline-none focus:border-indigo-500"
              placeholder="010xxxxxxx"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">City</label>
            <input
              {...register("city", { required: true })}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 outline-none focus:border-indigo-500"
              placeholder="Cairo"
            />
          </div>

          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">Payment Method</label>
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <input
                  {...register("type")}
                  type="radio"
                  value="cash"
                  className="h-4 w-4 text-indigo-600"
                />
                <label className="ml-2 text-sm text-gray-700">Cash on Delivery</label>
              </div>
              <div className="flex items-center">
                <input
                  {...register("type")}
                  type="radio"
                  value="visa"
                  className="h-4 w-4 text-indigo-600"
                />
                <label className="ml-2 text-sm text-gray-700">Visa / Card</label>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
          >
            {paymentType === "cash" ? "Confirm Order" : "Pay Now"}
          </button>
        </form>
      </div>
    </div>
  )
}