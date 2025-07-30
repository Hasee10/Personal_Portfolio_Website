import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { HoverCard, HoverCardTrigger, HoverCardContent } from '@/components/ui/hover-card';
import { GlowingEffect } from '@/components/ui/glowing-effect';
import { Mail, Code, Globe, Trophy, Calendar, Lightbulb} from 'lucide-react';

const experiences = [
  {
    title: "Honourable Delegate - MUN Conferences",
    company: "LGS IMUN & Regional MUNs",
    period: "2017 - 2019",
    description: "Actively participated in various Model United Nations conferences during O-Levels, receiving multiple Honourable Mentions for outstanding diplomatic performance and policy negotiation.",
    achievements: [
      "Awarded Honourable Mentions at LGS IMUN and other regional MUNs",
      "Represented countries in committees like UNHRC and DISEC",
      "Developed strong public speaking, policy writing, and diplomatic skills"
    ],
    skills: ["Public Speaking", "Debate", "Negotiation", "International Policy"],
    icon: Globe,
    link: "https://www.lgsimun.com/"
  },
  {
    title: "Best Delegate - MUN Conferences",
    company: "LGS IMUN & Regional MUNs",
    period: "2020 - 2021",
    description: "Actively participated in various Model United Nations conferences during A-Levels, receiving multiple Honourable Mentions for outstanding diplomatic performance and policy negotiation.",
    achievements: [
      "Awarded Best Delegate at LGS IMUN and other regional MUNs",
      "Represented countries in committees like UNHRC and DISEC",
      "Developed strong public speaking, policy writing, and diplomatic skills"
    ],
    skills: ["Public Speaking", "Debate", "Negotiation", "International Policy"],
    icon: Globe,
    link: "https://www.lgsimun.com/"
  },
  {
    title: "Runner-up - Software Competition",
    company: "NASCON",
    period: "Mar 2024",
    description: "Secured Runner-up position at NASCON 2024 for building a cutting-edge software solution that demonstrated innovation, technical depth, and real-world applicability.",
    achievements: [
      "Built a scalable web-based solution from scratch under timed competition constraints",
      "Presented the project to a panel of industry professionals and academic judges",
      "Outperformed numerous university teams across Pakistan"
    ],
    skills: ["Web Development", "Teamwork", "Pitching", "Rapid Prototyping"],
    icon: Trophy,
    link: "https://nascon.nu.edu.pk/"
  },
  {
    title: "Event Management Member",
    company: "Breathe Pakistan",
    period: "Feb 2025 - May 2025",
    description: "Contributed to the successful execution of large-scale awareness events as part of Breathe Pakistan’s administration team, managing logistics, volunteer coordination, and vendor liaison.",
    achievements: [
      "Coordinated logistics and schedules for awareness and environmental events",
      "Liaised with vendors and guest speakers to ensure smooth execution",
      "Managed teams of volunteers to maintain discipline and engagement"
    ],
    skills: ["Event Planning", "Team Coordination", "Logistics", "Communication"],
    icon: Calendar,
    link: "https://www.instagram.com/breathepakistan/"
  },
  {
    title: "Community Member",
    company: "Spain-Based AI Startup",
    period: "Jul 2025 - Present",
    description: "Collaborating with a Spain-based AI startup focused on democratizing AI tools for small businesses, offering insights on user experience and product-market fit from a South Asian perspective.",
    achievements: [
      "Provided UX feedback based on user testing within the South Asian market",
      "Assisted in refining AI tool usability and onboarding workflows",
      "Contributed to brainstorming sessions for product and feature development"
    ],
    skills: ["AI Tools", "UX Feedback", "Global Collaboration", "Market Research"],
    icon: Lightbulb,
    link: "https://example.com/startup" // Replace with actual link
  }
];


const ExperienceCard = ({ experience, index }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const Icon = experience.icon;

  return (
    <motion.div
      ref={ref}
      className="timeline-item mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ 
        duration: 0.7,
        delay: index * 0.3,
        ease: [0.21, 0.47, 0.32, 0.98]
      }}
    >
      <div className="relative h-full rounded-[1.25rem] border-[0.75px] border-border p-2 md:rounded-[1.5rem] md:p-3">
        <GlowingEffect
          spread={40}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
          borderWidth={3}
        />
        <div className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl border-[0.75px] bg-background p-6 shadow-sm dark:shadow-[0px_0px_27px_0px_rgba(45,45,45,0.3)] md:p-6">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-lg border-[0.75px] border-white/10 bg-white/5 p-2 flex items-center justify-center">
                  <Icon className="h-5 w-5 text-indigo-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground">{experience.title}</h3>
                  <a 
                    href={experience.link}
                    target="_blank"
                    rel="noopener noreferrer" 
                    className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors"
                  >
                    {experience.company}
                  </a>
                </div>
              </div>
              <p className="text-sm text-gray-400 mb-4">{experience.period}</p>
              <p className="text-gray-300 mb-4">{experience.description}</p>
              
              <div className="space-y-2">
                {experience.achievements.map((achievement, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span className="text-indigo-400 mt-1">•</span>
                    <p className="text-gray-300 text-sm">{achievement}</p>
                  </div>
                ))}
              </div>
              
              <div className="flex flex-wrap gap-2 mt-4">
                {experience.skills.map((skill, i) => (
                  <span
                    key={i}
                    className="px-2 py-1 text-xs rounded-full bg-indigo-500/20 text-indigo-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const ExperienceSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="experience" className="scroll-section bg-gradient-to-b from-background to-background/95 py-20">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            <span className="text-gradient">Experience</span>
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            My journey in automation and technical leadership
          </p>
        </motion.div>
        
        <div className="max-w-3xl mx-auto">
          {experiences.map((experience, index) => (
            <ExperienceCard key={index} experience={experience} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
