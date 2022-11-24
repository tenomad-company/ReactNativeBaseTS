import usePageAutoScroll from '@Hooks/usePageAutoScroll';
import {Promotion} from '@Models/Promotion';
import {AspectRatio, FlatList, Image} from 'native-base';
import React, {useCallback, useRef} from 'react';
import {FlatList as RNFlatList} from 'react-native';

type Props = {
  data?: Promotion[];
};

const SlideBanner = ({data}: Props) => {
  const ref = useRef<RNFlatList>();
  usePageAutoScroll({ref, itemLength: data?.length});

  const renderItem = useCallback(({item}) => {
    return (
      <AspectRatio ratio={325 / 150} mx="4">
        <Image
          key={item.id}
          alt={item.name}
          source={{uri: item.image}}
          w="full"
          borderRadius="xl"
          flexGrow={1}
        />
      </AspectRatio>
    );
  }, []);

  return (
    <AspectRatio ratio={325 / 150}>
      <FlatList
        ref={ref}
        data={data}
        nestedScrollEnabled={true}
        showsHorizontalScrollIndicator={false}
        horizontal
        keyExtractor={(item, index) => `${item.id || index}`}
        w="full"
        renderItem={renderItem}
        pagingEnabled
      />
    </AspectRatio>
  );
};

export default React.memo(SlideBanner);
