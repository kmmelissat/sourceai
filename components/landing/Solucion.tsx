import { MessageSquare } from "lucide-react";

const qaExamples = [
  {
    question: "¿Cómo funciona el deployment?",
    answer:
      "Se usa GitHub Actions. El workflow está en .github/workflows/deploy.yml y toma ~8 min.",
    sources: ["GitHub"],
  },
  {
    question: "¿Dónde está documentado el flujo de pagos?",
    answer:
      "En Notion: docs/producto/pagos. Incluye diagramas de secuencia y casos edge.",
    sources: ["Notion"],
  },
  {
    question: "¿Qué servicio consume este endpoint?",
    answer:
      "El servicio de notificaciones. Ver arquitectura en docs/infra/overview.",
    sources: ["GitHub", "Slack"],
  },
  {
    question: "¿Cuál es el proceso para manejar incidentes?",
    answer:
      "Según el runbook en Notion: 1) Detección 2) Triage 3) Comunicación 4) Resolución.",
    sources: ["Notion", "Slack"],
  },
];

export function Solucion() {
  return (
    <section className="px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24 lg:items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
              Una sola{" "}
              <span className="text-primary">fuente de verdad</span> para tu
              equipo
            </h2>
            <p className="mt-4 text-lg text-text-secondary">
              SourceAI conecta tus herramientas internas y permite hacer
              preguntas en lenguaje natural para obtener respuestas rápidas,
              claras y con contexto.
            </p>
          </div>

          <div className="space-y-4">
            {qaExamples.map((qa, i) => (
              <div
                key={qa.question}
                className="rounded-xl border border-border bg-bg-surface p-5 transition-all hover:border-primary/20"
              >
                <div className="flex gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <MessageSquare className="h-4 w-4 text-primary" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-text-primary">
                      {qa.question}
                    </p>
                    <p className="mt-1 text-sm text-text-secondary">
                      {qa.answer}
                    </p>
                    <div className="mt-2 flex gap-2">
                      {qa.sources.map((source) => (
                        <span
                          key={source}
                          className="rounded bg-bg-elevated px-2 py-0.5 text-xs text-text-muted"
                        >
                          {source}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
