
import React, { useEffect, useState } from "react";
import { getData } from "../libs/action";
import { Link } from "react-router-dom";

interface Penjualan {
  id: string;
  transaction_number: string;
  marketing_id: string;
  date: Date;
  cargo_fee: number;
  total_balance: number;
  grand_total: number;
}

interface Marketing {
  id: string;
  name: string;
}

const Penjualan = () => {
  const [penjualan, setPenjualan] = useState<Penjualan[]>([]);
  const [marketings, setMarketing] = useState<Marketing[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [payment, setPayment] = useState(false);

  const fetchMarkt = async () => {
    try {
      const data = await getData("marketing");
      setMarketing(data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchPenjualan = async () => {
    try {
      const data = await getData("penjualan");
      setPenjualan(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchMarkt();
    fetchPenjualan();
  }, []);

  const getMarketing = (marketingId: string) => {
    const marketing = marketings.find((m) => m.id === marketingId);
    return marketing ? marketing.name : "Unknown";
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = penjualan.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="flex flex-col gap-4 p-6">
      <h2 className="mb-4 text-2xl font-bold">Data Penjualan</h2>
      <div>
        <Link to="#" className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 ">
            Tambah Data Penjualan
        </Link>
      </div>
      <table className="min-w-full overflow-hidden bg-white border border-gray-200 rounded-lg">
        <thead className="text-white bg-blue-500">
          <tr>
            <th className="p-3">No</th>
            <th className="p-3">Transaction Number</th>
            <th className="p-3">Marketing Name</th>
            <th className="p-3">Cargo Fee</th>
            <th className="p-3">Total Balance</th>
            <th className="p-3">Grand Total</th>
          </tr>
        </thead>
        <tbody>
          {!currentItems ? (
            <tr>
              <td colSpan={6} className="text-center">
                Loading...
              </td>
            </tr>
          ) : currentItems.length === 0 ? (
            <tr>
              <td colSpan={6} className="mt-2 text-center">
                No data available
              </td>
            </tr>
          ) : (
            currentItems.map((item, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="p-3">{indexOfFirstItem + index + 1}</td>
                <td className="p-3">{item.transaction_number}</td>
                <td className="p-3">{getMarketing(item.marketing_id)}</td>
                <td className="p-3">
                  Rp{" "}
                  {item.cargo_fee.toLocaleString("id-ID", {
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                  })}
                </td>
                <td className="p-3">
                  Rp{" "}
                  {item.total_balance.toLocaleString("id-ID", {
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                  })}
                </td>
                <td className="p-3">
                  Rp{" "}
                  {item.grand_total.toLocaleString("id-ID", {
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                  })}
                </td>
              </tr>
          )))}
        </tbody>
      </table>
      <div className="flex justify-center mt-4">
        {[...Array(Math.ceil(penjualan.length / itemsPerPage))].map(
          (_, i) => (
            <button
              key={i}
              onClick={() => paginate(i + 1)}
              className={`px-4 py-2 mx-1 rounded-lg ${
                currentPage === i + 1 ? "bg-blue-500 text-white" : ""
              }`}
            >
              {i + 1}
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default Penjualan;
