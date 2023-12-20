import { FirebaseApi } from '@api/api';
import { ExpenseObj } from '@api/types';
import {
  QueryClient,
  QueryClientProvider,
  useMutation,
  useQuery,
} from '@tanstack/react-query';
import { FC, ReactNode } from 'react';

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 5 * 60 * 1000, retry: 1 } },
});

type Props = { children: ReactNode };

export const ReactQueryProvider: FC<Props> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

enum QueyKeys {
  expenses = 'expenses',
}

export const useExpenses = () =>
  useQuery({
    queryKey: [QueyKeys.expenses],
    queryFn: () => FirebaseApi.getExpenses({}),
  });

export const useAddExpense = () =>
  useMutation({
    mutationFn: (expense: Omit<ExpenseObj, 'id'>) =>
      FirebaseApi.createExpense({ expense }),

    // TODO: setQueryData instead of invalidate
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: [QueyKeys.expenses] }),
  });

export const useUpdateExpense = () =>
  useMutation({
    mutationFn: ({ id, ...expense }: ExpenseObj) =>
      FirebaseApi.updateExpense({ id, expense }),

    // TODO: setQueryData instead of invalidate
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: [QueyKeys.expenses] }),
  });

export const useDeleteExpense = () =>
  useMutation({
    mutationFn: (params: { id: string }) => FirebaseApi.deleteExpense(params),

    onMutate: async ({ id }) => {
      await queryClient.cancelQueries({ queryKey: [QueyKeys.expenses] });

      queryClient.setQueryData<ExpenseObj[]>(
        [QueyKeys.expenses],
        (expenses) => expenses?.filter((item) => item.id !== id) ?? [],
      );
    },
  });
