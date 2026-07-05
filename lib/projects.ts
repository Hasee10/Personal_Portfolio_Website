/* Single source of truth for project data — used by the /projects grid and
 * the /projects/[slug] detail pages.
 *
 * Link policy: `github` holds a REAL repository URL or null. Closed-source
 * and client work states so explicitly via `source` — no silent profile links.
 * Detail copy (overview/highlights) only restates facts already published on
 * the site — no invented stats.
 */

export type Status   = 'PRODUCTION' | 'RESEARCH' | 'OPEN SOURCE' | 'INTERNAL'
export type Visual   = 'waveform' | 'document' | 'spider' | 'benchmark' | 'funnel' | 'rag' | 'pathfinding' | 'agents'
export type Template = 'featured' | 'standard' | 'strip'

export interface Project {
  slug:     string
  number:   string
  name:     string
  status:   Status
  desc:     string
  tags:     string[]
  impact:   string
  github:   string | null
  source?:  string
  live?:    string
  visual:   Visual
  template: Template
  overview:   string[]   // detail page paragraphs
  highlights: string[]   // detail page bullets
}

export const PROJECTS: Project[] = [
  {
    slug: 'visa2land',
    number: '01', name: 'Visa2Land', status: 'PRODUCTION',
    desc:   'Voice AI platform for Australian visa eligibility. Live with a real migration agency client — handles full eligibility logic across subclasses in real-time.',
    tags:   ['VAPI', 'n8n', 'FastAPI', 'React', 'Voice AI'],
    impact: 'Live client',
    github: null, source: 'Private · client work',
    visual: 'waveform', template: 'featured',
    overview: [
      'Visa2Land is a voice AI platform built for a real Australian migration agency. Callers speak to an AI agent that walks them through visa eligibility in real time — the agent carries the full eligibility logic across visa subclasses, asks the qualifying questions a human consultant would, and routes qualified leads onward.',
      'The system is live in production with the client. VAPI carries the voice conversation, n8n orchestrates the qualification workflow, and a FastAPI backend serves the eligibility logic behind a React front end.',
    ],
    highlights: [
      'Live in production with a real migration agency client',
      'Full eligibility logic across Australian visa subclasses, evaluated in real time during the call',
      'VAPI voice transport orchestrated through n8n workflows',
      'FastAPI backend with a React front end',
    ],
  },
  {
    slug: 'scopeforge',
    number: '02', name: 'ScopeForge', status: 'PRODUCTION',
    desc:   'Two-pass LLM pipeline generating client-ready SOWs with scoring, diagrams, and psychology-driven rewrites. Cuts proposal time from days to under 3 minutes.',
    tags:   ['Gemini', 'Groq', 'Mistral', 'React-PDF'],
    impact: '2-pass pipeline',
    github: null, source: 'Private · client work',
    visual: 'document', template: 'standard',
    overview: [
      'ScopeForge turns a rough project brief into a client-ready statement of work. A two-pass LLM pipeline first drafts the SOW, then scores and rewrites it — applying document structure, diagrams, and psychology-driven phrasing before export.',
      'What used to take days of proposal writing now takes under three minutes. The pipeline runs across multiple model providers — Gemini, Groq, and Mistral — and exports polished PDFs via React-PDF.',
    ],
    highlights: [
      'Two-pass generate-then-refine LLM pipeline with scoring',
      'Cuts SOW turnaround from days to under 3 minutes',
      'Multi-provider inference: Gemini, Groq, and Mistral',
      'Client-ready PDF export with diagrams via React-PDF',
    ],
  },
  {
    slug: 'nexusdeals',
    number: '03', name: 'NexusDeals', status: 'PRODUCTION',
    desc:   'Pakistan-focused deal aggregator. 155 sites, 25 Scrapy spiders, Redis caching, live deal feed with sub-second refresh.',
    tags:   ['Next.js', 'FastAPI', 'Supabase', 'Scrapy', 'Redis'],
    impact: '155 sites',
    github: null, source: 'Private · in production',
    visual: 'spider', template: 'standard',
    overview: [
      'NexusDeals aggregates deals across the Pakistani e-commerce landscape. A fleet of 25 purpose-built Scrapy spiders crawls 155 sites, normalises the offers, and feeds a live deal stream.',
      'Redis caching keeps the feed at sub-second refresh, Supabase holds the catalogue, and a Next.js front end serves the stream. Built and run as a production system.',
    ],
    highlights: [
      '155 sites crawled by 25 purpose-built Scrapy spiders',
      'Sub-second feed refresh via Redis caching',
      'FastAPI ingestion layer with Supabase storage',
      'Next.js front end over a live deal stream',
    ],
  },
  {
    slug: 'agent-reliability-auditor',
    number: '04', name: 'Agent Reliability Auditor', status: 'RESEARCH',
    desc:   'Thesis: systematic LLM degradation benchmarking across English, Roman Urdu, and code-switched inputs. 14 models, 3,000+ prompts, 18–34% accuracy drops identified.',
    tags:   ['Python', 'HuggingFace', 'LangChain', 'NLP'],
    impact: '14 models · 3,000+ prompts',
    github: null, source: 'Private · thesis',
    visual: 'benchmark', template: 'standard',
    overview: [
      'My final-year thesis: a systematic framework for measuring how LLM output quality degrades outside clean English. The auditor benchmarks models across English, Roman Urdu, and code-switched inputs under adversarial and noisy conditions.',
      'The evaluation harness tests 14 models across 3,000+ prompts in three language modes, and identified statistically significant accuracy drops of 18–34% on code-switched inputs. The write-up has been submitted as a workshop paper and is under review.',
    ],
    highlights: [
      '14 models benchmarked across 3,000+ prompts',
      'Three language modes: English, Roman Urdu, and code-switched',
      '18–34% accuracy degradation identified on code-switched inputs',
      'Submitted as a workshop paper; currently under review',
    ],
  },
  {
    slug: 'vocalcrm',
    number: '05', name: 'VocalCRM', status: 'PRODUCTION',
    desc:   'Inbound voice AI for real estate lead qualification. Handles screening, objection handling, and CRM push in real-time with no human in the loop.',
    tags:   ['VAPI', 'n8n', 'WebSocket', 'Supabase', 'OpenAI'],
    impact: 'Real-time CRM',
    github: null, source: 'Private · client work',
    visual: 'funnel', template: 'standard',
    overview: [
      'VocalCRM answers inbound calls for real estate lead qualification with no human in the loop. The agent screens callers, handles objections, and qualifies interest in a natural voice conversation.',
      'Qualified leads are pushed to the CRM in real time over WebSocket, with Supabase as the store and VAPI plus n8n running the voice and workflow layers.',
    ],
    highlights: [
      'Fully autonomous inbound call handling — no human in the loop',
      'Screening, objection handling, and qualification in one conversation',
      'Real-time CRM push over WebSocket',
      'OpenAI-powered dialogue with VAPI voice transport',
    ],
  },
  {
    slug: 'nlp-rag-agent',
    number: '06', name: 'NLP-RAG-Agent', status: 'OPEN SOURCE',
    desc:   'Three-stage NLP system: information extraction → FAISS vector retrieval → sentiment-aware LLM response. Deployed and live on Vercel.',
    tags:   ['LangChain', 'FAISS', 'OpenAI', 'Next.js', 'TypeScript'],
    impact: 'Live on Vercel',
    github: 'https://github.com/Hasee10/NLP-RAG-Agent',
    live:   'https://rag-sentiment-seven.vercel.app',
    visual: 'rag', template: 'standard',
    overview: [
      'A three-stage NLP system: information extraction, FAISS vector retrieval, and a sentiment-aware LLM response layer. Extraction structures the input, retrieval grounds it in the vector store, and generation adapts its tone to the detected sentiment.',
      'The system is open source and deployed live on Vercel — both the code and the running instance are linked below.',
    ],
    highlights: [
      'Three-stage pipeline: extract → retrieve → respond',
      'FAISS vector store for grounded retrieval',
      'Sentiment-aware response generation',
      'Open source and live on Vercel',
    ],
  },
  {
    slug: 'ai-voice-agent-livekit',
    number: '07', name: 'AI Voice Agent — LiveKit', status: 'OPEN SOURCE',
    desc:   'Real-time AI voice agent for AutoZone service. Integrates LiveKit transport, Gemini API inference, and a React frontend for sub-200ms round-trip responses.',
    tags:   ['LiveKit', 'Gemini', 'Flask', 'React', 'Voice AI'],
    impact: 'Sub-200ms',
    github: 'https://github.com/Hasee10/AI-Voice-Agent-LiveKit',
    visual: 'waveform', template: 'standard',
    overview: [
      'A real-time voice agent built for an AutoZone service use case. LiveKit carries the audio transport, Gemini handles inference, and a React front end exposes the live session — tuned for sub-200ms round-trip responses.',
      'The project is open source: transport, inference, and UI layers are all in the repository, glued together by a Flask backend.',
    ],
    highlights: [
      'Sub-200ms round-trip voice responses',
      'LiveKit WebRTC transport with Gemini inference',
      'Flask backend, React front end',
      'Open source on GitHub',
    ],
  },
  {
    slug: 'aeronet-lite',
    number: '08', name: 'AeroNet Lite', status: 'OPEN SOURCE',
    desc:   'Autonomous drone delivery simulation with CSP constraint planning, A* multi-hop routing, and real-time fleet replanning under node failures.',
    tags:   ['Python', 'A* Search', 'CSP', 'Simulation'],
    impact: 'Fleet planning',
    github: 'https://github.com/Hasee10/AeroNet_Lite',
    visual: 'pathfinding', template: 'standard',
    overview: [
      'An autonomous drone delivery simulation. CSP constraint planning assigns deliveries to the fleet, A* computes multi-hop routes through the network, and the system replans in real time when nodes fail.',
      'Built in Python as a simulation project — the interesting behaviour is failure recovery: knock out a node mid-run and the fleet reroutes around it without stopping.',
    ],
    highlights: [
      'CSP constraint planning for fleet assignment',
      'A* multi-hop routing across the delivery network',
      'Real-time replanning under node failures',
      'Open source on GitHub',
    ],
  },
  {
    slug: 'langgraph-agents',
    number: '09', name: 'LangGraph Agents', status: 'INTERNAL',
    desc:   'Modular multi-agent orchestration — research, code review, and web-search agents with shared persistent memory across sessions.',
    tags:   ['LangGraph', 'OpenAI', 'Tavily', 'FastAPI'],
    impact: 'Persistent memory',
    github: null, source: 'Private · internal tooling',
    visual: 'agents', template: 'strip',
    overview: [
      'A modular multi-agent orchestration system: research, code-review, and web-search agents that share persistent memory across sessions. Agents hand work to each other through LangGraph’s graph runtime, with Tavily powering the web-search tools.',
      'Built as internal tooling for my own workflow. The shared persistent memory is what makes it useful day to day — agents pick up context from previous sessions instead of starting cold.',
    ],
    highlights: [
      'Research, code-review, and web-search agents on one graph',
      'Shared persistent memory across sessions',
      'Tavily-powered web search tools',
      'FastAPI service layer — internal tooling',
    ],
  },
]

