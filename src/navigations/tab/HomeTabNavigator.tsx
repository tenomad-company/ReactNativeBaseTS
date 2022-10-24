import {colors as AppColor} from '@/constants/style';

import HomeScreen from '@/screens/Home';
import ProfileScreen from '@/screens/Profile';
import {
  BottomTabBarButtonProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {useColorMode, View} from 'native-base';
import React, {ClassicComponent, useRef} from 'react';
import {StyleSheet, TouchableOpacity, ViewProps, ViewStyle} from 'react-native';
import * as Animatable from 'react-native-animatable';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createBottomTabNavigator();

const HomeTabNavigator = () => {
  const {colorMode} = useColorMode();

  const backgroundBottom =
    colorMode === 'dark'
      ? AppColor.onBackground.dark
      : AppColor.onBackground.light;
  const background =
    colorMode === 'dark' ? AppColor.background.dark : AppColor.background.light;

  const homeRef = useRef<ClassicComponent<
    Animatable.AnimatableProperties<ViewStyle> & ViewProps,
    any
  > | null>(null);
  const profileRef = useRef<ClassicComponent<
    Animatable.AnimatableProperties<ViewStyle> & ViewProps,
    any
  > | null>(null);
  const plusRef = useRef<ClassicComponent<
    Animatable.AnimatableProperties<ViewStyle> & ViewProps,
    any
  > | null>(null);
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
      }}
      screenListeners={{
        state: e => {
          switch (e?.data?.state?.index) {
            case 1:
              plusRef?.current?.rotate(800);
              break;
            case 0:
              homeRef?.current?.bounceIn(400);
              break;
            default:
              profileRef?.current?.bounceIn(400);
              break;
          }
        },
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({focused, color, size}) => {
            if (!focused) {
              return (
                <MaterialCommunityIcons name="home" color={color} size={size} />
              );
            }
            return (
              <Animatable.View ref={_ref => (homeRef.current = _ref)}>
                <View alignItems="center">
                  <MaterialCommunityIcons
                    name="home"
                    color={color}
                    size={size}
                  />
                  <View style={styles.activeTab} />
                </View>
              </Animatable.View>
            );
          },
        }}
      />
      <Tab.Screen
        name="Plus"
        component={HomeScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <Animatable.View ref={profileRef}>
              <MaterialCommunityIcons name="plus" color={color} size={size} />
            </Animatable.View>
          ),
          tabBarButton: (props: BottomTabBarButtonProps) => (
            <View
              style={{...styles.customButtonTab, backgroundColor: background}}>
              <Animatable.View ref={_ref => (plusRef.current = _ref)}>
                <TouchableOpacity
                  {...props}
                  style={{
                    ...styles.customTab,
                    ...styles.shadow,
                    backgroundColor: AppColor.primary[500],
                  }}>
                  <MaterialCommunityIcons
                    name="plus"
                    size={24}
                    color={'white'}
                  />
                </TouchableOpacity>
              </Animatable.View>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({focused, color, size}) => {
            if (!focused) {
              return (
                <MaterialCommunityIcons
                  name="account"
                  color={color}
                  size={size}
                />
              );
            }
            return (
              <Animatable.View ref={_ref => (profileRef.current = _ref)}>
                <View alignItems="center">
                  <MaterialCommunityIcons
                    name="account"
                    color={color}
                    size={size}
                  />
                  <View style={styles.activeTab} />
                </View>
              </Animatable.View>
            );
          },
        }}
      />
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
