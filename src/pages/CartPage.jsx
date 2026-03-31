import { useCart } from "../context/CartContext";

export default function CartPage() {
  const { cart, updateQuantity, removeItem, clearCart } = useCart();
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <section className="cart-page">
      <h2>Your Cart</h2>

      {cart.length === 0 && <p>Your cart is empty.</p>}

      {cart.map((item) => (
        <div key={item.id} className="cart-item">
          <img src={item.image} alt={item.title} className="cart-img" />

          <div className="cart-details">
            <h3>{item.title}</h3>
            <p>${item.price.toFixed(2)}</p>

            <div className="quantity-controls">
              <button
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
              >
                -
              </button>
              <span>{item.quantity}</span>
              <button
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
              >
                +
              </button>
            </div>

            <button className="remove-btn" onClick={() => removeItem(item.id)}>
              Remove
            </button>
            <button className="clear-btn" onClick={clearCart}>
              Clear Cart
            </button>
          </div>
        </div>
      ))}

      {cart.length > 0 && (
        <div className="cart-total">
          <h3>Total: ${total.toFixed(2)}</h3>
        </div>
      )}
    </section>
  );
}
