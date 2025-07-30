import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Sparkles, Bot, Rocket } from 'lucide-react';

const WhyMeSection = () => {
  const cards = [
    {
      icon: <Brain className="w-8 h-8 text-purple-400" />,
      title: "AI Engineering Excellence",
      description: "Specialized in developing cutting-edge AI solutions with a focus on practical applications and scalable architectures.",
      gradient: "from-purple-500/20 via-purple-500/10 to-transparent"
    },
    {
      icon: <Sparkles className="w-8 h-8 text-blue-400" />,
      title: "Rapid Adaptability",
      description: "Quick to master new technologies and frameworks. My passion for continuous learning keeps me at the forefront of technological advancements.",
      gradient: "from-blue-500/20 via-blue-500/10 to-transparent"
    },
    {
      icon: <Rocket className="w-8 h-8 text-pink-400" />,
      title: "Innovation Driven",
      description: "Consistently pushing boundaries by combining AI with creative problem-solving to deliver unique and impactful solutions.",
      gradient: "from-pink-500/20 via-pink-500/10 to-transparent"
    }
  ];

  return (
    <section id="why-me" className="relative min-h-screen py-24 bg-background">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background/90">
        {/* Decorative Elements */}
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-purple-500/5 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-blue-500/5 rounded-full filter blur-3xl"></div>
      </div>

      <div className="container relative z-10 mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#A855F7] via-[#EC4899] to-[#F97316]">
              Why Choose Me?
            </span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Combining technical expertise with rapid adaptability and innovative thinking to deliver exceptional solutions
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {cards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group"
            >
              <div className={`absolute inset-0 bg-gradient-radial ${card.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl`}></div>
              <div className="relative flex flex-col items-center p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 group-hover:border-white/20 transition-colors duration-300">
                <div className="p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 group-hover:border-white/20 transition-colors duration-300 mb-6">
                  {card.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-200 mb-4">{card.title}</h3>
                <p className="text-gray-400 text-center">{card.description}</p>
                <motion.div
                  className="absolute -z-10 inset-0 bg-gradient-to-r from-purple-500/0 via-pink-500/0 to-blue-500/0 group-hover:from-purple-500/5 group-hover:via-pink-500/5 group-hover:to-blue-500/5 rounded-2xl transition-all duration-500"
                  whileHover={{ scale: 1.02 }}
                ></motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyMeSection; 