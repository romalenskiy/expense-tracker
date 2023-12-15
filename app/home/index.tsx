import { Link } from 'expo-router';
import { Text, View } from 'react-native';

export default function Page() {
  return (
    <View>
      <Text>All Expenses Screen</Text>
      <Link href={`/manage-expense/${1}`}>to manage modal</Link>
    </View>
  );
}
