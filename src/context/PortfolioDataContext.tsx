import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import {
  Profile,
  AboutData,
  Skill,
  Experience,
  Education,
  Project,
  Certificate,
  GalleryItem,
  ResumeData,
  ContactInfo,
  SocialLink,
  Message,
  SEOSettings,
  Settings,
} from "@/types/cms";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

import profilePhoto from "@/assets/profile-photo.jpeg";
import portfolioCover from "@/assets/portfolio-project-cover.png";

// Default Portfolio Data Seed
export const defaultProfile: Profile = {
  name: "Rajapandi P",
  title: "AI/ML Engineer & Data Scientist",
  tagline: "Building intelligent systems that think, learn, and evolve",
  bio: "I'm an AI Engineer & Data Scientist crafting intelligent systems using Machine Learning, Deep Learning, and Data Analytics to solve real-world problems.",
  heroDescription: "Building intelligent systems using Machine Learning, Deep Learning, and Data Analytics to solve real-world problems.",
  profilePhoto: profilePhoto,
  photoPosition: "center 15%",
  coverImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1200",
  location: "Theni, India",
  email: "rajapandip59@gmail.com",
  phone: "+91 9360410920",
  availabilityStatus: "Available for hire & full-time roles",
  stats: {
    projects: "5+",
    clients: "3+",
    awards: "15+",
    experience: "1 Years",
  },
};

export const defaultAbout: AboutData = {
  aboutText: "I'm an AI Engineer & Data Scientist crafting intelligent systems that think, learn, and evolve. I specialize in Machine Learning, Deep Learning, and building futuristic, scalable AI solutions.",
  journeyText1: "My journey into AI began with a curiosity to understand how machines can think and make decisions using data. As a fresher, I focused on building a strong foundation in Machine Learning, Deep Learning, and data-driven problem solving through continuous learning and practice.",
  journeyText2: "I enjoy working on real-world projects where I convert ideas into practical AI solutions using code and data. Currently, I'm improving my skills by experimenting with new AI technologies and preparing myself for industry-level challenges.",
  highlights: [
    { title: "Christ The King Engineering College", description: "College", iconName: "School" },
    { title: "Artificial Intelligence & Data Science", description: "Branch", iconName: "GraduationCap" },
    { title: "B.Tech", description: "Degree", iconName: "Award" },
    { title: "2022-2026", description: "Year", iconName: "Calendar" },
  ],
};

export const defaultSkills: Skill[] = [
  { id: "1", name: "Python", level: 98, category: "Languages", iconName: "Code", order: 1 },
  { id: "2", name: "React/Next.js", level: 95, category: "Frontend", iconName: "Atom", order: 2 },
  { id: "3", name: "TypeScript", level: 90, category: "Languages", iconName: "Braces", order: 3 },
  { id: "4", name: "Node.js", level: 88, category: "Backend", iconName: "Server", order: 4 },
  { id: "5", name: "Tailwind CSS", level: 90, category: "Frontend", iconName: "Wind", order: 5 },
  { id: "6", name: "MongoDB", level: 85, category: "Database", iconName: "Database", order: 6 },
  { id: "7", name: "PostgreSQL", level: 87, category: "Database", iconName: "Database", order: 7 },
  { id: "8", name: "Three.js", level: 80, category: "3D/Animation", iconName: "Blocks", order: 8 },
  { id: "9", name: "GraphQL", level: 82, category: "Backend", iconName: "Network", order: 9 },
  { id: "10", name: "Docker", level: 71, category: "DevOps", iconName: "Container", order: 10 },
  { id: "11", name: "AWS", level: 60, category: "Cloud", iconName: "Cloud", order: 11 },
  { id: "12", name: "GCP", level: 60, category: "Cloud", iconName: "Cloud", order: 12 },
  { id: "13", name: "Git", level: 92, category: "DevOps", iconName: "GitBranch", order: 13 },
  { id: "14", name: "Framer Motion", level: 92, category: "3D/Animation", iconName: "Sparkles", order: 14 },
];

export const defaultExperiences: Experience[] = [
  {
    id: "exp-1",
    company: "AI Tech Solutions",
    role: "AI / ML Developer Intern",
    location: "Remote",
    startDate: "2024-01",
    endDate: "Present",
    isCurrent: true,
    description: [
      "Developed deep learning models for predictive analytics and computer vision tasks.",
      "Optimized data pipelines using Python, Pandas, and PyTorch.",
      "Integrated machine learning microservices with React web applications.",
    ],
    techStack: ["Python", "PyTorch", "React", "FastAPI", "Docker"],
    order: 1,
  },
];

export const defaultEducation: Education[] = [
  {
    id: "edu-1",
    institution: "Christ The King Engineering College",
    degree: "B.Tech",
    fieldOfStudy: "Artificial Intelligence & Data Science",
    startYear: "2022",
    endYear: "2026",
    grade: "8.5 CGPA",
    achievements: "Specialized in AI models, data structures, and computer science fundamentals.",
    order: 1,
  },
];

