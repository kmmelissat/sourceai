"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

export function CTAFinal() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <section
      id="contacto"
      className="px-4 py-20 sm:px-6 sm:py-28 lg:px-8"
    >
      <div className="mx-auto max-w-4xl">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
            Reduce el tiempo que tu equipo pierde buscando respuestas.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-text-secondary">
            Únete a la lista de espera y sé de los primeros equipos en probar
            SourceAI.
          </p>
        </div>

        <Card className="mt-12 border-border bg-bg-surface">
          <CardContent className="p-6 sm:p-8">
            {isSubmitted ? (
              <div className="py-12 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/20">
                  <span className="text-3xl">✓</span>
                </div>
                <h3 className="text-xl font-semibold text-text-primary">
                  ¡Gracias por tu interés!
                </h3>
                <p className="mt-2 text-text-secondary">
                  Te contactaremos pronto con más información sobre el acceso
                  temprano.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="name"
                      className="mb-2 block text-sm font-medium text-text-secondary"
                    >
                      Nombre
                    </label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Tu nombre"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="mb-2 block text-sm font-medium text-text-secondary"
                    >
                      Email
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="tu@empresa.com"
                      required
                    />
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="company"
                      className="mb-2 block text-sm font-medium text-text-secondary"
                    >
                      Empresa
                    </label>
                    <Input
                      id="company"
                      name="company"
                      placeholder="Nombre de tu startup"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="employees"
                      className="mb-2 block text-sm font-medium text-text-secondary"
                    >
                      Número de empleados
                    </label>
                    <Input
                      id="employees"
                      name="employees"
                      type="number"
                      placeholder="Ej: 15"
                      min="1"
                    />
                  </div>
                </div>
                <Button type="submit" size="lg" className="mt-6 w-full sm:w-auto">
                  Solicitar acceso temprano
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
