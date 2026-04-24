import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Zap, Rocket } from 'lucide-react';

const CARDS = [
  {
    num: '01',
    icon: Brain,
    accentColor: '#a78bfa',
    iconBg: 'rgba(124,58,237,0.1)',
    iconBorder: 'rgba(124,58,237,0.18)',
    title: 'AI Engineering Excellence',
    description:
      'Specialised in developing production-grade AI solutions with a focus on practical applications, scalable architectures, and measurable business outcomes.',
    tags: ['LLMs', 'RAG', 'MLflow', 'FastAPI'],
  },
  {
    num: '02',
    icon: Zap,
    accentColor: '#67e8f9',
    iconBg: 'rgba(6,182,212,0.1)',
    iconBorder: 'rgba(6,182,212,0.18)',
    title: 'Rapid Adaptability',
    description:
      'Quick to master new technologies and frameworks. My curiosity-driven approach keeps me at the forefront of a fast-moving landscape — from n8n workflows to agentic pipelines.',
    tags: ['n8n', 'LangChain', 'Automation', 'APIs'],
  },
  {
    num: '03',
    icon: Rocket,
    accentColor: '#f9a8d4',
    iconBg: 'rgba(236,72,153,0.1)',
    iconBorder: 'rgba(236,72,153,0.18)',
    title: 'Innovation Driven',
    description:
      'Consistently pushing boundaries by combining AI with creative problem-solving — from computer vision tools that aid accessibility to multi-agent research pipelines.',
    tags: ['Computer Vision', 'Agents', 'NLP', 'OpenCV'],
  },
];

const ACHIEVEMENTS = [
  { value: '10+', label: 'Projects Shipped' },
  { value: '2×', label: 'Competition Runner-up' },
  { value: '3+', label: 'Internships & Roles' },
  { value: '100%', label: 'Commitment' },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

const WhyMeSection = () => (
  <section id="why-me" className="relative overflow-hidden bg-background py-28">
    <div className="pointer-events-none absolute inset-0">
      <div className="absolute -left-48 top-1/4 h-[480px] w-[480px] rounded-full bg-violet-600/4 blur-[100px]" />
      <div className="absolute -right-48 bottom-1/4 h-[480px] w-[480px] rounded-full bg-pink-600/4 blur-[100px]" />
    </div>

    <div className="relative z-10 mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55 }}
        className="mb-16 text-center"
      >
        <span className="section-eyebrow mx-auto">Why Choose Me</span>
        <h2 className="font-display text-4xl font-bold tracking-tight text-white md:text-5xl">
          What Sets Me Apart
        </h2>
        <p className="mx-auto mt-4 max-w-xl font-sans text-base leading-relaxed text-slate-400 md:text-lg">
          Technical depth, adaptability, and a relentless drive to build things that actually work.
        </p>
      </motion.div>

      {/* Bento cards */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid gap-5 md:grid-cols-3"
      >
        {CARDS.map((card) => {
          const Icon = card.icon;
          return (
            <motion.div key={card.num} variants={cardVariants} className="bento-card group p-8">
              {/* Large number watermark */}
              <div
                className="mb-6 font-display text-[4rem] font-black leading-none tracking-[-0.04em] select-none opacity-[0.07] transition-opacity duration-300 group-hover:opacity-[0.13]"
                style={{ color: card.accentColor }}
              >
                {card.num}
              </div>

              {/* Icon */}
              <div
                className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl"
                style={{ background: card.iconBg, border: `1px solid ${card.iconBorder}` }}
              >
                <Icon className="h-5 w-5" style={{ color: card.accentColor }} strokeWidth={1.8} />
              </div>

              {/* Text */}
              <h3 className="mb-3 font-display text-lg font-bold text-white">{card.title}</h3>
              <p className="font-sans text-sm leading-relaxed text-slate-400">{card.description}</p>

              {/* Tags */}
              <div className="mt-6 flex flex-wrap gap-1.5">
                {card.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md border border-white/[0.07] bg-white/[0.03] px-2.5 py-1 font-sans text-xs font-medium text-slate-400"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Accent line on hover */}
              <div
                className="mt-7 h-px rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{ background: `linear-gradient(90deg, ${card.accentColor}60, transparent)` }}
              />
            </motion.div>
          );
        })}
      </motion.div>

      {/* Achievement strip */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55, delay: 0.25 }}
        className="mt-8 grid grid-cols-2 divide-x divide-y divide-white/[0.04] overflow-hidden rounded-2xl border border-white/[0.05] bg-white/[0.015] md:grid-cols-4 md:divide-y-0"
      >
        {ACHIEVEMENTS.map((a, i) => (
          <div key={i} className="flex flex-col items-center gap-1.5 px-6 py-8">
            <span
              className="font-display text-3xl font-bold"
              style={{
                background: 'linear-gradient(135deg, #a78bfa, #f472b6)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
              }}
            >
              {a.value}
            </span>
            <span className="font-sans text-xs font-medium text-slate-500">{a.label}</span>
          </div>
        ))}
      </motion.div>
    </div>
  </section>
);

export default WhyMeSection;
