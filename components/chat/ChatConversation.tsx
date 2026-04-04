"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Mic, Plus, Send } from "lucide-react";
import { ChatMessageContent } from "@/components/chat/ChatMessageContent";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useChatConnections } from "@/components/chat/ChatConnectionsContext";
import { getOrCreateChatSessionId } from "@/lib/chat/session";
import {
  makeConnectionId,
  mockRecentConversations,
  type ChatMessage,
} from "@/components/chat/chat-types";

function ChatComposer({
  centered = false,
  className,
  input,
  isSending,
  connections,
  onInputChange,
  onSubmit,
}: {
  centered?: boolean;
  className?: string;
  input: string;
  isSending: boolean;
  connections: { name: string }[];
  onInputChange: (value: string) => void;
  onSubmit: () => void;
}) {
  return (
    <div
      className={[
        centered ? "mx-auto w-full max-w-4xl px-6" : "mx-auto max-w-4xl",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
        className={
          centered
            ? "rounded-full border border-border bg-bg-elevated/95 p-1.5 shadow-[0_20px_60px_rgba(0,0,0,0.35)] backdrop-blur"
            : "rounded-full border border-border bg-bg-elevated p-1.5"
        }
      >
        {centered ? (
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-text-primary transition-colors hover:bg-bg-surface"
              aria-label="Agregar"
            >
              <Plus className="h-5 w-5" strokeWidth={2} />
            </button>

            <Input
              value={input}
              onChange={(e) => onInputChange(e.target.value)}
              placeholder="Ask anything"
              aria-label="Pregunta"
              className="h-11 rounded-full border-0 bg-transparent px-1 text-base text-text-primary placeholder:text-text-muted focus:ring-0 focus:ring-offset-0"
            />

            <div className="hidden items-center gap-2 sm:flex">
              <button
                type="button"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-text-primary transition-colors hover:bg-bg-surface"
                aria-label="Micrófono"
              >
                <Mic className="h-4 w-4" strokeWidth={2} />
              </button>
              <Button
                type="submit"
                disabled={isSending || input.trim().length === 0}
                className="h-11 w-11 rounded-full border-0 bg-primary text-bg-base shadow-none hover:bg-primary-hover"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-text-primary transition-colors hover:bg-bg-surface"
              aria-label="Agregar"
            >
              <Plus className="h-5 w-5" strokeWidth={2} />
            </button>
            <div className="flex-1">
              <Input
                value={input}
                onChange={(e) => onInputChange(e.target.value)}
                placeholder="Escribe tu pregunta..."
                aria-label="Pregunta"
                className="h-11 rounded-full border-0 bg-transparent px-1 text-base text-text-primary placeholder:text-text-muted focus:ring-0 focus:ring-offset-0"
              />
            </div>
            <button
              type="button"
              className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-full text-text-primary transition-colors hover:bg-bg-surface sm:flex"
              aria-label="Micrófono"
            >
              <Mic className="h-4 w-4" strokeWidth={2} />
            </button>
            <Button
              type="submit"
              disabled={isSending || input.trim().length === 0}
              className="h-11 w-11 rounded-full border-0 bg-primary px-0 text-bg-base shadow-none hover:bg-primary-hover"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        )}

        {centered ? (
          <div className="mt-1.5 flex items-center justify-between px-1.5 sm:hidden">
            <button
              type="button"
              className="flex h-9 w-9 items-center justify-center rounded-full text-text-primary transition-colors hover:bg-bg-surface"
              aria-label="Micrófono"
            >
              <Mic className="h-4 w-4" strokeWidth={2} />
            </button>
            <Button
              type="submit"
              disabled={isSending || input.trim().length === 0}
              className="h-10 w-10 rounded-full border-0 bg-primary text-bg-base shadow-none hover:bg-primary-hover"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        ) : null}
      </form>

      {connections.length > 0 && (
        <div
          className={
            centered
              ? "mt-4 text-center text-xs text-text-muted"
              : "mt-2 text-xs text-text-muted"
          }
        >
          Conectados: {connections.slice(0, 3).map((c) => c.name).join(", ")}
          {connections.length > 3 ? "..." : ""}
        </div>
      )}
    </div>
  );
}

export function ChatConversation() {
  const { connections } = useChatConnections();
  const searchParams = useSearchParams();
  const conversationId = searchParams.get("conversation");
  const selectedConversation = mockRecentConversations.find(
    (conversation) => conversation.id === conversationId,
  );
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [sessionId, setSessionId] = useState("");
  const listRef = useRef<HTMLDivElement | null>(null);
  const hasMessages = messages.length > 0;

  useEffect(() => {
    setMessages(selectedConversation ? selectedConversation.messages : []);
    setInput("");
    setIsSending(false);
  }, [selectedConversation]);

  useEffect(() => {
    setSessionId(getOrCreateChatSessionId(conversationId));
  }, [conversationId]);

  useEffect(() => {
    const el = listRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [messages]);

  async function sendMessage() {
    const content = input.trim();
    if (!content || isSending || !sessionId) return;

    setIsSending(true);
    setInput("");

    const userMsg: ChatMessage = {
      id: makeConnectionId(),
      role: "user",
      content,
    };
    setMessages((prev) => [...prev, userMsg]);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          message: content,
          sessionId,
        }),
      });

      const data: { output?: string } = await res.json();
      const reply =
        data.output ||
        "No pude generar una respuesta todavía. Conecta un repo y vuelve a intentar.";

      setMessages((prev) => [
        ...prev,
        { id: makeConnectionId(), role: "assistant", content: reply },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: makeConnectionId(),
          role: "assistant",
          content:
            "Error al conectar con el backend de chat. Asegúrate de que `/api/chat` esté disponible.",
        },
      ]);
    } finally {
      setIsSending(false);
    }
  }

  return (
    <main className="flex min-w-0 flex-1 flex-col">
      <header className="sticky top-0 z-10 border-b border-border bg-bg-base/70 backdrop-blur">
        <div className="mx-auto flex max-w-4xl items-center justify-between gap-3 px-6 py-4">
          <div className="min-w-0">
            <div className="truncate text-lg font-semibold">
              {selectedConversation?.title ?? "New chat"}
            </div>
            <div className="truncate text-xs text-text-muted">
              {selectedConversation?.preview ??
                "Responde con contexto de tus repos y apps"}
            </div>
          </div>
        </div>
      </header>

      {hasMessages ? (
        <>
          <div ref={listRef} className="flex-1 overflow-y-auto px-6 pb-32 pt-6">
            <div className="mx-auto max-w-3xl space-y-4">
              {messages.map((m) =>
                m.role === "user" ? (
                  <div key={m.id} className="flex justify-end">
                    <div className="max-w-[85%] rounded-[1.75rem] bg-primary px-4 py-2.5 text-sm text-bg-base">
                      {m.content}
                    </div>
                  </div>
                ) : (
                  <div key={m.id} className="flex gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary">
                      <span className="text-xs font-bold text-bg-base">AI</span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="rounded-[1.75rem] border border-border bg-bg-surface px-4 py-3">
                        <ChatMessageContent content={m.content} />
                      </div>
                    </div>
                  </div>
                ),
              )}

              {isSending && (
                <div className="flex gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary">
                    <span className="text-xs font-bold text-bg-base">AI</span>
                  </div>
                  <div className="flex min-h-8 items-center">
                    <div className="flex items-center gap-1.5 text-text-muted">
                      <span className="h-2 w-2 animate-bounce rounded-full bg-text-muted [animation-delay:-0.3s]" />
                      <span className="h-2 w-2 animate-bounce rounded-full bg-text-muted [animation-delay:-0.15s]" />
                      <span className="h-2 w-2 animate-bounce rounded-full bg-text-muted" />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="pointer-events-none fixed bottom-0 left-[260px] right-0 z-20 bg-gradient-to-t from-bg-base via-bg-base/88 to-transparent px-6 pb-6 pt-10">
            <ChatComposer
              className="pointer-events-auto"
              input={input}
              isSending={isSending}
              connections={connections}
              onInputChange={setInput}
              onSubmit={() => {
                void sendMessage();
              }}
            />
          </div>
        </>
      ) : (
        <section className="flex flex-1 items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_center,_rgba(230,255,75,0.08),_transparent_42%)] px-6 py-16">
          <div className="w-full max-w-7xl">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="font-heading text-2xl tracking-tight text-text-primary sm:text-3xl">
                Ready when you are.
              </h1>
              <p className="mt-3 text-sm text-text-muted">
                Conecta repos y apps para responder con mejor contexto desde el
                primer mensaje.
              </p>
            </div>

            <div className="mt-10">
              <ChatComposer
                centered
                input={input}
                isSending={isSending}
                connections={connections}
                onInputChange={setInput}
                onSubmit={() => {
                  void sendMessage();
                }}
              />
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
