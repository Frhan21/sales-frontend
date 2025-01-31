import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Sidebar from "./components/sidebar";
import Home from "./pages/home";
import Penjualan from "./pages/penjualan";
import Omset from "./pages/omset";
import Payment from "./pages/payment";
import React from "react";

const App: React.FC = () => {
  return (
    <Router>
      <div className="flex">
        <Sidebar />
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/penjualan" element={<Penjualan />} />
            <Route path="/omset" element={<Omset />} />
            <Route path="/payment" element={<Payment />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;