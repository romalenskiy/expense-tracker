import { router } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { useStoreActions } from '../../store/storeActions';
import { Button } from '../../ui/Button';

export default function CreateExpense() {
  const { addExpense } = useStoreActions();

  const onAdd = () => {
    router.back();
  };

  return (
    <View style={styles.container}>
      <View style={styles.actions}>
        <Button style={styles.button} onPress={onAdd}>
          Add
        </Button>

        <Button mode="flat" style={styles.button} onPress={() => router.back()}>
          Cancel
        </Button>
      </View>
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
