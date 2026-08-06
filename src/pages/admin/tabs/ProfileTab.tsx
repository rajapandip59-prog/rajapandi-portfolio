import React, { useState } from "react";
import { usePortfolioData } from "@/context/PortfolioDataContext";
import { Profile } from "@/types/cms";
import { ImageUploader } from "@/components/admin/ImageUploader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Save, User, MapPin, Mail, Phone, Sparkles } from "lucide-react";
import { toast } from "sonner";

export const ProfileTab: React.FC = () => {
  const { profile, updateProfile } = usePortfolioData();
  const [formData, setFormData] = useState<Profile>(profile);
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await updateProfile(formData);
      toast.success("Profile updated successfully!");
    } catch {
      toast.error("Failed to update profile.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <User className="w-6 h-6 text-primary" /> Profile Management
          </h2>
          <p className="text-sm text-slate-400">Manage hero details, profile photo, bio & contact metadata</p>
        </div>
        <Button
          type="submit"
          disabled={isSaving}
          className="bg-primary hover:bg-primary/90 text-white gap-2 shadow-lg shadow-primary/20"
        >
          <Save className="w-4 h-4" /> {isSaving ? "Saving..." : "Save Changes"}
        </Button>
      </div>

      {/* Profile & Cover Images */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-900/60 p-6 rounded-2xl border border-slate-800">
        <div className="space-y-4">
          <ImageUploader
            label="Profile Photo (Hero & About)"
            value={formData.profilePhoto}
            onChange={(url) => setFormData({ ...formData, profilePhoto: url })}
          />
          
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
            <label className="block text-xs font-semibold text-slate-200 mb-2">
              🎯 Photo Alignment & Head Adjust (Focus Point)
            </label>
            <div className="flex flex-wrap gap-2 mb-3">
              {[
                { label: "👤 Top / Head Focus (15%)", val: "center 15%" },
                { label: "⬆️ Top Edge", val: "center top" },
                { label: "↕️ Upper Chest (30%)", val: "center 30%" },
                { label: "⏺️ Center", val: "center center" },
              ].map((pos) => (
                <button
                  key={pos.val}
                  type="button"
                  onClick={() => setFormData({ ...formData, photoPosition: pos.val })}
                  className={`text-xs px-3 py-1.5 rounded-lg border transition-all ${
                    (formData.photoPosition || "center 15%") === pos.val
                      ? "bg-primary border-primary text-white font-medium"
                      : "bg-slate-900 border-slate-700 text-slate-300 hover:border-slate-500"
                  }`}
                >
                  {pos.label}
                </button>
              ))}
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400">Custom Position:</span>
              <Input
                value={formData.photoPosition || "center 15%"}
                onChange={(e) => setFormData({ ...formData, photoPosition: e.target.value })}
                placeholder="e.g. center 15% or center top"
                className="bg-slate-900 border-slate-700 text-xs text-white h-8 max-w-[200px]"
              />
            </div>
          </div>
        </div>

        <div>
          <ImageUploader
            label="Cover / Background Image"
            value={formData.coverImage}
            onChange={(url) => setFormData({ ...formData, coverImage: url })}
          />
        </div>
      </div>

      {/* Personal Identity */}
      <div className="bg-slate-900/60 p-6 rounded-2xl border border-slate-800 space-y-5">
        <h3 className="text-base font-semibold text-white border-b border-slate-800 pb-3">
          Personal Identity
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">Full Name</label>
            <Input
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="bg-slate-950 border-slate-700 text-white"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">Professional Title</label>
            <Input
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="bg-slate-950 border-slate-700 text-white"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1.5">Tagline / Motto</label>
          <Input
            value={formData.tagline}
            onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
            className="bg-slate-950 border-slate-700 text-white"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1.5">Hero Summary Description</label>
          <Textarea
            value={formData.heroDescription}
            onChange={(e) => setFormData({ ...formData, heroDescription: e.target.value })}
            rows={3}
            className="bg-slate-950 border-slate-700 text-white"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1.5">Full Bio</label>
          <Textarea
            value={formData.bio}
            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
            rows={4}
            className="bg-slate-950 border-slate-700 text-white"
          />
        </div>
      </div>

      {/* Contact & Availability */}
      <div className="bg-slate-900/60 p-6 rounded-2xl border border-slate-800 space-y-5">
        <h3 className="text-base font-semibold text-white border-b border-slate-800 pb-3">
          Location & Availability
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">Location</label>
            <div className="relative">
              <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <Input
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="pl-9 bg-slate-950 border-slate-700 text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">Primary Email</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <Input
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="pl-9 bg-slate-950 border-slate-700 text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">Phone Number</label>
            <div className="relative">
              <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <Input
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="pl-9 bg-slate-950 border-slate-700 text-white"
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1.5">Availability Status</label>
          <Input
            value={formData.availabilityStatus}
            onChange={(e) => setFormData({ ...formData, availabilityStatus: e.target.value })}
            placeholder="e.g. Available for hire & freelance projects"
            className="bg-slate-950 border-slate-700 text-white"
          />
        </div>
      </div>

      {/* Stats Counter Metrics */}
      <div className="bg-slate-900/60 p-6 rounded-2xl border border-slate-800 space-y-5">
        <h3 className="text-base font-semibold text-white border-b border-slate-800 pb-3 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-primary" /> Hero Stats Badges
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">Projects Count</label>
            <Input
              value={formData.stats.projects}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  stats: { ...formData.stats, projects: e.target.value },
                })
              }
              className="bg-slate-950 border-slate-700 text-white font-bold"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">Clients Count</label>
            <Input
              value={formData.stats.clients}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  stats: { ...formData.stats, clients: e.target.value },
                })
              }
              className="bg-slate-950 border-slate-700 text-white font-bold"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">Awards / Certs</label>
            <Input
              value={formData.stats.awards}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  stats: { ...formData.stats, awards: e.target.value },
                })
              }
              className="bg-slate-950 border-slate-700 text-white font-bold"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">Years Experience</label>
            <Input
              value={formData.stats.experience}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  stats: { ...formData.stats, experience: e.target.value },
                })
              }
              className="bg-slate-950 border-slate-700 text-white font-bold"
            />
          </div>
        </div>
      </div>
    </form>
  );
};
