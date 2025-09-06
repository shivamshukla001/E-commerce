import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Product";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Payment from "./pages/Payment";
import Success from "./pages/Success";
import Cancel from "./pages/Cancel";
import Register from "./pages/Register";
import Footer from "./pages/Footer";
import Navbar from "./components/Navbar";

import ProtectedRoute from "./routes/ProtectedRoute";
import PublicRoute from "./routes/PublicRoute";

function App() {
  return (
    <div className="bg-gray-50 text-gray-900 font-sans min-h-screen">
      <Routes>
        {/* Public Routes (No Navbar/Footer) */}
        <Route
          path="/"
          element={
            <Login/>
          }
        />
        <Route
          path="/register"
          element={
             <Register/>
          }
        />

        {/* Protected Routes (With Navbar/Footer) */}
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <>
                <Navbar />
                <Home />
                <Footer />
              </>
            </ProtectedRoute>
          }
        />

        <Route
          path="/products"
          element={
            <ProtectedRoute>
              <>
                <Navbar />
                <Products />
                <Footer />
              </>
            </ProtectedRoute>
          }
        />

        <Route
          path="/product/:id"
          element={
            <ProtectedRoute>
              <>
                <Navbar />
                <ProductDetail />
                <Footer />
              </>
            </ProtectedRoute>
          }
        />

        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <>
                <Navbar />
                <Cart />
                <Footer />
              </>
            </ProtectedRoute>
          }
        />

        <Route
          path="/payment"
          element={
            <ProtectedRoute>
              <>
                <Navbar />
                <Payment />
                <Footer />
              </>
            </ProtectedRoute>
          }
        />

        <Route
          path="/success"
          element={
            <ProtectedRoute>
              <>
                <Navbar />
                <Success />
                <Footer />
              </>
            </ProtectedRoute>
          }
        />

        <Route
          path="/cancel"
          element={
            <ProtectedRoute>
              <>
                <Navbar />
                <Cancel />
                <Footer />
              </>
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
