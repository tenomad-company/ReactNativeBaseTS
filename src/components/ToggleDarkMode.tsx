import {HStack, Icon, Pressable, useColorMode} from 'native-base';
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
        onPress={toggleColorMode}
        aria-label={isLight ? 'switch to dark mode' : 'switch to light mode'}>
        <Icon
          as={Feather}
          name={isLight ? 'sun' : 'moon'}
          color={isLight ? 'text.light' : 'text.dark'}
          size="md"
        />
      </Pressable>
    </HStack>
  );
}

export default ToggleDarkMode;
