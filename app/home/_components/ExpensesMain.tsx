import { FC } from 'react';
import { StyleSheet, View } from 'react-native';

import { ExpensesList } from './ExpensesList';
import { ExpensesSummary } from './ExpensesSummary';
import { ExpenseObj } from './types';
import { Colors } from '../../../constants/colors';

const EXPENSES_MOCK: ExpenseObj[] = [
  {
    id: 'e1',
    title: 'Winter shoes',
    date: new Date('2022-01-15'),
    amount: 50.99,
  },
  { id: 'e2', title: 'Soundbar', date: new Date('2023-12-05'), amount: 42 },
  {
    id: 'e3',
    title: 'Vape liquid',
    date: new Date('2023-12-10'),
    amount: 10.2,
  },
  { id: 'e4', title: 'Bread', date: new Date('2023-12-13'), amount: 0.69 },
  { id: 'e5', title: 'Book', date: new Date('2023-12-15'), amount: 2 },
];

type Props = { expenses: ExpenseObj[]; periodName: string };

export const ExpensesMain: FC<Props> = ({ expenses, periodName }) => {
  return (
    <View style={styles.container}>
      <ExpensesSummary periodName={periodName} expenses={EXPENSES_MOCK} />

      <ExpensesList expenses={EXPENSES_MOCK} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
    backgroundColor: Colors.primary700,
  },
});
