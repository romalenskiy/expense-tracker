import { AxiosError } from 'axios';
import { useMemo } from 'react';

import { ExpensesMain } from './_components/ExpensesMain';
import { useExpenses } from '../../../api/queries';
import { ErrorOverlay } from '../../../ui/ErrorOverlay';
import { LoadingOverlay } from '../../../ui/LoadingOverlay';

export default function AllExpensesScreen() {
  const { isPending, isError, error, data: expenses, refetch } = useExpenses();

  const sortedExpenses = useMemo(() => {
    if (isPending || isError) {
      return [];
    }

    return expenses.sort((aExpense, bExpense) => {
      return bExpense.date - aExpense.date;
    });
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
      periodName="Total"
      expenses={sortedExpenses}
      placeholderText="No expenses found"
    />
  );
}
