import { format, subMonths, eachMonthOfInterval } from 'date-fns';

export function prepareMonthlyData(transactions) {
  const sixMonthsAgo = subMonths(new Date(), 6);
  const months = eachMonthOfInterval({ start: sixMonthsAgo, end: new Date() });

  return months.map((month) => {
    const start = new Date(month.getFullYear(), month.getMonth(), 1);
    const end = new Date(month.getFullYear(), month.getMonth() + 1, 0);

    const monthlyTransactions = transactions.filter((t) => {
      const date = new Date(t.date);
      return date >= start && date <= end;
    });

    const total = monthlyTransactions.reduce((sum, t) => sum + t.amount, 0);
    return {
      name: format(month, 'MMM yyyy'),
      total: parseFloat(total.toFixed(2)),
    };
  });
}

export function getPieChartData(transactions) {
  const categoryTotals = transactions.reduce((acc, t) => {
    if (!t.category) return acc;
    acc[t.category] = (acc[t.category] || 0) + t.amount;
    return acc;
  }, {});

  return Object.entries(categoryTotals).map(([name, value]) => ({ name, value }));
}

export function getBudgetComparisonData(transactions, budgets, currentMonth) {
  const actuals = transactions.reduce((acc, t) => {
    const month = format(new Date(t.date), 'yyyy-MM');
    if (month !== currentMonth || !t.category) return acc;
    acc[t.category] = (acc[t.category] || 0) + t.amount;
    return acc;
  }, {});

  return budgets
    .filter((b) => b.month === currentMonth)
    .map((b) => ({
      category: b.category,
      budget: b.amount,
      actual: actuals[b.category] || 0,
    }));
}
