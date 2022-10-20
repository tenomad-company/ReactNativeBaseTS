import HomeScreen from '@/screens/Home';
import ProfileScreen from '@/screens/Profile';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {HomeTabParamList} from './type';

const Tab = createMaterialBottomTabNavigator<HomeTabParamList>();

type HomeTabRouteIconMap = {
  [key in keyof HomeTabParamList]: string;
};

const HomeTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({color}) => {
          const icons: HomeTabRouteIconMap = {Home: 'home', Profile: 'account'};
          return (
            <MaterialCommunityIcons
              name={icons[route.name]}
              color={color}
              size={24}
            />
          );
        },
      })}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default HomeTabNavigator;
