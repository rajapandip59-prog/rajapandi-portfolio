import React, { useState } from "react";
import { usePortfolioData } from "@/context/PortfolioDataContext";
import { AboutData } from "@/types/cms";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Save, UserCheck, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";

export const AboutTab: React.FC = () => {
  const { about, updateAbout } = usePortfolioData();
  const [formData, setFormData] = useState<AboutData>(about);
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await updateAbout(formData);
      toast.success("About section updated successfully!");
    } catch {
      toast.error("Failed to update about section.");
    } finally {
      setIsSaving(false);
    }
  };

  const addHighlight = () => {
    setFormData({
      ...formData,
      highlights: [
        ...formData.highlights,
        { title: "New Highlight", description: "Category", iconName: "Award" },
      ],
    });
  };

  const removeHighlight = (index: number) => {
    setFormData({
      ...formData,
      highlights: formData.highlights.filter((_, idx) => idx !== index),
    });
  };

  const updateHighlight = (index: number, field: string, value: string) => {
    const updated = [...formData.highlights];
    updated[index] = { ...updated[index], [field]: value };
    setFormData({ ...formData, highlights: updated });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <UserCheck className="w-6 h-6 text-primary" /> About Section
          </h2>
          <p className="text-sm text-slate-400">Edit journey story, bio summary & achievement badges</p>
        </div>
        <Button
          type="submit"
          disabled={isSaving}
          className="bg-primary hover:bg-primary/90 text-white gap-2 shadow-lg shadow-primary/20"
        >
          <Save className="w-4 h-4" /> {isSaving ? "Saving..." : "Save Changes"}
        </Button>
      </div>

      <div className="bg-slate-900/60 p-6 rounded-2xl border border-slate-800 space-y-5">
        <h3 className="text-base font-semibold text-white border-b border-slate-800 pb-3">
          Main About Text
        </h3>

        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1.5">Overview Summary</label>
          <Textarea
            value={formData.aboutText}
            onChange={(e) => setFormData({ ...formData, aboutText: e.target.value })}
            rows={3}
            className="bg-slate-950 border-slate-700 text-white"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1.5">Journey Paragraph 1</label>
          <Textarea
            value={formData.journeyText1}
            onChange={(e) => setFormData({ ...formData, journeyText1: e.target.value })}
            rows={4}
            className="bg-slate-950 border-slate-700 text-white"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1.5">Journey Paragraph 2</label>
          <Textarea
            value={formData.journeyText2}
            onChange={(e) => setFormData({ ...formData, journeyText2: e.target.value })}
            rows={4}
            className="bg-slate-950 border-slate-700 text-white"
          />
        </div>
      </div>

      {/* Highlights / Badges */}
      <div className="bg-slate-900/60 p-6 rounded-2xl border border-slate-800 space-y-5">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h3 className="text-base font-semibold text-white">Education & Highlights Badges</h3>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addHighlight}
            className="text-xs border-slate-700 text-slate-200 hover:bg-slate-800 gap-1"
          >
            <Plus className="w-3.5 h-3.5" /> Add Badge
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {formData.highlights.map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 relative space-y-3"
            >
              <button
                type="button"
                onClick={() => removeHighlight(idx)}
                className="absolute top-3 right-3 text-slate-500 hover:text-red-400 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>

              <div>
                <label className="block text-[11px] font-medium text-slate-400 mb-1">Title</label>
                <Input
                  value={item.title}
                  onChange={(e) => updateHighlight(idx, "title", e.target.value)}
                  className="bg-slate-900 border-slate-700 text-sm text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-medium text-slate-400 mb-1">Subtext / Category</label>
                  <Input
                    value={item.description}
                    onChange={(e) => updateHighlight(idx, "description", e.target.value)}
                    className="bg-slate-900 border-slate-700 text-sm text-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-slate-400 mb-1">Icon Name</label>
                  <Input
                    value={item.iconName}
                    onChange={(e) => updateHighlight(idx, "iconName", e.target.value)}
                    placeholder="School, Award, etc."
                    className="bg-slate-900 border-slate-700 text-sm text-white"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </form>
  );
};
