import React, { useState } from "react";
import { usePortfolioData } from "@/context/PortfolioDataContext";
import { ContactInfo } from "@/types/cms";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Save, Phone, MapPin, Map, Clock } from "lucide-react";
import { toast } from "sonner";

export const ContactTab: React.FC = () => {
  const { contactInfo, updateContactInfo } = usePortfolioData();
  const [formData, setFormData] = useState<ContactInfo>(contactInfo);
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await updateContactInfo(formData);
      toast.success("Contact details updated!");
    } catch {
      toast.error("Failed to update contact details.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-3xl">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Mail className="w-6 h-6 text-primary" /> Contact Information
          </h2>
          <p className="text-sm text-slate-400">Edit public contact details, Google Maps embed & office hours</p>
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">Public Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <Input
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="pl-9 bg-slate-950 border-slate-700 text-white"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">Phone / WhatsApp</label>
            <div className="relative">
              <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <Input
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="pl-9 bg-slate-950 border-slate-700 text-white"
                required
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1.5">Physical Address / City</label>
          <div className="relative">
            <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <Input
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="pl-9 bg-slate-950 border-slate-700 text-white"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1.5">Business / Available Hours</label>
          <div className="relative">
            <Clock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <Input
              value={formData.businessHours}
              onChange={(e) => setFormData({ ...formData, businessHours: e.target.value })}
              placeholder="e.g. Mon - Fri: 9:00 AM - 6:00 PM IST"
              className="pl-9 bg-slate-950 border-slate-700 text-white"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1.5">Google Maps Embed URL / iFrame Src</label>
          <div className="relative">
            <Map className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <Textarea
              rows={3}
              value={formData.googleMapsEmbed}
              onChange={(e) => setFormData({ ...formData, googleMapsEmbed: e.target.value })}
              placeholder="https://www.google.com/maps/embed?pb=..."
              className="pl-9 bg-slate-950 border-slate-700 text-white font-mono text-xs"
            />
          </div>
        </div>
      </div>
    </form>
  );
};
