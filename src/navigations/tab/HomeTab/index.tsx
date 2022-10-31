import {Assets} from '@/constants/assets';
import ChatTabScreen from '@/screens/Chat/ChatTab';
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
      ref: useRef(null),
      icon: Assets.icon.home,
    },

    {
      name: homeTabRoute.Profile,
      component: ProfileScreen,
      ref: useRef(null),
      icon: Assets.icon.profile,
    },
    {
      name: homeTabRoute.Buy,
      component: ProfileScreen,
      ref: useRef(null),
      icon: Assets.icon.buy,
    },
    {
      name: homeTabRoute.Chat,
      component: ChatTabScreen,
      ref: useRef(null),
      icon: Assets.icon.message,
    },
  ];

  const _renderTab = (tab: TabBarProps) => {
    return (
      <Tab.Screen
        key={tab.name}
        name={tab.name as any}
        component={tab.component}
        listeners={{
          blur: () => {
            tab.ref.current?.animate(
              {
                0: {width: '0%', opacity: 0, marginTop: -30},
                1: {width: '100%', opacity: 1, marginTop: 0},
              },
              400,
            );
          },
        }}
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
