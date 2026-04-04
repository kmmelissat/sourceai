"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Trash2, ChevronRight, Check, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useChatConnections } from "@/components/chat/ChatConnectionsContext";
import { getConnectGuide } from "@/components/chat/integrationConnectGuides";
import { cn } from "@/lib/utils";

const SECTIONS = [
  { id: "knowledge", label: "Conocimiento / Docs" },
  { id: "code", label: "Código / Dev" },
  { id: "pm", label: "Gestión de proyectos" },
  { id: "comm", label: "Comunicación" },
  { id: "data", label: "Datos / Analytics" },
  { id: "devops", label: "DevOps / Infra" },
  { id: "auth", label: "Accesos / Usuarios" },
  { id: "crm", label: "CRM / Ventas" },
] as const;

type CategoryId = (typeof SECTIONS)[number]["id"];

type AppProvider = {
  id: string;
  name: string;
  description: string;
  logoSrc: string;
  categoryId: CategoryId;
};

const appProviders: AppProvider[] = [
  {
    id: "notion",
    name: "Notion",
    description: "Wikis, bases de datos y documentación viva",
    logoSrc: "/integrations/notion.svg",
    categoryId: "knowledge",
  },
  {
    id: "confluence",
    name: "Confluence",
    description: "Espacios de documentación para equipos",
    logoSrc: "/integrations/confluence.svg",
    categoryId: "knowledge",
  },
  {
    id: "coda",
    name: "Coda",
    description: "Docs conectados con datos y automatización",
    logoSrc: "/integrations/coda.svg",
    categoryId: "knowledge",
  },
  {
    id: "slab",
    name: "Slab",
    description: "Base de conocimiento técnica para equipos",
    logoSrc: "/integrations/slab.svg",
    categoryId: "knowledge",
  },
  {
    id: "github",
    name: "GitHub",
    description: "Repos, pull requests y revisiones de código",
    logoSrc: "/integrations/github.svg",
    categoryId: "code",
  },
  {
    id: "gitlab",
    name: "GitLab",
    description: "Repos, CI/CD y gestión de código",
    logoSrc: "/integrations/gitlab.svg",
    categoryId: "code",
  },
  {
    id: "bitbucket",
    name: "Bitbucket",
    description: "Git en la nube con integración Atlassian",
    logoSrc: "/integrations/bitbucket.svg",
    categoryId: "code",
  },
  {
    id: "linear",
    name: "Linear",
    description: "Issues, ciclos y roadmap de producto",
    logoSrc: "/integrations/linear.svg",
    categoryId: "pm",
  },
  {
    id: "jira",
    name: "Jira",
    description: "Backlog, sprints y seguimiento ágil",
    logoSrc: "/integrations/jira.svg",
    categoryId: "pm",
  },
  {
    id: "clickup",
    name: "ClickUp",
    description: "Tareas, listas y vistas de proyecto",
    logoSrc: "/integrations/clickup.svg",
    categoryId: "pm",
  },
  {
    id: "asana",
    name: "Asana",
    description: "Planificación y trabajo en equipo",
    logoSrc: "/integrations/asana.svg",
    categoryId: "pm",
  },
  {
    id: "slack",
    name: "Slack",
    description: "Canales, hilos y decisiones del día a día",
    logoSrc: "/integrations/slack.svg",
    categoryId: "comm",
  },
  {
    id: "microsoftteams",
    name: "Microsoft Teams",
    description: "Chat, reuniones y archivos de Microsoft 365",
    logoSrc: "/integrations/microsoftteams.svg",
    categoryId: "comm",
  },
  {
    id: "discord",
    name: "Discord",
    description: "Comunidades y voz para equipos distribuidos",
    logoSrc: "/integrations/discord.svg",
    categoryId: "comm",
  },
  {
    id: "metabase",
    name: "Metabase",
    description: "Preguntas y dashboards sobre tus datos",
    logoSrc: "/integrations/metabase.svg",
    categoryId: "data",
  },
  {
    id: "tableau",
    name: "Tableau",
    description: "Visualización y análisis de negocio",
    logoSrc: "/integrations/tableau.svg",
    categoryId: "data",
  },
  {
    id: "looker",
    name: "Looker",
    description: "BI y modelado de datos en la nube",
    logoSrc: "/integrations/looker.svg",
    categoryId: "data",
  },
  {
    id: "vercel",
    name: "Vercel",
    description: "Deploy frontend, previews y edge",
    logoSrc: "/integrations/vercel.svg",
    categoryId: "devops",
  },
  {
    id: "docker",
    name: "Docker",
    description: "Contenedores e imágenes",
    logoSrc: "/integrations/docker.svg",
    categoryId: "devops",
  },
  {
    id: "kubernetes",
    name: "Kubernetes",
    description: "Orquestación de cargas en clúster",
    logoSrc: "/integrations/kubernetes.svg",
    categoryId: "devops",
  },
  {
    id: "aws",
    name: "AWS",
    description: "Nube, servicios y cuentas de infraestructura",
    logoSrc: "/integrations/amazonaws.svg",
    categoryId: "devops",
  },
  {
    id: "auth0",
    name: "Auth0",
    description: "Identidad, SSO y políticas de acceso",
    logoSrc: "/integrations/auth0.svg",
    categoryId: "auth",
  },
  {
    id: "clerk",
    name: "Clerk",
    description: "Auth y gestión de usuarios para apps",
    logoSrc: "/integrations/clerk.svg",
    categoryId: "auth",
  },
  {
    id: "hubspot",
    name: "HubSpot",
    description: "CRM, marketing y soporte",
    logoSrc: "/integrations/hubspot.svg",
    categoryId: "crm",
  },
  {
    id: "salesforce",
    name: "Salesforce",
    description: "CRM, ventas y servicio al cliente",
    logoSrc: "/integrations/salesforce.svg",
    categoryId: "crm",
  },
];

