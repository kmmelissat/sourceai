"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const mockChats = [
  {
    id: "login-flow",
    title: "Login flow",
    preview: "Como funciona la autenticacion en este proyecto?",
  },
  {
    id: "repo-context",
    title: "Repo context",
    preview: "Que repos estan conectados al chat actual?",
  },
  {
    id: "api-chat",
    title: "API chat",
    preview: "Explicame que hace app/api/chat/route.ts",
  },
];

export function SearchChatsModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const el = dialogRef.current;
    if (!el) return;

    if (open) {
      if (!el.open) el.showModal();
    } else if (el.open) {
      el.close();
    }
  }, [open]);

  const filteredChats = useMemo(() => {
    const value = query.trim().toLowerCase();
    if (!value) return mockChats;

    return mockChats.filter(
      (chat) =>
        chat.title.toLowerCase().includes(value) ||
        chat.preview.toLowerCase().includes(value),
    );
  }, [query]);

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      className={cn(
        "fixed left-1/2 top-1/2 z-[200] m-0 w-[min(100vw-2rem,38rem)] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-3xl border border-border bg-bg-elevated p-0 text-text-primary shadow-2xl",
        "[&::backdrop]:bg-bg-base/80 [&::backdrop]:backdrop-blur-sm",
        "open:flex open:max-h-[min(85vh,42rem)] open:flex-col",
      )}
      aria-labelledby="search-chats-title"
    >
      <div className="flex items-center justify-between gap-3 border-b border-border px-5 py-4">
        <div>
          <h2
            id="search-chats-title"
            className="text-lg font-semibold text-text-primary"
          >
            Search chats
          </h2>
          <p className="mt-1 text-sm text-text-muted">
            Busca conversaciones sin salir de la vista actual.
          </p>
        </div>
        <button
          type="button"
          onClick={() => dialogRef.current?.close()}
          className="rounded-full p-2 text-text-muted transition-colors hover:bg-bg-surface hover:text-text-primary"
          aria-label="Cerrar"
        >
          <X className="h-5 w-5" strokeWidth={1.5} />
        </button>
      </div>

      <div className="border-b border-border px-5 py-4">
        <div className="relative">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar por tema, archivo o mensaje..."
            aria-label="Buscar chats"
            className="h-12 rounded-2xl border-border bg-bg-base pl-11"
            autoFocus
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-4">
        {filteredChats.length > 0 ? (
          <div className="space-y-3">
            {filteredChats.map((chat) => (
              <button
                key={chat.id}
                type="button"
                className="flex w-full flex-col rounded-2xl border border-border bg-bg-base px-4 py-3 text-left transition-colors hover:bg-bg-surface"
              >
                <span className="text-sm font-semibold text-text-primary">
                  {chat.title}
                </span>
                <span className="mt-1 text-sm text-text-muted">
                  {chat.preview}
                </span>
              </button>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-border bg-bg-base px-4 py-8 text-center">
            <p className="text-sm font-medium text-text-primary">
              No hay resultados para &quot;{query}&quot;
            </p>
            <p className="mt-1 text-sm text-text-muted">
              Prueba con otro término o abre una conversación nueva.
            </p>
          </div>
        )}
      </div>

      <div className="flex justify-end border-t border-border px-5 py-4">
        <Button type="button" variant="outline" onClick={() => dialogRef.current?.close()}>
          Cerrar
        </Button>
      </div>
    </dialog>
  );
}
