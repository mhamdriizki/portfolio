'use client';

import { useState, useMemo, useEffect } from "react";
import ProjectCard from "@/components/ui/ProjectCard";
import Section from "@/components/ui/Section";
import { projects } from "@/data/projects";
import { Filter } from "lucide-react";
import Link from "next/link";
import { api } from "@/lib/api";

export default function PortfolioPage() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTech, setSelectedTech] = useState<string>("All");

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const data = await api.getProjects();
        // Map API response to Component props format
        const mapped = data.map(p => ({
          id: p.ID,
          title: p.title,
          description: p.description,
          techStack: p.tech_stack,
          imageUrl: p.image_url,
          demoUrl: p.demo_url,
          repoUrl: p.repo_url,
          featured: p.is_featured,
        }));
        setProjects(mapped);
      } catch (e) {
        console.error("Failed to load projects", e);
      } finally {
        setLoading(false);
      }
    };
    loadProjects();
  }, []);

  // Extract unique tech stack for filter options
  const allTech = useMemo(() => {
    const techSet = new Set<string>();
    projects.forEach(p => p.techStack.forEach((t: string) => techSet.add(t)));
    return ["All", ...Array.from(techSet).sort()];
  }, [projects]);

  const filteredProjects = useMemo(() => {
    if (selectedTech === "All") return projects;
    return projects.filter(p => p.techStack.includes(selectedTech));
  }, [projects, selectedTech]);

  return (
    <Section>
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-foreground mb-4">Portfolio</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mb-8">
          A collection of projects showcasing my journey and experiments in web development.
        </p>

        {/* Filter Controls */}
        <div className="flex flex-wrap items-center gap-3 pb-4 overflow-x-auto no-scrollbar">
          <div className="flex items-center text-sm font-medium text-muted-foreground mr-2">
            <Filter className="w-4 h-4 mr-2" />
            Filter by:
          </div>
          {allTech.map((tech) => (
            <button
              key={tech}
              onClick={() => setSelectedTech(tech)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                selectedTech === tech
                  ? "bg-primary text-white shadow-md transform scale-105"
                  : "bg-white border border-border text-foreground hover:border-primary/50 hover:bg-primary/5"
              }`}
            >
              {tech}
            </button>
          ))}
        </div>
      </div>
      
      {/* Projects Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Simple skeleton */}
            {[1,2,3].map(i => (
                <div key={i} className="h-64 bg-gray-100 dark:bg-neutral-900 rounded-xl animate-pulse"/>
            ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
            <Link key={project.id} href={`/portfolio/${project.id}`}>
                <ProjectCard project={project} />
            </Link>
            ))}
        </div>
      )}

      {/* No Results Message */}
      {filteredProjects.length === 0 && (
        <div className="text-center py-20 bg-gray-50 rounded-xl border border-dashed border-gray-200">
          <p className="text-muted-foreground">No projects found with the selected technology.</p>
          <button 
            onClick={() => setSelectedTech("All")}
            className="text-primary hover:underline mt-2 font-medium"
          >
            Reset Filter
          </button>
        </div>
      )}
    </Section>
  );
}
