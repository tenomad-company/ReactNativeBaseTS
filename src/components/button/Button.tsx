import {Button as BaseButton, IButtonProps} from 'native-base';
import React from 'react';

const _Button = (props: IButtonProps) => {
  return (
    <BaseButton padding={'12px'} borderRadius={'16px'} shadow={3} {...props} />
  );
};

const IButton = React.memo(_Button);

export default IButton;
