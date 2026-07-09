import { getDatabase, setupDatabase } from './db';
import { nowIso } from '../utils/date';
import type { Chat, Contact, Message, MessageSender } from '../types/chat.types';

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

type CountRow = {
  total: number;
};

export async function initializeChatData() {
  await setupDatabase();
  const db = await getDatabase();
  const count = await db.getFirstAsync<CountRow>('SELECT COUNT(*) as total FROM contacts');

  if ((count?.total ?? 0) > 0) {
    return;
  }

  for (const contact of seedContacts) {
    const createdAt = nowIso();
    const contactResult = await db.runAsync(
      'INSERT INTO contacts (name, phone, status) VALUES (?, ?, ?)',
      contact.name,
      contact.phone,
      contact.status,
    );

    const chatResult = await db.runAsync(
      'INSERT INTO chats (contactId, lastMessage, lastMessageAt, unreadCount) VALUES (?, ?, ?, ?)',
      contactResult.lastInsertRowId,
      contact.greeting,
      createdAt,
      contact.name.includes('Dra.') ? 2 : 0,
    );

    await db.runAsync(
      'INSERT INTO messages (chatId, text, sender, createdAt) VALUES (?, ?, ?, ?)',
      chatResult.lastInsertRowId,
      contact.greeting,
      'contact',
      createdAt,
    );
  }
}

export async function getChats(searchTerm = '') {
  const db = await getDatabase();
  const query = `%${searchTerm.trim()}%`;

  return db.getAllAsync<Chat>(
    `SELECT
      chats.id,
      chats.contactId,
      contacts.name as contactName,
      contacts.phone,
      contacts.status,
      chats.lastMessage,
      chats.lastMessageAt,
      chats.unreadCount
    FROM chats
    INNER JOIN contacts ON contacts.id = chats.contactId
    WHERE contacts.name LIKE ? OR chats.lastMessage LIKE ?
    ORDER BY chats.lastMessageAt DESC, chats.id DESC`,
    query,
    query,
  );
}

export async function getContacts(searchTerm = '') {
  const db = await getDatabase();
  const query = `%${searchTerm.trim()}%`;

  return db.getAllAsync<Contact>(
    `SELECT id, name, phone, status
     FROM contacts
     WHERE name LIKE ? OR phone LIKE ?
     ORDER BY name ASC`,
    query,
    query,
  );
}

export async function getChatById(chatId: number) {
  const db = await getDatabase();

  return db.getFirstAsync<Chat>(
    `SELECT
      chats.id,
      chats.contactId,
      contacts.name as contactName,
      contacts.phone,
      contacts.status,
      chats.lastMessage,
      chats.lastMessageAt,
      chats.unreadCount
    FROM chats
    INNER JOIN contacts ON contacts.id = chats.contactId
    WHERE chats.id = ?`,
    chatId,
  );
}

export async function getMessages(chatId: number) {
  const db = await getDatabase();

  return db.getAllAsync<Message>(
    `SELECT id, chatId, text, sender, createdAt
     FROM messages
     WHERE chatId = ?
     ORDER BY datetime(createdAt) ASC, id ASC`,
    chatId,
  );
}

export async function openOrCreateChat(contactId: number) {
  const db = await getDatabase();
  const current = await db.getFirstAsync<{ id: number }>(
    'SELECT id FROM chats WHERE contactId = ?',
    contactId,
  );

  if (current) {
    return current.id;
  }

  const createdAt = nowIso();
  const result = await db.runAsync(
    'INSERT INTO chats (contactId, lastMessage, lastMessageAt, unreadCount) VALUES (?, ?, ?, ?)',
    contactId,
    'Chat iniciado',
    createdAt,
    0,
  );

  await db.runAsync(
    'INSERT INTO messages (chatId, text, sender, createdAt) VALUES (?, ?, ?, ?)',
    result.lastInsertRowId,
    'Chat iniciado',
    'contact',
    createdAt,
  );

  return result.lastInsertRowId;
}

export async function addMessage(chatId: number, text: string, sender: MessageSender) {
  const db = await getDatabase();
  const createdAt = nowIso();

  const result = await db.runAsync(
    'INSERT INTO messages (chatId, text, sender, createdAt) VALUES (?, ?, ?, ?)',
    chatId,
    text,
    sender,
    createdAt,
  );

  await db.runAsync(
    'UPDATE chats SET lastMessage = ?, lastMessageAt = ?, unreadCount = ? WHERE id = ?',
    text,
    createdAt,
    sender === 'contact' ? 1 : 0,
    chatId,
  );

  return {
    id: result.lastInsertRowId,
    chatId,
    text,
    sender,
    createdAt,
  } satisfies Message;
}

export async function markChatAsRead(chatId: number) {
  const db = await getDatabase();
  await db.runAsync('UPDATE chats SET unreadCount = 0 WHERE id = ?', chatId);
}

export async function clearChatMessages(chatId: number) {
  const db = await getDatabase();
  const createdAt = nowIso();

  await db.runAsync('DELETE FROM messages WHERE chatId = ?', chatId);
  await db.runAsync(
    'UPDATE chats SET lastMessage = ?, lastMessageAt = ?, unreadCount = 0 WHERE id = ?',
    'Historial limpio',
    createdAt,
    chatId,
  );
}
