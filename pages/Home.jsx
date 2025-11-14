import { products } from "../data/products";
import ProductCard from "../Components/ProductCard";

export default function Home() {
  return (
    <div className="container">
      {/* <a
        href="https://source.unsplash.com/1200x400/?shopping,ecommerce"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          src="https://source.unsplash.com/1200x400/?shopping,ecommerce"
          alt="Shop banner"
          className="hero"
        />
      </a> */}
      <h1>Featured Products</h1>
      <div className="grid">
        {products.slice(0, 8).map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
