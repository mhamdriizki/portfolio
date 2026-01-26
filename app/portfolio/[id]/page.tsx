import Section from "@/components/ui/Section";
import { projects } from "@/data/projects";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink, Github, ArrowLeft } from "lucide-react";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return projects.map((project) => ({
    id: project.id,
  }));
}

export default async function ProjectDetailPage(props: PageProps) {
  const params = await props.params;
  const project = projects.find((p) => p.id === params.id);

  if (!project) {
    notFound();
  }

  return (
    <Section>
      <Link 
        href="/portfolio"
        className="inline-flex items-center text-muted-foreground hover:text-primary mb-8 transition-colors group"
      >
        <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
        Back to Portfolio
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
           {project.thumbnail ? (
              <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-border shadow-md">
                <Image 
                  src={project.thumbnail} 
                  alt={project.title} 
                  fill 
                  className="object-cover"
                  priority
                />
              </div>
           ) : (
             <div className="w-full aspect-video rounded-xl bg-gray-100 dark:bg-zinc-800 border border-border flex items-center justify-center text-muted-foreground">
               No Image Available
             </div>
           )}
        </div>

        <div className="space-y-6">
          <h1 className="text-4xl font-bold text-foreground">{project.title}</h1>
          
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <span 
                key={tech}
                className="px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary-dark"
              >
                {tech}
              </span>
            ))}
          </div>

          <p className="text-lg text-muted-foreground leading-relaxed">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-4 pt-6">
            {project.link && (
              <Link 
                href={project.link}
                target="_blank"
                className="inline-flex items-center px-6 py-3 rounded-lg bg-primary text-white font-medium hover:bg-primary-dark transition-colors shadow-sm"
              >
                Visit Website
                <ExternalLink className="ml-2 h-4 w-4" />
              </Link>
            )}
            {project.github && (
              <Link 
                href={project.github}
                target="_blank"
                className="inline-flex items-center px-6 py-3 rounded-lg border border-border bg-white text-foreground font-medium hover:bg-gray-50 transition-colors"
              >
                View Source Code
                <Github className="ml-2 h-4 w-4" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </Section>
  );
}
