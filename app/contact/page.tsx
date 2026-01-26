import Section from "@/components/ui/Section";
import { profile } from "@/data/profile";
import { Mail, MapPin } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Contact | Muhammad Rizki",
  description: "Get in touch with Muhammad Rizki.",
};

export default function ContactPage() {
  return (
    <Section>
      <div className="max-w-2xl">
        <h1 className="text-4xl font-bold text-foreground mb-6">Get in Touch</h1>
        <p className="text-lg text-muted-foreground mb-12">
          I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
        </p>

        <div className="space-y-8">
          <div className="flex items-start space-x-4">
            <div className="bg-primary/10 p-3 rounded-lg text-primary">
              <Mail className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">Email</h3>
              <p className="text-muted-foreground mb-2">
                The best way to contact me is via email.
              </p>
              <Link 
                href={`mailto:${profile.email}`}
                className="text-primary hover:text-primary-dark font-medium transition-colors"
              >
                {profile.email}
              </Link>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="bg-primary/10 p-3 rounded-lg text-primary">
              <MapPin className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">Location</h3>
              <p className="text-muted-foreground">
                {profile.location}
              </p>
            </div>
          </div>
        </div>
        
        <div className="mt-16 bg-gray-50 border border-border rounded-xl p-8 text-center">
            <p className="text-muted-foreground mb-6">
                Prefer social media? You can also find me on these platforms.
            </p>
            <div className="flex justify-center space-x-6">
                {profile.socials.map((social) => (
                    <Link
                        key={social.platform}
                        href={social.url}
                        className="text-foreground hover:text-primary transition-colors font-medium"
                    >
                        {social.platform}
                    </Link>
                ))}
            </div>
        </div>
      </div>
    </Section>
  );
}
