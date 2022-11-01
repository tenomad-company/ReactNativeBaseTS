import {getFoodsApi} from '@/redux/food';
import {useAppDispatch, useAppSelector} from '@/redux/hooks';
import {
  Box,
  Button,
  Heading,
  HStack,
  Icon,
  Input,
  Pressable,
  ScrollView,
  Skeleton,
  VStack,
} from 'native-base';
import React, {useCallback, useEffect, useRef} from 'react';
import {useTranslation} from 'react-i18next';
import {RefreshControl} from 'react-native';
import {Path} from 'react-native-svg';
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
        <VStack mt={4} space={8} overflow="hidden" rounded="md">
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
              <Icon size={'md'} viewBox="0 0 24 24">
                <Path
                  opacity="0.4"
                  d="M10.0833 15.958H3.50777C2.67555 15.958 2 16.6217 2 17.4393C2 18.2559 2.67555 18.9207 3.50777 18.9207H10.0833C10.9155 18.9207 11.5911 18.2559 11.5911 17.4393C11.5911 16.6217 10.9155 15.958 10.0833 15.958Z"
                  fill="#DA6317"
                />
                <Path
                  opacity="0.4"
                  d="M22.0001 6.37855C22.0001 5.56202 21.3246 4.89832 20.4934 4.89832H13.9179C13.0857 4.89832 12.4102 5.56202 12.4102 6.37855C12.4102 7.19617 13.0857 7.85988 13.9179 7.85988H20.4934C21.3246 7.85988 22.0001 7.19617 22.0001 6.37855Z"
                  fill="#DA6317"
                />
                <Path
                  d="M8.87774 6.37856C8.87774 8.24523 7.33886 9.75821 5.43887 9.75821C3.53999 9.75821 2 8.24523 2 6.37856C2 4.51298 3.53999 3 5.43887 3C7.33886 3 8.87774 4.51298 8.87774 6.37856Z"
                  fill="#DA6317"
                />
                <Path
                  d="M21.9998 17.3992C21.9998 19.2648 20.4609 20.7777 18.5609 20.7777C16.6621 20.7777 15.1221 19.2648 15.1221 17.3992C15.1221 15.5325 16.6621 14.0195 18.5609 14.0195C20.4609 14.0195 21.9998 15.5325 21.9998 17.3992Z"
                  fill="#DA6317"
                />
              </Icon>
            </Pressable>
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
