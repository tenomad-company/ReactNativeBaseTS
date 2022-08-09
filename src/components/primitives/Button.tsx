import {Button as BaseButton, useColorModeValue} from 'native-base';
import React from 'react';

function Button(props: any) {
  return (
    <BaseButton
      colorScheme={
        props.colorScheme || useColorModeValue('primary', 'darkPrimary')
      }
      {...props}
    />
  );
}

export default Button;
