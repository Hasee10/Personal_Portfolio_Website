import { notFound } from 'next/navigation'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import ProjectDetail from '@/components/ProjectDetail'
import { PROJECTS, getProject } from '@/lib/projects'

export function generateStaticParams() {
  return PROJECTS.map(p => ({ slug: p.slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const project = getProject(params.slug)
  if (!project) return {}
  return {
    title: `${project.name} — Haseeb Arshad`,
    description: project.desc,
  }
}

export default function ProjectDetailPage({ params }: { params: { slug: string } }) {
  const project = getProject(params.slug)
  if (!project) notFound()

  return (
    <>
      <Nav />
      <main>
        <ProjectDetail project={project} />
      </main>
      <Footer />
    </>
  )
}
