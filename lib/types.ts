export interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  link?: string;
  github?: string;
  thumbnail?: string; // Path to image, e.g., '/images/projects/1.jpg'
  featured?: boolean;
}

export interface Activity {
  id: string;
  title: string;
  type: 'blog' | 'video' | 'course' | 'project' | 'other';
  date: string; // ISO date string YYYY-MM-DD
  description: string;
  link?: string;
}

export interface SocialLink {
  platform: string; // 'GitHub', 'LinkedIn', 'Twitter', etc.
  url: string;
}

export interface WorkExperience {
  company: string;
  role: string;
  period: string; // e.g. "2020 - Now"
  description?: string;
  logo?: string;
}

export interface Profile {
  name: string;
  role: string;
  tagline: string;
  summary: string;
  location: string;
  email: string;
  avatar?: string;
  socials: SocialLink[];
  skills: string[];
  experience: WorkExperience[];
}
