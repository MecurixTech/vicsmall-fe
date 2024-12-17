import React from 'react'
import ProductGallery from './product-gallery'
import ProductSettings from './product-settings'
import InfoTabs from './info-tabs-container'
import CartItem from '../cart-to-checkout/cart-item'
import {  cartItems } from "../../data/dummyData";


const page = () => {
  return (
    
    <div>
        
        <div className="flex items-start justify-between gap-4">
        <ProductGallery />
        <ProductSettings />
      </div>
     
      <InfoTabs />

      <hr className="mb-8" />

      <form className="w-1/3 rounded-xl bg-white p-8 shadow-lg">
        <label htmlFor="first_name" className="mb-1">
          First name
        </label>
        <input
          type="text"
          name="first_name"
          id="first_name"
          placeholder="E.g. John"
        />
      </form>

      {cartItems.map((item) => (
        <CartItem key={item.id} cartItemData={item} />
      ))}

    </div>
  )
}

export default page