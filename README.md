# Proteína

Contador pessoal de proteína. PWA (Progressive Web App) feito para uso pessoal no iPhone via Safari → "Adicionar à Tela de Início".

## O que faz

- **Buscar alimento por nome** (offline, tabela TACO brasileira)
- **Escanear código de barras** (via câmera, fonte Open Food Facts gratuita)
- **Tirar foto do alimento** (via Claude API — opcional, paga)
- **Meta diária de proteína** com anel de progresso
- **Histórico** por dia
- **Sugestões** de alimentos com melhor relação proteína/caloria

## Rodar localmente

```bash
npm install
cp .env.example .env.local
# edite .env.local e cole sua ANTHROPIC_API_KEY
npm run dev
```

Acesse http://localhost:3000.

## Deploy

Pensado para Vercel. Conectar o repo do GitHub na Vercel e definir a variável de ambiente `ANTHROPIC_API_KEY`. A pasta `public/` já contém manifest e ícones para PWA.

## Stack

- Next.js 16 (App Router)
- React 19
- Tailwind CSS 4
- `@anthropic-ai/sdk` para análise de foto
- `@zxing/browser` para leitura de código de barras
- localStorage para persistência (cada dispositivo é independente)

## Custos de API

Análises de foto usam **Claude Haiku 4.5** (modelo barato e rápido). Estimativa: ~US$0,003 por foto. O app tem contador local + sugere configurar o spending cap no [console.anthropic.com](https://platform.claude.com).
