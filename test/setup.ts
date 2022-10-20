// we always make sure 'react-native' gets included first
import 'react-native';

// libraries to mock
import './mock-react-native-image';
import './mock-async-storage';

jest.useFakeTimers();
declare global {
  let __TEST__: any;
}
