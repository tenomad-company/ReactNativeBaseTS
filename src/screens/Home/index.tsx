import {StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import PageContainer from '@/components/container/PageContainer';
import {Box, Button, VStack} from 'native-base';

// TEST
function delay(time: number) {
  return new Promise(res => setTimeout(res, time));
}

const HomeScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isEmpty, setIsEmpty] = useState(true);
  const [pageInitlazited, setPageInitlazited] = useState(false);
  const [didMount, setDidMount] = useState(false);
  const initPage = async () => {
    await delay(3000);
    setPageInitlazited(true);
  };

  const onRefresh = async () => {
    await initPage();
    setIsEmpty(false);
  };
  const onSubmitData = async () => {
    setIsLoading(true);
    await delay(3000);
    setIsLoading(false);
  };

  useEffect(() => {
    setDidMount(true);
    initPage();

    return () => setDidMount(false);
  }, []);
  if (!didMount) {
    return null;
  }
  return (
    <PageContainer
      isEmpty={isEmpty}
      onRefresh={onRefresh}
      initialized={pageInitlazited}
      isLoading={isLoading}>
      <Box alignContent={'center'} justifyContent="center" flex={1}>
        <Text>Page has data</Text>
        <VStack space={2} mt={8}>
          <Button onPress={onSubmitData}>Submit data</Button>
        </VStack>
      </Box>
    </PageContainer>
  );
};

export default HomeScreen;
