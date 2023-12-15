import { useLocalSearchParams } from 'expo-router';
import { Text } from 'react-native';

export default function ManageExpense() {
  const { id } = useLocalSearchParams<{ id: string }>();
  return <Text>Manage Expense Screen: {id}</Text>;
}
