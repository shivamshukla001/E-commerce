// src/components/Footer.jsx
import { Link } from "react-router-dom";
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaCcVisa,
  FaCcMastercard,
  FaCcPaypal,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-200">
      {/* Top */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-bold text-white mb-3">ShopSmart</h2>
            <p className="text-gray-400 text-sm leading-relaxed max-w-md mx-auto md:mx-0">
              Your trusted online marketplace for electronics, fashion, and more.
              Shop smart, shop easy.
            </p>
          </div>

          {/* Quick Links */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm flex flex-col items-center md:items-start">
              <li>
                <Link to="/" className="hover:text-indigo-400 transition py-1">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-indigo-400 transition py-1">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/cart" className="hover:text-indigo-400 transition py-1">
                  Cart
                </Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-indigo-400 transition py-1">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/register" className="hover:text-indigo-400 transition py-1">
                  Register
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Support */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold text-white mb-4">Customer Support</h3>
            <ul className="space-y-2 text-sm flex flex-col items-center md:items-start">
              <li>
                <Link to="/help" className="hover:text-indigo-400 transition py-1">
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-indigo-400 transition py-1">
                  FAQs
                </Link>
              </li>
              <li>
                <Link to="/returns" className="hover:text-indigo-400 transition py-1">
                  Returns & Refunds
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="hover:text-indigo-400 transition py-1">
                  Shipping Info
                </Link>
              </li>
            </ul>
          </div>

          {/* Social & Payments */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold text-white mb-4">Connect With Us</h3>
            <div className="flex justify-center md:justify-start gap-4 mb-6 flex-wrap">
              <a href="#" className="hover:text-indigo-400 transition" aria-label="Facebook">
                <FaFacebook size={22} />
              </a>
              <a href="#" className="hover:text-indigo-400 transition" aria-label="Instagram">
                <FaInstagram size={22} />
              </a>
              <a href="#" className="hover:text-indigo-400 transition" aria-label="Twitter">
                <FaTwitter size={22} />
              </a>
            </div>

            <h3 className="text-lg font-semibold text-white mb-4">We Accept</h3>
            <div className="flex justify-center md:justify-start gap-4 text-gray-400 flex-wrap">
              <FaCcVisa size={34} />
              <FaCcMastercard size={34} />
              <FaCcPaypal size={34} />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-gray-500 text-xs sm:text-sm">
            © {new Date().getFullYear()} ShopSmart. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
