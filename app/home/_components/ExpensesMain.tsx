import { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { ExpensesList } from './ExpensesList';
import { ExpensesSummary } from './ExpensesSummary';
import { ExpenseObj } from '../../../api/types';
import { Colors } from '../../../constants/colors';
import { Spacing } from '../../../ui/Spacing';

type Props = {
  expenses: ExpenseObj[];
  periodName: string;
  placeholderText: string;
};

export const ExpensesMain: FC<Props> = ({
  expenses,
  periodName,
  placeholderText,
}) => {
  return (
    <View style={styles.container}>
      <ExpensesSummary periodName={periodName} expenses={expenses} />

      <Spacing size={expenses.length ? 16 : 32} />

      {expenses.length ? (
        <ExpensesList expenses={expenses} />
      ) : (
        <Text style={styles.placeholderText}>{placeholderText}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
  },

  placeholderText: {
    color: Colors.text_primary,
    fontSize: 16,
    textAlign: 'center',
  },
});
