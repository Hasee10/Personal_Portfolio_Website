/* Monochrome brand marks (Simple Icons, CC0) rendered through a CSS mask so
 * each icon tints to whatever palette colour its pill uses — no multicoloured
 * logo soup on the dark theme. SVGs live in /public/icons.
 * Names with no available mark (OpenAI, Groq, VAPI, …) return null and the
 * pill stays text-only.
 */

const ICON_SLUGS: Record<string, string> = {
  // LLM / AI
  'Gemini API':   'googlegemini',
  Gemini:         'googlegemini',
  Mistral:        'mistralai',
  LangChain:      'langchain',
  LangGraph:      'langgraph',
  HuggingFace:    'huggingface',
  ElevenLabs:     'elevenlabs',
  LiveKit:        'livekit',
  // Infra / backend
  n8n:            'n8n',
  FastAPI:        'fastapi',
  'FastAPI Agents': 'fastapi',
  Flask:          'flask',
  Python:         'python',
  'Node.js':      'nodedotjs',
  PostgreSQL:     'postgresql',
  Redis:          'redis',
  Docker:         'docker',
  GCP:            'googlecloud',
  Supabase:       'supabase',
  Scrapy:         'scrapy',
  // Frontend
  React:          'react',
  'React-PDF':    'react',
  'Next.js':      'nextdotjs',
  TypeScript:     'typescript',
  'Tailwind CSS': 'tailwindcss',
  'Framer Motion': 'framer',
}

export default function StackIcon({
  name,
  color,
  size = 12,
}: {
  name: string
  color: string
  size?: number
}) {
  const slug = ICON_SLUGS[name]
  if (!slug) return null

  const mask = `url(/icons/${slug}.svg)`
  return (
    <span
      aria-hidden="true"
      style={{
        display: 'inline-block',
        width: size,
        height: size,
        backgroundColor: color,
        WebkitMaskImage: mask,
        maskImage: mask,
        WebkitMaskSize: 'contain',
        maskSize: 'contain',
        WebkitMaskRepeat: 'no-repeat',
        maskRepeat: 'no-repeat',
        WebkitMaskPosition: 'center',
        maskPosition: 'center',
        flexShrink: 0,
      }}
    />
  )
}