export function getProject(slug: string): Project | undefined {
  return PROJECTS.find(p => p.slug === slug)
}

// ── Shared visual config ──────────────────────────────────────────────────────

export const STATUS_CFG: Record<Status, { color: string; bg: string; dot: boolean }> = {
  PRODUCTION:    { color: '#6FBF84', bg: 'rgba(111,191,132,0.08)',  dot: true  },
  RESEARCH:      { color: '#C9A84C', bg: 'rgba(201,168,76,0.08)',   dot: false },
  'OPEN SOURCE': { color: '#7BA7D9', bg: 'rgba(123,167,217,0.08)',  dot: false },
  INTERNAL:      { color: '#8A9A7E', bg: 'rgba(138,154,126,0.08)',  dot: false },
}

export const TAG_COLORS: Record<string, string> = {
  // LLM / AI
  VAPI: '#9DBE8D', Gemini: '#9DBE8D', Groq: '#9DBE8D', Mistral: '#9DBE8D',
  OpenAI: '#9DBE8D', LangChain: '#9DBE8D', LangGraph: '#9DBE8D',
  HuggingFace: '#9DBE8D', 'Voice AI': '#9DBE8D', LiveKit: '#9DBE8D',
  FAISS: '#9DBE8D',
  // Infra / backend
  n8n: '#7BC4AE', FastAPI: '#7BC4AE', WebSocket: '#7BC4AE', Tavily: '#7BC4AE',
  Flask: '#7BC4AE',
  // Data / algo
  Supabase: '#D9BC6E', Redis: '#D9BC6E', Scrapy: '#D9BC6E',
  Python: '#D9BC6E', NLP: '#D9BC6E', 'A* Search': '#D9BC6E',
  CSP: '#D9BC6E', Simulation: '#D9BC6E',
  // Frontend
  React: '#C08D66', 'Next.js': '#C08D66', 'React-PDF': '#C08D66',
  TypeScript: '#C08D66',
}
