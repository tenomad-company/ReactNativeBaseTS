import {getFoodsApi} from '@/redux/food';
import {useAppDispatch, useAppSelector} from '@/redux/hooks';
import {widthNoSpace} from '@/styles/mixins';
import {HALF_WIDTH} from '@/styles/spacing';
import FilterIcon from '@Assets/icons/filter.svg';
import {
  AspectRatio,
  Box,
  Button,
  FlatList,
  Heading,
  HStack,
  Icon,
  Input,
  Pressable,
  ScrollView,
  Skeleton,
  Spacer,
  VStack,
  Image,
  Text,
} from 'native-base';
import React, {useCallback, useEffect, useRef} from 'react';
import {useTranslation} from 'react-i18next';
import {RefreshControl} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

const HomeScreen = () => {
  const {t, i18n} = useTranslation();
  const dispatch = useAppDispatch();
  const food = useAppSelector(state => state.food);
  const language = useAppSelector(state => state.system.language);
  const isRendered = useRef(false);

  const changeLanguage = useCallback(() => {
    i18n.changeLanguage(language === 'en' ? 'vi' : 'en');
  }, [i18n, language]);

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
        <VStack mt={4} space={2} overflow="hidden" rounded="md">
          <Heading flex={1}>{t('home.welcome')}</Heading>

          <HStack space={2}>
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
              data={food.list}
              nestedScrollEnabled={true}
              showsHorizontalScrollIndicator={false}
              horizontal
              keyExtractor={(item, index) => `${item.id || index}`}
              w="full"
              ItemSeparatorComponent={() => <Spacer w="2" />}
              renderItem={({item, index}) => {
                return (
                  <AspectRatio ratio={325 / 150}>
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

          <HStack py={2} alignItems="center" justifyContent="space-between">
            <Heading fontSize="lg">{t('home.nearestRestaurant')}</Heading>
            <Text color="orange.500">{t('common.viewMore')}</Text>
          </HStack>
          <AspectRatio>
            <FlatList
              data={food.list}
              nestedScrollEnabled={true}
              showsHorizontalScrollIndicator={false}
              horizontal
              keyExtractor={(item, index) => `${item.id || index}`}
              w="full"
              ItemSeparatorComponent={() => <Spacer w="2" />}
              renderItem={({item, index}) => {
                return (
                  <VStack
                    key={item.id}
                    backgroundColor="primary.100"
                    w={widthNoSpace(HALF_WIDTH, '2')}>
                    <AspectRatio ratio={96 / 73}>
                      <Image
                        key={item.id}
                        alt={item.name}
                        source={{uri: item.image}}
                        w="full"
                      />
                    </AspectRatio>
                    <Heading fontSize="lg">{item.name}</Heading>
                    <Text color="orange.500">{t('common.viewMore')}</Text>
                  </VStack>
                );
              }}
            />
          </AspectRatio>

          <HStack py={2} alignItems="center" justifyContent="space-between">
            <Heading fontSize="lg">{t('home.popularMenu')}</Heading>
            <Text color="orange.500">{t('common.viewMore')}</Text>
          </HStack>

          <HStack py={2} alignItems="center" justifyContent="space-between">
            <Heading fontSize="lg">{t('home.popularRestaurant')}</Heading>
            <Text color="orange.500">{t('common.viewMore')}</Text>
          </HStack>

          {/* <Box>
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
          </Box> */}

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
