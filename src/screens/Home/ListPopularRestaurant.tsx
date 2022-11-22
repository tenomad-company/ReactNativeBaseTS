import {Food} from '@/models/Food';
import {widthNoSpace} from '@/styles/mixins';
import {HALF_WIDTH} from '@/styles/spacing';
import {AspectRatio, Center, Heading, Image, Text, VStack} from 'native-base';
import React, {useCallback} from 'react';

type Props = {
  data?: Food[];
};

const ListPopularRestaurant = ({data}: Props) => {
  const renderItem = useCallback(({item}) => {
    return (
      <VStack
        key={item.id}
        p={3}
        mb={3}
        space={8}
        w={widthNoSpace(HALF_WIDTH, '3')}
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
    <Center
      mx={4}
      flexWrap="wrap"
      flexDirection="row"
      justifyContent="space-between">
      {data?.map((item, index) => renderItem({item, index}))}
    </Center>
  );
};

export default React.memo(ListPopularRestaurant);
