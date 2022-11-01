import {Box, IBoxProps, useColorModeValue} from 'native-base';
import React, {FC} from 'react';
import {ImageBackground, StyleSheet} from 'react-native';

interface ContainerProps {}

const bg = {
  light: {
    img: require('@Assets/images/bg.png'),
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
    <ImageBackground
      key={image.alt}
      source={image.img}
      style={styles.background}>
      <Box flex={1} w="full" {...props}>
        {props.children}
      </Box>
    </ImageBackground>
  );
};
export default Container;

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
});
