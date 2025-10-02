export interface Project {
  id: number;
  title: string;
  shortDescription: string;
  tech: string[];
  imageUrl: string;
  tags: string[];
}

export interface Skill {
  name: string;
  category: string;
}

export interface Post {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
}

export interface PersonalInfo {
  name: string;
  fullName: string;
  title: string;
  bio: string;
  email: string;
  linkedin: string;
  github: string;
  profileImageUrl: string;
  resumeUrl: string;
}

export interface TimelineItem {
  id: number;
  type: 'work' | 'education' | 'certification';
  title: string;
  organization: string;
  date: string;
  description: string;
}