'use client';

import { useEffect, useState, useRef } from 'react';
import { api, Project, UPLOADS_URL, toBase64 } from '@/lib/api';
import { Trash2, Plus, Edit, Image as ImageIcon, Loader2 } from 'lucide-react';
import Image from 'next/image';

export default function AdminProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [formProject, setFormProject] = useState<Partial<Project>>({
    title: '',
    description: '',
    tech_stack: [],
    demo_url: '',
    repo_url: '',
    is_featured: false,
    image_base64: '',
    image_url: '',
  });

  const fetchProjects = async () => {
    try {
      const data = await api.getProjects();
      setProjects(data);
    } catch (error) {
      console.error('Failed to fetch projects', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this project?')) {
      await api.deleteProject(id);
      fetchProjects();
    }
  };

  const handleEdit = (project: Project) => {
    setEditingId(project.ID);
    setFormProject({
        ...project,
        tech_stack: project.tech_stack || [],
        image_base64: '' // Don't prefill base64, use image_url for preview
    });
    setShowForm(true);
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const base64 = await toBase64(file);
        setFormProject({ ...formProject, image_base64: base64 });
      } catch (err) {
        console.error("Failed to convert file", err);
      }
    }
  };

  const handleCreateOrUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        ...formProject,
        tech_stack: typeof formProject.tech_stack === 'string' 
            ? (formProject.tech_stack as string).split(',').map((s: string) => s.trim()) 
            : formProject.tech_stack
      };

      if (editingId) {
        await api.updateProject(editingId, payload);
      } else {
        await api.createProject(payload);
      }

      setShowForm(false);
      setEditingId(null);
      setFormProject({
        title: '',
        description: '',
        tech_stack: [],
        demo_url: '',
        repo_url: '',
        is_featured: false,
        image_base64: '',
        image_url: '',
      });
      fetchProjects();
    } catch (error) {
      alert(`Failed to ${editingId ? 'update' : 'create'} project`);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const cancelEdit = () => {
    setShowForm(false);
    setEditingId(null);
    setFormProject({
        title: '',
        description: '',
        tech_stack: [],
        demo_url: '',
        repo_url: '',
        is_featured: false,
        image_base64: '',
        image_url: '',
      });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-foreground">Projects</h1>
        <button
          onClick={() => {
              setEditingId(null);
              setFormProject({
                title: '',
                description: '',
                tech_stack: [],
                demo_url: '',
                repo_url: '',
                is_featured: false,
                image_base64: '',
                image_url: '',
              });
              setShowForm(!showForm);
          }}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-opacity shadow-sm"
        >
          <Plus size={18} />
          <span>Add Project</span>
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleCreateOrUpdate} className="mb-8 p-6 bg-white rounded-xl border border-border shadow-sm space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Title"
              value={formProject.title}
              onChange={(e) => setFormProject({ ...formProject, title: e.target.value })}
              className="px-4 py-2 rounded-lg border border-border bg-white focus:ring-2 focus:ring-primary/20 outline-none transition-all"
              required
            />
            <input
              type="text"
              placeholder="Tech Stack (comma separated)"
              value={Array.isArray(formProject.tech_stack) ? formProject.tech_stack.join(', ') : formProject.tech_stack}
              onChange={(e) => setFormProject({ ...formProject, tech_stack: e.target.value.split(',') })}
              className="px-4 py-2 rounded-lg border border-border bg-white focus:ring-2 focus:ring-primary/20 outline-none transition-all"
            />
          </div>
          
          <textarea
            placeholder="Description"
            value={formProject.description}
            onChange={(e) => setFormProject({ ...formProject, description: e.target.value })}
            className="w-full px-4 py-2 rounded-lg border border-border bg-white focus:ring-2 focus:ring-primary/20 outline-none transition-all h-32"
            required
          />

           {/* Image Upload */}
          <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:border-primary/50 transition-colors"
               onClick={() => fileInputRef.current?.click()}
          >
             <input 
                type="file" 
                hidden 
                ref={fileInputRef} 
                onChange={handleImageChange} 
                accept="image/*"
             />
             {formProject.image_base64 ? (
                 <img src={formProject.image_base64} alt="Preview" className="max-h-48 rounded-lg shadow-md object-contain" />
             ) : formProject.image_url ? (
                 <img src={`${UPLOADS_URL}/${formProject.image_url}`} alt="Current" className="max-h-48 rounded-lg shadow-md object-contain" />
             ) : (
                <div className="text-center text-gray-500">
                    <ImageIcon size={32} className="mx-auto mb-2 opacity-50" />
                    <span className="text-sm">Click to upload cover image</span>
                </div>
             )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Demo URL"
              value={formProject.demo_url}
              onChange={(e) => setFormProject({ ...formProject, demo_url: e.target.value })}
              className="px-4 py-2 rounded-lg border border-border bg-white focus:ring-2 focus:ring-primary/20 outline-none transition-all"
            />
             <input
              type="text"
              placeholder="Repo URL"
              value={formProject.repo_url}
              onChange={(e) => setFormProject({ ...formProject, repo_url: e.target.value })}
              className="px-4 py-2 rounded-lg border border-border bg-white focus:ring-2 focus:ring-primary/20 outline-none transition-all"
            />
          </div>
           <label className="flex items-center gap-2 text-sm text-gray-600">
            <input 
                type="checkbox"
                checked={formProject.is_featured}
                onChange={(e) => setFormProject({ ...formProject, is_featured: e.target.checked })}
                className="rounded border-gray-300 text-primary focus:ring-primary"
            />
            Featured Project
          </label>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={cancelEdit}
              className="px-4 py-2 text-muted-foreground hover:bg-gray-100 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark shadow-sm flex items-center gap-2"
            >
              {loading && <Loader2 size={16} className="animate-spin" />}
              {editingId ? 'Update Project' : 'Save Project'}
            </button>
          </div>
        </form>
      )}

      {loading && !projects.length ? (
        <p className="text-muted-foreground">Loading...</p>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {projects.map((project) => (
            <div key={project.ID} className="flex items-center justify-between p-4 bg-white rounded-xl border border-border shadow-sm hover:shadow-md transition-shadow">
               <div className="flex items-center gap-4">
                  {project.image_url && (
                    <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
                        <img 
                            src={`${UPLOADS_URL}/${project.image_url}`} 
                            alt={project.title}
                            className="w-full h-full object-cover"
                        />
                    </div>
                  )}
                  <div>
                    <h3 className="font-semibold text-lg text-foreground">{project.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-1">{project.description}</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                        {project.tech_stack.map(tech => (
                            <span key={tech} className="text-xs bg-gray-100 px-1.5 py-0.5 rounded text-gray-600 border border-gray-200">{tech}</span>
                        ))}
                    </div>
                  </div>
               </div>
              <div className="flex items-center gap-2">
                 <button
                  onClick={() => handleEdit(project)}
                  className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                >
                  <Edit size={18} />
                </button>
                <button
                  onClick={() => handleDelete(project.ID)}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
