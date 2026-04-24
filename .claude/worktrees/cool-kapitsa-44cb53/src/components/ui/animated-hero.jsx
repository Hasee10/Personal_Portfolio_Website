import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Download } from "lucide-react";

const TITLES = ["Machine Learning", "AI Engineering", "Automation", "Agentic Systems"];

const TECH_CHIPS = ["Python", "LangChain", "FastAPI", "n8n", "Docker"];

const STATS = [
  { value: "10+", label: "Projects Built" },
  { value: "3+", label: "Years of Study" },
  { value: "8+", label: "Tech Stacks" },
];

function Hero() {
  const [titleIndex, setTitleIndex] = useState(0);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    const id = setTimeout(() => {
      setTitleIndex((i) => (i + 1) % TITLES.length);
    }, 2400);
    return () => clearTimeout(id);
  }, [titleIndex]);

  return (
    <div className="w-full">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center gap-16 py-28 lg:flex-row lg:items-center lg:justify-between lg:gap-20 lg:py-36">

          {/* Left column */}
          <div className="flex max-w-2xl flex-1 flex-col items-center gap-7 text-center lg:items-start lg:text-left">

            {/* Status chip — no emoji */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2"
            >
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-50" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              <span className="text-sm text-white/60">Open to opportunities · Pakistan</span>
            </motion.div>

            {/* Name */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex flex-col gap-3"
            >
              <h1 className="font-display text-5xl font-bold leading-tight tracking-tight md:text-6xl lg:text-7xl">
                <span className="text-gradient">Haseeb Arshad</span>
              </h1>

              {/* Rotating subtitle */}
              <div className="relative h-10 overflow-hidden md:h-12">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={titleIndex}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.35, ease: "easeInOut" }}
                    className="absolute inset-0 flex items-center justify-center font-sans text-xl font-semibold tracking-wide text-white/70 md:text-2xl lg:justify-start"
                  >
                    {TITLES[titleIndex]}
                  </motion.span>
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Bio */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="max-w-xl font-sans text-base leading-relaxed text-slate-300 md:text-lg"
            >
              Building intelligent systems that solve real problems. I specialise in machine learning,
              NLP, and autonomous AI agents — turning research into production-ready tools that
              deliver measurable value.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap items-center gap-3"
            >
              <a
                href="https://drive.google.com/file/d/1wiQ0FovDijWrjyYxRuv1UhAqHsVBoZct/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-pink-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-500/20 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-violet-500/35"
              >
                <Download className="h-4 w-4" strokeWidth={2} />
                Download CV
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-6 py-3 text-sm font-semibold text-white/80 transition-all duration-200 hover:-translate-y-0.5 hover:border-white/18 hover:bg-white/[0.07] hover:text-white"
              >
                Get In Touch
                <ArrowRight className="h-4 w-4" strokeWidth={2} />
              </a>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="flex items-center gap-8 border-t border-white/[0.06] pt-6"
            >
              {STATS.map((stat, i) => (
                <div key={i} className="flex flex-col items-center gap-0.5 lg:items-start">
                  <span className="font-display text-2xl font-bold text-white">{stat.value}</span>
                  <span className="font-sans text-xs font-medium text-slate-500">{stat.label}</span>
                </div>
              ))}
              <div className="h-10 w-px bg-white/[0.07]" />
              <a
                href="https://medium.com/@ihaseebarshad10"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 transition-colors hover:text-white/80"
              >
                Read my articles
                <ArrowRight className="h-3.5 w-3.5" strokeWidth={2} />
              </a>
            </motion.div>
          </div>

          {/* Right column — profile card */}
          <motion.div
            initial={{ opacity: 0, x: 28, scale: 0.97 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.75, delay: 0.15 }}
            className="relative w-full max-w-[320px] shrink-0"
          >
            {/* Ambient glow behind the card */}
            <div
              className="absolute inset-0 rounded-[2rem] opacity-30 blur-2xl"
              style={{
                background: "linear-gradient(135deg, #7c3aed, #ec4899, #06b6d4)",
              }}
            />

            {/* Card shell */}
            <div className="relative rounded-[2rem] border border-white/10 bg-[#0d0d14]/80 p-3 shadow-[0_40px_80px_rgba(0,0,0,0.6)] backdrop-blur-sm">

              {/* Aurora gradient ring — kept intact */}
              <div
                className="absolute inset-0 rounded-[2rem] opacity-60"
                style={{
                  background: "linear-gradient(135deg, #7c3aed, #ec4899, #06b6d4, #7c3aed)",
                  backgroundSize: "300% 300%",
                  animation: "aurora 4s linear infinite",
                  zIndex: -1,
                  filter: "blur(12px)",
                }}
              />

              {/* Inner radial glow */}
              <div className="absolute inset-0 rounded-[2rem] bg-[radial-gradient(circle_at_30%_10%,rgba(139,92,246,0.22),transparent_50%),radial-gradient(circle_at_80%_80%,rgba(236,72,153,0.14),transparent_45%)]" />

              {/* Photo */}
              <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#0d0d14]">
                {!imageError ? (
                  <img
                    src="/14.png"
                    alt="Haseeb Arshad"
                    className="h-full w-full object-cover"
                    onError={() => setImageError(true)}
                  />
                ) : (
                  <div className="flex h-full w-full flex-col items-center justify-center bg-[radial-gradient(circle_at_top,rgba(139,92,246,0.2),transparent_40%),linear-gradient(180deg,rgba(13,13,20,0.95),rgba(5,5,8,1))]">
                    <div className="flex h-24 w-24 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] font-display text-2xl font-bold tracking-[0.18em] text-white/80">
                      HA
                    </div>
                    <p className="mt-5 font-sans text-xs uppercase tracking-[0.24em] text-white/30">
                      Profile Photo
                    </p>
                  </div>
                )}
              </div>

              {/* Tech stack row — clean text chips, no emojis */}
              <div className="mt-3 flex flex-wrap gap-1.5 px-1 pb-1">
                {TECH_CHIPS.map((name) => (
                  <span
                    key={name}
                    className="rounded-lg border border-white/[0.07] bg-white/[0.03] px-2.5 py-1 font-sans text-xs font-medium text-white/55"
                  >
                    {name}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}

export { Hero };
