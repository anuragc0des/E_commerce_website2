import { useLocation, Link } from "react-router-dom";

export default function OrderConfirmation() {
  const { state } = useLocation();

  if (!state) return (
    <div>
      <h2>No order found</h2>
      <Link to="/">Back to home</Link>
    </div>
  );

  return (
    <div style={{ maxWidth: 900 }}>
      <h1>Order Confirmed ✔</h1>
      <h3>Thank you, {state.form.name}</h3>

      <p className="text-muted">Order ID: <strong>{state.id}</strong></p>

      <div style={{ display: "flex", gap: 18, marginTop: 8 }}>
        <div style={{ flex: 1 }}>
          <h4>Shipping Address</h4>
          <p>{state.form.address}</p>
          <p className="text-muted">Phone: {state.form.phone}</p>
          <p className="text-muted">Payment: {state.form.payment}</p>
        </div>

        <aside style={{ width: 320 }}>
          <h4>Order Summary</h4>
          <div className="cart-list">
            {state.cart.map((item) => (
              <div className="cart-item" key={item.id}>
                <img src={item.image} alt={item.name || item.title} style={{ width: 64, height: 64, objectFit: "cover", borderRadius: 8 }} />
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

          <h3 style={{ marginTop: 12 }}>Total: ₹{state.total}</h3>
        </aside>
      </div>

      <div style={{ marginTop: 18 }}>
        <Link to="/" className="btn">Continue Shopping</Link>
      </div>
    </div>
  );
}
