// src/pages/Login.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../service/auth.js";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const res = await loginUser({ email, password });

    if (res.token) {
      // Save token and user info
      localStorage.setItem("token", res.token);
      localStorage.setItem("user", JSON.stringify(res.user));

      // Redirect to home
      navigate("/home");
    } else {
      setError(res.message || "Login failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="flex flex-col md:flex-row items-center bg-gray-50 shadow-lg rounded-xl overflow-hidden max-w-4xl w-full">
        
        {/* Left: Login Card */}
        <div className="w-full md:w-1/2 p-8 bg-white">
          <h2 className="text-2xl font-bold text-indigo-800 mb-6 text-center">
            Login to ShopSmart
          </h2>

          {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              required
            />
            <button
              type="submit"
              className="w-full bg-indigo-800 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition"
            >
              Login
            </button>
          </form>

          <p className="mt-6 text-center text-gray-600">
            Don’t have an account?{" "}
            <Link to="/register" className="text-indigo-600 hover:underline">
              Register
            </Link>
          </p>
        </div>

        {/* Right: Decorative Image */}
        <div className="hidden md:block md:w-1/2">
          <img
            src="https://plus.unsplash.com/premium_vector-1749476966910-2d4d591d8b51?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8aW1hZ2VzJTIwdG8lMjBhZGQlMjBpbiUyMGxvZ2luJTIwYW5kJTIwcmVnaXN0ZXIlMjBwYWdlfGVufDB8fDB8fHww"
            alt="Decorative"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}
