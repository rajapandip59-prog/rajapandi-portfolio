import React, { useState } from "react";
import { usePortfolioData } from "@/context/PortfolioDataContext";
import { Experience } from "@/types/cms";
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
import { Briefcase, Plus, Edit2, Trash2 } from "lucide-react";
import { toast } from "sonner";

export const ExperienceTab: React.FC = () => {
  const { experiences, saveExperience, deleteExperience, reorderExperiences } = usePortfolioData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [currentExp, setCurrentExp] = useState<Partial<Experience>>({
    company: "",
    role: "",
    location: "Remote",
    startDate: "",
    endDate: "Present",
    isCurrent: true,
    description: [""],
    techStack: [],
  });

  const [descInput, setDescInput] = useState("");
  const [techInput, setTechInput] = useState("");

  const handleOpenAdd = () => {
    setEditingId(null);
    setCurrentExp({
      company: "",
      role: "",
      location: "Remote",
      startDate: "2024-01",
      endDate: "Present",
      isCurrent: true,
      description: [""],
      techStack: [],
    });
    setDescInput("");
    setTechInput("");
    setIsModalOpen(true);
  };

  const handleOpenEdit = (exp: Experience) => {
    setEditingId(exp.id);
    setCurrentExp(exp);
    setDescInput(exp.description.join("\n"));
    setTechInput(exp.techStack.join(", "));
    setIsModalOpen(true);
  };

  const handleSave = async () => {
    if (!currentExp.company || !currentExp.role) {
      toast.error("Company and Role are required.");
      return;
    }

    const expToSave: Experience = {
      id: editingId || "exp-" + Date.now(),
      company: currentExp.company || "",
      role: currentExp.role || "",
      location: currentExp.location || "Remote",
      startDate: currentExp.startDate || "",
      endDate: currentExp.isCurrent ? "Present" : currentExp.endDate || "",
      isCurrent: Boolean(currentExp.isCurrent),
      description: descInput.split("\n").filter((l) => l.trim().length > 0),
      techStack: techInput.split(",").map((t) => t.trim()).filter((t) => t.length > 0),
      order: currentExp.order || experiences.length + 1,
    };

    await saveExperience(expToSave);
    setIsModalOpen(false);
    toast.success(editingId ? "Experience updated!" : "Experience added!");
  };

  const handleDelete = async (id: string) => {
    if (confirm("Delete this experience entry?")) {
      await deleteExperience(id);
      toast.success("Entry removed.");
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Briefcase className="w-6 h-6 text-primary" /> Work Experience
          </h2>
          <p className="text-sm text-slate-400">Manage work timeline, responsibilities & technology tags</p>
        </div>
        <Button onClick={handleOpenAdd} className="bg-primary hover:bg-primary/90 text-white gap-2">
          <Plus className="w-4 h-4" /> Add Experience
        </Button>
      </div>

      {experiences.length === 0 ? (
        <div className="text-center py-12 text-slate-500 bg-slate-900/40 rounded-2xl border border-slate-800">
          No experience entries added.
        </div>
      ) : (
        <ReorderableList
          items={experiences}
          onReorder={(newItems) => reorderExperiences(newItems)}
          renderItem={(exp) => (
            <div className="flex items-start justify-between gap-4 py-2">
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-base font-semibold text-white">{exp.role}</h4>
                  <span className="text-xs text-primary font-medium">@ {exp.company}</span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">
                  {exp.startDate} – {exp.endDate} • {exp.location}
                </p>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {exp.techStack.map((tech, idx) => (
                    <span key={idx} className="px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 text-[10px]">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleOpenEdit(exp)}
                  className="h-8 text-xs text-slate-300 hover:text-white"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDelete(exp.id)}
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
            <DialogTitle>{editingId ? "Edit Experience" : "Add Experience"}</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Company / Organization</label>
                <Input
                  value={currentExp.company || ""}
                  onChange={(e) => setCurrentExp({ ...currentExp, company: e.target.value })}
                  placeholder="e.g. AI Tech Solutions"
                  className="bg-slate-950 border-slate-700 text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Job Title / Role</label>
                <Input
                  value={currentExp.role || ""}
                  onChange={(e) => setCurrentExp({ ...currentExp, role: e.target.value })}
                  placeholder="e.g. AI / ML Developer Intern"
                  className="bg-slate-950 border-slate-700 text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Start Date</label>
                <Input
                  value={currentExp.startDate || ""}
                  onChange={(e) => setCurrentExp({ ...currentExp, startDate: e.target.value })}
                  placeholder="2024-01"
                  className="bg-slate-950 border-slate-700 text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">End Date</label>
                <Input
                  disabled={currentExp.isCurrent}
                  value={currentExp.isCurrent ? "Present" : currentExp.endDate || ""}
                  onChange={(e) => setCurrentExp({ ...currentExp, endDate: e.target.value })}
                  placeholder="Present"
                  className="bg-slate-950 border-slate-700 text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Location</label>
                <Input
                  value={currentExp.location || ""}
                  onChange={(e) => setCurrentExp({ ...currentExp, location: e.target.value })}
                  placeholder="Remote / On-site"
                  className="bg-slate-950 border-slate-700 text-white"
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="isCurrent"
                checked={currentExp.isCurrent}
                onChange={(e) => setCurrentExp({ ...currentExp, isCurrent: e.target.checked })}
                className="accent-primary"
              />
              <label htmlFor="isCurrent" className="text-xs text-slate-300">Currently working here</label>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Description Bullets (one bullet per line)
              </label>
              <Textarea
                rows={4}
                value={descInput}
                onChange={(e) => setDescInput(e.target.value)}
                placeholder="Built predictive ML models using Python..."
                className="bg-slate-950 border-slate-700 text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Technologies Used (comma separated)
              </label>
              <Input
                value={techInput}
                onChange={(e) => setTechInput(e.target.value)}
                placeholder="Python, PyTorch, React, Docker"
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
