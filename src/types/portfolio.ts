export interface PersonalInfo {
  name: string;
  role: string;
  subtitles: string[];
  shortBio: string;
  avatarPlaceholder: string;
  primaryCta: {
    label: string;
    href: string;
  };
  secondaryCta: {
    label: string;
    href: string;
  };
  location?: string;
  status?: string;
}

export interface NavigationItem {
  id: string;
  label: string;
  href: string;
  isExternal?: boolean;
}

export interface SocialLinkItem {
  id: string;
  platform: string;
  url: string;
  iconPlaceholder?: string;
  username?: string;
}

export interface JourneyItem {
  id: string;
  year: string;
  title: string;
  organization: string;
  description: string;
  tags?: string[];
  type?: 'education' | 'experience' | 'milestone';
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  date: string;
  location?: string;
  description: string[];
  technologies: string[];
  link?: string;
}

export interface ProjectItem {
  id: string;
  slug: string;
  number: string;
  title: string;
  shortDescription: string;
  longDescription: string[];
  technologies: string[];
  imagePlaceholder: string;
  githubUrl: string;
  liveUrl?: string;
  category: string;
  year: string;
  highlights?: string[];
  role?: string;
}

export interface SkillCategory {
  id: string;
  name: string;
  description?: string;
  skills: {
    name: string;
    levelPlaceholder?: string;
    iconPlaceholder?: string;
  }[];
}

export interface CodingProfileStatistic {
  label: string;
  value: string | number;
}

export interface CodingProfileItem {
  id: string;
  platform: string;
  logoPlaceholder: string;
  username: string;
  profileUrl: string;
  ctaLabel: string;
  statistics: CodingProfileStatistic[];
}

export interface CertificateItem {
  id: string;
  title: string;
  issuingOrganization: string;
  year: string;
  imagePlaceholder: string;
  certificateUrl: string;
  credentialId: string;
}

export interface AchievementItem {
  id: string;
  title: string;
  organizationOrEvent: string;
  positionOrResult: string;
  year: string;
  description: string;
  certificateOrImagePlaceholder?: string;
  url?: string;
}

export interface ContactInfo {
  email: string;
  location: string;
  availability: string;
  formPlaceholders: {
    name: string;
    email: string;
    message: string;
    submitButton: string;
  };
}

