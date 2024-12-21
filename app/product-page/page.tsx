"use client"

import React from 'react'

import ProductSettings from '../components/product-page/product-settings'
import InfoTabs from '../components/product-page/info-tabs-container'
import {  products } from "../data/dummyData";
import Footer from '../components/footer'
import Navbar from '../components/navbar'
import ProductCard from '../components/product-card/product-card'

const page = () => {
  
  
  return (
    <div>
      <Navbar />
        <div className="flex items-start justify-between gap-4">
        
        <ProductSettings />
      </div>
     
      <InfoTabs />

      <hr className="mb-8" />

      <section className="mx-auto my-14 w-[95%]">
        <h3 className="mb-4">Recommended items</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      
      <Footer />
    </div>
  )
}

export default page