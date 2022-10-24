import HomeScreen from '@/screens/Home';
import ProfileScreen from '@/screens/Profile';
import {AppColor} from '@/styles';
import {
  BottomTabBarButtonProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {useColorMode, View} from 'native-base';
import React, {useRef} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import * as Animatable from 'react-native-animatable';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {HomeTabParamList, homeTabRoute} from './type';

const Tab = createBottomTabNavigator<HomeTabParamList>();

type HomeTabRouteIconMap = {
  [key in keyof HomeTabParamList]: string;
};

interface TabProps {
  name: string;
  iconName: string;
  component: React.ComponentType<any>;
  ref: any;
}

const HomeTabNavigator = () => {
  const {colorMode} = useColorMode();

  const backgroundBottom =
    colorMode === 'dark'
      ? AppColor.onBackground.dark
      : AppColor.onBackground.light;
  const background =
    colorMode === 'dark' ? AppColor.background.dark : AppColor.background.light;

  // define tabs screen
  const Tabs: TabProps[] = [
    {
      name: homeTabRoute.Home,
      component: HomeScreen,
      iconName: 'home',
      ref: useRef(null),
    },
    {
      name: homeTabRoute.Plus,
      component: HomeScreen,
      iconName: 'plus',
      ref: useRef(null),
    },
    {
      name: homeTabRoute.Profile,
      component: ProfileScreen,
      iconName: 'account',
      ref: useRef(null),
    },
  ];

  const _renderTab = (tab: TabProps, index: number) => {
    let customButton =
      index === 1
        ? {
            tabBarButton: (props: BottomTabBarButtonProps) => (
              <View
                style={{
                  ...styles.customButtonTab,
                  backgroundColor: background,
                }}>
                <Animatable.View ref={_ref => (tab.ref.current = _ref)}>
                  <TouchableOpacity
                    {...props}
                    style={{
                      ...styles.customTab,
                      ...styles.shadow,
                      backgroundColor: AppColor.primary[500],
                    }}>
                    <MaterialCommunityIcons
                      name={tab.iconName}
                      size={24}
                      color={'white'}
                    />
                  </TouchableOpacity>
                </Animatable.View>
              </View>
            ),
          }
        : null;
    return (
      <Tab.Screen
        listeners={{
          focus: () => {
            // change more animation https://github.com/oblador/react-native-animatable
            if (index === 1) {
              tab.ref.current?.rotate(400);
            } else {
              tab.ref.current?.flipInY(400);
            }
          },
        }}
        key={tab.name}
        name={tab.name}
        component={tab.component}
        options={{
          tabBarIcon: ({focused, color, size}) => {
            if (!focused) {
              return (
                <MaterialCommunityIcons
                  name={tab.iconName}
                  color={color}
                  size={size}
                />
              );
            }
            return (
              <Animatable.View ref={_ref => (tab.ref.current = _ref)}>
                <View alignItems="center">
                  <MaterialCommunityIcons
                    name={tab.iconName}
                    color={color}
                    size={size}
                  />
                  <View style={styles.activeTab} />
                </View>
              </Animatable.View>
            );
          },
          ...customButton,
        }}
      />
    );
  };

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          ...styles.bottomContainer,
          ...styles.shadow,
          backgroundColor: backgroundBottom,
        },
        tabBarActiveTintColor: AppColor.primary[500],
        tabBarShowLabel: false,
      }}>
      {Tabs.map(_renderTab)}
    </Tab.Navigator>
  );
};

export default HomeTabNavigator;

const styles = StyleSheet.create({
  bottomContainer: {
    position: 'absolute',
    bottom: 12,
    left: 12,
    right: 12,
    height: 64,
    borderRadius: 12,
    elevation: 0,
  },

  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
  },
  customButtonTab: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 68,
    height: 68,
    borderRadius: 34,
    marginTop: -34,
  },
  customTab: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
  },
  activeTab: {
    borderRadius: 4,
    width: 8,
    height: 8,
    margin: 8,
    backgroundColor: AppColor.primary[400],
  },
});
