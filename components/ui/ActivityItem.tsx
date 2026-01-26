'use client';

import { Activity } from "@/lib/types";
import Link from "next/link";
import { Calendar, ArrowUpRight } from "lucide-react";

interface ActivityItemProps {
  activity: Activity;
}

export default function ActivityItem({ activity }: ActivityItemProps) {
  const formattedDate = new Date(activity.date).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
    day: 'numeric'
  });

  return (
    <div className="flex flex-col sm:flex-row gap-4 py-6 border-b border-border/50 last:border-0 hover:bg-gray-50/50 transition-colors rounded-lg px-4 -mx-4">
      <div className="sm:w-32 flex-shrink-0">
        <div className="flex items-center text-sm text-muted-foreground">
          <Calendar className="mr-2 h-3.5 w-3.5" />
          <time dateTime={activity.date}>{formattedDate}</time>
        </div>
        <span className="inline-block mt-2 px-2 py-0.5 rounded text-xs font-medium bg-secondary/10 text-secondary-foreground border border-secondary/20 capitalize">
          {activity.type}
        </span>
      </div>
      
      <div className="flex-grow">
        <h4 className="text-lg font-semibold text-foreground mb-2 flex items-center max-w-fit group">
          {activity.link ? (
            <Link 
              href={activity.link} 
              target="_blank" 
              className="hover:text-primary transition-colors flex items-center"
              onClick={(e) => e.stopPropagation()} // Prevent modal opening when clicking title link
            >
              {activity.title}
              <ArrowUpRight className="ml-1 h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
          ) : (
            activity.title
          )}
        </h4>
        <p className="text-muted-foreground text-sm leading-relaxed">
          {activity.description}
        </p>
      </div>
    </div>
  );
}
