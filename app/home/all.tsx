import { useMemo } from 'react';

import { ExpensesMain } from './_components/ExpensesMain';
import { useExpenses } from '../../api/queries';

export default function AllExpenses() {
  const { isPending, isError, data: expenses } = useExpenses();

  const sortedExpenses = useMemo(() => {
    if (isPending || isError) {
      return [];
    }

    return expenses.sort((aExpense, bExpense) => {
      return bExpense.date - aExpense.date;
    });
  }, [expenses, isPending, isError]);

  return (
    <ExpensesMain
      periodName="Total"
      expenses={sortedExpenses}
      placeholderText="No expenses found"
    />
  );
}
