import AppLogo from '@/components/AppLogo';
import Container from '@/components/container/Container';
import Button from '@/components/primitives/Button';
import ToggleDarkMode from '@/components/ToggleDarkMode';
import {AuthNavigationProp} from '@/navigations/stack/AuthStack/type';
import {loginApi} from '@/redux/authentication';
import {useAppDispatch, useAppSelector} from '@/redux/hooks';
import {setFirstTime} from '@/redux/system';
import {useNavigation} from '@react-navigation/native';
import {t} from 'i18next';
import {
  Center,
  FormControl,
  Heading,
  HStack,
  Input,
  Link,
  Text,
  VStack,
} from 'native-base';
import React, {useEffect, useState} from 'react';

const LoginScreen = () => {
  const dispatch = useAppDispatch();
  const firstTime = useAppSelector(state => state.system.firstTime);

  const navigation = useNavigation<AuthNavigationProp>();

  const [username, setUsername] = useState('77498623');
  const [password, setPassword] = useState('nINDXMn3QerQumz');

  const onLogin = () => dispatch(loginApi({username, password}));

  useEffect(() => {
    if (firstTime) dispatch(setFirstTime());
  }, [firstTime, dispatch]);

  return (
    <Container flex={1} mx="auto">
      <HStack safeArea px={2} justifyContent="space-between">
        <ToggleDarkMode />
      </HStack>
      <Center height="1/3">
        <AppLogo />
      </Center>

      <VStack space={3} p={6} mt="5">
        <Heading size="md" alignSelf="center">
          {t('login.description')}
        </Heading>

        <FormControl>
          <FormControl.Label>Email ID</FormControl.Label>
          <Input onChangeText={setUsername} value={username} />
        </FormControl>
        <FormControl>
          <FormControl.Label>Password</FormControl.Label>
          <Input onChangeText={setPassword} value={password} type="password" />
          <Link
            _text={{
              fontSize: 'xs',
              fontWeight: '500',
              color: 'primary.500',
              _dark: {color: 'darkPrimary.500'},
            }}
            alignSelf="flex-end"
            mt="1">
            Forget Password?
          </Link>
        </FormControl>

        <Button onPress={onLogin}>Sign in</Button>

        <HStack mt="6" justifyContent="center">
          <Text
            fontSize="sm"
            color="coolGray.600"
            _dark={{color: 'warmGray.200'}}>
            I'm a new user.{' '}
          </Text>
          <Link
            _text={{
              color: 'primary.500',
              _dark: {color: 'darkPrimary.500'},
              fontWeight: 'medium',
              fontSize: 'sm',
            }}
            onPress={() => navigation.navigate('Register')}>
            Sign Up
          </Link>
        </HStack>
      </VStack>
    </Container>
  );
};

export default LoginScreen;
