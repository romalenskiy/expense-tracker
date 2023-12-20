import { AxiosError } from 'axios';
import { useMemo } from 'react';

import { ExpensesMain } from './_components/ExpensesMain';
import { useExpenses } from '../../api/queries';
import { ErrorOverlay } from '../../ui/ErrorOverlay';
import { LoadingOverlay } from '../../ui/LoadingOverlay';

export default function RecentExpenses() {
  const { isPending, isError, error, data: expenses, refetch } = useExpenses();

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

  if (isPending) {
    return <LoadingOverlay />;
  }

  if (isError) {
    const errorMessage =
      error instanceof AxiosError ? error.message : error?.toString();

    return (
      <ErrorOverlay
        message={errorMessage}
        onConfirm={() => refetch()}
        actionText="Retry"
      />
    );
  }

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
