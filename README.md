# DeafSpace Floor Plan Analyzer

An AI-assisted design review tool that evaluates architectural floor plans against **DeafSpace** principles — the spatial design framework developed at [Gallaudet University](https://www.gallaudet.edu/) for environments that support Deaf visual communication, signing mobility, and sensory-inclusive use.

Upload a floor plan (image or PDF, up to **4 MB**) and receive a structured report across **10 design parameters**, each with observations, scores, and actionable recommendations.

## Why use this tool

Architects and planners often lack fast, structured feedback on Deaf-accessible spatial design before detailed review cycles. This analyzer helps you:

- **Screen early designs** for sightlines, corridor width, blind corners, seating layout, and visual connectivity
- **Prioritize fixes** with an overall score, per-parameter ratings, and a single top-priority recommendation
- **Communicate intent** to clients and stakeholders with a consistent, evidence-based DeafSpace checklist
- **Support inclusive practice** alongside code compliance — addressing how Deaf and hard-of-hearing users actually move, gather, and communicate in space

The tool does not replace professional accessibility review or licensed architectural judgment. It accelerates awareness and dialogue around DeafSpace criteria at the concept and schematic stages.

## How it works

1. Upload a floor plan (JPG, PNG, WEBP, or PDF, up to 4 MB)
2. The app sends the plan for vision-based analysis
3. Results appear on a report page with:
   - Building summary and overall score (1–10)
   - Top priority fix
   - Ten parameter cards: observation, recommendation, priority, and score

### Parameters evaluated

| # | Parameter |
|---|-----------|
| 1 | Visual connectivity & sightlines |
| 2 | Corridor width & signing clearance |
| 3 | Blind corner risk |
| 4 | Seating arrangement quality |
| 5 | Transparency & visual openness |
| 6 | Lighting design for visual communication |
| 7 | Gathering space quality |
| 8 | Emergency visual accessibility |
| 9 | Wayfinding & spatial legibility |
| 10 | Acoustic comfort zones |

## Tech stack

- [Next.js](https://nextjs.org/) (App Router) + [Tailwind CSS](https://tailwindcss.com/)
- Vision analysis via Google Gemini (`gemini-2.5-flash`) using [`@google/genai`](https://www.npmjs.com/package/@google/genai)

## Getting started

### Prerequisites

- Node.js 18+
- A free [Google AI Studio](https://aistudio.google.com/app/apikey) API key

### Install and run locally

```bash
git clone https://github.com/TinsaeTadesse17/DeafSpace-Floor-Plan-Analyzer.git
cd DeafSpace-Floor-Plan-Analyzer
npm install
```

Create `.env.local`:

```env
GEMINI_API_KEY=your_key_here
```

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Production build

```bash
npm run build
npm start
```

## Deploy

### Vercel (recommended)

1. Import this repository in [Vercel](https://vercel.com/new)
2. Add environment variable: `GEMINI_API_KEY`
3. Deploy

Or with the CLI:

```bash
npx vercel --prod
```

Set `GEMINI_API_KEY` in the Vercel project settings when prompted or in the dashboard.

## Environment variables

| Variable | Required | Description |
|----------|----------|-------------|
| `GEMINI_API_KEY` | Yes | Google AI Studio API key for floor plan analysis |

## API usage limits (free tier)

- ~10 requests per minute
- ~250 requests per day
- No credit card required for development and demos

For sensitive or proprietary plans, use a paid API key per [Google’s data policies](https://ai.google.dev/gemini-api/docs).

## Limitations

- **Upload size:** Hosted on Vercel, request bodies are capped at ~4.5 MB (this app enforces 4 MB). Local `npm run dev` previously allowed larger files; production uses the stricter limit.
- Assessments are visual/proportional; exact dimensions are not measured from drawings
- Low-resolution or hand-sketched plans may yield weaker results
- Multi-page PDFs: analysis focuses on the first page

## License

See repository license. DeafSpace design principles are attributed to Gallaudet University research and guidelines.

## Contributing

Issues and pull requests are welcome on [GitHub](https://github.com/TinsaeTadesse17/DeafSpace-Floor-Plan-Analyzer).
