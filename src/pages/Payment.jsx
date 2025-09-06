// src/pages/Payment.jsx
import { useCart } from "../context/cartContext";
import { useState } from "react";
import axios from "axios";

export default function Payment() {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const [loading, setLoading] = useState(false);

  const totalAmount = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleCheckout = async () => {
    if (!cart || cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }
    setLoading(true);
    try {
      const cartItemsForStripe = cart.map((item) => ({
        id: item.id,
        name: item.name || item.title,
        price: item.price,
        quantity: item.quantity,
      }));

      const missingItem = cartItemsForStripe.find((item) => !item.name || item.price == null);
      if (missingItem) {
        alert(`Product missing required fields: name or price. Item: ${missingItem.id}`);
        setLoading(false);
        return;
      }

      const { data } = await axios.post(
        "http://localhost:5000/api/payment/create-checkout-session",
        { cartItems: cartItemsForStripe }
      );

      window.location.href = data.url;
    } catch (err) {
      console.error("Error creating checkout session:", err);
      alert("Failed to create checkout session. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-8">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
        {/* Cart Items */}
        <div className="flex-1 space-y-4">
          <h2 className="text-3xl font-bold text-indigo-800 mb-4">Your Cart</h2>
          {cart.length === 0 ? (
            <p className="text-gray-500 text-center py-20 bg-white rounded-xl shadow-lg">
              Your cart is empty
            </p>
          ) : (
            cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between bg-white p-4 rounded-xl shadow hover:shadow-md transition"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.name || item.title}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div>
                    <h3 className="font-semibold">{item.name || item.title}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, Math.max(item.quantity - 1, 1))
                        }
                        className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 transition"
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 transition"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className="font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 text-sm hover:underline"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Checkout Summary */}
        <div className="w-full lg:w-1/3 bg-white p-6 rounded-xl shadow-lg sticky top-8 h-fit flex flex-col gap-6">
          <h2 className="text-2xl font-bold text-indigo-800">Checkout</h2>
          <div className="flex justify-between text-gray-700">
            <span>Subtotal:</span>
            <span>${totalAmount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-gray-700">
            <span>Shipping:</span>
            <span>$5.00</span>
          </div>
          <div className="flex justify-between font-semibold text-lg border-t pt-4">
            <span>Total:</span>
            <span>${(totalAmount + 5).toFixed(2)}</span>
          </div>
          <button
            onClick={handleCheckout}
            disabled={loading || cart.length === 0}
            className={`w-full py-3 rounded-lg font-semibold transition text-white ${
              loading || cart.length === 0
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
            }`}
          >
            {loading ? "Processing..." : "Proceed to Payment"}
          </button>
        </div>
      </div>
    </div>
  );
}
