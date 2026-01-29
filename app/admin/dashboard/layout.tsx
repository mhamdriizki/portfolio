'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { api } from '@/lib/api';
import { LayoutDashboard, Folder, Activity, LogOut, Menu, X } from 'lucide-react';
import { clsx } from 'clsx';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
    const token = api.getToken();
    if (!token) {
      router.push('/admin/login');
    }
  }, [router]);

  // Close sidebar on route change (mobile)
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [pathname]);

  if (!mounted) return null;

  const handleLogout = () => {
    api.logout();
    router.push('/admin/login');
  };

  const navItems = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Projects', href: '/admin/dashboard/projects', icon: Folder },
    { name: 'Activities', href: '/admin/dashboard/activities', icon: Activity },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      {/* Mobile Header */}
      <div className="md:hidden bg-white border-b border-border p-4 flex justify-between items-center sticky top-0 z-20">
         <h1 className="text-lg font-bold font-mono text-primary">Admin Panel</h1>
         <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 text-foreground">
            {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
         </button>
      </div>

      {/* Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
            className="fixed inset-0 bg-black/50 z-10 md:hidden"
            onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={clsx(
          "bg-white border-r border-border fixed md:sticky top-0 h-screen overflow-y-auto z-20 transition-transform duration-300 w-64",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      )}>
        <div className="p-6 hidden md:block">
          <h1 className="text-xl font-bold font-mono text-primary">Admin Panel</h1>
        </div>
        
        {/* Mobile specific header inside sidebar */}
        <div className="p-6 md:hidden flex justify-between items-center border-b border-border mb-2">
            <h1 className="text-xl font-bold font-mono text-primary">Menu</h1>
            <button onClick={() => setIsSidebarOpen(false)}>
                <X size={24} />
            </button>
        </div>

        <nav className="px-4 space-y-2 mt-4 md:mt-0">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={clsx(
                  "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200",
                  isActive 
                    ? "bg-primary/10 text-primary font-medium" 
                    : "text-muted-foreground hover:bg-gray-50 hover:text-foreground"
                )}
              >
                <Icon size={20} />
                <span className="">{item.name}</span>
              </Link>
            );
          })}
        </nav>
        <div className="absolute bottom-0 w-full p-4 border-t border-border bg-white">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 w-full text-red-500 hover:bg-red-50 rounded-lg transition-colors"
          >
            <LogOut size={20} />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 bg-gray-50 min-h-[calc(100vh-64px)] md:min-h-screen text-foreground w-full overflow-x-hidden">
        {children}
      </main>
    </div>
  );
}
