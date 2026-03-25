import Hero from "../components/Hero";
import ProductGrid from "../components/ProductGrid";

export default function Home({ addToCart }) {
  return (
    <>
      <Hero />
      <ProductGrid addToCart={addToCart} />
    </>
  );
}
