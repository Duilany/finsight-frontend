import { useState } from "react";
import axios from "axios";

import InputForm from "./components/InputForm";
import ResultCard from "./components/ResultCard";
import InsightBox from "./components/InsightBox";

function App() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  // 🔥 state untuk simulasi
  const [simulation, setSimulation] = useState(null);

  const handleAnalyze = async (data) => {
    try {
      setLoading(true);
      setSimulation(null); // reset simulasi

      const API_URL = import.meta.env.VITE_API_URL;

      const res = await axios.post(`${API_URL}/analyze`, data);
      setResult(res.data);
    } catch (err) {
      alert("Error connecting to backend");
    } finally {
      setLoading(false);
    }
  };

  const formatRupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    })
      .format(number)
      .replace("Rp", "Rp ");
  };

  // 🔥 pilih data (hasil asli atau simulasi)
  const current = simulation || result;

  // 🔥 simulasi hemat 10%
  const handleSimulation = () => {
    if (!result) return;

    const totalExpense = result.analysis.total_expense;
    const savings = result.analysis.savings;

    const reducedExpense = totalExpense * 0.9;
    const newSavings = savings + (totalExpense - reducedExpense);

    setSimulation({
      ...result,
      analysis: {
        ...result.analysis,
        total_expense: Math.round(reducedExpense),
        savings: Math.round(newSavings),
      },
    });
  };

  const resetSimulation = () => {
    setSimulation(null);
  };

  // 🔥 Insight tambahan
  const biggest = current
    ? Object.entries(current.analysis.breakdown).sort((a, b) => b[1] - a[1])[0]
    : null;

  const isHealthy = current
    ? current.analysis.savings > current.analysis.total_expense * 0.3
    : null;

  const savingRate = current
    ? (current.analysis.savings /
        (current.analysis.total_expense + current.analysis.savings)) *
      100
    : 0;

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-2xl">
        {/* Title */}
        <h1 className="text-3xl font-bold text-center mb-2">FinSight AI 💰</h1>
        <p className="text-center text-gray-500 text-sm">
          Your Personal AI Financial Coach
        </p>
        <div className="text-center text-xs text-gray-400 mb-6">
          Analyze • Improve • Grow Your Money
        </div>

        {/* Form */}
        <div className="mb-6">
          <InputForm onAnalyze={handleAnalyze} loading={loading} />
        </div>

        {/* Loading */}
        {loading && (
          <div className="text-center py-6">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-3 text-gray-500 text-sm">
              AI sedang menganalisis keuangan kamu...
            </p>
          </div>
        )}

        {/* Result */}
        {!loading && current && (
          <div className="space-y-4">
            {/* 🔥 INTERACTIVE BUTTON */}
            <div className="flex gap-2">
              <button
                onClick={handleSimulation}
                className="flex-1 bg-indigo-500 text-white py-2 rounded-lg hover:bg-indigo-600 transition text-sm"
              >
                🔁 Simulasi Hemat 10%
              </button>

              {simulation && (
                <button
                  onClick={resetSimulation}
                  className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400 transition text-sm"
                >
                  Reset
                </button>
              )}
            </div>
            {/* AI Profile */}
            <div className="bg-purple-100 text-purple-700 p-3 rounded-lg text-center text-sm font-medium">
              💡 AI Financial Profile: <b>{result.profile}</b>
            </div>
            {/* Banner */}
            <div className="bg-purple-100 text-purple-700 p-3 rounded-lg text-center text-sm">
              🤖 AI menganalisis kebiasaan keuangan kamu secara personal
            </div>

            {/* Status */}
            {biggest && (
              <div className="bg-red-100 text-red-600 p-3 rounded-lg text-center text-sm">
                ⚠️ Pengeluaran terbesar: <b>{biggest[0]}</b> ({biggest[1]}%)
              </div>
            )}

            {isHealthy !== null && (
              <div
                className={`p-3 rounded-lg text-center text-sm font-medium ${
                  isHealthy
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {isHealthy
                  ? "✅ Kondisi keuangan sehat"
                  : "⚠️ Perlu perbaikan pengeluaran"}
              </div>
            )}

            {/* Saving rate */}
            <div className="bg-indigo-100 text-indigo-700 p-3 rounded-lg text-center text-sm">
              📊 Saving rate: <b>{savingRate.toFixed(1)}%</b>
            </div>

            {/* Summary */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-green-100 p-4 rounded-xl text-center">
                <p className="text-sm text-gray-500">Total Expense</p>
                <h2 className="text-xl font-bold">
                  {formatRupiah(current.analysis.total_expense)}
                </h2>
              </div>

              <div className="bg-blue-100 p-4 rounded-xl text-center">
                <p className="text-sm text-gray-500">Savings</p>
                <h2 className="text-xl font-bold">
                  {formatRupiah(current.analysis.savings)}
                </h2>
              </div>
            </div>

            {/* Breakdown */}
            <div className="bg-gray-100 p-4 rounded-xl">
              <ResultCard analysis={current.analysis} />
            </div>

            {/* Insight */}
            <div className="bg-blue-50 p-4 rounded-xl">
              <InsightBox insight={current.insight} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
