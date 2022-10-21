import {Assets} from '@/constants/assets';
import AnimatedLottieView from 'lottie-react-native';
import {View} from 'native-base';
import {InterfaceBoxProps} from 'native-base/lib/typescript/components/primitives/Box';
import React, {FC} from 'react';
import {Modal, RefreshControl, ScrollView, StyleSheet} from 'react-native';

interface PageContainerProps {
  isLoading?: boolean;
  initialized?: boolean;
  isEmpty?: boolean;
  onRefresh?(): Promise<void>;
}

const PageContainer: FC<PageContainerProps & InterfaceBoxProps> = ({
  isLoading = false,
  initialized = false,
  isEmpty = false,
  onRefresh,
  ...props
}) => {
  const [refreshing, setRefreshing] = React.useState(false);

  const _onRefresh = React.useCallback(async () => {
    if (onRefresh) {
      setRefreshing(true);
      await onRefresh();
      setRefreshing(false);
    }
  }, [onRefresh]);

  const _renderChild = () => {
    if (!initialized) {
      return (
        <View flex={1} alignItems="center" justifyContent={'center'}>
          <AnimatedLottieView source={Assets.pageInit} autoPlay loop />
        </View>
      );
    }

    if (isEmpty) {
      return <AnimatedLottieView source={Assets.pageEmpty} autoPlay loop />;
    }

    return props.children;
  };

  const _buildLoading = () => {
    return (
      <Modal visible={isLoading} animationType="fade" transparent={true}>
        <View
          flex={1}
          alignContent="center"
          justifyContent={'center'}
          backgroundColor={'rgba(0, 0, 0, 0.5)'}>
          <AnimatedLottieView source={Assets.loading} autoPlay loop />
        </View>
      </Modal>
    );
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={_onRefresh} />
      }>
      {_renderChild()}
      {_buildLoading()}
    </ScrollView>
  );
};
export default PageContainer;

const styles = StyleSheet.create({
  emptyImage: {width: '100%'},
  initImage: {
    width: '50%',
  },
  container: {
    flexGrow: 1,
  },
});
