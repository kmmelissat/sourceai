import { NextResponse } from "next/server";

const CHAT_WEBHOOK_URL = process.env.CHAT_WEBHOOK_URL;
const CHAT_REQUEST_TIMEOUT_MS = 15000;

type ChatRequestBody = {
  message?: unknown;
  sessionId?: unknown;
};

function getString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

async function safeJson<T>(response: Response) {
  try {
    return (await response.json()) as T;
  } catch {
    return null;
  }
}

export async function POST(req: Request) {
  if (!CHAT_WEBHOOK_URL) {
    return NextResponse.json(
      { output: "Falta configurar CHAT_WEBHOOK_URL en el servidor." },
      { status: 500 },
    );
  }

  try {
    const body = (await req.json()) as ChatRequestBody;
    const message = getString(body.message);
    const sessionId = getString(body.sessionId);

    if (!message || !sessionId) {
      return NextResponse.json(
        { output: "Faltan datos para procesar el mensaje." },
        { status: 400 },
      );
    }

    const webhookRes = await fetch(CHAT_WEBHOOK_URL, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      signal: AbortSignal.timeout(CHAT_REQUEST_TIMEOUT_MS),
      body: JSON.stringify({
        message,
        sessionId,
      }),
    });

    if (!webhookRes.ok) {
      const errorPayload = await safeJson<{ output?: string }>(webhookRes);

      return NextResponse.json(
        {
          output:
            errorPayload?.output?.trim() ||
            "No pude generar una respuesta ahora. Revisa el webhook.",
        },
        { status: 502 },
      );
    }

    const data = await safeJson<{ output?: string }>(webhookRes);

    return NextResponse.json({
      output:
        data?.output?.trim() ||
        "Respuesta vacía desde el chatbot. Intenta de nuevo con otra pregunta.",
    });
  } catch {
    return NextResponse.json(
      { output: "Error inesperado en /api/chat." },
      { status: 500 },
    );
  }
}
