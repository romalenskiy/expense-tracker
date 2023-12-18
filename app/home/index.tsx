import { useMemo } from 'react';

import { ExpensesMain } from './_components/ExpensesMain';
import { useExpenses } from '../../api/queries';

export default function RecentExpenses() {
  const { isPending, isError, data: expenses } = useExpenses();

  const recentExpenses = useMemo(() => {
    if (isPending || isError) {
      return [];
    }

    const dateWeekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
    const dateWeekAgoDayStart = new Date(dateWeekAgo).setHours(0, 0, 0, 0);

    const filteredExpenses = expenses.filter((item) => {
      return item.date >= dateWeekAgoDayStart;
    });

    const sortedExpenses = filteredExpenses.sort((aExpense, bExpense) => {
      return bExpense.date - aExpense.date;
    });

    return sortedExpenses;
  }, [expenses, isPending, isError]);

  return (
    <ExpensesMain
      periodName="Last 7 days"
      expenses={recentExpenses}
      placeholderText={
        isPending ? 'Loadig...' : 'No expenses found for the last 7 days'
      }
    />
  );
}
