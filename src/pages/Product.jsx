// src/pages/Products.jsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/cartContext";
import { API_URL } from "../config";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [sort, setSort] = useState("");
  const [category, setCategory] = useState("all");
  const [categories, setCategories] = useState([]);

  const { addToCart } = useCart();

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${API_URL}/products`);
;
        const data = await res.json();
        setProducts(data);
        setFilteredProducts(data);

        const uniqueCategories = [
          "all",
          ...new Set(data.map((item) => item.category)),
        ];
        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filter + Sort
  useEffect(() => {
    let updated = [...products];

    if (category !== "all") {
      updated = updated.filter((p) => p.category === category);
    }

    if (sort === "low-high") {
      updated.sort((a, b) => a.price - b.price);
    } else if (sort === "high-low") {
      updated.sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(updated);
  }, [sort, category, products]);

  return (
    <div className="px-4 sm:px-6 py-10 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-10">
        🛍️ Explore Our Collection
      </h1>

      {/* Filters & Sorting (sticky for mobile) */}
      <div className="sticky top-0 bg-gray-50 z-10 py-3 mb-6 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 w-full sm:w-auto focus:ring-2 focus:ring-indigo-500"
          >
            {categories.map((cat, idx) => (
              <option key={idx} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </select>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 w-full sm:w-auto focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">Sort By</option>
            <option value="low-high">💲 Price: Low to High</option>
            <option value="high-low">💲 Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {loading
          ? Array.from({ length: 8 }).map((_, idx) => (
              <div
                key={idx}
                className="bg-white border border-gray-200 rounded-lg p-4 animate-pulse"
              >
                <div className="h-40 bg-gray-200 rounded-md mb-4 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-[shimmer_1.5s_infinite]" />
                </div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))
          : filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow hover:shadow-xl transition flex flex-col h-full hover:-translate-y-1 duration-200"
              >
                <div className="w-full h-52 bg-gray-50 flex items-center justify-center overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="h-full object-contain p-4 transition-transform duration-300 hover:scale-110"
                  />
                </div>

                <div className="p-4 flex flex-col flex-1">
                  <h3 className="text-lg font-semibold mb-2 line-clamp-2 min-h-[3.5rem]">
                    {product.title}
                  </h3>
                  <p className="text-indigo-600 font-bold text-lg mb-4">
                    ${product.price}
                  </p>

                  {/* Buttons pinned to bottom */}
                  <div className="mt-auto flex gap-2">
                    <Link
                      to={`/product/${product.id}`}
                      className="flex-1 text-center bg-gray-100 text-gray-800 py-2 rounded-lg font-semibold hover:bg-gray-200 transition"
                    >
                      View
                    </Link>
                    <button
                      onClick={() => addToCart(product)}
                      className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-2 rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700 transition"
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
            ))}
      </div>

      {/* Recommended Section */}
      {!loading && filteredProducts.length > 0 && (
        <section className="mt-16">
          <h2 className="text-2xl font-bold mb-6">🔥 You may also like</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 overflow-x-auto sm:overflow-visible">
            {filteredProducts.slice(0, 6).map((item) => (
              <div
                key={item.id}
                className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow hover:shadow-lg transition flex flex-col h-full min-w-[160px]"
              >
                <div className="w-full h-40 bg-gray-50 flex items-center justify-center overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full object-contain p-4 hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-3 flex flex-col flex-1">
                  <h3 className="text-sm font-semibold line-clamp-2 min-h-[3rem]">
                    {item.title}
                  </h3>
                  <p className="text-indigo-600 font-bold mb-3">${item.price}</p>
                  <div className="mt-auto">
                    <Link
                      to={`/product/${item.id}`}
                      className="w-full block text-center bg-gray-100 text-gray-800 py-2 rounded-lg font-semibold hover:bg-gray-200 transition"
                    >
                      View
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
