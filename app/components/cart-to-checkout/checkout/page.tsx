'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

const formSchema = z.object({
  firstName: z.string().min(2, 'First name is required'),
  lastName: z.string().min(2, 'Last name is required'),
  country: z.string().min(2, 'Country is required'),
  state: z.string().min(2, 'State is required'),
  city: z.string().min(2, 'City is required'),
  streetAddress: z.string().min(5, 'Street address is required'),
  phone: z.string().min(10, 'Valid phone number is required'),
  email: z.string().email('Valid email is required'),
  orderNotes: z.string().optional(),
  paymentMethod: z.enum(['card', 'delivery']),
  termsAccepted: z.literal(true, {
    errorMap: () => ({ message: "You must accept the terms and conditions" }),
  }),
})

type FormValues = z.infer<typeof formSchema>

export default function CheckoutPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      paymentMethod: 'card',
      termsAccepted: false,
    },
  })

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true)
    try {
      // Add your submission logic here
      await new Promise(resolve => setTimeout(resolve, 2000))
      console.log(data)
    } finally {
      setIsSubmitting(false)
    }
  }

  const watchPaymentMethod = watch('paymentMethod')
  const watchTermsAccepted = watch('termsAccepted')

  return (
    <div className="container mx-auto px-4 py-8">
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
        <Link href="/" className="hover:text-gray-700">
          Home
        </Link>
        <span>/</span>
        <span>Cart</span>
      </nav>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="lg:col-span-1">
            <div className="border rounded-lg p-6">
              <h2 className="text-2xl font-bold mb-6">Delivery Address</h2>
              <div className="space-y-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                    <input
                      type="text"
                      id="firstName"
                      {...register('firstName')}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="Enter Name"
                    />
                    {errors.firstName && <p className="mt-1 text-xs text-red-600">{errors.firstName.message}</p>}
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                    <input
                      type="text"
                      id="lastName"
                      {...register('lastName')}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="Enter Name"
                    />
                    {errors.lastName && <p className="mt-1 text-xs text-red-600">{errors.lastName.message}</p>}
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">Country / Region</label>
                    <input
                      type="text"
                      id="country"
                      {...register('country')}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="Enter Country"
                    />
                    {errors.country && <p className="mt-1 text-xs text-red-600">{errors.country.message}</p>}
                  </div>
                  <div>
                    <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">State</label>
                    <input
                      type="text"
                      id="state"
                      {...register('state')}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="Enter State"
                    />
                    {errors.state && <p className="mt-1 text-xs text-red-600">{errors.state.message}</p>}
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">Town / City</label>
                    <input
                      type="text"
                      id="city"
                      {...register('city')}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="Enter City"
                    />
                    {errors.city && <p className="mt-1 text-xs text-red-600">{errors.city.message}</p>}
                  </div>
                  <div>
                    <label htmlFor="streetAddress" className="block text-sm font-medium text-gray-700 mb-1">Street Address</label>
                    <input
                      type="text"
                      id="streetAddress"
                      {...register('streetAddress')}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="Enter Address"
                    />
                    {errors.streetAddress && <p className="mt-1 text-xs text-red-600">{errors.streetAddress.message}</p>}
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                    <input
                      type="tel"
                      id="phone"
                      {...register('phone')}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="Enter Phone Number"
                    />
                    {errors.phone && <p className="mt-1 text-xs text-red-600">{errors.phone.message}</p>}
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      id="email"
                      {...register('email')}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="Enter Email"
                    />
                    {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>}
                  </div>
                </div>

                <div>
                  <label htmlFor="orderNotes" className="block text-sm font-medium text-gray-700 mb-1">Order Notes</label>
                  <textarea
                    id="orderNotes"
                    {...register('orderNotes')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Enter any additional notes"
                    rows={4}
                  ></textarea>
                  {errors.orderNotes && <p className="mt-1 text-xs text-red-600">{errors.orderNotes.message}</p>}
                </div>

                <button
                  type="button"
                  className="w-full px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Select Another Address
                </button>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="border rounded-lg p-6 space-y-6">
              <h2 className="text-2xl font-bold">Order Summary</h2>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Sub Total</span>
                  <span>N 110,000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Delivery Fee</span>
                  <span>N 8,000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Discount</span>
                  <span className="text-red-500">-N 10,000</span>
                </div>
                <hr className="my-4" />
                <div className="flex justify-between font-semibold">
                  <span>Grand Total</span>
                  <span>N 108,000</span>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Payment Method</h3>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        value="card"
                        {...register('paymentMethod')}
                        className="form-radio h-4 w-4 text-indigo-600"
                      />
                      <span className="ml-2">Card Payment</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        value="delivery"
                        {...register('paymentMethod')}
                        className="form-radio h-4 w-4 text-indigo-600"
                      />
                      <span className="ml-2">Payment On Delivery</span>
                    </label>
                  </div>
                  {errors.paymentMethod && <p className="mt-1 text-xs text-red-600">{errors.paymentMethod.message}</p>}
                </div>

                <div>
                  <div className="text-center mb-4">
                    <p className="text-sm text-gray-500 mb-2">Secured by paystack</p>
                    <div className="flex justify-center gap-4">
                      <Image
                        src="/placeholder.svg"
                        alt="Payment method"
                        width={50}
                        height={30}
                        className="object-contain"
                      />
                      <Image
                        src="/placeholder.svg"
                        alt="Payment method"
                        width={50}
                        height={30}
                        className="object-contain"
                      />
                      <Image
                        src="/placeholder.svg"
                        alt="Payment method"
                        width={50}
                        height={30}
                        className="object-contain"
                      />
                      <Image
                        src="/placeholder.svg"
                        alt="Payment method"
                        width={50}
                        height={30}
                        className="object-contain"
                      />
                    </div>
                  </div>

                  <p className="text-sm text-gray-500 mb-4">
                    Your personal data will be used to process your order, support your experience
                    throughout this website, and for other purposes described in our{' '}
                    <Link href="/privacy-policy" className="text-indigo-600 hover:underline">
                      privacy policy
                    </Link>
                    .
                  </p>

                  <div className="flex items-start mb-4">
                    <input
                      type="checkbox"
                      id="termsAccepted"
                      {...register('termsAccepted')}
                      className="form-checkbox h-4 w-4 text-indigo-600 mt-1"
                    />
                    <label htmlFor="termsAccepted" className="ml-2 block text-sm text-gray-900">
                      I have read and agree to the website{' '}
                      <Link href="/terms" className="text-indigo-600 hover:underline">
                        terms and conditions
                      </Link>
                    </label>
                  </div>
                  {errors.termsAccepted && <p className="mt-1 text-xs text-red-600">{errors.termsAccepted.message}</p>}

                  <button 
                    type="submit" 
                    className="w-full px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-50"
                    disabled={isSubmitting || !watchTermsAccepted}
                  >
                    {isSubmitting ? 'Processing...' : 'Proceed To Payment'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

