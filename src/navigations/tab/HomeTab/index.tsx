import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Image} from 'native-base';
import React from 'react';

import {Assets} from '@/constants/assets';
import ChatTabScreen from '@/screens/Chat/ChatTab';
import HomeScreen from '@/screens/Home';
import OrderTabScreen from '@/screens/Order';
import ProfileScreen from '@/screens/Profile';
import TabBar from './TabBar';
import {HomeTabParamList, homeTabRoute} from './type';

const Tab = createBottomTabNavigator<HomeTabParamList>();

const HomeTabNavigator = () => {
  return (
    <Tab.Navigator
      tabBar={props => <TabBar {...props} />}
      screenOptions={{headerShown: false}}>
      <Tab.Screen
        key={homeTabRoute.Home}
        name={homeTabRoute.Home}
        component={HomeScreen}
        options={{
          tabBarIcon: ({size}) => (
            <Image
              key={homeTabRoute.Home}
              alt={homeTabRoute.Home}
              source={Assets.icon.home}
              h={size}
              w={size}
            />
          ),
        }}
      />
      <Tab.Screen
        key={homeTabRoute.Profile}
        name={homeTabRoute.Profile}
        component={ProfileScreen}
        options={{
          tabBarIcon: ({size}) => (
            <Image
              key={homeTabRoute.Profile}
              alt={homeTabRoute.Profile}
              source={Assets.icon.profile}
              h={size}
              w={size}
            />
          ),
        }}
      />
      <Tab.Screen
        key={homeTabRoute.Order}
        name={homeTabRoute.Order}
        component={OrderTabScreen}
        options={{
          tabBarIcon: ({size}) => (
            <Image
              key={homeTabRoute.Order}
              alt={homeTabRoute.Order}
              source={Assets.icon.buy}
              h={size}
              w={size}
            />
          ),
        }}
      />
      <Tab.Screen
        key={homeTabRoute.Chat}
        name={homeTabRoute.Chat}
        component={ChatTabScreen}
        options={{
          tabBarIcon: ({size}) => (
            <Image
              key={homeTabRoute.Chat}
              alt={homeTabRoute.Chat}
              source={Assets.icon.message}
              h={size}
              w={size}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default HomeTabNavigator;
