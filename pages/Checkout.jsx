import { useState, useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const { cart, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    address: "",
    phone: "",
    payment: "COD"
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.address || !form.phone) {
      alert("Please fill all fields");
      return;
    }

    if (cart.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    const orderData = {
      id: `ORD-${Date.now()}`,
      cart,
      form,
      total: cart.reduce((t, p) => t + p.price * p.qty, 0),
    };

    clearCart();
    navigate("/order-confirmation", { state: orderData });
  };

  return (
    <div className="product-hero">
      <main>
        <h1>Checkout</h1>

        <form className="checkout-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <label>Full name</label>
            <input
              placeholder="Full Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
          </div>

          <div className="form-row">
            <label>Address</label>
            <textarea
              placeholder="Shipping address"
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
              rows={3}
              required
            />
          </div>

          <div className="form-row">
            <label>Phone</label>
            <input
              placeholder="Phone Number"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              required
            />
          </div>

          <div className="form-row">
            <label>Payment</label>
            <select value={form.payment} onChange={(e) => setForm({ ...form, payment: e.target.value })}>
              <option>Cash On Delivery</option>
              <option>Card</option>
              <option>UPI</option>
            </select>
          </div>

          <button type="submit" className="btn" style={{ marginTop: 12 }}>
            Place Order
          </button>
        </form>
      </main>

      <aside>
        <h2>Order Summary</h2>
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div className="cart-list">
            {cart.map((item) => (
              <div className="cart-item" key={item.id}>
                <img src={item.image} alt={item.name || item.title} style={{ width: 72, height: 72, objectFit: "cover", borderRadius: 8 }} />
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <strong>{item.name || item.title}</strong>
                    <span style={{ marginLeft: "auto" }}>x{item.qty}</span>
                  </div>
                  <div className="text-muted">₹{item.price} each</div>
                </div>
              </div>
            ))}
          </div>
        )}

        <h3 style={{ marginTop: 12 }}>Total: ₹{cart.reduce((t, p) => t + p.price * p.qty, 0)}</h3>
      </aside>
    </div>
  );
}
