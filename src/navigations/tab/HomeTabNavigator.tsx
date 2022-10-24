import HomeScreen from '@/screens/Home';
import ProfileScreen from '@/screens/Profile';
import React from 'react';
import {
  BottomTabBarButtonProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {theme as nbTheme, useColorMode, useTheme, View} from 'native-base';
const Tab = createBottomTabNavigator();

const HomeTabNavigator = () => {
  const {colors} = useTheme();
  const {colorMode} = useColorMode();
  const backgroundBottom = colorMode === 'dark' ? '#303666' : 'white';
  const background = colorMode === 'dark' ? '#282d55' : '#F2F2F3';

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          ...styles.bottomContainer,
          ...styles.shadow,
          backgroundColor: backgroundBottom,
        },
        tabBarActiveTintColor: colors.primary[500],
        tabBarShowLabel: false,
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Plus"
        component={HomeScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="plus" color={color} size={size} />
          ),
          tabBarButton: (props: BottomTabBarButtonProps) => (
            <View style={styles.customButtonTab(background)}>
              <TouchableOpacity
                {...props}
                style={{
                  ...styles.customTab,
                  ...styles.shadow,
                  backgroundColor: colors.primary[600],
                }}>
                <MaterialCommunityIcons name="plus" size={24} color={'white'} />
              </TouchableOpacity>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
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
  customButtonTab: bg => ({
    justifyContent: 'center',
    alignItems: 'center',
    width: 68,
    height: 68,
    borderRadius: 34,
    marginTop: -34,
    backgroundColor: bg,
  }),
  customTab: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
  },
});
