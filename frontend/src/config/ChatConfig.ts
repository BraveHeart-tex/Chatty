import { User } from "../models/User.ts";

export const getSender = (loggedUser: User | undefined, users: User[]) => {
  return users[0]._id === loggedUser?._id ? users[1].name : users[0].name;
};
