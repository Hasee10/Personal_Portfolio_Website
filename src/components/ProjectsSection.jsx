import React, { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  Activity,
  ArrowRight,
  Bot,
  BrainCircuit,
  Calculator,
  Eye,
  ExternalLink,
  FileCode2,
  Github,
  Image as ImageIcon,
  LineChart,
  Mic,
  PhoneCall,
  Waypoints,
  Workflow,
} from 'lucide-react';
import { GlowingEffect } from '@/components/ui/glowing-effect';

const FILTERS = [
  { label: 'All', value: 'all' },
  { label: 'Machine Learning', value: 'machine-learning' },
  { label: 'AI Agents', value: 'ai-agents' },
  { label: 'Computer Vision', value: 'computer-vision' },
  { label: 'Web Dev', value: 'web-dev' },
];

const iconMap = {
  eye: Eye,
  calculator: Calculator,
  image: ImageIcon,
  activity: Activity,
  bot: Bot,
  'brain-circuit': BrainCircuit,
  'line-chart': LineChart,
  'phone-call': PhoneCall,
  waypoints: Waypoints,
  workflow: Workflow,
  mic: Mic,
  'file-code': FileCode2,
};

export const projectsData = [
  {
    title: 'AI Virtual Mouse App',
    description:
      'Advanced AI-powered solution for disabled elderly. Real-time mouse movement and click detection using computer vision.',
    category: 'computer-vision',
    tags: ['AI', 'MagicPipe', 'Machine Learning', 'Python', 'OpenCV'],
    icon: 'eye',
    gradient: 'linear-gradient(135deg, #1e1b4b, #312e81)',
    github: '#',
    demo: null,
  },
  {
    title: 'Mathematics AI Assistant',
    description:
      'Ollama-based AI agent for complex calculus. Contextual memory, intelligent host management, and Llama 3.1 text analysis.',
    category: 'ai-agents',
    tags: ['Ollama', 'LangChain', 'GROQ', 'Python'],
    icon: 'calculator',
    gradient: 'linear-gradient(135deg, #1a1a2e, #16213e)',
    github: '#',
    demo: null,
  },
  {
    title: 'Image Chatbot',
    description:
      'ML model detecting edges and elements inside images. Random Forest + Extra Trees with MultiOutputRegressor and PCA.',
    category: 'machine-learning',
    tags: ['Machine Learning', 'Python', 'scikit-learn', 'MongoDB'],
    icon: 'image',
    gradient: 'linear-gradient(135deg, #0f172a, #1e293b)',
    github: '#',
    demo: null,
  },
  {
    title: 'Streamlit Integrational Operations',
    description:
      'TensorFlow and OpenCV automation prospect designed to keep systems running efficiently in an automated manner.',
    category: 'machine-learning',
    tags: ['Python', 'OpenCV', 'Numpy', 'Matplotlib', 'TensorFlow'],
    icon: 'activity',
    gradient: 'linear-gradient(135deg, #14103a, #1d1560)',
    github: '#',
    demo: null,
  },
  {
    title: 'Mathematics Solver Agent',
    description:
      'Autonomous AI agent solving complex mathematics problems step-by-step using reasoning chains and tool use.',
    category: 'ai-agents',
    tags: ['LangChain', 'CrewAI', 'Python', 'LLM'],
    icon: 'bot',
    gradient: 'linear-gradient(135deg, #1e0a3c, #3b0764)',
    github: '#',
    demo: null,
  },
  {
    title: 'NLP Sentiment Pipeline',
    description:
      'End-to-end NLP pipeline for real-time sentiment classification with MLflow tracking and CI/CD deployment.',
    category: 'machine-learning',
    tags: ['Python', 'NLP', 'MLflow', 'Docker', 'FastAPI'],
    icon: 'brain-circuit',
    gradient: 'linear-gradient(135deg, #0a1628, #0f2545)',
    github: '#',
    demo: null,
  },
  {
    title: 'QuantEdge Finance',
    description:
      'Financial modeling repository evaluating earnings per share impact for mergers and acquisitions to identify accretive or dilutive transaction outcomes.',
    category: 'web-dev',
    tags: ['TypeScript', 'Finance', 'Modeling', 'M&A'],
    icon: 'line-chart',
    gradient: 'linear-gradient(135deg, #14213d, #1d3557)',
    github: '#',
    demo: null,
  },
  {
    title: 'Retell-GHL',
    description:
      'Automated voice AI integration connecting Retell with GoHighLevel to streamline lead capture and appointment scheduling for immigration law firms.',
    category: 'ai-agents',
    tags: ['Retell', 'GoHighLevel', 'Voice AI', 'Automation'],
    icon: 'phone-call',
    gradient: 'linear-gradient(135deg, #25113d, #4c1d95)',
    github: '#',
    demo: null,
  },
  {
    title: 'n8n SaaS Lead Router',
    description:
      'Lead qualification workflow that segments users by email domain and routes VIP or standard traffic to Discord through webhooks.',
    category: 'web-dev',
    tags: ['n8n', 'SaaS', 'Discord', 'Webhooks'],
    icon: 'waypoints',
    gradient: 'linear-gradient(135deg, #102a43, #243b53)',
    github: '#',
    demo: null,
  },
  {
    title: 'n8n LiveKit Composition',
    description:
      'Automated voice agent system for real estate appointment management with conversational AI, calendar tooling, and backend orchestration.',
    category: 'ai-agents',
    tags: ['n8n', 'LiveKit', 'Voice AI', 'Automation'],
    icon: 'workflow',
    gradient: 'linear-gradient(135deg, #0f1c2e, #1f3b5b)',
    github: '#',
    demo: null,
  },
  {
    title: 'n8n Script Generation',
    description:
      'Workflow-backed content pipeline with PostgreSQL storage that generates scripts for YouTube or TikTok and pushes them into downstream automations.',
    category: 'web-dev',
    tags: ['n8n', 'PostgreSQL', 'Automation', 'Content Ops'],
    icon: 'file-code',
    gradient: 'linear-gradient(135deg, #1f1235, #341948)',
    github: '#',
    demo: null,
  },
  {
    title: 'AI Voice Agent LiveKit',
    description:
      'AutoZone-focused live voice agent using LiveKit, Gemini Multimodal API, Flask, and React for natural voice interaction and appointment booking.',
    category: 'ai-agents',
    tags: ['LiveKit', 'Gemini', 'Flask', 'Voice AI'],
    icon: 'mic',
    gradient: 'linear-gradient(135deg, #231942, #5e548e)',
    github: '#',
    demo: null,
  },
];

