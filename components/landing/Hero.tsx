"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChatMockup } from "./ChatMockup";
import gsap from "gsap";

export function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const trustRef = useRef<HTMLParagraphElement>(null);
  const mockupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        headlineRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 }
      )
        .fromTo(
          subheadRef.current,
          { y: 24, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6 },
          "-=0.4"
        )
        .fromTo(
          ctaRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5 },
          "-=0.3"
        )
        .fromTo(
          trustRef.current,
          { y: 16, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" },
          "-=0.4"
        )
        .fromTo(
          mockupRef.current,
          { y: 60, opacity: 0, scale: 0.96 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1,
            ease: "power3.out",
          },
          "-=1.2"
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden px-4 pt-32 pb-20 sm:px-6 sm:pt-40 sm:pb-28 lg:px-8"
    >
      {/* Subtle gradient background */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />

      <div className="relative mx-auto max-w-6xl">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div className="space-y-8">
            <h1
              ref={headlineRef}
              className="text-4xl font-bold leading-tight tracking-tight text-text-primary sm:text-5xl lg:text-6xl"
            >
              La IA que entiende tu{" "}
              <span className="text-primary">código</span>,{" "}
              <span className="text-primary">documentación</span> y{" "}
              <span className="text-primary">procesos</span>.
            </h1>
            <p
              ref={subheadRef}
              className="max-w-xl text-lg text-text-secondary sm:text-xl"
            >
              Conecta GitHub, Slack, Notion y tus documentos para encontrar
              respuestas sobre cómo funciona tu empresa en segundos.
            </p>

            <div ref={ctaRef} className="flex flex-col gap-4 sm:flex-row sm:gap-6">
              <Button size="lg" className="text-base" asChild>
                <Link href="#precios">Ver precios</Link>
              </Button>
              <Button size="lg" variant="outline" className="text-base" asChild>
                <Link href="#contacto">Solicitar acceso temprano</Link>
              </Button>
            </div>

            <p
              ref={trustRef}
              className="text-sm text-text-muted"
            >
              Para startups y equipos técnicos que buscan respuestas sin perder tiempo.
            </p>
          </div>

          <div ref={mockupRef} className="relative">
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
