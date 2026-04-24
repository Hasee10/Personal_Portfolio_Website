import React, { useRef } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

const ARTICLES = [
  {
    title: 'Building LLM Agents from Scratch',
    tag: 'AI Agents',
    accentColor: '#7c3aed',
    excerpt:
      'A deep dive into constructing autonomous agents using LangChain and Ollama without boilerplate frameworks or hidden abstractions.',
    readTime: '8 min read',
    url: 'https://medium.com/@ihaseebarshad10',
    num: '01',
  },
  {
    title: 'Why RAG Still Matters in 2025',
    tag: 'LLMs',
    accentColor: '#ec4899',
    excerpt:
      'Retrieval-augmented generation remains one of the most practical ways to ground LLM outputs in factual data and production workflows.',
    readTime: '6 min read',
    url: 'https://medium.com/@ihaseebarshad10',
    num: '02',
  },
  {
    title: 'Computer Vision for Accessibility',
    tag: 'Computer Vision',
    accentColor: '#06b6d4',
    excerpt:
      'How I built an AI virtual mouse using MediaPipe and OpenCV to help elderly and disabled users interact with computers more naturally.',
    readTime: '10 min read',
    url: 'https://medium.com/@ihaseebarshad10',
    num: '03',
  },
];

const ArticlesSection = () => {
  const railRef = useRef(null);
  const scroll = (dir) => railRef.current?.scrollBy({ left: dir === 'left' ? -380 : 380, behavior: 'smooth' });

  return (
    <section id="articles" className="scroll-section reveal relative overflow-hidden bg-background py-28">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[8%] top-[12%] h-80 w-80 rounded-full bg-violet-600/4 blur-[90px]" />
        <div className="absolute right-[8%] bottom-[12%] h-80 w-80 rounded-full bg-pink-600/4 blur-[90px]" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-lg">
            <span className="section-eyebrow">Writing</span>
            <h2 className="font-display text-4xl font-bold tracking-tight text-white md:text-5xl">
              From My Desk
            </h2>
            <p className="mt-3 font-sans text-base leading-relaxed text-slate-400">
              Thoughts on AI, machine learning, and building intelligent systems
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              className="article-rail-button"
              aria-label="Scroll left"
              onClick={() => scroll('left')}
            >
              <ChevronLeft className="h-4 w-4" strokeWidth={2} />
            </button>
            <button
              type="button"
              className="article-rail-button"
              aria-label="Scroll right"
              onClick={() => scroll('right')}
            >
              <ChevronRight className="h-4 w-4" strokeWidth={2} />
            </button>
          </div>
        </div>

        {/* Scrollable rail */}
        <div ref={railRef} className="articles-rail">
          {ARTICLES.map((article) => (
            <div key={article.title} className="article-shell">
              <article className="article-card">
                {/* Top accent bar */}
                <div
                  className="article-card__thumb"
                  style={{ background: `linear-gradient(90deg, ${article.accentColor}, ${article.accentColor}44)` }}
                />

                {/* Tag + number row */}
                <div className="flex items-center justify-between">
                  <span
                    className="article-card__tag font-sans"
                    style={{
                      borderColor: `${article.accentColor}28`,
                      background: `${article.accentColor}10`,
                      color: `${article.accentColor}cc`,
                    }}
                  >
                    {article.tag}
                  </span>
                  <span
                    className="font-display text-3xl font-black leading-none select-none"
                    style={{ color: article.accentColor, opacity: 0.08 }}
                  >
                    {article.num}
                  </span>
                </div>

                <h3 className="article-card__title font-display">{article.title}</h3>
                <p className="article-card__excerpt font-sans">{article.excerpt}</p>

                <div className="article-card__footer">
                  <span className="article-card__time font-sans">{article.readTime}</span>
                  <a href={article.url} className="article-card__link font-sans" target="_blank" rel="noopener noreferrer">
                    Read article
                    <ArrowRight className="h-3.5 w-3.5" strokeWidth={2} />
                  </a>
                </div>
              </article>
            </div>
          ))}
        </div>

        {/* View all */}
        <div className="mt-10 flex justify-center md:justify-end">
          <a
            href="https://medium.com/@ihaseebarshad10"
            target="_blank"
            rel="noopener noreferrer"
            className="view-all-articles font-sans"
          >
            View all articles
            <ArrowRight className="h-4 w-4" strokeWidth={2} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default ArticlesSection;
