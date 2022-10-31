/* eslint-disable react-hooks/exhaustive-deps */
import {useAppSelector} from '@/redux/hooks';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import {useTheme} from '@react-navigation/native';
import {Image, Text, View} from 'native-base';
import React, {useEffect, useRef} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import * as Animatable from 'react-native-animatable';

import {TabBarProps} from './type';
interface TabsCustomProps {
  tabs: TabBarProps[];
}

export default function TabsCustom(props: BottomTabBarProps & TabsCustomProps) {
  const {colors} = useTheme();

  const {state, descriptors, navigation, tabs} = props;
  const isShowTab = useAppSelector(store => store.system.showTabBar);

  const tabRef = useRef<Animatable.View & View>(null);

  useEffect(() => {
    if (!isShowTab) {
      tabRef.current?.animate(
        {
          0: {marginBottom: 0},
          1: {marginBottom: -200},
        },
        400,
      );
    } else {
      tabRef.current?.animate(
        {
          1: {marginBottom: 0},
          0: {marginBottom: -200},
        },
        400,
      );
    }

    console.log('[TabsCustom] isShowTab: ', isShowTab);
  }, [isShowTab]);

  useEffect(() => {
    _handleAnimationTab(state.index);
  }, [state]);

  const _handleAnimationTab = (index: number) =>
    /// animation when selecting tab
    /// read more: https://github.com/oblador/react-native-animatable
    tabs[index].ref.current?.animate(
      {
        0: {width: '0%', opacity: 0, marginTop: 0},
        1: {width: '100%', opacity: 1, marginTop: -30},
      },
      400,
    );

  const getItem = ({isFocused = false, label = '', source = undefined}) => {
    if (!isFocused) {
      return (
        <Image alt={label} source={source} size={5} resizeMode="contain" />
      );
    }

    return (
      <>
        <View
          width="56px"
          height="56px"
          borderRadius="full"
          alignItems={'center'}
          justifyContent="center"
          shadow={1}
          _dark={{
            backgroundColor: 'primary.800',
          }}
          backgroundColor={'primary.500'}>
          <Image
            alt={label}
            source={source}
            size={5}
            resizeMode="contain"
            tintColor={colors.text}
          />
        </View>
        <Text fontWeight="bold" color={'primary.400'} marginTop={2}>
          {label}
        </Text>
      </>
    );
  };

  return (
    <Animatable.View
      style={[styles.container, {backgroundColor: colors.card}]}
      ref={_ref => (tabRef.current = _ref)}>
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
            navigation.navigate(route.name, {merge: true});
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
    </Animatable.View>
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
  item: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
