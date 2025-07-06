export default function BudgetInsightCard({ insights }) {
  if (insights.length === 0) return null;

  return (
    <div className="bg-white rounded-lg shadow p-4 h-full">
      <h3 className="text-sm text-gray-500 mb-2">Spending Insights</h3>
      <ul className="space-y-1 text-sm text-gray-800">
        {insights.map((item) => (
          <li
            key={item.category}
            className={item.status === 'overspent' ? 'text-red-500' : 'text-green-600'}
          >
            {item.category}:{' '}
            {item.status === 'overspent'
              ? `Overspent by $${item.diff.toFixed(2)}`
              : `Under budget by $${Math.abs(item.diff).toFixed(2)}`}
          </li>
        ))}
      </ul>
    </div>
  );
}
