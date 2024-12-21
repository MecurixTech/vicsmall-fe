'use client'

import { useState } from 'react'
import { Trash2 } from 'lucide-react'
import Image from "next/image"
import Link from "next/link"
import { Button } from "../cart-full-payment/button"
import { Input } from "../cart-full-payment/input"
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@mui/icons-material'
import { Separator } from '@radix-ui/react-separator'



interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { id: 1, name: "Fashion Front Classic Men Leather Multilayer Bracelet Brown", price: 25000, quantity: 1 },
    { id: 2, name: "Fashion Front Classic Men Leather Multilayer Bracelet Brown", price: 25000, quantity: 1 },
    { id: 3, name: "Fashion Front Classic Men Leather Multilayer Bracelet Brown", price: 25000, quantity: 1 },
    { id: 4, name: "Fashion Front Classic Men Leather Multilayer Bracelet Brown", price: 25000, quantity: 1 },
    { id: 5, name: "Fashion Front Classic Men Leather Multilayer Bracelet Brown", price: 25000, quantity: 1 },
  ])
  const [couponCode, setCouponCode] = useState("")
  const [paymentMode, setPaymentMode] = useState("full")

  const updateQuantity = (id: number, newQuantity: number) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id ? { ...item, quantity: Math.max(1, newQuantity) } : item
      )
    )
  }

  const removeItem = (id: number) => {
    setCartItems(items => items.filter(item => item.id !== id))
  }

  const subTotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const deliveryFee = 8000
  const discount = 10000
  const grandTotal = subTotal + deliveryFee - discount

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
        <Link href="/" className="hover:text-foreground">
          Home
        </Link>
        <span>/</span>
        <span>Cart</span>
      </nav>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <h1 className="text-2xl font-semibold mb-6">Cart</h1>
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div key={item.id} className="flex gap-4 items-center p-4 border rounded-lg">
                <Image
                  src="https://s3-alpha-sig.figma.com/img/1548/2d44/fd2d08af9e7ffe7f75cc3502448f08fe?Expires=1735516800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=cZyEEgYeHJ2byrCTwxVdCpQBKdqLWs5xe0o~EqLe5xhyI-YTI3Rm8uGWIBahIKmPJt91mMiHxkW6UfpTvvPNDdL-LpXreyOrdoopHFE9YRdoe3NYN7Gmqn43KTduLOLRg9NvRyx9OnlsiPUUo1Bi0IT54Bnq0cBj1-iZ0mAtu3IRgm1OyaGWYxOK~Pxwxp9iYfxA6jMFJvv~g5paxutwCCKjmbebt1U2VND3vKCOZGcb1hiKVU99bOswmubWE9fpTQsaudqJnNrSlIQTPyVW7dXVg5wqO8PFjj69v6vgmNBCqJqgsje8NHDmF29l5ScKemf0znP7zsIi38NEXTidbQ__"
                  alt={item.name}
                  width={80}
                  height={80}
                  className="rounded-md object-cover"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-sm">{item.name}</h3>
                  <div className="flex items-center gap-4 mt-2">
                    <div className="flex items-center gap-2 text-sm">
                      <div className="flex items-center border rounded-sm overflow-hidden ">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 rounded-sm bg-red-600 hover:bg-red-200 m-1"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <span className="text-white">-</span>
                        </Button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 rounded-sm bg-green-800 hover:bg-green-200 m-1"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <span className="text-white">+</span>
                        </Button>
                      </div>
                    </div>
                    <div className="font-semibold">N {item.price.toLocaleString()}</div>
                  </div>
                </div>
                <Button variant="ghost" size="icon" className="text-red-500" onClick={() => removeItem(item.id)}>
                  <Trash2 className="h-5 w-5" />
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="sticky top-4 space-y-6">
            {/* Coupon Code */}
            <div className="p-6 border rounded-lg">
              <h2 className="font-semibold mb-4">Coupon Code</h2>
              <div className="flex gap-2">
                <Input 
                  placeholder="Input code to get discounts" 
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                />
                <Button variant="outline">Apply Code</Button>
              </div>
            </div>
            
            

            {/* Payment Mode */}
            <div className="p-6 border rounded-lg">
              <h2 className="font-semibold mb-4">Payment Mode</h2>
              <RadioGroup value={paymentMode} onValueChange={setPaymentMode}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="full" id="full" />
                  <Label htmlFor="full">Full Payment</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="part" id="part" />
                  <Label htmlFor="part">Part Payment</Label>
                </div>
              </RadioGroup>
            </div>

            {/* Order Summary */}
            <div className="p-6 border rounded-lg">
              <h2 className="font-semibold mb-4">Order Summary</h2>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Sub Total</span>
                  <span>N {subTotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Delivery Fee</span>
                  <span>N {deliveryFee.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Discount</span>
                  <span className="text-red-500">-N {discount.toLocaleString()}</span>
                </div>
                <Separator className="my-4" />
                <div className="flex justify-between font-semibold">
                  <span>Grand Total</span>
                  <span>N {grandTotal.toLocaleString()}</span>
                </div>
              </div>
              <div className="space-y-3 mt-6">
                <Button className="w-full bg-orange-500 hover:bg-orange-600">
                  Checkout
                </Button>
                <Button variant="outline" className="w-full">
                  Continue Shopping
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

