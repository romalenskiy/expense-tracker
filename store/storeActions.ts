import { useCallback, useMemo } from 'react';

import { useStore } from './store';
import { ExpenseObj } from './types';

export const useStoreActions = () => {
  const { updateStore } = useStore();

  const addExpense = useCallback(
    (expenseData: Omit<ExpenseObj, 'id'>) => {
      updateStore((prevValue) => {
        return {
          expenses: [
            ...prevValue.expenses,
            { id: Math.random().toString(), ...expenseData },
          ],
        };
      });
    },
    [updateStore],
  );

  const deleteExpense = useCallback(
    (expenseId: string) => {
      updateStore((prevValue) => {
        return {
          expenses: prevValue.expenses.filter((item) => item.id !== expenseId),
        };
      });
    },
    [updateStore],
  );

  const updateExpense = useCallback(
    (expenseId: string, expenseData: Omit<ExpenseObj, 'id'>) => {
      updateStore((prevValue) => {
        const editingExpenseIndex = prevValue.expenses.findIndex(
          (item) => item.id === expenseId,
        );

        const updatedExpenses = [...prevValue.expenses];
        updatedExpenses.splice(editingExpenseIndex, 1, {
          id: expenseId,
          ...expenseData,
        });

        return {
          expenses: updatedExpenses,
        };
      });
    },
    [updateStore],
  );

  return useMemo(
    () => ({ addExpense, deleteExpense, updateExpense }),
    [addExpense, deleteExpense, updateExpense],
  );
};
