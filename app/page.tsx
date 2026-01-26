import Hero from "@/components/sections/Hero";
import ProjectCard from "@/components/ui/ProjectCard";
import ActivityItem from "@/components/ui/ActivityItem";
import Section from "@/components/ui/Section";
import { projects } from "@/data/projects";
import { activities } from "@/data/activities";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const featuredProjects = projects.filter(p => p.featured).slice(0, 2);
  const recentActivities = activities.slice(0, 3);

  return (
    <>
      <Hero />
      
      <Section className="bg-gray-50/50">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl font-bold text-foreground">Featured Work</h2>
            <p className="text-muted-foreground mt-2">Projects I'm most proud of.</p>
          </div>
          <Link href="/portfolio" className="hidden md:flex items-center text-primary font-medium hover:text-primary-dark transition-colors">
            View all projects
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {featuredProjects.map((project) => (
            <Link key={project.id} href={`/portfolio/${project.id}`}>
              <ProjectCard project={project} />
            </Link>
          ))}
        </div>
        
        <div className="mt-8 md:hidden text-center">
          <Link href="/portfolio" className="inline-flex items-center text-primary font-medium hover:text-primary-dark transition-colors">
            View all projects
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </Section>
      
      <Section>
        <div className="flex justify-between items-end mb-12">
           <div>
            <h2 className="text-3xl font-bold text-foreground">Recent Activities</h2>
            <p className="text-muted-foreground mt-2">What I've been up to lately.</p>
          </div>
          <Link href="/activities" className="hidden md:flex items-center text-primary font-medium hover:text-primary-dark transition-colors">
            View all updates
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
        
        <div className="space-y-4">
          {recentActivities.map((activity) => (
            <Link key={activity.id} href={`/activities/${activity.id}`} className="block hover:bg-gray-50/50 transition-colors rounded-lg">
              <ActivityItem activity={activity} />
            </Link>
          ))}
        </div>
        
        <div className="mt-8 md:hidden text-center">
           <Link href="/activities" className="inline-flex items-center text-primary font-medium hover:text-primary-dark transition-colors">
            View all updates
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </Section>
    </>
  );
}
