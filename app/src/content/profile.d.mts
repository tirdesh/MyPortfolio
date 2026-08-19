// Types for profile.mjs, which is plain JS so the serverless function can
// import it without a compile step.
export interface TimelineEntry {
  subtitle: string;
  content: string;
  date: string;
  details: string[];
}

export const identity: {
  name: string;
  title: string;
  location: string;
  email: string;
  phone: string;
  linkedin: string;
  github: string;
  blog: string;
  yearsExperience: string;
};

export const education: TimelineEntry[];
export const experience: TimelineEntry[];
export const skillsSummary: string[];

export function buildResumeContext(
  projects?: Array<{ title: string; description: string; tech: string[] }>
): string;
