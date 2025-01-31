import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-64 bg-gray-800 text-white h-screen p-6">
      <div className="text-2xl font-bold mb-8">MyDashboard</div>
      <ul className="space-y-4">
        <li>
          <Link to="/" className="hover:text-gray-400">
            Home
          </Link>
        </li>
        <li>
          <Link to="/penjualan" className="hover:text-gray-400">
            Penjualan
          </Link>
        </li>
        <li>
          <Link to="/omset" className="hover:text-gray-400">
            Omzet
          </Link>
        </li>
        <li>
          <Link to="/payment" className="hover:text-gray-400">
            Payment
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
