import React from 'react';
import { motion } from 'framer-motion';
import {
  Database,
  Cloud,
  Brain,
  Code2,
  Bot,
  Boxes,
  Terminal,
  GitMerge,
  Sparkles,
  BarChart,
  PieChart,
  FileText,
  PenTool,
  Server,
  Layers,
  Cpu,
  Code,
  Palette,
  Network
} from 'lucide-react';
import { GlowingEffect } from '@/components/ui/glowing-effect';

interface SkillProps {
  icon: React.ReactNode;
  name: string;
  color: string;
}

const Skill: React.FC<SkillProps> = ({ icon, name, color }) => {
  return (
    <motion.div
      className="skill-pill-shell group relative inline-flex rounded-full p-[1px]"
      whileHover={{ scale: 1.05 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
    >
      <GlowingEffect
        spread={32}
        glow={true}
        disabled={false}
        proximity={52}
        inactiveZone={0.01}
        borderWidth={1.5}
      />
      <div className="skill-pill-inner relative inline-flex items-center gap-2 rounded-full bg-white/[0.05] px-4 py-2 transition-colors group-hover:bg-white/[0.08]">
        <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${color}`}>
          {icon}
        </div>
        <span className="font-medium text-gray-200">{name}</span>
      </div>
    </motion.div>
  );
};

const MoreSkillsIndicator: React.FC = () => {
  return (
    <motion.div
      className="skill-pill-shell group relative inline-flex rounded-full p-[1px] cursor-pointer"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
    >
      <GlowingEffect
        spread={32}
        glow={true}
        disabled={false}
        proximity={52}
        inactiveZone={0.01}
        borderWidth={1.5}
      />
      <div className="skill-pill-inner relative inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-indigo-500/20 px-4 py-2 transition-all hover:from-purple-500/30 hover:via-pink-500/30 hover:to-indigo-500/30">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/10">
          <Sparkles className="w-5 h-5 text-white" />
        </div>
        <span className="font-medium text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400">
          And More...
        </span>
      </div>
      <motion.div
        className="absolute inset-0 -z-10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        animate={{
          background: [
            'radial-gradient(circle at 50% 50%, rgba(168, 85, 247, 0.1) 0%, transparent 50%)',
            'radial-gradient(circle at 50% 50%, rgba(236, 72, 153, 0.1) 0%, transparent 50%)',
            'radial-gradient(circle at 50% 50%, rgba(99, 102, 241, 0.1) 0%, transparent 50%)',
            'radial-gradient(circle at 50% 50%, rgba(168, 85, 247, 0.1) 0%, transparent 50%)'
          ]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'linear'
        }}
      />
    </motion.div>
  );
};

const SkillsSection: React.FC = () => {
  const skills = [
    // Existing skills
    { name: 'Python', icon: <Code2 className="w-5 h-5 text-white" />, color: 'bg-indigo-500/20' },
    { name: 'C++', icon: <Terminal className="w-5 h-5 text-white" />, color: 'bg-indigo-500/20' },
    { name: 'Machine Learning', icon: <Brain className="w-5 h-5 text-white" />, color: 'bg-purple-500/20' },
    { name: 'TensorFlow', icon: <Boxes className="w-5 h-5 text-white" />, color: 'bg-purple-500/20' },
    { name: 'Scikit-learn', icon: <Brain className="w-5 h-5 text-white" />, color: 'bg-purple-500/20' },
    { name: 'Keras', icon: <Brain className="w-5 h-5 text-white" />, color: 'bg-purple-500/20' },
    { name: 'LangChain', icon: <Bot className="w-5 h-5 text-white" />, color: 'bg-pink-500/20' },
    { name: 'Crew AI', icon: <Bot className="w-5 h-5 text-white" />, color: 'bg-pink-500/20' },
    { name: 'Postman Agent', icon: <Terminal className="w-5 h-5 text-white" />, color: 'bg-pink-500/20' },
    { name: 'MongoDB', icon: <Database className="w-5 h-5 text-white" />, color: 'bg-green-500/20' },
    { name: 'Pinecone', icon: <Database className="w-5 h-5 text-white" />, color: 'bg-green-500/20' },
    { name: 'Docker', icon: <Cloud className="w-5 h-5 text-white" />, color: 'bg-blue-500/20' },
    { name: 'Git', icon: <GitMerge className="w-5 h-5 text-white" />, color: 'bg-blue-500/20' },
    { name: 'CI/CD', icon: <GitMerge className="w-5 h-5 text-white" />, color: 'bg-blue-500/20' },
    { name: 'MLflow', icon: <Brain className="w-5 h-5 text-white" />, color: 'bg-blue-500/20' },

    // Newly requested skills
    { name: 'Power BI', icon: <BarChart className="w-5 h-5 text-white" />, color: 'bg-yellow-500/20' },
    { name: 'Tableau', icon: <PieChart className="w-5 h-5 text-white" />, color: 'bg-yellow-500/20' },
    { name: 'Article Writing', icon: <FileText className="w-5 h-5 text-white" />, color: 'bg-orange-500/20' },
    { name: 'Content Writing', icon: <PenTool className="w-5 h-5 text-white" />, color: 'bg-orange-500/20' },
    { name: 'n8n', icon: <Network className="w-5 h-5 text-white" />, color: 'bg-pink-500/20' },
    { name: 'Workflows', icon: <Network className="w-5 h-5 text-white" />, color: 'bg-pink-500/20' },
    { name: 'AI Agents', icon: <Bot className="w-5 h-5 text-white" />, color: 'bg-purple-500/20' },
    { name: 'Node.js', icon: <Server className="w-5 h-5 text-white" />, color: 'bg-green-500/20' },
    { name: 'MERN Stack', icon: <Layers className="w-5 h-5 text-white" />, color: 'bg-green-500/20' },
    { name: 'Data Warehousing', icon: <Database className="w-5 h-5 text-white" />, color: 'bg-teal-500/20' },
    { name: 'Data Visualization', icon: <BarChart className="w-5 h-5 text-white" />, color: 'bg-teal-500/20' },
    { name: 'Operating Systems', icon: <Cpu className="w-5 h-5 text-white" />, color: 'bg-gray-500/20' },

    // Extra helpful additions
    { name: 'Kubernetes', icon: <Cloud className="w-5 h-5 text-white" />, color: 'bg-blue-600/20' },
    { name: 'FastAPI', icon: <Code className="w-5 h-5 text-white" />, color: 'bg-emerald-500/20' },
    { name: 'Cloud Computing', icon: <Cloud className="w-5 h-5 text-white" />, color: 'bg-sky-500/20' },
    { name: 'APIs & Integrations', icon: <Network className="w-5 h-5 text-white" />, color: 'bg-indigo-500/20' },
    { name: 'UI/UX Design', icon: <Palette className="w-5 h-5 text-white" />, color: 'bg-pink-400/20' }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 260, damping: 20 }
    }
  };

  return (
    <section id="skills" className="scroll-section relative min-h-screen py-24 bg-background">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background/90">
        {/* Decorative Elements */}
        <div className="absolute top-1/2 left-0 w-64 h-64 bg-indigo-500/10 rounded-full filter blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-64 h-64 bg-purple-500/10 rounded-full filter blur-3xl" />
      </div>

      <div className="container relative z-10 mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#A855F7] via-[#EC4899] to-[#F97316]">
              Technical Arsenal
            </span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            A comprehensive toolkit for building intelligent systems and scalable solutions
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 max-w-5xl mx-auto"
        >
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="transform hover:scale-105 transition-transform duration-200"
            >
              <Skill icon={skill.icon} name={skill.name} color={skill.color} />
            </motion.div>
          ))}

          <motion.div
            variants={itemVariants}
            className="transform hover:scale-105 transition-transform duration-200"
          >
            <MoreSkillsIndicator />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;
