import { useParams } from "react-router-dom";
import { products } from "../data/products";
import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";

export default function ProductDetails() {
  const { productId } = useParams();
  const { addToCart } = useContext(CartContext);
  const [qty, setQty] = useState(1);

  const product = products.find((p) => p.id === Number(productId));

  if (!product) return <h2>Product not found.</h2>;

  const title = product.name || product.title || "Untitled Product";

  const handleAdd = () => {
    // call addToCart `qty` times to add desired quantity
    for (let i = 0; i < Math.max(1, qty); i++) {
      addToCart(product);
    }
  };

  return (
    <div className="product-hero">
      <div>
        <a href={product.image} target="_blank" rel="noopener noreferrer">
          <div className="img-wrap">
            <img
              src={product.image}
              alt={title}
              className="product-hero-img"
              loading="lazy"
            />
          </div>
        </a>
      </div>
      <aside>
        <h2>{title}</h2>
        <p className="text-muted">{product.description}</p>
        <h3>₹{product.price}</h3>

        <div
          style={{
            display: "flex",
            gap: 12,
            alignItems: "center",
            marginTop: 12,
          }}
        >
          <div className="qty">
            <button
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              className="btn secondary"
            >
              -
            </button>
            <input
              type="number"
              min="1"
              value={qty}
              onChange={(e) => setQty(Number(e.target.value) || 1)}
              style={{
                width: 60,
                textAlign: "center",
                padding: "8px",
                borderRadius: 8,
                background: "transparent",
                border: "1px solid rgba(255,255,255,0.06)",
                color: "inherit",
              }}
            />
            <button
              onClick={() => setQty((q) => q + 1)}
              className="btn secondary"
            >
              +
            </button>
          </div>

          <button className="btn" onClick={handleAdd}>
            Add to Cart
          </button>
        </div>
      </aside>
    </div>
  );
}
