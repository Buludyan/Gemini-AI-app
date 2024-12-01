import sqlite3 from 'sqlite3';
import { ChatListItem } from './interfaces';

const db = new sqlite3.Database('./chat.db', (err) => {
  if (err) {
    console.error('Error opening database', err);
  } else {
    console.log('Database connected');
  }
});

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS conversations (
    id TEXT PRIMARY KEY,
    title TEXT,
    messages TEXT,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);
});

export function saveConversation(conversation: ChatListItem) {
  const { id, title, messages } = conversation;
  const messagesJson = JSON.stringify(messages);

  const stmt = db.prepare('INSERT OR REPLACE INTO conversations (id, title, messages) VALUES (?, ?, ?)');
  stmt.run(id, title, messagesJson, (err: any) => {
    if (err) {
      console.error('Error saving conversation:', err);
    }
  });
  stmt.finalize();
}

export function getConversationById(conversationId: string, callback: any) {
  db.get('SELECT * FROM conversations WHERE id = ?', [conversationId], (err, row: any) => {
    if (err) {
      console.error('Error fetching conversation:', err);
    }
    if (row) {
      const conversation = {
        id: row.id,
        title: row.title,
        messages: JSON.parse(row.messages),
      };
      callback(conversation);
    } else {
      callback(null);
    }
  });
}

export function getAllConversations(callback: (conversations: ChatListItem[]) => void) {
  db.all('SELECT * FROM conversations ORDER BY timestamp DESC', [], (err, rows) => {
    if (err) {
      console.error('Error fetching conversations:', err);
    }
    const conversations = rows.map((row: any) => ({
      id: row.id,
      title: row.title,
      messages: JSON.parse(row.messages),
    }));
    callback(conversations);
  });
}
