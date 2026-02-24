
import React from "react"
import Image from "next/image"
import { getUserOrder } from "./order.action"
import { getMyToken } from "../_actions/getMyToken"

export default async function OrdersPage() {

let res = await getUserOrder()





  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">My Orders</h1>

      <div className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200">
        <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <p className="text-sm text-gray-500">Order ID</p>
            <p className="font-medium text-gray-900">#1</p>
            <p className="text-xs text-gray-400">ID: 641f0b893c9ef18e1a5955e7</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Placed On</p>
            <p className="font-medium text-gray-900">March 25, 2023</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Status</p>
            <div className="flex gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-800">
                Unpaid
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">
                Processing
              </span>
            </div>
          </div>
        </div>

        <div className="p-6">
          <h2 className="text-lg font-semibold mb-4 text-gray-700">Items</h2>
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 border-b border-gray-100 last:border-0 pb-6 last:pb-0">
              <div className="relative w-24 h-24 flex-shrink-0 border border-gray-200 rounded-md overflow-hidden">
                <Image
                  src="https://ecommerce.routemisr.com/Route-Academy-products/1678305677165-cover.jpeg"
                  alt="Archer VR300 AC1200 Wireless VDSL/ADSL Modem Router Black"
                  fill
                  className="object-cover"
                />
              </div>

              <div className="flex-1 text-center sm:text-left">
                <h3 className="text-base font-medium text-gray-900">
                  Archer VR300 AC1200 Wireless VDSL/ADSL Modem Router Black
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  Brand: Canon | Category: Electronics
                </p>
                <div className="mt-2 flex flex-col sm:flex-row justify-between items-center text-sm">
                  <p className="text-gray-600">
                    Qty: <span className="font-medium">1</span>
                  </p>
                  <p className="font-semibold text-gray-900">
                    1699 EGP
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 px-6 py-6 border-t border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
                Payment Summary
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between text-gray-600">
                  <span>Payment Method</span>
                  <span className="font-medium capitalize">cash</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping Price</span>
                  <span className="font-medium">0 EGP</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax Price</span>
                  <span className="font-medium">0 EGP</span>
                </div>
                <div className="flex justify-between text-gray-900 text-lg font-bold border-t border-gray-200 pt-3 mt-3">
                  <span>Total</span>
                  <span>1699 EGP</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}