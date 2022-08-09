import InitScreen from '@/screens/Initial/Initial';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import React from 'react';

const Tab = createMaterialBottomTabNavigator();

const HomeTabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={InitScreen} />
      <Tab.Screen name="Profile" component={InitScreen} />
    </Tab.Navigator>
  );
};

export default HomeTabNavigator;
