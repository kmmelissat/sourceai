"use client";

import { useState } from "react";
import {
  Github,
  Slack,
  FileText,
  HardDrive,
  BookMarked,
  Database,
} from "lucide-react";

const integrations = [
  { name: "GitHub", icon: Github },
  { name: "Slack", icon: Slack },
  { name: "Notion", icon: FileText },
  { name: "Google Drive", icon: HardDrive },
  { name: "Confluence", icon: BookMarked },
  { name: "Linear", icon: Database },
];

export function Integraciones() {
  const [hoveredTool, setHoveredTool] = useState<string | null>(null);

  return (
    <section
      id="integraciones"
      className="px-4 py-20 sm:px-6 sm:py-28 lg:px-8"
    >
      <div className="mx-auto max-w-6xl">
        {/* Supabase-style banner: title left, icons right */}
        <div className="flex flex-col items-center gap-10 rounded-2xl border border-border bg-bg-surface/50 px-8 py-14 lg:flex-row lg:justify-between lg:gap-16">
          <div className="text-center lg:text-left">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              <span className="text-text-secondary">Conecta SourceAI con</span>
              <br />
              <span
                className={`min-h-[1.2em] inline-block transition-all duration-300 ${
                  hoveredTool ? "text-primary" : "text-text-primary"
                }`}
              >
                {hoveredTool ?? "cualquier herramienta"}
              </span>
            </h2>
            <p className="mt-3 text-text-muted">
              Donde ya vive el conocimiento de tu equipo.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8">
            {integrations.map(({ name, icon: Icon }) => (
              <div
                key={name}
                className="group flex h-14 w-14 cursor-default items-center justify-center rounded-xl text-text-muted transition-all duration-300 hover:scale-110 sm:h-16 sm:w-16"
                title={name}
                onMouseEnter={() => setHoveredTool(name)}
                onMouseLeave={() => setHoveredTool(null)}
              >
                <Icon
                  className="h-8 w-8 transition-all duration-300 group-hover:text-primary group-hover:drop-shadow-[0_0_20px_rgba(230,255,75,0.6)] sm:h-9 sm:w-9"
                  strokeWidth={1.5}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
