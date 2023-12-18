import { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { ExpenseObj } from '../../../api/types';
import { Colors } from '../../../constants/colors';

type Props = { periodName: string; expenses: ExpenseObj[] };

export const ExpensesSummary: FC<Props> = ({ periodName, expenses }) => {
  const sum = expenses.reduce((acc, item) => {
    return acc + item.amount;
  }, 0);

  return (
    <View style={styles.container}>
      <Text style={styles.period}>{periodName}</Text>
      <Text style={styles.sum}>${sum.toFixed(2)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 8,
    backgroundColor: Colors.primary50,
    borderRadius: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  period: {
    fontSize: 14,
    color: Colors.primary400,
  },

  sum: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.primary500,
  },
});
