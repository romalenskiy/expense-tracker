import { router } from 'expo-router';
import { Text, View } from 'react-native';

import { Button } from '../../ui/Button';

export default function LoginScreen() {
  return (
    <View>
      <Text>Login Screen</Text>
      <Button onPress={() => router.replace('/home/')}>test</Button>
    </View>
  );
}
