export default function InsightBox({ insight }) {
  if (!insight) return null;

  const sections = insight.split(/\d+\.\s+/).filter((s) => s.trim() !== "");

  return (
    <div>
      <h3 className="font-semibold mb-3 text-lg">AI Insight</h3>

      <div className="space-y-4">
        {sections.map((section, i) => {
          const lines = section
            .split("\n")
            .map((l) => l.trim())
            .filter((l) => l !== "");

          const title = lines[0] || "";
          const points = lines.slice(1);

          return (
            <div key={i} className="bg-white p-4 rounded-xl shadow-sm">
              {/* Title */}
              <h4 className="font-semibold text-sm mb-2">
                💡 {title.replace(":", "")}
              </h4>

              {/* Points */}
              <ul className="space-y-2 text-sm text-gray-600">
                {points.map((p, idx) => (
                  <li key={idx} className="flex gap-2">
                    <span>•</span>
                    <span>{p.replace(/^[-•]\s*/, "")}</span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}
