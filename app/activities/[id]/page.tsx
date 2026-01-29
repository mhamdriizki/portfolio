'use client';

import { useEffect, useState } from 'react';
import { notFound, useParams } from 'next/navigation';
import { api, Activity } from '@/lib/api';
import Section from '@/components/ui/Section';
import Link from 'next/link';
import { ArrowLeft, Calendar, ArrowUpRight } from 'lucide-react';

export default function ActivityDetailPage() {
  const { id } = useParams();
  const [activity, setActivity] = useState<Activity | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActivity = async () => {
      try {
        const activities = await api.getActivities();
        const found = activities.find(a => a.ID.toString() === id);
        if (found) {
          setActivity(found);
        } else {
            // If API supports getById, use that. For now, filter from list if getById not available public
            // Assuming getActivities returns all recent activities.
            // Ideally backend should have getById public endpoint.
        }
      } catch (error) {
        console.error('Failed to fetch activity', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchActivity();
  }, [id]);

  if (loading) return <div className="min-h-screen pt-24 text-center">Loading...</div>;
  if (!activity) return notFound();

  const formattedDate = new Date(activity.date).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
    day: 'numeric'
  });

  return (
    <Section>
      <div className="max-w-3xl mx-auto">
        <Link 
          href="/activities"
          className="inline-flex items-center text-muted-foreground hover:text-foreground mb-8 transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Activities
        </Link>
        
        <article>
          <header className="mb-8">
            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
              <span className="px-2 py-0.5 rounded text-xs font-medium bg-secondary/10 text-secondary-foreground border border-secondary/20 capitalize">
                {activity.type}
              </span>
              <div className="flex items-center">
                <Calendar className="mr-2 h-4 w-4" />
                <time dateTime={activity.date}>{formattedDate}</time>
              </div>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              {activity.title}
            </h1>

            {activity.link && (
               <a 
                href={activity.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center text-primary hover:underline font-medium"
              >
                Visit Link <ArrowUpRight className="ml-1 h-4 w-4" />
              </a>
            )}
          </header>

          <div 
            className="prose dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: activity.description }}
          />
        </article>
      </div>
    </Section>
  );
}
