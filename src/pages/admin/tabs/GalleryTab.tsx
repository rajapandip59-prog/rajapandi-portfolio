import React, { useState } from "react";
import { usePortfolioData } from "@/context/PortfolioDataContext";
import { GalleryItem } from "@/types/cms";
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
import { Image as ImageIcon, Plus, Edit2, Trash2, Eye, GripVertical } from "lucide-react";
import { toast } from "sonner";

export const GalleryTab: React.FC = () => {
  const { gallery, saveGalleryItem, deleteGalleryItem, reorderGallery } = usePortfolioData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [currentItem, setCurrentItem] = useState<Partial<GalleryItem>>({
    title: "",
    caption: "",
    imageUrl: "",
    category: "Events",
    dateAdded: new Date().toISOString().split("T")[0],
  });

  const handleOpenAdd = () => {
    setEditingId(null);
    setCurrentItem({
      title: "",
      caption: "",
      imageUrl: "",
      category: "Events",
      dateAdded: new Date().toISOString().split("T")[0],
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: GalleryItem) => {
    setEditingId(item.id);
    setCurrentItem(item);
    setIsModalOpen(true);
  };

  const handleSave = async () => {
    if (!currentItem.imageUrl || !currentItem.title) {
      toast.error("Image and Title are required.");
      return;
    }

    const itemToSave: GalleryItem = {
      id: editingId || "gal-" + Date.now(),
      title: currentItem.title || "",
      caption: currentItem.caption || "",
      imageUrl: currentItem.imageUrl || "",
      category: currentItem.category || "General",
      dateAdded: currentItem.dateAdded || new Date().toISOString().split("T")[0],
      order: currentItem.order || gallery.length + 1,
    };

    await saveGalleryItem(itemToSave);
    setIsModalOpen(false);
    toast.success(editingId ? "Photo updated!" : "Photo added to gallery!");
  };

  const handleDelete = async (id: string) => {
    if (confirm("Delete this photo from gallery?")) {
      await deleteGalleryItem(id);
      toast.success("Photo removed.");
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <ImageIcon className="w-6 h-6 text-primary" /> Photo Gallery
          </h2>
          <p className="text-sm text-slate-400">Upload portfolio photos, event pictures, hackathon highlights & captions</p>
        </div>
        <Button onClick={handleOpenAdd} className="bg-primary hover:bg-primary/90 text-white gap-2">
          <Plus className="w-4 h-4" /> Add Photo
        </Button>
      </div>

      {gallery.length === 0 ? (
        <div className="text-center py-12 text-slate-500 bg-slate-900/40 rounded-2xl border border-slate-800">
          No photos uploaded to gallery yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {gallery.map((item) => (
            <div
              key={item.id}
              className="group relative rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden space-y-3 p-3 hover:border-slate-700 transition-all duration-200"
            >
              <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-950">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <button
                  onClick={() => setPreviewImage(item.imageUrl)}
                  className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white transition-opacity"
                >
                  <Eye className="w-6 h-6" />
                </button>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-semibold text-white truncate">{item.title}</h4>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-medium">
                    {item.category}
                  </span>
                </div>
                {item.caption && (
                  <p className="text-xs text-slate-400 line-clamp-2 mt-1">{item.caption}</p>
                )}
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-800/80">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleOpenEdit(item)}
                  className="h-7 text-xs text-slate-300 hover:text-white"
                >
                  <Edit2 className="w-3.5 h-3.5" /> Edit
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDelete(item.id)}
                  className="h-7 text-xs text-red-400 hover:text-red-300"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="bg-slate-900 border-slate-800 text-white max-w-lg">
          <DialogHeader>
            <DialogTitle>{editingId ? "Edit Gallery Photo" : "Add Photo to Gallery"}</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <div>
              <ImageUploader
                label="Photo Upload"
                value={currentItem.imageUrl || ""}
                onChange={(url) => setCurrentItem({ ...currentItem, imageUrl: url })}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Photo Title</label>
                <Input
                  value={currentItem.title || ""}
                  onChange={(e) => setCurrentItem({ ...currentItem, title: e.target.value })}
                  placeholder="e.g. AI Workshop Keynote"
                  className="bg-slate-950 border-slate-700 text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Category Tag</label>
                <Input
                  value={currentItem.category || ""}
                  onChange={(e) => setCurrentItem({ ...currentItem, category: e.target.value })}
                  placeholder="Events, Hackathons, Projects, Personal"
                  className="bg-slate-950 border-slate-700 text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Caption / Story</label>
              <Textarea
                rows={3}
                value={currentItem.caption || ""}
                onChange={(e) => setCurrentItem({ ...currentItem, caption: e.target.value })}
                placeholder="Details about where this photo was taken..."
                className="bg-slate-950 border-slate-700 text-white"
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsModalOpen(false)} className="border-slate-700 text-slate-300">
              Cancel
            </Button>
            <Button onClick={handleSave} className="bg-primary hover:bg-primary/90 text-white">
              Save Photo
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Preview Full Image Lightbox Modal */}
      <Dialog open={Boolean(previewImage)} onOpenChange={() => setPreviewImage(null)}>
        <DialogContent className="bg-slate-950 border-slate-800 text-white max-w-3xl p-2">
          {previewImage && (
            <img src={previewImage} alt="Full resolution preview" className="w-full h-auto rounded-lg max-h-[80vh] object-contain" />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
