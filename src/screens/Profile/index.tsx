import SettingLink from '@/components/SettingLink';
import ToggleDarkMode from '@/components/ToggleDarkMode';
import {AppNavigationProps} from '@/navigations/route';
import {logout} from '@/redux/authentication';
import {useAppDispatch, useAppSelector} from '@/redux/hooks';
import {useNavigation} from '@react-navigation/native';
import {
  Avatar,
  Box,
  Heading,
  HStack,
  Icon,
  Pressable,
  Text,
  VStack,
} from 'native-base';
import React, {useCallback} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';

const ProfileScreen = () => {
  const navigation = useNavigation<AppNavigationProps>();
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.authentication.user);

  const onLogout = useCallback(() => dispatch(logout()), [dispatch]);

  return (
    <Box flex={1}>
      <Box safeArea p={2} pb={8} bg="primary.400" _dark={{bg: 'dark.400'}}>
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

      <VStack p={2} mt={-6} mx={2} space={2}>
        {/* <Button onPress={onLogout}>Log out</Button> */}
        <ItemMenu icon="user" title="Account" />
        <ItemMenu icon="calendar" title="Schedule" />
        <ItemMenu icon="shoppingcart" title="Shop" />
        <ItemMenu icon="questioncircleo" title="Q & A" />
        <ItemMenu icon="customerservice" title="Customer Service" />
        <ItemMenu
          icon="setting"
          title="Settings"
          onPress={() => navigation.navigate('Settings')}
        />
        <ItemMenu icon="logout" title="Log out" onPress={onLogout} />
      </VStack>
    </Box>
  );
};

const ItemMenu = ({
  icon,
  title,
  onPress,
}: {
  icon: string;
  title: string;
  onPress?: () => void;
}) => {
  return (
    <Pressable onPress={onPress}>
      <HStack
        p={2}
        space={2}
        shadow={2}
        borderRadius={8}
        backgroundColor="background.light"
        _dark={{backgroundColor: 'dark.300'}}
        alignItems="center">
        <Icon
          name={icon}
          as={AntDesign}
          size="md"
          ml={1}
          color={'darkText'}
          _dark={{color: 'lightText'}}
        />
        <Text flex={1}>{title}</Text>
        <Icon
          name="right"
          as={AntDesign}
          size="md"
          color={'darkText'}
          _dark={{color: 'lightText'}}
        />
      </HStack>
    </Pressable>
  );
};

export default ProfileScreen;
