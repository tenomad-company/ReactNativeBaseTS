import {Food} from '@Models/Food';
import {widthNoSpace} from '@Styles/mixins';
import {FULL_WIDTH} from '@Styles/spacing';
import {
  AspectRatio,
  Center,
  Heading,
  HStack,
  Image,
  Text,
  VStack,
} from 'native-base';
import React, {useCallback} from 'react';

type Props = {
  data?: Food[];
};

const ListPopularMenu = ({data}: Props) => {
  const renderItem = useCallback(({item}) => {
    return (
      <HStack
        key={item.id}
        p={2}
        mb={3}
        space={3}
        w={widthNoSpace(FULL_WIDTH, '4')}
        borderRadius="xl"
        backgroundColor={'white'}
        _dark={{backgroundColor: 'dark.600'}}>
        <VStack flex={1} justifyContent="center">
          <AspectRatio ratio={1}>
            <Image
              key={item.id}
              alt={item.name}
              source={{uri: item.image}}
              borderRadius="xl"
            />
          </AspectRatio>
        </VStack>
        <VStack flex={3} justifyContent="center">
          <Heading fontSize="md" numberOfLines={1}>
            {item.name}
          </Heading>
          <Text fontSize="sm" color="gray.400" numberOfLines={1}>
            {item.description}
          </Text>
        </VStack>
        <VStack flex={1} mr={2} justifyContent="center" alignItems="flex-end">
          <Heading fontSize="lg" color="amber.500" numberOfLines={1}>
            ${10}
          </Heading>
        </VStack>
      </HStack>
    );
  }, []);

  return (
    <Center mx={4} flexWrap="wrap" flexDirection="row">
      {data?.map((item, index) => renderItem({item, index}))}
    </Center>
  );
};

export default React.memo(ListPopularMenu);
