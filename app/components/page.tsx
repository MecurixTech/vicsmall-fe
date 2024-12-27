import { products, categories, cartItems } from "../data/dummyData";
import CartItem from "./cart-to-checkout/cart-item";
import Footer from "./footer";
import Banner from "./home/banner";
import CategoryCard from "./home/category-card";
import CountdownTimer from "./home/countdown-timer";
import ProductCard from "./product-card/product-card";
import InfoTabs from "./product-page/info-tabs-container";
import ProductSettings from "./product-page/product-settings";

const ComponentsPage = () => {
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

      {cartItems.map((item) => (
        <CartItem key={item.id} cartItemData={item} />
      ))}

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
