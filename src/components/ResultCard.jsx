export default function ResultCard({ analysis }) {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-3">Financial Breakdown</h2>

      <div className="space-y-3">
        {Object.entries(analysis.breakdown).map(([key, val]) => (
          <div key={key}>
            <div className="flex justify-between text-sm mb-1 capitalize">
              <span>{key}</span>
              <span className="font-medium">{val}%</span>
            </div>

            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-500 h-2 rounded-full transition-all"
                style={{ width: `${val}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
