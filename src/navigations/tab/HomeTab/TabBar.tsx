import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import {useTheme} from '@react-navigation/native';
import {AppColor} from '@Styles/index';
import React, {useReducer} from 'react';
import {LayoutChangeEvent, StyleSheet, View} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from 'react-native-reanimated';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import TabBarComponent from './TabComponent';

export default function TabBar({
  state: {index: activeIndex, routes},
  navigation,
  descriptors,
}: BottomTabBarProps) {
  const {bottom} = useSafeAreaInsets();
  const {colors, dark} = useTheme();

  // get information about the components position on the screen -----

  const reducer = (state: any, action: {x: number; index: number}) => {
    // Add the new value to the state
    return [...state, {x: action.x, index: action.index}];
  };

  const [layout, dispatch] = useReducer(reducer, []);

  const handleLayout = (event: LayoutChangeEvent, index: number) => {
    dispatch({x: event.nativeEvent.layout.x, index});
  };

  // animations ------------------------------------------------------

  const xOffset = useDerivedValue(() => {
    if (layout.length !== routes.length) return 0;
    return [...layout].find(({index}) => index === activeIndex)!.x;
  }, [activeIndex, layout]);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      // translateX to the calculated offset with a smooth transition
      transform: [{translateX: withTiming(xOffset.value, {duration: 250})}],
    };
  });

  return (
    <View
      style={[
        styles.tabBar,
        {paddingBottom: bottom, backgroundColor: colors.card},
      ]}>
      <Animated.View style={[styles.activeBackground, animatedStyles]}>
        <View
          style={[
            styles.activeBtn,
            {backgroundColor: AppColor.primary[dark ? 900 : 100]},
          ]}
        />
      </Animated.View>

      <View style={styles.tabBarContainer}>
        {routes.map((route, index) => {
          const active = index === activeIndex;
          const {options} = descriptors[route.key];

          return (
            <TabBarComponent
              key={route.key}
              name={route.name}
              active={active}
              options={options}
              onLayout={e => handleLayout(e, index)}
              onPress={() => navigation.navigate(route.name)}
            />
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  tabBar: {},
  activeBackground: {
    position: 'absolute',
    height: '100%',
    width: '25%',
  },
  activeBtn: {
    backgroundColor: AppColor.primary[100],
    borderRadius: 8,
    margin: 8,
    flex: 1,
  },
  tabBarContainer: {
    flexDirection: 'row',
  },
});
