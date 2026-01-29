'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';
import MediumEditor from '@/components/admin/MediumEditor';
import { ArrowLeft, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';

export default function NewActivityPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [type, setType] = useState('Post');

  const handlePublish = async () => {
    if (!title || !content) {
      alert('Please provide a title and content');
      return;
    }

    setLoading(true);
    try {
      await api.createActivity({
        title,
        description: content,
        type: type,
        date: new Date().toISOString(),
        link: '',
      });
      router.push('/admin/dashboard/activities');
    } catch (error) {
      console.error(error);
      alert('Failed to publish');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-8 py-4 border-b border-gray-100 sticky top-0 bg-white/80 backdrop-blur z-50">
        <div className="flex items-center gap-4">
           <Link href="/admin/dashboard/activities" className="p-2 hover:bg-gray-100 rounded-full transition-colors text-muted-foreground">
            <ArrowLeft size={20} />
          </Link>
          <span className="text-sm text-gray-500 font-medium hidden md:block">
            Draft in {type}
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
            onClick={handlePublish}
            disabled={loading}
            className="px-4 py-1.5 bg-green-600 text-white rounded-full text-sm font-medium hover:bg-green-700 transition-colors disabled:opacity-50 flex items-center gap-2"
          >
            {loading && <Loader2 size={14} className="animate-spin" />}
            Publish
          </button>
        </div>
      </nav>

      {/* Editor Container */}
      <main className="max-w-3xl mx-auto px-6 py-12">
        <div className="group relative">
           <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full text-4xl md:text-5xl font-bold text-gray-900 placeholder-gray-300 border-none focus:ring-0 px-0 bg-transparent outline-none mb-4 font-serif leading-tight"
            autoFocus
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
