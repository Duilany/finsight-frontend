import { useState } from "react";

// format ke Rupiah
const formatRupiah = (value) => {
  if (!value) return "";
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(value);
};

// ambil angka saja
const parseNumber = (value) => {
  return value.replace(/\D/g, "");
};

export default function InputForm({ onAnalyze, loading }) {
  // display (Rp)
  const [income, setIncome] = useState("");
  const [food, setFood] = useState("");
  const [transport, setTransport] = useState("");
  const [entertainment, setEntertainment] = useState("");

  // raw number (buat backend)
  const [incomeRaw, setIncomeRaw] = useState(0);
  const [foodRaw, setFoodRaw] = useState(0);
  const [transportRaw, setTransportRaw] = useState(0);
  const [entertainmentRaw, setEntertainmentRaw] = useState(0);

  const handleSubmit = () => {
    // validasi
    if (!incomeRaw || !foodRaw || !transportRaw || !entertainmentRaw) {
      alert("Semua field harus diisi dengan angka!");
      return;
    }

    onAnalyze({
      income: incomeRaw,
      expenses: {
        food: foodRaw,
        transport: transportRaw,
        entertainment: entertainmentRaw,
      },
    });
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Input Financial Data</h2>

      <div className="grid grid-cols-2 gap-4">
        {/* Income */}
        <input
          value={income}
          onChange={(e) => {
            const raw = parseNumber(e.target.value);
            setIncomeRaw(Number(raw));
            setIncome(formatRupiah(raw));
          }}
          className="p-3 border rounded-lg"
          placeholder="Income (Rp)"
        />

        {/* Food */}
        <input
          value={food}
          onChange={(e) => {
            const raw = parseNumber(e.target.value);
            setFoodRaw(Number(raw));
            setFood(formatRupiah(raw));
          }}
          className="p-3 border rounded-lg"
          placeholder="Food (Rp)"
        />

        {/* Transport */}
        <input
          value={transport}
          onChange={(e) => {
            const raw = parseNumber(e.target.value);
            setTransportRaw(Number(raw));
            setTransport(formatRupiah(raw));
          }}
          className="p-3 border rounded-lg"
          placeholder="Transport (Rp)"
        />

        {/* Entertainment */}
        <input
          value={entertainment}
          onChange={(e) => {
            const raw = parseNumber(e.target.value);
            setEntertainmentRaw(Number(raw));
            setEntertainment(formatRupiah(raw));
          }}
          className="p-3 border rounded-lg"
          placeholder="Entertainment (Rp)"
        />
      </div>

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition disabled:bg-gray-400"
      >
        {loading ? "Processing..." : "Analyze"}
      </button>
    </div>
  );
}
