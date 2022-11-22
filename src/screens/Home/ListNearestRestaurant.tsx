import {Food} from '@/models/Food';
import {widthNoSpace} from '@/styles/mixins';
import {HALF_WIDTH} from '@/styles/spacing';
import {
  AspectRatio,
  FlatList,
  Heading,
  Image,
  Spacer,
  Text,
  VStack,
} from 'native-base';
import React, {useCallback} from 'react';

type Props = {
  data?: Food[];
};

const ListNearestRestaurant = ({data}: Props) => {
  const renderItem = useCallback(({item}) => {
    return (
      <VStack
        key={item.id}
        p={3}
        space={8}
        w={widthNoSpace(HALF_WIDTH, '4')}
        borderRadius="xl"
        backgroundColor={'white'}
        _dark={{backgroundColor: 'dark.600'}}>
        <AspectRatio ratio={96 / 73}>
          <Image
            key={item.id}
            alt={item.name}
            source={{uri: item.image}}
            borderRadius="xl"
          />
        </AspectRatio>
        <VStack>
          <Heading fontSize="md" alignSelf="center" numberOfLines={1}>
            {item.name}
          </Heading>
          <Text
            fontSize="sm"
            color="gray.400"
            fontWeight="light"
            alignSelf="center">
            {8} mins
          </Text>
        </VStack>
      </VStack>
    );
  }, []);

  return (
    <FlatList
      data={data}
      nestedScrollEnabled={true}
      showsHorizontalScrollIndicator={false}
      horizontal
      keyExtractor={(item, index) => `${item.id || index}`}
      w="full"
      px={4}
      ItemSeparatorComponent={() => <Spacer w="4" />}
      renderItem={renderItem}
    />
  );
};

export default React.memo(ListNearestRestaurant);
