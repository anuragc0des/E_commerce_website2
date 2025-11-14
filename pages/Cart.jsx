import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";

export default function Cart() {
  const { cart, updateQty, removeFromCart } = useContext(CartContext);

  const total = cart.reduce((t, p) => t + p.price * p.qty, 0);

  return (
    <div>
      <h1>Your Cart</h1>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="cart-list">
          {cart.map((item) => (
            <div className="cart-item" key={item.id}>
              <img src={item.image} alt={item.name || item.title} style={{ width: 84, height: 84, objectFit: "cover", borderRadius: 8 }} />
              <div style={{ flex: 1 }}>
                <h3 style={{ margin: 0 }}>{item.name || item.title}</h3>
                <p className="text-muted" style={{ margin: "6px 0" }}>₹{item.price}</p>

                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  <button className="btn secondary" onClick={() => updateQty(item.id, Math.max(1, item.qty - 1))}>-</button>
                  <input type="number" min="1" value={item.qty} onChange={(e) => updateQty(item.id, Number(e.target.value) || 1)} style={{ width: 64, textAlign: "center", padding: "6px", borderRadius: 8, background: "transparent", border: "1px solid rgba(255,255,255,0.06)", color: "inherit" }} />
                  <button className="btn secondary" onClick={() => updateQty(item.id, item.qty + 1)}>+</button>
                  <button className="btn" onClick={() => removeFromCart(item.id)} style={{ marginLeft: "auto" }}>Remove</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <h2 style={{ marginTop: 20 }}>Total: ₹{total}</h2>
      <Link to="/checkout" className="btn" style={{ display: "inline-block", marginTop: 12 }}>Proceed to Checkout</Link>
    </div>
  );
}
