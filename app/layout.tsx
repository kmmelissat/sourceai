import type { Metadata } from "next";
import { Rubik, Gabarito } from "next/font/google";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
const socialImage = `${siteUrl}/sourceAI.jpg`;
const title = "SourceAI - La IA que entiende tu código, documentación y procesos";
const description =
  "Conecta GitHub, Slack, Notion y tus documentos para encontrar respuestas sobre cómo funciona tu empresa en segundos. Pensado para startups y equipos técnicos.";

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
  metadataBase: new URL(siteUrl),
  title,
  description,
  icons: {
    icon: "/sourceai-icon.svg",
    apple: "/sourceai-icon.svg",
  },
  openGraph: {
    title,
    description,
    url: siteUrl,
    siteName: "SourceAI",
    type: "website",
    images: [
      {
        url: socialImage,
        width: 3840,
        height: 2160,
        alt: "SourceAI",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [socialImage],
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
