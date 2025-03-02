"use client";
import { useState, useEffect } from "react";
import { products, categories, cartItems as dummyCartItems } from "../data/dummyData";
import CartItem from "./cart-to-checkout/cart-item";
import Footer from "./footer";
import Banner from "./home/banner";
import CategoryCard from "./home/category-card";
import CountdownTimer from "./home/countdown-timer";
import ProductCard from "./product-card/product-card";
import InfoTabs from "./product-page/info-tabs-container";
import ProductSettings from "./product-page/product-settings";

const ComponentsPage = () => {
  const [cartItems, setCartItems] = useState(dummyCartItems);
  const [visibleProducts, setVisibleProducts] = useState([]);


  useEffect(() => {
    const updateVisibleProducts = () => {
      const screenWidth = window.innerWidth;
      if (screenWidth < 1024) {
        setVisibleProducts(products.slice(0, 4));
      } else {
        setVisibleProducts(products.slice(0, 5)); 
      }
    };
    return () => {
      window.removeEventListener("resize", updateVisibleProducts);
    };
  }, []); 

  const updateQuantity = (id: number, newQuantity: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, newQuantity) } : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  return (
    <main className="min-h-screen flex flex-col justify-between mb-24 space-y-12">
      {/* Countdown Timer & Banner */}
      <div className="p-4">
        <section className="flex flex-col items-center space-y-[-50px] pb-[40px]">
          <CountdownTimer hours={3} minutes={36} seconds={14} />
          <Banner />
        </section>

        <section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 lg:p-16 lg:pl-[60px] pb-[40px]">
          {visibleProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </section>    

      {/* Categories */}
      <section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {categories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </section>
       
        <form className="w-full max-w-md mx-auto rounded-xl bg-white p-6 sm:p-8 shadow-lg">
  <div className="flex flex-col space-y-4">
    <label htmlFor="first_name" className="text-sm font-medium">First Name</label>
    <input
      type="text"
      name="first_name"
      id="first_name"
      placeholder="E.g. John"
      className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    />

    <label htmlFor="last_name" className="text-sm font-medium">Last Name</label>
    <input
      type="text"
      name="last_name"
      id="last_name"
      placeholder="E.g. Doe"
      className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    />

    <label htmlFor="order" className="text-sm font-medium">Order</label>
    <input
      type="text"
      name="order"
      id="order"
      placeholder="AirForce 1"
      className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    />

    <label htmlFor="quantity" className="text-sm font-medium">Quantity</label>
    <input
      type="number"
      name="quantity"
      id="quantity"
      placeholder="1"
      className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    />

    {/* Submit Button */}
    <button 
      type="submit" 
      className="w-full bg-orange-600 text-white font-semibold p-2 rounded-lg hover:bg-orange-700 transition"
    >
      Submit Order
    </button>
  </div>
</form>


      {/* ✅ Render cart items */}
      {cartItems.length > 0 ? (
        cartItems.map((item) => (
          <CartItem 
            key={item.id} 
            item={item} 
            updateQuantity={updateQuantity} 
            removeItem={removeItem} 
          />
        ))
      ) : (
        <p className="text-center text-gray-500">Your cart is empty.</p>
      )}

        {/* Product Information */}
        <section className="pb-[40px]">
          <InfoTabs />
        </section>

        <hr className="border-gray-300" />

        <section className="flex flex-col md:flex-row items-start justify-between gap-6">
          <ProductSettings />
        </section>
      </div>

      {/* Footer */}
      <div className="mt-auto">
      <Footer/>
        </div> 
    </main>
  );
};

export default ComponentsPage;
