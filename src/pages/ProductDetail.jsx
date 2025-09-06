// src/pages/ProductDetails.jsx
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useCart } from "../context/cartContext";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await fetch(`https://fakestoreapi.com/products/${id}`);
        const data = await res.json();
        setProduct(data);

        // Fetch related products (random 4 excluding current)
        const allRes = await fetch("https://fakestoreapi.com/products");
        const allData = await allRes.json();
        const filtered = allData.filter((item) => item.id !== Number(id));
        const randomFour = filtered.sort(() => 0.5 - Math.random()).slice(0, 4);
        setRelatedProducts(randomFour);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <p className="text-gray-500">Loading product details...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <p className="text-red-500">Product not found.</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* Product Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
        {/* Image */}
        <div className="flex justify-center items-center bg-gray-50 rounded-lg p-6">
          <img
            src={product.image}
            alt={product.title}
            className="max-h-[400px] object-contain"
          />
        </div>

        {/* Info */}
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            {product.title}
          </h1>
          <p className="text-indigo-600 font-bold text-2xl mb-6">
            ${product.price}
          </p>
          <p className="text-gray-600 leading-relaxed mb-6">
            {product.description}
          </p>
          <p className="text-sm text-gray-500 mb-8">
            Category:{" "}
            <span className="font-medium text-gray-700">{product.category}</span>
          </p>

          <div className="flex gap-4 mt-auto">
            <button
              onClick={() => addToCart(product)}
              className="bg-indigo-800 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
            >
              Add to Cart
            </button>
            <Link
              to="/products"
              className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold mb-6">🔥 You may also like</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {relatedProducts.map((item) => (
              <div
                key={item.id}
                className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow hover:shadow-lg transition"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-40 object-contain p-4 bg-gray-50"
                />
                <div className="p-3 flex flex-col">
                  <h3 className="text-sm font-semibold line-clamp-2 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-indigo-600 font-bold mb-3">
                    ${item.price}
                  </p>
                  <Link
                    to={`/product/${item.id}`}
                    className="bg-indigo-800 text-white text-sm text-center py-2 rounded-lg font-semibold hover:bg-indigo-700 transition mt-auto"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
