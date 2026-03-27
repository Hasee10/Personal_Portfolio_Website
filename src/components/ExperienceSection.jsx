import React, { useEffect, useRef } from 'react';
import { Brain, Code2, Globe2, Trophy } from 'lucide-react';
import { GlowingEffect } from '@/components/ui/glowing-effect';

const iconMap = {
  globe: Globe2,
  trophy: Trophy,
  brain: Brain,
  code: Code2,
};

const experiences = [
  {
    role: 'Honourable Delegate',
    org: 'LGS IMUN & Regional MUNs',
    period: '2017-2019',
    side: 'left',
    icon: 'globe',
    description:
      'Built an early foundation in diplomacy, negotiation, and confident public speaking through multiple Model United Nations conferences.',
    bullets: [
      'Received honourable mentions across regional MUN committees',
      'Strengthened policy writing and committee strategy under pressure',
      'Developed persuasive speaking and structured debate skills',
    ],
    tags: ['Diplomacy', 'Public Speaking', 'Negotiation'],
  },
  {
    role: 'Best Delegate',
    org: 'LGS IMUN & Regional MUNs',
    period: '2020-2021',
    side: 'right',
    icon: 'globe',
    description:
      'Progressed from participation to top-ranked delegate performance, representing positions with stronger research depth and sharper committee execution.',
    bullets: [
      'Earned Best Delegate recognition in competitive regional events',
      'Led committee strategy with high-quality position papers',
      'Refined leadership and coalition-building across debate sessions',
    ],
    tags: ['Leadership', 'Debate', 'Research'],
  },
  {
    role: 'Runner-up - Software Competition',
    org: 'NASCON',
    period: 'May 2024',
    side: 'left',
    icon: 'trophy',
    description:
      'Delivered a technically strong software solution in a fast-paced competition setting, balancing speed, product thinking, and presentation quality.',
    bullets: [
      'Built and presented a working solution under competition constraints',
      'Placed runner-up among strong university-level teams',
      'Demonstrated practical problem-solving and product delivery skills',
    ],
    tags: ['Software', 'Rapid Prototyping', 'Presentation'],
  },
  {
    role: 'Event Management Member',
    org: 'Breathe Pakistan',
    period: 'Jul 2024 - May 2025',
    side: 'right',
    icon: 'globe',
    description:
      'Supported planning and execution for public-facing events, helping coordinate logistics, timelines, volunteers, and vendor communication.',
    bullets: [
      'Coordinated operational details for awareness-focused events',
      'Worked across teams to keep schedules and logistics aligned',
      'Helped maintain smooth on-ground execution during event days',
    ],
    tags: ['Operations', 'Coordination', 'Events'],
  },
  {
    role: 'Community Member',
    org: 'South Asian AI Startup',
    period: 'Jul 2023 - Present',
    side: 'left',
    icon: 'brain',
    description:
      'Contributing perspective and feedback within an AI startup community focused on emerging tools, product thinking, and real-world adoption.',
    bullets: [
      'Shared feedback around usability and regional market needs',
      'Contributed to product discussions around AI adoption',
      'Stayed involved in a network shaping practical AI experiences',
    ],
    tags: ['AI Community', 'Product Feedback', 'Startup'],
  },
  {
    role: 'AI Automation Engineer',
    org: 'Trilles AI', // ← REPLACE with actual company name
    period: 'August 2025 - February 2026',
    side: 'right',
    icon: 'brain',
    description:
      'Worked on developing and deploying n8n pipelines for production use cases, contributing to model training, evaluation, and optimization workflows.',
    bullets: [
      'Designed and implemented cycles for real-world use cases',
      'Integrated model APIs into backend services using FastAPI',
      'Contributed to CI/CD pipelines for automated model retraining',
    ],
    tags: ['Python', 'FastAPI', 'MLflow', 'Docker', 'n8n'],
  },
  {
    role: 'Intern Data Analyst',
    org: 'IntegCubes',
    period: 'May 2025 - July 2025',
    side: 'left',
    icon: 'code',
    description:
      'Delivered custom AI and automation solutions for clients, including chatbot integrations, workflow automation with n8n, and LLM-powered tools.',
    bullets: [
      'Built end-to-end RAG pipelines for client knowledge bases',
      'Automated business workflows using n8n and custom Python scripts',
      "Delivered LLM-powered tools integrated with client's existing systems",
    ],
    tags: ['LangChain', 'n8n', 'Python', 'RAG', 'LLMs'],
  },
  {
    role: 'Runner-up - Data Visualization Challenge', // ← REPLACE with actual competition name
    org: 'FAST-NUCES',
    period: 'January 2026',
    side: 'right',
    icon: 'trophy',
    description:
      'Competed in a technical challenge focused on visualizing data, delivering a solution that ranked among the top submissions and was recognized for technical depth and originality.',
    bullets: [
      'Designed and built the solution end-to-end within competition timeframe',
      'Presented solution to a panel of industry and academic judges',
      'Ranked second out of 11 participating teams',
    ],
    tags: ['Competition', 'AI', 'Python'],
  },
];

const ExperienceSection = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const cards = sectionRef.current?.querySelectorAll('.timeline-card');
    if (!cards?.length) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="experience-section scroll-section reveal relative overflow-hidden bg-gradient-to-b from-background to-background/95 py-24"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(124,58,237,0.16),transparent_32%),radial-gradient(circle_at_100%_30%,rgba(236,72,153,0.08),transparent_24%)]" />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-5xl">
            <span className="bg-gradient-to-r from-[#7c3aed] via-[#8b5cf6] to-[#ec4899] bg-clip-text text-transparent">
              Experience
            </span>
          </h2>
          <p className="text-base leading-7 text-[#9ca3af] md:text-lg">
            A timeline of competitions, leadership, AI work, and client-facing delivery that shaped how I build systems today.
          </p>
        </div>

        <div className="timeline">
          <div className="timeline-line" aria-hidden="true" />
          {experiences.map((experience) => {
            const Icon = iconMap[experience.icon] || Brain;

            return (
              <div
                key={`${experience.role}-${experience.period}`}
                className={`timeline-row timeline-row--${experience.side}`}
              >
                <div className={`timeline-card timeline-card--${experience.side}`}>
                  <span className="timeline-dot" aria-hidden="true" />
                  <div className="timeline-shell">
                    <GlowingEffect
                      spread={40}
                      glow={true}
                      disabled={false}
                      proximity={64}
                      inactiveZone={0.01}
                      borderWidth={2}
                    />

                    <article className="timeline-panel">
                      <div className="timeline-heading">
                        <div className="timeline-icon-wrap">
                          <Icon className="h-8 w-8 text-white" strokeWidth={1.8} />
                        </div>

                        <div className="timeline-heading__content">
                          <h3 className="timeline-role">{experience.role}</h3>
                          <p className="timeline-org">{experience.org}</p>
                          <p className="timeline-period">{experience.period}</p>
                        </div>
                      </div>

                      <div className="timeline-divider" />

                      <p className="timeline-description">{experience.description}</p>

                      <ul className="timeline-achievements">
                        {experience.bullets.slice(0, 3).map((bullet) => (
                          <li key={bullet}>{bullet}</li>
                        ))}
                      </ul>

                      <div className="timeline-tags">
                        {experience.tags.map((tag) => (
                          <span key={tag} className="timeline-tag">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </article>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