function IntegrationRow({
  name,
  description,
  logoSrc,
  connected,
  onOpen,
}: {
  name: string;
  description: string;
  logoSrc: string;
  connected: boolean;
  onOpen: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className={cn(
        "group flex w-full items-center gap-4 rounded-2xl border px-4 py-4 text-left transition-colors",
        "border-border bg-bg-elevated hover:bg-bg-surface hover:border-border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base",
        connected && "border-primary/35 bg-primary/[0.06]"
      )}
    >
      <div className="relative shrink-0">
        <div
          className={cn(
            "flex h-12 w-12 items-center justify-center rounded-full border bg-bg-surface transition-colors",
            "border-border group-hover:border-primary/30"
          )}
        >
          <Image
            src={logoSrc}
            alt=""
            width={28}
            height={28}
            className="h-7 w-7 object-contain brightness-0 invert opacity-90"
            unoptimized
          />
        </div>
        {connected ? (
          <span
            className="absolute -bottom-0.5 -right-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-bg-base ring-2 ring-bg-elevated"
            aria-hidden
          >
            <Check className="h-3 w-3" strokeWidth={3} />
          </span>
        ) : null}
      </div>
      <div className="min-w-0 flex-1">
        <p className="font-semibold text-text-primary">{name}</p>
        <p className="mt-0.5 text-sm leading-snug text-text-muted">
          {description}
        </p>
      </div>
      <ChevronRight
        className="h-5 w-5 shrink-0 text-text-muted transition-transform group-hover:translate-x-0.5 group-hover:text-primary"
        strokeWidth={1.5}
        aria-hidden
      />
    </button>
  );
}

