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
  { value: 6,   label: 'AI products shipped',    suffix: '+' },
  { value: 500, label: 'LinkedIn connections',   suffix: '+' },
  { value: 3,   label: 'years building',         suffix: ''  },
]

export const SKILLS: Array<{ category: string; items: string[] }> = [
  {
    category: 'LLM Stack',
    items: ['OpenAI', 'Gemini API', 'Groq', 'Mistral', 'LangGraph', 'LangChain', 'FAISS', 'RAG', 'Machine Learning'],
  },
  {
    category: 'Agentic Infra',
    items: ['n8n', 'VAPI', 'ElevenLabs', 'FastAPI Agents', 'WebSocket Automation', 'Agentic Automation'],
  },
  {
    category: 'Backend',
    items: ['Python', 'FastAPI', 'Node.js', 'SQL', 'PostgreSQL', 'Redis', 'Docker', 'GCP', 'REST APIs', 'Supabase', 'Scrapy'],
  },
  {
    category: 'Frontend',
    items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
  },
  {
    category: 'Data & BI',
    items: ['Power BI', 'Tableau', 'Data Analysis', 'Financial Modeling'],
  },
]

export const PROJECTS: Array<{
  name: string
  description: string
  tags: string[]
  live: string
  github: string
  badge?: string
}> = [
  {
    name:        'Visa2Land',
    description: 'Voice AI platform for Australian visa eligibility. Real migration agency client, live in production.',
    tags:        ['VAPI', 'n8n', 'FastAPI', 'React', 'Voice AI'],
    live:        'https://github.com/Hasee10',
    github:      'https://github.com/Hasee10',
    badge:       'Production',
  },
  {
    name:        'ScopeForge',
    description: 'AI proposal generator with a two-pass LLM pipeline. Outputs client-ready SOWs with scoring and diagrams.',
    tags:        ['Gemini', 'Groq', 'Mistral', 'React-PDF', 'LangChain'],
    live:        'https://github.com/Hasee10',
    github:      'https://github.com/Hasee10',
    badge:       'Production',
  },
  {
    name:        'NexusDeals',
    description: 'Pakistan-focused deal aggregator. 155 sites, 25 spiders, Redis caching, live deal feed.',
    tags:        ['Next.js', 'FastAPI', 'Supabase', 'Scrapy', 'Redis'],
    live:        'https://github.com/Hasee10',
    github:      'https://github.com/Hasee10',
    badge:       'Production',
  },
  {
    name:        'Agent Reliability Auditor',
    description: 'Thesis: systematic LLM degradation benchmarking across English, Roman Urdu, and code-switched inputs. 14 models, 3,000+ prompts.',
    tags:        ['Python', 'HuggingFace', 'LangChain', 'NLP', 'Evaluation'],
    live:        'https://github.com/Hasee10',
    github:      'https://github.com/Hasee10',
    badge:       'Research',
  },
  {
    name:        'VocalCRM',
    description: 'Inbound voice AI for real estate lead qualification. Handles screening, objection handling, and CRM push in real-time.',
    tags:        ['VAPI', 'n8n', 'WebSocket', 'Supabase', 'OpenAI'],
    live:        'https://github.com/Hasee10',
    github:      'https://github.com/Hasee10',
    badge:       'Production',
  },
  {
    name:        'LangGraph Agents',
    description: 'Modular multi-agent orchestration system — research, code review, and web-search agents with shared persistent memory.',
    tags:        ['LangGraph', 'OpenAI', 'Tavily', 'FastAPI', 'Streaming'],
    live:        'https://github.com/Hasee10',
    github:      'https://github.com/Hasee10',
    badge:       'Open Source',
  },
]

export const TIMELINE: Array<{
  year: string
  title: string
  org: string
  description: string
  achievements: string[]
  stack: string[]
  current: boolean
  type: 'role' | 'education'
}> = [
  {
    year:        'Oct 2024 — Present',
    title:       'AI Systems Builder',
    org:         'Independent / Freelance',
    description: 'Building production-grade AI products as an independent engineer — voice AI, agentic pipelines, RAG systems, and full-stack automation shipped to real clients across Pakistan and Australia.',
    achievements: [
      'Shipped 6 AI products (Visa2Land, ScopeForge, NexusDeals, VocalCRM, and more) from zero to live',
      'Deployed voice AI agent in production for a real Australian migration agency client',
      'Built LLM proposal pipeline (ScopeForge) cutting SOW generation from days to under 3 minutes',
    ],
    stack:   ['VAPI', 'LangGraph', 'OpenAI', 'FastAPI', 'n8n', 'Supabase', 'React'],
    current: true,
    type:    'role',
  },
  {
    year:        'Feb 2025 — Present',
    title:       'Undergraduate Researcher',
    org:         'FAST-NUCES Islamabad',
    description: 'Thesis project: Agent Reliability Auditor — a systematic framework for benchmarking LLM output degradation across English, Roman Urdu, and code-switched inputs under adversarial and noisy conditions.',
    achievements: [
      'Designed evaluation harness testing 14 models across 3,000+ prompts in 3 language modes',
      'Identified statistically significant performance drops of 18–34% on code-switched inputs',
      'Research writeup submitted as a workshop paper; currently under review',
    ],
    stack:   ['Python', 'HuggingFace', 'LangChain', 'Pandas', 'Matplotlib', 'NLTK'],
    current: true,
    type:    'role',
  },
  {
    year:        'Oct 2023 — Jun 2026',
    title:       'BS Data Science',
    org:         'FAST-NUCES Islamabad',
    description: 'Core coursework in machine learning, data engineering, NLP, algorithms, and statistical modelling. Applied ML track with emphasis on LLMs, real-world deployment, and AI systems engineering.',
    achievements: [
      'Led a 4-person team delivering a full-stack e-commerce data pipeline as a semester project',
      'Relevant coursework: ML, Deep Learning, NLP, Data Engineering, Algorithms, Probability',
      'Final-year thesis in LLM reliability engineering — bridging academia and production AI',
    ],
    stack:   ['Python', 'TensorFlow', 'Scikit-learn', 'SQL', 'R', 'Spark'],
    current: false,
    type:    'education',
  },
]
