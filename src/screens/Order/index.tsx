import {getFoods} from '@Api/food';
import Container from '@Components/container/Container';
import ExtendedFlatlist from '@Components/scroll/ExtendedFlatlist';
import {useDebouncedCallback} from '@Hooks/useDebouncedCallback';
import {Food} from '@Models/Food';
import {useTheme} from '@react-navigation/native';
import wait from '@Utils/wait';
import {
  AddIcon,
  Center,
  Heading,
  HStack,
  Image,
  MinusIcon,
  Text,
  VStack,
} from 'native-base';
import React, {FC, useCallback, useEffect, useRef, useState} from 'react';
import {ListRenderItem, StyleSheet} from 'react-native';

interface OrderTabProps {}
const OrderTabScreen: FC<OrderTabProps> = () => {
  const {colors} = useTheme();
  const page = useRef(1);

  const [foods, setFoods] = useState<Food[]>([]);
  const [isLoading, setLoading] = useState(true);

  const getData = async () => {
    setLoading(true);

    const res = await getFoods();
    setFoods(res);
    await wait(3000);

    setLoading(false);
  };

  const loadMore = useDebouncedCallback(async () => {
    setLoading(true);

    const res = await getFoods(++page.current);
    setFoods(prev => [...prev, ...res]);

    setLoading(false);
  }, 1000);

  useEffect(() => {
    getData();
  }, []);

  const renderItem: ListRenderItem<Food> = useCallback(
    ({item, index}) => {
      return (
        <HStack bg="text.100" w="full" rounded="md" space="2" p="2">
          <Image
            source={{uri: item.image}}
            alt={item.id}
            size="16"
            rounded="md"
          />
          <VStack flex={1}>
            <Heading fontSize="lg" numberOfLines={2}>
              {item.name}
            </Heading>
            <HStack flex={1} space={1} alignItems="center">
              <Text flex={1} numberOfLines={2} color="text.400">
                {item.description}
              </Text>

              <HStack space={2}>
                <Center
                  backgroundColor="primary.800"
                  _light={{backgroundColor: 'primary.100'}}
                  borderRadius={8}
                  width="32px"
                  height="32px">
                  <MinusIcon color={colors.text} />
                </Center>
                <Center
                  borderRadius={8}
                  width="32px"
                  height="32px"
                  borderWidth={1}
                  borderColor="white">
                  <Text>2</Text>
                </Center>
                <Center
                  backgroundColor="primary.500"
                  borderRadius={8}
                  width="32px"
                  height="32px">
                  <AddIcon color={colors.text} />
                </Center>
              </HStack>
            </HStack>
          </VStack>
        </HStack>
      );
    },
    [colors.text],
  );

  return (
    <Container safeArea px={4}>
      <ExtendedFlatlist
        data={foods}
        keyExtractor={item => `${item.id} `}
        isLoading={isLoading}
        renderItem={renderItem}
        onLoadMore={loadMore}
        contentContainerStyle={styles.container}
      />
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {flexGrow: 1},
});

export default OrderTabScreen;
