"use client"

import { useState } from "react"
import { ShoppingCart, Star } from 'lucide-react'
import { Button } from "../category/button"
import { Input } from "../category/input"
import Link from "next/link"
import Image from "next/image"
import { Plane } from 'lucide-react'





interface Product {
  id: number
  name: string
  price: number
  image: string
  colors?: string[]
  rating: number
  hasShipping?: boolean
}

const products: Product[] = [
  {
    id: 1,
    name: "Elegant Watch",
    price: 34500,
    image: "/1.jpeg",

    colors: ["#C0C0C0", "#FFD700", "#8B4513"],
    rating: 4
  },
  {
    id: 2,
    name: "Diamond Ring",
    price: 55000,
    image: "/2.png",
    colors: ["#FFD700", "#C0C0C0", "#FFFFFF"],
    rating: 5
  },
  {
    id: 3,
    name: "Gold Anklet",
    price: 28000,
    image: "/3.jpeg",
    colors: ["#FFD700", "#FFA500"],
    rating: 3
  },
  {
    id: 4,
    name: "Silver Wrist Stud",
    price: 15000,
    image: "/4.jpeg",
    colors: ["#C0C0C0", "#000000", "#FFFFFF"],
    rating: 4
  },
  {
    id: 5,
    name: "Silver",
    price: 15000,
    image: "/5.jpeg",
    colors: ["#C0C0C0", "#000000", "#FFFFFF"],
    rating: 4
  },
  {
    id: 6,
    name: "Silver",
    price: 15000,
    image: "/6.jpeg",
    colors: ["#C0C0C0", "#000000", "#FFFFFF"],
    rating: 4
  },
  {
    id: 7,
    name: "Silver",
    price: 15000,
    image: "/7.jpeg",
    colors: ["#C0C0C0", "#000000", "#FFFFFF"],
    rating: 4
  },
  {
    id: 8,
    name: "Silver",
    price: 15000,
    image: "/8.jpeg",
    colors: ["#C0C0C0", "#000000", "#FFFFFF"],
    rating: 4
  },
  {
    id: 9,
    name: "Silver",
    price: 15000,
    image: "/9.jpeg",
    colors: ["#C0C0C0", "#000000", "#FFFFFF"],
    rating: 4
  },
  {
    id: 10,
    name: "Silver",
    price: 15000,
    image: "/10.jpeg",
    colors: ["#C0C0C0", "#000000", "#FFFFFF"],
    rating: 4
  },
  {
    id: 11,
    name: "Silver",
    price: 15000,
    image: "/11.jpeg",
    colors: ["#C0C0C0", "#000000", "#FFFFFF"],
    rating: 4
  },
  {
    id: 12,
    name: "Silver",
    price: 15000,
    image: "/12.jpeg",
    colors: ["#C0C0C0", "#000000", "#FFFFFF"],
    rating: 4
  },
  {
    id: 13,
    name: "Silver",
    price: 15000,
    image: "/13.jpeg",
    colors: ["#C0C0C0", "#000000", "#FFFFFF"],
    rating: 4
  },
  {
    id: 14,
    name: "Silver",
    price: 15000,
    image: "/14.jpeg",
    colors: ["#C0C0C0", "#000000", "#FFFFFF"],
    rating: 4
  },
  {
    id: 15,
    name: "Silver",
    price: 15000,
    image: "/15.jpeg",
    colors: ["#C0C0C0", "#000000", "#FFFFFF"],
    rating: 4
  },

 
 
]

// Fill the rest of the array with the existing placeholder products
while (products.length < 16) {
  products.push({
    id: products.length + 1,
    name: "Product Name",
    price: 34500,
    image: "/16.jpeg",
    colors: ["#FF0000", "#00FF00", "#0000FF"],
    rating: Math.floor(Math.random() * 4) + 1
  })
}

const categories = [
  "All Accessories",
  "Watches",
  "Rings",
  "Anklets",
  "Wrist Studs"
]

