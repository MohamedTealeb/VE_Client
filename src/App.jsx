import React from "react";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import Home from "./Modules/Home/Home";
import Product from "./Modules/Product/Product";
import Login from "./Modules/Auth/Login/Login";
import SignUp from "./Modules/Auth/Signup/SignUp";
import ForgotPassword from "./Modules/Auth/ForgotPassword/ForgotPassword";
import Cart from "./Modules/Cart/Cart";
import Category from "./Modules/Category/Category";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";
import { Toaster } from "react-hot-toast";

function App() {
  const location = useLocation();
  const isAuthPage = location.pathname === "/login" || location.pathname === "/signup" || location.pathname === "/forgot-password";

  return (
    <>
      <Toaster />
      <div>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          {/* Protected Routes */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/product"
            element={
              <ProtectedRoute>
                <Product />
              </ProtectedRoute>
            }
          />
          <Route
            path="/category"
            element={
              <ProtectedRoute>
                <Category />
              </ProtectedRoute>
            }
          />
          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            }
          />

          {/* Redirect any unknown routes to login */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
