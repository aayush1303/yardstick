import CategoryPieChart from '../Summary/CategoryPieChart';

export default function CategoryChartCard({ data }) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-semibold mb-4">Expenses by Category</h2>
      {data.length > 0 ? (
        <CategoryPieChart data={data} />
      ) : (
        <p className="text-sm text-gray-500">No category data available.</p>
      )}
    </div>
  );
}