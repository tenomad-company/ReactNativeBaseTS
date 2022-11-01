import {useTheme} from '@react-navigation/native';
import {
  Card,
  ChevronRightIcon,
  HStack,
  Image,
  Skeleton,
  Spacer,
  Text,
  VStack,
} from 'native-base';
import {InterfaceHStackProps} from 'native-base/lib/typescript/components/primitives/Stack/HStack';
import React from 'react';
import {
  GestureResponderEvent,
  ImageSourcePropType,
  TouchableOpacity,
} from 'react-native';

interface ListTitleProps {
  rightComponent?: JSX.Element | JSX.Element[];
  leftComponent?: JSX.Element | JSX.Element[];
  source?: ImageSourcePropType;
  title?: string;
  subTitle?: string;
  loading?: boolean;
  onPress?: (event: GestureResponderEvent) => void;
}

export default ({
  rightComponent,
  loading,
  source,
  title,
  subTitle,
  leftComponent,
  onPress,
  ...props
}: ListTitleProps & InterfaceHStackProps) => {
  const {colors} = useTheme();
  if (loading) {
    return (
      <HStack
        borderWidth={1}
        borderColor={colors.border}
        borderRadius="lg"
        padding={4}
        marginTop={4}
        space={4}>
        <Skeleton size={16} borderRadius="lg" />
        <Skeleton.Text flex={1} />
      </HStack>
    );
  }

  return (
    <TouchableOpacity activeOpacity={0.6} disabled={!onPress} onPress={onPress}>
      <HStack
        backgroundColor={colors.card}
        borderRadius="lg"
        padding={4}
        alignItems="center"
        marginTop={4}
        space={4}
        // flex={1}
        {...props}>
        {leftComponent ?? (
          <Image size={16} borderRadius="lg" source={source} alt={`${title}`} />
        )}

        <VStack justifyContent={'center'} space={2} flex={1}>
          <Text fontWeight="bold">{title}</Text>
          {!!subTitle && <Text color={'gray.400'}>{subTitle}</Text>}
        </VStack>
        {/* <Spacer /> */}
        {rightComponent ? rightComponent : <ChevronRightIcon />}
      </HStack>
    </TouchableOpacity>
  );
};
