"use client";

export function ChatMockup() {
  return (
    <div className="relative overflow-hidden rounded-xl border border-border bg-bg-surface shadow-2xl shadow-primary/5">
      {/* Header bar */}
      <div className="flex items-center gap-2 border-b border-border px-4 py-3">
        <div className="flex gap-1.5">
          <div className="h-2.5 w-2.5 rounded-full bg-supporting-600" />
          <div className="h-2.5 w-2.5 rounded-full bg-supporting-600 opacity-60" />
          <div className="h-2.5 w-2.5 rounded-full bg-supporting-600 opacity-40" />
        </div>
        <span className="ml-4 text-xs text-text-muted">SourceAI · Chat</span>
      </div>

      {/* Chat content */}
      <div className="space-y-4 p-4">
        {/* User question */}
        <div className="flex justify-end">
          <div className="max-w-[85%] rounded-lg rounded-br-none bg-primary/20 px-4 py-3 text-sm text-text-primary">
            ¿Cómo funciona el deployment de producción?
          </div>
        </div>

        {/* AI response */}
        <div className="flex gap-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-supporting-600/30">
            <span className="text-xs font-semibold text-primary">AI</span>
          </div>
          <div className="min-w-0 flex-1 space-y-2">
            <p className="text-sm leading-relaxed text-text-primary">
              El deployment se realiza con GitHub Actions. El workflow está en{" "}
              <code className="rounded bg-bg-elevated px-1.5 py-0.5 text-primary font-mono text-xs">
                .github/workflows/deploy.yml
              </code>
              . Primero ejecuta los tests, luego hace build con Docker y despliega
              a producción. El proceso toma aproximadamente 8 minutos.
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              <span className="inline-flex items-center rounded-md border border-border bg-bg-elevated px-2 py-1 text-xs text-text-secondary">
                GitHub
              </span>
              <span className="inline-flex items-center rounded-md border border-border bg-bg-elevated px-2 py-1 text-xs text-text-secondary">
                Notion
              </span>
              <span className="inline-flex items-center rounded-md border border-border bg-bg-elevated px-2 py-1 text-xs text-text-secondary">
                Slack
              </span>
            </div>
          </div>
        </div>

        {/* Input bar */}
        <div className="mt-4 rounded-lg border border-border bg-bg-elevated px-3 py-2">
          <p className="text-xs text-text-muted">
            Escribe otra pregunta...
          </p>
        </div>
      </div>
    </div>
  );
}
