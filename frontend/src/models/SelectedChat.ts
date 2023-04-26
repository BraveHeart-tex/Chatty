export type SelectedChat = RootObjectChild;
export interface RootObjectChildUsers {
  _id: string;
  name: string;
  email: string;
  picture: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
export interface RootObjectChildGroupAdmin {
  _id: string;
  name: string;
  email: string;
  picture: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
export interface RootObjectChild {
  _id: string;
  chatName: string;
  isGroupChat: boolean;
  users: RootObjectChildUsers[];
  groupAdmin: RootObjectChildGroupAdmin;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
