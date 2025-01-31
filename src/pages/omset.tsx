import { useEffect, useState } from "react";
import axios from "axios";

// Definisi tipe data untuk struktur data
interface Penjualan {
  date: string;
  grand_total: string;
}

interface MarketingData {
  marketing: string;
  penjualan: Penjualan[];
  omzet: number;
  bulan: string;
  tahun: string;
  comission_percent: number;
  comission_nominal: number;
}

interface ApiResponse {
  data: MarketingData[];
  status: number;
}

const Omset = () => {
  const [data, setData] = useState<MarketingData[]>([]);
  const [selectedMonth, setSelectedMonth] = useState<string>("");
  const [selectedYear, setSelectedYear] = useState<string>("");

  const fetchData = async (month: string, year: string) => {
    try {
      const res = await axios.get<ApiResponse>(`http://127.0.0.1:8000/api/comission`, {
        params: {
          month: month,
          year: year,
        },
      });
      setData(res.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Fetch data secara default saat komponen pertama kali di-render
  useEffect(() => {
    fetchData("", ""); // Fetch semua data tanpa filter
  }, []);

  const handleFilterData = (e: React.FormEvent) => {
    e.preventDefault();
    fetchData(selectedMonth, selectedYear);
  };

  return (
    <div className="p-6">
      <h2 className="mb-4 text-2xl font-bold">Data Penjualan</h2>

      {/* Form Filter */}
      <form onSubmit={handleFilterData} className="mb-4">
        <label className="mr-2">
          Bulan:
          <input
            type="text"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="p-1 ml-2 border rounded"
            placeholder="MM"
          />
        </label>
        <label className="mr-2">
          Tahun:
          <input
            type="text"
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="p-1 ml-2 border rounded"
            placeholder="YYYY"
          />
        </label>
        <button type="submit" className="px-4 py-2 text-white bg-blue-500 rounded">
          Filter
        </button>
      </form>

      {/* Tabel Data */}
      <table className="min-w-full overflow-hidden bg-white border border-gray-200 rounded-lg">
        <thead className="text-white bg-blue-500">
          <tr>
            <th className="p-3">No</th>
            <th className="p-3">Marketing</th>
            <th className="p-3">Omzet</th>
            <th className="p-3">Bulan</th>
            <th className="p-3">Tahun</th>
            <th className="p-3">Komisi (%)</th>
            <th className="p-3">Total Komisi</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index} className="hover:bg-gray-100">
              <td className="p-3">{index + 1}</td>
              <td className="p-3">{item.marketing}</td>
              <td className="p-3">{item.omzet}</td>
              <td className="p-3">{item.bulan}</td>
              <td className="p-3">{item.tahun}</td>
              <td className="p-3">{item.comission_percent}</td>
              <td className="p-3">{item.comission_nominal}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Omset;