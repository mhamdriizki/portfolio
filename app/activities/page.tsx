'use client';

import { useState, useEffect } from "react";
import ActivityItem from "@/components/ui/ActivityItem";
import Section from "@/components/ui/Section";
import Link from "next/link";
import { api, Activity } from "@/lib/api";

export default function ActivitiesPage() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadActivities = async () => {
      try {
        const data = await api.getActivities();
        // Map if necessary, but api.ts Project interface matches component expectations mostly
        setActivities(data);
      } catch (error) {
        console.error("Failed to fetch activities", error);
      } finally {
        setLoading(false);
      }
    };
    loadActivities();
  }, []);

  return (
    <Section>
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-foreground mb-4">Activities</h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          My latest blog posts, videos, courses, and other professional updates.
        </p>
      </div>
      
      <div className="space-y-4 max-w-4xl">
        {loading ? (
          // Skeleton Loader
          Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex gap-4 py-6 border-b border-border/50 animate-pulse">
              <div className="w-32 flex-shrink-0 space-y-2">
                <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-24"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-16"></div>
              </div>
              <div className="flex-grow space-y-3">
                <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-full"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-2/3"></div>
              </div>
            </div>
          ))
        ) : (
          activities.map((activity) => (
            <div 
              key={activity.ID} 
              className="block cursor-pointer transition-opacity hover:opacity-80"
            >
              <ActivityItem activity={activity} />
            </div>
          ))
        )}
      </div>
    </Section>
  );
}
