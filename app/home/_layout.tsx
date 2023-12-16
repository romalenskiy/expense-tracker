import { Ionicons } from '@expo/vector-icons';
import { Tabs, router } from 'expo-router';

import { Colors } from '../../constants/colors';
import { IconButton } from '../../ui/IconButton';

export default function HomeLayout() {
  return (
    <Tabs
      sceneContainerStyle={{
        backgroundColor: Colors.primary700,
      }}
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: Colors.text_primary,
        tabBarStyle: { backgroundColor: Colors.primary500 },
        tabBarActiveTintColor: Colors.accent500,
        headerRight: ({ tintColor }) => (
          <IconButton
            iconName="add"
            color={tintColor}
            onPress={() => router.push(`/manage-expense/`)}
          />
        ),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Recent Expenses',
          tabBarLabel: 'Recent',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="hourglass" color={color} size={size} />
          ),
        }}
      />

      <Tabs.Screen
        name="all"
        options={{
          title: 'All Expenses',
          tabBarLabel: 'All',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calendar" color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}
