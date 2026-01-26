import { Project } from "@/lib/types";

export const projects: Project[] = [
  {
    id: "1",
    title: "TMAI Corporate Website",
    description: "Professional corporate landing page for TMAI, delivering a clean and authoritative digital presence.",
    techStack: ["Angular", "TypeScript", "SCSS"],
    link: "https://tmai.co.id",
    featured: true,
  },
  {
    id: "2",
    title: "Edutop Landing Page",
    description: "Modern landing page for Edutop, designed to effectively communicate educational services and convert visitors.",
    techStack: ["Angular", "TypeScript", "SCSS"],
    link: "https://edutop.id",
    featured: true,
  },
  {
    id: "3",
    title: "Saji Kitchen",
    description: "Corporate landing page for Saji Kitchen, highlighting culinary services with an appetizing and professional design.",
    techStack: ["Angular", "TypeScript", "SCSS"],
    link: "https://saji-kitchen.artela.id",
    featured: true,
  },
  {
    id: "4",
    title: "Artela Corporate",
    description: "Official corporate website for Artela, showcasing the company's portfolio and technology solutions.",
    techStack: ["Angular", "TypeScript", "SCSS"],
    link: "https://artela.id",
    featured: true,
  },
  {
    id: "5",
    title: "Saji Office Dashboard",
    description: "Comprehensive back-office management system for Saji Kitchen, featuring order management and analytics.",
    techStack: ["Next.js", "Java Spring Boot", "PostgreSQL"],
    link: "https://saji-office.artela.id",
    featured: false,
  },
  {
    id: "6",
    title: "Artela Back Office",
    description: "Unified internal tool for Artela's operations, built for high performance and scalability using Go.",
    techStack: ["Angular", "Go (Golang)", "Microservices"],
    link: "https://office.artela.id",
    featured: false,
  }
];
