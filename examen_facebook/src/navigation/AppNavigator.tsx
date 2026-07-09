import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { ComponentProps } from 'react';

import { colors } from '../constants/theme';
import { ChatsScreen } from '../screens/ChatsScreen';
import { ChatRoomScreen } from '../screens/ChatRoomScreen';
import { ContactsScreen } from '../screens/ContactsScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { SettingsScreen } from '../screens/SettingsScreen';
import type { MainTabParamList, RootStackParamList } from '../types/navigation.types';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();

type IconName = ComponentProps<typeof Ionicons>['name'];

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.white,
        tabBarInactiveTintColor: colors.tabInactive,
        tabBarStyle: {
          backgroundColor: colors.primary,
          borderTopWidth: 0,
          height: 62,
          paddingBottom: 8,
          paddingTop: 6,
        },
        tabBarIcon: ({ color, size }) => {
          const icons: Record<keyof MainTabParamList, IconName> = {
            Chats: 'chatbubbles',
            Contacts: 'people',
            Settings: 'settings',
          };

          return <Ionicons color={color} name={icons[route.name]} size={size} />;
        },
      })}
    >
      <Tab.Screen component={ChatsScreen} name="Chats" options={{ title: 'Chats' }} />
      <Tab.Screen component={ContactsScreen} name="Contacts" options={{ title: 'Contactos' }} />
      <Tab.Screen component={SettingsScreen} name="Settings" options={{ title: 'Ajustes' }} />
    </Tab.Navigator>
  );
}

export function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: colors.primary },
          headerTintColor: colors.white,
          headerTitleStyle: { fontWeight: '700' },
        }}
      >
        <Stack.Screen component={MainTabs} name="MainTabs" options={{ headerShown: false }} />
        <Stack.Screen component={ChatRoomScreen} name="ChatRoom" options={{ title: 'Chat' }} />
        <Stack.Screen component={ProfileScreen} name="Profile" options={{ title: 'Detalle' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
