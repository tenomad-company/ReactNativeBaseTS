import {
  Center,
  FlatList,
  Heading,
  HStack,
  Icon,
  Skeleton,
  Spacer,
  Text,
  VStack,
} from 'native-base';
import {IFlatListProps as IBaseFlatListProps} from 'native-base/lib/typescript/components/basic/FlatList';
import React, {useCallback} from 'react';
import {StyleSheet} from 'react-native';

import Logo from '@Assets/icons/logo.svg';

interface IEFlatListProps<T> extends IBaseFlatListProps<T> {
  renderPlaceholder?: (key: any) => JSX.Element;
  renderEmpty?: () => JSX.Element;
  emptyTitle?: string;
  onLoadMore?: () => void;
  isLoading?: boolean;
  endPage?: boolean;
}

const ExtendedFlatlist = <T extends {}>({
  onLoadMore,
  isLoading,
  endPage,
  renderPlaceholder,
  renderEmpty,
  emptyTitle = "There's no item here",
  ...otherProps
}: IEFlatListProps<T>) => {
  const onEndReached = useCallback(
    ({distanceFromEnd}) => {
      if (!endPage && distanceFromEnd < 100) onLoadMore?.();
    },
    [endPage, onLoadMore],
  );

  const _renderPlaceholder = useCallback(
    key => (
      <HStack key={key} bg="text.100" w="full" rounded="md" space="2" p="2">
        <Skeleton size="16" rounded="lg" />
        <Skeleton.Text w="3/4" />
      </HStack>
    ),
    [],
  );

  const _renderEmpty = useCallback(() => {
    if (isLoading) {
      return (
        <VStack space={4}>
          {[...Array(10).keys()].map(renderPlaceholder || _renderPlaceholder)}
        </VStack>
      );
    }

    if (renderEmpty) return renderEmpty();

    return (
      <Center flex={1}>
        <Icon as={Logo} opacity={0.6} tintColor="primary.100" />
        <Heading size="sm" color="text.300">
          {emptyTitle}
        </Heading>
      </Center>
    );
  }, [
    isLoading,
    renderEmpty,
    emptyTitle,
    renderPlaceholder,
    _renderPlaceholder,
  ]);

  const _renderFooter = useCallback(() => {
    if (isLoading) {
      return (
        <VStack space={4} py="4">
          {[...Array(1).keys()].map(renderPlaceholder || _renderPlaceholder)}
        </VStack>
      );
    }

    if (endPage) {
      return (
        <Center p={4}>
          <Text>End Page</Text>
        </Center>
      );
    }

    return <Spacer h="4" />;
  }, [endPage, isLoading, renderPlaceholder, _renderPlaceholder]);

  return (
    <FlatList
      onEndReachedThreshold={0.01}
      onEndReached={onEndReached}
      contentContainerStyle={styles.container}
      ListEmptyComponent={_renderEmpty}
      ListFooterComponent={_renderFooter}
      ItemSeparatorComponent={() => <Spacer h="4" />}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      {...otherProps}
    />
  );
};

const styles = StyleSheet.create({
  container: {flexGrow: 1},
});

export default ExtendedFlatlist;
