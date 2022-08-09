import {loginAsync} from '@/redux/authentication/action';
import {useAppDispatch} from '@/redux/hooks';
import {useNavigation} from '@react-navigation/native';
import {
  Box,
  Button,
  Center,
  FormControl,
  Heading,
  HStack,
  Input,
  Link,
  Text,
  useColorModeValue,
  VStack,
} from 'native-base';
import React, {useState} from 'react';
import {StyleSheet} from 'react-native';

const LoginScreen = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const onLogin = () => dispatch(loginAsync({username, password}));

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
        Sign in to continue!
      </Heading>

      <VStack space={3} mt="5">
        <FormControl>
          <FormControl.Label>Email ID</FormControl.Label>
          <Input onChangeText={setUsername} />
        </FormControl>
        <FormControl>
          <FormControl.Label>Password</FormControl.Label>
          <Input onChangeText={setPassword} type="password" />
          <Link
            _text={{
              fontSize: 'xs',
              fontWeight: '500',
              color: 'indigo.500',
              _dark: {color: 'amber.500'},
            }}
            alignSelf="flex-end"
            mt="1">
            Forget Password?
          </Link>
        </FormControl>
        <Button
          mt="2"
          colorScheme={useColorModeValue('primary', 'darkPrimary')}
          onPress={onLogin}>
          Sign in
        </Button>
        <HStack mt="6" justifyContent="center">
          <Text
            fontSize="sm"
            color="coolGray.600"
            _dark={{color: 'warmGray.200'}}>
            I'm a new user.{' '}
          </Text>
          <Link
            _text={{
              color: 'indigo.500',
              fontWeight: 'medium',
              fontSize: 'sm',
              _dark: {color: 'amber.500'},
            }}
            onPress={() => navigation.navigate({name: 'Register'})}>
            Sign Up
          </Link>
        </HStack>
      </VStack>
    </Box>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});
