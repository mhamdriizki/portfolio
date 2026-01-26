import { WorkExperience } from "@/lib/types";
import { Briefcase } from "lucide-react";

interface WorkHistoryProps {
  experience: WorkExperience[];
}

export default function WorkHistory({ experience }: WorkHistoryProps) {
  return (
    <div className="relative border-l border-gray-200 dark:border-gray-700 ml-3">
      {experience.map((job, index) => (
        <div key={index} className="mb-10 ml-6">
          <span className="absolute flex items-center justify-center w-6 h-6 bg-primary/10 rounded-full -left-3 ring-8 ring-white dark:ring-gray-900">
            <Briefcase className="w-3 h-3 text-primary" />
          </span>
          <h3 className="flex items-center mb-1 text-lg font-semibold text-gray-900 dark:text-white">
            {job.role} 
            <span className="bg-primary/10 text-primary-dark text-sm font-medium mr-2 px-2.5 py-0.5 rounded ml-3">
              {job.company}
            </span>
          </h3>
          <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
            {job.period}
          </time>
          <p className="mb-4 text-base font-normal text-muted-foreground">
            {job.description}
          </p>
        </div>
      ))}
    </div>
  );
}
