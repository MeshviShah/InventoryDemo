import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          spacing: {
            xs: '1rem',
            sm: '1.2rem',
            md: '1.8rem',
            lg: '2.2rem',
            xl: '2.8rem',
          },
          loader: 'dots',
        }}
      >
        <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/products" />} />
        {/* <Route path="/products" element={<ProductPage />} /> */}
      </Routes>
    </BrowserRouter>
    </MantineProvider>
    </>
  )
}

export default App
