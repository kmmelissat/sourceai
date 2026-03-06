import Link from "next/link";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="border-t border-border px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <Link href="/" className="flex items-center">
            <Image
              src="/sourceai-logo.svg"
              alt="SourceAI"
              width={180}
              height={56}
              className="h-10 w-auto opacity-90 hover:opacity-100 transition-opacity sm:h-12"
            />
          </Link>
          <nav className="flex gap-6">
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
        </div>
        <div className="mt-8 text-center sm:text-left">
          <p className="text-sm text-text-muted">
            © {new Date().getFullYear()} SourceAI. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
