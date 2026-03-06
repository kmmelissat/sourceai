"use client";

import { useState } from "react";
import { Search, BellOff, BookOpen, Rocket, User, Send, MoreHorizontal } from "lucide-react";

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

const ANIM_DURATION = 220;

export function Beneficios() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const activeBenefit = benefits[activeIndex];

  const handleBenefitClick = (i: number) => {
    if (i === activeIndex) return;
    setIsAnimating(true);
    setTimeout(() => {
      setActiveIndex(i);
      setIsAnimating(false);
    }, ANIM_DURATION);
  };

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
                onClick={() => handleBenefitClick(i)}
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
          <div className="flex min-h-[380px] flex-col overflow-hidden rounded-2xl border border-border bg-bg-base shadow-2xl">
            {/* Header tipo app de chat */}
            <div className="flex items-center justify-between border-b border-border bg-bg-elevated px-4 py-3">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary">
                    <span className="text-xs font-bold text-bg-base">AI</span>
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-bg-elevated bg-supporting-500" title="En línea" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-text-primary">SourceAI</p>
                  <p className="text-xs text-text-muted">En línea · Responde al instante</p>
                </div>
              </div>
              <button type="button" className="rounded-lg p-2 text-text-muted hover:bg-bg-surface hover:text-text-primary" aria-label="Más opciones">
                <MoreHorizontal className="h-5 w-5" />
              </button>
            </div>

            {/* Área de mensajes con animación al cambiar */}
            <div className="flex flex-1 flex-col overflow-y-auto bg-bg-base/50 p-4">
              <div
                className="flex flex-col gap-4 transition-all duration-200 ease-out"
                style={{
                  opacity: isAnimating ? 0 : 1,
                  transform: isAnimating ? "translateY(8px)" : "translateY(0)",
                }}
              >
                {/* Mensaje usuario */}
                <div className="flex justify-end gap-2">
                  <div className="flex max-w-[88%] flex-col items-end gap-0.5">
                    <span className="text-[10px] text-text-muted">Ahora</span>
                    <div className="rounded-2xl rounded-br-md bg-primary px-4 py-2.5 text-sm text-bg-base">
                      {activeBenefit.chatExample.question}
                    </div>
                  </div>
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-bg-elevated">
                    <User className="h-4 w-4 text-text-muted" />
                  </div>
                </div>

                {/* Respuesta IA */}
                <div className="flex gap-2">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary">
                    <span className="text-[10px] font-bold text-bg-base">AI</span>
                  </div>
                  <div className="flex min-w-0 max-w-[88%] flex-1 flex-col gap-1">
                    <span className="text-[10px] text-text-muted">SourceAI</span>
                    <div className="rounded-2xl rounded-bl-md border border-border bg-bg-surface px-4 py-3">
                      <p className="text-sm leading-relaxed text-text-primary">
                        {activeBenefit.chatExample.answer}
                      </p>
                      <div className="mt-3 flex flex-wrap gap-1.5 border-t border-border/50 pt-2">
                        <span className="text-[10px] text-text-muted">Fuentes:</span>
                        {activeBenefit.chatExample.sources.map((source) => (
                          <span
                            key={source}
                            className="rounded-md bg-bg-elevated px-2 py-1 text-xs text-primary"
                          >
                            {source}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Input real */}
            <div className="border-t border-border bg-bg-elevated p-3">
              <div className="flex items-center gap-2 rounded-xl border border-border bg-bg-base px-3 py-2">
                <input
                  type="text"
                  readOnly
                  placeholder="Escribe tu pregunta..."
                  className="min-w-0 flex-1 bg-transparent text-sm text-text-primary placeholder:text-text-muted focus:outline-none"
                />
                <button
                  type="button"
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary text-bg-base transition-opacity hover:opacity-90"
                  aria-label="Enviar"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
