import React  from "react";

import { Route, Routes } from 'react-router'

import Login from './Modules/Auth/Login/Login'


function App() {
  

  return (
    <>
     <Routes>

      <Route path="/" element={<Login />} />
     </Routes>
    </>
  )
}

export default App
