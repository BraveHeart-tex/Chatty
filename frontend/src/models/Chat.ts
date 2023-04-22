export interface Chat {
  isGroupChat: boolean;
  users: User[];
  _id: string;
  chatName: string;
  groupAdmin?: GroupAdmin;
}

export interface User {
  name: string;
  email: string;
}

export interface GroupAdmin {
  name: string;
  email: string;
}
