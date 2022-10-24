import {RootNavigationProp} from '@/navigations/type';
import {useNavigation} from '@react-navigation/native';
import {HStack, Icon, Pressable, useColorMode} from 'native-base';
import React, {useCallback, useMemo} from 'react';
import Feather from 'react-native-vector-icons/Feather';

type Props = {
  iconColor?: string;
};

function SettingLink({iconColor}: Props) {
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
        onPress={goToSetting}
        aria-label={isLight ? 'switch to dark mode' : 'switch to light mode'}>
        <Icon
          as={Feather}
          name="settings"
          color={iconColor || (isLight ? 'darkText' : 'lightText')}
          size="md"
        />
      </Pressable>
    </HStack>
  );
}

export default SettingLink;
