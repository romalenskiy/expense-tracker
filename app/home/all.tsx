import { useMemo } from 'react';

import { ExpensesMain } from './_components/ExpensesMain';
import { useStore } from '../../store/store';

export default function AllExpenses() {
  const {
    store: { expenses },
  } = useStore();

  const sortedExpenses = useMemo(() => {
    return expenses.sort((aExpense, bExpense) => {
      return bExpense.date - aExpense.date;
    });
  }, [expenses]);

  return (
    <ExpensesMain
      periodName="Total"
      expenses={sortedExpenses}
      placeholderText="No expenses found"
    />
  );
}
