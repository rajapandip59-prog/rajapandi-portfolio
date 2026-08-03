export interface Profile {
  name: string;
  title: string;
  tagline: string;
  bio: string;
  heroDescription: string;
  profilePhoto: string;
  coverImage: string;
  location: string;
  email: string;
  phone: string;
  availabilityStatus: string;
  stats: {
    projects: string;
    clients: string;
    awards: string;
    experience: string;
  };
}

export interface AboutData {
  aboutText: string;
  journeyText1: string;
  journeyText2: string;
  highlights: {
    title: string;
    description: string;
    iconName: string;
  }[];
}

export interface Skill {
  id: string;
  name: string;
  level: number;
  category: string;
  iconName: string;
  order: number;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  location: string;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
  description: string[];
  techStack: string[];
  order: number;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  fieldOfStudy: string;
  startYear: string;
  endYear: string;
  grade: string;
  achievements: string;
  order: number;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  gradient?: string;
  image: string;
  githubUrl: string;
  liveUrl: string;
  category: string;
  isFeatured: boolean;
  isVisible: boolean;
  order: number;
}

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  credentialId?: string;
  credentialUrl: string;
  image: string;
  gradient?: string;
  order: number;
}

export interface GalleryItem {
  id: string;
  title: string;
  caption: string;
  imageUrl: string;
  category: string;
  dateAdded: string;
  order: number;
}

export interface ResumeData {
  fileUrl: string;
  fileName: string;
  lastUpdated: string;
  title: string;
  description: string;
}

export interface ContactInfo {
  email: string;
  phone: string;
  address: string;
  googleMapsEmbed: string;
  businessHours: string;
}

export interface SocialLink {
  id: string;
  name: string;
  iconName: string;
  username: string;
  subtext: string;
  gradient: string;
  url: string;
  order: number;
}

export interface Message {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
  isRead: boolean;
}

export interface SEOSettings {
  metaTitle: string;
  metaDescription: string;
  keywords: string;
  ogImage: string;
  twitterHandle: string;
}

export interface Settings {
  adminEmail: string;
  siteName: string;
  theme: "dark" | "light" | "system";
  lastBackupDate?: string;
}
