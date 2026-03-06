import { Plug, Database, MessageCircle, CheckCircle2 } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Plug,
    title: "Conecta tus herramientas",
    description: "Integra GitHub, Slack, Notion y Google Drive en minutos. Solo necesitas permisos de lectura.",
  },
  {
    number: "02",
    icon: Database,
    title: "Indexamos tu conocimiento",
    description: "Nuestra IA procesa y entiende tu código, documentos y conversaciones de forma segura.",
  },
  {
    number: "03",
    icon: MessageCircle,
    title: "Haz preguntas en lenguaje natural",
    description: "Pregunta como si hablaras con un compañero. Sin sintaxis especial ni comandos.",
  },
  {
    number: "04",
    icon: CheckCircle2,
    title: "Recibe respuestas con fuentes verificables",
    description: "Cada respuesta incluye referencias a los archivos, canales o documentos de origen.",
  },
];

export function ComoFunciona() {
  return (
    <section className="px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
            Cómo funciona
          </h2>
          <p className="mt-4 text-lg text-text-secondary">
            De la conexión a la primera respuesta en cuatro pasos simples.
          </p>
        </div>

        <div className="mt-16">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:items-stretch">
            {steps.map((step) => (
              <div
                key={step.number}
                className="flex flex-col rounded-xl border border-border bg-bg-surface p-6 transition-all hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5"
              >
                  <span className="text-3xl font-bold text-primary/40">
                    {step.number}
                  </span>
                  <div className="mt-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <step.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-4 font-semibold text-text-primary">
                    {step.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm text-text-secondary leading-relaxed">
                    {step.description}
                  </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
