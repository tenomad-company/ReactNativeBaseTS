import {colors} from '@/constants/style';
import {HStack, Pressable, useColorMode} from 'native-base';
import React, {useMemo} from 'react';
import Feather from 'react-native-vector-icons/Feather';

// Color Switch Component
function ToggleDarkMode() {
  const {colorMode, toggleColorMode} = useColorMode();
  const isLight = useMemo(() => colorMode === 'light', [colorMode]);

  return (
    <HStack space={2} alignItems="center">
      <Pressable
        p={1}
        borderRadius={4}
        bg={isLight ? colors.darkPrimary[500] : colors.primary[500]}
        onPress={toggleColorMode}
        aria-label={isLight ? 'switch to dark mode' : 'switch to light mode'}>
        <Feather name={isLight ? 'sun' : 'moon'} color={'white'} size={16} />
      </Pressable>
    </HStack>
  );
}

export default ToggleDarkMode;
