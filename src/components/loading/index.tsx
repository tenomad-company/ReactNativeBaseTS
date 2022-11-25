import {Heading, Modal, Spinner, VStack} from 'native-base';
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

type LoadingState = {
  isLoading: boolean;
  showLoading: () => void;
  hideLoading: () => void;
};

const defaultState = {
  isLoading: false,
  showLoading: () => {},
  hideLoading: () => {},
};

const LoadingContext = createContext<LoadingState>(defaultState);

export const useLoading = () => useContext<LoadingState>(LoadingContext);

export let LoadingRoot: LoadingState = defaultState;

const LoadingProvider: React.FC<React.ReactNode> = ({children}) => {
  const [isLoading, setLoading] = useState(false);

  const stateValue = useMemo(
    () => ({
      isLoading,
      showLoading: () => setLoading(true),
      hideLoading: () => setLoading(false),
    }),
    [isLoading],
  );

  useEffect(() => {
    LoadingRoot = stateValue;
  }, [stateValue]);

  return (
    <LoadingContext.Provider value={stateValue}>
      {children}
      <Modal
        isOpen={isLoading}
        onClose={() => setLoading(false)}
        closeOnOverlayClick={false}>
        <VStack p={2} space={2} rounded="lg">
          <Spinner
            accessibilityLabel="Loading"
            color="secondary.400"
            size="lg"
          />
          <Heading color="secondary.400" fontSize="sm">
            Please wait...
          </Heading>
        </VStack>
      </Modal>
    </LoadingContext.Provider>
  );
};

export default LoadingProvider;
