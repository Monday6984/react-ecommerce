// import { useEffect, useState } from "react";
// import ProductCard from "./ProductCard";
// import SearchBar from "./SearchBar";

// export default function ProductGrid(addToCart) {
//   const [products, setProducts] = useState([]);
//   const [query, setQuery] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   {
//     /* New state for categories */
//   }
//   const [categories, setCategories] = useState([]);
//   const [category, setCategory] = useState("");

//   {
//     /* Pagination state */
//   }

//   const [currentPage, setCurrentPage] = useState(1);
//   const productsPerPage = 8;

//   // Filter first
//   const filteredProducts = products
//     .filter((product) =>
//       product.title.toLowerCase().includes(query.toLowerCase()),
//     )
//     .filter((product) => (category ? product.category === category : true));

//   // Then paginate
//   const indexOfLast = currentPage * productsPerPage;
//   const indexOfFirst = indexOfLast - productsPerPage;

//   const currentProducts = filteredProducts.slice(indexOfFirst, indexOfLast);

//   // Reset page when filters change
//   useEffect(() => {
//     setCurrentPage(1);
//   }, [query, category]);

//   useEffect(() => {
//     async function loadProducts() {
//       try {
//         const res = await fetch("https://fakestoreapi.com/products");
//         if (!res.ok) throw new Error("Failed to fetch products");
//         const data = await res.json();
//         setProducts(data);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     }

//     loadProducts();
//   }, []);

//   useEffect(() => {
//     async function loadCategories() {
//       try {
//         const res = await fetch("https://fakestoreapi.com/products/categories");
//         const data = await res.json();
//         setCategories(data);
//       } catch (err) {
//         console.error("Failed to fetch categories", err);
//       }
//     }

//     loadCategories();
//   }, []);

//   if (loading) return <p>Loading products…</p>;
//   if (error) return <p>Error: {error}</p>;

//   return (
//     <section className="products">
//       <h2>Featured Products</h2>
//       <div className="filters">
//         <div className="search-bar">
//           <SearchBar query={query} setQuery={setQuery} />
//         </div>
//         {/* Category filter */}
//         <select
//           className="category-select"
//           value={category}
//           onChange={(e) => setCategory(e.target.value)}
//         >
//           <option value="">All Categories</option>
//           {categories.map((cat) => (
//             <option key={cat} value={cat}>
//               {cat.toUpperCase()}
//             </option>
//           ))}
//         </select>
//       </div>
//       <div className="product-grid">
//         {filteredProducts.length > 0 ? (
//           currentProducts.map((product) => (
//             <ProductCard
//               key={product.id}
//               product={product}
//               addToCart={addToCart}
//             />
//           ))
//         ) : (
//           <p>No products match your search.</p>
//         )}
//       </div>

//       <div className="pagination">
//         <button
//           disabled={currentPage === 1}
//           onClick={() => setCurrentPage((prev) => prev - 1)}
//         >
//           Prev
//         </button>

//         <span>Page {currentPage}</span>

//         <button
//           disabled={indexOfLast >= filteredProducts.length}
//           onClick={() => setCurrentPage((prev) => prev + 1)}
//         >
//           Next
//         </button>
//       </div>
//     </section>
//   );
// }
import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import SearchBar from "./SearchBar";

export default function ProductGrid({ addToCart }) {
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Category state
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");

  // Sorting state
  const [sortOption, setSortOption] = useState("");

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  // ✅ STEP 1: FILTER
  let filteredProducts = products
    .filter((product) =>
      product.title.toLowerCase().includes(query.toLowerCase()),
    )
    .filter((product) => (category ? product.category === category : true));

  // ✅ STEP 2: SORT
  let sortedProducts = [...filteredProducts];

  if (sortOption === "price-asc") {
    sortedProducts.sort((a, b) => a.price - b.price);
  }

  if (sortOption === "price-desc") {
    sortedProducts.sort((a, b) => b.price - a.price);
  }

  if (sortOption === "alpha-asc") {
    sortedProducts.sort((a, b) => a.title.localeCompare(b.title));
  }

  if (sortOption === "alpha-desc") {
    sortedProducts.sort((a, b) => b.title.localeCompare(a.title));
  }

  // ✅ STEP 3: PAGINATE
  const indexOfLast = currentPage * productsPerPage;
  const indexOfFirst = indexOfLast - productsPerPage;

  const currentProducts = sortedProducts.slice(indexOfFirst, indexOfLast);

  // Reset page when filters/sort change
  useEffect(() => {
    setCurrentPage(1);
  }, [query, category, sortOption]);

  // Fetch products
  useEffect(() => {
    async function loadProducts() {
      try {
        const res = await fetch("https://api.escuelajs.co/api/v1/products");
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

  // Fetch categories
  useEffect(() => {
    async function loadCategories() {
      try {
        const res = await fetch("https://api.escuelajs.co/api/v1/categories");
        const data = await res.json();
        setCategories(data);
      } catch (err) {
        console.error("Failed to fetch categories", err);
      }
    }

    loadCategories();
  }, []);

  if (loading) return <p>Loading products…</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <section className="products">
      <h2>Featured Products</h2>

      {/* FILTERS */}
      <div className="filters">
        <div className="search-bar">
          <SearchBar query={query} setQuery={setQuery} />
        </div>

        {/* Category */}
        <select
          className="category-select"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat.slug} value={cat.name}>
              {cat.name.toUpperCase()}
            </option>
          ))}
        </select>

        {/* Sorting */}
        <select
          className="sort-select"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="">Sort by…</option>
          <option value="price-asc">Price: Low → High</option>
          <option value="price-desc">Price: High → Low</option>
          <option value="alpha-asc">Name: A → Z</option>
          <option value="alpha-desc">Name: Z → A</option>
        </select>
      </div>

      {/* PRODUCTS */}
      <div className="product-grid">
        {sortedProducts.length > 0 ? (
          currentProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              addToCart={addToCart}
            />
          ))
        ) : (
          <p>No products match your search.</p>
        )}
      </div>

      {/* PAGINATION */}
      <div className="pagination">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
        >
          Prev
        </button>

        <span>Page {currentPage}</span>

        <button
          disabled={indexOfLast >= sortedProducts.length}
          onClick={() => setCurrentPage((prev) => prev + 1)}
        >
          Next
        </button>
      </div>
    </section>
  );
}
