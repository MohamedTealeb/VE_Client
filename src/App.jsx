import React  from "react";

import { Route, Routes } from 'react-router'

import Login from './Modules/Auth/Login/Login'
import Home from "./Modules/Home/Home";


function App() {
  

  return (
    <>
     <Routes>

      <Route path="/" element={<Login />} />
      <Route path="home" element={<Home />} />
     </Routes>
    </>
  )
}

export default App
