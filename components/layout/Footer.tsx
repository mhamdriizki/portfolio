import { Github, Linkedin, Twitter, Instagram } from 'lucide-react';
import { profile } from '@/data/profile';
import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-border mt-auto">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex flex-col items-center md:items-start">
            <span className="text-lg font-bold text-primary">Muhammad Rizki</span>
            <p className="text-sm text-muted-foreground mt-1 max-w-sm">
              Empowering businesses with scalable, high-performance technology solutions.
            </p>
          </div>
          
          <div className="flex space-x-6">
            {profile.socials.map((social) => {
              // Simple mapping for icons based on platform name
              let Icon = Github;
              if (social.platform.toLowerCase() === 'linkedin') Icon = Linkedin;
              if (social.platform.toLowerCase() === 'twitter') Icon = Twitter;
              if (social.platform.toLowerCase() === 'instagram') Icon = Instagram;
              
              return (
                <Link 
                  key={social.platform} 
                  href={social.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <span className="sr-only">{social.platform}</span>
                  <Icon className="h-6 w-6" />
                </Link>
              );
            })}
          </div>
        </div>
        <div className="mt-8 border-t border-border pt-8 text-center md:text-left">
          <p className="text-sm text-gray-400">
            &copy; {currentYear} Muhammad Rizki. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
