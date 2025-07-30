import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { Button } from '@/components/ui/button';
import ParticlesCanvas from '@/components/ParticlesCanvas';

const HeroSection = () => {
  const containerRef = useRef(null);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* 3D Particles Background */}
      <div className="absolute inset-0 z-0">
        <ParticlesCanvas />
      </div>
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/80 to-background z-10"></div>
      
      {/* Content */}
      <div className="container mx-auto px-4 z-20">
        <motion.div
          ref={containerRef}
          className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2 
            className="text-xl font-medium text-indigo-400 mb-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Hello, I'm
          </motion.h2>
          
          <motion.h1 
            className="text-5xl md:text-7xl font-display font-bold mb-4 text-gradient"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Haseeb Arshad
          </motion.h1>
          
          <motion.div
            className="text-2xl md:text-3xl font-medium mb-6 h-14"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <TypeAnimation
              sequence={[
                'AI Engineer',
                2000,
                'Machine Learning Specialist',
                2000,
                'NLP Enthusiast',
                2000,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
              className="text-white/90"
            />
          </motion.div>
          
          <motion.p 
            className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            Building intelligent systems that solve complex problems through innovative AI solutions.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            <Button 
              variant="glow" 
              size="lg"
              className="animate-glow font-medium"
              onClick={() => {
                document.getElementById('projects').scrollIntoView({ behavior: 'smooth' });
              }}
            >
              View My Work
            </Button>
          </motion.div>
          
          {/* Scroll Indicator */}
          <motion.div 
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, y: [0, 10, 0] }}
            transition={{ delay: 1.5, duration: 1.5, repeat: Infinity }}
          >
            <div className="w-6 h-10 rounded-full border-2 border-white/20 flex justify-center p-1">
              <motion.div 
                className="w-1.5 h-1.5 bg-white rounded-full"
                animate={{ y: [0, 13, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
