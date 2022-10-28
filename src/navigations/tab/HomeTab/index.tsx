import {Assets} from '@/constants/assets';
import HomeScreen from '@/screens/Home';
import ProfileScreen from '@/screens/Profile';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React, {useRef} from 'react';
import TabsCustom from './TabsCustom';
import {HomeTabParamList, homeTabRoute, TabBarProps} from './type';
const Tab = createBottomTabNavigator<HomeTabParamList>();

const HomeTabNavigator = () => {
  // define tabs screen
  const Tabs: TabBarProps[] = [
    {
      name: homeTabRoute.Home,
      component: HomeScreen,
      iconName: 'home',
      ref: useRef(null),
      icon: Assets.icon.home,
    },

    {
      name: homeTabRoute.Profile,
      component: ProfileScreen,
      iconName: 'account',
      ref: useRef(null),
      icon: Assets.icon.profile,
    },
    {
      name: 'Buy',
      component: ProfileScreen,
      iconName: 'account',
      ref: useRef(null),
      icon: Assets.icon.buy,
    },
    {
      name: 'Message',
      component: ProfileScreen,
      iconName: 'account',
      ref: useRef(null),
      icon: Assets.icon.message,
    },
  ];

  const _renderTab = (tab: TabBarProps) => {
    return (
      <Tab.Screen
        listeners={{
          focus: () => {
            tab.ref.current?.animate(
              {
                0: {width: '0%'},
                1: {width: '100%'},
              },
              300,
            );
          },
        }}
        key={tab.name}
        name={tab.name as any}
        component={tab.component}
      />
    );
  };

  return (
    <Tab.Navigator
      tabBar={props => <TabsCustom {...props} tabs={Tabs} />}
      screenOptions={{headerShown: false}}>
      {Tabs.map(_renderTab)}
    </Tab.Navigator>
  );
};

export default HomeTabNavigator;
