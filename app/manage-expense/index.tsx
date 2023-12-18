import { router } from 'expo-router';
import { Alert, StyleSheet, View } from 'react-native';

import { ExpenseForm } from './_components/ExpenseForm';
import { useAddExpense } from '../../api/queries';
import { Button } from '../../ui/Button';

export default function CreateExpense() {
  const mutation = useAddExpense();

  return (
    <View style={styles.container}>
      <ExpenseForm
        getActions={({ amount, date, title, validation, onSubmit }) => {
          return (
            <View style={styles.actions}>
              <Button
                style={styles.button}
                onPress={() => {
                  onSubmit();
                  if (!validation.isValid) {
                    Alert.alert('Validation error', validation.errorMessage);
                    return;
                  }

                  mutation.mutate({ amount, date, title });

                  router.back();
                }}
              >
                Add
              </Button>

              <Button
                mode="flat"
                style={styles.button}
                onPress={() => router.back()}
              >
                Cancel
              </Button>
            </View>
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
