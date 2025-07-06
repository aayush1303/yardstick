import { Button } from '@/components/ui/button';

export default function DashboardHeader({ onAddTransaction, onAddBudget }) {
  
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
      <h1 className="text-2xl font-bold">Expense Tracker</h1>
      <div className="flex gap-3">
        <Button onClick={onAddTransaction}>Add Transaction</Button>
        <Button onClick={onAddBudget}>Add Budget</Button>
      </div>
    </div>
  );
}
