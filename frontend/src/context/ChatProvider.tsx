import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "../models/User.ts";
import { Chats } from "../models/Chats.ts";
import { SelectedChat } from "../models/SelectedChat.ts";

interface ChatContextType {
  user: User | undefined;
  setUser: (user: User) => void;
  selectedChat: SelectedChat | undefined;
  setSelectedChat: (chat: SelectedChat | undefined) => void;
  chats: Chats | undefined;
  setChats: (chats: Chats) => void;
}

interface ChatProviderProps {
  children: React.ReactNode;
}

const ChatContext = createContext<ChatContextType>({
  chats: undefined,
  setChats(chats: Chats): void {},
  setSelectedChat(chat: any): void {},
  setUser(user: User): void {},
  user: undefined,
  selectedChat: undefined,
});

const ChatProvider = ({ children }: ChatProviderProps): JSX.Element => {
  const [user, setUser] = useState<User | undefined>(undefined);
  const [selectedChat, setSelectedChat] = useState<SelectedChat | undefined>(
    undefined
  );
  const [chats, setChats] = useState<Chats | undefined>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (!userInfo) {
      navigate("/login");
    } else {
      setUser(userInfo);
    }
  }, [navigate]);

  return (
    <ChatContext.Provider
      value={{ user, setUser, selectedChat, setSelectedChat, chats, setChats }}
    >
      {children}
    </ChatContext.Provider>
  );
};

const useChatState = (): ChatContextType => {
  const chatState = useContext(ChatContext);
  if (chatState === undefined) {
    throw new Error("useChatState must be used within a ChatProvider");
  }
  return chatState;
};

export { ChatProvider, useChatState };