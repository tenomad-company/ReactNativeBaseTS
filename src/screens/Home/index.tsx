import {getFoodsApi} from '@/redux/food';
import {useAppDispatch, useAppSelector} from '@/redux/hooks';
import {
  AspectRatio,
  Box,
  Button,
  FlatList,
  Heading,
  HStack,
  Image,
  ScrollView,
  Skeleton,
  Spacer,
  Text,
  VStack,
} from 'native-base';
import React, {useCallback, useEffect, useRef} from 'react';
import {useTranslation} from 'react-i18next';
import {RefreshControl} from 'react-native';

const HomeScreen = () => {
  const {t, i18n} = useTranslation();
  const dispatch = useAppDispatch();
  const food = useAppSelector(state => state.food);
  const isRendered = useRef(false);

  const changeLanguage = useCallback(() => {
    i18n.changeLanguage('en');
  }, [i18n]);

  const reload = useCallback(() => dispatch(getFoodsApi()), [dispatch]);

  useEffect(() => {
    reload();
    isRendered.current = true;
  }, [reload]);

  return (
    <Box safeArea flex={1} p={2} mb={50}>
      <ScrollView
        flex={1}
        flexGrow={1}
        nestedScrollEnabled={true}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isRendered.current && food.loading}
            onRefresh={reload}
          />
        }>
        <VStack mt={4} space={8} overflow="hidden" rounded="md">
          <Heading size="sm">Address, District, City, Country</Heading>

          <Box>
            <FlatList
              data={food.list}
              scrollEnabled={false}
              nestedScrollEnabled={true}
              keyExtractor={(item, index) => `${item.id || index}`}
              ItemSeparatorComponent={() => <Spacer h="2" />}
              renderItem={({item, index}) => {
                return (
                  <HStack rounded="lg" space={2}>
                    <Box flex={1}>
                      <AspectRatio ratio={1}>
                        <Image
                          key={item.name}
                          source={{uri: item.image}}
                          alt={item.name}
                          rounded="lg"
                        />
                      </AspectRatio>
                    </Box>
                    <Box flex={3}>
                      <Heading fontSize="md" lineHeight="20px">
                        {item.name}
                      </Heading>
                      <Text fontSize="sm" color="gray.500" numberOfLines={3}>
                        {item.description}
                      </Text>
                    </Box>
                  </HStack>
                );
              }}
            />
          </Box>

          {/* <Skeleton.Text lines={4} isLoaded={!food.loading}>
            <Text fontSize={'md'} lineHeight={'20px'}>
              {'aaaaaaaaa'}
            </Text>
          </Skeleton.Text> */}
          <Skeleton
            mb="4"
            rounded="md"
            startColor="primary.100"
            isLoaded={!food.loading}>
            <Button onPress={changeLanguage}>Change language</Button>
          </Skeleton>
        </VStack>
      </ScrollView>
    </Box>
  );
};

export default HomeScreen;
