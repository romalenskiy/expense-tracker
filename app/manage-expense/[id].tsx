import { router, useLocalSearchParams } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { Colors } from '../../constants/colors';
import { useStoreActions } from '../../store/storeActions';
import { Button } from '../../ui/Button';
import { IconButton } from '../../ui/IconButton';

export type EditExpenseSearchParams = {
  id: string;
};

export default function EditExpense() {
  const { id } = useLocalSearchParams<EditExpenseSearchParams>();

  const { deleteExpense, updateExpense } = useStoreActions();

  const onUpdate = () => {
    router.back();
  };

  const onDelete = () => {
    deleteExpense(id);
    router.back();
  };

  return (
    <View style={styles.container}>
      <View style={styles.actions}>
        <Button style={styles.button} onPress={onUpdate}>
          Update
        </Button>

        <Button mode="flat" style={styles.button} onPress={() => router.back()}>
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
