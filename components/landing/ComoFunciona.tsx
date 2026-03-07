"use client";

import { useState, useRef, useEffect } from "react";
import {
  Plug,
  Database,
  MessageCircle,
  CheckCircle2,
  Sparkles,
  Zap,
  FileCode,
  FileText,
  GitBranch,
  MessageSquare,
  Box,
  Cpu,
  Link2,
  BookOpen,
  Search,
  Code2,
  Layers,
  CircleDot,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* Iconos decorativos: posiciones que funcionan en mobile y desktop */
const scatteredIcons = [
  { Icon: Sparkles, pos: "top-0 right-0 sm:-top-3 sm:-right-4", size: "h-5 w-5 sm:h-7 sm:w-7", op: "opacity-30" },
  { Icon: Zap, pos: "bottom-0 left-0 sm:-bottom-2 sm:-left-3", size: "h-4 w-4 sm:h-5 sm:w-5", op: "opacity-20" },
  { Icon: FileCode, pos: "top-[15%] right-0 sm:top-1/4 sm:-right-5", size: "h-3 w-3 sm:h-4 sm:w-4", op: "opacity-15" },
  { Icon: FileText, pos: "bottom-[30%] left-0 sm:bottom-1/3 sm:-left-4", size: "h-4 w-4 sm:h-5 sm:w-5", op: "opacity-18" },
  { Icon: GitBranch, pos: "top-0 right-[28%] sm:-top-1 sm:right-1/4", size: "h-3 w-3 sm:h-4 sm:w-4", op: "opacity-12" },
  { Icon: MessageSquare, pos: "top-[65%] right-1 sm:top-2/3 sm:-right-2", size: "h-2.5 w-2.5 sm:h-3 sm:w-3", op: "opacity-10" },
  { Icon: Box, pos: "bottom-0 left-[28%] sm:-bottom-3 sm:left-1/4", size: "h-4 w-4 sm:h-5 sm:w-5", op: "opacity-15" },
  { Icon: Cpu, pos: "top-1/2 left-0 sm:top-1/2 sm:-left-5 -translate-y-1/2", size: "h-3 w-3 sm:h-4 sm:w-4", op: "opacity-12" },
  { Icon: Link2, pos: "top-2 right-2 sm:top-3 sm:-right-1", size: "h-2.5 w-2.5 sm:h-3 sm:w-3", op: "opacity-20" },
  { Icon: BookOpen, pos: "bottom-2 right-0 sm:bottom-2 sm:-right-4", size: "h-4 w-4 sm:h-5 sm:w-5", op: "opacity-15" },
  { Icon: Search, pos: "top-0 left-[32%] sm:-top-2 sm:left-1/3", size: "h-3 w-3 sm:h-4 sm:w-4", op: "opacity-10" },
  { Icon: Code2, pos: "top-[65%] left-1 sm:top-2/3 sm:-left-2", size: "h-2.5 w-2.5 sm:h-3 sm:w-3", op: "opacity-18" },
  { Icon: Layers, pos: "bottom-1 right-[32%] sm:-bottom-1 sm:right-1/3", size: "h-3 w-3 sm:h-4 sm:w-4", op: "opacity-12" },
  { Icon: CircleDot, pos: "top-[28%] right-1 sm:top-1/3 sm:-right-3", size: "h-2.5 w-2.5 sm:h-3 sm:w-3", op: "opacity-15" },
];

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
  const sectionRef = useRef<HTMLElement>(null);
  const stepsContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: stepsContainerRef.current,
        start: "top 60%",
        end: "bottom 40%",
        onUpdate: (self) => {
          const progress = self.progress;
          const index = Math.min(Math.floor(progress * steps.length), steps.length - 1);
          setActiveStep(index);
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
            Cómo funciona
          </h2>
          <p className="mt-4 text-lg text-text-secondary">
            De la conexión a la primera respuesta en cuatro pasos.
          </p>
        </div>

        {/* Roadmap vertical interactivo (cambio por scroll) */}
        <div ref={stepsContainerRef} className="mt-16 lg:mt-20">
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
                  <div
                    key={step.number}
                    className="group relative flex w-full items-start gap-6 py-8 text-left transition-all duration-300 lg:py-10 lg:odd:flex-row lg:odd:pr-0 lg:odd:pl-0 lg:even:flex-row-reverse lg:even:pl-0 lg:even:pr-0"
                  >
                    {/* Contenido (card) sin icono + muchos iconos esparcidos (mobile-friendly) */}
                    <div className={`relative flex-1 overflow-visible px-6 py-5 sm:px-8 sm:py-6 lg:w-[calc(50%-2rem)] lg:px-0 lg:py-0 ${i % 2 === 0 ? "lg:mr-auto lg:pr-12" : "lg:ml-auto lg:pl-12"}`}>
                      {/* Icono del paso, destacado */}
                      <div className="pointer-events-none absolute top-2 right-2 text-primary/30 sm:-top-2 sm:-right-2" aria-hidden>
                        <step.icon className="h-6 w-6 sm:h-8 sm:w-8" />
                      </div>
                      {/* Iconos decorativos esparcidos */}
                      {scatteredIcons.map(({ Icon, pos, size, op }, idx) => (
                        <div
                          key={idx}
                          className={`pointer-events-none absolute ${pos} text-primary ${op} ${size}`}
                          aria-hidden
                        >
                          <Icon className={size} />
                        </div>
                      ))}

                      <div
                        className={`relative flex flex-col rounded-xl px-6 py-5 transition-all duration-300 ${
                          isActive
                            ? "bg-bg-elevated ring-1 ring-primary/30 shadow-lg"
                            : "bg-bg-surface/80 ring-1 ring-border/50"
                        }`}
                      >
                        <span className="text-[11px] font-medium uppercase tracking-widest text-text-muted">
                          Paso {step.number}
                        </span>
                        <h3 className="mt-3 text-base font-semibold tracking-tight text-text-primary">
                          {step.title}
                        </h3>
                        <p
                          className={`mt-2 text-sm leading-relaxed text-text-secondary transition-all duration-300 ${
                            isActive ? "max-h-20 opacity-100" : "max-h-0 overflow-hidden opacity-0 lg:max-h-20 lg:opacity-100"
                          }`}
                        >
                          {step.description}
                        </p>
                      </div>
                    </div>

                    {/* Nodo central en la línea */}
                    <div className="absolute left-0 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center lg:left-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2">
                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300 ${
                          isActive
                            ? "bg-primary text-bg-base shadow-md"
                            : isPast
                              ? "bg-primary/20 text-primary"
                              : "bg-bg-elevated ring-1 ring-border text-text-muted"
                        }`}
                      >
                        <span className="text-xs font-semibold">{step.number}</span>
                      </div>
                    </div>

                    {/* Espacio en el otro lado para balance */}
                    <div className="hidden flex-1 lg:block" />
                  </div>
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
