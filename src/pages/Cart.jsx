// src/pages/Cart.jsx
import { useCart } from "../context/cartContext";
import { Link, useNavigate } from "react-router-dom";
import { Trash2, Plus, Minus } from "lucide-react";

export default function Cart() {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const navigate = useNavigate();

  const total = cart
    .reduce((acc, item) => acc + item.price * item.quantity, 0)
    .toFixed(2);

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
        <img
          src="https://cdn-icons-png.flaticon.com/512/11329/11329060.png"
          alt="Empty cart"
          className="w-40 mb-6"
        />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Your Cart is Empty</h2>
        <p className="text-gray-600 mb-6">Add items to your cart to see them here.</p>
        <Link
          to="/products"
          className="px-6 py-3 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition"
        >
          Shop Now
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
      
      {/* Cart Items */}
      <div className="lg:col-span-2 space-y-4">
        {cart.map((item) => (
          <div
            key={item.id}
            className="flex items-center bg-white shadow-sm rounded-lg p-4 justify-between"
          >
            {/* Product Image */}
            <img
              src={item.image}
              alt={item.name}
              className="w-20 h-20 object-cover rounded"
            />

            {/* Product Info */}
            <div className="flex-1 px-4">
              <h3 className="font-semibold text-gray-800">{item.name}</h3>
              <p className="text-indigo-600 font-bold mt-1">${item.price}</p>
            </div>

            {/* Quantity Controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                disabled={item.quantity <= 1}
                className="p-1 rounded-full border border-gray-300 hover:bg-gray-100 disabled:opacity-40"
              >
                <Minus size={16} />
              </button>
              <span className="px-3 font-medium">{item.quantity}</span>
              <button
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                className="p-1 rounded-full border border-gray-300 hover:bg-gray-100"
              >
                <Plus size={16} />
              </button>
            </div>

            {/* Remove Button */}
            <button
              onClick={() => removeFromCart(item.id)}
              className="ml-4 text-red-500 hover:text-red-600"
            >
              <Trash2 size={20} />
            </button>
          </div>
        ))}
      </div>

      {/* Order Summary */}
      <div className="bg-white shadow-md rounded-lg p-6 h-fit">
        <h3 className="text-xl font-semibold mb-4 border-b pb-2">Order Summary</h3>
        <div className="flex justify-between mb-2">
          <span className="text-gray-600">Items:</span>
          <span className="font-medium">{cart.length}</span>
        </div>
        <div className="flex justify-between mb-6">
          <span className="text-gray-600">Total:</span>
          <span className="font-bold text-indigo-700">${total}</span>
        </div>
        <button
          onClick={() => navigate("/payment")}
          className="w-full py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition"
        >
          Checkout
        </button>
      </div>
    </div>
  );
}
