import {
  Box,
  Button,
  FormControl,
  Heading,
  HStack,
  Icon,
  IconButton,
  Input,
  VStack,
} from 'native-base';
import React from 'react';
import {StyleSheet} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const RegisterScreen = () => {
  return (
    <Box safeArea flex={1} p={2} w="90%" mx="auto">
      <Heading size="lg" color="primary.500" _dark={{color: 'amber.500'}}>
        Welcome
      </Heading>
      <Heading
        mt="1"
        _dark={{color: 'warmGray.200'}}
        color="coolGray.600"
        fontWeight="medium"
        size="xs">
        Sign up to continue!
      </Heading>

      <VStack space={2} mt={5}>
        <FormControl>
          <FormControl.Label>Email</FormControl.Label>
          <Input />
        </FormControl>
        <FormControl>
          <FormControl.Label>Password</FormControl.Label>
          <Input type="password" />
        </FormControl>
        <FormControl>
          <FormControl.Label>Confirm Password</FormControl.Label>
          <Input type="password" />
        </FormControl>
        <VStack space={2} mt={5}>
          <Button _text={{color: 'white'}}>SignUp</Button>

          <HStack justifyContent="center" alignItems="center">
            <IconButton
              icon={
                <Icon
                  as={MaterialCommunityIcons}
                  name="facebook"
                  color="muted.700"
                  _dark={{color: 'muted.300'}}
                  size="2xl"
                />
              }
            />
            <IconButton
              icon={
                <Icon
                  as={MaterialCommunityIcons}
                  name="apple"
                  color="muted.700"
                  _dark={{color: 'muted.300'}}
                  size="2xl"
                />
              }
            />
            <IconButton
              icon={
                <Icon
                  as={MaterialCommunityIcons}
                  name="google"
                  color="muted.700"
                  _dark={{color: 'muted.300'}}
                  size="2xl"
                />
              }
            />
          </HStack>
        </VStack>
      </VStack>
    </Box>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({});
