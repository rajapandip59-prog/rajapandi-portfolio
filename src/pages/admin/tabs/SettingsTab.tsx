import React, { useState } from "react";
import { usePortfolioData } from "@/context/PortfolioDataContext";
import { useAuth } from "@/context/AuthContext";
import { Settings } from "@/types/cms";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sliders,
  Lock,
  Download,
  Upload,
  RefreshCw,
  Database,
  CheckCircle2,
  AlertTriangle,
  KeyRound,
} from "lucide-react";
import { toast } from "sonner";
import { isSupabaseConfigured } from "@/lib/supabase";

export const SettingsTab: React.FC = () => {
  const { settings, updateSettings, exportDataJSON, importDataJSON, resetToDefaults } = usePortfolioData();
  const { updatePassword } = useAuth();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isChangingPass, setIsChangingPass] = useState(false);

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword || newPassword.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    setIsChangingPass(true);
    try {
      const res = await updatePassword(newPassword);
      if (res.success) {
        toast.success("Admin password changed successfully!");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        toast.error(res.error || "Failed to update password.");
      }
    } catch {
      toast.error("Error changing password.");
    } finally {
      setIsChangingPass(false);
    }
  };

  const handleExportJSON = () => {
    const jsonStr = exportDataJSON();
    const blob = new Blob([jsonStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `portfolio_cms_backup_${new Date().toISOString().split("T")[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    toast.success("Database backup downloaded!");
  };

  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      const success = importDataJSON(content);
      if (success) {
        toast.success("Database restored successfully!");
      } else {
        toast.error("Invalid backup file format.");
      }
    };
    reader.readAsText(file);
  };

  const handleReset = () => {
    if (confirm("Reset ALL portfolio content to initial sample seed values?")) {
      resetToDefaults();
      toast.info("Database reset to defaults.");
    }
  };

  return (
    <div className="space-y-8 max-w-3xl">
      <div>
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <Sliders className="w-6 h-6 text-primary" /> Admin & System Settings
        </h2>
        <p className="text-sm text-slate-400">Security management, database backups & connection status</p>
      </div>

      {/* Database Connection Info */}
      <div className="bg-slate-900/60 p-6 rounded-2xl border border-slate-800 space-y-4">
        <h3 className="text-base font-semibold text-white flex items-center gap-2">
          <Database className="w-5 h-5 text-primary" /> Database Sync Engine Status
        </h3>

        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-3 h-3 rounded-full ${isSupabaseConfigured ? "bg-emerald-400 animate-ping" : "bg-blue-400 animate-pulse"}`} />
            <div>
              <p className="text-sm font-bold text-white">
                {isSupabaseConfigured ? "Supabase PostgreSQL Database Connected" : "Local Storage Reactive Engine"}
              </p>
              <p className="text-xs text-slate-400">
                {isSupabaseConfigured
                  ? "Real-time sync with Supabase cloud database & RLS policies"
                  : "All changes persist instantly in local storage. Plug in Supabase keys anytime for cloud sync!"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Change Admin Password */}
      <form onSubmit={handleChangePassword} className="bg-slate-900/60 p-6 rounded-2xl border border-slate-800 space-y-5">
        <h3 className="text-base font-semibold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
          <KeyRound className="w-5 h-5 text-primary" /> Security & Admin Password
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">New Password</label>
            <Input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="••••••••"
              className="bg-slate-950 border-slate-700 text-white"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Confirm New Password</label>
            <Input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              className="bg-slate-950 border-slate-700 text-white"
            />
          </div>
        </div>

        <Button
          type="submit"
          disabled={isChangingPass}
          className="bg-primary hover:bg-primary/90 text-white"
        >
          {isChangingPass ? "Updating Password..." : "Update Password"}
        </Button>
      </form>

      {/* Data Backup & Restore */}
      <div className="bg-slate-900/60 p-6 rounded-2xl border border-slate-800 space-y-5">
        <h3 className="text-base font-semibold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
          <Download className="w-5 h-5 text-primary" /> Backup & Restore Database
        </h3>

        <p className="text-xs text-slate-400">
          Export your entire portfolio content as a JSON file or import a previous backup to restore your data instantly.
        </p>

        <div className="flex flex-wrap gap-4 pt-2">
          <Button
            type="button"
            onClick={handleExportJSON}
            className="bg-slate-800 hover:bg-slate-700 text-white gap-2 border border-slate-700"
          >
            <Download className="w-4 h-4 text-primary" /> Export Backup JSON
          </Button>

          <label className="cursor-pointer">
            <div className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-sm font-medium border border-slate-700 flex items-center gap-2 transition-colors">
              <Upload className="w-4 h-4 text-secondary" /> Restore from JSON Backup
            </div>
            <input type="file" accept=".json" onChange={handleImportJSON} className="hidden" />
          </label>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="bg-red-500/10 p-6 rounded-2xl border border-red-500/20 space-y-4">
        <h3 className="text-base font-semibold text-red-400 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5" /> Danger Zone
        </h3>
        <p className="text-xs text-slate-300">
          Reset all portfolio content back to the initial sample seed data. This will clear custom changes.
        </p>
        <Button
          type="button"
          onClick={handleReset}
          variant="destructive"
          className="bg-red-600 hover:bg-red-700 text-white gap-2"
        >
          <RefreshCw className="w-4 h-4" /> Reset Database to Default Seed
        </Button>
      </div>
    </div>
  );
};
