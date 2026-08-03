import React, { createContext, useContext, useState, useEffect } from "react";
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
const defaultProfile: Profile = {
  name: "Rajapandi P",
  title: "AI/ML Engineer & Data Scientist",
  tagline: "Building intelligent systems that think, learn, and evolve",
  bio: "I'm an AI Engineer & Data Scientist crafting intelligent systems using Machine Learning, Deep Learning, and Data Analytics to solve real-world problems.",
  heroDescription: "Building intelligent systems using Machine Learning, Deep Learning, and Data Analytics to solve real-world problems.",
  profilePhoto: profilePhoto,
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

const defaultAbout: AboutData = {
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

const defaultSkills: Skill[] = [
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

const defaultExperiences: Experience[] = [
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

const defaultEducation: Education[] = [
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

const defaultProjects: Project[] = [
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

const defaultCertificates: Certificate[] = [
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

const defaultGallery: GalleryItem[] = [
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

const defaultResume: ResumeData = {
  fileUrl: "/resume.pdf",
  fileName: "Rajapandi_P_Resume.pdf",
  lastUpdated: new Date().toISOString().split("T")[0],
  title: "AI & ML Specialist Resume",
  description: "Comprehensive resume highlighting skills in Artificial Intelligence, Machine Learning, Deep Learning, and Full-Stack Development.",
};

const defaultContactInfo: ContactInfo = {
  email: "rajapandip59@gmail.com",
  phone: "+91 9360410920",
  address: "Theni, Tamil Nadu, India",
  googleMapsEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d125770.83546777324!2d77.41164805!3d10.01041935!2m3!1f0!1f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b074a3f1246b9a9%3A0x6b10766a50616b67!2sTheni%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
  businessHours: "Mon - Fri: 9:00 AM - 6:00 PM IST",
};

const defaultSocialLinks: SocialLink[] = [
  { id: "soc-1", name: "GitHub", iconName: "Github", username: "@rajapandip59-prog", subtext: "10K+ followers", gradient: "bg-zinc-900", url: "https://github.com/rajapandip59-prog", order: 1 },
  { id: "soc-2", name: "LinkedIn", iconName: "Linkedin", username: "@rajapandi-p", subtext: "100+ connections", gradient: "bg-blue-700", url: "https://www.linkedin.com/in/rajapandi-p/", order: 2 },
  { id: "soc-3", name: "X", iconName: "X", username: "@RajapandiP70029", subtext: "8K+ followers", gradient: "bg-sky-500", url: "https://twitter.com/RajapandiP70029", order: 3 },
  { id: "soc-4", name: "Instagram", iconName: "Instagram", username: "@creative", subtext: "3K+ followers", gradient: "bg-pink-600", url: "https://instagram.com", order: 4 },
  { id: "soc-5", name: "YouTube", iconName: "Youtube", username: "@channel", subtext: "2K+ subscribers", gradient: "bg-red-600", url: "https://youtube.com", order: 5 },
  { id: "soc-6", name: "Email", iconName: "Mail", username: "rajapandip59@gmail.com", subtext: "Always available", gradient: "bg-teal-600", url: "mailto:rajapandip59@gmail.com", order: 6 },
];

const defaultMessages: Message[] = [
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

const defaultSEO: SEOSettings = {
  metaTitle: "Rajapandi P | AI/ML Engineer & Data Scientist Portfolio",
  metaDescription: "Official portfolio of Rajapandi P, AI/ML Engineer specializing in Machine Learning, Deep Learning, and Data Analytics.",
  keywords: "AI Engineer, Machine Learning, Data Science, Deep Learning, React, Python, Portfolio, Rajapandi P",
  ogImage: profilePhoto,
  twitterHandle: "@RajapandiP70029",
};

const defaultSettings: Settings = {
  adminEmail: "rajapandip59@gmail.com",
  siteName: "Rajapandi P Portfolio",
  theme: "dark",
  lastBackupDate: new Date().toISOString().split("T")[0],
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

const STORAGE_KEYS = {
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

export const PortfolioDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<Profile>(defaultProfile);
  const [about, setAbout] = useState<AboutData>(defaultAbout);
  const [skills, setSkills] = useState<Skill[]>(defaultSkills);
  const [experiences, setExperiences] = useState<Experience[]>(defaultExperiences);
  const [education, setEducation] = useState<Education[]>(defaultEducation);
  const [projects, setProjects] = useState<Project[]>(defaultProjects);
  const [certificates, setCertificates] = useState<Certificate[]>(defaultCertificates);
  const [gallery, setGallery] = useState<GalleryItem[]>(defaultGallery);
  const [resume, setResume] = useState<ResumeData>(defaultResume);
  const [contactInfo, setContactInfo] = useState<ContactInfo>(defaultContactInfo);
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>(defaultSocialLinks);
  const [messages, setMessages] = useState<Message[]>(defaultMessages);
  const [seoSettings, setSeoSettings] = useState<SEOSettings>(defaultSEO);
  const [settings, setSettings] = useState<Settings>(defaultSettings);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Load Initial Data from LocalStorage or Supabase
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        if (isSupabaseConfigured && supabase) {
          // Attempt loading from Supabase tables
          const [profRes, aboutRes, skillsRes, expRes, eduRes, projRes, certRes, galRes, resRes, contactRes, socRes, msgRes, seoRes] = await Promise.all([
            supabase.from("profiles").select("data").single(),
            supabase.from("about_data").select("data").single(),
            supabase.from("skills").select("*").order("sort_order", { ascending: true }),
            supabase.from("experiences").select("*").order("sort_order", { ascending: true }),
            supabase.from("education").select("*").order("sort_order", { ascending: true }),
            supabase.from("projects").select("*").order("sort_order", { ascending: true }),
            supabase.from("certificates").select("*").order("sort_order", { ascending: true }),
            supabase.from("gallery").select("*").order("sort_order", { ascending: true }),
            supabase.from("resume").select("*").single(),
            supabase.from("contact_info").select("data").single(),
            supabase.from("social_links").select("*").order("sort_order", { ascending: true }),
            supabase.from("messages").select("*").order("created_at", { ascending: false }),
            supabase.from("seo_settings").select("data").single(),
          ]);

          if (profRes.data?.data) setProfile(profRes.data.data);
          if (aboutRes.data?.data) setAbout(aboutRes.data.data);
          if (skillsRes.data?.length) setSkills(skillsRes.data.map(s => ({ id: s.id, name: s.name, level: s.level, category: s.category, iconName: s.icon_name, order: s.sort_order })));
          if (expRes.data?.length) setExperiences(expRes.data.map(e => ({ id: e.id, company: e.company, role: e.role, location: e.location, startDate: e.start_date, endDate: e.end_date, isCurrent: e.is_current, description: e.description, techStack: e.tech_stack, order: e.sort_order })));
          if (eduRes.data?.length) setEducation(eduRes.data.map(ed => ({ id: ed.id, institution: ed.institution, degree: ed.degree, fieldOfStudy: ed.field_of_study, startYear: ed.start_year, endYear: ed.end_year, grade: ed.grade, achievements: ed.achievements, order: ed.sort_order })));
          if (projRes.data?.length) setProjects(projRes.data.map(p => ({ id: p.id, title: p.title, description: p.description, tech: p.tech, gradient: p.gradient, image: p.image, githubUrl: p.github_url, liveUrl: p.live_url, category: p.category, isFeatured: p.is_featured, isVisible: p.is_visible, order: p.sort_order })));
          if (certRes.data?.length) setCertificates(certRes.data.map(c => ({ id: c.id, title: c.title, issuer: c.issuer, date: c.date, credentialId: c.credential_id, credentialUrl: c.credential_url, image: c.image, gradient: c.gradient, order: c.sort_order })));
          if (galRes.data?.length) setGallery(galRes.data.map(g => ({ id: g.id, title: g.title, caption: g.caption, imageUrl: g.image_url, category: g.category, dateAdded: g.date_added, order: g.sort_order })));
          if (resRes.data) setResume({ fileUrl: resRes.data.file_url, fileName: resRes.data.file_name, lastUpdated: resRes.data.last_updated, title: resRes.data.title, description: resRes.data.description });
          if (contactRes.data?.data) setContactInfo(contactRes.data.data);
          if (socRes.data?.length) setSocialLinks(socRes.data.map(s => ({ id: s.id, name: s.name, iconName: s.icon_name, username: s.username, subtext: s.subtext, gradient: s.gradient, url: s.url, order: s.sort_order })));
          if (msgRes.data?.length) setMessages(msgRes.data.map(m => ({ id: m.id, name: m.name, email: m.email, subject: m.subject, message: m.message, createdAt: m.created_at, isRead: m.is_read })));
          if (seoRes.data?.data) setSeoSettings(seoRes.data.data);

          setIsLoading(false);
          return;
        }
      } catch (err) {
        console.warn("Supabase fetch failed, loading local fallback data:", err);
      }

      // Fallback to LocalStorage
      try {
        const p = localStorage.getItem(STORAGE_KEYS.PROFILE);
        if (p) setProfile(JSON.parse(p));
        const a = localStorage.getItem(STORAGE_KEYS.ABOUT);
        if (a) setAbout(JSON.parse(a));
        const sk = localStorage.getItem(STORAGE_KEYS.SKILLS);
        if (sk) setSkills(JSON.parse(sk));
        const ex = localStorage.getItem(STORAGE_KEYS.EXPERIENCES);
        if (ex) setExperiences(JSON.parse(ex));
        const ed = localStorage.getItem(STORAGE_KEYS.EDUCATION);
        if (ed) setEducation(JSON.parse(ed));
        const pr = localStorage.getItem(STORAGE_KEYS.PROJECTS);
        if (pr) setProjects(JSON.parse(pr));
        const ce = localStorage.getItem(STORAGE_KEYS.CERTIFICATES);
        if (ce) setCertificates(JSON.parse(ce));
        const ga = localStorage.getItem(STORAGE_KEYS.GALLERY);
        if (ga) setGallery(JSON.parse(ga));
        const re = localStorage.getItem(STORAGE_KEYS.RESUME);
        if (re) setResume(JSON.parse(re));
        const co = localStorage.getItem(STORAGE_KEYS.CONTACT);
        if (co) setContactInfo(JSON.parse(co));
        const so = localStorage.getItem(STORAGE_KEYS.SOCIAL);
        if (so) setSocialLinks(JSON.parse(so));
        const me = localStorage.getItem(STORAGE_KEYS.MESSAGES);
        if (me) setMessages(JSON.parse(me));
        const se = localStorage.getItem(STORAGE_KEYS.SEO);
        if (se) setSeoSettings(JSON.parse(se));
        const st = localStorage.getItem(STORAGE_KEYS.SETTINGS);
        if (st) setSettings(JSON.parse(st));
      } catch (e) {
        console.error("Local storage load error:", e);
      }

      setIsLoading(false);
    };

    loadInitialData();
  }, []);

  // Update Methods
  const updateProfile = async (data: Profile) => {
    setProfile(data);
    localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(data));
    if (isSupabaseConfigured && supabase) {
      await supabase.from("profiles").upsert({ id: "default", data, updated_at: new Date().toISOString() });
    }
  };

  const updateAbout = async (data: AboutData) => {
    setAbout(data);
    localStorage.setItem(STORAGE_KEYS.ABOUT, JSON.stringify(data));
    if (isSupabaseConfigured && supabase) {
      await supabase.from("about_data").upsert({ id: "default", data, updated_at: new Date().toISOString() });
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
      await supabase.from("skills").upsert({
        id: skill.id,
        name: skill.name,
        level: skill.level,
        category: skill.category,
        icon_name: skill.iconName,
        sort_order: skill.order,
      });
    }
  };

  const deleteSkill = async (id: string) => {
    setSkills((prev) => {
      const updated = prev.filter((s) => s.id !== id);
      localStorage.setItem(STORAGE_KEYS.SKILLS, JSON.stringify(updated));
      return updated;
    });
    if (isSupabaseConfigured && supabase) {
      await supabase.from("skills").delete().eq("id", id);
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
  };

  const deleteExperience = async (id: string) => {
    setExperiences((prev) => {
      const updated = prev.filter((e) => e.id !== id);
      localStorage.setItem(STORAGE_KEYS.EXPERIENCES, JSON.stringify(updated));
      return updated;
    });
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
  };

  const deleteEducation = async (id: string) => {
    setEducation((prev) => {
      const updated = prev.filter((e) => e.id !== id);
      localStorage.setItem(STORAGE_KEYS.EDUCATION, JSON.stringify(updated));
      return updated;
    });
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
  };

  const deleteProject = async (id: string) => {
    setProjects((prev) => {
      const updated = prev.filter((p) => p.id !== id);
      localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(updated));
      return updated;
    });
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
  };

  const deleteCertificate = async (id: string) => {
    setCertificates((prev) => {
      const updated = prev.filter((c) => c.id !== id);
      localStorage.setItem(STORAGE_KEYS.CERTIFICATES, JSON.stringify(updated));
      return updated;
    });
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
  };

  const deleteGalleryItem = async (id: string) => {
    setGallery((prev) => {
      const updated = prev.filter((g) => g.id !== id);
      localStorage.setItem(STORAGE_KEYS.GALLERY, JSON.stringify(updated));
      return updated;
    });
  };

  const reorderGallery = async (newItems: GalleryItem[]) => {
    const reordered = newItems.map((g, idx) => ({ ...g, order: idx + 1 }));
    setGallery(reordered);
    localStorage.setItem(STORAGE_KEYS.GALLERY, JSON.stringify(reordered));
  };

  const updateResume = async (data: ResumeData) => {
    setResume(data);
    localStorage.setItem(STORAGE_KEYS.RESUME, JSON.stringify(data));
  };

  const updateContactInfo = async (data: ContactInfo) => {
    setContactInfo(data);
    localStorage.setItem(STORAGE_KEYS.CONTACT, JSON.stringify(data));
  };

  const saveSocialLink = async (link: SocialLink) => {
    setSocialLinks((prev) => {
      const exists = prev.some((s) => s.id === link.id);
      const updated = exists ? prev.map((s) => (s.id === link.id ? link : s)) : [...prev, link];
      localStorage.setItem(STORAGE_KEYS.SOCIAL, JSON.stringify(updated));
      return updated;
    });
  };

  const deleteSocialLink = async (id: string) => {
    setSocialLinks((prev) => {
      const updated = prev.filter((s) => s.id !== id);
      localStorage.setItem(STORAGE_KEYS.SOCIAL, JSON.stringify(updated));
      return updated;
    });
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
  };

  const toggleMessageRead = async (id: string) => {
    setMessages((prev) => {
      const updated = prev.map((m) => (m.id === id ? { ...m, isRead: !m.isRead } : m));
      localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(updated));
      return updated;
    });
  };

  const deleteMessage = async (id: string) => {
    setMessages((prev) => {
      const updated = prev.filter((m) => m.id !== id);
      localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(updated));
      return updated;
    });
  };

  const updateSEO = async (data: SEOSettings) => {
    setSeoSettings(data);
    localStorage.setItem(STORAGE_KEYS.SEO, JSON.stringify(data));
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
