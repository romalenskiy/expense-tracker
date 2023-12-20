import { ExpenseObj } from '@api/expenses/types';
import { Spacing } from '@ui/Spacing';
import { FC } from 'react';
import { FlatList } from 'react-native';

import { ExpenseItem } from './ExpenseItem';

type Props = { expenses: ExpenseObj[] };

export const ExpensesList: FC<Props> = ({ expenses }) => {
  return (
    <FlatList
      data={expenses}
      keyExtractor={(item) => item.id}
      renderItem={({ item, index }) => {
        return (
          <ExpenseItem item={item} isLastItem={index + 1 === expenses.length} />
        );
      }}
      // @ts-expect-error Invalid library type
      ItemSeparatorComponent={<Spacing size={16} />}
    />
  );
};
