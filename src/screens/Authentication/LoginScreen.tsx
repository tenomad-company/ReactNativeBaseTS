import AppLogo from '@/components/AppLogo';
import IButton from '@/components/button/Button';
import ToggleDarkMode from '@/components/button/ToggleDarkMode';
import Container from '@/components/container/Container';
import {IInput} from '@/components/form/Input';
import {Assets} from '@/constants/assets';
import {LoginParams} from '@/models/params/AuthParams';
import {AuthNavigationProp} from '@/navigations/stack/AuthStack/type';
import {loginApi} from '@/redux/authentication';
import {useAppDispatch} from '@/redux/hooks';
import {yupResolver} from '@hookform/resolvers/yup';
import {useNavigation, useTheme} from '@react-navigation/native';
import {t} from 'i18next';
import {
  Center,
  Heading,
  HStack,
  Icon,
  IconButton,
  Image,
  Link,
  Text,
  View,
  VStack,
} from 'native-base';
import React, {useCallback, useState} from 'react';
import {useForm} from 'react-hook-form';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import * as yup from 'yup';

const schema = yup.object().shape({
  email: yup.string().required(),
  password: yup.string().min(6).max(32),
});

const LoginScreen = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<AuthNavigationProp>();
  const {border, card, text} = useTheme().colors;

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

  const [isHiddenPass, setIsHiddenPass] = useState<boolean>(true);

  const onLogin = (value: LoginParams) =>
    dispatch(loginApi({username: value.email, password: value.password}));
  const onToggleShowPass = useCallback(
    () => setIsHiddenPass(!isHiddenPass),
    [isHiddenPass],
  );

  const _buildEyeIcon = () => (
    <IconButton
      colorScheme={'gray'}
      onPress={onToggleShowPass}
      icon={
        <Icon
          name="eye-visibility"
          as={
            <MaterialIcons
              name={!isHiddenPass ? 'visibility-off' : 'visibility'}
              color={useTheme().colors.border}
            />
          }
        />
      }
    />
  );
  return (
    <Container
      flex={1}
      mx="auto"
      justifyContent={'space-between'}
      safeArea
      p={6}>
      <ToggleDarkMode alignSelf="flex-end" />
      <Center>
        <AppLogo />
      </Center>

      <VStack space={3} mt="5">
        <Heading size="md" alignSelf="center">
          {t('login.description')}
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
              size="16px"
              margin={'8px'}
            />
          }
        />
        <IInput
          control={control}
          name="password"
          placeholder={'your password...'}
          errorMessage={errors?.password?.message}
          type={!isHiddenPass ? 'text' : 'password'}
          InputRightElement={_buildEyeIcon()}
          InputLeftElement={
            <Image
              alt="password"
              source={Assets.icon.lock}
              size="16px"
              margin={'8px'}
            />
          }
        />

        <IButton onPress={handleSubmit(onLogin)}>Sign in</IButton>

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

        <HStack mt="6" justifyContent="center" alignItems="center" space={4}>
          <View flex={1} backgroundColor={border} height={'1px'} />
          <Text>Or</Text>
          <View flex={1} backgroundColor={border} height={'1px'} />
        </HStack>

        <HStack mt="6" justifyContent="center" alignItems="center" space={4}>
          <IButton
            backgroundColor={card}
            flex={1}
            borderColor={border}
            borderWidth={1}
            shadow={2}>
            <HStack justifyContent="center" space={2} _text={{color: text}}>
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
            <HStack justifyContent="center" space={2} _text={{color: text}}>
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
