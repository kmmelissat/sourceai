"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, CheckCircle2, Sparkles, Copy, Check } from "lucide-react";

export function CTAFinal() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [shareUrl, setShareUrl] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    if (typeof window !== "undefined") {
      setShareUrl(window.location.href);
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl || window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback por si clipboard no está disponible
    }
  };

  return (
    <section
      id="contacto"
      className="relative overflow-hidden px-4 py-24 sm:px-6 sm:py-32 lg:px-8"
    >
      {/* Fondo sutil para destacar la sección */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none" />

      <div className="relative mx-auto max-w-3xl">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm text-primary mb-6">
            <Sparkles className="h-4 w-4" />
            <span>Acceso temprano</span>
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
            Reduce el tiempo que tu equipo pierde buscando respuestas
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-text-secondary">
            Únete a la lista de espera y sé de los primeros en probar SourceAI.
          </p>
        </div>

        <div className="mt-12 rounded-3xl border border-border bg-bg-surface/80 p-6 shadow-xl shadow-primary/5 sm:p-10 sm:shadow-2xl">
          {isSubmitted ? (
            <div className="py-8 sm:py-10">
              <div className="flex flex-col items-center text-center">
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-primary/20 text-primary">
                  <CheckCircle2 className="h-8 w-8" />
                </div>
                <p className="text-sm font-medium uppercase tracking-wider text-primary">
                  Solicitud recibida
                </p>
                <h3 className="mt-2 text-2xl font-bold text-text-primary sm:text-3xl">
                  ¡Estás en la lista!
                </h3>
                <p className="mt-4 max-w-md text-text-secondary">
                  Te contactaremos en 2-3 días con los próximos pasos. Mientras tanto, invita a tu equipo a sumarse a la lista de espera.
                </p>
              </div>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-border bg-bg-elevated/50 p-4 text-center">
                  <p className="text-xs font-medium uppercase tracking-wider text-text-muted">
                    Respuesta
                  </p>
                  <p className="mt-1 text-lg font-semibold text-text-primary">
                    2-3 días
                  </p>
                </div>
                <div className="rounded-2xl border border-border bg-bg-elevated/50 p-4 text-center">
                  <p className="text-xs font-medium uppercase tracking-wider text-text-muted">
                    Próximo paso
                  </p>
                  <p className="mt-1 text-lg font-semibold text-primary">
                    Acceso al beta
                  </p>
                </div>
              </div>

              <div className="mt-8">
                <p className="text-sm font-medium text-text-primary">
                  Comparte la lista de espera con tu equipo
                </p>
                <p className="mt-1 text-xs text-text-muted">
                  Usa este enlace para que más personas de tu equipo se sumen.
                </p>
                <div className="mt-3 flex gap-2">
                  <div className="flex flex-1 items-center gap-2 rounded-xl border border-border bg-bg-elevated px-4 py-2.5">
                    <span className="min-w-0 truncate text-sm text-text-secondary">
                      {shareUrl || "Cargando..."}
                    </span>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    className="h-11 w-11 shrink-0 rounded-xl"
                    onClick={handleCopyLink}
                    aria-label="Copiar enlace"
                  >
                    {copied ? (
                      <Check className="h-5 w-5 text-primary" />
                    ) : (
                      <Copy className="h-5 w-5" />
                    )}
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <label
                    htmlFor="name"
                    className="text-sm font-medium text-text-primary"
                  >
                    Nombre
                  </label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Tu nombre"
                    required
                    className="h-11"
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="text-sm font-medium text-text-primary"
                  >
                    Email
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="tu@empresa.com"
                    required
                    className="h-11"
                  />
                </div>
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <label
                    htmlFor="company"
                    className="text-sm font-medium text-text-primary"
                  >
                    Empresa
                  </label>
                  <Input
                    id="company"
                    name="company"
                    placeholder="Nombre de tu startup"
                    className="h-11"
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="employees"
                    className="text-sm font-medium text-text-primary"
                  >
                    Nº de empleados
                  </label>
                  <Input
                    id="employees"
                    name="employees"
                    type="number"
                    placeholder="Ej: 15"
                    min="1"
                    className="h-11"
                  />
                </div>
              </div>
              <div className="pt-2">
                <Button
                  type="submit"
                  size="lg"
                  className="h-12 w-full rounded-full px-8 text-base font-semibold sm:w-auto"
                >
                  Solicitar acceso temprano
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <p className="mt-3 text-center text-xs text-text-muted sm:text-left">
                  Sin spam. Solo te escribimos cuando tengamos novedades.
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
