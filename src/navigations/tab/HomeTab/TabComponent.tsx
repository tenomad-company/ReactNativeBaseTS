import {BottomTabNavigationOptions} from '@react-navigation/bottom-tabs';
import {useTheme} from '@react-navigation/native';
import {Heading, Pressable, Text} from 'native-base';
import React from 'react';
import {LayoutChangeEvent, StyleSheet} from 'react-native';
import Animated, {useAnimatedStyle, withTiming} from 'react-native-reanimated';

type TabBarComponentProps = {
  active?: boolean;
  name?: string;
  options: BottomTabNavigationOptions;
  onLayout: (e: LayoutChangeEvent) => void;
  onPress: () => void;
};

export default function TabComponent({
  active,
  name,
  options,
  onLayout,
  onPress,
}: TabBarComponentProps) {
  const {colors} = useTheme();

  const label =
    options.tabBarLabel !== undefined
      ? options.tabBarLabel
      : options.title !== undefined
      ? options.title
      : name;

  const animatedComponentCircleStyles = useAnimatedStyle(() => {
    return {
      backgroundColor: colors.card,
      transform: [
        {
          scale: withTiming(active ? 1 : 0, {duration: 250}),
        },
      ],
    };
  });

  const animatedIconContainerStyles = useAnimatedStyle(() => {
    return {
      opacity: withTiming(active ? 1 : 0.5, {duration: 250}),
    };
  });

  const animatedTextContainerStyles = useAnimatedStyle(() => {
    return {
      marginTop: active ? 4 : 0,
      height: active ? 'auto' : 0,
      transform: [
        {
          scale: withTiming(active ? 1 : 0, {duration: 250}),
        },
      ],
    };
  });

  return (
    <Pressable onPress={onPress} onLayout={onLayout} style={styles.component}>
      <Animated.View
        style={[styles.componentCircle, animatedComponentCircleStyles]}
      />
      <Animated.View
        style={[styles.iconContainer, animatedIconContainerStyles]}>
        {options.tabBarIcon ? (
          options.tabBarIcon({focused: !!active, color: 'white', size: 18})
        ) : (
          <Text>?</Text>
        )}
        <Animated.View
          style={[styles.textContainer, animatedTextContainerStyles]}>
          <Heading fontSize="10" textAlign="center">
            {label}
          </Heading>
        </Animated.View>
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  component: {
    height: 60,
    width: 60,
    padding: 4,
    marginTop: -2,
    marginBottom: 2,
  },
  componentCircle: {
    flex: 1,
    borderRadius: 30,
    backgroundColor: 'white',
  },
  iconContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {},
  icon: {
    height: 36,
    width: 36,
  },
});
