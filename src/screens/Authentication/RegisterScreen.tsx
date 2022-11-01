import AppLogo from '@/components/AppLogo';
import IButton from '@/components/button/Button';
import ToggleDarkMode from '@/components/button/ToggleDarkMode';
import Container from '@/components/container/Container';
import {IInput} from '@/components/form/Input';
import {Assets} from '@/constants/assets';
import {LoginParams, RegisterParams} from '@/models/params/AuthParams';
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

const RegisterScreen = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<AuthNavigationProp>();
  const {border} = useTheme().colors;

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
  } = useForm<RegisterParams>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: '77498623',
      password: 'nINDXMn3QerQumz',
      confirmPassword: 'nINDXMn3QerQumz',
    },
  });

  const [isHiddenPass, setIsHiddenPass] = useState<boolean>(true);
  const [isHiddenConfirmPass, setIsConfirmPassword] = useState<boolean>(true);

  const onLogin = (value: LoginParams) =>
    dispatch(loginApi({username: value.email, password: value.password}));

  const onToggleShowPass = useCallback(
    () => setIsHiddenPass(!isHiddenPass),
    [isHiddenPass],
  );
  const onToggleShowConfirmPass = useCallback(
    () => setIsConfirmPassword(!isHiddenConfirmPass),
    [isHiddenConfirmPass],
  );

  const buildEyIcon = (type: string) => {
    switch (type) {
      case 'password':
        return (
          <IconButton
            colorScheme={'gray'}
            onPress={onToggleShowPass}
            icon={getIcon(isHiddenPass)}
          />
        );

      default:
        return (
          <IconButton
            colorScheme={'gray'}
            onPress={onToggleShowConfirmPass}
            icon={getIcon(isHiddenConfirmPass)}
          />
        );
    }
  };

  const getIcon = (value: boolean) => {
    let name = value ? 'visibility-off' : 'visibility';

    return (
      <Icon
        name="eye-visibility"
        as={<MaterialIcons name={name} color={border} />}
      />
    );
  };

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
          {t('register.title')}
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
              resizeMode="contain"
            />
          }
        />
        <IInput
          control={control}
          name="password"
          placeholder={'your password...'}
          errorMessage={errors?.password?.message}
          type={!isHiddenPass ? 'text' : 'password'}
          InputRightElement={buildEyIcon('password')}
          InputLeftElement={
            <Image
              alt="password"
              source={Assets.icon.lock}
              size="16px"
              margin={'8px'}
              resizeMode="contain"
            />
          }
        />
        <IInput
          control={control}
          name="confirmPassword"
          placeholder={'your password...'}
          errorMessage={errors?.confirmPassword?.message}
          type={!isHiddenConfirmPass ? 'text' : 'password'}
          InputRightElement={buildEyIcon('confirm')}
          InputLeftElement={
            <Image
              alt="password"
              source={Assets.icon.lock}
              size="16px"
              margin={'8px'}
              resizeMode="contain"
            />
          }
        />

        <IButton onPress={handleSubmit(onLogin)}>{t('login.title')}</IButton>

        <HStack mt="6" justifyContent="center">
          <Text
            fontSize="sm"
            color="coolGray.600"
            _dark={{color: 'warmGray.200'}}>
            {t('register.hadAccount')}.{' '}
          </Text>
          <Link
            _text={{
              color: 'primary.500',
              fontWeight: 'bold',
            }}
            onPress={navigation.goBack}>
            {t('login.title')}
          </Link>
        </HStack>
      </VStack>
      <View />
    </Container>
  );
};

export default RegisterScreen;
