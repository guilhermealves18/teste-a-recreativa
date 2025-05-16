import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "Nenhum arquivo enviado." }, { status: 400 });
    }

    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    const backendResponse = await fetch(`${backendUrl}/lesson-plan/upload`, {
      method: "POST",
      body: formData,
    });

    if (!backendResponse.ok) {
      return NextResponse.json(
        { error: "Falha ao enviar o arquivo para o backend." },
        { status: backendResponse.status }
      );
    }

    return NextResponse.json({ message: "Arquivo enviado com sucesso!" });
  } catch (error) {
    console.error("Erro na rota de upload:", error);
    return NextResponse.json({ error: "Erro interno do servidor." }, { status: 500 });
  }
}