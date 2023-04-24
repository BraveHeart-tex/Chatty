export type Chats = ChatsChild[];
export interface ChatsChildUsers {
	_id: string;
	name: string;
	email: string;
	picture: string;
	createdAt: string;
	updatedAt: string;
	__v: number;
}
export interface ChatsChild {
	_id: string;
	chatName: string;
	isGroupChat: boolean;
	users: ChatsChildUsers[];
	createdAt: string;
	updatedAt: string;
	__v: number;
}