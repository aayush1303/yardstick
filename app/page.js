'use client';
import { useState, useMemo } from 'react';
import { format } from 'date-fns';

import useTransactions from './hooks/useTransactions';
import useBudgets from './hooks/useBudgets';
import { prepareMonthlyData, getPieChartData, getBudgetComparisonData } from './utils/chartUtils';
import DashboardHeader from './components/Dashboard/Header';
import MonthlyChartCard from './components/Summary/MonthlyChartCard';
import CategoryChartCard from './components/Summary/CategoryChartCard';
import TransactionsList from './components/Transactions/TransactionList';
import TransactionForm from './components/Transactions/TransactionForm';
import BudgetForm from './components/Budgets/BudgetForm';
import BudgetComparisonChart from './components/Budgets/BudgetComparisonChart';
import BudgetCategoryChart from './components/Budgets/BudgetCategoryChart';
import BudgetInsightCard from './components/Budgets/BudgetInsightCard';

export default function Home() {
  const [isTransactionFormOpen, setIsTransactionFormOpen] = useState(false);
  const [isBudgetFormOpen, setIsBudgetFormOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);

  const { transactions, fetchTransactions, deleteTransaction } = useTransactions();
  const { budgets, saveBudget } = useBudgets();

  const thisMonth = format(new Date(), 'yyyy-MM');
  const monthlyData = useMemo(() => prepareMonthlyData(transactions), [transactions]);
  const pieChartData = useMemo(() => getPieChartData(transactions), [transactions]);
  const budgetComparisonData = useMemo(
    () => getBudgetComparisonData(transactions, budgets, thisMonth),
    [transactions, budgets, thisMonth]
  );

  const budgetCategoryChartData = useMemo(() => {
    return budgets
      .filter((b) => b.month === thisMonth)
      .map((b) => ({
        category: b.category,
        amount: b.amount,
      }));
  }, [budgets, thisMonth]);

  const budgetInsights = useMemo(() => {
    return budgetComparisonData.map((b) => {
      const diff = b.actual - b.budget;
      return {
        category: b.category,
        diff,
        status: diff > 0 ? 'overspent' : 'under',
      };
    });
  }, [budgetComparisonData]);

  const totalExpenses = useMemo(() =>
    transactions.reduce((sum, t) => sum + t.amount, 0), [transactions]);

  return (
    <main className="container mx-auto py-8 lg:px-5 px-2">
      <DashboardHeader onAddTransaction={() => setIsTransactionFormOpen(true)} onAddBudget={() => setIsBudgetFormOpen(true)} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">

        <div className="bg-white rounded-lg shadow p-4 h-full">
          <h3 className="text-sm text-gray-500">Total Expenses</h3>
          <p className="text-xl font-semibold text-gray-800">${totalExpenses.toFixed(2)}</p>
        </div>

        <BudgetInsightCard insights={budgetInsights} />
      </div>



      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <MonthlyChartCard data={monthlyData} />
        <div className="bg-white rounded-lg shadow p-6">
          <BudgetComparisonChart data={budgetComparisonData} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <CategoryChartCard data={pieChartData} />
        <div className="bg-white rounded-lg shadow p-6">
          <BudgetCategoryChart data={budgetCategoryChartData} />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-4">Recent Transactions</h2>
        <TransactionsList
          transactions={transactions}
          onDelete={deleteTransaction}
          onEdit={(t) => {
            setEditingTransaction(t);
            setIsTransactionFormOpen(true);
          }}
        />
      </div>

      <TransactionForm
        open={isTransactionFormOpen}
        onOpenChange={(open) => {
          setIsTransactionFormOpen(open);
          if (!open) setEditingTransaction(null);
        }}
        onSuccess={fetchTransactions}
        transaction={editingTransaction}
      />

      <BudgetForm
        onSubmit={saveBudget}
        open={isBudgetFormOpen}
        onOpenChange={setIsBudgetFormOpen}
      />
    </main>
  );
}