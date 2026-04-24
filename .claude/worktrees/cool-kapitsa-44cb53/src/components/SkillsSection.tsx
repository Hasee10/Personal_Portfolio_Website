import React from 'react';
import { motion } from 'framer-motion';
import {
  Database, Cloud, Brain, Code2, Bot, Boxes, Terminal,
  GitMerge, Sparkles, BarChart, PieChart, FileText,
  PenTool, Server, Layers, Cpu, Code, Palette, Network,
} from 'lucide-react';
import { GlowingEffect } from '@/components/ui/glowing-effect';

interface SkillItem {
  name: string;
  icon: React.ReactNode;
}

interface SkillCategory {
  label: string;
  accentColor: string;
  skills: SkillItem[];
}

const CATEGORIES: SkillCategory[] = [
  {
    label: 'Languages',
    accentColor: '#818cf8',
    skills: [
      { name: 'Python', icon: <Code2 className="w-4 h-4" /> },
      { name: 'C++', icon: <Terminal className="w-4 h-4" /> },
      { name: 'JavaScript', icon: <Code className="w-4 h-4" /> },
    ],
  },
  {
    label: 'ML / AI',
    accentColor: '#a78bfa',
    skills: [
      { name: 'Machine Learning', icon: <Brain className="w-4 h-4" /> },
      { name: 'TensorFlow', icon: <Boxes className="w-4 h-4" /> },
      { name: 'Scikit-learn', icon: <Brain className="w-4 h-4" /> },
      { name: 'Keras', icon: <Brain className="w-4 h-4" /> },
      { name: 'MLflow', icon: <BarChart className="w-4 h-4" /> },
    ],
  },
  {
    label: 'Agents & LLMs',
    accentColor: '#ec4899',
    skills: [
      { name: 'LangChain', icon: <Bot className="w-4 h-4" /> },
      { name: 'AI Agents', icon: <Bot className="w-4 h-4" /> },
      { name: 'Crew AI', icon: <Bot className="w-4 h-4" /> },
      { name: 'n8n', icon: <Network className="w-4 h-4" /> },
      { name: 'Workflows', icon: <Network className="w-4 h-4" /> },
    ],
  },
  {
    label: 'Data & Databases',
    accentColor: '#34d399',
    skills: [
      { name: 'MongoDB', icon: <Database className="w-4 h-4" /> },
      { name: 'Pinecone', icon: <Database className="w-4 h-4" /> },
      { name: 'Data Warehousing', icon: <Database className="w-4 h-4" /> },
      { name: 'Power BI', icon: <BarChart className="w-4 h-4" /> },
      { name: 'Tableau', icon: <PieChart className="w-4 h-4" /> },
    ],
  },
  {
    label: 'Backend & DevOps',
    accentColor: '#38bdf8',
    skills: [
      { name: 'FastAPI', icon: <Code className="w-4 h-4" /> },
      { name: 'Node.js', icon: <Server className="w-4 h-4" /> },
      { name: 'MERN Stack', icon: <Layers className="w-4 h-4" /> },
      { name: 'Docker', icon: <Cloud className="w-4 h-4" /> },
      { name: 'Kubernetes', icon: <Cloud className="w-4 h-4" /> },
      { name: 'CI/CD', icon: <GitMerge className="w-4 h-4" /> },
      { name: 'Git', icon: <GitMerge className="w-4 h-4" /> },
    ],
  },
  {
    label: 'Other',
    accentColor: '#fb923c',
    skills: [
      { name: 'Cloud Computing', icon: <Cloud className="w-4 h-4" /> },
      { name: 'APIs & Integrations', icon: <Network className="w-4 h-4" /> },
      { name: 'Data Visualization', icon: <BarChart className="w-4 h-4" /> },
      { name: 'Article Writing', icon: <FileText className="w-4 h-4" /> },
      { name: 'Content Writing', icon: <PenTool className="w-4 h-4" /> },
      { name: 'UI/UX Design', icon: <Palette className="w-4 h-4" /> },
    ],
  },
];

const SkillPill: React.FC<{ skill: SkillItem; accent: string }> = ({ skill, accent }) => (
  <motion.div
    className="skill-pill-shell group relative inline-flex rounded-full p-[1px]"
    whileHover={{ scale: 1.05 }}
    transition={{ type: 'spring', stiffness: 400, damping: 17 }}
  >
    <GlowingEffect spread={28} glow proximity={48} inactiveZone={0.01} borderWidth={1.5} />
    <div className="skill-pill-inner relative inline-flex items-center gap-2 rounded-full bg-white/[0.04] px-3.5 py-2 transition-colors group-hover:bg-white/[0.07]">
      <div
        className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full"
        style={{ background: `${accent}18`, color: accent }}
      >
        {skill.icon}
      </div>
      <span className="text-sm font-medium text-slate-300">{skill.name}</span>
    </div>
  </motion.div>
);

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 300, damping: 20 } },
};

const SkillsSection: React.FC = () => (
  <section id="skills" className="scroll-section reveal relative overflow-hidden bg-background py-28">
    {/* Background */}
    <div className="pointer-events-none absolute inset-0">
      <div className="absolute left-0 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-indigo-600/6 blur-[80px]" />
      <div className="absolute bottom-1/4 right-0 h-72 w-72 rounded-full bg-purple-600/6 blur-[80px]" />
    </div>

    <div className="relative z-10 mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-16 text-center"
      >
        <span className="section-eyebrow mx-auto">Tech Stack</span>
        <h2 className="font-display text-4xl font-bold tracking-tight text-white md:text-5xl">
          Technical Arsenal
        </h2>
        <p className="mx-auto mt-4 max-w-xl font-sans text-base leading-relaxed text-slate-400 md:text-lg">
          A comprehensive toolkit for building intelligent systems and scalable solutions
        </p>
      </motion.div>

      {/* Category groups */}
      <div className="flex flex-col gap-10">
        {CATEGORIES.map((cat) => (
          <div key={cat.label} className="skills-category">
            {/* Category label */}
            <div className="flex items-center gap-3">
              <span
                className="h-2 w-2 shrink-0 rounded-full"
                style={{ background: cat.accentColor, boxShadow: `0 0 8px ${cat.accentColor}` }}
              />
              <span className="skills-category-label flex-1">
                {cat.label}
                <span className="ml-2 flex-1 h-px bg-gradient-to-r from-white/[0.06] to-transparent" />
              </span>
            </div>

            {/* Pills */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="skills-group"
            >
              {cat.skills.map((skill) => (
                <motion.div key={skill.name} variants={itemVariants}>
                  <SkillPill skill={skill} accent={cat.accentColor} />
                </motion.div>
              ))}
            </motion.div>
          </div>
        ))}

        {/* "And more" indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="flex justify-center"
        >
          <motion.div
            className="skill-pill-shell group relative inline-flex rounded-full p-[1px] cursor-default"
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
          >
            <GlowingEffect spread={32} glow proximity={52} inactiveZone={0.01} borderWidth={1.5} />
            <div className="skill-pill-inner relative inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-indigo-500/10 px-5 py-2.5">
              <Sparkles className="h-4 w-4 text-purple-400" />
              <span className="text-sm font-semibold text-gradient">And much more...</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  </section>
);

export default SkillsSection;
