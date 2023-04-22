import { useQuery } from '@tanstack/react-query';
import { Chat } from '../models/Chat';
import axios from 'axios';

const ChatPage = () => {
  const fetchChats = () => axios.get('/api/chat').then((res) => res.data);

  const { data, isLoading, error } = useQuery({
    queryKey: ['chats'],
    queryFn: fetchChats,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {data.map((chat: Chat) => (
        <div key={chat._id}>{chat.chatName}</div>
      ))}
    </div>
  );
};
export default ChatPage;
