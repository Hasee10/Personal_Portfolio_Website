import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: 'GitHub',
      icon: <Github className="w-5 h-5" />,
      url: 'https://github.com/Haseeb10',
      color: 'hover:text-purple-400'
    },
    {
      name: 'LinkedIn',
      icon: <Linkedin className="w-5 h-5" />,
      url: 'https://www.linkedin.com/in/haseeb-arshad-09881b347/',
      color: 'hover:text-blue-400'
    },
    {
      name: 'Email',
      icon: <Mail className="w-5 h-5" />,
      url: 'mailto:m.ihaseebarshad10@gmail.com',
      color: 'hover:text-pink-400'
    }
  ];

  return (
    <footer className="relative overflow-hidden bg-background py-16">
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-1/4 top-0 h-[500px] w-[500px] rounded-full bg-purple-500/5 blur-3xl"></div>
        <div className="absolute -right-1/4 bottom-0 h-[500px] w-[500px] rounded-full bg-blue-500/5 blur-3xl"></div>
      </div>

      <div className="relative container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col items-center space-y-8"
        >
          <div className="flex items-center space-x-1">
            <span className="text-2xl font-display bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              HA
            </span>
          </div>

          <div className="flex items-center space-x-6">
            {socialLinks.map((link, index) => (
              <motion.a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`text-gray-400 transition-colors duration-300 ${link.color}`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {link.icon}
              </motion.a>
            ))}
          </div>

          <div className="text-center space-y-2">
            <p className="text-gray-400 text-sm">
              © {currentYear} Haseeb Arshad. All rights reserved.
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
