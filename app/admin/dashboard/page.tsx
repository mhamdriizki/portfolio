'use client';

import { api } from '@/lib/api';
import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';

export default function DashboardPage() {
  const [stats, setStats] = useState({
    totalProjects: 0,
    featuredProjects: 0,
    totalActivities: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [projects, activities] = await Promise.all([
            api.getProjects(),
            api.getActivities()
        ]);
        setStats({
            totalProjects: projects.length,
            featuredProjects: projects.filter(p => p.is_featured).length,
            totalActivities: activities.length
        });
      } catch (error) {
        console.error("Failed to fetch dashboard stats", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-foreground">Overview</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-white rounded-xl border border-border shadow-sm">
          <h3 className="text-muted-foreground text-sm font-medium">Total Projects</h3>
          {loading ? <Loader2 className="animate-spin mt-2" /> : <p className="text-3xl font-bold mt-2 text-foreground">{stats.totalProjects}</p>}
        </div>
        <div className="p-6 bg-white rounded-xl border border-border shadow-sm">
          <h3 className="text-muted-foreground text-sm font-medium">Featured Projects</h3>
          {loading ? <Loader2 className="animate-spin mt-2" /> : <p className="text-3xl font-bold mt-2 text-foreground">{stats.featuredProjects}</p>}
        </div>
        <div className="p-6 bg-white rounded-xl border border-border shadow-sm">
          <h3 className="text-muted-foreground text-sm font-medium">Total Activities</h3>
          {loading ? <Loader2 className="animate-spin mt-2" /> : <p className="text-3xl font-bold mt-2 text-foreground">{stats.totalActivities}</p>}
        </div>
      </div>
    </div>
  );
}
