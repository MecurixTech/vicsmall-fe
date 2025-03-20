export interface Product {
    id: string
    name: string
    price: number
    image: string
    description?: string
    category?: string
    variant?: string
  }
 
  
  
  
  export interface CartItemType {
    cart_id: number
    product_id: string
    quantity: number
    name: string
    price: number
    image: string
    variant?: string
    added_at?: string
  }
  
  export interface CheckoutData {
    items: CartItemType[]
    subtotal: number
    deliveryFee: number
    discount: number
    grandTotal: number
    paymentMode: string
    partPayment: number
    partPaymentPercentage: number
  }
  
  export interface OrderData extends CheckoutData {
    firstName: string
    lastName: string
    country: string
    state: string
    city: string
    streetAddress: string
    phone: string
    email: string
    orderNotes?: string
    paymentMethod: string
    orderDate: string
    orderNumber: string
  }
  
  