import {useTheme} from '@react-navigation/native';
import {FormControl, Input} from 'native-base';
import {IInputProps} from 'native-base/lib/typescript/components/primitives/Input/types';
import React, {FC} from 'react';
import {Control, Controller} from 'react-hook-form';
interface Props {
  label?: string;
  placeholder?: string;
  errorMessage?: string;
  onChangeText?: (value: string) => void;
  control?: Control<any>;
  name?: string;
}

export const IInput: FC<IInputProps & Props> = ({
  label,
  placeholder,
  errorMessage,
  control,
  name,
  ...props
}) => {
  const {colors} = useTheme();

  return (
    <FormControl isInvalid={!!errorMessage}>
      {label && (
        <FormControl.Label fontWeight={'bold'}>{label}</FormControl.Label>
      )}
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            backgroundColor={colors.card}
            variant="filled"
            padding={4}
            borderRadius={'full'}
            type={placeholder}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            shadow={1}
            borderWidth={1}
            borderColor={colors.border}
            placeholder={placeholder}
            {...props}
          />
        )}
        name={name ?? 'TextInput'}
      />
      <FormControl.ErrorMessage
        margin={0}
        _text={{fontStyle: 'italic', fontSize: 'sm'}}>
        {errorMessage}
      </FormControl.ErrorMessage>
    </FormControl>
  );
};
