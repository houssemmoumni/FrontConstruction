import { User } from './user.model';

export interface ChatRoom {
  id: number;
  name: string;
  participants: User[];
  isGroup: boolean;
  lastMessage?: Message;
  unreadCount?: number;
}

export interface Message {
  id: number;
  content: string;
  timestamp: Date;
  senderId: number;
  senderName: string;
  senderAvatar: string;
  chatRoomId: number;
  isMe?: boolean;
}