export default function Component() {
  const [selectedCategory, setSelectedCategory] = useState("All Accessories")
  const [minPrice, setMinPrice] = useState("")
  const [maxPrice, setMaxPrice] = useState("")
  const [selectedRating, setSelectedRating] = useState(0)

  const filteredProducts = products.filter(product => {
    const categoryMatch = selectedCategory === "All Accessories" || product.name.toLowerCase().includes(selectedCategory.toLowerCase())
    const priceMatch = (!minPrice || product.price >= parseInt(minPrice)) && (!maxPrice || product.price <= parseInt(maxPrice))
    const ratingMatch = selectedRating === 0 || product.rating >= selectedRating
    return categoryMatch && priceMatch && ratingMatch
  })

  

  return (
    
    <div className="container mx-auto px-4 py-8 ">

      <div className="flex gap-2 text-sm text-muted-foreground mb-8">
        <Link href="/" className="hover:text-primary">
          Home
        </Link>
        <span>/</span>
        <span className="text-primary">Accessories</span>
      </div>

      <div className="grid lg:grid-cols-[250px_1fr] gap-8">
        {/* Filters Sidebar */}
        <div className="space-y-6 bg-white p-6 rounded-lg shadow-md">
          <div>
            <h2 className="font-semibold mb-4">Accessories</h2>
            <ul className="space-y-2">
              {categories.map((category) => (
                <li key={category}>
                  <Button
                    variant="ghost"
                    className={`w-full justify-start ${
                      selectedCategory === category ? "bg-muted" : ""
                    }`}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </Button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-semibold mb-4">Sort By Price</h2>
            <div className="flex items-center gap-2">
              <Input
                type="number"
                placeholder="Min"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className="w-20"
              />
              <span>-</span>
              <Input
                type="number"
                placeholder="Max"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="w-20"
              />
            </div>
          </div>

          <div>
            <h2 className="font-semibold mb-4">Sort By Rating</h2>
            <div className="space-y-2">
              {[5, 4, 3, 2, 1].map((rating) => (
                <Button
                  key={rating}
                  variant="ghost"
                  className={`w-full justify-start ${selectedRating === rating ? "bg-muted" : ""}`}
                  onClick={() => setSelectedRating(rating)}
                >
                  <div className="flex items-center gap-2">
                  <span className="text-muted-foreground text-sm">{rating} Stars</span>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${i < rating ? "text-yellow-400 fill-yellow-400" : "text-muted-foreground"}`}
                      />
                    ))}
                   
                    
                  </div>
                </Button>
              ))}
            </div>
          </div> 
        </div>

        {/* Product Grid */}
        
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div key={product.id} className="group relative bg-white rounded-lg shadow-md overflow-hidden">
                <div className="aspect-square overflow-hidden relative">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={300}
                    height={300}
                    className="h-full w-full object-cover object-center"
                  />
                  <div className="absolute top-2 right-2 flex flex-col gap-2">
                    {/* <Button size="icon" variant="secondary" className="h-8 w-8">
                      <Heart className="h-4 w-4" />
                      <span className="sr-only">Add to favorites</span>
                    </Button> */}
                    <Button size="icon" variant="secondary" className="h-8 w-8">
                      <ShoppingCart className="h-4 w-4" />
                      <span className="sr-only">Add to cart</span>
                    </Button>
                  </div>
                  <div className="h-4 w-40 border-black flex items-center justify-center">

                  <div className="absolute bottom-2 right-2 flex gap-1">
                    {product.colors?.map((color, i) => (
                      <div
                        key={i}
                        className="h-4 w-4 rounded-full border shadow-sm"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                  </div>
                </div>
                <div className="p-4 space-y-2">
                  <h3 className="text-sm font-medium">{product.name}</h3>
                  <p className="text-sm font-semibold">₦{product.price.toLocaleString()}</p>
                  
                </div>
                {product.hasShipping && (
                <Plane className="h-4 w-4 text-gray-400" />
              )}
              </div>
            ))}
          </div>
        </div>
      </div>
 
  )
}