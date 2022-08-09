import NativeBaseIcon from '@/components/NativeBaseIcon';
import ToggleDarkMode from '@/components/ToggleDarkMode';
import {Box, Center, Heading, HStack, Link, Text, VStack} from 'native-base';
import React from 'react';

function InitScreen() {
  return (
    <Center
      _dark={{bg: 'blueGray.900'}}
      _light={{bg: 'blueGray.50'}}
      px={4}
      flex={1}>
      <VStack space={5} alignItems="center">
        <NativeBaseIcon />
        <Heading size="lg">Welcome to NativeBase</Heading>
        <HStack space={2} alignItems="center">
          <Text>Edit</Text>
          <Box
            px={2}
            py={1}
            _dark={{bg: 'blueGray.800'}}
            _light={{bg: 'blueGray.200'}}>
            App.js
          </Box>
          <Text>and save to reload.</Text>
        </HStack>
        <Link href="https://docs.nativebase.io" isExternal>
          <Text color="primary.500" underline fontSize={'xl'}>
            Learn NativeBase
          </Text>
        </Link>
        <ToggleDarkMode />
      </VStack>
    </Center>
  );
}

export default InitScreen;
