import React, { useState } from "react";
import { usePortfolioData } from "@/context/PortfolioDataContext";
import { Certificate } from "@/types/cms";
import { ReorderableList } from "@/components/admin/ReorderableList";
import { ImageUploader } from "@/components/admin/ImageUploader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Award, Plus, Edit2, Trash2, ExternalLink, Calendar } from "lucide-react";
import { toast } from "sonner";

export const CertificatesTab: React.FC = () => {
  const { certificates, saveCertificate, deleteCertificate, reorderCertificates } = usePortfolioData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [currentCert, setCurrentCert] = useState<Partial<Certificate>>({
    title: "",
    issuer: "",
    date: "",
    credentialId: "",
    credentialUrl: "",
    image: "",
    gradient: "bg-primary",
  });

  const handleOpenAdd = () => {
    setEditingId(null);
    setCurrentCert({
      title: "",
      issuer: "",
      date: new Date().toISOString().split("T")[0],
      credentialId: "",
      credentialUrl: "",
      image: "",
      gradient: "bg-primary",
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (cert: Certificate) => {
    setEditingId(cert.id);
    setCurrentCert(cert);
    setIsModalOpen(true);
  };

  const handleSave = async () => {
    if (!currentCert.title || !currentCert.issuer) {
      toast.error("Certificate title and issuing organization are required.");
      return;
    }

    const certToSave: Certificate = {
      id: editingId || "cert-" + Date.now(),
      title: currentCert.title || "",
      issuer: currentCert.issuer || "",
      date: currentCert.date || new Date().toISOString().split("T")[0],
      credentialId: currentCert.credentialId || "",
      credentialUrl: currentCert.credentialUrl || currentCert.image || "",
      image: currentCert.image || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=1000",
      gradient: currentCert.gradient || "bg-primary",
      order: currentCert.order || certificates.length + 1,
    };

    await saveCertificate(certToSave);
    setIsModalOpen(false);
    toast.success(editingId ? "Certificate updated!" : "Certificate added!");
  };

  const handleDelete = async (id: string) => {
    if (confirm("Delete this certificate entry?")) {
      await deleteCertificate(id);
      toast.success("Certificate removed.");
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Award className="w-6 h-6 text-primary" /> Certificates & Credentials
          </h2>
          <p className="text-sm text-slate-400">Upload certificate images/PDFs, credential IDs & verification links</p>
        </div>
        <Button onClick={handleOpenAdd} className="bg-primary hover:bg-primary/90 text-white gap-2">
          <Plus className="w-4 h-4" /> Add Certificate
        </Button>
      </div>

      {certificates.length === 0 ? (
        <div className="text-center py-12 text-slate-500 bg-slate-900/40 rounded-2xl border border-slate-800">
          No certificates added.
        </div>
      ) : (
        <ReorderableList
          items={certificates}
          onReorder={(newItems) => reorderCertificates(newItems)}
          renderItem={(cert) => (
            <div className="flex items-center justify-between gap-4 py-2">
              <div className="flex items-center gap-4 min-w-0">
                <img
                  src={cert.image}
                  alt={cert.title}
                  className="w-14 h-14 object-cover rounded-xl border border-slate-700 bg-slate-950 flex-shrink-0"
                />
                <div className="min-w-0">
                  <h4 className="text-base font-semibold text-white truncate">{cert.title}</h4>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Issued by <span className="text-primary font-medium">{cert.issuer}</span> • {cert.date}
                  </p>
                  {cert.credentialId && (
                    <p className="text-[11px] text-slate-500 font-mono mt-0.5">
                      ID: {cert.credentialId}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2">
                {cert.credentialUrl && (
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 text-slate-400 hover:text-white"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleOpenEdit(cert)}
                  className="h-8 text-xs text-slate-300 hover:text-white"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDelete(cert.id)}
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
            <DialogTitle>{editingId ? "Edit Certificate" : "Add Certificate"}</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <div>
              <ImageUploader
                label="Certificate Image or PDF Document"
                value={currentCert.image || ""}
                onChange={(url) => setCurrentCert({ ...currentCert, image: url })}
                acceptPdf={true}
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Certificate Title</label>
              <Input
                value={currentCert.title || ""}
                onChange={(e) => setCurrentCert({ ...currentCert, title: e.target.value })}
                placeholder="e.g. AWS Certified Solutions Architect"
                className="bg-slate-950 border-slate-700 text-white"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Issuing Organization</label>
                <Input
                  value={currentCert.issuer || ""}
                  onChange={(e) => setCurrentCert({ ...currentCert, issuer: e.target.value })}
                  placeholder="e.g. Amazon Web Services / Oracle"
                  className="bg-slate-950 border-slate-700 text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Issue Date</label>
                <Input
                  type="date"
                  value={currentCert.date || ""}
                  onChange={(e) => setCurrentCert({ ...currentCert, date: e.target.value })}
                  className="bg-slate-950 border-slate-700 text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Credential ID (Optional)</label>
                <Input
                  value={currentCert.credentialId || ""}
                  onChange={(e) => setCurrentCert({ ...currentCert, credentialId: e.target.value })}
                  placeholder="e.g. AWS-123456"
                  className="bg-slate-950 border-slate-700 text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Verification URL / PDF</label>
                <Input
                  value={currentCert.credentialUrl || ""}
                  onChange={(e) => setCurrentCert({ ...currentCert, credentialUrl: e.target.value })}
                  placeholder="https://..."
                  className="bg-slate-950 border-slate-700 text-white"
                />
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsModalOpen(false)} className="border-slate-700 text-slate-300">
              Cancel
            </Button>
            <Button onClick={handleSave} className="bg-primary hover:bg-primary/90 text-white">
              Save Certificate
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
