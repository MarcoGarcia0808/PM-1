export type MessageSender = 'me' | 'contact';

export type Contact = {
  id: number;
  name: string;
  phone: string;
  status: string;
};

export type Chat = {
  id: number;
  contactId: number;
  contactName: string;
  phone: string;
  status: string;
  lastMessage: string;
  lastMessageAt: string;
  unreadCount: number;
};

export type Message = {
  id: number;
  chatId: number;
  text: string;
  sender: MessageSender;
  createdAt: string;
};
