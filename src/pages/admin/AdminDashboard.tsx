import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { usePortfolioData } from "@/context/PortfolioDataContext";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  User,
  UserCheck,
  Code2,
  Briefcase,
  GraduationCap,
  FolderKanban,
  Award,
  Image as ImageIcon,
  FileText,
  Mail,
  Share2,
  Globe,
  Sliders,
  LogOut,
  Eye,
  Menu,
  X,
  Sparkles,
  ChevronRight,
  Search,
} from "lucide-react";
import { Button } from "@/components/ui/button";

import { OverviewTab } from "./tabs/OverviewTab";
import { ProfileTab } from "./tabs/ProfileTab";
import { AboutTab } from "./tabs/AboutTab";
import { SkillsTab } from "./tabs/SkillsTab";
import { ExperienceTab } from "./tabs/ExperienceTab";
import { EducationTab } from "./tabs/EducationTab";
import { ProjectsTab } from "./tabs/ProjectsTab";
import { CertificatesTab } from "./tabs/CertificatesTab";
import { GalleryTab } from "./tabs/GalleryTab";
import { ResumeTab } from "./tabs/ResumeTab";
import { ContactTab } from "./tabs/ContactTab";
import { SocialTab } from "./tabs/SocialTab";
import { SEOTab } from "./tabs/SEOTab";
import { MessagesTab } from "./tabs/MessagesTab";
import { SettingsTab } from "./tabs/SettingsTab";

export const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("overview");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  const { logout, userEmail } = useAuth();
  const { profile, messages } = usePortfolioData();
  const navigate = useNavigate();

  const unreadMessages = messages.filter((m) => !m.isRead).length;

  const navItems = [
    { id: "overview", label: "Dashboard Overview", icon: LayoutDashboard },
    { id: "profile", label: "Profile", icon: User },
    { id: "about", label: "About", icon: UserCheck },
    { id: "skills", label: "Skills", icon: Code2 },
    { id: "experience", label: "Experience", icon: Briefcase },
    { id: "education", label: "Education", icon: GraduationCap },
    { id: "projects", label: "Projects", icon: FolderKanban },
    { id: "certificates", label: "Certificates", icon: Award },
    { id: "gallery", label: "Gallery / Photos", icon: ImageIcon },
    { id: "resume", label: "Resume", icon: FileText },
    { id: "contact", label: "Contact Info", icon: Mail },
    { id: "social", label: "Social Links", icon: Share2 },
    { id: "seo", label: "SEO Settings", icon: Globe },
    { id: "messages", label: "Messages", icon: Mail, badge: unreadMessages },
    { id: "settings", label: "Settings", icon: Sliders },
  ];

  const handleLogout = async () => {
    await logout();
    navigate("/admin/login");
  };

  const renderActiveTab = () => {
    switch (activeTab) {
      case "overview":
        return <OverviewTab onNavigateTab={(tab) => setActiveTab(tab)} />;
      case "profile":
        return <ProfileTab />;
      case "about":
        return <AboutTab />;
      case "skills":
        return <SkillsTab />;
      case "experience":
        return <ExperienceTab />;
      case "education":
        return <EducationTab />;
      case "projects":
        return <ProjectsTab />;
      case "certificates":
        return <CertificatesTab />;
      case "gallery":
        return <GalleryTab />;
      case "resume":
        return <ResumeTab />;
      case "contact":
        return <ContactTab />;
      case "social":
        return <SocialTab />;
      case "seo":
        return <SEOTab />;
      case "messages":
        return <MessagesTab />;
      case "settings":
        return <SettingsTab />;
      default:
        return <OverviewTab onNavigateTab={(tab) => setActiveTab(tab)} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col lg:flex-row">
      {/* Sidebar for Desktop */}
      <aside className="hidden lg:flex w-72 flex-col bg-slate-900/90 border-r border-slate-800/80 p-5 shrink-0 min-h-screen justify-between sticky top-0 h-screen overflow-y-auto">
        <div>
          {/* Logo / Admin Identity */}
          <div className="flex items-center gap-3 px-3 py-4 mb-6 border-b border-slate-800/80">
            <img
              src={profile.profilePhoto}
              alt="Admin Profile"
              className="w-10 h-10 rounded-full object-cover border-2 border-primary/50"
            />
            <div className="overflow-hidden">
              <h3 className="text-sm font-bold text-white truncate">{profile.name}</h3>
              <p className="text-[11px] text-slate-400 truncate">{userEmail || "Admin User"}</p>
            </div>
          </div>

          {/* Nav Items */}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all duration-150 ${
                    isActive
                      ? "bg-primary text-white font-semibold shadow-md shadow-primary/20"
                      : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-slate-400"}`} />
                    <span>{item.label}</span>
                  </div>

                  {Boolean(item.badge) && item.badge! > 0 && (
                    <span className="px-2 py-0.5 rounded-full bg-red-500 text-white text-[10px] font-bold">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="pt-4 border-t border-slate-800/80 space-y-2">
          <Button
            onClick={() => window.open("/", "_blank")}
            variant="outline"
            className="w-full text-xs border-slate-700 bg-slate-900 text-slate-200 hover:bg-slate-800 justify-start gap-2"
          >
            <Eye className="w-4 h-4 text-primary" /> View Public Site
          </Button>

          <Button
            onClick={handleLogout}
            variant="ghost"
            className="w-full text-xs text-red-400 hover:text-red-300 hover:bg-red-500/10 justify-start gap-2"
          >
            <LogOut className="w-4 h-4" /> Sign Out
          </Button>
        </div>
      </aside>

      {/* Main Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Navbar */}
        <header className="h-16 border-b border-slate-800/80 bg-slate-900/60 backdrop-blur-md px-6 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden text-slate-300 hover:text-white"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>

            <span className="text-sm font-semibold text-white capitalize flex items-center gap-2">
              <span className="text-slate-400">Admin</span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
              <span>{navItems.find((n) => n.id === activeTab)?.label}</span>
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Button
              onClick={() => window.open("/", "_blank")}
              size="sm"
              variant="outline"
              className="hidden sm:flex text-xs border-slate-700 bg-slate-900 text-slate-200 hover:bg-slate-800 gap-1.5"
            >
              <Eye className="w-3.5 h-3.5 text-primary" /> Preview Site
            </Button>

            <Button
              onClick={handleLogout}
              size="sm"
              variant="ghost"
              className="text-xs text-red-400 hover:text-red-300 hover:bg-red-500/10 gap-1.5"
            >
              <LogOut className="w-3.5 h-3.5" /> Logout
            </Button>
          </div>
        </header>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-slate-900 border-b border-slate-800 p-4 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium ${
                    isActive ? "bg-primary text-white" : "text-slate-300 hover:bg-slate-800"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </div>
                  {Boolean(item.badge) && item.badge! > 0 && (
                    <span className="px-2 py-0.5 rounded-full bg-red-500 text-white text-[10px]">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        )}

        {/* Tab Content Container */}
        <main className="flex-1 p-6 md:p-10 max-w-6xl w-full mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {renderActiveTab()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};
export default AdminDashboard;
