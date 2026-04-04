import { Suspense } from "react";
import { ChatConversation } from "@/components/chat/ChatConversation";

export default function ChatPage() {
  return (
    <Suspense fallback={null}>
      <ChatConversation />
    </Suspense>
  );
}
