/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from '../models/User.ts';
import { Chats } from '../models/Chats.ts';
import { SelectedChat } from '../models/SelectedChat.ts';
import { Message } from '../models/Message.ts';

interface ChatContextType {
  user: User | undefined;
  setUser: (user: User) => void;
  selectedChat: SelectedChat | undefined;
  setSelectedChat: (chat: SelectedChat | undefined) => void;
  chats: Chats | undefined;
  // @ts-ignore
  // eslint-disable-next-line
  setChats: (chats: (prevChats) => any[]) => void;
  notification: Message[];
  setNotification: (notification: Message[]) => void;
}

interface ChatProviderProps {
  children: React.ReactNode;
}

const ChatContext = createContext<ChatContextType>({
  chats: undefined,
  // @ts-ignore
  // eslint-disable-next-line
  setChats(chats: (prevChats) => any[]): void {},
  // @ts-ignore
  // eslint-disable-next-line
  setSelectedChat(chat: any): void {},
  // @ts-ignore
  // eslint-disable-next-line
  setUser(user: User): void {},
  user: undefined,
  selectedChat: undefined,
  notification: [] as Message[],
  // @ts-ignore
  // eslint-disable-next-line
  setNotification(notification: Message[]): void {},
});

const ChatProvider = ({ children }: ChatProviderProps): JSX.Element => {
  const [user, setUser] = useState<User | undefined>(undefined);
  const [selectedChat, setSelectedChat] = useState<SelectedChat | undefined>(
    undefined
  );
  const [chats, setChats] = useState<Chats | undefined>([]);
  const [notification, setNotification] = useState<Message[]>([] as Message[]);
  const navigate = useNavigate();

  useEffect(() => {
    // eslint-disable-next-line
    const userInfo = JSON.parse(localStorage.getItem('userInfo')!);
    if (!userInfo) {
      navigate('/login');
    } else {
      setUser(userInfo);
    }
  }, [navigate]);

  return (
    <ChatContext.Provider
      value={{
        user,
        setUser,
        selectedChat,
        setSelectedChat,
        chats,
        setChats,
        notification,
        setNotification,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

const useChatState = (): ChatContextType => {
  const chatState = useContext(ChatContext);
  if (chatState === undefined) {
    throw new Error('useChatState must be used within a ChatProvider');
  }
  return chatState;
};

// eslint-disable-next-line
export { ChatProvider, useChatState };
