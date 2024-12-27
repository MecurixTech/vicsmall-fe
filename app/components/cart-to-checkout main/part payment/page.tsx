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

export default function CartCheckout() {
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
  const [paymentMode, setPaymentMode] = useState('part')
  const [partPaymentPercentage, setPartPaymentPercentage] = useState(75)
  const [agreementChecked, setAgreementChecked] = useState(false)

  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const deliveryFee = 8000
  const discount = 10000
  const grandTotal = subtotal + deliveryFee - discount
  const partPayment = Math.round((grandTotal * partPaymentPercentage) / 100)

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return
    setItems(items.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    ))
  }

  const removeItem = (id: number) => {
    setItems(items.filter(item => item.id !== id))
  }

  const handleApplyCode = () => {
    console.log('Applying coupon code:', couponCode)
  }

  const handleCheckout = () => {
    if (!agreementChecked) {
      alert('Please agree to the Part Payment Agreement')
      return
    }
    console.log('Proceeding to checkout')
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
                        className="h-6 w-6 rounded-sm bg-red-600 hover:bg-red-700 m-1 text-white"
                        aria-label="Decrease quantity"
                      >
                        -
                      </button>
                      <span className="px-3 py-1 text-sm">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="h-6 w-6 rounded-sm bg-green-800 hover:bg-green-900 m-1 text-white"
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
          <div className="space-y-2">
            <h2 className="text-xl font-bold">Coupon Code</h2>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Input code to get discounts"
                className="flex-1 h-10 px-3 rounded-md border border-input bg-background text-sm"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
              />
              <button
                onClick={handleApplyCode}
                className="px-4 py-2 text-primary font-medium"
              >
                Apply Code
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-bold">Payment Mode</h2>
            <div className="space-y-2">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="paymentMode"
                  checked={paymentMode === 'full'}
                  onChange={() => setPaymentMode('full')}
                  className="h-4 w-4 border-gray-300 text-primary focus:ring-primary"
                />
                <span>Full Payment</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="paymentMode"
                  checked={paymentMode === 'part'}
                  onChange={() => setPaymentMode('part')}
                  className="h-4 w-4 border-gray-300 text-primary focus:ring-primary"
                />
                <span>Part Payment</span>
              </label>
            </div>

            {paymentMode === 'part' && (
              <div className="space-y-2">
                <p className="text-sm text-gray-600">Select Part Payment Percentage</p>
                <div className="relative">
                  <input
                    type="range"
                    min="25"
                    max="100"
                    value={partPaymentPercentage}
                    onChange={(e) => setPartPaymentPercentage(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-orange-400"
                  />
                  <div className="flex justify-between text-sm text-gray-600 mt-1">
                    <span>25%</span>
                    <span>75%</span>
                    <span>100%</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-bold">Order Summary</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Sub Total</span>
                <span>N {subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Delivery Fee</span>
                <span>N{deliveryFee.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Discount</span>
                <span className="text-red-500">-N{discount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between font-bold">
                <span>Grand Total</span>
                <span>N {grandTotal.toLocaleString()}</span>
              </div>
              {paymentMode === 'part' && (
                <div className="flex justify-between text-green-500 font-bold">
                  <span>Part Payment</span>
                  <span>N {partPayment.toLocaleString()}</span>
                </div>
              )}
            </div>
          </div>

          <label className="flex items-start gap-2">
            <input
              type="checkbox"
              checked={agreementChecked}
              onChange={(e) => setAgreementChecked(e.target.checked)}
              className="mt-1 h-4 w-4 border-gray-300 rounded text-primary focus:ring-primary"
            />
            <span className="text-sm">
              I have read and agree to the{' '}
              <a href="#" className="text-primary underline">
                Part Payment Agreement
              </a>
            </span>
          </label>

          <div className="space-y-3">
            <button
              onClick={handleCheckout}
              className="w-full py-3 bg-orange-400 text-white rounded-md hover:bg-orange-500 transition-colors"
            >
              Checkout
            </button>
            <button className="w-full py-3 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

