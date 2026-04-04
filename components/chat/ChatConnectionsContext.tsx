"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { RepoConnection } from "@/components/chat/chat-types";
import { makeConnectionId } from "@/components/chat/chat-types";

const STORAGE_KEY = "sourceai-chat-connections";

type ConnectedApp = {
  id: string;
  providerId: string;
  connected: boolean;
  connectedAt?: string;
};

const STORAGE_APPS_KEY = "sourceai-connected-apps";

type ChatConnectionsContextValue = {
  connections: RepoConnection[];
  addRepo: (name: string, url: string) => void;
  removeRepo: (id: string) => void;
  repoError: string | null;
  setRepoError: (msg: string | null) => void;
  appStatus: Record<string, boolean>;
  toggleApp: (providerId: string) => void;
};

const ChatConnectionsContext =
  createContext<ChatConnectionsContextValue | null>(null);

export function ChatConnectionsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [connections, setConnections] = useState<RepoConnection[]>([]);
  const [appLinks, setAppLinks] = useState<ConnectedApp[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [repoError, setRepoError] = useState<string | null>(null);

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) setConnections(JSON.parse(raw) as RepoConnection[]);
      } catch {
        /* ignore */
      }
      try {
        const rawApps = localStorage.getItem(STORAGE_APPS_KEY);
        if (rawApps) setAppLinks(JSON.parse(rawApps) as ConnectedApp[]);
      } catch {
        /* ignore */
      }
      setHydrated(true);
    });
    return () => cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(connections));
  }, [connections, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(STORAGE_APPS_KEY, JSON.stringify(appLinks));
  }, [appLinks, hydrated]);

  const addRepo = useCallback((name: string, url: string) => {
    const trimmed = url.trim();
    if (!trimmed) return;
    setRepoError(null);
    try {
      const hostname = new URL(trimmed).hostname;
      const finalName = name.trim() || hostname;
      setConnections((prev) => [
        ...prev,
        { id: makeConnectionId(), name: finalName, url: trimmed },
      ]);
    } catch {
      setRepoError("URL inválida. Ej: https://github.com/org/repo");
    }
  }, []);

  const removeRepo = useCallback((id: string) => {
    setConnections((prev) => prev.filter((c) => c.id !== id));
  }, []);

  const appStatus = useMemo(() => {
    const m: Record<string, boolean> = {};
    for (const a of appLinks) {
      m[a.providerId] = a.connected;
    }
    return m;
  }, [appLinks]);

  const toggleApp = useCallback((providerId: string) => {
    setAppLinks((prev) => {
      const existing = prev.find((p) => p.providerId === providerId);
      if (existing) {
        return prev.map((p) =>
          p.providerId === providerId
            ? {
                ...p,
                connected: !p.connected,
                connectedAt: !p.connected
                  ? new Date().toISOString()
                  : undefined,
              }
            : p
        );
      }
      return [
        ...prev,
        {
          id: makeConnectionId(),
          providerId,
          connected: true,
          connectedAt: new Date().toISOString(),
        },
      ];
    });
  }, []);

  const value = useMemo(
    () => ({
      connections,
      addRepo,
      removeRepo,
      repoError,
      setRepoError,
      appStatus,
      toggleApp,
    }),
    [
      connections,
      addRepo,
      removeRepo,
      repoError,
      appStatus,
      toggleApp,
    ]
  );

  return (
    <ChatConnectionsContext.Provider value={value}>
      {children}
    </ChatConnectionsContext.Provider>
  );
}

export function useChatConnections() {
  const ctx = useContext(ChatConnectionsContext);
  if (!ctx) {
    throw new Error(
      "useChatConnections debe usarse dentro de ChatConnectionsProvider"
    );
  }
  return ctx;
}
