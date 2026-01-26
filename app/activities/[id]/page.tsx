import Section from "@/components/ui/Section";
import { activities } from "@/data/activities";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar, ExternalLink } from "lucide-react";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return activities.map((activity) => ({
    id: activity.id,
  }));
}

export default async function ActivityDetailPage(props: PageProps) {
  const params = await props.params;
  const activity = activities.find((a) => a.id === params.id);

  if (!activity) {
    notFound();
  }

  const formattedDate = new Date(activity.date).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <Section className="max-w-4xl">
      <Link 
        href="/activities"
        className="inline-flex items-center text-muted-foreground hover:text-primary mb-8 transition-colors group"
      >
        <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
        Back to Activities
      </Link>

      <div className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center gap-4 text-sm">
            <span className="px-3 py-1 rounded-full bg-primary/10 text-primary font-medium capitalize">
              {activity.type}
            </span>
            <div className="flex items-center text-muted-foreground">
              <Calendar className="w-4 h-4 mr-2" />
              {formattedDate}
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
            {activity.title}
          </h1>
        </div>

        <div className="prose prose-lg text-muted-foreground max-w-none">
          <p className="lead">{activity.description}</p>
          <div className="bg-gray-50 border border-border rounded-xl p-8 my-8 text-center italic">
             More detailed content for this activity is coming soon.
          </div>
        </div>

        {activity.link && (
          <div className="pt-6 border-t border-border">
            <Link 
              href={activity.link}
              target="_blank"
              className="inline-flex items-center text-primary font-medium hover:underline text-lg"
            >
              View Original Source
              <ExternalLink className="ml-2 h-5 w-5" />
            </Link>
          </div>
        )}
      </div>
    </Section>
  );
}
