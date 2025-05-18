import React  from "react";

import { Route, Routes } from 'react-router'

import Login from './Modules/Auth/Login/Login'
import Home from "./Modules/Home/Home";
import SignUp from "./Modules/Auth/Signup/SignUp";
import Product from "./Modules/Product/Product";
import Product_Det from "./Modules/Product/Product_Det";
import Cart from "./Modules/Cart/Cart";
import Sale from "./Modules/Sale/Sale";
import Offline from "./Modules/Offline/Offline";
import About from "./Modules/About/About";


function App() {
  

  return (
    <>
     <Routes>

      <Route path="/" element={<Login />} />
      <Route path="login" element={<Login />} />
      <Route path="home" element={<Home />} />
      <Route path="signup" element={<SignUp />} />
      <Route path="product" element={<Product />} />
      <Route path="product_det" element={<Product_Det />} />
      <Route path="cart" element={<Cart />}/>
      <Route path="sale" element={<Sale />}/>
      <Route path="about" element={<About />}/>
        <Route path="*" element={<Offline />} />
     </Routes>
    </>
  )
}

export default App
