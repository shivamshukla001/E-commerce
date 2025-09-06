import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSearch } from "../context/SearchContext";

// 🌟 Expanded featured products
const featuredProducts = [
  
  {
    id: 201,
    title: "Smart Fitness Watch",
    price: 149.99,
    image:
      "https://images.unsplash.com/photo-1603791440384-56cd371ee9a7?w=600&auto=format&fit=crop&q=60",
  },
  {
    id: 202,
    title: "Portable Bluetooth Speaker",
    price: 89.99,
    image:
      "https://plus.unsplash.com/premium_photo-1677159499898-b061fb5bd2d7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cG9ydGFibGUlMjBidWxvb3RoJTIwc3BlYWtlcnxlbnwwfHwwfHx8MA%3D%3D"
  },
  {
    id: 203,
    title: "4K Action Camera",
    price: 299.99,
    image:
      "https://images.unsplash.com/photo-1619861200545-4552c8935115?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8YWN0aW9uJTIwY2FtZXJhfGVufDB8fDB8fHww",
  },
  {
    id: 204,
    title: "Wireless Gaming Mouse",
    price: 59.99,
    image:
      "https://images.unsplash.com/photo-1587202372775-98927e7f19b6?w=600&auto=format&fit=crop&q=60",
  },
  {
    id: 205,
    title: "Smart Home Voice Assistant",
    price: 129.99,
    image:
      "https://images.unsplash.com/photo-1589496930798-47e6a8f1a83c?w=600&auto=format&fit=crop&q=60",
  },
  {
    id: 206,
    title: "Noise Cancelling Earbuds",
    price: 179.99,
    image:
      "https://images.unsplash.com/photo-1733556046403-2d090cf359a3?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8bm9pY2UlMjBjYW5jZWxhdGlvbiUyMGVhcmJ1ZHN8ZW58MHx8MHx8fDA%3D",
  },
];

function ProductSection({ title, subtitle, products }) {
  const navigate = useNavigate();

  return (
    <section className="py-12 px-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-extrabold text-gray-800">{title}</h2>
        {subtitle && (
          <p className="text-gray-500 text-lg mt-2 font-medium">{subtitle}</p>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {products.map((product) => (
          <div
            key={product.id}
            onClick={() => navigate(`/product/${product.id}`)}
            className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow hover:shadow-lg transition flex flex-col cursor-pointer"
          >
            <div className="w-full h-56 bg-gray-100 flex items-center justify-center">
              <img
                src={product.image}
                alt={product.title}
                className="h-full max-h-56 object-contain p-4"
              />
            </div>

            <div className="p-4 flex flex-col flex-1">
              <h3 className="text-lg font-semibold mb-2 line-clamp-2 h-14">
                {product.title}
              </h3>
              <p className="text-indigo-600 font-bold text-lg mb-4">
                ${product.price}
              </p>
              <div className="mt-auto">
                <button className="group inline-flex items-center justify-center w-full bg-indigo-800 text-white py-2 px-2 rounded-lg font-semibold transition duration-300 ease-in-out hover:bg-indigo-700 hover:scale-[1.02]">
                  View Details
                  <svg
                    className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ⭐ Skeleton Loader
function SkeletonLoader() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto p-6">
      {Array.from({ length: 8 }).map((_, idx) => (
        <div
          key={idx}
          className="animate-pulse bg-white border border-gray-200 rounded-lg shadow p-4 flex flex-col"
        >
          <div className="w-full h-40 bg-gray-200 rounded-md"></div>
          <div className="mt-4 h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="mt-2 h-4 bg-gray-200 rounded w-1/2"></div>
          <div className="mt-auto h-10 bg-gray-300 rounded w-full"></div>
        </div>
      ))}
    </div>
  );
}

export default function Home() {
  const { searchTerm } = useSearch();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error fetching products:", err))
      .finally(() => setLoading(false));
  }, []);

  const filteredProducts = products.filter((p) =>
    (p.title || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gray-800 text-white py-20 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">
          "Smart Choices, Smart Living"
        </h1>
        <p className="text-lg md:text-xl mb-6 opacity-90 ">
         Save more, shop better, and join thousands of happy customers who trust ShopSmart. 🚀
        </p>
        <Link
          to="/products"
          className="bg-white mt-10 text-indigo-800 px-6 py-3  rounded-full font-semibold hover:bg-gray-100 transition"
        >
          Shop Now
        </Link>
      </section>

      {/* Product Sections */}
      {loading ? (
        <SkeletonLoader />
      ) : searchTerm ? (
        <ProductSection
          title={`Search Results for "${searchTerm}"`}
          products={filteredProducts}
        />
      ) : (
        <>
          <ProductSection
            title="🔥 Special Offers"
            subtitle="Grab your favorites with up to 50% OFF"
            products={products.slice(0, 4)}
          />
          <ProductSection
            title="⚡ Trending Jewelery"
            subtitle="Top picks from the Diamond world"
            products={products.slice(4, 8)}
          />
          <ProductSection
            title="✨ Navratri Collection"
            subtitle="Celebrate with the season's best deals"
            products={products.slice(8, 12)}
          />
          {/* <ProductSection
            
            title="🌟 Curated For You"
            subtitle="Handpicked premium products"
            products={featuredProducts}
          /> */}
        </>
      )}

      {/* Why Shop With Us */}
      <section className="relative py-20 px-6 bg-gradient-to-r from-indigo-50 via-white to-indigo-50">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-extrabold text-gray-800 mb-6">
            Why Shop With Us 💡
          </h2>
          <p className="text-gray-600 mb-12 text-lg">
            We don’t just sell products — we deliver happiness 💙
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              {
                title: "🚚 Fast Delivery",
                desc: "Get your products delivered in record time with our trusted partners.",
              },
              {
                title: "💳 Secure Payments",
                desc: "Your transactions are safe with bank-level encryption and security.",
              },
              {
                title: "⭐ Top Rated",
                desc: "We’re loved by thousands of happy customers worldwide.",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl hover:scale-[1.03] transition transform duration-300"
              >
                <h3 className="text-2xl font-bold text-indigo-700 mb-4">
                  {item.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials (Scrolling) */}
      <section className="bg-gradient-to-r from-indigo-50 via-white to-indigo-50 py-16 overflow-hidden relative">
        <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-10">
          What Our Customers Say ❤️
        </h2>

        {/* Marquee-style container */}
        <div className="relative w-full">
          <div className="flex animate-marquee space-x-6 w-max">
            {[
              {
                name: "Priya Sharma",
                feedback:
                  "Absolutely love the quality of products! Super fast delivery.",
              },
              {
                name: "Rahul Verma",
                feedback:
                  "Best shopping experience. Smooth checkout and amazing deals.",
              },
              {
                name: "Aditi Singh",
                feedback:
                  "Great customer support, very responsive and helpful!",
              },
              {
                name: "Karan Patel",
                feedback:
                  "I found everything I needed for Navratri in one place!",
              },
              {
                name: "Simran Kaur",
                feedback:
                  "The curated collection is amazing — feels so premium!",
              },
            ].map((review, idx) => (
              <div
                key={idx}
                className="bg-white text-gray-700 px-6 py-6 rounded-xl shadow-md w-80 flex-shrink-0"
              >
                <p className="italic mb-4">"{review.feedback}"</p>
                <h3 className="font-semibold text-indigo-700">
                  - {review.name}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

  {/* <div className="flex justify-center">
  <Link className="text-xl bg-blue-600 text-white px-4 py-4 font-bold rounded-2xl hover:bg-blue-700 transition" to={'/products'}>
    Shop Now
  </Link>
</div> */}

    </div>
  );
}
