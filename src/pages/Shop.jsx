import ProductGrid from "../components/ProductGrid";

export default function ShopPage({ addToCart }) {
  return (
    <section className="shop-page">
      <h2>Shop All Products</h2>
      <ProductGrid addToCart={addToCart} />
    </section>
  );
}
