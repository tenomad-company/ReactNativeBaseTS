import {colors} from '@/constants/style';
import {RootNavigationProp} from '@/navigations/type';
import {useNavigation} from '@react-navigation/native';
import {HStack, Pressable, useColorMode} from 'native-base';
import React, {useCallback, useMemo} from 'react';
import Feather from 'react-native-vector-icons/Feather';

function SettingLink() {
  const navigation = useNavigation<RootNavigationProp>();
  const {colorMode} = useColorMode();
  const isLight = useMemo(() => colorMode === 'light', [colorMode]);

  const goToSetting = useCallback(
    () => navigation.navigate('Settings'),
    [navigation],
  );

  return (
    <HStack space={2} alignItems="center">
      <Pressable
        p={1}
        borderRadius={4}
        bg={isLight ? colors.darkPrimary[500] : colors.primary[500]}
        onPress={goToSetting}
        aria-label={isLight ? 'switch to dark mode' : 'switch to light mode'}>
        <Feather name="settings" color={'white'} size={16} />
      </Pressable>
    </HStack>
  );
}

export default SettingLink;
