"use client";

import { useState } from "react";
import Link from "next/link";
import CartItem from "../components/cart-to-checkout/cart-item";
import { useRouter } from "next/navigation";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  variant: string;
}

export default function CartCheckout() {
  const router = useRouter();

  const [items, setItems] = useState<CartItem[]>([
    {
      id: 1,
      name: "Fashion Front Classic Men Leather Multilayer Bracelet",
      price: 25000,
      quantity: 1,
      image:
        "https://utfs.io/f/wLDjZbdcJHpRYvzkoJDnqwxQN14hETb5kDvde3zrKMJZfRX0",
      variant: "Brown",
    },
    {
      id: 2,
      name: "Fashion Front Classic Men Leather Multilayer Bracelet",
      price: 25000,
      quantity: 1,
      image:
        "https://utfs.io/f/wLDjZbdcJHpRYvzkoJDnqwxQN14hETb5kDvde3zrKMJZfRX0",
      variant: "Brown",
    },
    {
      id: 3,
      name: "Fashion Front Classic Men Leather Multilayer Bracelet",
      price: 25000,
      quantity: 1,
      image:
        "https://utfs.io/f/wLDjZbdcJHpRYvzkoJDnqwxQN14hETb5kDvde3zrKMJZfRX0",
      variant: "Brown",
    },
    {
      id: 4,
      name: "Fashion Front Classic Men Leather Multilayer Bracelet",
      price: 25000,
      quantity: 1,
      image:
        "https://utfs.io/f/wLDjZbdcJHpRYvzkoJDnqwxQN14hETb5kDvde3zrKMJZfRX0",
      variant: "Brown",
    },
    {
      id: 5,
      name: "Fashion Front Classic Men Leather Multilayer Bracelet",
      price: 25000,
      quantity: 1,
      image:
        "https://utfs.io/f/wLDjZbdcJHpRYvzkoJDnqwxQN14hETb5kDvde3zrKMJZfRX0",
      variant: "Brown",
    },
  ]);
  const [couponCode, setCouponCode] = useState("");
  const [paymentMode, setPaymentMode] = useState("part");
  const [partPaymentPercentage, setPartPaymentPercentage] = useState(75);
  const [agreementChecked, setAgreementChecked] = useState(false);

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const deliveryFee = 8000;
  const discount = 10000;
  const grandTotal = subtotal + deliveryFee - discount;
  const partPayment = Math.round((grandTotal * partPaymentPercentage) / 100);

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item,
      ),
    );
  };

  const removeItem = (id: number) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const handleApplyCode = () => {
    console.log("Applying coupon code:", couponCode);
  };

  const handleCheckout = () => {
    if (!agreementChecked) {
      alert("Please agree to the Part Payment Agreement");
      return;
    }
    console.log("Proceeding to checkout");
    router.push("/checkout");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <nav className="mb-8 flex items-center gap-2 text-sm text-gray-500">
        <Link href="/" className="hover:text-gray-700">
          Home
        </Link>
        <span>/</span>
        <span>Cart</span>
      </nav>

      <div className="grid gap-8 lg:grid-cols-[1fr,400px]">
        <div>
          <h1 className="mb-6 text-2xl font-bold">Cart</h1>
          <div className="space-y-4">
            {items.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                updateQuantity={updateQuantity}
                removeItem={removeItem}
              />
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
                className="border-input bg-background h-10 flex-1 rounded-md border px-3 text-sm"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
              />
              <button
                onClick={handleApplyCode}
                className="text-primary px-4 py-2 font-medium"
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
                  checked={paymentMode === "full"}
                  onChange={() => setPaymentMode("full")}
                  className="text-primary focus:ring-primary h-4 w-4 border-gray-300"
                />
                <span>Full Payment</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="paymentMode"
                  checked={paymentMode === "part"}
                  onChange={() => setPaymentMode("part")}
                  className="text-primary focus:ring-primary h-4 w-4 border-gray-300"
                />
                <span>Part Payment</span>
              </label>
            </div>

            {paymentMode === "part" && (
              <div className="space-y-2">
                <p className="text-sm text-gray-600">
                  Select Part Payment Percentage
                </p>
                <div className="relative">
                  <input
                    type="range"
                    min="25"
                    max="100"
                    value={partPaymentPercentage}
                    onChange={(e) =>
                      setPartPaymentPercentage(Number(e.target.value))
                    }
                    className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 accent-orange-400"
                  />
                  <div className="mt-1 flex justify-between text-sm text-gray-600">
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
                <span className="text-red-500">
                  -N{discount.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between font-bold">
                <span>Grand Total</span>
                <span>N {grandTotal.toLocaleString()}</span>
              </div>
              {paymentMode === "part" && (
                <div className="flex justify-between font-bold text-green-500">
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
              className="text-primary focus:ring-primary mt-1 h-4 w-4 rounded border-gray-300"
            />
            <span className="text-sm">
              I have read and agree to the{" "}
              <Link
                href="/refund-and-returns-policy"
                className="text-primary underline"
              >
                Part Payment Agreement
              </Link>
            </span>
          </label>

          <div className="space-y-3">
            <button
              onClick={handleCheckout}
              className="w-full rounded-md bg-orange-400 py-3 text-white transition-colors hover:bg-orange-500"
            >
              Checkout
            </button>
            <button className="w-full rounded-md border border-gray-300 py-3 transition-colors hover:bg-gray-50">
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
