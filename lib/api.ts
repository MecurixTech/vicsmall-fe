
export interface Product {
    id: string
    name: string
    price: number
    originalPrice: number
    currentPrice: number
    image: string
    colors?: string[]
    rating?: number
    category?: string
  }
  
  export interface Category {
    id: string
    name: string
    subcategories: {
      id: string
      name: string
      image: string
    }[]
  }
  
  export const categories: Category[] = [
    {
      id: "mens-fashion",
      name: "Mens Fashion",
      subcategories: [
        { id: "tshirts", name: "T shirts", image: "/placeholder.svg?height=80&width=96" },
        { id: "shirts", name: "Shirts", image: "/placeholder.svg?height=80&width=96" },
        { id: "pants", name: "Pants", image: "/placeholder.svg?height=80&width=96" },
        { id: "accessories", name: "Accessories", image: "/placeholder.svg?height=80&width=96" },
        { id: "shoes", name: "Shoes", image: "/placeholder.svg?height=80&width=96" },
        { id: "watches", name: "Watches", image: "/placeholder.svg?height=80&width=96" },
      ],
    },
    {
      id: "womens-fashion",
      name: "Women Fashion",
      subcategories: [
        { id: "dresses", name: "Dresses", image: "/placeholder.svg?height=80&width=96" },
        { id: "tops", name: "Tops", image: "/placeholder.svg?height=80&width=96" },
        { id: "skirts", name: "Skirts", image: "/placeholder.svg?height=80&width=96" },
        { id: "accessories", name: "Accessories", image: "/placeholder.svg?height=80&width=96" },
        { id: "shoes", name: "Shoes", image: "/placeholder.svg?height=80&width=96" },
        { id: "bags", name: "Bags", image: "/placeholder.svg?height=80&width=96" },
      ],
    },
    {
      id: "gadgets",
      name: "Gadgets",
      subcategories: [
        { id: "phones", name: "Phones", image: "/placeholder.svg?height=80&width=96" },
        { id: "laptops", name: "Laptops", image: "/placeholder.svg?height=80&width=96" },
        { id: "tablets", name: "Tablets", image: "/placeholder.svg?height=80&width=96" },
        { id: "headphones", name: "Headphones", image: "/placeholder.svg?height=80&width=96" },
        { id: "speakers", name: "Speakers", image: "/placeholder.svg?height=80&width=96" },
        { id: "watches", name: "Watches", image: "/placeholder.svg?height=80&width=96" },
      ],
    },
    {
      id: "unisex",
      name: "Unisex",
      subcategories: [
        { id: "tshirts", name: "T shirts", image: "/placeholder.svg?height=80&width=96" },
        { id: "hoodies", name: "Hoodies", image: "/placeholder.svg?height=80&width=96" },
        { id: "caps", name: "Caps", image: "/placeholder.svg?height=80&width=96" },
        { id: "bags", name: "Bags", image: "/placeholder.svg?height=80&width=96" },
        { id: "shoes", name: "Shoes", image: "/placeholder.svg?height=80&width=96" },
        { id: "accessories", name: "Accessories", image: "/placeholder.svg?height=80&width=96" },
      ],
    },
  ]
  

  export async function getCategories(): Promise<Category[]> {
 
    return categories
  }
  

  export async function getCategory(categoryId: string): Promise<Category | undefined> {

    return categories.find((category) => category.id === categoryId)
  }
  
  export async function getCategoryProducts(categoryId: string): Promise<Product[]> {

    return Array(8)
      .fill(null)
      .map((_, i) => ({
        id: `product-${i}`,
        name: `${categoryId.charAt(0).toUpperCase() + categoryId.slice(1).replace(/-/g, " ")} Product ${i + 1}`,
        price: 34500 + i * 1000,
        currentPrice: 34500 + i * 1000,
        originalPrice: 110200,
        image: "https://utfs.io/f/wLDjZbdcJHpRYvzkoJDnqwxQN14hETb5kDvde3zrKMJZfRX0",
        colors: ["#242B33", "#FF564F", "#FFB672", "#CECECE"],
        rating: Math.floor(Math.random() * 5) + 1,
        category: categoryId,
      }))
  }
  
  export async function getSubcategoryProducts(
    categoryId: string,
    subcategoryId: string,
  ): Promise<{
    products: Product[]
    categoryName: string
    subcategoryName: string
  }> {

    const category = await getCategory(categoryId)
    const subcategory = category?.subcategories.find((sub) => sub.id === subcategoryId)

    const products = Array(8)
      .fill(null)
      .map((_, i) => ({
        id: `product-${i}`,
        name: `${subcategoryId.charAt(0).toUpperCase() + subcategoryId.slice(1).replace(/-/g, " ")} ${i + 1}`,
        price: 34500 + i * 1000,
        currentPrice: 34500 + i * 1000,
        originalPrice: 110200,
        image: "https://utfs.io/f/wLDjZbdcJHpRYvzkoJDnqwxQN14hETb5kDvde3zrKMJZfRX0",
        colors: ["#242B33", "#FF564F", "#FFB672", "#CECECE"],
        rating: Math.floor(Math.random() * 5) + 1,
        category: categoryId,
      }))
  
    return {
      products,
      categoryName: category?.name || categoryId,
      subcategoryName: subcategory?.name || subcategoryId,
    }
  }
  
  