import * as SQLite from 'expo-sqlite';

let database: SQLite.SQLiteDatabase | null = null;

export async function getDatabase() {
  if (!database) {
    database = await SQLite.openDatabaseAsync('chatupq.db');
  }

  return database;
}

export async function setupDatabase() {
  const db = await getDatabase();

  await db.execAsync(`
    PRAGMA journal_mode = WAL;

    CREATE TABLE IF NOT EXISTS contacts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      phone TEXT NOT NULL,
      status TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS chats (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      contactId INTEGER NOT NULL UNIQUE,
      lastMessage TEXT NOT NULL DEFAULT '',
      lastMessageAt TEXT NOT NULL DEFAULT '',
      unreadCount INTEGER NOT NULL DEFAULT 0,
      FOREIGN KEY (contactId) REFERENCES contacts(id)
    );

    CREATE TABLE IF NOT EXISTS messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      chatId INTEGER NOT NULL,
      text TEXT NOT NULL,
      sender TEXT NOT NULL CHECK(sender IN ('me', 'contact')),
      createdAt TEXT NOT NULL,
      FOREIGN KEY (chatId) REFERENCES chats(id)
    );
  `);
}
