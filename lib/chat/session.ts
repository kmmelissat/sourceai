const CHAT_SESSION_PREFIX = "sourceai.chat.session";

function generateSessionId() {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }

  return `${Date.now().toString(16)}-${Math.random().toString(16).slice(2)}`;
}

export function getChatSessionStorageKey(conversationId?: string | null) {
  return `${CHAT_SESSION_PREFIX}.${conversationId ?? "new"}`;
}

export function getOrCreateChatSessionId(conversationId?: string | null) {
  const storageKey = getChatSessionStorageKey(conversationId);
  const existingSessionId = window.sessionStorage.getItem(storageKey);

  if (existingSessionId) return existingSessionId;

  const nextSessionId = generateSessionId();
  window.sessionStorage.setItem(storageKey, nextSessionId);
  return nextSessionId;
}
