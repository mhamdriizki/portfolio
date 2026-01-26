import Section from "@/components/ui/Section";
import { profile } from "@/data/profile";
import WorkHistory from "@/components/ui/WorkHistory";

export const metadata = {
  title: "About | Muhammad Rizki",
  description: "Learn more about Muhammad Rizki, a Full Stack Developer.",
};

export default function AboutPage() {
  return (
    <Section>
      <div className="max-w-3xl">
        <h1 className="text-4xl font-bold text-foreground mb-8">About Me</h1>
        
        <div className="prose prose-lg text-muted-foreground mb-12">
          <p className="text-xl leading-relaxed mb-6 font-light text-foreground">
            {profile.summary}
          </p>
          <p className="mb-4">
            I'm a {profile.role} based in {profile.location}. 
            I have a deep passion for building software that solves real-world problems.
            My journey in web development started with a curiosity for how things work on the internet, 
            and it has evolved into a career where I strive for improved user experiences and clean, maintainable code.
          </p>
          <p>
            When I'm not coding, I'm likely exploring new technologies, writing about what I've learned, 
            or contributing to open source.
          </p>
        </div>

        <div className="mb-12">
           <h2 className="text-2xl font-bold text-foreground mb-6">Work Experience</h2>
           <WorkHistory experience={profile.experience} />
        </div>
        
        <div className="border-t border-border pt-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">Skills & Technologies</h2>
          <div className="flex flex-wrap gap-3">
            {profile.skills.map((skill) => (
              <span 
                key={skill}
                className="px-4 py-2 rounded-full bg-white border border-border text-foreground font-medium shadow-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
