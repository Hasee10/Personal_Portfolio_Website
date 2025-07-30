import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Github, ExternalLink, Bot, Brain, Shield, MessageSquare } from 'lucide-react';
import { GlowingEffect } from '@/components/ui/glowing-effect';
import { cn } from '@/lib/utils';

const projects = [
  {
    title: "AI Virtual Mouse App",
    description: "An advanced AI-powered solution developed for the disabled elderly and patients who want to have a good look at their stuff closely. It is equipped with real-time mouse movement and click detection.",
    image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?q=80&w=500&auto=format&fit=crop",
    tags: ["AI", "MagicPipe", "Machine Learning", "Python", "OpenCV"],
    link: "https://github.com/Hasee10/AI-VM-App",
    github: "https://github.com/Hasee10/AI-VM-App",
    icon: <Shield className="h-5 w-5" />
  },
  {
    title: "Mathematics AI Assistant",
    description: "A sophisticated Ollama based AI agent built from scratch that performs complex calcualtions related to differential equations or integration/ differentiation on one click. Features include contextual memory, intelligent host management, and advanced text analysis using Llama 3.1 Models.",
    image: "https://images.unsplash.com/photo-1677442135136-760c813028c0?q=80&w=500&auto=format&fit=crop",
    tags: ["Ollama", "LangChain", "GROQ", "OLLAMA", "Python"],
    link: "https://github.com/Hasee10/Math_Chatbot",
    github: "https://github.com/Hasee10/Math_Chatbot",
    icon: <Bot className="h-5 w-5" />
  },
  {
    title: "Image Chatbot",
    description: "An innovative machine learning model that detects the edges and the elements inside the image based on the algorithm. Utilizes Random Forest and Extra Trees models with MultiOutputRegressor, enhanced by PCA for efficient dimensionality reduction.",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=500&auto=format&fit=crop",
    tags: ["Machine Learning", "Python", "scikit-learn", "MongoDB"],
    link: "https://github.com/Hasee10/Image_ChatBot",
    github: "https://github.com/Hasee10/Image_ChatBot",
    icon: <Brain className="h-5 w-5" />
  },
  {
    title: "Streamlit Integrational Operations",
    description: "Using TensorFlow and OpenCV this prospect was developed to keep the things well running in an automated manner.",
    image: "https://images.unsplash.com/photo-1614729939124-032f0b56c9ce?q=80&w=500&auto=format&fit=crop",
    tags: ["Python", "OpenCV", "Numpy", "Matplotlib", "Tensor-Flow"],
    link: "https://github.com/Hasee10/TensorFlow-OpenCV",
    github: "https://github.com/Hasee10/TensorFlow-OpenCV",
    icon: <MessageSquare className="h-5 w-5" />
  }
];

const ProjectCard = ({ project, index, area }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.li
      className={cn("min-h-[18rem] list-none", area)}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-full rounded-[1.25rem] border-[0.75px] border-white/10 p-2 md:rounded-[1.5rem] md:p-3">
        <GlowingEffect
          spread={40}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
          borderWidth={3}
        />
        <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-xl border-[0.75px] border-white/10 bg-background p-6 shadow-sm">
          <div className="relative flex flex-1 flex-col justify-between gap-3">
            <div className="flex justify-between items-start">
              <div className="w-fit rounded-lg border-[0.75px] border-white/10 bg-white/5 p-2">
                {project.icon}
              </div>
              <a 
                href={project.github} 
                className="text-gray-400 hover:text-white transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="h-5 w-5" />
              </a>
            </div>
            
            <div className="space-y-3">
              <h3 className="pt-0.5 text-xl leading-[1.375rem] font-semibold font-display tracking-[-0.04em] md:text-2xl md:leading-[1.875rem] text-balance text-foreground">
                {project.title}
              </h3>
              <p className="font-sans text-sm leading-[1.125rem] md:text-base md:leading-[1.375rem] text-gray-300">
                {project.description}
              </p>
            </div>
            
            <div className="mt-4">
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map((tag, i) => (
                  <motion.span
                    key={i}
                    className="px-2 py-1 text-xs rounded-full bg-indigo-500/20 text-indigo-300"
                    whileHover={{ scale: 1.05, backgroundColor: "rgba(99, 102, 241, 0.3)" }}
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>
              
              <motion.a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-indigo-400 font-medium text-sm"
                whileHover={{ x: 5, color: "#818cf8" }}
                transition={{ duration: 0.2 }}
              >
                View Project <ExternalLink className="h-4 w-4" />
              </motion.a>
            </div>
          </div>
        </div>
      </div>
    </motion.li>
  );
};

const ProjectsSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Define grid areas for different screen sizes
  const areas = [
    "md:[grid-area:1/1/2/7] xl:[grid-area:1/1/2/7]",
    "md:[grid-area:1/7/2/13] xl:[grid-area:1/7/2/13]",
    "md:[grid-area:2/1/3/7] xl:[grid-area:2/1/3/7]",
    "md:[grid-area:2/7/3/13] xl:[grid-area:2/7/3/13]"
  ];

  return (
    <section id="projects" className="scroll-section relative min-h-screen py-24 bg-background">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background/90"></div>
      
      <div className="container relative z-10 mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#A855F7] via-[#EC4899] to-[#F97316]">
              Latest Projects
            </span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Showcasing my recent work in AI, machine learning, and software development
          </p>
        </motion.div>
        
        <ul className="grid grid-cols-1 gap-6 md:grid-cols-12 md:grid-rows-2 lg:gap-8">
          {projects.map((project, index) => (
            <ProjectCard 
              key={index} 
              project={project} 
              index={index} 
              area={areas[index % areas.length]}
            />
          ))}
        </ul>
      </div>
    </section>
  );
};

export default ProjectsSection;
