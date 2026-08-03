import React, { useState } from "react";
import { usePortfolioData } from "@/context/PortfolioDataContext";
import { SEOSettings } from "@/types/cms";
import { ImageUploader } from "@/components/admin/ImageUploader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Globe, Save, Search } from "lucide-react";
import { toast } from "sonner";

export const SEOTab: React.FC = () => {
  const { seoSettings, updateSEO } = usePortfolioData();
  const [formData, setFormData] = useState<SEOSettings>(seoSettings);
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await updateSEO(formData);
      document.title = formData.metaTitle;
      toast.success("SEO settings saved!");
    } catch {
      toast.error("Failed to save SEO settings.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-3xl">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Globe className="w-6 h-6 text-primary" /> SEO & Meta Tags
          </h2>
          <p className="text-sm text-slate-400">Configure search engine titles, social share preview card (OG Image) & keywords</p>
        </div>
        <Button
          type="submit"
          disabled={isSaving}
          className="bg-primary hover:bg-primary/90 text-white gap-2 shadow-lg shadow-primary/20"
        >
          <Save className="w-4 h-4" /> {isSaving ? "Saving..." : "Save Settings"}
        </Button>
      </div>

      <div className="bg-slate-900/60 p-6 rounded-2xl border border-slate-800 space-y-5">
        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1.5">Meta Page Title</label>
          <Input
            value={formData.metaTitle}
            onChange={(e) => setFormData({ ...formData, metaTitle: e.target.value })}
            placeholder="Rajapandi P | AI/ML Engineer & Data Scientist Portfolio"
            className="bg-slate-950 border-slate-700 text-white"
            required
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1.5">Meta Description</label>
          <Textarea
            rows={3}
            value={formData.metaDescription}
            onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
            placeholder="Search engine summary of your portfolio website..."
            className="bg-slate-950 border-slate-700 text-white"
            required
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1.5">Meta Keywords (comma separated)</label>
          <Input
            value={formData.keywords}
            onChange={(e) => setFormData({ ...formData, keywords: e.target.value })}
            placeholder="AI Engineer, Machine Learning, Data Science, Portfolio, React"
            className="bg-slate-950 border-slate-700 text-white"
          />
        </div>

        <div>
          <ImageUploader
            label="OpenGraph Social Banner Image (OG Image)"
            value={formData.ogImage}
            onChange={(url) => setFormData({ ...formData, ogImage: url })}
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1.5">Twitter / X Handle</label>
          <Input
            value={formData.twitterHandle}
            onChange={(e) => setFormData({ ...formData, twitterHandle: e.target.value })}
            placeholder="@RajapandiP70029"
            className="bg-slate-950 border-slate-700 text-white"
          />
        </div>
      </div>
    </form>
  );
};
