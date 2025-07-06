import MonthlyExpensesChart from '../Transactions/MonthlyExpensesChart';

export default function MonthlyChartCard({ data }) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-semibold mb-4">Monthly Expenses</h2>
      <MonthlyExpensesChart data={data} />
    </div>
  );
}
