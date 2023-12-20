import { router, useLocalSearchParams } from 'expo-router';
import { useMemo } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { ExpenseForm } from './_components/ExpenseForm';
import {
  useDeleteExpense,
  useExpenses,
  useUpdateExpense,
} from '../../../api/queries';
import { ExpenseObj } from '../../../api/types';
import { Colors } from '../../../constants/colors';
import { Button } from '../../../ui/Button';
import { IconButton } from '../../../ui/IconButton';

export type EditExpenseSearchParams = {
  id: string;
};

export default function EditExpenseScreen() {
  const { id } = useLocalSearchParams<EditExpenseSearchParams>();

  const { isError, isPending, data: expenses } = useExpenses();

  const updateMutation = useUpdateExpense();
  const deleteMutation = useDeleteExpense();

  const expensObj: ExpenseObj = useMemo(() => {
    const placeholder = {
      id: '',
      amount: 0,
      date: Date.now(),
      title: '',
    };

    if (isPending || isError) {
      return placeholder;
    }

    return expenses.find((item) => item.id === id) || placeholder;
  }, [expenses, isPending, isError]);

  const onDelete = () => {
    deleteMutation.mutate({ id });
    router.back();
  };

  return (
    <View style={styles.container}>
      <ExpenseForm
        initialAmount={expensObj.amount}
        initialDate={expensObj.date}
        initialTitle={expensObj.title}
        getActions={({ amount, date, title, validation, onSubmit }) => {
          return (
            <>
              <View style={styles.actions}>
                <Button
                  style={styles.button}
                  onPress={() => {
                    onSubmit();
                    if (!validation.isValid) {
                      Alert.alert('Validation error', validation.errorMessage);
                      return;
                    }
                    updateMutation.mutate({ id, amount, date, title });
                    router.back();
                  }}
                >
                  Update
                </Button>

                <Button
                  mode="flat"
                  style={styles.button}
                  onPress={() => router.back()}
                >
                  Cancel
                </Button>
              </View>

              <View style={styles.innerContainer}>
                <IconButton
                  iconName="trash"
                  color={Colors.error500}
                  size={36}
                  onPress={onDelete}
                />
              </View>
            </>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },

  innerContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: Colors.primary200,
    alignItems: 'center',
  },

  actions: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
});
