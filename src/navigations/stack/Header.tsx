import {getHeaderTitle} from '@react-navigation/elements';
import {NativeStackHeaderProps} from '@react-navigation/native-stack';
import {Box, HStack, Icon, Pressable, Text} from 'native-base';
import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

type CustomHeaderProps = {
  showTitle?: boolean;
};

const Header = ({
  navigation,
  route,
  options,
  showTitle,
}: NativeStackHeaderProps & CustomHeaderProps) => {
  const title = getHeaderTitle(options, route.name);

  return (
    <Box safeArea bg="background.light" _dark={{bg: 'background.dark'}}>
      <HStack alignItems="center">
        <Pressable
          size={10}
          ml={4}
          bg="tertiary.501"
          _dark={{bg: 'tertiary.502'}}
          borderRadius="xl"
          alignItems="center"
          justifyContent="center"
          onPress={() => navigation.goBack()}>
          <Icon
            as={MaterialIcons}
            size={8}
            name="chevron-left"
            color="tertiary.500"
          />
        </Pressable>
        {showTitle && title && <Text>{title}</Text>}
      </HStack>
    </Box>
  );
};

export default React.memo(Header);
