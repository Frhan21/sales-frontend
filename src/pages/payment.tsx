import React from "react";

const Payment = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Data Payment</h2>
      <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
        <thead className="bg-blue-500 text-white">
          <tr>
            <th className="p-3">No</th>
            <th className="p-3">Metode</th>
            <th className="p-3">Jumlah</th>
          </tr>
        </thead>
        <tbody>
          <tr className="hover:bg-gray-100">
            <td className="p-3">1</td>
            <td className="p-3">Transfer Bank</td>
            <td className="p-3">Rp 5.000.000</td>
          </tr>
          <tr className="hover:bg-gray-100">
            <td className="p-3">2</td>
            <td className="p-3">E-Wallet</td>
            <td className="p-3">Rp 3.000.000</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Payment;
