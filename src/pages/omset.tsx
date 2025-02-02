import { useEffect, useState } from "react";
import axios from "axios";

interface Penjualan {
  date: string;
  grand_total: string;
  marketing: string;
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

interface MarketingId {
  id: number;
  name: string;
}

interface ApiResponse {
  data: MarketingData[];
  status: number;
}

const Omset = () => {
  const [data, setData] = useState<MarketingData[]>([]);
  const [selectedMonth, setSelectedMonth] = useState<string>("");
  const [selectedYear, setSelectedYear] = useState<string>("");
  const [marketingIds, setMarketingIds] = useState<{ [key: string]: number }>({});
  const [paymentStatus, setPaymentStatus] = useState<{ [key: number]: boolean }>({});

  // Fetch data marketing untuk mendapatkan ID berdasarkan nama
  const fetchMarketingIds = async () => {
    try {
      const res = await axios.get<MarketingId[]>("http://127.0.0.1:8000/api/marketing");
      const idMap: { [key: string]: number } = {};
      res.data.forEach((item) => {
        idMap[item.name] = item.id;
      });
      setMarketingIds(idMap);
    } catch (error) {
      console.error("Error fetching marketing IDs:", error);
    }
  };

  // Fetch data omzet
  const fetchData = async (month: string, year: string) => {
    try {
      const res = await axios.get<ApiResponse>("http://127.0.0.1:8000/api/comission", {
        params: { month, year },
      });

      const fetchedData = res.data.data || [];
      setData(fetchedData);

      // Set status pembayaran awal berdasarkan data yang ada
      const initialPaymentStatus: { [key: number]: boolean } = {};
      fetchedData.forEach((item) => {
        const id = marketingIds[item.marketing];
        if (id) initialPaymentStatus[id] = false;
      });
      setPaymentStatus(initialPaymentStatus);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handlePayment = async (marketingName: string, amount: number) => {
    const marketingId = marketingIds[marketingName];

    if (!marketingId) {
      alert("ID Marketing tidak ditemukan");
      return;
    }

    try {
      const paymentDate = new Date().toISOString();

      const res = await axios.post("http://127.0.0.1:8000/api/process-payment", {
        marketing_id: marketingId,
        amount: amount,
        payment_date: paymentDate,
      });

      if (res.status === 200) {
        alert("Pembayaran berhasil");

        // ✅ Perbarui state hanya untuk marketing yang dibayar
        setPaymentStatus((prev) => ({ ...prev, [marketingId]: true }));

        fetchData(selectedMonth, selectedYear);
      } else {
        alert("Pembayaran gagal");
      }
    } catch (error) {
      console.error("Error proses pembayaran:", error);
      alert("Terjadi kesalahan saat memproses pembayaran");
    }
  };

  useEffect(() => {
    fetchMarketingIds();
    fetchData("", "");
  }, []);

  const handleFilterData = (e: React.FormEvent) => {
    e.preventDefault();
    fetchData(selectedMonth, selectedYear);
  };

  return (
    <div className="p-6">
      <h2 className="mb-4 text-2xl font-bold">Data Omzet Marketing</h2>

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
            <th className="p-3">Bayar</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => {
            const marketingId = marketingIds[item.marketing];
            return (
              <tr key={index} className="hover:bg-gray-100">
                <td className="p-3 text-center">{index + 1}</td>
                <td className="p-3 text-center">{item.marketing}</td>
                <td className="p-3 text-center">{item.omzet}</td>
                <td className="p-3 text-center">{item.bulan}</td>
                <td className="p-3 text-center">{item.tahun}</td>
                <td className="p-3 text-center">{item.comission_percent}</td>
                <td className="p-3 text-center">{item.comission_nominal}</td>
                <td className="flex items-center justify-center p-3 mx-auto">
                  {!paymentStatus[marketingId] ? (
                    <button
                      className="px-4 py-2 mx-auto text-white bg-green-500 rounded hover:bg-green-600"
                      onClick={() => handlePayment(item.marketing, item.omzet)}
                    >
                      Bayar
                    </button>
                  ) : (
                    <div className="text-center text-gray-600 text-md">Sudah dibayar</div>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Omset;
