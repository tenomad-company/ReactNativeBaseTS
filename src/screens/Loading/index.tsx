import {Center, Heading, Spinner} from 'native-base';
import React from 'react';

const LoadingScreen = () => {
  return (
    <Center flex={1} justifyContent="center">
      <Spinner accessibilityLabel="Loading" />
      <Heading color="primary.500" fontSize="md">
        Loading
      </Heading>
    </Center>
  );
};

export default LoadingScreen;
