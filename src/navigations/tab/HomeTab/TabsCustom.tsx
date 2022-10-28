import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import {useTheme} from '@react-navigation/native';
import {HStack, Image, Text, View} from 'native-base';
import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {TabBarProps} from './type';
interface TabsCustomProps {
  tabs: TabBarProps[];
}

export default function TabsCustom(props: BottomTabBarProps & TabsCustomProps) {
  const {colors} = useTheme();
  const {state, descriptors, navigation, tabs} = props;

  const getItem = ({isFocused = false, label = '', source = undefined}) => {
    if (!isFocused) {
      return (
        <Image alt={label} source={source} size="20px" resizeMode="contain" />
      );
    }

    return (
      <HStack
        space={2}
        padding="16px"
        borderRadius={'12px'}
        _dark={{
          backgroundColor: 'primary.800',
        }}
        backgroundColor={'primary.100'}>
        <Image alt={label} source={source} size="20px" resizeMode="contain" />
        <Text color={colors.text}>{label}</Text>
      </HStack>
    );
  };

  return (
    <View style={[styles.container, {backgroundColor: colors.card}]}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate({name: route.name, merge: true});
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={route.key}
            hitSlop={{top: 12, bottom: 12, right: 24, left: 24}}
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}>
            <Animatable.View
              ref={_ref => (tabs[index].ref.current = _ref)}
              style={styles.item}>
              {getItem({
                label: `${label}`,
                source: tabs[index].icon,
                isFocused,
              })}
            </Animatable.View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
    position: 'absolute',
    bottom: 16,
    right: 16,
    left: 16,
    height: 72,
    borderRadius: 20,
    shadowColor: '#2e312e',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,

    elevation: 12,
  },
  item: {flex: 1, justifyContent: 'center', alignItems: 'center'},
});
