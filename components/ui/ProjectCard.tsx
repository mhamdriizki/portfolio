'use client';

import { Project, UPLOADS_URL } from "@/lib/api";
import { Github, ExternalLink } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface ProjectCardProps {
  project: Project;
  detailHref?: string;
}

export default function ProjectCard({ project, detailHref }: ProjectCardProps) {
  const TitleContent = (
    <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
      {project.title}
    </h3>
  );

  const ImageContent = project.image_url ? (
     <div className="relative h-48 -mx-6 -mt-6 mb-4 overflow-hidden border-b border-border">
         <img 
             src={`${UPLOADS_URL}/${project.image_url}`} 
             alt={project.title}
             className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
         />
     </div>
  ) : null;

  return (
    <div className="group rounded-xl border border-border bg-card p-6 shadow-sm hover:shadow-md hover:border-primary/50 transition-all duration-300 flex flex-col h-full overflow-hidden">
      {detailHref ? (
          <Link href={detailHref}>
            {ImageContent}
          </Link>
      ) : (
          ImageContent
      )}

      <div className="flex justify-between items-start mb-4">
        {detailHref ? (
            <Link href={detailHref}>
                {TitleContent}
            </Link>
        ) : (
            TitleContent
        )}
        <div className="flex space-x-2" onClick={(e) => e.stopPropagation()}>
          {project.repo_url && (
            <Link 
              href={project.repo_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="View Source on GitHub"
            >
              <Github className="h-5 w-5" />
            </Link>
          )}
          {project.demo_url && (
            <Link 
              href={project.demo_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="View Live Project"
            >
              <ExternalLink className="h-5 w-5" />
            </Link>
          )}
        </div>
      </div>
      
      <p className="text-muted-foreground mb-6 flex-grow">
        {project.description}
      </p>
      
      <div className="flex flex-wrap gap-2 mt-auto">
        {project.tech_stack?.map((tech) => (
          <span 
            key={tech}
            className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary-dark"
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
}
