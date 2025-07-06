import {
  ResponsiveContainer,
  BarChart,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  Bar,
} from 'recharts';

const BudgetComparisonChart = ({ data }) => {
  return (
    <div className="h-[300px]">
      <h2 className="text-lg font-semibold mb-4">Budgets</h2>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip
            formatter={(value) =>
              typeof value === 'number' ? `$${value.toFixed(2)}` : value
            }
          />
          <Legend />
          <Bar dataKey="budget" fill="#8884d8" name="Budget" />
          <Bar dataKey="actual" fill="#82ca9d" name="Actual" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BudgetComparisonChart;
