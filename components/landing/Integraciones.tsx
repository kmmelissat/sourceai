"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import {
  Github,
  Slack,
  FileText,
  HardDrive,
  BookMarked,
  Database,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const integrations = [
  { name: "GitHub", icon: Github },
  { name: "Slack", icon: Slack },
  { name: "Notion", icon: FileText },
  { name: "Google Drive", icon: HardDrive },
  { name: "Confluence", icon: BookMarked },
  { name: "Linear", icon: Database },
];

const FADE_DURATION_MS = 220;

export function Integraciones() {
  const [hoveredTool, setHoveredTool] = useState<string | null>(null);
  const [displayText, setDisplayText] = useState<string>("cualquier herramienta");
  const [isTextTransitioning, setIsTextTransitioning] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const iconsRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleToolHover = useCallback((name: string | null) => {
    const nextText = name ?? "cualquier herramienta";
    if (nextText === displayText) {
      setHoveredTool(name);
      return;
    }
    setHoveredTool(name);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsTextTransitioning(true);
    timeoutRef.current = setTimeout(() => {
      setDisplayText(nextText);
      setIsTextTransitioning(false);
      timeoutRef.current = null;
    }, FADE_DURATION_MS);
  }, [displayText]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
      gsap.fromTo(
        iconsRef.current?.children || [],
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none none",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="integraciones"
      className="px-4 py-20 sm:px-6 sm:py-28 lg:px-8"
    >
      <div className="mx-auto max-w-6xl">
        {/* Supabase-style banner: title left, icons right */}
        <div className="flex flex-col items-center gap-10 rounded-2xl border border-border bg-bg-surface/50 px-8 py-14 lg:flex-row lg:justify-between lg:gap-16">
          <div ref={titleRef} className="text-center lg:text-left">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              <span className="text-text-secondary">Conecta SourceAI con</span>
              <br />
              <span
                className={`min-h-[1.2em] inline-block ease-out ${
                  hoveredTool ? "text-primary" : "text-text-primary"
                }`}
                style={{
                  opacity: isTextTransitioning ? 0 : 1,
                  transitionProperty: "opacity, color",
                  transitionDuration: `${FADE_DURATION_MS}ms, 300ms`,
                }}
              >
                {displayText}
              </span>
            </h2>
            <p className="mt-3 text-text-muted">
              Donde ya vive el conocimiento de tu equipo.
            </p>
          </div>

          <div
            ref={iconsRef}
            className="flex flex-wrap items-center justify-center gap-6 sm:gap-8"
          >
            {integrations.map(({ name, icon: Icon }) => (
              <div
                key={name}
                className="group flex h-14 w-14 cursor-default items-center justify-center rounded-xl text-text-muted transition-all duration-300 hover:scale-110 sm:h-16 sm:w-16"
                title={name}
                onMouseEnter={() => handleToolHover(name)}
                onMouseLeave={() => handleToolHover(null)}
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
