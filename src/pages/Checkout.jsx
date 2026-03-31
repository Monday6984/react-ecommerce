import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useUser } from "../context/UserContext";

export default function CheckoutPage() {
  const { cart, clearCart } = useCart();
  const { user } = useUser();

  const [form, setForm] = useState({
    fullName: "",
    address: "",
    city: "",
    country: "",
    postalCode: "",
  });

  const [errors, setErrors] = useState({});

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function validate() {
    const newErrors = {};
    if (!form.fullName) newErrors.fullName = "Full name is required";
    if (!form.address) newErrors.address = "Address is required";
    if (!form.city) newErrors.city = "City is required";
    if (!form.country) newErrors.country = "Country is required";
    if (!form.postalCode) newErrors.postalCode = "Postal code is required";
    return newErrors;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const validation = validate();
    setErrors(validation);

    if (Object.keys(validation).length === 0) {
      const order = {
        user: user.email,
        items: cart,
        shipping: form,
        total: cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
        createdAt: new Date().toISOString(),
      };

      console.log("Order ready to send:", order);

      clearCart();
      alert("Order placed successfully!");
    }
  }

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <section className="checkout-page">
      <h2>Checkout</h2>

      <div className="checkout-container">
        <form onSubmit={handleSubmit} className="checkout-form">
          <h3>Shipping Information</h3>

          <input
            name="fullName"
            placeholder="Full Name"
            value={form.fullName}
            onChange={handleChange}
          />
          {errors.fullName && <p className="error">{errors.fullName}</p>}

          <input
            name="address"
            placeholder="Address"
            value={form.address}
            onChange={handleChange}
          />
          {errors.address && <p className="error">{errors.address}</p>}

          <input
            name="city"
            placeholder="City"
            value={form.city}
            onChange={handleChange}
          />
          {errors.city && <p className="error">{errors.city}</p>}

          <input
            name="country"
            placeholder="Country"
            value={form.country}
            onChange={handleChange}
          />
          {errors.country && <p className="error">{errors.country}</p>}

          <input
            name="postalCode"
            placeholder="Postal Code"
            value={form.postalCode}
            onChange={handleChange}
          />
          {errors.postalCode && <p className="error">{errors.postalCode}</p>}

          <button className="primary-btn">Place Order</button>
        </form>

        <div className="order-summary">
          <h3>Order Summary</h3>

          {cart.map((item) => (
            <div key={item.id} className="summary-item">
              <span>
                {item.title} × {item.quantity}
              </span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}

          <hr />

          <h3>Total: ${total.toFixed(2)}</h3>
        </div>
      </div>
    </section>
  );
}
