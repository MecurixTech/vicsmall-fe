import CategoryCard from "./components/home/category-card";
import ProductCard from "./components/product-card/product-card";
import Banner from "./components/home/banner";

import { categories, products } from "./data/dummyData";
import Footer from "./components/footer";

export default function Home() {
  return (
    <main className="p-4">
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
    </main>
  );
}
