import { User } from "./User.ts";

export interface Message {
  _id: string;
  sender: MessageSender;
  content: string;
  chat: MessageChat;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
export interface MessageSender {
  _id: string;
  name: string;
  email: string;
  picture?: string;
}
export interface MessageChat {
  _id: string;
  chatName: string;
  isGroupChat: boolean;
  users: User[];
  groupAdmin: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  latestMessage: string;
}
