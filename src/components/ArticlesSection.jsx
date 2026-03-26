import React, { useRef } from 'react';

const articlesData = [
  {
    title: 'Building LLM Agents from Scratch',
    tag: 'AI Agents',
    excerpt:
      'A deep dive into constructing autonomous agents using LangChain and Ollama without any boilerplate frameworks or hidden abstractions.',
    readTime: '8 min read',
    url: '#',
  },
  {
    title: 'Why RAG Still Matters in 2025',
    tag: 'LLMs',
    excerpt:
      'Retrieval-augmented generation remains one of the most practical ways to ground LLM outputs in factual data and production workflows.',
    readTime: '6 min read',
    url: '#',
  },
  {
    title: 'Computer Vision for Accessibility',
    tag: 'Computer Vision',
    excerpt:
      'How I built an AI virtual mouse using MediaPipe and OpenCV to help elderly and disabled users interact with computers more naturally.',
    readTime: '10 min read',
    url: '#',
  },
];

function ArrowIcon({ direction = 'right' }) {
  const rotate = direction === 'left' ? 'rotate(180 12 12)' : undefined;

  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
      <g transform={rotate}>
        <path d="M5 12h14" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </svg>
  );
}

const ArticlesSection = () => {
  const railRef = useRef(null);

  const scrollRail = (direction) => {
    const rail = railRef.current;
    if (!rail) return;

    rail.scrollBy({
      left: direction === 'left' ? -360 : 360,
      behavior: 'smooth',
    });
  };

  return (
    <section id="articles" className="scroll-section reveal relative overflow-hidden bg-background py-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(124,58,237,0.14),transparent_26%),radial-gradient(circle_at_90%_25%,rgba(236,72,153,0.08),transparent_24%)]" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <h2 className="mb-4 text-3xl font-bold md:text-5xl">
              <span className="bg-gradient-to-r from-[#7c3aed] via-[#8b5cf6] to-[#ec4899] bg-clip-text text-transparent">
                From My Desk
              </span>
            </h2>
            <p className="text-base leading-7 text-[#9ca3af] md:text-lg">
              Thoughts on AI, machine learning, and building intelligent systems
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              className="article-rail-button"
              aria-label="Scroll articles left"
              onClick={() => scrollRail('left')}
            >
              <ArrowIcon direction="left" />
            </button>
            <button
              type="button"
              className="article-rail-button"
              aria-label="Scroll articles right"
              onClick={() => scrollRail('right')}
            >
              <ArrowIcon direction="right" />
            </button>
          </div>
        </div>

        <div ref={railRef} className="articles-rail">
          {articlesData.map((article) => (
            <div key={article.title} className="article-shell">
              <article className="article-card">
                <span className="article-card__tag">{article.tag}</span>
                <h3 className="article-card__title">{article.title}</h3>
                <p className="article-card__excerpt">{article.excerpt}</p>
                <div className="article-card__footer">
                  <span className="article-card__time">{article.readTime}</span>
                  <a href={article.url} className="article-card__link" target="_blank" rel="noopener noreferrer">
                    Read Article
                    <ArrowIcon direction="right" />
                  </a>
                </div>
              </article>
            </div>
          ))}
        </div>

        <div className="mt-10 flex justify-center md:justify-end">
          <a
            href="https://medium.com/@ihaseebarshad10"
            target="_blank"
            rel="noopener noreferrer"
            className="view-all-articles"
          >
            View All Articles
            <ArrowIcon direction="right" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default ArticlesSection;