export const defaultProjects: Project[] = [
  {
    id: "proj-1",
    title: "Portfolio CMS",
    description: "Full-stack portfolio app powered by modern React, custom CMS admin dashboard, real-time live content management.",
    tech: ["React", "TypeScript", "Tailwind CSS", "Supabase"],
    gradient: "bg-primary",
    image: portfolioCover,
    githubUrl: "https://github.com/rajapandip59-prog/rajapandi-portfolio",
    liveUrl: "https://portfolio.example.com",
    category: "Full Stack",
    isFeatured: true,
    isVisible: true,
    order: 1,
  },
  {
    id: "proj-2",
    title: "AI Analytics Dashboard",
    description: "Machine learning powered analytics platform for business insights and automated trend forecasting.",
    tech: ["React", "Python", "TensorFlow", "D3.js"],
    gradient: "bg-secondary",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1000",
    githubUrl: "https://github.com/rajapandip59-prog/ai-analytics-dashboard",
    liveUrl: "https://ai-analytics.example.com",
    category: "AI/ML",
    isFeatured: true,
    isVisible: true,
    order: 2,
  },
  {
    id: "proj-3",
    title: "Social Media App",
    description: "Real-time social networking platform with video calls, live messaging, and media sharing.",
    tech: ["React Native", "Firebase", "WebRTC"],
    gradient: "bg-accent",
    image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&q=80&w=1000",
    githubUrl: "https://github.com/rajapandip59-prog/social-media-app",
    liveUrl: "https://social.example.com",
    category: "Mobile / Full Stack",
    isFeatured: false,
    isVisible: true,
    order: 3,
  },
  {
    id: "proj-4",
    title: "Crypto Trading Bot",
    description: "Automated cryptocurrency trading system with ML algorithms and algorithmic trade execution.",
    tech: ["Python", "React", "PostgreSQL", "Redis"],
    gradient: "bg-primary",
    image: "https://images.unsplash.com/photo-1621416894569-0f39ed31d247?auto=format&fit=crop&q=80&w=1000",
    githubUrl: "https://github.com/rajapandip59-prog/crypto-trading-bot",
    liveUrl: "https://crypto-bot.example.com",
    category: "AI/ML",
    isFeatured: false,
    isVisible: true,
    order: 4,
  },
];

export const defaultCertificates: Certificate[] = [
  {
    id: "cert-1",
    title: "Oracle Cloud Infrastructure 2023 AI Certified Foundations",
    issuer: "Oracle",
    date: "2024-05-16",
    credentialId: "OCI-AI-2023",
    credentialUrl: "/certificates/Oracle certificate.pdf",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=1000",
    gradient: "bg-primary",
    order: 1,
  },
  {
    id: "cert-2",
    title: "AWS Blockchain Node Runner For BNB Chain",
    issuer: "Binance & AWS",
    date: "2025-09-13",
    credentialId: "AWS-BNB-2025",
    credentialUrl: "/certificates/Binance certificate.pdf",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=1000",
    gradient: "bg-secondary",
    order: 2,
  },
  {
    id: "cert-3",
    title: "AWS Certified Solutions Architect",
    issuer: "Amazon Web Services",
    date: "2023-09-10",
    credentialId: "AWS-SA-883",
    credentialUrl: "/certificates/Rajapandi NM Certificate.pdf",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=1000",
    gradient: "bg-accent",
    order: 3,
  },
];

export const defaultGallery: GalleryItem[] = [
  {
    id: "gal-1",
    title: "AI Workshop Keynote",
    caption: "Presenting machine learning research to student developer community",
    imageUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=1000",
    category: "Events",
    dateAdded: "2024-03-30",
    order: 1,
  },
  {
    id: "gal-2",
    title: "Hackathon Winning Moment",
    caption: "Team building project demo at regional AI hackathon",
    imageUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1000",
    category: "Hackathons",
    dateAdded: "2024-11-22",
    order: 2,
  },
];

export const defaultResume: ResumeData = {
  fileUrl: "/resume.pdf",
  fileName: "Rajapandi_P_Resume.pdf",
  lastUpdated: new Date().toISOString().split("T")[0],
  title: "AI & ML Specialist Resume",
  description: "Comprehensive resume highlighting skills in Artificial Intelligence, Machine Learning, Deep Learning, and Full-Stack Development.",
};

export const defaultContactInfo: ContactInfo = {
  email: "rajapandip59@gmail.com",
  phone: "+91 9360410920",
  address: "Theni, Tamil Nadu, India",
  googleMapsEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d125770.83546777324!2d77.41164805!3d10.01041935!2m3!1f0!1f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b074a3f1246b9a9%3A0x6b10766a50616b67!2sTheni%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
  businessHours: "Mon - Fri: 9:00 AM - 6:00 PM IST",
};

export const defaultSocialLinks: SocialLink[] = [
  { id: "soc-1", name: "GitHub", iconName: "Github", username: "@rajapandip59-prog", subtext: "10K+ followers", gradient: "bg-zinc-900", url: "https://github.com/rajapandip59-prog", order: 1 },
  { id: "soc-2", name: "LinkedIn", iconName: "Linkedin", username: "@rajapandi-p", subtext: "100+ connections", gradient: "bg-blue-700", url: "https://www.linkedin.com/in/rajapandi-p/", order: 2 },
  { id: "soc-3", name: "X", iconName: "X", username: "@RajapandiP70029", subtext: "8K+ followers", gradient: "bg-sky-500", url: "https://twitter.com/RajapandiP70029", order: 3 },
  { id: "soc-4", name: "Instagram", iconName: "Instagram", username: "@creative", subtext: "3K+ followers", gradient: "bg-pink-600", url: "https://instagram.com", order: 4 },
  { id: "soc-5", name: "YouTube", iconName: "Youtube", username: "@channel", subtext: "2K+ subscribers", gradient: "bg-red-600", url: "https://youtube.com", order: 5 },
  { id: "soc-6", name: "Email", iconName: "Mail", username: "rajapandip59@gmail.com", subtext: "Always available", gradient: "bg-teal-600", url: "mailto:rajapandip59@gmail.com", order: 6 },
];

export const defaultMessages: Message[] = [
  {
    id: "msg-1",
    name: "Alex Johnson",
    email: "alex@techinnovations.io",
    subject: "AI/ML Project Opportunity",
    message: "Hi Rajapandi, we loved your portfolio! We are looking for an AI Engineer to join our machine learning team. Let's connect!",
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    isRead: false,
  },
];

