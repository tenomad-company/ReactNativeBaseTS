import {getFoods} from '@/api/food';
import Container from '@/components/container/Container';
import ListTitle from '@/components/container/ListTitle';
import IFlatList from '@/components/scroll/Flatlist';
import {Food} from '@/models/Food';
import {useTheme} from '@react-navigation/native';
import {AddIcon, Center, Divider, HStack, MinusIcon, Text} from 'native-base';
import React, {FC, useEffect, useRef, useState} from 'react';

interface OrderTabProps {}
const OrderTabScreen: FC<OrderTabProps> = () => {
  const {colors} = useTheme();
  const scrollRef = useRef(null);

  const [foods, setFoods] = useState<Food[]>([]);

  const getData = async () => {
    const res = await getFoods();
    setFoods(res);
    console.log(res);
  };

  useEffect(() => {
    getData();
  }, []);

  const _buildRightComponents = () => (
    <HStack
      justifyContent={'center'}
      alignItems={'center'}
      space={2}
      alignSelf={'flex-end'}>
      <Center
        backgroundColor="primary.800"
        borderRadius={8}
        width={'32px'}
        height={'32px'}>
        <MinusIcon color={colors.text} />
      </Center>
      <Center
        borderRadius={8}
        width={'32px'}
        height={'32px'}
        borderWidth={1}
        borderColor={'white'}>
        <Text>2</Text>
      </Center>
      <Center
        backgroundColor="primary.500"
        borderRadius={8}
        width={'32px'}
        height={'32px'}>
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
        renderItem={({item, index}) => (
          <>
            <ListTitle
              key={index}
              title={item.name}
              subTitle="Shop name"
              marginLeft={4}
              marginRight={4}
              source={{
                uri: 'https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
              }}
              rightComponent={_buildRightComponents()}
            />
            <Divider opacity={0.3} />
          </>
        )}
      />
    </Container>
  );
};

export default OrderTabScreen;
