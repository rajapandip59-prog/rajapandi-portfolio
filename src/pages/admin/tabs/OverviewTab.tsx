import React from "react";
import { usePortfolioData } from "@/context/PortfolioDataContext";
import {
  FolderKanban,
  Award,
  Code2,
  Mail,
  Eye,
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowUpRight,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface OverviewTabProps {
  onNavigateTab: (tabId: string) => void;
}

export const OverviewTab: React.FC<OverviewTabProps> = ({ onNavigateTab }) => {
  const { projects, certificates, skills, messages, profile } = usePortfolioData();

  const unreadMessagesCount = messages.filter((m) => !m.isRead).length;

  const statsCards = [
    {
      title: "Total Projects",
      value: projects.length,
      subtext: `${projects.filter((p) => p.isFeatured).length} Featured`,
      icon: FolderKanban,
      color: "from-blue-500/20 to-indigo-500/20 text-blue-400 border-blue-500/30",
      tab: "projects",
    },
    {
      title: "Certificates",
      value: certificates.length,
      subtext: "Verified Credentials",
      icon: Award,
      color: "from-amber-500/20 to-orange-500/20 text-amber-400 border-amber-500/30",
      tab: "certificates",
    },
    {
      title: "Skills & Tech",
      value: skills.length,
      subtext: "Across 8 categories",
      icon: Code2,
      color: "from-emerald-500/20 to-teal-500/20 text-emerald-400 border-emerald-500/30",
      tab: "skills",
    },
    {
      title: "Contact Inquiries",
      value: messages.length,
      subtext: `${unreadMessagesCount} unread messages`,
      icon: Mail,
      color: "from-purple-500/20 to-pink-500/20 text-purple-400 border-purple-500/30",
      tab: "messages",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary/20 via-slate-900 to-secondary/20 p-8 border border-slate-800">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-semibold mb-3 border border-primary/30">
              <Sparkles className="w-3.5 h-3.5" /> CMS Dashboard Live
            </div>
            <h1 className="text-3xl font-bold text-white tracking-tight">
              Welcome back, {profile.name}!
            </h1>
            <p className="text-sm text-slate-400 mt-1 max-w-xl">
              {profile.title} • {profile.availabilityStatus}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button
              onClick={() => window.open("/", "_blank")}
              variant="outline"
              className="border-slate-700 bg-slate-900/80 hover:bg-slate-800 text-white gap-2 text-xs"
            >
              <Eye className="w-4 h-4 text-primary" /> View Public Site
            </Button>
          </div>
        </div>
      </div>

      {/* Quick Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {statsCards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.title}
              onClick={() => onNavigateTab(card.tab)}
              className="cursor-pointer group relative overflow-hidden rounded-2xl bg-slate-900/60 border border-slate-800 p-6 hover:border-slate-700 transition-all duration-300 hover:scale-[1.02]"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-medium text-slate-400">{card.title}</span>
                <div
                  className={`w-10 h-10 rounded-xl bg-gradient-to-br ${card.color} border flex items-center justify-center`}
                >
                  <Icon className="w-5 h-5" />
                </div>
              </div>
              <div className="text-3xl font-bold text-white mb-1">{card.value}</div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400">{card.subtext}</span>
                <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-white transition-colors" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Messages & System Status */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Inquiries */}
        <div className="lg:col-span-2 rounded-2xl bg-slate-900/60 border border-slate-800 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold text-white">Recent Messages</h3>
              <p className="text-xs text-slate-400">Direct inquiries submitted from portfolio contact form</p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onNavigateTab("messages")}
              className="text-xs text-primary hover:text-primary/80"
            >
              View All ({messages.length})
            </Button>
          </div>

          {messages.length === 0 ? (
            <div className="text-center py-12 text-slate-500 text-sm">
              No messages received yet.
            </div>
          ) : (
            <div className="space-y-3">
              {messages.slice(0, 4).map((msg) => (
                <div
                  key={msg.id}
                  onClick={() => onNavigateTab("messages")}
                  className={`cursor-pointer p-4 rounded-xl border transition-colors flex items-start justify-between gap-4 ${
                    msg.isRead
                      ? "bg-slate-950/40 border-slate-800/80"
                      : "bg-primary/10 border-primary/30"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-semibold text-white">{msg.name}</span>
                      <span className="text-xs text-slate-400">• {msg.email}</span>
                      {!msg.isRead && (
                        <span className="px-2 py-0.5 rounded-full bg-primary text-white text-[10px] font-semibold">
                          New
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-300 font-medium truncate">{msg.subject || "Inquiry"}</p>
                    <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">{msg.message}</p>
                  </div>
                  <span className="text-[11px] text-slate-400 whitespace-nowrap">
                    {new Date(msg.createdAt).toLocaleDateString()}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* System & Content Status */}
        <div className="space-y-6">
          <div className="rounded-2xl bg-slate-900/60 border border-slate-800 p-6">
            <h3 className="text-lg font-bold text-white mb-4">CMS Health</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs py-2 border-b border-slate-800">
                <span className="text-slate-400">Database Engine</span>
                <span className="font-semibold text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Local + Cloud Sync
                </span>
              </div>
              <div className="flex items-center justify-between text-xs py-2 border-b border-slate-800">
                <span className="text-slate-400">Live Public Refresh</span>
                <span className="font-semibold text-blue-400 flex items-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5" /> Immediate
                </span>
              </div>
              <div className="flex items-center justify-between text-xs py-2 border-b border-slate-800">
                <span className="text-slate-400">Image Uploads</span>
                <span className="font-semibold text-purple-400">Compressed & Ready</span>
              </div>
              <div className="flex items-center justify-between text-xs py-2">
                <span className="text-slate-400">Resume PDF</span>
                <span className="font-semibold text-white truncate max-w-[120px]">
                  {profile.name}_Resume.pdf
                </span>
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-gradient-to-br from-secondary/10 to-primary/10 border border-slate-800 p-6">
            <h4 className="text-sm font-semibold text-white mb-2 flex items-center gap-2">
              <Clock className="w-4 h-4 text-primary" /> Quick Tip
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Any content edited in this Admin CMS is saved instantaneously. You can open your public portfolio in a new tab to see live changes!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
