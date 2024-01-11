import { Ionicons } from '@expo/vector-icons';
import { useAuthContext } from '@store/authContext';
import { IconButton } from '@ui/IconButton';
import { Colors } from '@ui/constants/colors';
import { Tabs, router } from 'expo-router';

export default function HomeLayout() {
  const { logout } = useAuthContext();

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
        headerLeft: ({ tintColor }) => (
          <IconButton
            iconName="exit-outline"
            color={tintColor}
            onPress={() => logout()}
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

      {/* To hide tabs in builded app */}
      <Tabs.Screen
        name="_components"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}
