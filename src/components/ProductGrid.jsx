// import ProductCard from "./ProductCard";
// import { products } from "../data/products";

// export default function ProductGrid({ addToCart }) {
//   return (
//     <section className="products">
//       <h2>Featured Products</h2>
//       <div className="product-grid">
//         {products.map((product) => (
//           <ProductCard
//             key={product.id}
//             product={product}
//             addToCart={addToCart}
//           />
//         ))}
//       </div>
//     </section>
//   );
// }

import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import SearchBar from "./SearchBar";

export default function ProductGrid() {
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(query.toLowerCase()),
  );

  useEffect(() => {
    async function loadProducts() {
      try {
        const res = await fetch("https://fakestoreapi.com/products");
        if (!res.ok) throw new Error("Failed to fetch products");
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  if (loading) return <p>Loading products…</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <section className="products">
      <h2>Featured Products</h2>
      <SearchBar query={query} setQuery={setQuery} />
      <div className="product-grid">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p>No products match your search.</p>
        )}
      </div>
    </section>
  );
}
