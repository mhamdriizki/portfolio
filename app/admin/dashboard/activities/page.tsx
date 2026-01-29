'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { api, Activity } from '@/lib/api';
import { Trash2, Plus, Loader2 } from 'lucide-react';

export default function AdminActivities() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchActivities = async () => {
    try {
      const data = await api.getActivities();
      setActivities(data);
    } catch (error) {
      console.error('Failed to fetch activities', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this story?')) {
      await api.deleteActivity(id);
      fetchActivities();
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex justify-between items-end mb-12 border-b border-border pb-4">
        <h1 className="text-4xl font-bold text-gray-900 tracking-tight">Your stories</h1>
        <div className="flex gap-4">
           <Link 
            href="/admin/dashboard/activities/new"
            className="px-5 py-2.5 bg-green-600 text-white rounded-full font-medium hover:bg-green-700 transition-colors shadow-sm shadow-green-200"
           >
            Write a story
          </Link>
        </div>
      </div>

      <div className="space-y-2">
        {loading ? (
             Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="py-6 border-b border-border/40 animate-pulse">
                <div className="h-6 bg-gray-100 rounded w-1/3 mb-2"></div>
                <div className="h-4 bg-gray-50 rounded w-1/4"></div>
            </div>
            ))
        ) : activities.length === 0 ? (
            <div className="text-center py-20 text-gray-500">
                <p>No stories yet.</p>
            </div>
        ) : (
          activities.map((activity) => (
            <div key={activity.ID} className="group py-6 border-b border-gray-100 hover:border-gray-200 transition-colors flex justify-between items-start">
               <div className="flex-1 pr-8">
                  <Link href={`/admin/dashboard/activities/${activity.ID}/edit`}>
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors cursor-pointer">
                        {activity.title}
                    </h3>
                  </Link>
                  <div className="flex items-center gap-3 text-sm text-gray-500">
                    <span className="uppercase tracking-wider text-xs font-medium">{activity.type}</span>
                    {(activity.date || activity.CreatedAt) && (
                      <>
                        <span>·</span>
                        <span>{new Date((activity.date || activity.CreatedAt) as string).toLocaleDateString()}</span>
                      </>
                    )}
                    {activity.link && (
                         <>
                        <span>·</span>
                         <span className="truncate max-w-[200px]">{activity.link}</span>
                        </>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Link 
                        href={`/admin/dashboard/activities/${activity.ID}/edit`}
                        className="p-2 text-gray-400 hover:text-gray-900 transition-colors"
                        title="Edit"
                    >
                         Edit
                    </Link>
                    <button
                        onClick={() => handleDelete(activity.ID)}
                        className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                        title="Delete"
                    >
                        <Trash2 size={18} />
                    </button>
                    {/* View Button */}
                     <Link
                        href={`/activities/${activity.ID}`}
                        target="_blank"
                         className="p-2 text-gray-400 hover:text-green-600 transition-colors"
                         title="View Public"
                     >
                         View
                     </Link>
                </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