function IntegrationConnectModal({
  app,
  connected,
  onClose,
  onToggleConnection,
}: {
  app: AppProvider | null;
  connected: boolean;
  onClose: () => void;
  onToggleConnection: () => void;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const el = dialogRef.current;
    if (!el) return;
    if (app) {
      if (!el.open) el.showModal();
    } else if (el.open) {
      el.close();
    }
  }, [app]);

  const guide = app ? getConnectGuide(app.id, app.name) : null;

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      className={cn(
        "fixed left-1/2 top-1/2 z-[200] m-0 max-h-[min(90vh,36rem)] w-[min(100vw-2rem,26rem)] -translate-x-1/2 -translate-y-1/2",
        "overflow-hidden rounded-2xl border border-border bg-bg-elevated p-0 text-text-primary shadow-2xl",
        "[&::backdrop]:bg-bg-base/80 [&::backdrop]:backdrop-blur-sm",
        "open:flex open:flex-col"
      )}
      aria-labelledby={app ? "integration-modal-title" : undefined}
    >
      {app && guide ? (
        <>
          <div className="flex items-start justify-between gap-3 border-b border-border px-5 py-4">
            <div className="flex min-w-0 items-center gap-3">
              <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-border bg-bg-surface">
                <Image
                  src={app.logoSrc}
                  alt=""
                  width={28}
                  height={28}
                  className="h-7 w-7 object-contain brightness-0 invert opacity-90"
                  unoptimized
                />
                {connected ? (
                  <span className="absolute -bottom-0.5 -right-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-bg-base ring-2 ring-bg-elevated">
                    <Check className="h-3 w-3" strokeWidth={3} />
                  </span>
                ) : null}
              </div>
              <div className="min-w-0">
                <h2
                  id="integration-modal-title"
                  className="font-heading text-lg font-semibold tracking-tight"
                >
                  {app.name}
                </h2>
                <p className="mt-0.5 text-sm text-text-muted">{app.description}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => dialogRef.current?.close()}
              className="rounded-full p-2 text-text-muted transition-colors hover:bg-bg-surface hover:text-text-primary"
              aria-label="Cerrar"
            >
              <X className="h-5 w-5" strokeWidth={1.5} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-5 py-4">
            <p className="text-sm font-medium text-primary">{guide.headline}</p>
            <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm leading-relaxed text-text-secondary">
              {guide.steps.map((step, i) => (
                <li key={i}>{step}</li>
              ))}
            </ol>
            {connected ? (
              <p className="mt-4 rounded-xl border border-primary/30 bg-primary/10 px-3 py-2 text-sm text-text-primary">
                Esta fuente está marcada como conectada en tu espacio.
              </p>
            ) : null}
          </div>

          <div className="flex flex-col-reverse gap-2 border-t border-border px-5 py-4 sm:flex-row sm:justify-end">
            <Button
              type="button"
              variant="outline"
              className="rounded-full"
              onClick={() => dialogRef.current?.close()}
            >
              Cerrar
            </Button>
            <Button
              type="button"
              className="rounded-full"
              variant={connected ? "outline" : "default"}
              onClick={() => {
                onToggleConnection();
              }}
            >
              {connected ? "Desconectar" : "Conectar"}
            </Button>
          </div>
        </>
      ) : null}
    </dialog>
  );
}

