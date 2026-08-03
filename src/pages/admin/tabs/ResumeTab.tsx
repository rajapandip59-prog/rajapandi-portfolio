import React, { useState } from "react";
import { usePortfolioData } from "@/context/PortfolioDataContext";
import { ResumeData } from "@/types/cms";
import { ImageUploader } from "@/components/admin/ImageUploader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FileText, Save, Download, Eye, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

export const ResumeTab: React.FC = () => {
  const { resume, updateResume } = usePortfolioData();
  const [formData, setFormData] = useState<ResumeData>(resume);
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await updateResume({
        ...formData,
        lastUpdated: new Date().toISOString().split("T")[0],
      });
      toast.success("Resume updated successfully!");
    } catch {
      toast.error("Failed to update resume.");
    } finally {
      setIsSaving(false);
    }
  };

  const handlePreview = () => {
    if (!formData.fileUrl) {
      toast.error("No resume PDF uploaded.");
      return;
    }
    window.open(formData.fileUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-3xl">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <FileText className="w-6 h-6 text-primary" /> Resume Management
          </h2>
          <p className="text-sm text-slate-400">Upload new PDF resume & update public site download button</p>
        </div>
        <Button
          type="submit"
          disabled={isSaving}
          className="bg-primary hover:bg-primary/90 text-white gap-2 shadow-lg shadow-primary/20"
        >
          <Save className="w-4 h-4" /> {isSaving ? "Saving..." : "Save Resume"}
        </Button>
      </div>

      <div className="bg-slate-900/60 p-6 rounded-2xl border border-slate-800 space-y-6">
        <div className="flex items-center justify-between p-4 rounded-xl bg-slate-950 border border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-primary/20 text-primary flex items-center justify-center">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">Active Public Resume</h4>
              <p className="text-xs text-slate-400">
                Last updated: <span className="text-slate-200">{formData.lastUpdated}</span>
              </p>
            </div>
          </div>

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handlePreview}
            className="border-slate-700 text-slate-200 hover:bg-slate-800 gap-1 text-xs"
          >
            <Eye className="w-4 h-4 text-primary" /> Preview File
          </Button>
        </div>

        <div>
          <ImageUploader
            label="Upload / Replace Resume PDF File"
            value={formData.fileUrl}
            onChange={(url) => setFormData({ ...formData, fileUrl: url })}
            acceptPdf={true}
          />
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">File Display Name</label>
            <Input
              value={formData.fileName}
              onChange={(e) => setFormData({ ...formData, fileName: e.target.value })}
              placeholder="Rajapandi_P_Resume.pdf"
              className="bg-slate-950 border-slate-700 text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">Resume Page Title</label>
            <Input
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="AI & ML Specialist Resume"
              className="bg-slate-950 border-slate-700 text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">Public Description</label>
            <Textarea
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Brief summary shown on resume download page..."
              className="bg-slate-950 border-slate-700 text-white"
            />
          </div>
        </div>
      </div>
    </form>
  );
};
