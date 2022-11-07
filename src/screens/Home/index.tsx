import {getPromotion} from '@/api/promotion';
import usePageAutoScroll from '@/hooks/usePageAutoScroll';
import {Promotion} from '@/models/Promotion';
import {getFoodsApi} from '@/redux/food';
import {useAppDispatch, useAppSelector} from '@/redux/hooks';
import {widthNoSpace} from '@/styles/mixins';
import {FULL_WIDTH, HALF_WIDTH} from '@/styles/spacing';
import FilterIcon from '@Assets/icons/filter.svg';
import {
  AspectRatio,
  Box,
  FlatList,
  Heading,
  HStack,
  Icon,
  Image,
  Input,
  Pressable,
  ScrollView,
  Spacer,
  Text,
  VStack,
} from 'native-base';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {FlatList as RNFlatList, RefreshControl} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

const HomeScreen = () => {
  const {t, i18n} = useTranslation();
  const dispatch = useAppDispatch();
  const food = useAppSelector(state => state.food);
  const language = useAppSelector(state => state.system.language);

  const isRendered = useRef(false);

  const [promotions, setPromotions] = useState<Promotion[]>();
  const promotionListRef = useRef<RNFlatList>();
  usePageAutoScroll({ref: promotionListRef, itemLength: promotions?.length});

  const changeLanguage = useCallback(() => {
    i18n.changeLanguage(language === 'en' ? 'vi' : 'en');
  }, [i18n, language]);

  const loadPromotions = async () => {
    const _promotions = await getPromotion();
    setPromotions(_promotions);
  };

  const reload = useCallback(() => {
    dispatch(getFoodsApi());
    loadPromotions();
  }, [dispatch]);

  useEffect(() => {
    reload();
    isRendered.current = true;
  }, [reload]);

  return (
    <Box safeArea flex={1}>
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
        <VStack mt={4} space={2} overflow="hidden" rounded="md">
          <Heading flex={1} px={4}>
            {t('home.welcome')}
          </Heading>

          <HStack space={2} px={4}>
            <Input
              flex={1}
              placeholder="What do you want to order?"
              placeholderTextColor={'rgba(218, 99, 23, 0.4)'}
              InputLeftElement={
                <Icon
                  as={<Feather name="search" />}
                  size={5}
                  ml="4"
                  color="#DA6317"
                />
              }
              borderWidth={0}
              borderRadius="xl"
              backgroundColor="rgba(249, 168, 77, 0.1)"
            />

            <Pressable
              px={3}
              backgroundColor="rgba(249, 168, 77, 0.1)"
              borderRadius="xl"
              alignItems="center"
              justifyContent="center">
              <Icon size={'md'} as={FilterIcon} />
            </Pressable>
          </HStack>

          <AspectRatio ratio={325 / 150}>
            <FlatList
              ref={promotionListRef}
              data={promotions}
              nestedScrollEnabled={true}
              showsHorizontalScrollIndicator={false}
              horizontal
              keyExtractor={(item, index) => `${item.id || index}`}
              w="full"
              pagingEnabled
              renderItem={({item, index}) => {
                return (
                  <AspectRatio ratio={325 / 150} mx="4">
                    <Image
                      key={item.id}
                      alt={item.name}
                      source={{uri: item.image}}
                      w="full"
                      borderRadius="xl"
                      flexGrow={1}
                    />
                  </AspectRatio>
                );
              }}
            />
          </AspectRatio>

          <HStack
            px={4}
            py={2}
            alignItems="center"
            justifyContent="space-between">
            <Heading fontSize="lg">{t('home.nearestRestaurant')}</Heading>
            <Text color="orange.500">{t('common.viewMore')}</Text>
          </HStack>
          <FlatList
            data={food.list}
            nestedScrollEnabled={true}
            showsHorizontalScrollIndicator={false}
            horizontal
            keyExtractor={(item, index) => `${item.id || index}`}
            w="full"
            px={4}
            ItemSeparatorComponent={() => <Spacer w="4" />}
            renderItem={({item}) => {
              return (
                <VStack
                  key={item.id}
                  p={3}
                  space={8}
                  w={widthNoSpace(HALF_WIDTH, '4')}
                  borderRadius="xl"
                  // justifyContent="space-between"
                  backgroundColor={'white'}>
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
            }}
          />

          <HStack
            py={2}
            px={4}
            alignItems="center"
            justifyContent="space-between">
            <Heading fontSize="lg">{t('home.popularMenu')}</Heading>
            <Text color="orange.500">{t('common.viewMore')}</Text>
          </HStack>
          <FlatList
            data={food.list}
            nestedScrollEnabled={true}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => `${item.id || index}`}
            numColumns={2}
            columnWrapperStyle={{justifyContent: 'space-between'}}
            scrollEnabled={false}
            w="full"
            px={4}
            ItemSeparatorComponent={() => <Spacer w="4" h="4" />}
            renderItem={({item}) => {
              return (
                <HStack
                  key={item.id}
                  p={2}
                  space={3}
                  w={widthNoSpace(FULL_WIDTH, '4')}
                  borderRadius="xl"
                  backgroundColor={'white'}>
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
                  <VStack
                    flex={1}
                    mr={2}
                    justifyContent="center"
                    alignItems="flex-end">
                    <Heading fontSize="lg" color="amber.500" numberOfLines={1}>
                      ${10}
                    </Heading>
                  </VStack>
                </HStack>
              );
            }}
          />

          <HStack
            py={2}
            px={4}
            alignItems="center"
            justifyContent="space-between">
            <Heading fontSize="lg">{t('home.popularRestaurant')}</Heading>
            <Text color="orange.500">{t('common.viewMore')}</Text>
          </HStack>
          <FlatList
            data={food.list}
            nestedScrollEnabled={true}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => `${item.id || index}`}
            numColumns={2}
            columnWrapperStyle={{justifyContent: 'space-between'}}
            w="full"
            px={4}
            ItemSeparatorComponent={() => <Spacer w="4" h="4" />}
            renderItem={({item}) => {
              return (
                <VStack
                  key={item.id}
                  p={3}
                  space={8}
                  w={widthNoSpace(HALF_WIDTH, '3')}
                  borderRadius="xl"
                  // justifyContent="space-between"
                  backgroundColor={'white'}>
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
            }}
          />
        </VStack>

        <Spacer w="4" h="4" />
      </ScrollView>
    </Box>
  );
};

export default HomeScreen;
