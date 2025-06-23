import { Tabs } from 'expo-router';
import { Platform } from 'react-native';
import { BlurView } from 'expo-blur';
import { Home, Search, Plus, Trophy, User } from 'lucide-react-native';
import { Colors, BlurIntensity } from '@/constants/Colors';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.textTertiary,
        tabBarStyle: {
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: Platform.OS === 'ios' ? 'transparent' : Colors.glass,
          borderTopWidth: 0,
          height: Platform.OS === 'ios' ? 90 : 70,
          paddingTop: 8,
          paddingBottom: Platform.OS === 'ios' ? 34 : 16,
          paddingHorizontal: 8,
        },
        tabBarBackground: Platform.OS === 'ios' ? () => (
          <BlurView
            intensity={BlurIntensity.strong}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              backgroundColor: Colors.frostedGlass,
              borderTopWidth: 0.5,
              borderTopColor: Colors.border,
            }}
          />
        ) : undefined,
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
          marginTop: 4,
        },
        tabBarItemStyle: {
          paddingVertical: 4,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Classes',
          tabBarIcon: ({ color, size, focused }) => (
            <Home 
              color={color} 
              size={focused ? size + 2 : size} 
              strokeWidth={focused ? 2 : 1.5}
              fill={focused ? color + '20' : 'transparent'}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="discover"
        options={{
          title: 'Discover',
          tabBarIcon: ({ color, size, focused }) => (
            <Search 
              color={color} 
              size={focused ? size + 2 : size} 
              strokeWidth={focused ? 2 : 1.5}
              fill={focused ? color + '20' : 'transparent'}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="create"
        options={{
          title: 'Create',
          tabBarIcon: ({ color, size, focused }) => (
            <Plus 
              color={color} 
              size={focused ? size + 2 : size} 
              strokeWidth={focused ? 2 : 1.5}
              fill={focused ? color + '20' : 'transparent'}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="leaderboard"
        options={{
          title: 'Leaderboard',
          tabBarIcon: ({ color, size, focused }) => (
            <Trophy 
              color={color} 
              size={focused ? size + 2 : size} 
              strokeWidth={focused ? 2 : 1.5}
              fill={focused ? color + '20' : 'transparent'}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size, focused }) => (
            <User 
              color={color} 
              size={focused ? size + 2 : size} 
              strokeWidth={focused ? 2 : 1.5}
              fill={focused ? color + '20' : 'transparent'}
            />
          ),
        }}
      />
    </Tabs>
  );
}