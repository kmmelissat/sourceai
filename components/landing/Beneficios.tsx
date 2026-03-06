"use client";

import { useState } from "react";
import { Search, BellOff, BookOpen, Rocket } from "lucide-react";

const benefits = [
  {
    icon: Search,
    title: "Encuentra respuestas en segundos",
    description:
      "Pregunta en lenguaje natural y obtén respuestas con referencias directas a tus repos, documentos y conversaciones.",
    chatExample: {
      question: "¿Cómo funciona el deployment?",
      answer:
        "Se usa GitHub Actions. El workflow está en .github/workflows/deploy.yml y toma ~8 min.",
      sources: ["GitHub"],
    },
  },
  {
    icon: BellOff,
    title: "Reduce interrupciones al equipo",
    description:
      "Los nuevos pueden resolver dudas solos en lugar de interrumpir constantemente a los desarrolladores senior.",
    chatExample: {
      question: "¿Dónde está documentado el flujo de pagos?",
      answer:
        "En Notion: docs/producto/pagos. Incluye diagramas de secuencia y casos edge.",
      sources: ["Notion"],
    },
  },
  {
    icon: BookOpen,
    title: "Evita pérdida de conocimiento",
    description:
      "El contexto técnico y las decisiones quedan documentados y accesibles, no solo en la memoria de unas pocas personas.",
    chatExample: {
      question: "¿Quién aprobó este cambio y por qué?",
      answer:
        "Según el PR #342, lo aprobó @maria. La decisión se documentó en Slack: usar Redis para cache por el volumen de requests.",
      sources: ["GitHub", "Slack"],
    },
  },
  {
    icon: Rocket,
    title: "Acelera onboarding técnico",
    description:
      "Reduce de semanas a días el tiempo que tarda un nuevo dev en ser productivo con el stack y los procesos.",
    chatExample: {
      question: "¿Qué servicio consume este endpoint?",
      answer:
        "El servicio de notificaciones. Ver arquitectura en docs/infra/overview.",
      sources: ["GitHub", "Slack"],
    },
  },
];

export function Beneficios() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeBenefit = benefits[activeIndex];

  return (
    <section className="px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
            Beneficios que transforman cómo trabaja tu equipo
          </h2>
          <p className="mt-4 text-lg text-text-secondary">
            SourceAI no es solo búsqueda. Es una nueva forma de acceder al
            conocimiento colectivo de tu startup.
          </p>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-2 lg:items-stretch lg:gap-12">
          {/* Lista de beneficios en vertical */}
          <div className="flex flex-col gap-3">
            {benefits.map((benefit, i) => (
              <button
                key={benefit.title}
                type="button"
                onClick={() => setActiveIndex(i)}
                className={`group flex items-start gap-4 rounded-xl border p-4 text-left transition-all duration-300 ${
                  i === activeIndex
                    ? "border-primary/50 bg-primary/5"
                    : "border-border/60 bg-bg-surface/50 hover:border-primary/30 hover:bg-bg-surface"
                }`}
              >
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg transition-colors ${
                    i === activeIndex ? "bg-primary/20" : "bg-primary/10"
                  }`}
                >
                  <benefit.icon
                    className={`h-5 w-5 ${
                      i === activeIndex ? "text-primary" : "text-primary/80"
                    }`}
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold text-text-primary">
                    {benefit.title}
                  </h3>
                  <p className="mt-1 text-sm text-text-secondary">
                    {benefit.description}
                  </p>
                </div>
              </button>
            ))}
          </div>

          {/* Chat AI que cambia según el beneficio */}
          <div className="overflow-hidden rounded-2xl border border-primary/20 bg-bg-base/80 shadow-xl shadow-primary/5">
            <div className="border-b border-primary/20 bg-supporting-700/40 px-4 py-2.5">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                  <div className="h-2 w-2 rounded-full bg-primary/60" />
                  <div className="h-2 w-2 rounded-full bg-primary/40" />
                </div>
                <span className="ml-2 text-xs font-medium text-primary">
                  SourceAI · Chat
                </span>
              </div>
            </div>

            <div className="space-y-4 p-4 transition-opacity duration-300">
              <div className="flex justify-end">
                <div className="max-w-[85%] rounded-lg rounded-br-none bg-primary/30 px-4 py-3 text-sm font-medium text-bg-base">
                  {activeBenefit.chatExample.question}
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary">
                  <span className="text-xs font-bold text-bg-base">AI</span>
                </div>
                <div className="min-w-0 flex-1 space-y-2">
                  <p className="text-sm leading-relaxed text-text-primary">
                    {activeBenefit.chatExample.answer}
                  </p>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {activeBenefit.chatExample.sources.map((source) => (
                      <span
                        key={source}
                        className="rounded-md bg-supporting-600/40 px-2 py-0.5 text-xs text-primary"
                      >
                        {source}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-primary/10 bg-supporting-700/20 px-4 py-3">
              <div className="flex items-center gap-2 rounded-lg border border-primary/20 bg-bg-base/80 px-3 py-2.5">
                <span className="text-sm text-text-muted">
                  Escribe tu pregunta...
                </span>
                <span className="ml-1 h-4 w-0.5 shrink-0 animate-pulse bg-primary" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
