import "./App.css";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CartPage from "./pages/CartPage";
import ProductDetail from "./pages/ProductDetail";
import Shop from "./pages/Shop";
import Header from "./components/Header";

function App() {
  // const [cart, setCart] = useState([]);

  // function addToCart(product) {
  //   setCart((prev) => {
  //     const existing = prev.find((item) => item.id === product.id);
  //     if (existing) {
  //       return prev.map((item) =>
  //         item.id === product.id
  //           ? { ...item, quantity: item.quantity + 1 }
  //           : item,
  //       );
  //     }
  //     return [...prev, { ...product, quantity: 1 }];
  //   });
  // }

  // function updateQuantity(id, newQty) {
  //   setCart((prev) =>
  //     prev
  //       .map((item) =>
  //         item.id === id ? { ...item, quantity: Math.max(newQty, 1) } : item,
  //       )
  //       .filter((item) => item.quantity > 0),
  //   );
  // }

  // function removeItem(id) {
  //   setCart((prev) => prev.filter((item) => item.id !== id));
  // }

  return (
    <div className="app">
      <Header />

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/product/:id" element={<ProductDetail />} />
        </Routes>
      </main>

      <footer className="footer">
        <p>© {new Date().getFullYear()} ReactShop. Built for learning.</p>
      </footer>
    </div>
  );
}

export default App;
