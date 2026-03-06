import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-bg-base/40 backdrop-blur-2xl backdrop-saturate-150">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/sourceai-logo.svg"
            alt="SourceAI"
            width={180}
            height={56}
            priority
            className="h-10 w-auto sm:h-12"
          />
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          <Link
            href="#producto"
            className="text-sm text-text-secondary hover:text-primary transition-colors"
          >
            Producto
          </Link>
          <Link
            href="#integraciones"
            className="text-sm text-text-secondary hover:text-primary transition-colors"
          >
            Integraciones
          </Link>
          <Link
            href="#precios"
            className="text-sm text-text-secondary hover:text-primary transition-colors"
          >
            Precios
          </Link>
          <Link
            href="#contacto"
            className="text-sm text-text-secondary hover:text-primary transition-colors"
          >
            Contacto
          </Link>
        </nav>
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" asChild>
            <Link href="#precios">Ver precios</Link>
          </Button>
          <Button size="sm" asChild>
            <Link href="#contacto">Solicitar acceso</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