export const defaultSEO: SEOSettings = {
  metaTitle: "Rajapandi P | AI & Software Developer Portfolio",
  metaDescription: "Official portfolio of Rajapandi P, AI & Software Developer specializing in Machine Learning, Computer Vision, Deep Learning, and Full Stack Web Development.",
  keywords: "Rajapandi P, Rajapandi, AI Developer, Software Developer, Machine Learning, Computer Vision, Deep Learning, Data Scientist, Full Stack Developer, React, Python",
  ogImage: "https://rajapandi.vercel.app/og-image.png",
  twitterHandle: "@RajapandiP70029",
};

export const defaultSettings: Settings = {
  adminEmail: "rajapandip59@gmail.com",
  siteName: "Rajapandi P Portfolio",
  theme: "dark",
  lastBackupDate: new Date().toISOString().split("T")[0],
};

export const STORAGE_KEYS = {
  PROFILE: "cms_profile",
  ABOUT: "cms_about",
  SKILLS: "cms_skills",
  EXPERIENCES: "cms_experiences",
  EDUCATION: "cms_education",
  PROJECTS: "cms_projects",
  CERTIFICATES: "cms_certificates",
  GALLERY: "cms_gallery",
  RESUME: "cms_resume",
  CONTACT: "cms_contact",
  SOCIAL: "cms_social",
  MESSAGES: "cms_messages",
  SEO: "cms_seo",
  SETTINGS: "cms_settings",
};

// Singleton UUIDs for Supabase single-row tables (profiles, about_data, etc.)
const SINGLETON_UUIDS = {
  PROFILE: "00000000-0000-0000-0000-000000000001",
  ABOUT: "00000000-0000-0000-0000-000000000002",
  CONTACT: "00000000-0000-0000-0000-000000000003",
  SEO: "00000000-0000-0000-0000-000000000004",
  RESUME: "00000000-0000-0000-0000-000000000005",
};

// Helper: Read synchronously from LocalStorage with safe fallback
const getStoredItem = <T>(key: string, fallback: T): T => {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw);
    return parsed !== null && parsed !== undefined ? parsed : fallback;
  } catch (err) {
    console.warn(`Error reading ${key} from localStorage:`, err);
    return fallback;
  }
};

interface PortfolioDataContextType {
  profile: Profile;
  about: AboutData;
  skills: Skill[];
  experiences: Experience[];
  education: Education[];
  projects: Project[];
  certificates: Certificate[];
  gallery: GalleryItem[];
  resume: ResumeData;
  contactInfo: ContactInfo;
  socialLinks: SocialLink[];
  messages: Message[];
  seoSettings: SEOSettings;
  settings: Settings;
  isLoading: boolean;
  
  updateProfile: (data: Profile) => Promise<void>;
  updateAbout: (data: AboutData) => Promise<void>;
  
  saveSkill: (skill: Skill) => Promise<void>;
  deleteSkill: (id: string) => Promise<void>;
  reorderSkills: (newSkills: Skill[]) => Promise<void>;
  
  saveExperience: (exp: Experience) => Promise<void>;
  deleteExperience: (id: string) => Promise<void>;
  reorderExperiences: (newExps: Experience[]) => Promise<void>;

  saveEducation: (edu: Education) => Promise<void>;
  deleteEducation: (id: string) => Promise<void>;
  reorderEducation: (newEdu: Education[]) => Promise<void>;
  
  saveProject: (proj: Project) => Promise<void>;
  deleteProject: (id: string) => Promise<void>;
  reorderProjects: (newProjs: Project[]) => Promise<void>;
  
  saveCertificate: (cert: Certificate) => Promise<void>;
  deleteCertificate: (id: string) => Promise<void>;
  reorderCertificates: (newCerts: Certificate[]) => Promise<void>;
  
  saveGalleryItem: (item: GalleryItem) => Promise<void>;
  deleteGalleryItem: (id: string) => Promise<void>;
  reorderGallery: (newItems: GalleryItem[]) => Promise<void>;

  updateResume: (data: ResumeData) => Promise<void>;
  updateContactInfo: (data: ContactInfo) => Promise<void>;
  
  saveSocialLink: (link: SocialLink) => Promise<void>;
  deleteSocialLink: (id: string) => Promise<void>;
  reorderSocialLinks: (newLinks: SocialLink[]) => Promise<void>;

  addMessage: (msg: Omit<Message, "id" | "createdAt" | "isRead">) => Promise<void>;
  toggleMessageRead: (id: string) => Promise<void>;
  deleteMessage: (id: string) => Promise<void>;

  updateSEO: (data: SEOSettings) => Promise<void>;
  updateSettings: (data: Settings) => Promise<void>;
  
  exportDataJSON: () => string;
  importDataJSON: (jsonString: string) => boolean;
  resetToDefaults: () => void;
}

const PortfolioDataContext = createContext<PortfolioDataContextType | undefined>(undefined);

