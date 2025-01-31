
const Home = () => {

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Dashboard Overview</h2>
      <p className="mb-6">
        Selamat datang di dashboard kami. Di sini Anda dapat melihat ringkasan
        penjualan, omzet, dan pembayaran.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-2">Total Penjualan</h3>
          <p className="text-gray-700">Rp 10.000.000</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-2">Total Omzet</h3>
          <p className="text-gray-700">Rp 50.000.000</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-2">Total Payment</h3>
          <p className="text-gray-700">Rp 5.000.000</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
