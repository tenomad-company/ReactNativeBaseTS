import Button from '@/components/primitives/Button';
import {AppNavigationProps} from '@/navigations/route';
import {useNavigation} from '@react-navigation/native';
import {Box, Heading, Image, Text, VStack} from 'native-base';
import React, {useCallback, useState} from 'react';
import {useTranslation} from 'react-i18next';

const images: any = {
  '1': {
    img: require('@Assets/images/food_onboard.png'),
    alt: 'food_onboard',
  },
  '2': {
    img: require('@Assets/images/food_onboard_2.png'),
    alt: 'food_onboard_2',
  },
};

const Onboarding = () => {
  const navigation = useNavigation<AppNavigationProps>();
  const {t} = useTranslation();
  const [step, setStep] = useState(1);

  const onNext = useCallback(() => {
    if (step === 2) {
      navigation.navigate('AuthStack');
      return;
    }

    setStep(step + 1);
  }, [navigation, step]);

  return (
    <Box safeArea flex={1}>
      <Box flex={1}>
        <Image
          key={images[step].alt}
          source={images[step].img}
          alt={images[step].alt}
          resizeMode="cover"
        />
      </Box>
      <VStack flex={1} space="md" alignItems="center" justifyContent="center">
        <Heading textAlign="center">{t(`onboarding.slogan${step}`)}</Heading>
        <Text textAlign="center">{t(`onboarding.subSlogan${step}`)}</Text>
        <Button
          borderRadius="lg"
          w={160}
          mt={2}
          fontWeight="bold"
          onPress={onNext}>
          <Text textAlign="center" fontWeight="bold" color="lightText">
            {t('common.next')}
          </Text>
        </Button>
      </VStack>
    </Box>
  );
};

export default Onboarding;
