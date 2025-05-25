import React from "react";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import Home from "./Modules/Home/Home";
import Product from "./Modules/Product/Product";
import Login from "./Modules/Auth/Login/Login";
import SignUp from "./Modules/Auth/Signup/SignUp";
import ForgotPassword from "./Modules/Auth/ForgotPassword/ForgotPassword";
import Cart from "./Modules/Cart/Cart";
import Category from "./Modules/Category/Category";
import ProtectedRoute from "./Component/Shared/ProtectedRoute";
import { Toaster } from "react-hot-toast";
import About from "./Modules/About/About";
import { AuthProvider } from "./Context/AuthContext";
import SalePage from "./Modules/Sale/Sale";

function App() {
  const location = useLocation();
  const isAuthPage = location.pathname === "/login" || location.pathname === "/signup" || location.pathname === "/forgot-password";

  return (
    <>
    <AuthProvider>

      <Toaster />
      <div>
        <Routes>
          {/* Auth Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/product" element={<Product />} />
          <Route path="/sale" element={<SalePage />} />
          <Route path="/about" element={<About />} />
        
          <Route path="/category" element={<Category />} />

          {/* Protected Cart Route */}
          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            }
          />

          {/* Redirect any unknown routes to home */}
          <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
      </div>
    </AuthProvider>
    </>
  );
}

export default App;
