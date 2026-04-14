import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Produtos from "./pages/Produtos";
import Checkout from "./pages/Checkout";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-100">
      
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/produtos" element={<Produtos />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App;