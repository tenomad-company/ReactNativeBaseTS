import {showTabBar} from '@/redux/system';
import {Center, FlatList, Text, View} from 'native-base';
import {InterfaceFlatListProps} from 'native-base/lib/typescript/components/basic/FlatList/types';
import React, {FC} from 'react';
import {
  ActivityIndicator,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native';
import {useDispatch} from 'react-redux';

interface IFlatListProps {
  scrollRef: any;
  loadMore?: () => void;
  endPage?: boolean;
}
const IFlatList: FC<InterfaceFlatListProps<any> & IFlatListProps> = ({
  scrollRef,
  loadMore,
  endPage,
  ...props
}) => {
  const dispatch = useDispatch();
  const isCloseToBottom = ({
    layoutMeasurement,
    contentOffset,
    contentSize,
  }: NativeScrollEvent) => {
    const paddingToBottom = 20;

    return (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
    );
  };

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const currentPosition = event.nativeEvent.contentOffset.y;

    if (currentPosition < 0) return;
    const isEndPage = isCloseToBottom(event.nativeEvent);
    const isScrollTop = scrollRef.current - currentPosition >= 0;
    if (isEndPage && !!currentPosition) {
      dispatch(showTabBar(false));
    } else {
      dispatch(showTabBar(isScrollTop));
    }

    setTimeout(() => {
      scrollRef.current = currentPosition;
    }, 400);
  };

  const _buildFooter = () => {
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
  };

  return (
    <FlatList
      onScroll={handleScroll}
      onEndReachedThreshold={0.01}
      onEndReached={info => {
        if (info.distanceFromEnd < 100 && !endPage) {
          !!loadMore ?? loadMore!();
        }
      }}
      ListFooterComponent={_buildFooter()}
      {...props}
    />
  );
};

export default IFlatList;
