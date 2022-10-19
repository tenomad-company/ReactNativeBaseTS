import Button from '@/components/primitives/Button';
import SettingLink from '@/components/SettingLink';
import ToggleDarkMode from '@/components/ToggleDarkMode';
import {logout} from '@/redux/authentication';
import {useAppDispatch, useAppSelector} from '@/redux/hooks';
import {Avatar, Box, Heading, HStack, Text, VStack} from 'native-base';
import React, {useCallback} from 'react';

const ProfileScreen = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.authentication.user);

  const onLogout = useCallback(() => dispatch(logout()), [dispatch]);

  return (
    <Box safeArea flex={1} p={2}>
      <HStack space={2} justifyContent="space-between">
        <SettingLink />
        <ToggleDarkMode />
      </HStack>

      <VStack space={2} alignItems="center">
        <Avatar size="2xl" source={{uri: user?.avatar}} />
        <Heading>Truong Van Tien</Heading>
        <Text color="coolGray.600" _dark={{color: 'warmGray.300'}}>
          {user?.description}
        </Text>
      </VStack>

      <VStack space={2} mt={8}>
        <Button onPress={onLogout}>Log out</Button>
      </VStack>
    </Box>
  );
};

export default ProfileScreen;
