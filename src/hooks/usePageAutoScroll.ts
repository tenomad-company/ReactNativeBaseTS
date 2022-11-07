import {useCallback, useEffect, useRef} from 'react';
import {FlatList} from 'react-native';

type Props = {
  ref: React.MutableRefObject<FlatList<any> | undefined>;
  itemLength?: number;
};

const usePageAutoScroll = ({ref, itemLength}: Props) => {
  const promotionIndex = useRef(0);

  const autoScroll = useCallback(() => {
    const n = itemLength || 0;
    if (n <= 1) return;

    promotionIndex.current = promotionIndex.current + 1;
    if (promotionIndex.current > n - 1) promotionIndex.current = 0;

    ref?.current?.scrollToIndex({
      index: promotionIndex.current,
      animated: true,
    });
  }, [itemLength, ref]);

  useEffect(() => {
    const interval = setInterval(autoScroll, 3000);
    return () => {
      clearInterval(interval);
    };
  }, [autoScroll]);
};

export default usePageAutoScroll;
