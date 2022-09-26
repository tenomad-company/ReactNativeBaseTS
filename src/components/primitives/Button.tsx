import {
  Button as BaseButton,
  IButtonProps,
  useColorModeValue,
} from 'native-base';
import React from 'react';

const _Button = (props: IButtonProps) => {
  const defaultScheme = useColorModeValue('primary', 'darkPrimary');
  return (
    <BaseButton colorScheme={props.colorScheme || defaultScheme} {...props} />
  );
};

const Button = React.memo(_Button);

export default Button;
