import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  //const { name, price, image } = product;
  const { addToCart } = useCart();

  return (
    <Link to={`/product/${product.id}`} className="product-link">
      <div className="product-card">
        <img
          src={product.images[0]}
          alt={product.title}
          className="product-img"
        />
        <h3>{product.title}</h3>
        <p>${product.price.toFixed(2)}</p>
        <button className="primary-btn" onClick={() => addToCart(product)}>
          Add to Cart
        </button>
      </div>
    </Link>
  );
}
