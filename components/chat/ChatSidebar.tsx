"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import {
  BadgeHelp,
  ChevronRight,
  ChevronsUpDown,
  LogOut,
  PlusSquare,
  Settings,
  Search,
  LayoutGrid,
  MessageSquareText,
  Sparkles,
  UserCircle2,
  WandSparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  mockRecentConversations,
  type NavId,
} from "@/components/chat/chat-types";

const navItems: {
  id: NavId;
  label: string;
  href: string;
  Icon: typeof PlusSquare;
}[] = [
  { id: "new", label: "New chat", href: "/chat", Icon: PlusSquare },
  {
    id: "search",
    label: "Search chats",
    href: "/chat/search",
    Icon: Search,
  },
  { id: "apps", label: "Apps", href: "/chat/apps", Icon: LayoutGrid },
];

const accountMenuItems = [
  { label: "Upgrade plan", Icon: Sparkles },
  { label: "Personalization", Icon: WandSparkles },
  { label: "Profile", Icon: UserCircle2 },
  { label: "Settings", Icon: Settings },
];

export function ChatSidebar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const searchModalOpen = searchParams.get("modal") === "search";
  const activeConversationId = searchParams.get("conversation");
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const accountMenuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handlePointerDown(event: MouseEvent) {
      if (!accountMenuRef.current?.contains(event.target as Node)) {
        setAccountMenuOpen(false);
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setAccountMenuOpen(false);
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <aside className="w-[260px] shrink-0 border-r border-border bg-bg-base/60">
      <div className="sticky top-0 flex h-screen flex-col">
        <div className="px-5 py-5">
          <Link
            href="/chat"
            className="inline-flex rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base"
          >
            <Image
              src="/sourceai-logo.svg"
              alt="SourceAI"
              width={180}
              height={56}
              priority
              className="h-9 w-auto max-w-[200px]"
            />
          </Link>
        </div>

        <nav className="flex-1 overflow-y-auto px-4 pb-8">
          <div className="space-y-2">
            {navItems.map(({ id, label, href, Icon }) => {
              const active =
                id === "search" ? searchModalOpen : pathname === href;
              const isSearchItem = id === "search";
              const itemHref = isSearchItem
                ? `${pathname}?${new URLSearchParams({
                    ...Object.fromEntries(searchParams.entries()),
                    modal: "search",
                  }).toString()}`
                : href;
              return (
                <Link
                  key={id}
                  href={itemHref}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-base transition-colors",
                    active
                      ? "bg-bg-elevated text-text-primary"
                      : "text-text-secondary hover:bg-bg-surface"
                  )}
                  aria-current={active ? "page" : undefined}
                >
                  <Icon className="h-5 w-5 shrink-0" />
                  <span className="text-sm">{label}</span>
                </Link>
              );
            })}
          </div>

          <div className="mt-8">
            <div className="px-3 text-xs font-medium uppercase tracking-[0.16em] text-text-muted">
              Recent chats
            </div>
            <div className="mt-3 space-y-1">
              {mockRecentConversations.map((chat) => (
                <Link
                  key={chat.id}
                  href={`/chat?conversation=${chat.id}`}
                  className={cn(
                    "flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors",
                    activeConversationId === chat.id && pathname === "/chat"
                      ? "bg-bg-elevated text-text-primary"
                      : "text-text-secondary hover:bg-bg-surface hover:text-text-primary",
                  )}
                >
                  <MessageSquareText className="h-4 w-4 shrink-0" />
                  <span className="truncate text-sm">{chat.title}</span>
                </Link>
              ))}
            </div>
          </div>
        </nav>

        <div ref={accountMenuRef} className="relative border-t border-border px-4 py-4">
          {accountMenuOpen ? (
            <div className="absolute bottom-[calc(100%+0.75rem)] left-4 right-4 overflow-hidden rounded-[1.75rem] border border-border bg-bg-elevated shadow-[0_20px_50px_rgba(0,0,0,0.35)]">
              <div className="flex items-center gap-3 px-4 py-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-bg-surface text-xs font-semibold tracking-[0.08em] text-text-primary">
                  MS
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[15px] font-semibold text-text-primary">
                    Melissa Solorzano
                  </p>
                  <p className="truncate text-sm text-text-muted">
                    @kmmelissat
                  </p>
                </div>
              </div>

              <div className="mx-4 border-t border-border" />

              <div className="px-2 py-2">
                {accountMenuItems.map(({ label, Icon }) => (
                  <button
                    key={label}
                    type="button"
                    className="flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left text-text-secondary transition-colors hover:bg-bg-surface hover:text-text-primary"
                  >
                    <Icon className="h-5 w-5 shrink-0" />
                    <span className="text-sm">{label}</span>
                  </button>
                ))}
              </div>

              <div className="mx-4 border-t border-border" />

              <div className="px-2 py-2">
                <button
                  type="button"
                  className="flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left text-text-secondary transition-colors hover:bg-bg-surface hover:text-text-primary"
                >
                  <BadgeHelp className="h-5 w-5 shrink-0" />
                  <span className="flex-1 text-sm">Help</span>
                  <ChevronRight className="h-4 w-4 shrink-0" />
                </button>
                <button
                  type="button"
                  className="flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left text-text-secondary transition-colors hover:bg-bg-surface hover:text-text-primary"
                >
                  <LogOut className="h-5 w-5 shrink-0" />
                  <span className="text-sm">Log out</span>
                </button>
              </div>
            </div>
          ) : null}

          <button
            type="button"
            onClick={() => setAccountMenuOpen((open) => !open)}
            className="flex w-full items-center gap-2.5 rounded-2xl border border-border bg-bg-elevated px-3 py-3 text-left transition-colors hover:bg-bg-surface"
            aria-expanded={accountMenuOpen}
            aria-haspopup="menu"
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-bg-surface text-[10px] font-semibold tracking-[0.08em] text-text-primary">
              MS
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[13px] font-semibold text-text-primary">
                Melissa Solorzano
              </p>
              <p className="truncate text-xs text-text-muted">@kmmelissat</p>
            </div>
            <ChevronsUpDown className="h-3.5 w-3.5 shrink-0 text-text-muted" />
          </button>
        </div>
      </div>
    </aside>
  );
}
