import {
  HStack,
  Icon,
  IPressableProps,
  Pressable,
  useColorMode,
} from 'native-base';
import React, {useMemo} from 'react';
import Feather from 'react-native-vector-icons/Feather';

type Props = {
  iconColor?: string;
};

// Color Switch Component
function ToggleDarkMode({iconColor, ...props}: Props & IPressableProps) {
  const {colorMode, toggleColorMode} = useColorMode();
  const isLight = useMemo(() => colorMode === 'light', [colorMode]);

  return (
    <Pressable
      p={1}
      borderRadius={4}
      onPress={toggleColorMode}
      aria-label={isLight ? 'switch to dark mode' : 'switch to light mode'}
      {...props}>
      <Icon
        as={Feather}
        name={isLight ? 'sun' : 'moon'}
        color={iconColor || (isLight ? 'darkText' : 'lightText')}
        size="md"
      />
    </Pressable>
  );
}

export default ToggleDarkMode;
