import { productData } from "@/dummyData";
import ProductCard from "./components/product-card";

export default function Home() {
  return (
    <main className="grid grid-cols-3 gap-4 p-4">
      <ProductCard {...productData} />
      <ProductCard {...productData} />
      <ProductCard {...productData} />
      <ProductCard {...productData} />
      <ProductCard {...productData} />
      <ProductCard {...productData} />
      <ProductCard {...productData} />
      <ProductCard {...productData} />
      <ProductCard {...productData} />
    </main>
  );
}
