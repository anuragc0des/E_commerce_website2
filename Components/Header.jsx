import { Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import logo from "../assets/logo.jpg";

export default function Header() {
  const { cart } = useContext(CartContext);
  const count = cart.reduce((sum, item) => sum + item.qty, 0);

  return (
    <header className="header">
      <nav>
        <Link to="/" className="logo-link">
          <img src={logo} alt="logo" className="site-logo" />
        </Link>
        <Link to="/">Home</Link>
  <Link to="/products">Products</Link>
        <Link to="/cart">Cart ({count})</Link>
      </nav>
    </header>
  );
}
