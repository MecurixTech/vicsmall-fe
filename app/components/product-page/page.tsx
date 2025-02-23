'use client'; // ✅ Must be lowercase

import React from 'react';
import ProductSettings from './product-settings';
import InfoTabs from './info-tabs-container';
import CartItem from '../cart-to-checkout/cart-item';
import { cartItems } from "../../data/dummyData";

const Page = () => {
  return (
    <div>
      <div className="flex items-start justify-between gap-4">
        <ProductSettings />
      </div>

      <InfoTabs />

      <hr className="mb-8" />

      <form className="w-1/3 rounded-xl bg-white p-8 shadow-lg">
        <label htmlFor="first_name" className="mb-1">First name</label>
        <input
          type="text"
          name="first_name"
          id="first_name"
          placeholder="E.g. John"
          className="w-full p-2 border rounded"
        />
      </form>

      {cartItems.map((item) => (
        <CartItem 
          key={item.id} 
          item={item} 
          updateQuantity={(id, newQuantity) => console.log("Update quantity:", id, newQuantity)}
          removeItem={(id) => console.log("Remove item:", id)}
        />
      ))}
    </div>
  );
};

export default Page;
