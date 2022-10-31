// import SettingLink from '@/components/SettingLink';
import ToggleDarkMode from '@/components/button/ToggleDarkMode';
import Container from '@/components/container/Container';
import ListTitle from '@/components/container/ListTitle';
import SettingLink from '@/components/SettingLink';
import {Assets} from '@/constants/assets';
import {AppNavigationProps} from '@/navigations/route';
import {logout} from '@/redux/authentication';
import {useAppDispatch, useAppSelector} from '@/redux/hooks';
import {showTabBar} from '@/redux/system';
import {useNavigation, useTheme} from '@react-navigation/native';
import {
  Avatar,
  Box,
  Divider,
  FlatList,
  Heading,
  HStack,
  Icon,
  Image,
  Text,
  VStack,
} from 'native-base';
import React, {useCallback, useEffect, useRef} from 'react';
import {NativeScrollEvent, NativeSyntheticEvent} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

const ProfileScreen = () => {
  const positionRef = useRef<number>(0);
  const {colors} = useTheme();
  const navigation = useNavigation<AppNavigationProps>();
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.authentication.user);

  const onLogout = useCallback(() => dispatch(logout()), [dispatch]);

  const _buildHeader = useCallback(() => {
    return (
      <Box>
        <Box safeArea p={4} bg="primary.800">
          <HStack space={2} justifyContent="space-between">
            <SettingLink iconColor="lightText" />
            <ToggleDarkMode iconColor="lightText" />
          </HStack>

          <VStack space={1} alignItems="center">
            <Avatar size="2xl" source={{uri: user?.avatar}} />
            <Heading color="lightText">{user?.name}</Heading>
            <Text color="lightText">{user?.description}</Text>
          </VStack>
        </Box>

        <HStack
          backgroundColor={colors.card}
          marginLeft={4}
          marginRight={4}
          height={'56px'}
          marginTop={'-28px'}
          borderRadius="full"
          shadow={2}>
          <HStack
            flex={1}
            justifyContent="center"
            alignItems="center"
            space={4}
            alignContent="center">
            <Image alt="wallet" source={Assets.icon.wallet} size="20px" />
            <Text color={'secondary.500'} fontSize="lg" fontWeight="bold">
              300
            </Text>
          </HStack>
          <Divider orientation="vertical" mx="2" />
          <HStack
            flex={1}
            justifyContent="center"
            alignItems="center"
            space={4}
            alignContent="center">
            <Image alt="voucher" source={Assets.icon.voucher} size="20px" />
            <Text fontSize="lg" fontWeight="bold">
              3
            </Text>
          </HStack>
        </HStack>
      </Box>
    );
  }, [colors.card, user]);

  const menuItems = [
    {
      iconName: 'user',
      title: 'My profile',
    },
    {
      iconName: 'calendar',
      title: 'Schedule',
    },
    {
      iconName: 'questioncircleo',
      title: 'Q & A',
    },

    {
      iconName: 'customerservice',
      title: 'Customer Service',
    },

    {
      iconName: 'setting',
      title: 'Settings',
      onPress: () => navigation.navigate('Settings'),
    },
    {
      iconName: 'logout',
      title: 'Log out',
      onPress: onLogout,
    },
  ];
  const isCloseToBottom = ({
    layoutMeasurement,
    contentOffset,
    contentSize,
  }: NativeScrollEvent) => {
    const paddingToBottom = 20;

    return (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
    );
  };

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const currentPosition = event.nativeEvent.contentOffset.y;

    if (currentPosition < 0) return;
    const isEndPage = isCloseToBottom(event.nativeEvent);
    const isScrollTop = positionRef.current - currentPosition >= 0;
    if (isEndPage && !!currentPosition) {
      dispatch(showTabBar(false));
    } else {
      dispatch(showTabBar(isScrollTop));
    }

    setTimeout(() => {
      positionRef.current = currentPosition;
    }, 400);
  };

  useEffect(() => {
    dispatch(showTabBar(true));
  }, [dispatch, navigation]);

  return (
    <Container flex={1}>
      <FlatList
        ListHeaderComponent={_buildHeader()}
        onScroll={handleScroll}
        data={menuItems}
        keyExtractor={(item, index) => `${item.title}${index}`}
        renderItem={({item, index}) => (
          <>
            <ListTitle
              onPress={item.onPress}
              key={index}
              title={item.title}
              backgroundColor={'transparent'}
              leftComponent={
                <Icon
                  name={item.iconName}
                  as={AntDesign}
                  size="md"
                  ml={1}
                  alignSelf="center"
                />
              }
            />
            <Divider opacity={0.3} />
          </>
        )}
      />
    </Container>
  );
};

export default ProfileScreen;
