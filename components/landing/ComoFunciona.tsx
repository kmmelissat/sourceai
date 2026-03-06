"use client";

import { useState } from "react";
import { Plug, Database, MessageCircle, CheckCircle2, ChevronDown } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Plug,
    title: "Conecta tus herramientas",
    description:
      "Integra GitHub, Slack, Notion y Google Drive en minutos. Solo necesitas permisos de lectura.",
  },
  {
    number: "02",
    icon: Database,
    title: "Indexamos tu conocimiento",
    description:
      "Nuestra IA procesa y entiende tu código, documentos y conversaciones de forma segura.",
  },
  {
    number: "03",
    icon: MessageCircle,
    title: "Haz preguntas en lenguaje natural",
    description:
      "Pregunta como si hablaras con un compañero. Sin sintaxis especial ni comandos.",
  },
  {
    number: "04",
    icon: CheckCircle2,
    title: "Recibe respuestas con fuentes verificables",
    description:
      "Cada respuesta incluye referencias a los archivos, canales o documentos de origen.",
  },
];

export function ComoFunciona() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section className="px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
            Cómo funciona
          </h2>
          <p className="mt-4 text-lg text-text-secondary">
            De la conexión a la primera respuesta en cuatro pasos.
          </p>
        </div>

        {/* Roadmap vertical interactivo */}
        <div className="mt-16 lg:mt-20">
          <div className="relative mx-auto max-w-3xl">
            {/* Línea del roadmap (fondo) */}
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border lg:left-1/2 lg:-translate-x-px" />

            {/* Línea de progreso hasta el paso activo */}
            <div
              className="absolute left-6 top-0 w-0.5 bg-primary transition-all duration-500 ease-out lg:left-1/2 lg:-translate-x-px"
              style={{
                height: `${((activeStep + 0.5) / steps.length) * 100}%`,
              }}
            />

            {/* Pasos */}
            <div className="relative space-y-0">
              {steps.map((step, i) => {
                const isActive = activeStep === i;
                const isPast = activeStep > i;
                return (
                  <button
                    key={step.number}
                    type="button"
                    onClick={() => setActiveStep(i)}
                    className="group relative flex w-full items-start gap-6 py-8 text-left transition-all duration-300 lg:py-10 lg:odd:flex-row lg:odd:pr-0 lg:odd:pl-0 lg:even:flex-row-reverse lg:even:pl-0 lg:even:pr-0"
                  >
                    {/* Contenido (card) */}
                    <div
                      className={`relative flex flex-1 flex-col rounded-2xl border p-6 transition-all duration-300 lg:w-[calc(50%-2rem)] ${
                        isActive
                          ? "border-primary/50 bg-primary/5 shadow-lg shadow-primary/10"
                          : "border-border bg-bg-surface hover:border-primary/30 hover:bg-bg-surface"
                      } ${i % 2 === 0 ? "lg:mr-auto lg:pr-12" : "lg:ml-auto lg:pl-12"}`}
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl transition-all duration-300 ${
                            isActive ? "bg-primary text-bg-base scale-110" : "bg-primary/10 text-primary group-hover:bg-primary/20"
                          }`}
                        >
                          <step.icon className="h-7 w-7" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                            Paso {step.number}
                          </span>
                          <h3 className="mt-0.5 text-lg font-semibold text-text-primary">
                            {step.title}
                          </h3>
                        </div>
                        {isActive && (
                          <ChevronDown className="h-5 w-5 shrink-0 -rotate-90 text-primary lg:rotate-0" />
                        )}
                      </div>
                      <p
                        className={`mt-4 text-sm leading-relaxed text-text-secondary transition-all duration-300 ${
                          isActive ? "max-h-24 opacity-100" : "max-h-0 overflow-hidden opacity-0 lg:max-h-24 lg:opacity-100"
                        }`}
                      >
                        {step.description}
                      </p>
                    </div>

                    {/* Nodo central en la línea */}
                    <div className="absolute left-0 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center lg:left-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2">
                      <div
                        className={`flex h-12 w-12 items-center justify-center rounded-full border-2 transition-all duration-300 ${
                          isActive
                            ? "border-primary bg-primary text-bg-base shadow-lg shadow-primary/30"
                            : isPast
                              ? "border-primary bg-primary/20 text-primary"
                              : "border-border bg-bg-base group-hover:border-primary/50"
                        }`}
                      >
                        <span className="text-sm font-bold">{step.number}</span>
                      </div>
                    </div>

                    {/* Espacio en el otro lado para balance */}
                    <div className="hidden flex-1 lg:block" />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Indicadores móviles */}
          <div className="mt-8 flex justify-center gap-2 lg:mt-12">
            {steps.map((_, i) => (
              <button
                key={steps[i].number}
                type="button"
                onClick={() => setActiveStep(i)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === activeStep ? "w-8 bg-primary" : "w-2 bg-border hover:bg-primary/40"
                }`}
                aria-label={`Ir al paso ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
