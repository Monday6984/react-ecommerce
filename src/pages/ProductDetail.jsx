import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";

export default function ProductDetail() {
  const { id } = useParams();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadProduct() {
      try {
        const res = await fetch(`https://fakestoreapi.com/products/${id}`);
        if (!res.ok) throw new Error("Failed to fetch product");
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadProduct();
  }, [id]);

  if (loading) return <p>Loading product…</p>;
  if (error) return <p>Error: {error}</p>;
  if (!product) return <p>Product not found.</p>;

  return (
    <section className="product-detail">
      <img src={product.image} alt={product.title} className="detail-img" />

      <div className="detail-info">
        <h2>{product.title}</h2>
        <p className="price">${product.price.toFixed(2)}</p>
        <p className="description">{product.description}</p>

        <button className="primary-btn" onClick={() => addToCart(product)}>
          Add to Cart
        </button>
      </div>
    </section>
  );
}
