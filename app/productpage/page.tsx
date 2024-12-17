import React from 'react'
import ProductGallery from '../components/product-page/product-gallery'
import ProductSettings from '../components/product-page/product-settings'
import InfoTabs from '../components/product-page/info-tabs-container'
import CartItem from '../components/cart-to-checkout/cart-item'
import {  cartItems } from "../data/dummyData";
import Footer from '../components/footer'
import Navbar from '../components/navbar'

const page = () => {
  return (
    <div>
      <Navbar />
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
      <Footer />
    </div>
  )
}

export default page