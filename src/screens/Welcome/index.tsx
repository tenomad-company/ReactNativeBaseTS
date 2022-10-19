import NativeBaseIcon from '@/components/NativeBaseIcon';
import ToggleDarkMode from '@/components/ToggleDarkMode';
import {RootNavigationProp} from '@/navigations/type';
import {useNavigation} from '@react-navigation/native';
import {Box, Center, Heading, HStack, Link, Text, VStack} from 'native-base';
import React from 'react';
import {StyleSheet} from 'react-native';

const WelcomeScreen = () => {
  const navigation = useNavigation<RootNavigationProp>();

  return (
    <Center px={4} flex={1}>
      <VStack space={5} alignItems="center">
        <NativeBaseIcon />
        <Heading size="lg">Welcome to NativeBase</Heading>
        <HStack space={2} alignItems="center">
          <Text>Edit</Text>
          <Box px={2} py={1}>
            App.js
          </Box>
          <Text>and save to reload.</Text>
        </HStack>
        <Link onPress={() => navigation.navigate('AuthStack')}>
          <Text
            color="primary.500"
            _dark={{color: 'amber.500'}}
            underline
            fontSize={'xl'}>
            Login
          </Text>
        </Link>
        <Link href="https://docs.nativebase.io" isExternal>
          <Text
            color="primary.500"
            _dark={{color: 'amber.500'}}
            underline
            fontSize={'sm'}>
            Learn NativeBase
          </Text>
        </Link>
        <ToggleDarkMode />
      </VStack>
    </Center>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({});
