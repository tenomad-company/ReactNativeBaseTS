import {HStack, Icon, Input, Pressable} from 'native-base';
import React from 'react';
import Feather from 'react-native-vector-icons/Feather';

import FilterIcon from '@Assets/icons/filter.svg';

type Props = {
  //
};

const SearchBar = ({}: Props) => {
  return (
    <HStack space={2} px={4}>
      <Input
        flex={1}
        placeholder="What do you want to order?"
        placeholderTextColor="tertiary.505"
        InputLeftElement={
          <Icon
            as={<Feather name="search" />}
            size={5}
            ml="4"
            color="tertiary.500"
          />
        }
        borderWidth={0}
        borderRadius="xl"
        backgroundColor="tertiary.501"
        _dark={{backgroundColor: 'dark.600'}}
      />

      <Pressable
        px={3}
        backgroundColor="tertiary.501"
        _dark={{backgroundColor: 'dark.600'}}
        borderRadius="xl"
        alignItems="center"
        justifyContent="center">
        <Icon size={'md'} as={FilterIcon} />
      </Pressable>
    </HStack>
  );
};

export default React.memo(SearchBar);
