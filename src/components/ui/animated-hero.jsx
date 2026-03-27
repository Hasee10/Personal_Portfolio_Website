import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { MoveRight } from "lucide-react";
import { Button } from "./button";

function Hero() {
  const [titleNumber, setTitleNumber] = useState(0);
  const [imageError, setImageError] = useState(false);
  const titles = useMemo(
    () => ["Machine Learning", "Automation", "AI Engineering", "Agentic Systems"],
    []
  );

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (titleNumber === titles.length - 1) {
        setTitleNumber(0);
      } else {
        setTitleNumber(titleNumber + 1);
      }
    }, 2000);
    return () => clearTimeout(timeoutId);
  }, [titleNumber, titles]);

  return (
    <div className="w-full">
      <div className="container mx-auto">
        <div className="flex flex-col items-center justify-center gap-12 py-20 lg:flex-row lg:items-center lg:justify-between lg:gap-16 lg:py-32">
          <div className="flex max-w-3xl flex-1 flex-col items-center gap-8 text-center lg:items-start lg:text-left">
            <div>
              <Button 
                variant="secondary" 
                size="sm" 
                className="gap-4"
                onClick={() => window.open('https://medium.com/@ihaseebarshad10/rise-of-responsible-ai-c65a2d2cb108', '_blank')}
              >
                Read my latest article <MoveRight className="w-4 h-4" />
              </Button>
            </div>

            <div className="flex gap-4 flex-col">
              <h1 className="text-5xl md:text-7xl max-w-2xl tracking-tighter font-regular">
                <span className="text-gradient">I'm Haseeb Arshad</span>
                <span className="relative flex w-full justify-center overflow-hidden text-center lg:justify-start lg:text-left md:pb-4 md:pt-1">
                  &nbsp;
                  {titles.map((title, index) => (
                    <motion.span
                      key={index}
                      className="absolute font-semibold"
                      initial={{ opacity: 0, y: "-100" }}
                      transition={{ type: "spring", stiffness: 50 }}
                      animate={
                        titleNumber === index
                          ? {
                              y: 0,
                              opacity: 1,
                            }
                          : {
                              y: titleNumber > index ? -150 : 150,
                              opacity: 0,
                            }
                      }
                    >
                      {title}
                    </motion.span>
                  ))}
                </span>
              </h1>

              <p className="text-lg md:text-xl leading-relaxed tracking-tight text-muted-foreground max-w-2xl">
                Building intelligent systems that solve complex problems through innovative AI solutions. 
                Specializing in machine learning, natural language processing, and LLMs to 
                create impactful technology that drives business value.
              </p>
            </div>

            <div className="flex flex-row gap-3">
              <Button 
                size="lg" 
                className="gap-4"
                onClick={() => window.open('https://drive.google.com/file/d/1wiQ0FovDijWrjyYxRuv1UhAqHsVBoZct/view?usp=sharing', '_blank')}
              >
                Resume <MoveRight className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 32, scale: 0.96 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="relative w-full max-w-[360px] shrink-0"
          >
            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-3 backdrop-blur-sm shadow-[0_30px_70px_rgba(0,0,0,0.35)]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(139,92,246,0.24),_transparent_45%),radial-gradient(circle_at_80%_20%,_rgba(236,72,153,0.18),_transparent_35%)]" />
              <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#111118]">
                {!imageError ? (
                  <img
                    src="/14.png"
                    alt="Haseeb Arshad"
                    className="h-full w-full object-cover"
                    onError={() => setImageError(true)}
                  />
                ) : null}

                {imageError ? (
                  <div className="flex h-full w-full flex-col items-center justify-center bg-[radial-gradient(circle_at_top,_rgba(139,92,246,0.2),_transparent_38%),linear-gradient(180deg,_rgba(17,17,24,0.95),_rgba(10,10,15,1))] text-white">
                    <div className="flex h-28 w-28 items-center justify-center rounded-full border border-white/10 bg-white/5 text-3xl font-semibold tracking-[0.2em] text-white/90">
                      HA
                    </div>
                    <p className="mt-6 text-sm uppercase tracking-[0.28em] text-white/50">
                      Profile Photo
                    </p>
                    <p className="mt-2 px-8 text-center text-sm leading-6 text-[#9ca3af]">
                      Add your image as <span className="text-white">public/14.png</span>
                    </p>
                  </div>
                ) : null}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export { Hero };
