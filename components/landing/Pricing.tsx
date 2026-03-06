import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Check, Sparkles, Building2, Rocket } from "lucide-react";

const features = [
  "Búsqueda con IA",
  "Integraciones con herramientas clave",
  "Respuestas con fuentes",
  "Historial de consultas",
];

const comingSoonFeatures = [
  "Todo lo del plan anterior",
  "Soporte prioritario",
  "API personalizada",
  "Equipo dedicado",
];

const plans = [
  {
    name: "Startup",
    icon: Sparkles,
    price: "$12",
    period: "/ usuario / mes",
    features,
    cta: "Ver planes completos",
    available: true,
    highlight: true,
  },
  {
    name: "Growth",
    icon: Rocket,
    price: "Próximamente",
    period: "",
    features: comingSoonFeatures,
    cta: "Coming soon",
    available: false,
    highlight: false,
  },
  {
    name: "Enterprise",
    icon: Building2,
    price: "Próximamente",
    period: "",
    features: [
      ...comingSoonFeatures,
      "SLA garantizado",
      "Integraciones custom",
      "SSO y SCIM",
    ],
    cta: "Coming soon",
    available: false,
    highlight: false,
  },
];

export function Pricing() {
  return (
    <section
      id="precios"
      className="px-4 py-20 sm:px-6 sm:py-28 lg:px-8"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
            Precios simples para equipos en crecimiento
          </h2>
          <p className="mt-4 text-lg text-text-secondary">
            Empieza con un plan que escala con tu equipo.
          </p>
        </div>

        <div className="mt-16 grid gap-6 lg:grid-cols-3 lg:items-stretch">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={`relative flex flex-col overflow-hidden ${
                plan.highlight
                  ? "border-2 border-primary/30 shadow-xl shadow-primary/10"
                  : "border-border opacity-90"
              }`}
            >
              {plan.available && (
                <div className="absolute right-0 top-0 h-32 w-32 translate-x-8 -translate-y-8 rounded-full bg-primary/10 blur-2xl" />
              )}
              <CardHeader className="relative">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <plan.icon
                      className={`h-5 w-5 ${
                        plan.available ? "text-primary" : "text-text-muted"
                      }`}
                    />
                    <h3 className="text-xl font-semibold text-text-primary">
                      {plan.name} Plan
                    </h3>
                  </div>
                  {!plan.available && (
                    <span className="rounded-full bg-bg-elevated px-3 py-1 text-xs font-medium text-text-muted">
                      Coming soon
                    </span>
                  )}
                </div>
                <div className="mt-2">
                  <span
                    className={`text-4xl font-bold ${
                      plan.available ? "text-primary" : "text-text-muted"
                    }`}
                  >
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span className="ml-2 text-text-secondary">
                      {plan.period}
                    </span>
                  )}
                </div>
              </CardHeader>
              <CardContent className="relative flex flex-1 flex-col space-y-4">
                <ul className="flex-1 space-y-3">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className={`flex items-center gap-3 ${
                        plan.available
                          ? "text-text-secondary"
                          : "text-text-muted"
                      }`}
                    >
                      <Check
                        className={`h-5 w-5 shrink-0 ${
                          plan.available ? "text-primary" : "text-text-muted"
                        }`}
                      />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-auto pt-4">
                {plan.available ? (
                  <Button size="lg" className="w-full" asChild>
                    <Link href="#contacto">{plan.cta}</Link>
                  </Button>
                ) : (
                  <div className="flex h-11 w-full items-center justify-center rounded-full border border-border bg-bg-elevated text-sm font-medium text-text-muted">
                    Coming soon
                  </div>
                )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
