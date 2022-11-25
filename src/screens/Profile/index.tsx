import ModalAlert from '@Components/alert/AlertDialog';
import ToastAlert from '@Components/alert/ToastAlert';
import ToggleDarkMode from '@Components/button/ToggleDarkMode';
import Container from '@Components/container/Container';
import ListTitle from '@Components/container/ListTitle';
import IFlatList from '@Components/scroll/Flatlist';
import SettingLink from '@Components/SettingLink';
import {Assets} from '@Constants/assets';
import {AppNavigationProps} from '@Navigations/route';
import {useNavigation, useTheme} from '@react-navigation/native';
import {logout} from '@Redux/authentication';
import {useAppDispatch, useAppSelector} from '@Redux/hooks';
import {showTabBar} from '@Redux/system';
import {
  Actionsheet,
  Avatar,
  Box,
  Divider,
  Heading,
  HStack,
  Icon,
  Image,
  Text,
  useDisclose,
  useToast,
  VStack,
} from 'native-base';
import React, {useCallback, useEffect, useMemo, useRef} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const ProfileScreen = () => {
  const positionRef = useRef<number>(0);
  const {colors} = useTheme();
  const toast = useToast();
  const navigation = useNavigation<AppNavigationProps>();
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.authentication.user);
  const {isOpen, onOpen, onClose} = useDisclose();

  const {
    isOpen: isActionSheetOpen,
    onOpen: onActionSheetOpen,
    onClose: onActionSheetClose,
  } = useDisclose();

  const onLogout = useCallback(() => dispatch(logout()), [dispatch]);

  const _buildHeader = useMemo(() => {
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

  const menuItems = useMemo(
    () => [
      {
        iconName: 'user',
        title: 'My profile',
      },
      {
        iconName: 'calendar',
        title: 'Alert',
        onPress: onOpen,
      },
      {
        iconName: 'questioncircleo',
        title: 'Toast',
        onPress: () => toast.show({description: 'Normal Toast'}),
      },
      {
        iconName: 'customerservice',
        title: 'Custom Toast',
        onPress: () => {
          const _id = 'alert-network';
          if (!toast.isActive(_id))
            toast.show({
              id: _id,
              placement: 'top',
              render: ({id}) => (
                <ToastAlert
                  id={id}
                  title="Network connection failed!"
                  description="Connect your Network"
                  status="error"
                  isClosable
                />
              ),
            });
        },
      },
      {
        iconName: 'customerservice',
        title: 'ActionSheet',
        onPress: onActionSheetOpen,
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
    ],
    [navigation, onActionSheetOpen, onLogout, onOpen, toast],
  );

  useEffect(() => {
    dispatch(showTabBar(true));
  }, [dispatch, navigation]);

  return (
    <Container flex={1}>
      <IFlatList
        scrollRef={positionRef}
        data={menuItems}
        keyExtractor={(item, index) => `${item.title}${index}`}
        ListHeaderComponent={_buildHeader}
        ItemSeparatorComponent={() => <Divider opacity={0.3} />}
        renderItem={({item, index}) => (
          <ListTitle
            onPress={item.onPress}
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
        )}
      />

      <ModalAlert
        title="Title"
        description="description"
        isOpen={isOpen}
        onClose={onClose}
      />

      <Actionsheet
        isOpen={isActionSheetOpen}
        onClose={onActionSheetClose}
        size="full">
        <Actionsheet.Content>
          <Box w="100%" h={60} px={4} justifyContent="center">
            <Text fontSize="16" color="gray.500" _dark={{color: 'gray.300'}}>
              Albums
            </Text>
          </Box>
          <Actionsheet.Item
            startIcon={<Icon as={MaterialIcons} size="6" name="delete" />}>
            Delete
          </Actionsheet.Item>
          <Actionsheet.Item
            startIcon={<Icon as={MaterialIcons} name="share" size="6" />}>
            Share
          </Actionsheet.Item>
          <Actionsheet.Item
            startIcon={<Icon as={Ionicons} name="play-circle" size="6" />}>
            Play
          </Actionsheet.Item>
          <Actionsheet.Item
            startIcon={<Icon as={MaterialIcons} size="6" name="favorite" />}>
            Favourite
          </Actionsheet.Item>
          <Actionsheet.Item
            startIcon={<Icon as={MaterialIcons} size="6" name="close" />}
            onPress={onActionSheetClose}>
            Cancel
          </Actionsheet.Item>
        </Actionsheet.Content>
      </Actionsheet>
    </Container>
  );
};

export default ProfileScreen;
