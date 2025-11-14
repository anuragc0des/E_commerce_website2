import { useMemo, useState } from "react";
import { products } from "../data/products";
import ProductCard from "../Components/ProductCard";

export default function ProductListing() {
  const [category, setCategory] = useState("all");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(10000);
  const [priceRange, setPriceRange] = useState("all");

  // derive categories from data (fall back to 'other')
  const categories = useMemo(() => {
    const cats = new Set();
    products.forEach((p) => cats.add(p.category || "other"));
    return ["all", ...Array.from(cats)];
  }, []);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const cat = p.category || "other";
      if (category !== "all" && cat !== category) return false;
      const price = Number(p.price || 0);
      if (price < Number(minPrice)) return false;
      if (price > Number(maxPrice)) return false;
      return true;
    });
  }, [category, minPrice, maxPrice]);

  const resetFilters = () => {
    setCategory("all");
    setMinPrice(0);
    setMaxPrice(10000);
    setPriceRange("all");
  };

  return (
    <div className="container">
      <div className="list-header" style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 18 }}>
        <h1 style={{ margin: 0 }}>All Products</h1>

        <div style={{ marginLeft: "auto", display: "flex", gap: 8, alignItems: "center" }}>
          <label className="text-muted" style={{ marginRight: 6 }}>Category</label>
          <select className="select" value={category} onChange={(e) => setCategory(e.target.value)}>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>

          <label className="text-muted" style={{ marginLeft: 8, marginRight: 6 }}>Price</label>
          <select className="select" value={priceRange} onChange={(e) => {
            const v = e.target.value;
            setPriceRange(v);
            switch (v) {
              case "all":
                setMinPrice(0); setMaxPrice(10000); break;
              case "0-999":
                setMinPrice(0); setMaxPrice(999); break;
              case "1000-1999":
                setMinPrice(1000); setMaxPrice(1999); break;
              case "2000-2999":
                setMinPrice(2000); setMaxPrice(2999); break;
              case "3000+":
                setMinPrice(3000); setMaxPrice(10000); break;
              case "custom":
                setMinPrice(0); setMaxPrice(10000); break;
              default:
                setMinPrice(0); setMaxPrice(10000);
            }
          }}>
            <option value="all">All</option>
            <option value="0-999">Under ₹1,000</option>
            <option value="1000-1999">₹1,000 - ₹1,999</option>
            <option value="2000-2999">₹2,000 - ₹2,999</option>
            <option value="3000+">₹3,000+</option>
            <option value="custom">Custom</option>
          </select>

          {priceRange === "custom" ? (
            <>
              <input className="search" type="number" min={0} value={minPrice} onChange={(e) => setMinPrice(Number(e.target.value || 0))} placeholder="Min" />
              <input className="search" type="number" min={0} value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value || 10000))} placeholder="Max" />
            </>
          ) : null}

          <button className="btn secondary" onClick={resetFilters}>Reset</button>
        </div>
      </div>

      <p className="text-muted">Showing {filtered.length} of {products.length} products</p>

      <div className="grid">
        {filtered.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
