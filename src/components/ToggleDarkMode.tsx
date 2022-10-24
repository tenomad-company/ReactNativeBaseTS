import {HStack, Icon, Pressable, useColorMode} from 'native-base';
import React, {useMemo} from 'react';
import Feather from 'react-native-vector-icons/Feather';

type Props = {
  iconColor?: string;
};

// Color Switch Component
function ToggleDarkMode({iconColor}: Props) {
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
          color={iconColor || (isLight ? 'darkText' : 'lightText')}
          size="md"
        />
      </Pressable>
    </HStack>
  );
}

export default ToggleDarkMode;
