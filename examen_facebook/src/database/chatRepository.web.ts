import { nowIso } from '../utils/date';
import type { Chat, Contact, Message, MessageSender } from '../types/chat.types';

type Store = {
  contacts: Contact[];
  chats: Chat[];
  messages: Message[];
  nextContactId: number;
  nextChatId: number;
  nextMessageId: number;
};

const STORAGE_KEY = 'chatupq-web-store';

const seedContacts = [
  {
    name: 'Ana Martinez',
    phone: '+52 442 100 1201',
    status: 'Disponible para proyecto movil',
    greeting: 'Hola, ya revisaste la practica?',
  },
  {
    name: 'Carlos Vega',
    phone: '+52 442 100 1202',
    status: 'En clase',
    greeting: 'Te paso los apuntes al rato.',
  },
  {
    name: 'Dra. Laura Perez',
    phone: '+52 442 100 1203',
    status: 'Horario de asesoria 4:00 PM',
    greeting: 'Recuerden subir evidencia a GitHub.',
  },
  {
    name: 'Equipo UPQ',
    phone: '+52 442 100 1204',
    status: 'Construyendo apps',
    greeting: 'Tenemos reunion para revisar avances.',
  },
  {
    name: 'Miguel Torres',
    phone: '+52 442 100 1205',
    status: 'Ocupado',
    greeting: 'Ya quedo la base de datos local.',
  },
];

function createSeedStore(): Store {
  const createdAt = nowIso();
  const contacts: Contact[] = [];
  const chats: Chat[] = [];
  const messages: Message[] = [];

  seedContacts.forEach((contact, index) => {
    const contactId = index + 1;
    const chatId = index + 1;

    contacts.push({
      id: contactId,
      name: contact.name,
      phone: contact.phone,
      status: contact.status,
    });

    chats.push({
      id: chatId,
      contactId,
      contactName: contact.name,
      phone: contact.phone,
      status: contact.status,
      lastMessage: contact.greeting,
      lastMessageAt: createdAt,
      unreadCount: contact.name.includes('Dra.') ? 2 : 0,
    });

    messages.push({
      id: index + 1,
      chatId,
      text: contact.greeting,
      sender: 'contact',
      createdAt,
    });
  });

  return {
    contacts,
    chats,
    messages,
    nextContactId: contacts.length + 1,
    nextChatId: chats.length + 1,
    nextMessageId: messages.length + 1,
  };
}

function readStore(): Store {
  const raw = window.localStorage.getItem(STORAGE_KEY);

  if (!raw) {
    return createSeedStore();
  }

  return JSON.parse(raw) as Store;
}

function writeStore(store: Store) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
}

function normalize(value: string) {
  return value.trim().toLowerCase();
}

export async function initializeChatData() {
  const raw = window.localStorage.getItem(STORAGE_KEY);

  if (!raw) {
    writeStore(createSeedStore());
  }
}

export async function getChats(searchTerm = '') {
  const store = readStore();
  const term = normalize(searchTerm);

  return store.chats
    .filter((chat) => {
      if (!term) {
        return true;
      }

      return (
        chat.contactName.toLowerCase().includes(term) ||
        chat.lastMessage.toLowerCase().includes(term)
      );
    })
    .sort((a, b) => b.lastMessageAt.localeCompare(a.lastMessageAt));
}

export async function getContacts(searchTerm = '') {
  const store = readStore();
  const term = normalize(searchTerm);

  return store.contacts
    .filter((contact) => {
      if (!term) {
        return true;
      }

      return contact.name.toLowerCase().includes(term) || contact.phone.includes(term);
    })
    .sort((a, b) => a.name.localeCompare(b.name));
}

export async function getChatById(chatId: number) {
  const store = readStore();
  return store.chats.find((chat) => chat.id === chatId) ?? null;
}

export async function getMessages(chatId: number) {
  const store = readStore();
  return store.messages
    .filter((message) => message.chatId === chatId)
    .sort((a, b) => a.createdAt.localeCompare(b.createdAt) || a.id - b.id);
}

export async function openOrCreateChat(contactId: number) {
  const store = readStore();
  const current = store.chats.find((chat) => chat.contactId === contactId);

  if (current) {
    return current.id;
  }

  const contact = store.contacts.find((item) => item.id === contactId);

  if (!contact) {
    throw new Error('Contacto no encontrado');
  }

  const createdAt = nowIso();
  const chatId = store.nextChatId;

  store.nextChatId += 1;
  store.chats.push({
    id: chatId,
    contactId,
    contactName: contact.name,
    phone: contact.phone,
    status: contact.status,
    lastMessage: 'Chat iniciado',
    lastMessageAt: createdAt,
    unreadCount: 0,
  });

  store.messages.push({
    id: store.nextMessageId,
    chatId,
    text: 'Chat iniciado',
    sender: 'contact',
    createdAt,
  });
  store.nextMessageId += 1;

  writeStore(store);
  return chatId;
}

export async function addMessage(chatId: number, text: string, sender: MessageSender) {
  const store = readStore();
  const createdAt = nowIso();
  const message: Message = {
    id: store.nextMessageId,
    chatId,
    text,
    sender,
    createdAt,
  };

  store.nextMessageId += 1;
  store.messages.push(message);

  store.chats = store.chats.map((chat) =>
    chat.id === chatId
      ? {
          ...chat,
          lastMessage: text,
          lastMessageAt: createdAt,
          unreadCount: sender === 'contact' ? 1 : 0,
        }
      : chat,
  );

  writeStore(store);
  return message;
}

export async function markChatAsRead(chatId: number) {
  const store = readStore();
  store.chats = store.chats.map((chat) =>
    chat.id === chatId ? { ...chat, unreadCount: 0 } : chat,
  );
  writeStore(store);
}

export async function clearChatMessages(chatId: number) {
  const store = readStore();
  const createdAt = nowIso();

  store.messages = store.messages.filter((message) => message.chatId !== chatId);
  store.chats = store.chats.map((chat) =>
    chat.id === chatId
      ? {
          ...chat,
          lastMessage: 'Historial limpio',
          lastMessageAt: createdAt,
          unreadCount: 0,
        }
      : chat,
  );

  writeStore(store);
}
