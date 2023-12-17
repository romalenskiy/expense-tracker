import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { FC, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { BaseButton, Swipeable } from 'react-native-gesture-handler';

import { Colors } from '../../../constants/colors';
import { useStoreActions } from '../../../store/storeActions';
import { ExpenseObj } from '../../../store/types';

const renderActions = (
  direction: 'left' | 'right',
  onDeleteClick: VoidFunction,
) => {
  return (
    <View
      style={[
        styles.swipeActionsContainer,
        direction === 'left'
          ? {
              borderTopRightRadius: 0,
              borderBottomRightRadius: 0,
            }
          : { borderTopLeftRadius: 0, borderBottomLeftRadius: 0 },
      ]}
    >
      <BaseButton style={styles.swipeButton} onPress={onDeleteClick}>
        <Text
          style={{
            color: Colors.text_primary,
          }}
        >
          <Ionicons name="trash" size={24} />
        </Text>
      </BaseButton>
    </View>
  );
};

const getRenderActions =
  (direction: 'left' | 'right', onDeleteClick: VoidFunction) => () =>
    renderActions(direction, onDeleteClick);

const dateFormatter = new Intl.DateTimeFormat();

type Props = { item: ExpenseObj };

export const ExpenseItem: FC<Props> = ({ item }) => {
  const { deleteExpense } = useStoreActions();

  const [isPressed, setIsPressed] = useState(false);
  const [swipeActiveDirection, setSwipeActiveDirection] = useState<
    'left' | 'right' | undefined
  >();

  const onDeleteClick = () => deleteExpense(item.id);

  return (
    <Swipeable
      renderLeftActions={getRenderActions('left', onDeleteClick)}
      renderRightActions={getRenderActions('right', onDeleteClick)}
      onSwipeableWillOpen={setSwipeActiveDirection}
      onSwipeableWillClose={() => setSwipeActiveDirection(undefined)}
      friction={2}
      overshootFriction={2}
    >
      <View
        style={[
          styles.container,
          isPressed && styles.pressed,
          swipeActiveDirection === 'left' && {
            borderTopLeftRadius: 0,
            borderBottomLeftRadius: 0,
          },
          swipeActiveDirection === 'right' && {
            borderTopRightRadius: 0,
            borderBottomRightRadius: 0,
          },
        ]}
      >
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
  );
};

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.75,
  },

  container: {
    borderRadius: 6,
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

  swipeActionsContainer: { width: 64, overflow: 'hidden', borderRadius: 6 },

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
