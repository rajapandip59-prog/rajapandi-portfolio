import React, { useState } from "react";
import { usePortfolioData } from "@/context/PortfolioDataContext";
import { Skill } from "@/types/cms";
import { ReorderableList } from "@/components/admin/ReorderableList";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Code2, Plus, Edit2, Trash2, Search } from "lucide-react";
import { toast } from "sonner";

export const SkillsTab: React.FC = () => {
  const { skills, saveSkill, deleteSkill, reorderSkills } = usePortfolioData();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentSkill, setCurrentSkill] = useState<Partial<Skill>>({
    name: "",
    level: 80,
    category: "Frontend",
    iconName: "Code",
  });
  const [editingId, setEditingId] = useState<string | null>(null);

  const categories = ["All", ...Array.from(new Set(skills.map((s) => s.category)))];

  const filteredSkills = skills.filter((s) => {
    const matchesSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = selectedCategory === "All" || s.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  const handleOpenAdd = () => {
    setEditingId(null);
    setCurrentSkill({
      name: "",
      level: 80,
      category: "Frontend",
      iconName: "Code",
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (skill: Skill) => {
    setEditingId(skill.id);
    setCurrentSkill(skill);
    setIsModalOpen(true);
  };

  const handleSave = async () => {
    if (!currentSkill.name) {
      toast.error("Skill name is required.");
      return;
    }

    const skillToSave: Skill = {
      id: editingId || "skill-" + Date.now(),
      name: currentSkill.name || "",
      level: Number(currentSkill.level) || 80,
      category: currentSkill.category || "General",
      iconName: currentSkill.iconName || "Code",
      order: currentSkill.order || skills.length + 1,
    };

    await saveSkill(skillToSave);
    setIsModalOpen(false);
    toast.success(editingId ? "Skill updated!" : "New skill added!");
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this skill?")) {
      await deleteSkill(id);
      toast.success("Skill removed.");
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Code2 className="w-6 h-6 text-primary" /> Skills Management
          </h2>
          <p className="text-sm text-slate-400">Add, edit proficiency percentage & drag to reorder</p>
        </div>
        <Button onClick={handleOpenAdd} className="bg-primary hover:bg-primary/90 text-white gap-2">
          <Plus className="w-4 h-4" /> Add New Skill
        </Button>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col sm:flex-row items-center gap-4 bg-slate-900/60 p-4 rounded-xl border border-slate-800">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <Input
            placeholder="Search skills..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 bg-slate-950 border-slate-700 text-white text-sm"
          />
        </div>

        <div className="flex gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? "bg-primary text-white"
                  : "bg-slate-800 text-slate-300 hover:bg-slate-700"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Skill List with Drag & Drop */}
      {filteredSkills.length === 0 ? (
        <div className="text-center py-12 text-slate-500 bg-slate-900/40 rounded-2xl border border-slate-800">
          No skills found.
        </div>
      ) : (
        <ReorderableList
          items={filteredSkills}
          onReorder={(newItems) => reorderSkills(newItems)}
          renderItem={(skill) => (
            <div className="flex items-center justify-between gap-4 py-1">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-primary text-sm">
                  {skill.level}%
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">{skill.name}</h4>
                  <p className="text-xs text-slate-400">{skill.category} • Icon: {skill.iconName}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleOpenEdit(skill)}
                  className="h-8 text-xs text-slate-300 hover:text-white hover:bg-slate-800"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDelete(skill.id)}
                  className="h-8 text-xs text-red-400 hover:text-red-300 hover:bg-red-500/20"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </Button>
              </div>
            </div>
          )}
        />
      )}

      {/* Add / Edit Skill Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="bg-slate-900 border-slate-800 text-white max-w-md">
          <DialogHeader>
            <DialogTitle>{editingId ? "Edit Skill" : "Add New Skill"}</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Skill Name</label>
              <Input
                value={currentSkill.name || ""}
                onChange={(e) => setCurrentSkill({ ...currentSkill, name: e.target.value })}
                placeholder="e.g. Python, PyTorch, React"
                className="bg-slate-950 border-slate-700 text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Proficiency Level ({currentSkill.level}%)
              </label>
              <input
                type="range"
                min="1"
                max="100"
                value={currentSkill.level || 80}
                onChange={(e) => setCurrentSkill({ ...currentSkill, level: Number(e.target.value) })}
                className="w-full accent-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Category</label>
              <Input
                value={currentSkill.category || ""}
                onChange={(e) => setCurrentSkill({ ...currentSkill, category: e.target.value })}
                placeholder="e.g. AI/ML, Languages, Frontend, Backend, DevOps"
                className="bg-slate-950 border-slate-700 text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Lucide Icon Name</label>
              <Input
                value={currentSkill.iconName || ""}
                onChange={(e) => setCurrentSkill({ ...currentSkill, iconName: e.target.value })}
                placeholder="Code, Atom, Server, Database, Cloud, GitBranch, etc."
                className="bg-slate-950 border-slate-700 text-white"
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsModalOpen(false)} className="border-slate-700 text-slate-300">
              Cancel
            </Button>
            <Button onClick={handleSave} className="bg-primary hover:bg-primary/90 text-white">
              Save Skill
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
