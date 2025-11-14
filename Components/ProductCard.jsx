import { Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

export default function ProductCard({ product }) {
  const { addToCart } = useContext(CartContext);

  return (
    <div className="card fade-in">
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p className="text-muted">{product.description}</p>
      <div
        style={{
          display: "flex",
          gap: 10,
          alignItems: "center",
          marginTop: 12,
        }}
      >
        <div className="price">₹{product.price}</div>
        <div style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
          <button className="btn" onClick={() => addToCart(product)}>
            Add
          </button>
          <Link className="btn secondary" to={`/products/${product.id}`}>
            Details
          </Link>
        </div>
      </div>
    </div>
  );
}
