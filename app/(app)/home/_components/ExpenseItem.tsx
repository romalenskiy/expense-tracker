import { useDeleteExpense } from '@api/expenses/queries';
import { ExpenseObj } from '@api/expenses/types';
import { Ionicons } from '@expo/vector-icons';
import { Spacing } from '@ui/Spacing';
import { Colors } from '@ui/constants/colors';
import { router } from 'expo-router';
import { FC, useCallback, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { BaseButton, Swipeable } from 'react-native-gesture-handler';

const dateFormatter = new Intl.DateTimeFormat();

type Props = { item: ExpenseObj; isLastItem?: boolean };

export const ExpenseItem: FC<Props> = ({ item, isLastItem }) => {
  const deleteMutation = useDeleteExpense();

  const [isPressed, setIsPressed] = useState(false);

  const renderActions = useCallback(() => {
    return (
      <View style={styles.swipeActionsContainer}>
        <BaseButton
          style={styles.swipeButton}
          onPress={() => deleteMutation.mutate({ id: item.id })}
        >
          <Text style={styles.swipeActionText}>
            <Ionicons name="trash" size={24} />
          </Text>
        </BaseButton>
      </View>
    );
  }, [deleteMutation.mutate]);

  return (
    <>
      <Swipeable
        renderLeftActions={renderActions}
        renderRightActions={renderActions}
        friction={2}
        overshootFriction={2}
        containerStyle={styles.swipeableContainer}
      >
        <View style={[styles.container, isPressed && styles.pressed]}>
          <BaseButton
            style={styles.buttonContainer}
            onActiveStateChange={setIsPressed}
            onPress={() => router.push(`/manage-expense/${item.id}`)}
          >
            <View>
              <Text style={[styles.textBase, styles.title]}>{item.title}</Text>
              <Text style={styles.textBase}>
                {dateFormatter.format(item.date)}
              </Text>
            </View>

            <View style={styles.amountContainer}>
              <Text style={styles.amount}>${item.amount.toFixed(2)}</Text>
            </View>
          </BaseButton>
        </View>
      </Swipeable>

      {isLastItem && <Spacing size={16} />}
    </>
  );
};

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.75,
  },

  swipeableContainer: { borderRadius: 6 },

  container: {
    elevation: 3,
    shadowColor: Colors.gray500,
    shadowRadius: 4,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
    padding: 12,
    backgroundColor: Colors.primary500,
  },

  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  swipeActionsContainer: { width: 64 },

  swipeActionText: { color: Colors.text_primary },

  swipeButton: {
    flex: 1,
    backgroundColor: Colors.error500,
    justifyContent: 'center',
    alignItems: 'center',
  },

  textBase: {
    color: Colors.primary50,
  },

  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },

  amountContainer: {
    minWidth: 80,
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
  },

  amount: {
    color: Colors.primary500,
    fontWeight: 'bold',
  },
});
