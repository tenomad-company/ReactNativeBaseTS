import {Box, IBoxProps, useColorModeValue} from 'native-base';
import React, {FC} from 'react';
import {ImageBackground, StyleSheet} from 'react-native';

interface ContainerProps {}

const bg = {
  light: {
    img: require('@Assets/images/background.png'),
    alt: 'bg',
  },
  dark: {
    img: require('@Assets/images/background_dark.png'),
    alt: 'bg_dark',
  },
};

const Container: FC<IBoxProps<ContainerProps>> = ({...props}) => {
  const image = useColorModeValue(bg.light, bg.dark);

  return (
    <Box flex={1} w="full" {...props}>
      <ImageBackground
        key={image.alt}
        source={image.img}
        style={styles.background}>
        {props.children}
      </ImageBackground>
    </Box>
  );
};
export default Container;

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
});
