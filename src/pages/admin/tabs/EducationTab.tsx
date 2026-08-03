import React, { useState } from "react";
import { usePortfolioData } from "@/context/PortfolioDataContext";
import { Education } from "@/types/cms";
import { ReorderableList } from "@/components/admin/ReorderableList";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { GraduationCap, Plus, Edit2, Trash2 } from "lucide-react";
import { toast } from "sonner";

export const EducationTab: React.FC = () => {
  const { education, saveEducation, deleteEducation, reorderEducation } = usePortfolioData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [currentEdu, setCurrentEdu] = useState<Partial<Education>>({
    institution: "",
    degree: "B.Tech",
    fieldOfStudy: "Artificial Intelligence & Data Science",
    startYear: "2022",
    endYear: "2026",
    grade: "",
    achievements: "",
  });

  const handleOpenAdd = () => {
    setEditingId(null);
    setCurrentEdu({
      institution: "",
      degree: "B.Tech",
      fieldOfStudy: "Artificial Intelligence & Data Science",
      startYear: "2022",
      endYear: "2026",
      grade: "",
      achievements: "",
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (edu: Education) => {
    setEditingId(edu.id);
    setCurrentEdu(edu);
    setIsModalOpen(true);
  };

  const handleSave = async () => {
    if (!currentEdu.institution || !currentEdu.degree) {
      toast.error("Institution and Degree are required.");
      return;
    }

    const eduToSave: Education = {
      id: editingId || "edu-" + Date.now(),
      institution: currentEdu.institution || "",
      degree: currentEdu.degree || "B.Tech",
      fieldOfStudy: currentEdu.fieldOfStudy || "",
      startYear: currentEdu.startYear || "2022",
      endYear: currentEdu.endYear || "2026",
      grade: currentEdu.grade || "",
      achievements: currentEdu.achievements || "",
      order: currentEdu.order || education.length + 1,
    };

    await saveEducation(eduToSave);
    setIsModalOpen(false);
    toast.success(editingId ? "Education updated!" : "Education entry added!");
  };

  const handleDelete = async (id: string) => {
    if (confirm("Delete this education entry?")) {
      await deleteEducation(id);
      toast.success("Entry removed.");
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <GraduationCap className="w-6 h-6 text-primary" /> Education Management
          </h2>
          <p className="text-sm text-slate-400">Manage academic degrees, institutions, grades & achievements</p>
        </div>
        <Button onClick={handleOpenAdd} className="bg-primary hover:bg-primary/90 text-white gap-2">
          <Plus className="w-4 h-4" /> Add Education
        </Button>
      </div>

      {education.length === 0 ? (
        <div className="text-center py-12 text-slate-500 bg-slate-900/40 rounded-2xl border border-slate-800">
          No education entries added.
        </div>
      ) : (
        <ReorderableList
          items={education}
          onReorder={(newItems) => reorderEducation(newItems)}
          renderItem={(edu) => (
            <div className="flex items-start justify-between gap-4 py-2">
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-base font-semibold text-white">
                    {edu.degree} in {edu.fieldOfStudy}
                  </h4>
                  {edu.grade && (
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-semibold">
                      {edu.grade}
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-400 mt-0.5">
                  {edu.institution} • {edu.startYear} – {edu.endYear}
                </p>
                {edu.achievements && (
                  <p className="text-xs text-slate-300 mt-1 line-clamp-1">{edu.achievements}</p>
                )}
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleOpenEdit(edu)}
                  className="h-8 text-xs text-slate-300 hover:text-white"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDelete(edu.id)}
                  className="h-8 text-xs text-red-400 hover:text-red-300"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </Button>
              </div>
            </div>
          )}
        />
      )}

      {/* Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="bg-slate-900 border-slate-800 text-white max-w-lg">
          <DialogHeader>
            <DialogTitle>{editingId ? "Edit Education" : "Add Education"}</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Institution Name</label>
              <Input
                value={currentEdu.institution || ""}
                onChange={(e) => setCurrentEdu({ ...currentEdu, institution: e.target.value })}
                placeholder="e.g. Christ The King Engineering College"
                className="bg-slate-950 border-slate-700 text-white"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Degree</label>
                <Input
                  value={currentEdu.degree || ""}
                  onChange={(e) => setCurrentEdu({ ...currentEdu, degree: e.target.value })}
                  placeholder="e.g. B.Tech, M.Tech, B.Sc"
                  className="bg-slate-950 border-slate-700 text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Field of Study</label>
                <Input
                  value={currentEdu.fieldOfStudy || ""}
                  onChange={(e) => setCurrentEdu({ ...currentEdu, fieldOfStudy: e.target.value })}
                  placeholder="e.g. Artificial Intelligence & Data Science"
                  className="bg-slate-950 border-slate-700 text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Start Year</label>
                <Input
                  value={currentEdu.startYear || ""}
                  onChange={(e) => setCurrentEdu({ ...currentEdu, startYear: e.target.value })}
                  placeholder="2022"
                  className="bg-slate-950 border-slate-700 text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">End Year</label>
                <Input
                  value={currentEdu.endYear || ""}
                  onChange={(e) => setCurrentEdu({ ...currentEdu, endYear: e.target.value })}
                  placeholder="2026"
                  className="bg-slate-950 border-slate-700 text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Grade / CGPA</label>
                <Input
                  value={currentEdu.grade || ""}
                  onChange={(e) => setCurrentEdu({ ...currentEdu, grade: e.target.value })}
                  placeholder="8.5 CGPA"
                  className="bg-slate-950 border-slate-700 text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Key Achievements & Activities</label>
              <Textarea
                rows={3}
                value={currentEdu.achievements || ""}
                onChange={(e) => setCurrentEdu({ ...currentEdu, achievements: e.target.value })}
                placeholder="Specialized in AI models, data structures, and algorithms..."
                className="bg-slate-950 border-slate-700 text-white"
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsModalOpen(false)} className="border-slate-700 text-slate-300">
              Cancel
            </Button>
            <Button onClick={handleSave} className="bg-primary hover:bg-primary/90 text-white">
              Save Entry
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