export const PortfolioDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Synchronous initial state: immediately read user changes from localStorage if available
  const [profile, setProfile] = useState<Profile>(() => getStoredItem(STORAGE_KEYS.PROFILE, defaultProfile));
  const [about, setAbout] = useState<AboutData>(() => getStoredItem(STORAGE_KEYS.ABOUT, defaultAbout));
  const [skills, setSkills] = useState<Skill[]>(() => getStoredItem(STORAGE_KEYS.SKILLS, defaultSkills));
  const [experiences, setExperiences] = useState<Experience[]>(() => getStoredItem(STORAGE_KEYS.EXPERIENCES, defaultExperiences));
  const [education, setEducation] = useState<Education[]>(() => getStoredItem(STORAGE_KEYS.EDUCATION, defaultEducation));
  const [projects, setProjects] = useState<Project[]>(() => getStoredItem(STORAGE_KEYS.PROJECTS, defaultProjects));
  const [certificates, setCertificates] = useState<Certificate[]>(() => getStoredItem(STORAGE_KEYS.CERTIFICATES, defaultCertificates));
  const [gallery, setGallery] = useState<GalleryItem[]>(() => getStoredItem(STORAGE_KEYS.GALLERY, defaultGallery));
  const [resume, setResume] = useState<ResumeData>(() => getStoredItem(STORAGE_KEYS.RESUME, defaultResume));
  const [contactInfo, setContactInfo] = useState<ContactInfo>(() => getStoredItem(STORAGE_KEYS.CONTACT, defaultContactInfo));
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>(() => getStoredItem(STORAGE_KEYS.SOCIAL, defaultSocialLinks));
  const [messages, setMessages] = useState<Message[]>(() => getStoredItem(STORAGE_KEYS.MESSAGES, defaultMessages));
  const [seoSettings, setSeoSettings] = useState<SEOSettings>(() => getStoredItem(STORAGE_KEYS.SEO, defaultSEO));
  const [settings, setSettings] = useState<Settings>(() => getStoredItem(STORAGE_KEYS.SETTINGS, defaultSettings));
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // 1. Cross-tab real-time live synchronization via browser 'storage' event
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (!e.key || !e.newValue) return;
      try {
        const parsed = JSON.parse(e.newValue);
        switch (e.key) {
          case STORAGE_KEYS.PROFILE:
            setProfile(parsed);
            break;
          case STORAGE_KEYS.ABOUT:
            setAbout(parsed);
            break;
          case STORAGE_KEYS.SKILLS:
            setSkills(parsed);
            break;
          case STORAGE_KEYS.EXPERIENCES:
            setExperiences(parsed);
            break;
          case STORAGE_KEYS.EDUCATION:
            setEducation(parsed);
            break;
          case STORAGE_KEYS.PROJECTS:
            setProjects(parsed);
            break;
          case STORAGE_KEYS.CERTIFICATES:
            setCertificates(parsed);
            break;
          case STORAGE_KEYS.GALLERY:
            setGallery(parsed);
            break;
          case STORAGE_KEYS.RESUME:
            setResume(parsed);
            break;
          case STORAGE_KEYS.CONTACT:
            setContactInfo(parsed);
            break;
          case STORAGE_KEYS.SOCIAL:
            setSocialLinks(parsed);
            break;
          case STORAGE_KEYS.MESSAGES:
            setMessages(parsed);
            break;
          case STORAGE_KEYS.SEO:
            setSeoSettings(parsed);
            break;
          case STORAGE_KEYS.SETTINGS:
            setSettings(parsed);
            break;
        }
      } catch (err) {
        console.warn("Storage sync parse error:", err);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // 2. Background sync from Supabase if configured & tables exist
  useEffect(() => {
    const syncFromSupabase = async () => {
      if (!isSupabaseConfigured || !supabase) return;

      try {
        const [
          profRes,
          aboutRes,
          skillsRes,
          expRes,
          eduRes,
          projRes,
          certRes,
          galRes,
          resRes,
          contactRes,
          socRes,
          msgRes,
          seoRes,
        ] = await Promise.allSettled([
          supabase.from("profiles").select("data").limit(1).maybeSingle(),
          supabase.from("about_data").select("data").limit(1).maybeSingle(),
          supabase.from("skills").select("*").order("sort_order", { ascending: true }),
          supabase.from("experiences").select("*").order("sort_order", { ascending: true }),
          supabase.from("education").select("*").order("sort_order", { ascending: true }),
          supabase.from("projects").select("*").order("sort_order", { ascending: true }),
          supabase.from("certificates").select("*").order("sort_order", { ascending: true }),
          supabase.from("gallery").select("*").order("sort_order", { ascending: true }),
          supabase.from("resume").select("*").limit(1).maybeSingle(),
          supabase.from("contact_info").select("data").limit(1).maybeSingle(),
          supabase.from("social_links").select("*").order("sort_order", { ascending: true }),
          supabase.from("messages").select("*").order("created_at", { ascending: false }),
          supabase.from("seo_settings").select("data").limit(1).maybeSingle(),
        ]);

        // Only adopt Supabase values if the table exists, returned data, and has no error
        if (profRes.status === "fulfilled" && profRes.value.data?.data) {
          const val = profRes.value.data.data;
          setProfile(val);
          localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(val));
        }

        if (aboutRes.status === "fulfilled" && aboutRes.value.data?.data) {
          const val = aboutRes.value.data.data;
          setAbout(val);
          localStorage.setItem(STORAGE_KEYS.ABOUT, JSON.stringify(val));
        }

        if (skillsRes.status === "fulfilled" && Array.isArray(skillsRes.value.data) && skillsRes.value.data.length > 0) {
          const mapped: Skill[] = skillsRes.value.data.map((s) => ({
            id: s.id,
            name: s.name,
            level: s.level,
            category: s.category,
            iconName: s.icon_name,
            order: s.sort_order,
          }));
          setSkills(mapped);
          localStorage.setItem(STORAGE_KEYS.SKILLS, JSON.stringify(mapped));
        }

        if (expRes.status === "fulfilled" && Array.isArray(expRes.value.data) && expRes.value.data.length > 0) {
          const mapped: Experience[] = expRes.value.data.map((e) => ({
            id: e.id,
            company: e.company,
            role: e.role,
            location: e.location,
            startDate: e.start_date,
            endDate: e.end_date,
            isCurrent: e.is_current,
            description: Array.isArray(e.description) ? e.description : [],
            techStack: Array.isArray(e.tech_stack) ? e.tech_stack : [],
            order: e.sort_order,
          }));
          setExperiences(mapped);
          localStorage.setItem(STORAGE_KEYS.EXPERIENCES, JSON.stringify(mapped));
        }

        if (eduRes.status === "fulfilled" && Array.isArray(eduRes.value.data) && eduRes.value.data.length > 0) {
          const mapped: Education[] = eduRes.value.data.map((ed) => ({
            id: ed.id,
            institution: ed.institution,
            degree: ed.degree,
            fieldOfStudy: ed.field_of_study,
            startYear: ed.start_year,
            endYear: ed.end_year,
            grade: ed.grade,
            achievements: ed.achievements,
            order: ed.sort_order,
          }));
          setEducation(mapped);
          localStorage.setItem(STORAGE_KEYS.EDUCATION, JSON.stringify(mapped));
        }

        if (projRes.status === "fulfilled" && Array.isArray(projRes.value.data) && projRes.value.data.length > 0) {
          const mapped: Project[] = projRes.value.data.map((p) => ({
            id: p.id,
            title: p.title,
            description: p.description,
            tech: Array.isArray(p.tech) ? p.tech : [],
            gradient: p.gradient || "bg-primary",
            image: p.image,
            githubUrl: p.github_url,
            liveUrl: p.live_url,
            category: p.category,
            isFeatured: p.is_featured,
            isVisible: p.is_visible,
            order: p.sort_order,
          }));
          setProjects(mapped);
          localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(mapped));
        }

        if (certRes.status === "fulfilled" && Array.isArray(certRes.value.data) && certRes.value.data.length > 0) {
          const mapped: Certificate[] = certRes.value.data.map((c) => ({
            id: c.id,
            title: c.title,
            issuer: c.issuer,
            date: c.date,
            credentialId: c.credential_id,
            credentialUrl: c.credential_url,
            image: c.image,
            gradient: c.gradient || "bg-primary",
            order: c.sort_order,
          }));
          setCertificates(mapped);
          localStorage.setItem(STORAGE_KEYS.CERTIFICATES, JSON.stringify(mapped));
        }

        if (galRes.status === "fulfilled" && Array.isArray(galRes.value.data) && galRes.value.data.length > 0) {
          const mapped: GalleryItem[] = galRes.value.data.map((g) => ({
            id: g.id,
            title: g.title,
            caption: g.caption,
            imageUrl: g.image_url,
            category: g.category,
            dateAdded: g.date_added,
            order: g.sort_order,
          }));
          setGallery(mapped);
          localStorage.setItem(STORAGE_KEYS.GALLERY, JSON.stringify(mapped));
        }

        if (resRes.status === "fulfilled" && resRes.value.data) {
          const r = resRes.value.data;
          const val: ResumeData = {
            fileUrl: r.file_url,
            fileName: r.file_name,
            lastUpdated: r.last_updated,
            title: r.title,
            description: r.description,
          };
          setResume(val);
          localStorage.setItem(STORAGE_KEYS.RESUME, JSON.stringify(val));
        }

        if (contactRes.status === "fulfilled" && contactRes.value.data?.data) {
          const val = contactRes.value.data.data;
          setContactInfo(val);
          localStorage.setItem(STORAGE_KEYS.CONTACT, JSON.stringify(val));
        }

        if (socRes.status === "fulfilled" && Array.isArray(socRes.value.data) && socRes.value.data.length > 0) {
          const mapped: SocialLink[] = socRes.value.data.map((s) => ({
            id: s.id,
            name: s.name,
            iconName: s.icon_name,
            username: s.username,
            subtext: s.subtext,
            gradient: s.gradient,
            url: s.url,
            order: s.sort_order,
          }));
          setSocialLinks(mapped);
          localStorage.setItem(STORAGE_KEYS.SOCIAL, JSON.stringify(mapped));
        }

        if (msgRes.status === "fulfilled" && Array.isArray(msgRes.value.data) && msgRes.value.data.length > 0) {
          const mapped: Message[] = msgRes.value.data.map((m) => ({
            id: m.id,
            name: m.name,
            email: m.email,
            subject: m.subject,
            message: m.message,
            createdAt: m.created_at,
            isRead: m.is_read,
          }));
          setMessages(mapped);
          localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(mapped));
        }

        if (seoRes.status === "fulfilled" && seoRes.value.data?.data) {
          const val = seoRes.value.data.data;
          setSeoSettings(val);
          localStorage.setItem(STORAGE_KEYS.SEO, JSON.stringify(val));
        }
      } catch (err) {
        console.warn("Supabase background sync completed with note:", err);
      }
    };

    syncFromSupabase();
  }, []);

  // UPDATE METHODS: Immediate LocalStorage guarantee + Safe Supabase Sync
  const updateProfile = async (data: Profile) => {
    setProfile(data);
    localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(data));
    if (isSupabaseConfigured && supabase) {
      try {
        await supabase
          .from("profiles")
          .upsert({ id: SINGLETON_UUIDS.PROFILE, data, updated_at: new Date().toISOString() });
      } catch (e) {
        console.warn("Supabase profile sync warning:", e);
      }
    }
  };

  const updateAbout = async (data: AboutData) => {
    setAbout(data);
    localStorage.setItem(STORAGE_KEYS.ABOUT, JSON.stringify(data));
    if (isSupabaseConfigured && supabase) {
      try {
        await supabase
          .from("about_data")
          .upsert({ id: SINGLETON_UUIDS.ABOUT, data, updated_at: new Date().toISOString() });
      } catch (e) {
        console.warn("Supabase about sync warning:", e);
      }
    }
  };

  const saveSkill = async (skill: Skill) => {
    setSkills((prev) => {
      const exists = prev.some((s) => s.id === skill.id);
      const updated = exists ? prev.map((s) => (s.id === skill.id ? skill : s)) : [...prev, skill];
      localStorage.setItem(STORAGE_KEYS.SKILLS, JSON.stringify(updated));
      return updated;
    });
    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from("skills").upsert({
          id: skill.id,
          name: skill.name,
          level: skill.level,
          category: skill.category,
          icon_name: skill.iconName,
          sort_order: skill.order,
          updated_at: new Date().toISOString(),
        });
      } catch (e) {
        console.warn("Supabase skill sync warning:", e);
      }
    }
  };

  const deleteSkill = async (id: string) => {
    setSkills((prev) => {
      const updated = prev.filter((s) => s.id !== id);
      localStorage.setItem(STORAGE_KEYS.SKILLS, JSON.stringify(updated));
      return updated;
    });
    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from("skills").delete().eq("id", id);
      } catch (e) {
        console.warn("Supabase skill delete warning:", e);
      }
    }
  };

  const reorderSkills = async (newSkills: Skill[]) => {
    const reordered = newSkills.map((s, idx) => ({ ...s, order: idx + 1 }));
    setSkills(reordered);
    localStorage.setItem(STORAGE_KEYS.SKILLS, JSON.stringify(reordered));
  };

  const saveExperience = async (exp: Experience) => {
    setExperiences((prev) => {
      const exists = prev.some((e) => e.id === exp.id);
      const updated = exists ? prev.map((e) => (e.id === exp.id ? exp : e)) : [...prev, exp];
      localStorage.setItem(STORAGE_KEYS.EXPERIENCES, JSON.stringify(updated));
      return updated;
    });
    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from("experiences").upsert({
          id: exp.id,
          company: exp.company,
          role: exp.role,
          location: exp.location,
          start_date: exp.startDate,
          end_date: exp.endDate,
          is_current: exp.isCurrent,
          description: exp.description,
          tech_stack: exp.techStack,
          sort_order: exp.order,
          updated_at: new Date().toISOString(),
        });
      } catch (e) {
        console.warn("Supabase experience sync warning:", e);
      }
    }
  };

  const deleteExperience = async (id: string) => {
    setExperiences((prev) => {
      const updated = prev.filter((e) => e.id !== id);
      localStorage.setItem(STORAGE_KEYS.EXPERIENCES, JSON.stringify(updated));
      return updated;
    });
    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from("experiences").delete().eq("id", id);
      } catch (e) {
        console.warn("Supabase experience delete warning:", e);
      }
    }
  };

  const reorderExperiences = async (newExps: Experience[]) => {
    const reordered = newExps.map((e, idx) => ({ ...e, order: idx + 1 }));
    setExperiences(reordered);
    localStorage.setItem(STORAGE_KEYS.EXPERIENCES, JSON.stringify(reordered));
  };

  const saveEducation = async (edu: Education) => {
    setEducation((prev) => {
      const exists = prev.some((e) => e.id === edu.id);
      const updated = exists ? prev.map((e) => (e.id === edu.id ? edu : e)) : [...prev, edu];
      localStorage.setItem(STORAGE_KEYS.EDUCATION, JSON.stringify(updated));
      return updated;
    });
    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from("education").upsert({
          id: edu.id,
          institution: edu.institution,
          degree: edu.degree,
          field_of_study: edu.fieldOfStudy,
          start_year: edu.startYear,
          end_year: edu.endYear,
          grade: edu.grade,
          achievements: edu.achievements,
          sort_order: edu.order,
          updated_at: new Date().toISOString(),
        });
      } catch (e) {
        console.warn("Supabase education sync warning:", e);
      }
    }
  };

  const deleteEducation = async (id: string) => {
    setEducation((prev) => {
      const updated = prev.filter((e) => e.id !== id);
      localStorage.setItem(STORAGE_KEYS.EDUCATION, JSON.stringify(updated));
      return updated;
    });
    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from("education").delete().eq("id", id);
      } catch (e) {
        console.warn("Supabase education delete warning:", e);
      }
    }
  };

  const reorderEducation = async (newEdu: Education[]) => {
    const reordered = newEdu.map((e, idx) => ({ ...e, order: idx + 1 }));
    setEducation(reordered);
    localStorage.setItem(STORAGE_KEYS.EDUCATION, JSON.stringify(reordered));
  };

  const saveProject = async (proj: Project) => {
    setProjects((prev) => {
      const exists = prev.some((p) => p.id === proj.id);
      const updated = exists ? prev.map((p) => (p.id === proj.id ? proj : p)) : [...prev, proj];
      localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(updated));
      return updated;
    });
    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from("projects").upsert({
          id: proj.id,
          title: proj.title,
          description: proj.description,
          tech: proj.tech,
          gradient: proj.gradient,
          image: proj.image,
          github_url: proj.githubUrl,
          live_url: proj.liveUrl,
          category: proj.category,
          is_featured: proj.isFeatured,
          is_visible: proj.isVisible,
          sort_order: proj.order,
          updated_at: new Date().toISOString(),
        });
      } catch (e) {
        console.warn("Supabase project sync warning:", e);
      }
    }
  };

  const deleteProject = async (id: string) => {
    setProjects((prev) => {
      const updated = prev.filter((p) => p.id !== id);
      localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(updated));
      return updated;
    });
    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from("projects").delete().eq("id", id);
      } catch (e) {
        console.warn("Supabase project delete warning:", e);
      }
    }
  };

  const reorderProjects = async (newProjs: Project[]) => {
    const reordered = newProjs.map((p, idx) => ({ ...p, order: idx + 1 }));
    setProjects(reordered);
    localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(reordered));
  };

  const saveCertificate = async (cert: Certificate) => {
    setCertificates((prev) => {
      const exists = prev.some((c) => c.id === cert.id);
      const updated = exists ? prev.map((c) => (c.id === cert.id ? cert : c)) : [...prev, cert];
      localStorage.setItem(STORAGE_KEYS.CERTIFICATES, JSON.stringify(updated));
      return updated;
    });
    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from("certificates").upsert({
          id: cert.id,
          title: cert.title,
          issuer: cert.issuer,
          date: cert.date,
          credential_id: cert.credentialId,
          credential_url: cert.credentialUrl,
          image: cert.image,
          gradient: cert.gradient,
          sort_order: cert.order,
          updated_at: new Date().toISOString(),
        });
      } catch (e) {
        console.warn("Supabase certificate sync warning:", e);
      }
    }
  };

  const deleteCertificate = async (id: string) => {
    setCertificates((prev) => {
      const updated = prev.filter((c) => c.id !== id);
      localStorage.setItem(STORAGE_KEYS.CERTIFICATES, JSON.stringify(updated));
      return updated;
    });
    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from("certificates").delete().eq("id", id);
      } catch (e) {
        console.warn("Supabase certificate delete warning:", e);
      }
    }
  };

  const reorderCertificates = async (newCerts: Certificate[]) => {
    const reordered = newCerts.map((c, idx) => ({ ...c, order: idx + 1 }));
    setCertificates(reordered);
    localStorage.setItem(STORAGE_KEYS.CERTIFICATES, JSON.stringify(reordered));
  };

  const saveGalleryItem = async (item: GalleryItem) => {
    setGallery((prev) => {
      const exists = prev.some((g) => g.id === item.id);
      const updated = exists ? prev.map((g) => (g.id === item.id ? item : g)) : [...prev, item];
      localStorage.setItem(STORAGE_KEYS.GALLERY, JSON.stringify(updated));
      return updated;
    });
    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from("gallery").upsert({
          id: item.id,
          title: item.title,
          caption: item.caption,
          image_url: item.imageUrl,
          category: item.category,
          date_added: item.dateAdded,
          sort_order: item.order,
          updated_at: new Date().toISOString(),
        });
      } catch (e) {
        console.warn("Supabase gallery sync warning:", e);
      }
    }
  };

  const deleteGalleryItem = async (id: string) => {
    setGallery((prev) => {
      const updated = prev.filter((g) => g.id !== id);
      localStorage.setItem(STORAGE_KEYS.GALLERY, JSON.stringify(updated));
      return updated;
    });
    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from("gallery").delete().eq("id", id);
      } catch (e) {
        console.warn("Supabase gallery delete warning:", e);
      }
    }
  };

  const reorderGallery = async (newItems: GalleryItem[]) => {
    const reordered = newItems.map((g, idx) => ({ ...g, order: idx + 1 }));
    setGallery(reordered);
    localStorage.setItem(STORAGE_KEYS.GALLERY, JSON.stringify(reordered));
  };

  const updateResume = async (data: ResumeData) => {
    setResume(data);
    localStorage.setItem(STORAGE_KEYS.RESUME, JSON.stringify(data));
    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from("resume").upsert({
          id: SINGLETON_UUIDS.RESUME,
          file_url: data.fileUrl,
          file_name: data.fileName,
          last_updated: data.lastUpdated,
          title: data.title,
          description: data.description,
        });
      } catch (e) {
        console.warn("Supabase resume sync warning:", e);
      }
    }
  };

  const updateContactInfo = async (data: ContactInfo) => {
    setContactInfo(data);
    localStorage.setItem(STORAGE_KEYS.CONTACT, JSON.stringify(data));
    if (isSupabaseConfigured && supabase) {
      try {
        await supabase
          .from("contact_info")
          .upsert({ id: SINGLETON_UUIDS.CONTACT, data, updated_at: new Date().toISOString() });
      } catch (e) {
        console.warn("Supabase contact sync warning:", e);
      }
    }
  };

  const saveSocialLink = async (link: SocialLink) => {
    setSocialLinks((prev) => {
      const exists = prev.some((s) => s.id === link.id);
      const updated = exists ? prev.map((s) => (s.id === link.id ? link : s)) : [...prev, link];
      localStorage.setItem(STORAGE_KEYS.SOCIAL, JSON.stringify(updated));
      return updated;
    });
    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from("social_links").upsert({
          id: link.id,
          name: link.name,
          icon_name: link.iconName,
          username: link.username,
          subtext: link.subtext,
          gradient: link.gradient,
          url: link.url,
          sort_order: link.order,
          updated_at: new Date().toISOString(),
        });
      } catch (e) {
        console.warn("Supabase social link sync warning:", e);
      }
    }
  };

  const deleteSocialLink = async (id: string) => {
    setSocialLinks((prev) => {
      const updated = prev.filter((s) => s.id !== id);
      localStorage.setItem(STORAGE_KEYS.SOCIAL, JSON.stringify(updated));
      return updated;
    });
    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from("social_links").delete().eq("id", id);
      } catch (e) {
        console.warn("Supabase social link delete warning:", e);
      }
    }
  };

  const reorderSocialLinks = async (newLinks: SocialLink[]) => {
    const reordered = newLinks.map((s, idx) => ({ ...s, order: idx + 1 }));
    setSocialLinks(reordered);
    localStorage.setItem(STORAGE_KEYS.SOCIAL, JSON.stringify(reordered));
  };

  const addMessage = async (msg: Omit<Message, "id" | "createdAt" | "isRead">) => {
    const newMsg: Message = {
      ...msg,
      id: "msg-" + Date.now(),
      createdAt: new Date().toISOString(),
      isRead: false,
    };
    setMessages((prev) => {
      const updated = [newMsg, ...prev];
      localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(updated));
      return updated;
    });
    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from("messages").insert({
          id: newMsg.id,
          name: newMsg.name,
          email: newMsg.email,
          subject: newMsg.subject,
          message: newMsg.message,
          created_at: newMsg.createdAt,
          is_read: false,
        });
      } catch (e) {
        console.warn("Supabase message insert warning:", e);
      }
    }
  };

  const toggleMessageRead = async (id: string) => {
    setMessages((prev) => {
      const updated = prev.map((m) => (m.id === id ? { ...m, isRead: !m.isRead } : m));
      localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(updated));
      return updated;
    });
    if (isSupabaseConfigured && supabase) {
      try {
        const target = messages.find((m) => m.id === id);
        if (target) {
          await supabase.from("messages").update({ is_read: !target.isRead }).eq("id", id);
        }
      } catch (e) {
        console.warn("Supabase message update warning:", e);
      }
    }
  };

  const deleteMessage = async (id: string) => {
    setMessages((prev) => {
      const updated = prev.filter((m) => m.id !== id);
      localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(updated));
      return updated;
    });
    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from("messages").delete().eq("id", id);
      } catch (e) {
        console.warn("Supabase message delete warning:", e);
      }
    }
  };

  const updateSEO = async (data: SEOSettings) => {
    setSeoSettings(data);
    localStorage.setItem(STORAGE_KEYS.SEO, JSON.stringify(data));
    if (isSupabaseConfigured && supabase) {
      try {
        await supabase
          .from("seo_settings")
          .upsert({ id: SINGLETON_UUIDS.SEO, data, updated_at: new Date().toISOString() });
      } catch (e) {
        console.warn("Supabase SEO sync warning:", e);
      }
    }
  };

  const updateSettings = async (data: Settings) => {
    setSettings(data);
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(data));
  };

  const exportDataJSON = (): string => {
    const bundle = {
      profile,
      about,
      skills,
      experiences,
      education,
      projects,
      certificates,
      gallery,
      resume,
      contactInfo,
      socialLinks,
      messages,
      seoSettings,
      settings,
      exportedAt: new Date().toISOString(),
    };
    return JSON.stringify(bundle, null, 2);
  };

  const importDataJSON = (jsonString: string): boolean => {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed.profile) updateProfile(parsed.profile);
      if (parsed.about) updateAbout(parsed.about);
      if (parsed.skills) { setSkills(parsed.skills); localStorage.setItem(STORAGE_KEYS.SKILLS, JSON.stringify(parsed.skills)); }
      if (parsed.experiences) { setExperiences(parsed.experiences); localStorage.setItem(STORAGE_KEYS.EXPERIENCES, JSON.stringify(parsed.experiences)); }
      if (parsed.education) { setEducation(parsed.education); localStorage.setItem(STORAGE_KEYS.EDUCATION, JSON.stringify(parsed.education)); }
      if (parsed.projects) { setProjects(parsed.projects); localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(parsed.projects)); }
      if (parsed.certificates) { setCertificates(parsed.certificates); localStorage.setItem(STORAGE_KEYS.CERTIFICATES, JSON.stringify(parsed.certificates)); }
      if (parsed.gallery) { setGallery(parsed.gallery); localStorage.setItem(STORAGE_KEYS.GALLERY, JSON.stringify(parsed.gallery)); }
      if (parsed.resume) updateResume(parsed.resume);
      if (parsed.contactInfo) updateContactInfo(parsed.contactInfo);
      if (parsed.socialLinks) { setSocialLinks(parsed.socialLinks); localStorage.setItem(STORAGE_KEYS.SOCIAL, JSON.stringify(parsed.socialLinks)); }
      if (parsed.messages) { setMessages(parsed.messages); localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(parsed.messages)); }
      if (parsed.seoSettings) updateSEO(parsed.seoSettings);
      if (parsed.settings) updateSettings(parsed.settings);
      return true;
    } catch {
      return false;
    }
  };

  const resetToDefaults = () => {
    setProfile(defaultProfile);
    setAbout(defaultAbout);
    setSkills(defaultSkills);
    setExperiences(defaultExperiences);
    setEducation(defaultEducation);
    setProjects(defaultProjects);
    setCertificates(defaultCertificates);
    setGallery(defaultGallery);
    setResume(defaultResume);
    setContactInfo(defaultContactInfo);
    setSocialLinks(defaultSocialLinks);
    setMessages(defaultMessages);
    setSeoSettings(defaultSEO);
    setSettings(defaultSettings);
    Object.values(STORAGE_KEYS).forEach((k) => localStorage.removeItem(k));
  };

  return (
    <PortfolioDataContext.Provider
      value={{
        profile,
        about,
        skills,
        experiences,
        education,
        projects,
        certificates,
        gallery,
        resume,
        contactInfo,
        socialLinks,
        messages,
        seoSettings,
        settings,
        isLoading,
        updateProfile,
        updateAbout,
        saveSkill,
        deleteSkill,
        reorderSkills,
        saveExperience,
        deleteExperience,
        reorderExperiences,
        saveEducation,
        deleteEducation,
        reorderEducation,
        saveProject,
        deleteProject,
        reorderProjects,
        saveCertificate,
        deleteCertificate,
        reorderCertificates,
        saveGalleryItem,
        deleteGalleryItem,
        reorderGallery,
        updateResume,
        updateContactInfo,
        saveSocialLink,
        deleteSocialLink,
        reorderSocialLinks,
        addMessage,
        toggleMessageRead,
        deleteMessage,
        updateSEO,
        updateSettings,
        exportDataJSON,
        importDataJSON,
        resetToDefaults,
      }}
    >
      {children}
    </PortfolioDataContext.Provider>
  );
};

export const usePortfolioData = () => {
  const context = useContext(PortfolioDataContext);
  if (!context) {
    throw new Error("usePortfolioData must be used within a PortfolioDataProvider");
  }
  return context;
};
