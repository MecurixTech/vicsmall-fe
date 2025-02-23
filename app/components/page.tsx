"use client"; 
import { useState } from "react";
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
  const [cartItems, setCartItems] = useState(dummyCartItems); // ✅ Add state

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
    <main className="mb-24 p-4">
      <CountdownTimer hours={3} minutes={36} seconds={14} />
      <Banner />
      <section className="grid grid-cols-5 gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </section>

      <section className="grid grid-cols-4 gap-4">
        {categories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </section>
      <Footer />

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

      <InfoTabs />

      <hr className="mb-8" />

      <div className="flex items-start justify-between gap-4">
        {/* <ProductGallery /> */}
        <ProductSettings />
      </div>
    </main>
  );
};

export default ComponentsPage;
