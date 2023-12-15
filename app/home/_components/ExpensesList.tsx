import { FC } from 'react';
import { FlatList } from 'react-native';

import { ExpenseItem } from './ExpenseItem';
import { ExpenseObj } from './types';

type Props = { expenses: ExpenseObj[] };

export const ExpensesList: FC<Props> = ({ expenses }) => {
  return (
    <FlatList
      data={expenses}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => {
        return <ExpenseItem item={item} />;
      }}
    />
  );
};
