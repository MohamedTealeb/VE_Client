import React  from "react";

import { Route, Routes } from 'react-router'

import Login from './Modules/Auth/Login/Login'
import Home from "./Modules/Home/Home";
import SignUp from "./Modules/Auth/Signup/SignUp";
import Product from "./Modules/Product/Product";


function App() {
  

  return (
    <>
     <Routes>

      <Route path="/" element={<Login />} />
      <Route path="login" element={<Login />} />
      <Route path="home" element={<Home />} />
      <Route path="signup" element={<SignUp />} />
      <Route path="product" element={<Product />} />
     </Routes>
    </>
  )
}

export default App
