import { useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Text } from 'react-native';

export default function Page() {
  const { id } = useLocalSearchParams<{ id: string }>();
  return (
    <>
      <StatusBar style="light" />
      <Text>Manage Expense Screen: {id}</Text>
    </>
  );
}
