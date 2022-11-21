import {
  Alert,
  CloseIcon,
  HStack,
  IAlertProps,
  IconButton,
  Text,
  Toast,
  VStack,
} from 'native-base';
import React from 'react';

type IToastAlertProps = IAlertProps & {
  id: string;
  title: string;
  description: string;
  isClosable?: boolean;
};

const ToastAlert = ({
  id,
  status,
  variant,
  title,
  description,
  isClosable,
  ...rest
}: IToastAlertProps) => {
  return (
    <Alert
      maxWidth="100%"
      alignSelf="center"
      flexDirection="row"
      status={status ? status : 'info'}
      variant={variant}
      {...rest}>
      <VStack space={1} flexShrink={1} w="100%">
        <HStack
          flexShrink={1}
          alignItems="center"
          justifyContent="space-between">
          <HStack space={2} flexShrink={1} alignItems="center">
            <Alert.Icon />
            <Text
              fontSize="md"
              fontWeight="medium"
              flexShrink={1}
              color={
                variant === 'solid'
                  ? 'lightText'
                  : variant !== 'outline'
                  ? 'darkText'
                  : null
              }>
              {title}
            </Text>
          </HStack>
          {isClosable ? (
            <IconButton
              variant="unstyled"
              icon={<CloseIcon size="3" />}
              _icon={{
                color: variant === 'solid' ? 'lightText' : 'darkText',
              }}
              onPress={() => Toast.close(id)}
              hitSlop={20}
            />
          ) : null}
        </HStack>
        <Text
          px="6"
          color={
            variant === 'solid'
              ? 'lightText'
              : variant !== 'outline'
              ? 'darkText'
              : null
          }>
          {description}
        </Text>
      </VStack>
    </Alert>
  );
};

export default ToastAlert;
