export interface Message {
    id: number;
    content: string;
    timestamp: Date;
    senderId: number;
    chatRoomId: number;
    senderName?: string;
    senderAvatar?: string;
  }

  export interface WebSocketMessage {
    type: 'NEW_MESSAGE' | 'USER_JOINED';
    id?: number;
    content?: string;
    timestamp?: string;
    senderId?: number;
    chatRoomId?: number;
    senderName?: string;
    senderAvatar?: string;
    userId?: number; // For USER_JOINED events
  }



