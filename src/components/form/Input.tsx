import {FormControl, Icon, IconButton, Input} from 'native-base';
import {IInputProps} from 'native-base/lib/typescript/components/primitives/Input/types';
import React, {FC, useCallback, useState} from 'react';
import {Control, Controller} from 'react-hook-form';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
interface Props {
  label?: string;
  errorMessage?: string;
  onChangeText?: (value: string) => void;
  control?: Control<any>;
  name?: string;
}

export const IInput: FC<IInputProps & Props> = ({
  label,
  errorMessage,
  control,
  name,
  type,
  ...props
}) => {
  const [isHiddenPass, setIsHiddenPass] = useState(true);

  const _type = isHiddenPass ? type : 'text';

  const _buildEyeIcon = useCallback(
    () =>
      type === 'password' ? (
        <IconButton
          colorScheme="gray"
          onPress={() => setIsHiddenPass(!isHiddenPass)}
          rounded="full"
          icon={
            <Icon
              name="eye-visibility"
              as={
                <MaterialIcons
                  name={!isHiddenPass ? 'visibility-off' : 'visibility'}
                  color="border"
                />
              }
            />
          }
        />
      ) : undefined,
    [isHiddenPass, type],
  );

  return (
    <FormControl isInvalid={!!errorMessage}>
      {label && (
        <FormControl.Label fontWeight={'bold'}>{label}</FormControl.Label>
      )}
      <Controller
        control={control}
        rules={{required: true}}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            backgroundColor="card.light"
            borderColor="border.light"
            _dark={{backgroundColor: 'card.dark', borderColor: 'border.dark'}}
            variant="filled"
            padding={4}
            borderRadius="full"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            shadow={1}
            borderWidth={1}
            type={_type}
            InputRightElement={_buildEyeIcon()}
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
