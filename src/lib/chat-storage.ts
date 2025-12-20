export type Message = {
  role: "user" | "assistant";
  content: string;
  timestamp?: number;
};

export type ChatSession = {
  id: string;
  title: string;
  messages: Message[];
  updatedAt: number;
};

const CHAT_STORAGE_KEY = "cubick_ai_chat_history"; // Legacy key
const SESSIONS_STORAGE_KEY = "cubick_ai_chat_sessions";

// Helper to generate a unique ID
function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// Migrate legacy single-list history to sessions
function migrateLegacyHistory(userId: string) {
  try {
    const legacyKey = `${CHAT_STORAGE_KEY}:${userId}`;
    const raw = localStorage.getItem(legacyKey);
    if (raw) {
      const messages = JSON.parse(raw);
      if (Array.isArray(messages) && messages.length > 0) {
        // Create a new session for the old history
        const session: ChatSession = {
          id: generateId(),
          title: "Предыдущий чат",
          messages: messages,
          updatedAt: Date.now(),
        };
        saveSessions(userId, [session]);
        localStorage.removeItem(legacyKey); // Clean up
        return [session];
      }
    }
  } catch (e) {
    console.error("Migration failed", e);
  }
  return [];
}

export function getChatSessions(userId?: string): ChatSession[] {
  if (!userId) return [];
  try {
    const key = `${SESSIONS_STORAGE_KEY}:${userId}`;
    const raw = localStorage.getItem(key);
    let sessions: ChatSession[] = [];

    if (raw) {
      sessions = JSON.parse(raw);
    } else {
      // Try migration if no sessions found
      sessions = migrateLegacyHistory(userId);
    }

    // Sort by newest first
    return sessions.sort((a, b) => b.updatedAt - a.updatedAt);
  } catch {
    return [];
  }
}

export function saveSessions(userId: string | undefined, sessions: ChatSession[]) {
  if (!userId) return;
  try {
    const key = `${SESSIONS_STORAGE_KEY}:${userId}`;
    localStorage.setItem(key, JSON.stringify(sessions));
  } catch (e) {
    console.error("Failed to save sessions", e);
  }
}

export function createNewSession(title: string = "Новый чат"): ChatSession {
  return {
    id: generateId(),
    title,
    messages: [],
    updatedAt: Date.now(),
  };
}

// Legacy export compatibility (if needed temporarily, though we should update consumers)
export function getChatHistory(userId?: string): Message[] {
  const sessions = getChatSessions(userId);
  return sessions.length > 0 ? sessions[0].messages : [];
}

export function saveChatHistory(userId: string | undefined, messages: Message[]) {
  if (!userId) return;
  const sessions = getChatSessions(userId);
  if (sessions.length === 0) {
    sessions.push(createNewSession());
  }
  sessions[0].messages = messages;
  sessions[0].updatedAt = Date.now();
  saveSessions(userId, sessions);
}
