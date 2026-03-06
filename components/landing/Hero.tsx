import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChatMockup } from "./ChatMockup";
import { Zap, Users, TrendingUp } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden px-4 pt-32 pb-20 sm:px-6 sm:pt-40 sm:pb-28 lg:px-8">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent pointer-events-none" />

      <div className="relative mx-auto max-w-6xl">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 lg:items-center">
          <div className="space-y-8">
            <h1 className="text-4xl font-bold leading-tight tracking-tight text-text-primary sm:text-5xl lg:text-6xl">
              La IA que entiende tu{" "}
              <span className="text-primary">código</span>,{" "}
              <span className="text-primary">documentación</span> y{" "}
              <span className="text-primary">procesos</span>.
            </h1>
            <p className="max-w-xl text-lg text-text-secondary sm:text-xl">
              Conecta GitHub, Slack, Notion y tus documentos para encontrar
              respuestas sobre cómo funciona tu empresa en segundos.
            </p>

            <div className="flex flex-col gap-4 sm:flex-row sm:gap-6">
              <Button size="lg" className="text-base" asChild>
                <Link href="#precios">Ver precios</Link>
              </Button>
              <Button size="lg" variant="outline" className="text-base" asChild>
                <Link href="#contacto">Solicitar acceso temprano</Link>
              </Button>
            </div>

            <div className="flex flex-wrap gap-6 pt-4 border-t border-border">
              <div className="flex items-center gap-2 text-sm text-text-secondary">
                <Zap className="h-4 w-4 text-primary" />
                <span>Pensado para startups en crecimiento</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-text-secondary">
                <Users className="h-4 w-4 text-primary" />
                <span>Ideal para equipos técnicos</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-text-secondary">
                <TrendingUp className="h-4 w-4 text-primary" />
                <span>Reduce el time-to-productivity</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative z-10 mx-auto max-w-lg">
              <ChatMockup />
            </div>
            <div className="absolute -inset-4 rounded-2xl bg-gradient-to-r from-primary/10 to-supporting-600/10 blur-2xl" />
          </div>
        </div>
      </div>
    </section>
  );
}
