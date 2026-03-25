import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Header() {
  const { cartCount } = useCart();

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">ReactShop</Link>
      </div>
      <nav className="nav">
        <Link to="/">Home</Link>
        <Link to="/shop">Shop</Link>
        <Link to="/cart">Cart ({cartCount})</Link>
      </nav>
    </header>
  );
}
