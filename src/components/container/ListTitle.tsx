import {useTheme} from '@react-navigation/native';
import {HStack, Image, Skeleton, Spacer, Text, VStack} from 'native-base';
import React from 'react';
import {ImageSourcePropType} from 'react-native';

interface ListTitleProps {
  rightComponent?: JSX.Element | JSX.Element[];
  leftComponent?: JSX.Element | JSX.Element[];
  source?: ImageSourcePropType;
  title?: string;
  subTitle?: string;
  loading?: boolean;
}

export default ({
  rightComponent,
  loading,
  source,
  title,
  subTitle,
}: ListTitleProps) => {
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
    <HStack
      backgroundColor={colors.card}
      borderRadius="lg"
      padding={4}
      marginTop={4}
      space={4}>
      <Image
        size={16}
        borderRadius="lg"
        source={source}
        alt={`listTitle-${title}`}
      />
      <VStack justifyContent={'center'} space={2}>
        <Text fontWeight="bold">{title}</Text>
        <Text color={'gray.400'}>{subTitle}</Text>
      </VStack>
      <Spacer />
      {!!rightComponent && rightComponent}
    </HStack>
  );
};
