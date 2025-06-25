import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import ProductList from './pages/productList';
import AddProduct from './pages/addProduct';
import NavbarLayout from './component/navbar';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
        <BrowserRouter>
      <Routes>
         <Route path="/" element={<NavbarLayout />}>
        <Route path="/" element={<Navigate to="/products" />} />
        <Route path="/products" element={<ProductList />} />
         <Route path="/product/add" element={<AddProduct />} />
         </Route>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
