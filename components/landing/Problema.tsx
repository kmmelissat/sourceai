import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  FolderGit2,
  UserCheck,
  Clock,
  FileQuestion,
} from "lucide-react";

const painPoints = [
  {
    icon: FolderGit2,
    title: "Información dispersa entre herramientas",
    description:
      "Documentos en Drive, código en GitHub, decisiones en Slack y procesos en Notion. Nadie sabe dónde buscar.",
  },
  {
    icon: UserCheck,
    title: "Dependencia de personas clave",
    description:
      "Cuando alguien se va de vacaciones o deja la empresa, el conocimiento se va con ellos.",
  },
  {
    icon: Clock,
    title: "Onboarding lento",
    description:
      "Lleva semanas o meses que un nuevo desarrollador entienda cómo funcionan las cosas realmente.",
  },
  {
    icon: FileQuestion,
    title: "Pérdida de contexto técnico",
    description:
      "¿Por qué se tomó esa decisión? ¿Quién aprobó este cambio? El contexto se pierde en conversaciones pasadas.",
  },
];

export function Problema() {
  return (
    <section
      id="producto"
      className="px-4 py-20 sm:px-6 sm:py-28 lg:px-8"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
            El conocimiento de tu empresa está{" "}
            <span className="text-primary">fragmentado</span>.
          </h2>
          <p className="mt-4 text-lg text-text-secondary">
            En muchas startups, la información vive en repositorios, mensajes,
            documentos y en la cabeza de unas pocas personas. Encontrar
            respuestas toma demasiado tiempo y frena la productividad del equipo.
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:items-stretch">
          {painPoints.map((point) => (
            <Card
              key={point.title}
              className="group flex flex-col border-border/80 transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
            >
              <CardHeader>
                <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary/20">
                  <point.icon className="h-5 w-5" />
                </div>
                <h3 className="font-semibold text-text-primary">
                  {point.title}
                </h3>
              </CardHeader>
              <CardContent className="flex flex-1 flex-col pt-0">
                <p className="flex-1 text-sm text-text-secondary leading-relaxed">
                  {point.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
