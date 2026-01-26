'use client';

import { Project } from "@/lib/types";
import { Github, ExternalLink } from "lucide-react";
import Link from "next/link";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="group rounded-xl border border-border bg-card p-6 shadow-sm hover:shadow-md hover:border-primary/50 transition-all duration-300 flex flex-col h-full">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
          {project.title}
        </h3>
        <div className="flex space-x-2" onClick={(e) => e.stopPropagation()}>
          {project.github && (
            <Link 
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="View Source on GitHub"
            >
              <Github className="h-5 w-5" />
            </Link>
          )}
          {project.link && (
            <Link 
              href={project.link}
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
        {project.techStack.map((tech) => (
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
