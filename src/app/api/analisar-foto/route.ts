import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import { estimateRequestCents } from '@/lib/cost';

export const runtime = 'nodejs';
export const maxDuration = 30;

const MODEL = 'claude-haiku-4-5-20251001';

const SYSTEM_PROMPT = `Você é um analisador de alimentos brasileiros para um app de contagem de proteína.

A partir de uma foto, identifique o alimento principal.

PRIMEIRO: verifique se a foto contém um alimento ou bebida consumível por humanos. Se NÃO contiver (ex: objeto, animal vivo, cosmético, embalagem fechada de algo não-alimentício, paisagem, pessoa, ração de pet, etc), responda:
{ "errorKind": "not_food", "identifiedAs": "descrição curta do que aparece na foto" }

Se contiver alimento/bebida, responda EXCLUSIVAMENTE com JSON no formato:
{
  "name": "Nome do alimento em português",
  "category": "Categoria (ex: Carnes, Laticínios, Suplementos)",
  "proteinPer100g": número,
  "caloriesPer100g": número,
  "carbsPer100g": número opcional,
  "fatPer100g": número opcional,
  "estimatedServingGrams": número opcional (porção típica em gramas),
  "confidence": "alta" | "média" | "baixa",
  "note": "observação curta opcional sobre incertezas"
}

Regras:
- Use valores médios para o alimento identificado (referências TACO/USDA).
- Se for um produto industrializado e você puder ler a tabela nutricional na foto, use os valores reais.
- Se for alimento mas você não conseguir identificar com clareza, retorne JSON com "confidence": "baixa" e use seu melhor palpite.
- NUNCA escreva texto fora do JSON.`;

export async function POST(req: NextRequest) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: 'API do Claude não configurada. Adicione ANTHROPIC_API_KEY nas variáveis de ambiente.' },
      { status: 503 }
    );
  }

  let imageBase64: string;
  try {
    const body = await req.json();
    imageBase64 = body.imageBase64;
    if (!imageBase64 || typeof imageBase64 !== 'string') throw new Error('imageBase64 ausente');
  } catch {
    return NextResponse.json({ error: 'Corpo da requisição inválido.' }, { status: 400 });
  }

  const match = imageBase64.match(/^data:(image\/[^;]+);base64,(.+)$/);
  if (!match) {
    return NextResponse.json({ error: 'Formato de imagem inválido.' }, { status: 400 });
  }
  const mediaType = match[1] as 'image/png' | 'image/jpeg' | 'image/webp' | 'image/gif';
  const rawBase64 = match[2];

  const client = new Anthropic({ apiKey });

  try {
    const response = await client.messages.create({
      model: MODEL,
      max_tokens: 600,
      system: SYSTEM_PROMPT,
      messages: [
        {
          role: 'user',
          content: [
            { type: 'image', source: { type: 'base64', media_type: mediaType, data: rawBase64 } },
            { type: 'text', text: 'Identifique este alimento e devolva o JSON.' },
          ],
        },
      ],
    });

    const text = response.content
      .filter((c) => c.type === 'text')
      .map((c) => (c as { text: string }).text)
      .join('');

    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      return NextResponse.json({ error: 'Resposta da IA não estava em JSON.' }, { status: 502 });
    }
    const parsed = JSON.parse(jsonMatch[0]);

    const usage = response.usage;
    const estimatedCents = estimateRequestCents(
      usage.input_tokens ?? 0,
      usage.output_tokens ?? 0
    );

    if (parsed.errorKind === 'not_food') {
      return NextResponse.json(
        {
          errorKind: 'not_food',
          identifiedAs: parsed.identifiedAs ?? 'item não alimentício',
          estimatedCents,
        },
        { status: 422 }
      );
    }

    if (typeof parsed.name !== 'string' || typeof parsed.proteinPer100g !== 'number') {
      return NextResponse.json({ error: 'Resposta da IA incompleta.', estimatedCents }, { status: 502 });
    }

    return NextResponse.json({
      ...parsed,
      estimatedCents,
      tokens: { input: usage.input_tokens, output: usage.output_tokens },
    });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : 'Erro ao chamar Claude.';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
