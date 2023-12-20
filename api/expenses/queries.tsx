import { queryClient } from '@api/QueryProvider';
import { ExpensesController } from '@api/expenses/controller';
import { ExpenseObj } from '@api/expenses/types';
import { useMutation, useQuery } from '@tanstack/react-query';

enum ExpensesQueryKeys {
  expenses = 'expenses',
}

export const useExpenses = () =>
  useQuery({
    queryKey: [ExpensesQueryKeys.expenses],
    queryFn: () => ExpensesController.get().getExpenses({}),
  });

export const useAddExpense = () =>
  useMutation({
    mutationFn: (expense: Omit<ExpenseObj, 'id'>) =>
      ExpensesController.get().createExpense({ expense }),

    // TODO: setQueryData instead of invalidate
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: [ExpensesQueryKeys.expenses] }),
  });

export const useUpdateExpense = () =>
  useMutation({
    mutationFn: ({ id, ...expense }: ExpenseObj) =>
      ExpensesController.get().updateExpense({ id, expense }),

    // TODO: setQueryData instead of invalidate
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: [ExpensesQueryKeys.expenses] }),
  });

export const useDeleteExpense = () =>
  useMutation({
    mutationFn: (params: { id: string }) =>
      ExpensesController.get().deleteExpense(params),

    onMutate: async ({ id }) => {
      await queryClient.cancelQueries({
        queryKey: [ExpensesQueryKeys.expenses],
      });

      queryClient.setQueryData<ExpenseObj[]>(
        [ExpensesQueryKeys.expenses],
        (expenses) => expenses?.filter((item) => item.id !== id) ?? [],
      );
    },
  });
