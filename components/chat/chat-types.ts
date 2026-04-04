import mockRecentConversationsJson from "@/components/chat/mockRecentConversations.json";

export type NavId =
  | "new"
  | "search"
  | "apps";

export type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

export type MockConversation = {
  id: string;
  title: string;
  preview: string;
  messages: ChatMessage[];
};

export type RepoConnection = {
  id: string;
  name: string;
  url: string;
};

export function makeConnectionId() {
  return (
    Math.random().toString(16).slice(2) + "-" + Date.now().toString(16)
  );
}

export const mockRecentConversations =
  mockRecentConversationsJson as MockConversation[];
