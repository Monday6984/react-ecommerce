import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useUser } from "../context/UserContext";

export default function Header() {
  const { cartCount } = useCart();
  const { user, logout } = useUser();

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">ReactShop</Link>
      </div>

      <nav className="nav">
        <Link to="/">Home</Link>
        <Link to="/cart">Cart</Link>

        {user ? (
          <>
            <span className="user-email">{user.email}</span>
            <button onClick={logout} className="logout-btn">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
          </>
        )}
      </nav>
    </header>
  );
}
