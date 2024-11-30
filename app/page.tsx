import { productData } from "@/dummyData";
import ProductCard from "./components/product-card";

export default function Home() {
  return (
    <main className="grid gap-4 p-4 grid-cols-3">
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
