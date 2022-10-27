import {Image, IImageProps, useColorModeValue} from 'native-base';
import React from 'react';

const logo = {
  light: {
    img: require('@Assets/images/logo.png'),
    alt: 'logo',
  },
  dark: {
    img: require('@Assets/images/logo_dark.png'),
    alt: 'logo_dark',
  },
};

function AppLogo(props: IImageProps) {
  const image = useColorModeValue(logo.light, logo.dark);

  return (
    <Image
      key={image.alt}
      source={image.img}
      alt={image.alt}
      resizeMode="cover"
      {...props}
    />
  );
}

export default AppLogo;
