import { NextRequest, NextResponse } from "next/server";
import { mockGenerate } from "@/lib/mockGenerate";
import { GenerateRequest } from "@/lib/generatePrompt";

export async function POST(request: NextRequest) {
  try {
    const body: GenerateRequest = await request.json();

    if (!body.input || !body.category || !body.tone) {
      return NextResponse.json(
        { error: "Input, category, and tone are required" },
        { status: 400 }
      );
    }

    // Simulate processing delay
    await new Promise((r) => setTimeout(r, 800));

    const result = mockGenerate(body);

    return NextResponse.json(result, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Maaf, Bale lagi bingung sebentar. Coba lagi ya." },
      { status: 500 }
    );
  }
}
