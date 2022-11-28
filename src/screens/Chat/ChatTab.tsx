import Container from '@Components/container/Container';
import ListTitle from '@Components/container/ListTitle';
import ExtendedFlatlist from '@Components/scroll/ExtendedFlatlist';
import {ChatModel} from '@Models/ChatModel';
import {Text} from 'native-base';
import React, {FC, useEffect, useState} from 'react';

interface ChatTabProps {}

const MOCK_TEST: ChatModel[] = [
  {
    id: '1',
    name: 'Amin Hook',
    message: 'How are you?',
    avatar:
      'https://images.pexels.com/photos/13445734/pexels-photo-13445734.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: '2',
    name: 'Layka',
    message: "I'm Layka",
    avatar:
      'https://images.pexels.com/photos/12712925/pexels-photo-12712925.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load',
  },
  {
    id: '4',
    name: 'Linda',
    message: "I'm Linda",
    avatar:
      'https://images.pexels.com/photos/14099311/pexels-photo-14099311.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load',
  },
  {
    id: '5',
    name: 'Jack',
    message: 'Where are you from?',
    avatar:
      'https://images.pexels.com/photos/14028118/pexels-photo-14028118.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load',
  },
];

const ChatTabScreen: FC<ChatTabProps> = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<ChatModel[]>([]);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setData(MOCK_TEST);
      setIsLoading(false);
    }, 1);
  }, []);

  return (
    <Container safeArea padding={4} flex={1}>
      <ExtendedFlatlist
        data={data}
        keyExtractor={item => `${item.id} `}
        isLoading={isLoading}
        renderItem={({item, index}) => (
          <ListTitle
            source={{uri: item.avatar}}
            key={item.id}
            title={item.name}
            subTitle={item.message}
            rightComponent={<Text color={'gray.400'}>12:20:00</Text>}
          />
        )}
      />
    </Container>
  );
};

export default ChatTabScreen;
