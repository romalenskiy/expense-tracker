import { FC } from 'react';
import { FlatList } from 'react-native';

import { ExpenseItem } from './ExpenseItem';
import { ExpenseObj } from '../../../../api/types';
import { Spacing } from '../../../../ui/Spacing';

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
