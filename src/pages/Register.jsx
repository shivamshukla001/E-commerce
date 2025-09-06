// src/pages/Register.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../service/auth";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const res = await registerUser({ name, email, password });

    if (res.message === "User created successfully") {
      navigate("/"); // Redirect to login
    } else {
      setError(res.message || "Registration failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="flex flex-col md:flex-row items-center bg-gray-50 shadow-lg rounded-xl overflow-hidden max-w-4xl w-full">
        
        {/* Left: Register Card */}
        <div className="w-full md:w-1/2 p-8 bg-white">
          <h2 className="text-2xl font-bold text-indigo-800 mb-6 text-center">
            Create an Account
          </h2>

          {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              required
            />
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
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              required
            />
            <button
              type="submit"
              className="w-full bg-indigo-800 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition"
            >
              Register
            </button>
          </form>

          <p className="mt-6 text-center text-gray-600">
            Already have an account?{" "}
            <Link to="/" className="text-indigo-600 hover:underline">
              Login
            </Link>
          </p>
        </div>

        {/* Right: Decorative Image */}
        <div className="hidden md:block md:w-1/2">
          <img
            src="https://plus.unsplash.com/premium_vector-1749476966808-e3d6e7010cee?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDExfHx8ZW58MHx8fHx8"
            alt="Decorative"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}
