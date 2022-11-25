import {getFoods} from '@Api/food';
import Container from '@Components/container/Container';
import ListTitle from '@Components/container/ListTitle';
import IFlatList from '@Components/scroll/Flatlist';
import {useDebouncedCallback} from '@Hooks/useDebouncedCallback';
import {Food} from '@Models/Food';
import {useTheme} from '@react-navigation/native';
import {AddIcon, Center, Divider, HStack, MinusIcon, Text} from 'native-base';
import React, {FC, useEffect, useRef, useState} from 'react';

interface OrderTabProps {}
const OrderTabScreen: FC<OrderTabProps> = () => {
  const {colors} = useTheme();
  const scrollRef = useRef(null);
  const page = useRef(1);

  const [foods, setFoods] = useState<Food[]>([]);

  const getData = async () => {
    const res = await getFoods();
    setFoods(res);
  };

  const loadMore = useDebouncedCallback(async () => {
    const res = await getFoods(++page.current);
    setFoods(prev => [...prev, ...res]);
  });

  useEffect(() => {
    getData();
  }, []);

  const _buildRightComponents = () => (
    <HStack
      space={2}
      justifyContent="center"
      alignItems="center"
      alignSelf="flex-end">
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
  );

  return (
    <Container safeArea>
      <IFlatList
        scrollRef={scrollRef}
        data={foods}
        keyExtractor={item => `${item.id} `}
        ItemSeparatorComponent={() => <Divider opacity={0} />}
        renderItem={({item, index}) => (
          <ListTitle
            key={index}
            title={item.name}
            subTitle="Shop name"
            marginLeft={4}
            marginRight={4}
            source={{uri: item.image}}
            rightComponent={_buildRightComponents()}
          />
        )}
        loadMore={loadMore}
      />
    </Container>
  );
};

export default OrderTabScreen;
