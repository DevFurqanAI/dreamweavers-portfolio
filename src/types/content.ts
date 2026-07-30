export type ContentStatus = "verified" | "needs-client-approval";

export type ExperienceStage =
  | "hero"
  | "services"
  | "work"
  | "clients"
  | "process"
  | "industries"
  | "team"
  | "contact";

export interface Service {
  slug: string;
  title: string;
  shortTitle: string;
  summary: string;
  signal: string;
  status: ContentStatus;
}

export interface TeamMember {
  name: string;
  role: string;
  image: string;
  status: ContentStatus;
}

export interface ClientLogo {
  name: string;
  image: string;
  status: ContentStatus;
}

export interface ProjectConcept {
  index: string;
  title: string;
  summary: string;
  services: string[];
  status: ContentStatus;
}

export interface IndustryMode {
  id: string;
  index: string;
  title: string;
  signal: string;
  summary: string;
  focus: readonly string[];
  accent: string;
}
