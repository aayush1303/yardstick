import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';

export default function BudgetCategoryChart({ data }) {
  if (!data || data.length === 0) {
    return <p className="text-sm text-gray-500">No budgets set for this month.</p>;
  }

  return (
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          layout="vertical"
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" />
          <YAxis dataKey="category" type="category" />
          <Tooltip
            formatter={(value) =>
              typeof value === 'number' ? `$${value.toFixed(2)}` : value
            }
          />
          <Bar dataKey="amount" fill="#8884d8" name="Budget" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
