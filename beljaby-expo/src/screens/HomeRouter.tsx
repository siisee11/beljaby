import React, { memo } from 'react';
import { Navigation } from '../types';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  Dashboard,
  JoinScreen,
  RankScreen,
} from "./index"
import Ionicons from 'react-native-vector-icons/Ionicons';
import { theme } from '../core/theme';

type Props = {
  navigation: Navigation;
};

const Tab = createBottomTabNavigator();

const HomeRouter = ({ navigation }: Props) => {
  return (
    <NavigationContainer>
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused
              ? 'home'
              : 'home-outline';
          } else if (route.name === 'Join') {
            iconName = focused ? 'person-add' : 'person-add-outline';
          } else if (route.name === 'Rank') {
            iconName = focused ? 'medal' : 'medal-outline'
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: theme.colors.primary,
        inactiveTintColor: 'gray',
        style: {
          backgroundColor: '#212121'
        }
      }}
    >
      <Tab.Screen name="Home" component={Dashboard} />
      <Tab.Screen name="Rank" component={RankScreen} />
      <Tab.Screen name="Join" component={JoinScreen} />
    </Tab.Navigator>
  </NavigationContainer>
  )
}

export default memo(HomeRouter);