import Link from "next/link";
import { Button } from "@/components/ui/button";

type Props = {
  title: string;
  description?: string;
};

export function ChatSectionPlaceholder({ title, description }: Props) {
  return (
    <main className="flex min-w-0 flex-1 flex-col items-center justify-center p-8">
      <div className="max-w-md text-center">
        <h1 className="text-lg font-semibold text-text-primary">{title}</h1>
        <p className="mt-2 text-sm text-text-muted">
          {description ??
            "Esta sección está en construcción. Mientras tanto usa el chat o Apps."}
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Button className="rounded-xl" asChild>
            <Link href="/chat">Ir al chat</Link>
          </Button>
          <Button variant="outline" className="rounded-xl" asChild>
            <Link href="/chat/apps">Apps e integraciones</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
