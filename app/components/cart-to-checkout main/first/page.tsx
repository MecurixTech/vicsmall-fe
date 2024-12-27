'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Trash2 } from 'lucide-react'

interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
  image: string
  variant: string
}

export default function CartPage() {
  const [items, setItems] = useState<CartItem[]>([
    {
      id: 1,
      name: "Fashion Front Classic Men Leather Multilayer Bracelet",
      price: 25000,
      quantity: 1,
      image: "https://s3-alpha-sig.figma.com/img/1548/2d44/fd2d08af9e7ffe7f75cc3502448f08fe?Expires=1735516800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=cZyEEgYeHJ2byrCTwxVdCpQBKdqLWs5xe0o~EqLe5xhyI-YTI3Rm8uGWIBahIKmPJt91mMiHxkW6UfpTvvPNDdL-LpXreyOrdoopHFE9YRdoe3NYN7Gmqn43KTduLOLRg9NvRyx9OnlsiPUUo1Bi0IT54Bnq0cBj1-iZ0mAtu3IRgm1OyaGWYxOK~Pxwxp9iYfxA6jMFJvv~g5paxutwCCKjmbebt1U2VND3vKCOZGcb1hiKVU99bOswmubWE9fpTQsaudqJnNrSlIQTPyVW7dXVg5wqO8PFjj69v6vgmNBCqJqgsje8NHDmF29l5ScKemf0znP7zsIi38NEXTidbQ__",
      variant: "Brown"
    },
    {
      id: 2,
      name: "Fashion Front Classic Men Leather Multilayer Bracelet",
      price: 25000,
      quantity: 1,
      image: "https://s3-alpha-sig.figma.com/img/1548/2d44/fd2d08af9e7ffe7f75cc3502448f08fe?Expires=1735516800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=cZyEEgYeHJ2byrCTwxVdCpQBKdqLWs5xe0o~EqLe5xhyI-YTI3Rm8uGWIBahIKmPJt91mMiHxkW6UfpTvvPNDdL-LpXreyOrdoopHFE9YRdoe3NYN7Gmqn43KTduLOLRg9NvRyx9OnlsiPUUo1Bi0IT54Bnq0cBj1-iZ0mAtu3IRgm1OyaGWYxOK~Pxwxp9iYfxA6jMFJvv~g5paxutwCCKjmbebt1U2VND3vKCOZGcb1hiKVU99bOswmubWE9fpTQsaudqJnNrSlIQTPyVW7dXVg5wqO8PFjj69v6vgmNBCqJqgsje8NHDmF29l5ScKemf0znP7zsIi38NEXTidbQ__",
      variant: "Brown"
    },
    {
      id: 3,
      name: "Fashion Front Classic Men Leather Multilayer Bracelet",
      price: 25000,
      quantity: 1,
      image: "https://s3-alpha-sig.figma.com/img/1548/2d44/fd2d08af9e7ffe7f75cc3502448f08fe?Expires=1735516800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=cZyEEgYeHJ2byrCTwxVdCpQBKdqLWs5xe0o~EqLe5xhyI-YTI3Rm8uGWIBahIKmPJt91mMiHxkW6UfpTvvPNDdL-LpXreyOrdoopHFE9YRdoe3NYN7Gmqn43KTduLOLRg9NvRyx9OnlsiPUUo1Bi0IT54Bnq0cBj1-iZ0mAtu3IRgm1OyaGWYxOK~Pxwxp9iYfxA6jMFJvv~g5paxutwCCKjmbebt1U2VND3vKCOZGcb1hiKVU99bOswmubWE9fpTQsaudqJnNrSlIQTPyVW7dXVg5wqO8PFjj69v6vgmNBCqJqgsje8NHDmF29l5ScKemf0znP7zsIi38NEXTidbQ__",
      variant: "Brown"
    },
    {
      id: 4,
      name: "Fashion Front Classic Men Leather Multilayer Bracelet",
      price: 25000,
      quantity: 1,
      image: "https://s3-alpha-sig.figma.com/img/1548/2d44/fd2d08af9e7ffe7f75cc3502448f08fe?Expires=1735516800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=cZyEEgYeHJ2byrCTwxVdCpQBKdqLWs5xe0o~EqLe5xhyI-YTI3Rm8uGWIBahIKmPJt91mMiHxkW6UfpTvvPNDdL-LpXreyOrdoopHFE9YRdoe3NYN7Gmqn43KTduLOLRg9NvRyx9OnlsiPUUo1Bi0IT54Bnq0cBj1-iZ0mAtu3IRgm1OyaGWYxOK~Pxwxp9iYfxA6jMFJvv~g5paxutwCCKjmbebt1U2VND3vKCOZGcb1hiKVU99bOswmubWE9fpTQsaudqJnNrSlIQTPyVW7dXVg5wqO8PFjj69v6vgmNBCqJqgsje8NHDmF29l5ScKemf0znP7zsIi38NEXTidbQ__",
      variant: "Brown"
    },
    {
      id: 5,
      name: "Fashion Front Classic Men Leather Multilayer Bracelet",
      price: 25000,
      quantity: 1,
      image: "https://s3-alpha-sig.figma.com/img/1548/2d44/fd2d08af9e7ffe7f75cc3502448f08fe?Expires=1735516800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=cZyEEgYeHJ2byrCTwxVdCpQBKdqLWs5xe0o~EqLe5xhyI-YTI3Rm8uGWIBahIKmPJt91mMiHxkW6UfpTvvPNDdL-LpXreyOrdoopHFE9YRdoe3NYN7Gmqn43KTduLOLRg9NvRyx9OnlsiPUUo1Bi0IT54Bnq0cBj1-iZ0mAtu3IRgm1OyaGWYxOK~Pxwxp9iYfxA6jMFJvv~g5paxutwCCKjmbebt1U2VND3vKCOZGcb1hiKVU99bOswmubWE9fpTQsaudqJnNrSlIQTPyVW7dXVg5wqO8PFjj69v6vgmNBCqJqgsje8NHDmF29l5ScKemf0znP7zsIi38NEXTidbQ__",
      variant: "Brown"
    }
  ])
  const [couponCode, setCouponCode] = useState('')
  const [paymentMode, setPaymentMode] = useState('full')

  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const deliveryFee = 8000
  const discount = 10000
  const grandTotal = subtotal + deliveryFee - discount

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return
    setItems(items.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    ))
  }

  const removeItem = (id: number) => {
    setItems(items.filter(item => item.id !== id))
  }

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault()
    // Add coupon logic here
    console.log('Applying coupon:', couponCode)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
        <Link href="/" className="hover:text-gray-700">
          Home
        </Link>
        <span>/</span>
        <span>Cart</span>
      </nav>

      <div className="grid gap-8 lg:grid-cols-[1fr,400px]">
        <div>
          <h1 className="text-2xl font-bold mb-6">Cart</h1>
          <div className="space-y-4">
            {items.map(item => (
              <div key={item.id} className="flex gap-4 p-4 border rounded-lg">
                <Image
                  src={item.image}
                  alt={item.name}
                  width={80}
                  height={80}
                  className="rounded-lg object-cover"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-gray-900 text-lg">{item.name}</h3>
                  <p className="text-sm text-gray-500">{item.variant}</p>
                  <div className="mt-2 flex items-center gap-4">
                    <div className="flex items-center border rounded">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="h-6 w-6 rounded-sm bg-red-600 hover:bg-red-200 m-1 text-white"
                        aria-label="Decrease quantity"
                      >
                        -
                      </button>
                      <span className="px-3 py-1 text-sm">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="h-6 w-6 rounded-sm bg-green-800 hover:bg-green-200 m-1 text-white"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                    <p className="text-xl font-bold">N {item.price.toLocaleString()}</p>
                  </div>
                </div>
                <button
                  onClick={() => removeItem(item.id)}
                  className="text-red-500 hover:text-red-600"
                  aria-label="Remove item"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="border rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-4">Coupon Code</h2>
            <form onSubmit={handleApplyCoupon} className="flex gap-2">
              <input
                type="text"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                placeholder="Input code to get discounts"
                className="flex-1 px-3 py-2 border rounded-md text-sm"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-gray-900 text-white rounded-md text-sm hover:bg-gray-800"
              >
                Apply Code
              </button>
            </form>
          </div>

          <div className="border rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-4">Payment Mode</h2>
            <div className="space-y-2">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="paymentMode"
                  value="full"
                  checked={paymentMode === 'full'}
                  onChange={(e) => setPaymentMode(e.target.value)}
                  className="text-black accent-black"
                />
                <span>Full Payment</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="paymentMode"
                  value="part"
                  checked={paymentMode === 'part'}
                  onChange={(e) => setPaymentMode(e.target.value)}
                  className="text-black accent-black"
                />
                <span>Part Payment</span>
              </label>
            </div>
          </div>

          <div className="border rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Sub Total</span>
                <span>N {subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Delivery Fee</span>
                <span>N {deliveryFee.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Discount</span>
                <span className="text-red-500">-N {discount.toLocaleString()}</span>
              </div>
              <div className="pt-4 border-t mt-4">
                <div className="flex justify-between font-semibold">
                  <span>Grand Total</span>
                  <span>N {grandTotal.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <Link
                href="/checkout"
                className="block w-full px-4 py-2 text-center text-white bg-orange-500 rounded-md hover:bg-orange-600"
              >
                Checkout
              </Link>
              <Link
                href="/"
                className="block w-full px-4 py-2 text-center text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

