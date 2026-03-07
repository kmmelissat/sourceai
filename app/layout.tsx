import type { Metadata } from "next";
import { Rubik, Gabarito } from "next/font/google";
import "./globals.css";

const rubik = Rubik({
  variable: "--font-rubik",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
});

const gabarito = Gabarito({
  variable: "--font-gabarito",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "SourceAI - La IA que entiende tu código, documentación y procesos",
  description:
    "Conecta GitHub, Slack, Notion y tus documentos para encontrar respuestas sobre cómo funciona tu empresa en segundos. Pensado para startups y equipos técnicos.",
  icons: {
    icon: "/sourceai-icon.svg",
    apple: "/sourceai-icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${rubik.variable} ${gabarito.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
