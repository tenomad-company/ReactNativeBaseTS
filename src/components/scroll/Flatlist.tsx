import {showTabBar} from '@Redux/system';
import {Center, FlatList, Text, View} from 'native-base';
import {IFlatListProps as IBaseFlatListProps} from 'native-base/lib/typescript/components/basic/FlatList';
import React, {useCallback} from 'react';
import {
  ActivityIndicator,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native';
import {useDispatch} from 'react-redux';

interface IFlatListProps<T> extends IBaseFlatListProps<T> {
  scrollRef: any;
  loadMore?: () => void;
  endPage?: boolean;
}

const IFlatList = <T extends {}>({
  scrollRef,
  loadMore,
  endPage,
  ...props
}: IFlatListProps<T>) => {
  const dispatch = useDispatch();

  const isCloseToBottom = useCallback(
    ({layoutMeasurement, contentOffset, contentSize}: NativeScrollEvent) => {
      const paddingToBottom = 20;

      return (
        layoutMeasurement.height + contentOffset.y >=
        contentSize.height - paddingToBottom
      );
    },
    [],
  );

  const onEndReached = useCallback(
    ({distanceFromEnd}) => {
      if (distanceFromEnd < 100 && !endPage) loadMore?.();
    },
    [endPage, loadMore],
  );

  const onScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const currentPosition = event.nativeEvent.contentOffset.y;
      if (currentPosition < 0) return;

      const isEndPage = isCloseToBottom(event.nativeEvent);
      const isScrollTop = scrollRef.current - currentPosition >= 0;

      if (isEndPage && !!currentPosition) dispatch(showTabBar(false));
      else dispatch(showTabBar(isScrollTop));

      setTimeout(() => {
        scrollRef.current = currentPosition;
      }, 400);
    },
    [dispatch, isCloseToBottom, scrollRef],
  );

  const renderFooter = useCallback(() => {
    if (endPage) {
      return (
        <Center p={4}>
          <Text>End Page</Text>
        </Center>
      );
    }

    if (!loadMore) return <View />;

    return (
      <Center p={4}>
        <ActivityIndicator />
      </Center>
    );
  }, [endPage, loadMore]);

  return (
    <FlatList
      onScroll={onScroll}
      onEndReachedThreshold={0.01}
      onEndReached={onEndReached}
      ListFooterComponent={renderFooter}
      {...props}
    />
  );
};

export default IFlatList;
