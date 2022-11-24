import {getPromotion} from '@Api/promotion';
import {Promotion} from '@Models/Promotion';
import {getFoodsApi} from '@Redux/food';
import {useAppDispatch, useAppSelector} from '@Redux/hooks';
import {
  Box,
  Heading,
  HStack,
  ScrollView,
  Spacer,
  Text,
  VStack,
} from 'native-base';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {RefreshControl} from 'react-native';
import ListNearestRestaurant from './ListNearestRestaurant';
import ListPopularMenu from './ListPopularMenu';
import ListPopularRestaurant from './ListPopularRestaurant';
import SearchBar from './SearchBar';
import SlideBanner from './SlideBanner';

const HomeScreen = () => {
  const {t} = useTranslation();
  const dispatch = useAppDispatch();
  const food = useAppSelector(state => state.food);

  const isRendered = useRef(false);

  const [promotions, setPromotions] = useState<Promotion[]>();

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

          <SearchBar />

          <SlideBanner data={promotions} />

          <HStack
            px={4}
            py={2}
            alignItems="center"
            justifyContent="space-between">
            <Heading fontSize="lg">{t('home.nearestRestaurant')}</Heading>
            <Text color="orange.500">{t('common.viewMore')}</Text>
          </HStack>
          <ListNearestRestaurant data={food.list} />

          <HStack
            py={2}
            px={4}
            alignItems="center"
            justifyContent="space-between">
            <Heading fontSize="lg">{t('home.popularMenu')}</Heading>
            <Text color="orange.500">{t('common.viewMore')}</Text>
          </HStack>
          <ListPopularMenu data={food.list} />

          <HStack
            py={2}
            px={4}
            alignItems="center"
            justifyContent="space-between">
            <Heading fontSize="lg">{t('home.popularRestaurant')}</Heading>
            <Text color="orange.500">{t('common.viewMore')}</Text>
          </HStack>
          <ListPopularRestaurant data={food.list} />
        </VStack>

        <Spacer w="4" h="4" />
      </ScrollView>
    </Box>
  );
};

export default HomeScreen;
