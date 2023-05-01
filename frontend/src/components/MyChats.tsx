/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useChatState } from '../context/ChatProvider.tsx';
import { useEffect } from 'react';
import { Box, Button, Stack, Text } from '@chakra-ui/react';
import axios from 'axios';
import ChatLoading from './ChatLoading.tsx';
import { getSender } from '../config/ChatConfig.ts';
import GroupChatModal from './mixed/GroupChatModal.tsx';
import { PlusSquareIcon } from '@chakra-ui/icons';
import { useQuery } from '@tanstack/react-query';
import { ChatsChild } from '../models/Chats.ts';

interface IMyChatsProps {
  fetchAgain: boolean;
}
const MyChats = ({ fetchAgain }: IMyChatsProps) => {
  const { selectedChat, setSelectedChat, user, setChats } = useChatState();
  const loggedUser = JSON.parse(localStorage.getItem('userInfo') as string);

  const { data: chats } = useQuery(['myChats'], async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    };
    const { data } = await axios.get(
      'https://chatty-backend-service.onrender.com/api/chat',
      config
    );
    return data;
  });

  useEffect(() => {
    if (fetchAgain) {
      setChats(chats);
    }
  }, [chats, fetchAgain, setChats]);

  return (
    <Box
      display={{ base: selectedChat ? 'none' : 'flex', md: 'flex' }}
      flexDirection='column'
      alignItems='center'
      p={3}
      bg='#edf2f4'
      w={{ base: '100%', md: '31%' }}
      borderRadius='lg'
      borderWidth='1px'
    >
      <Box
        pb={3}
        px={3}
        fontSize={{ base: '28px', md: '30px' }}
        fontFamily='Work sans'
        display='flex'
        w='100%'
        justifyContent='space-between'
        alignItems='center'
        color='blue.400'
      >
        My Chats
        <GroupChatModal>
          <Button
            display='flex'
            fontSize={{ base: '17px', md: '15px', lg: '17px' }}
            rightIcon={<PlusSquareIcon />}
          >
            New Group Chat
          </Button>
        </GroupChatModal>
      </Box>
      <Box
        display='flex'
        flexDirection='column'
        p={3}
        bg='#F8F8F8'
        w='100%'
        h='100%'
        borderRadius='lg'
        overflowY='hidden'
      >
        {chats ? (
          <Stack overflowY='scroll'>
            {chats.map((chat: ChatsChild) => (
              <Box
                // @ts-ignore
                onClick={() => setSelectedChat(chat)}
                cursor='pointer'
                bg={selectedChat === chat ? 'blue.300' : 'blue.200'}
                color={selectedChat === chat ? 'white' : 'facebook.500'}
                px={3}
                py={2}
                borderRadius='lg'
                key={chat._id}
              >
                <Text>
                  {!chat.isGroupChat
                    ? getSender(loggedUser, chat.users)
                    : chat.chatName}
                </Text>
              </Box>
            ))}
          </Stack>
        ) : (
          <ChatLoading />
        )}
      </Box>
    </Box>
  );
};

export default MyChats;
