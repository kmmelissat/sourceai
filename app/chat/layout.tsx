import { Suspense } from "react";
import { ChatConnectionsProvider } from "@/components/chat/ChatConnectionsContext";
import { ChatShell } from "@/components/chat/ChatShell";

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ChatConnectionsProvider>
      <div className="min-h-screen bg-bg-base text-text-primary">
        <Suspense fallback={<div className="flex min-h-screen">{children}</div>}>
          <ChatShell>{children}</ChatShell>
        </Suspense>
      </div>
    </ChatConnectionsProvider>
  );
}
