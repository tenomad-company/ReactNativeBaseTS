import AppLogo from '@Components/AppLogo';
import IButton from '@Components/button/Button';
import ToggleDarkMode from '@Components/button/ToggleDarkMode';
import Container from '@Components/container/Container';
import {IInput} from '@Components/form/Input';
import {useLoading} from '@Components/loading';
import {Assets} from '@Constants/assets';
import {yupResolver} from '@hookform/resolvers/yup';
import {LoginParams} from '@Models/params/AuthParams';
import {AuthNavigationProp} from '@Navigations/stack/AuthStack/type';
import {useNavigation, useTheme} from '@react-navigation/native';
import {loginApi} from '@Redux/authentication';
import {useAppDispatch, useAppSelector} from '@Redux/hooks';
import {setFirstTime} from '@Redux/system';
import {t} from 'i18next';
import {
  Center,
  Heading,
  HStack,
  Image,
  Link,
  Text,
  View,
  VStack,
} from 'native-base';
import React, {useEffect} from 'react';
import {useForm} from 'react-hook-form';
import * as yup from 'yup';

const LoginScreen = () => {
  const dispatch = useAppDispatch();
  const firstTime = useAppSelector(state => state.system.firstTime);
  const {showLoading, hideLoading} = useLoading();

  const navigation = useNavigation<AuthNavigationProp>();
  const {border, card, text} = useTheme().colors;

  const schema = yup.object().shape({
    email: yup.string().required(t('error.usernameEmpty')),
    password: yup
      .string()
      .min(6, t('error.passwordMin'))
      .max(32)
      .required(t('error.passwordEmpty')),
  });

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<LoginParams>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: '77498623',
      password: 'nINDXMn3QerQumz',
    },
  });

  const onLogin = async ({email, password}: LoginParams) => {
    showLoading();
    await dispatch(loginApi({username: email, password}));
    hideLoading();
  };

  useEffect(() => {
    if (firstTime) dispatch(setFirstTime());
  }, [firstTime, dispatch]);

  return (
    <Container flex={1} mx="auto" justifyContent="space-between" safeArea p={6}>
      <ToggleDarkMode alignSelf="flex-end" />

      <Center>
        <AppLogo />
      </Center>

      <VStack space={3}>
        <Heading size="md" alignSelf="center">
          {t('login.title')}
        </Heading>

        <IInput
          control={control}
          name="email"
          placeholder={'your email...'}
          errorMessage={errors?.email?.message}
          InputLeftElement={
            <Image
              alt="profile"
              source={Assets.icon.profile}
              size={14}
              marginLeft={4}
              resizeMode="contain"
            />
          }
        />
        <IInput
          control={control}
          name="password"
          placeholder={'your password...'}
          errorMessage={errors?.password?.message}
          type="password"
          InputLeftElement={
            <Image
              alt="password"
              source={Assets.icon.lock}
              size={14}
              marginLeft={4}
              resizeMode="contain"
            />
          }
        />

        <IButton onPress={handleSubmit(onLogin)}>{t('login.title')}</IButton>

        <HStack justifyContent="center">
          <Text
            fontSize="sm"
            color="coolGray.600"
            _dark={{color: 'warmGray.200'}}>
            {t('login.newUser')}.{' '}
          </Text>
          <Link
            _text={{color: 'primary.500', fontWeight: 'bold'}}
            onPress={() => navigation.navigate('Register')}>
            {t('register.title')}
          </Link>
        </HStack>

        <HStack justifyContent="center" alignItems="center" space={4}>
          <View flex={1} backgroundColor={border} />
          <Text>Or</Text>
          <View flex={1} backgroundColor={border} />
        </HStack>

        <HStack justifyContent="center" alignItems="center" space={4}>
          <IButton
            backgroundColor={card}
            flex={1}
            borderColor={border}
            borderWidth={1}
            shadow={2}>
            <HStack
              justifyContent="center"
              alignItems="center"
              space={2}
              _text={{color: text}}>
              <Image alt="fb" source={Assets.icon.facebook} size="24px" />
              <Text>Facebook</Text>
            </HStack>
          </IButton>

          <IButton
            flex={1}
            borderWidth={1}
            borderColor={border}
            _text={{color: text}}
            backgroundColor={card}>
            <HStack
              justifyContent="center"
              alignItems="center"
              space={2}
              _text={{color: text}}>
              <Image alt="gg" source={Assets.icon.google} size="24px" />
              <Text>Google</Text>
            </HStack>
          </IButton>
        </HStack>
      </VStack>
    </Container>
  );
};

export default LoginScreen;
