export const META = {
  name:     'Haseeb Arshad',
  role:     'Agentic AI / LLM Engineer',
  tagline:  'I build AI systems that ship.',
  bio:      'AI Engineer from Islamabad, Pakistan. I build agentic systems, voice AI, and LLM-powered tools. Finishing my BS in Data Science at FAST-NUCES while shipping products and solving real-world problems.',
  email:    'ihaseebarshad10@gmail.com',
  linkedin: 'https://www.linkedin.com/in/haseeb-arshad-09881b347/',
  github:   'https://github.com/Hasee10',
  resume:   'https://drive.google.com/file/d/1wiQ0FovDijWrjyYxRuv1UhAqHsVBoZct/view?usp=sharing',
}

export const STATS: Array<{ value: number; label: string; suffix: string }> = [
  { value: 3,   label: 'AI products shipped',    suffix: '+' },
  { value: 500, label: 'LinkedIn connections',   suffix: '+' },
  { value: 3,   label: 'years building',         suffix: ''  },
]

export const SKILLS: Array<{ category: string; items: string[] }> = [
  {
    category: 'LLM Stack',
    items: ['OpenAI', 'Gemini 2.5 Flash', 'Groq', 'Mistral', 'LangGraph', 'FAISS', 'RAG'],
  },
  {
    category: 'Agentic Infra',
    items: ['n8n', 'VAPI', 'LangGraph', 'FastAPI Agents', 'WebSocket Automation'],
  },
  {
    category: 'Backend',
    items: ['FastAPI', 'Node.js', 'Supabase', 'PostgreSQL', 'Redis', 'Scrapy'],
  },
  {
    category: 'Frontend',
    items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
  },
]

export const PROJECTS: Array<{
  name: string
  description: string
  detail: string
  tags: string[]
  live: string
  github: string
}> = [
  {
    name:        'Visa2Land',
    description: 'Voice AI platform for Australian visa eligibility. Real migration agency client, live in production.',
    detail:      'Built with VAPI for voice, n8n for workflow automation, FastAPI backend, React frontend. Handles eligibility logic across multiple visa subclasses.',
    tags:        ['VAPI', 'n8n', 'FastAPI', 'React', 'Voice AI'],
    live:        'https://github.com/Hasee10',
    github:      'https://github.com/Hasee10',
  },
  {
    name:        'ScopeForge',
    description: 'AI proposal generator with a two-pass LLM pipeline. Outputs client-ready SOWs with scoring and diagrams.',
    detail:      'Gemini 2.5 Flash as primary, Groq/Llama 3.3 70B as fallback, Mistral for legal clauses. PAS/Challenger sales frameworks baked into the rewrite pass.',
    tags:        ['Gemini', 'Groq', 'Mistral', 'React-PDF', 'LangChain'],
    live:        'https://github.com/Hasee10',
    github:      'https://github.com/Hasee10',
  },
  {
    name:        'NexusDeals',
    description: 'Pakistan-focused deal aggregator. 155 sites, 25 spiders, Redis caching, live deal feed.',
    detail:      'Next.js frontend, FastAPI backend, Supabase + PostgreSQL storage, Scrapy for crawling. Deal image pipeline with 6-step fallback and Supabase Storage rehosting.',
    tags:        ['Next.js', 'FastAPI', 'Supabase', 'Scrapy', 'Redis'],
    live:        'https://github.com/Hasee10',
    github:      'https://github.com/Hasee10',
  },
]

export const TIMELINE: Array<{
  year: string
  title: string
  org: string
  description: string
}> = [
  {
    year:        '2023 – 2026',
    title:       'BS Data Science',
    org:         'FAST-NUCES Islamabad',
    description: 'Thesis: Agent Reliability Auditor — benchmarking LLM degradation across English, Roman Urdu, and code-switched inputs.',
  },
  {
    year:        '2024 – Present',
    title:       'AI Systems Builder',
    org:         'Independent / Freelance',
    description: 'Built and shipped Visa2Land, ScopeForge, and NexusDeals. Voice AI, agentic pipelines, RAG systems, automation.',
  },
]
