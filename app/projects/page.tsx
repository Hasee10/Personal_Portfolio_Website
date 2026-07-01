import Nav      from '@/components/Nav'
import Projects from '@/components/Projects'
import Footer   from '@/components/Footer'

export const metadata = {
  title: 'Projects — Haseeb Arshad',
  description: 'AI projects built and shipped by Haseeb Arshad — voice agents, LLM pipelines, agentic systems.',
}

export default function ProjectsPage() {
  return (
    <>
      <Nav />
      <main className="pt-16">
        <Projects />
      </main>
      <Footer />
    </>
  )
}
