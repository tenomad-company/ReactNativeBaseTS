import {showTabBar} from '@/redux/system';
import {FlatList} from 'native-base';
import {InterfaceFlatListProps} from 'native-base/lib/typescript/components/basic/FlatList/types';
import React, {FC} from 'react';
import {NativeScrollEvent, NativeSyntheticEvent} from 'react-native';
import {useDispatch} from 'react-redux';

const IFlatList: FC<InterfaceFlatListProps<any> & {scrollRef: any}> = ({
  scrollRef,
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

  return <FlatList onScroll={handleScroll} onEndReached={} {...props} />;
};

export default IFlatList;
