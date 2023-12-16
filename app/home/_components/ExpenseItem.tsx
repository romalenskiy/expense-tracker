import { router } from 'expo-router';
import { FC } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Colors } from '../../../constants/colors';
import { ExpenseObj } from '../../../store/types';

const dateFormatter = new Intl.DateTimeFormat();

type Props = { item: ExpenseObj };

export const ExpenseItem: FC<Props> = ({ item }) => {
  return (
    <Pressable
      style={({ pressed }) => pressed && styles.pressed}
      onPress={() => router.push(`/manage-expense/${item.id}`)}
    >
      <View style={styles.container}>
        <View>
          <Text style={[styles.textBase, styles.title]}>{item.title}</Text>
          <Text style={styles.textBase}>{dateFormatter.format(item.date)}</Text>
        </View>

        <View style={styles.amountContainer}>
          <Text style={styles.amount}>${item.amount.toFixed(2)}</Text>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.75,
  },

  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 6,
    elevation: 3,
    shadowColor: Colors.gray500,
    shadowRadius: 4,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
    padding: 12,
    marginVertical: 8,
    backgroundColor: Colors.primary500,
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
