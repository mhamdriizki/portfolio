'use client';
import Hero from "@/components/sections/Hero";
import ProjectCard from "@/components/ui/ProjectCard";
import ActivityItem from "@/components/ui/ActivityItem";
import Section from "@/components/ui/Section";
import { api, Project, Activity } from "@/lib/api";
import { ArrowRight, Loader2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [featuredProjects, setFeaturedProjects] = useState<Project[]>([]);
  const [recentActivities, setRecentActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [projectsData, activitiesData] = await Promise.all([
          api.getProjects(),
          api.getActivities()
        ]);
        
        setFeaturedProjects(projectsData.filter(p => p.is_featured).slice(0, 2));
        setRecentActivities(activitiesData.slice(0, 3));
      } catch (error) {
        console.error("Failed to fetch homepage data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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
        
        {loading ? (
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[1, 2].map(i => (
                    <div key={i} className="h-[400px] w-full bg-gray-200 animate-pulse rounded-xl"></div>
                ))}
            </div>
        ) : (
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               {featuredProjects.map((project) => (
                   <ProjectCard key={project.ID} project={project} detailHref={`/portfolio/${project.ID}`} />
               ))}
                {!loading && featuredProjects.length === 0 && (
                  <div className="col-span-2 text-center py-10 text-muted-foreground">
                    No featured projects found.
                  </div>
                )}
             </div>
        )}
        
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
          {loading ? (
             [1, 2, 3].map(i => (
                 <div key={i} className="h-24 w-full bg-gray-100 animate-pulse rounded-lg"></div>
             ))
          ) : (
              recentActivities.map((activity) => (
                <Link key={activity.ID} href={`/activities/${activity.ID}`} className="block hover:bg-gray-50/50 transition-colors rounded-lg">
                  <ActivityItem activity={activity} />
                </Link>
              ))
          )}
           {!loading && recentActivities.length === 0 && (
                <div className="text-center py-10 text-muted-foreground">
                    No recent activities.
                </div>
           )}
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
