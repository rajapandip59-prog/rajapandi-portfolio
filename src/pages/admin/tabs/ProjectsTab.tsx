import React, { useState } from "react";
import { usePortfolioData } from "@/context/PortfolioDataContext";
import { Project } from "@/types/cms";
import { ReorderableList } from "@/components/admin/ReorderableList";
import { ImageUploader } from "@/components/admin/ImageUploader";
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
import {
  FolderKanban,
  Plus,
  Edit2,
  Trash2,
  Eye,
  EyeOff,
  Star,
  Github,
  ExternalLink,
  Search,
} from "lucide-react";
import { toast } from "sonner";

export const ProjectsTab: React.FC = () => {
  const { projects, saveProject, deleteProject, reorderProjects } = usePortfolioData();
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [currentProj, setCurrentProj] = useState<Partial<Project>>({
    title: "",
    description: "",
    tech: [],
    gradient: "bg-primary",
    image: "",
    githubUrl: "",
    liveUrl: "",
    category: "AI/ML",
    isFeatured: false,
    isVisible: true,
  });

  const [techInput, setTechInput] = useState("");

  const filteredProjects = projects.filter((p) =>
    p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenAdd = () => {
    setEditingId(null);
    setCurrentProj({
      title: "",
      description: "",
      tech: [],
      gradient: "bg-primary",
      image: "",
      githubUrl: "",
      liveUrl: "",
      category: "AI/ML",
      isFeatured: false,
      isVisible: true,
    });
    setTechInput("");
    setIsModalOpen(true);
  };

  const handleOpenEdit = (proj: Project) => {
    setEditingId(proj.id);
    setCurrentProj(proj);
    setTechInput(proj.tech.join(", "));
    setIsModalOpen(true);
  };

  const handleSave = async () => {
    if (!currentProj.title || !currentProj.description) {
      toast.error("Project title and description are required.");
      return;
    }

    const projectToSave: Project = {
      id: editingId || "proj-" + Date.now(),
      title: currentProj.title || "",
      description: currentProj.description || "",
      tech: techInput.split(",").map((t) => t.trim()).filter((t) => t.length > 0),
      gradient: currentProj.gradient || "bg-primary",
      image: currentProj.image || "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1000",
      githubUrl: currentProj.githubUrl || "",
      liveUrl: currentProj.liveUrl || "",
      category: currentProj.category || "Full Stack",
      isFeatured: Boolean(currentProj.isFeatured),
      isVisible: Boolean(currentProj.isVisible ?? true),
      order: currentProj.order || projects.length + 1,
    };

    await saveProject(projectToSave);
    setIsModalOpen(false);
    toast.success(editingId ? "Project updated!" : "New project added!");
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this project?")) {
      await deleteProject(id);
      toast.success("Project deleted.");
    }
  };

  const toggleVisibility = async (proj: Project) => {
    await saveProject({ ...proj, isVisible: !proj.isVisible });
    toast.info(proj.isVisible ? "Project hidden from portfolio." : "Project published live!");
  };

  const toggleFeatured = async (proj: Project) => {
    await saveProject({ ...proj, isFeatured: !proj.isFeatured });
    toast.success(proj.isFeatured ? "Removed from featured." : "Marked as featured project!");
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <FolderKanban className="w-6 h-6 text-primary" /> Projects Management
          </h2>
          <p className="text-sm text-slate-400">Add, edit, toggle visibility & drag to reorder portfolio projects</p>
        </div>
        <Button onClick={handleOpenAdd} className="bg-primary hover:bg-primary/90 text-white gap-2">
          <Plus className="w-4 h-4" /> Add Project
        </Button>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
        <Input
          placeholder="Filter projects by title or category..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-9 bg-slate-900 border-slate-800 text-white text-sm"
        />
      </div>

      {/* Projects List */}
      {filteredProjects.length === 0 ? (
        <div className="text-center py-12 text-slate-500 bg-slate-900/40 rounded-2xl border border-slate-800">
          No projects found.
        </div>
      ) : (
        <ReorderableList
          items={filteredProjects}
          onReorder={(newItems) => reorderProjects(newItems)}
          renderItem={(proj) => (
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 py-2">
              <div className="flex items-center gap-4 min-w-0">
                <img
                  src={proj.image}
                  alt={proj.title}
                  className="w-16 h-16 object-cover rounded-xl border border-slate-700 bg-slate-950 flex-shrink-0"
                />
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h4 className="text-base font-semibold text-white truncate">{proj.title}</h4>
                    {proj.isFeatured && (
                      <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 text-[10px] font-semibold flex items-center gap-1">
                        <Star className="w-3 h-3 fill-amber-400" /> Featured
                      </span>
                    )}
                    {!proj.isVisible && (
                      <span className="px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 text-[10px]">
                        Hidden
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-400 truncate mt-0.5 max-w-md">{proj.description}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[11px] text-primary font-medium">{proj.category}</span>
                    <span className="text-[11px] text-slate-500">• {proj.tech.join(", ")}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1.5 self-end sm:self-center">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => toggleFeatured(proj)}
                  title={proj.isFeatured ? "Unfeature" : "Feature on top"}
                  className={`h-8 w-8 ${proj.isFeatured ? "text-amber-400" : "text-slate-500 hover:text-amber-400"}`}
                >
                  <Star className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => toggleVisibility(proj)}
                  title={proj.isVisible ? "Hide project" : "Show project"}
                  className={`h-8 w-8 ${proj.isVisible ? "text-slate-300" : "text-slate-600"}`}
                >
                  {proj.isVisible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleOpenEdit(proj)}
                  className="h-8 w-8 text-slate-300 hover:text-white"
                >
                  <Edit2 className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDelete(proj.id)}
                  className="h-8 w-8 text-red-400 hover:text-red-300"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}
        />
      )}

      {/* Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="bg-slate-900 border-slate-800 text-white max-w-xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingId ? "Edit Project" : "Add New Project"}</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <div>
              <ImageUploader
                label="Project Screenshot / Banner"
                value={currentProj.image || ""}
                onChange={(url) => setCurrentProj({ ...currentProj, image: url })}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Project Title</label>
                <Input
                  value={currentProj.title || ""}
                  onChange={(e) => setCurrentProj({ ...currentProj, title: e.target.value })}
                  placeholder="e.g. AI Analytics Dashboard"
                  className="bg-slate-950 border-slate-700 text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Category</label>
                <Input
                  value={currentProj.category || ""}
                  onChange={(e) => setCurrentProj({ ...currentProj, category: e.target.value })}
                  placeholder="e.g. AI/ML, Full Stack, Mobile"
                  className="bg-slate-950 border-slate-700 text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Description</label>
              <Textarea
                rows={3}
                value={currentProj.description || ""}
                onChange={(e) => setCurrentProj({ ...currentProj, description: e.target.value })}
                placeholder="Brief project summary..."
                className="bg-slate-950 border-slate-700 text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Technologies (comma separated)
              </label>
              <Input
                value={techInput}
                onChange={(e) => setTechInput(e.target.value)}
                placeholder="React, Python, TensorFlow, D3.js"
                className="bg-slate-950 border-slate-700 text-white"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">GitHub Repo URL</label>
                <div className="relative">
                  <Github className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <Input
                    value={currentProj.githubUrl || ""}
                    onChange={(e) => setCurrentProj({ ...currentProj, githubUrl: e.target.value })}
                    placeholder="https://github.com/..."
                    className="pl-9 bg-slate-950 border-slate-700 text-white"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Live Demo URL</label>
                <div className="relative">
                  <ExternalLink className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <Input
                    value={currentProj.liveUrl || ""}
                    onChange={(e) => setCurrentProj({ ...currentProj, liveUrl: e.target.value })}
                    placeholder="https://example.com"
                    className="pl-9 bg-slate-950 border-slate-700 text-white"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="isFeatured"
                  checked={currentProj.isFeatured}
                  onChange={(e) => setCurrentProj({ ...currentProj, isFeatured: e.target.checked })}
                  className="accent-primary"
                />
                <label htmlFor="isFeatured" className="text-xs text-slate-300">
                  Feature on home section
                </label>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="isVisible"
                  checked={currentProj.isVisible}
                  onChange={(e) => setCurrentProj({ ...currentProj, isVisible: e.target.checked })}
                  className="accent-primary"
                />
                <label htmlFor="isVisible" className="text-xs text-slate-300">
                  Visible on public site
                </label>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsModalOpen(false)} className="border-slate-700 text-slate-300">
              Cancel
            </Button>
            <Button onClick={handleSave} className="bg-primary hover:bg-primary/90 text-white">
              Save Project
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