const INITIAL_VISIBLE = 6;

function ProjectCard({ project, index }) {
  const Icon = iconMap[project.icon] || Bot;

  return (
    <motion.article
      layout
      data-category={project.category}
      className="project-card-shell group"
      style={{ '--project-gradient': project.gradient }}
      initial={{ opacity: 0, scale: 0.94, y: 24 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.92, y: 18 }}
      transition={{ duration: 0.35, delay: index * 0.04, ease: [0.22, 1, 0.36, 1] }}
    >
      <GlowingEffect
        spread={40}
        glow={true}
        disabled={false}
        proximity={64}
        inactiveZone={0.01}
        borderWidth={2}
      />
      <div className="project-card">
        <div className="project-banner">
          <div className="project-banner__shine" aria-hidden="true" />
          <div className="project-banner__actions">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="project-icon-button"
              aria-label={`${project.title} GitHub repository`}
            >
              <Github className="h-4 w-4" />
            </a>
            {project.demo ? (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="project-icon-button"
                aria-label={`${project.title} live demo`}
              >
                <ExternalLink className="h-4 w-4" />
              </a>
            ) : null}
          </div>
          <div className="project-banner__icon">
            <Icon strokeWidth={1.8} className="h-12 w-12" />
          </div>
        </div>

        <div className="project-card__body">
          <div className="space-y-4">
            <div className="space-y-3">
              <h3 className="text-[1.25rem] font-semibold tracking-[-0.03em] text-white">
                {project.title}
              </h3>
              <p className="project-card__description text-sm leading-6 text-[#9ca3af]">
                {project.description}
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span key={`${project.title}-${tag}`} className="project-tag">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <a
            href={project.demo || project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="project-link"
          >
            <span>View Project</span>
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </motion.article>
  );
}

const ProjectsSection = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'all') return projectsData;
    return projectsData.filter((project) => project.category === activeFilter);
  }, [activeFilter]);

  const visibleProjects = filteredProjects.slice(0, visibleCount);
  const hasMore = visibleCount < filteredProjects.length;

  useEffect(() => {
    setVisibleCount(INITIAL_VISIBLE);
  }, [activeFilter]);

  return (
    <section id="projects" className="scroll-section relative overflow-hidden bg-background py-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(124,58,237,0.14),_transparent_36%),radial-gradient(circle_at_80%_20%,_rgba(236,72,153,0.12),_transparent_28%)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mb-12 max-w-3xl text-center"
        >
          <h2 className="mb-4 text-3xl font-bold md:text-5xl">
            <span className="bg-gradient-to-r from-[#7c3aed] via-[#8b5cf6] to-[#ec4899] bg-clip-text text-transparent">
              Latest Projects
            </span>
          </h2>
          <p className="text-base leading-7 text-[#9ca3af] md:text-lg">
            A curated showcase of AI systems, applied machine learning, computer vision, and automation work designed with a more product-grade presentation.
          </p>
        </motion.div>

        <div className="mb-10 flex flex-wrap items-center justify-center gap-3">
          {FILTERS.map((filter) => {
            const isActive = activeFilter === filter.value;

            return (
              <button
                key={filter.value}
                type="button"
                onClick={() => setActiveFilter(filter.value)}
                className={`filter-pill ${isActive ? 'filter-pill--active' : ''}`}
                aria-pressed={isActive}
              >
                {filter.label}
              </button>
            );
          })}
        </div>

        <motion.div layout className="projects-grid">
          <AnimatePresence mode="popLayout">
            {visibleProjects.map((project, index) => (
              <ProjectCard key={project.title} project={project} index={index} />
            ))}
          </AnimatePresence>
        </motion.div>

        {hasMore ? (
          <div className="mt-12 flex justify-center">
            <button
              type="button"
              onClick={() => setVisibleCount((count) => count + INITIAL_VISIBLE)}
              className="load-more-button"
            >
              Load More
            </button>
          </div>
        ) : null}
      </div>
    </section>
  );
};

export default ProjectsSection;
