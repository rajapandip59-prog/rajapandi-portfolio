import React, { useState } from "react";
import { usePortfolioData } from "@/context/PortfolioDataContext";
import { SocialLink } from "@/types/cms";
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
import { Share2, Plus, Edit2, Trash2, ExternalLink } from "lucide-react";
import { toast } from "sonner";

export const SocialTab: React.FC = () => {
  const { socialLinks, saveSocialLink, deleteSocialLink, reorderSocialLinks } = usePortfolioData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [currentLink, setCurrentLink] = useState<Partial<SocialLink>>({
    name: "",
    iconName: "Github",
    username: "",
    subtext: "",
    gradient: "bg-zinc-900",
    url: "",
  });

  const handleOpenAdd = () => {
    setEditingId(null);
    setCurrentLink({
      name: "",
      iconName: "Github",
      username: "",
      subtext: "Follow",
      gradient: "bg-primary",
      url: "https://",
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (link: SocialLink) => {
    setEditingId(link.id);
    setCurrentLink(link);
    setIsModalOpen(true);
  };

  const handleSave = async () => {
    if (!currentLink.name || !currentLink.url) {
      toast.error("Platform name and URL are required.");
      return;
    }

    const linkToSave: SocialLink = {
      id: editingId || "soc-" + Date.now(),
      name: currentLink.name || "",
      iconName: currentLink.iconName || "Share2",
      username: currentLink.username || "",
      subtext: currentLink.subtext || "Follow",
      gradient: currentLink.gradient || "bg-primary",
      url: currentLink.url || "",
      order: currentLink.order || socialLinks.length + 1,
    };

    await saveSocialLink(linkToSave);
    setIsModalOpen(false);
    toast.success(editingId ? "Social link updated!" : "Social link added!");
  };

  const handleDelete = async (id: string) => {
    if (confirm("Delete this social link?")) {
      await deleteSocialLink(id);
      toast.success("Link removed.");
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Share2 className="w-6 h-6 text-primary" /> Social & Profile Links
          </h2>
          <p className="text-sm text-slate-400">Manage custom social media accounts, badges & profile links</p>
        </div>
        <Button onClick={handleOpenAdd} className="bg-primary hover:bg-primary/90 text-white gap-2">
          <Plus className="w-4 h-4" /> Add Social Link
        </Button>
      </div>

      {socialLinks.length === 0 ? (
        <div className="text-center py-12 text-slate-500 bg-slate-900/40 rounded-2xl border border-slate-800">
          No social links added.
        </div>
      ) : (
        <ReorderableList
          items={socialLinks}
          onReorder={(newItems) => reorderSocialLinks(newItems)}
          renderItem={(link) => (
            <div className="flex items-center justify-between gap-4 py-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-white text-xs">
                  {link.name.substring(0, 2).toUpperCase()}
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">{link.name}</h4>
                  <p className="text-xs text-slate-400">{link.username} • {link.subtext}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 text-slate-400 hover:text-white"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleOpenEdit(link)}
                  className="h-8 text-xs text-slate-300 hover:text-white"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDelete(link.id)}
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
        <DialogContent className="bg-slate-900 border-slate-800 text-white max-w-md">
          <DialogHeader>
            <DialogTitle>{editingId ? "Edit Social Link" : "Add Social Link"}</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Platform Name</label>
              <Input
                value={currentLink.name || ""}
                onChange={(e) => setCurrentLink({ ...currentLink, name: e.target.value })}
                placeholder="e.g. GitHub, LinkedIn, X, LeetCode"
                className="bg-slate-950 border-slate-700 text-white"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Lucide Icon Name</label>
                <Input
                  value={currentLink.iconName || ""}
                  onChange={(e) => setCurrentLink({ ...currentLink, iconName: e.target.value })}
                  placeholder="Github, Linkedin, Twitter, X, Youtube, Mail..."
                  className="bg-slate-950 border-slate-700 text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Username / Handle</label>
                <Input
                  value={currentLink.username || ""}
                  onChange={(e) => setCurrentLink({ ...currentLink, username: e.target.value })}
                  placeholder="@handle"
                  className="bg-slate-950 border-slate-700 text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Subtext / Badge Text</label>
              <Input
                value={currentLink.subtext || ""}
                onChange={(e) => setCurrentLink({ ...currentLink, subtext: e.target.value })}
                placeholder="e.g. 10K+ followers, Always available"
                className="bg-slate-950 border-slate-700 text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Profile URL Link</label>
              <Input
                value={currentLink.url || ""}
                onChange={(e) => setCurrentLink({ ...currentLink, url: e.target.value })}
                placeholder="https://..."
                className="bg-slate-950 border-slate-700 text-white"
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsModalOpen(false)} className="border-slate-700 text-slate-300">
              Cancel
            </Button>
            <Button onClick={handleSave} className="bg-primary hover:bg-primary/90 text-white">
              Save Link
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
