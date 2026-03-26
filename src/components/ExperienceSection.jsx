import React, { useEffect, useRef } from 'react';
import { GlowingEffect } from '@/components/ui/glowing-effect';

const experiences = [
  {
    role: 'Honourable Delegate',
    org: 'LGS IMUN & Regional MUNs',
    period: '2017-2019',
    side: 'left',
    description:
      'Built an early foundation in diplomacy, negotiation, and confident public speaking through multiple Model United Nations conferences.',
    achievements: [
      'Received honourable mentions across regional MUN committees.',
      'Strengthened policy writing and committee strategy under pressure.',
      'Developed persuasive speaking and structured debate skills.',
    ],
    tags: ['Diplomacy', 'Public Speaking', 'Negotiation'],
  },
  {
    role: 'Best Delegate',
    org: 'LGS IMUN & Regional MUNs',
    period: '2020-2021',
    side: 'right',
    description:
      'Progressed from participation to top-ranked delegate performance, representing positions with stronger research depth and sharper committee execution.',
    achievements: [
      'Earned Best Delegate recognition in competitive regional events.',
      'Led committee strategy with high-quality position papers.',
      'Refined leadership and coalition-building across debate sessions.',
    ],
    tags: ['Leadership', 'Debate', 'Research'],
  },
  {
    role: 'Runner-up - Software Competition',
    org: 'NASCON',
    period: 'May 2024',
    side: 'left',
    description:
      'Delivered a technically strong software solution in a fast-paced competition setting, balancing speed, product thinking, and presentation quality.',
    achievements: [
      'Built and presented a working solution under competition constraints.',
      'Placed runner-up among strong university-level teams.',
      'Demonstrated practical problem-solving and product delivery skills.',
    ],
    tags: ['Software', 'Rapid Prototyping', 'Presentation'],
  },
  {
    role: 'Event Management Member',
    org: 'Breathe Pakistan',
    period: 'Jul 2024 - May 2025',
    side: 'right',
    description:
      'Supported planning and execution for public-facing events, helping coordinate logistics, timelines, volunteers, and vendor communication.',
    achievements: [
      'Coordinated operational details for awareness-focused events.',
      'Worked across teams to keep schedules and logistics aligned.',
      'Helped maintain smooth on-ground execution during event days.',
    ],
    tags: ['Operations', 'Coordination', 'Events'],
  },
  {
    role: 'Community Member',
    org: 'South Asian AI Startup',
    period: 'Jul 2023 - Present',
    side: 'left',
    description:
      'Contributing perspective and feedback within an AI startup community focused on emerging tools, product thinking, and real-world adoption.',
    achievements: [
      'Shared feedback around usability and regional market needs.',
      'Contributed to product discussions around AI adoption.',
      'Stayed involved in a network shaping practical AI experiences.',
    ],
    tags: ['AI Community', 'Product Feedback', 'Startup'],
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
            A timeline of leadership, competition, community, and hands-on coordination that shaped how I build and collaborate.
          </p>
        </div>

        <div className="timeline">
          <div className="timeline-line" aria-hidden="true" />
          {experiences.map((experience) => (
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
                    <h3 className="timeline-role">{experience.role}</h3>
                    <p className="timeline-org">{experience.org}</p>
                    <p className="timeline-period">{experience.period}</p>
                    <p className="timeline-description">{experience.description}</p>

                    <ul className="timeline-achievements">
                      {experience.achievements.slice(0, 3).map((achievement) => (
                        <li key={achievement}>{achievement}</li>
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
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
