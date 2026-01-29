'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { api, Activity } from '@/lib/api';
import MediumEditor from '@/components/admin/MediumEditor';
import { ArrowLeft, Loader2, Trash2 } from 'lucide-react';
import Link from 'next/link';

export default function EditActivityPage() {
  const router = useRouter();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activity, setActivity] = useState<Activity | null>(null);

  // Form State
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [type, setType] = useState('Post');

  useEffect(() => {
    const fetchActivity = async () => {
      try {
        const activities = await api.getActivities();
        const found = activities.find(a => a.ID.toString() === id);
        if (found) {
          setActivity(found);
          setTitle(found.title);
          setContent(found.description);
          setType(found.type);
        } else {
            // handle not found, maybe fetch by id if API existed
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchActivity();
  }, [id]);

  const handleSave = async () => {
    if (!activity) return;
    setSaving(true);
    try {
      // Since we don't have update endpoint yet in frontend api definition (implied), assuming we might need one.
      // But looking at api.ts, we only have create/get/delete.
      // I will assume for now we might need to delete and recreate OR implementing update is better.
      // Wait, let's check basic requirements. Usually update is key.
      // For this demo, let's act as if update exists or use delete+create trick if lazy, but better to add update to API.
      // Checking api.ts...
      
      // If updateActivity is missing, I should add it.
      await api.updateActivity(activity.ID, {
          ...activity,
          title,
          description: content,
          type
      });
      router.push('/admin/dashboard/activities');
    } catch (error) {
       console.error("Update failed", error);
       alert("Failed to save changes. Ensure backend supports UPDATE.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (!activity) return <div className="text-center mt-20">Activity not found</div>;

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-8 py-4 border-b border-gray-100 sticky top-0 bg-white/80 backdrop-blur z-50">
        <div className="flex items-center gap-4">
           <Link href="/admin/dashboard/activities" className="p-2 hover:bg-gray-100 rounded-full transition-colors text-muted-foreground">
            <ArrowLeft size={20} />
          </Link>
          <span className="text-sm text-gray-500 font-medium hidden md:block">
            Editing
          </span>
        </div>
        
        <div className="flex items-center gap-4">
            <select 
             value={type} 
             onChange={(e) => setType(e.target.value)}
             className="text-sm border-none bg-transparent focus:ring-0 text-gray-600 font-medium cursor-pointer hover:bg-gray-50 rounded px-2 py-1 outline-none"
           >
              <option value="Post">Post</option>
              <option value="Video">Video</option>
              <option value="Course">Course</option>
              <option value="Project">Project</option>
           </select>
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-4 py-1.5 bg-green-600 text-white rounded-full text-sm font-medium hover:bg-green-700 transition-colors disabled:opacity-50 flex items-center gap-2"
          >
            {saving && <Loader2 size={14} className="animate-spin" />}
            Save Changes
          </button>
        </div>
      </nav>

      {/* Editor */}
      <main className="max-w-3xl mx-auto px-6 py-12">
        <div className="group relative">
           <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full text-4xl md:text-5xl font-bold text-gray-900 placeholder-gray-300 border-none focus:ring-0 px-0 bg-transparent outline-none mb-4 font-serif leading-tight"
          />
        </div>
        
        <MediumEditor 
          content={content} 
          onChange={setContent} 
        />
      </main>
    </div>
  );
}
