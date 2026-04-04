"use client";

import { useCallback } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChatSidebar } from "@/components/chat/ChatSidebar";
import { SearchChatsModal } from "@/components/chat/SearchChatsModal";

export function ChatShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchModalOpen = searchParams.get("modal") === "search";

  const closeSearchModal = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("modal");
    const nextQuery = params.toString();
    router.replace(nextQuery ? `${pathname}?${nextQuery}` : pathname, {
      scroll: false,
    });
  }, [pathname, router, searchParams]);

  return (
    <>
      <div className="flex min-h-screen">
        <ChatSidebar />
        {children}
      </div>
      <SearchChatsModal open={searchModalOpen} onClose={closeSearchModal} />
    </>
  );
}
