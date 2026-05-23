import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import { estimateRequestCents } from '@/lib/cost';

export const runtime = 'nodejs';
export const maxDuration = 60;

const MODEL = 'claude-haiku-4-5-20251001';
const WEB_SEARCH_COST_CENTS = 1; // $0.01 per search, conservative estimate
const MAX_SEARCHES = 3;

const SYSTEM_PROMPT = `Você é um buscador de informações nutricionais de produtos brasileiros para um app de contagem de proteína.

Receberá um código de barras OU um nome de produto. Use a ferramenta web_search para identificar o produto e encontrar sua tabela nutricional.

PRIMEIRO: identifique o tipo de produto. Se NÃO for um alimento ou bebida consumível por humanos (ex: produto de limpeza, cosmético, eletrônico, livro, medicamento, ração animal, suplemento que não é alimento), responda:
{ "errorKind": "not_food", "identifiedAs": "descrição curta do que é o produto" }

Se for alimento/bebida, responda EXCLUSIVAMENTE com JSON no formato:
{
  "name": "Nome do produto em português",
  "brand": "Marca (opcional)",
  "category": "Categoria (ex: Industrializado, Bebidas, Snacks)",
  "proteinPer100g": número,
  "caloriesPer100g": número,
  "carbsPer100g": número opcional,
  "fatPer100g": número opcional,
  "servingGrams": número opcional (porção típica em gramas),
  "confidence": "alta" | "média" | "baixa",
  "note": "observação curta opcional sobre fontes ou incertezas"
}

Se for um alimento mas você não conseguir encontrar a tabela nutricional após buscar, responda:
{ "errorKind": "not_found", "error": "Não foi possível encontrar a tabela nutricional desse produto." }

Regras:
- Use valores POR 100 g (não por porção). Se a tabela do produto for por porção, converta.
- Para bebidas, use por 100 ml (assumindo 1 ml ≈ 1 g).
- Prefira o site oficial da marca ou Anvisa/sites confiáveis. Evite blogs.
- NUNCA escreva texto fora do JSON.`;

export async function POST(req: NextRequest) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: 'API do Claude não configurada.' },
      { status: 503 }
    );
  }

  let payload: { code?: string; name?: string };
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ error: 'Corpo inválido.' }, { status: 400 });
  }

  const userMessage = payload.code
    ? `Busque a tabela nutricional do produto com código de barras ${payload.code}. Procure também por variações do código sem o dígito verificador.`
    : payload.name
      ? `Busque a tabela nutricional do produto: "${payload.name}"`
      : null;

  if (!userMessage) {
    return NextResponse.json({ error: 'Informe code ou name.' }, { status: 400 });
  }

  const client = new Anthropic({ apiKey });

  try {
    const response = await client.messages.create({
      model: MODEL,
      max_tokens: 1500,
      system: SYSTEM_PROMPT,
      tools: [
        {
          type: 'web_search_20260209',
          name: 'web_search',
          max_uses: MAX_SEARCHES,
          allowed_callers: ['direct'],
        },
      ] as Anthropic.Messages.ToolUnion[],
      messages: [{ role: 'user', content: userMessage }],
    });

    const text = response.content
      .filter((c) => c.type === 'text')
      .map((c) => (c as { text: string }).text)
      .join('');

    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      return NextResponse.json({ error: 'Resposta da IA fora do formato esperado.' }, { status: 502 });
    }

    const parsed = JSON.parse(jsonMatch[0]);

    const usage = response.usage;
    const tokenCents = estimateRequestCents(usage.input_tokens ?? 0, usage.output_tokens ?? 0);
    const searchesUsed = response.usage.server_tool_use?.web_search_requests ?? 0;
    const estimatedCents = tokenCents + searchesUsed * WEB_SEARCH_COST_CENTS;

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

    if (parsed.errorKind === 'not_found' || parsed.error) {
      return NextResponse.json(
        {
          errorKind: 'not_found',
          error: parsed.error || 'Tabela nutricional não localizada.',
          estimatedCents,
        },
        { status: 404 }
      );
    }

    if (typeof parsed.name !== 'string' || typeof parsed.proteinPer100g !== 'number') {
      return NextResponse.json(
        { error: 'Resposta incompleta da IA.', estimatedCents },
        { status: 502 }
      );
    }

    return NextResponse.json({
      ...parsed,
      estimatedCents,
      tokens: { input: usage.input_tokens, output: usage.output_tokens },
      searchesUsed,
    });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : 'Erro ao chamar Claude.';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