export function AppsIntegrations() {
  const {
    connections,
    addRepo,
    removeRepo,
    repoError,
    setRepoError,
    appStatus,
    toggleApp,
  } = useChatConnections();

  const [selectedApp, setSelectedApp] = useState<AppProvider | null>(null);
  const [repoName, setRepoName] = useState("");
  const [repoUrl, setRepoUrl] = useState("");
  const [showRepoForm, setShowRepoForm] = useState(false);

  const appsByCategory = useMemo(() => {
    const m: Record<CategoryId, AppProvider[]> = {
      knowledge: [],
      code: [],
      pm: [],
      comm: [],
      data: [],
      devops: [],
      auth: [],
      crm: [],
    };
    for (const a of appProviders) {
      m[a.categoryId].push(a);
    }
    return m;
  }, []);

  const modalConnected = selectedApp
    ? (appStatus[selectedApp.id] ?? false)
    : false;

  return (
    <main className="min-w-0 flex-1 overflow-y-auto bg-bg-base">
      <header className="sticky top-0 z-10 border-b border-border bg-bg-base/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl flex-col gap-3 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="font-heading text-xl font-semibold tracking-tight text-text-primary">
              Apps e integraciones
            </h1>
            <p className="mt-1 max-w-lg text-sm text-text-muted">
              Todas las fuentes en una vista. Abre cada app para ver cómo
              conectarla y activarla.
            </p>
          </div>
          <Button variant="outline" size="sm" className="shrink-0 rounded-full" asChild>
            <Link href="/chat">Volver al chat</Link>
          </Button>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-6 py-8">
        {SECTIONS.map((section) => (
          <section key={section.id} className="mt-12 first:mt-0">
            <h2 className="mb-4 text-base font-semibold text-text-primary">
              {section.label}
            </h2>

            {section.id === "code" ? (
              <div className="mb-6 space-y-4">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h3 className="text-sm font-semibold text-text-primary">
                      Repositorios por URL
                    </h3>
                    <p className="text-sm text-text-muted">
                      Añade la URL de un repositorio para incluirlo en el contexto.
                    </p>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="w-fit rounded-full"
                    onClick={() => setShowRepoForm((v) => !v)}
                  >
                    {showRepoForm ? "Ocultar formulario" : "Añadir repo"}
                  </Button>
                </div>

                {showRepoForm ? (
                  <div className="rounded-2xl border border-border bg-bg-elevated p-4 sm:p-5">
                    <div className="grid gap-3 sm:grid-cols-2">
                      <Input
                        value={repoName}
                        onChange={(e) => setRepoName(e.target.value)}
                        placeholder="Nombre (opcional)"
                        aria-label="Nombre del repo"
                        className="rounded-xl border-border bg-bg-base"
                      />
                      <Input
                        value={repoUrl}
                        onChange={(e) => {
                          setRepoUrl(e.target.value);
                          setRepoError(null);
                        }}
                        placeholder="https://github.com/org/repo"
                        aria-label="URL del repo"
                        className="rounded-xl border-border bg-bg-base"
                      />
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <Button
                        type="button"
                        className="rounded-full"
                        onClick={() => {
                          addRepo(repoName, repoUrl);
                          setRepoUrl("");
                          setRepoName("");
                        }}
                      >
                        Conectar repo
                      </Button>
                      {repoError ? (
                        <p className="self-center text-sm text-supporting-400">
                          {repoError}
                        </p>
                      ) : null}
                    </div>
                  </div>
                ) : null}

                {connections.length > 0 ? (
                  <ul className="space-y-2">
                    {connections.map((c) => (
                      <li
                        key={c.id}
                        className="flex items-center gap-3 rounded-2xl border border-border bg-bg-elevated px-4 py-3"
                      >
                        <div className="relative shrink-0">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-bg-surface">
                            <Image
                              src="/integrations/git.svg"
                              alt=""
                              width={22}
                              height={22}
                              className="h-5 w-5 object-contain brightness-0 invert opacity-90"
                              unoptimized
                            />
                          </div>
                          <span className="absolute -bottom-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-bg-base ring-2 ring-bg-elevated">
                            <Check className="h-2.5 w-2.5" strokeWidth={3} />
                          </span>
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-semibold text-text-primary">
                            {c.name}
                          </p>
                          <p className="truncate text-xs text-text-muted">{c.url}</p>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="shrink-0 rounded-full text-text-muted hover:text-text-primary"
                          onClick={() => removeRepo(c.id)}
                          aria-label={`Quitar ${c.name}`}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            ) : null}

            <ul className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-x-6 md:gap-y-3">
              {appsByCategory[section.id].map((app) => (
                <li key={app.id}>
                  <IntegrationRow
                    name={app.name}
                    description={app.description}
                    logoSrc={app.logoSrc}
                    connected={appStatus[app.id] ?? false}
                    onOpen={() => setSelectedApp(app)}
                  />
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <IntegrationConnectModal
        app={selectedApp}
        connected={modalConnected}
        onClose={() => setSelectedApp(null)}
        onToggleConnection={() => {
          if (selectedApp) toggleApp(selectedApp.id);
        }}
      />
    </main>
  );
}
