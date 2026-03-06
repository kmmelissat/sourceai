import {
  FolderGit2,
  UserCheck,
  Clock,
  FileQuestion,
} from "lucide-react";

const valueProps = [
  {
    icon: FolderGit2,
    title: "Todo conectado",
    description:
      "Drive, GitHub, Slack, Notion. Una sola interfaz para buscar en todas tus fuentes.",
  },
  {
    icon: UserCheck,
    title: "Conocimiento que permanece",
    description:
      "El contexto técnico y las decisiones quedan documentados, no solo en la memoria del equipo.",
  },
  {
    icon: Clock,
    title: "Onboarding en días",
    description:
      "Los nuevos encuentran respuestas solos. Menos interrupciones, más productividad desde el día uno.",
  },
  {
    icon: FileQuestion,
    title: "Respuestas con fuentes",
    description:
      "Cada respuesta incluye referencias a repos, docs y conversaciones. Sin suposiciones.",
  },
];

export function ProblemaSolucion() {
  return (
    <section
      id="producto"
      className="px-4 py-20 sm:px-6 sm:py-28 lg:px-8"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
            Tu conocimiento,{" "}
            <span className="text-primary">en un solo lugar</span>
          </h2>
          <p className="mt-4 text-lg text-text-secondary">
            Conectamos tus herramientas para que cualquier persona encuentre
            respuestas en segundos.
          </p>
        </div>

        <div className="mt-16">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:items-stretch">
            {valueProps.map((point) => (
              <div
                key={point.title}
                className="group flex flex-col rounded-xl border border-border bg-bg-surface p-6 transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
              >
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary/20">
                  <point.icon className="h-5 w-5" />
                </div>
                <h4 className="font-semibold text-text-primary">
                  {point.title}
                </h4>
                <p className="mt-2 flex-1 text-sm text-text-secondary leading-relaxed">
                  {point.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
