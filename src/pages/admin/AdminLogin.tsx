import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { motion } from "framer-motion";
import { ShieldCheck, Lock, Mail, ArrowRight, KeyRound, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ParticleBackground } from "@/components/ParticleBackground";
import { toast } from "sonner";
import { isSupabaseConfigured } from "@/lib/supabase";

export const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = (location.state as any)?.from?.pathname || "/admin/dashboard";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMsg("Please enter both email and password.");
      return;
    }

    setErrorMsg("");
    setIsSubmitting(true);

    try {
      const result = await login(email, password);
      if (result.success) {
        toast.success("Welcome back, Admin!");
        navigate(from, { replace: true });
      } else {
        setErrorMsg(result.error || "Authentication failed. Please check credentials.");
        toast.error("Login failed.");
      }
    } catch {
      setErrorMsg("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const fillDefaultCredentials = () => {
    setEmail("admin@portfolio.com");
    setPassword("admin123");
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center bg-slate-950 px-4 overflow-hidden">
      <ParticleBackground />

      {/* Animated gradient blurs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/25 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/25 rounded-full blur-[120px] animate-pulse delay-700" />

      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="glass p-8 md:p-10 rounded-3xl border border-slate-800/80 shadow-2xl backdrop-blur-xl bg-slate-900/60">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-primary to-secondary mx-auto flex items-center justify-center shadow-lg shadow-primary/30 mb-4">
              <ShieldCheck className="w-9 h-9 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white tracking-tight">Portfolio Admin</h1>
            <p className="text-sm text-slate-400 mt-1">Sign in to manage your portfolio content</p>
          </div>

          {!isSupabaseConfigured && (
            <div className="mb-6 p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/60 text-xs text-slate-300 flex items-center justify-between gap-2">
              <div className="space-y-0.5">
                <p className="font-semibold text-primary flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" /> Local Demo Mode Active
                </p>
                <p className="text-slate-400">Default: admin@portfolio.com / admin123</p>
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={fillDefaultCredentials}
                className="h-7 text-xs border-primary/40 text-primary hover:bg-primary/20"
              >
                Auto-fill
              </Button>
            </div>
          )}

          {errorMsg && (
            <div className="mb-6 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-medium">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">Admin Email</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <Input
                  type="email"
                  placeholder="admin@portfolio.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 bg-slate-950/80 border-slate-700 text-white placeholder:text-slate-500 focus:border-primary"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <Input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 bg-slate-950/80 border-slate-700 text-white placeholder:text-slate-500 focus:border-primary"
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-2.5 rounded-xl shadow-lg shadow-primary/25 transition-all duration-200 flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>Signing In...</>
              ) : (
                <>
                  Access Dashboard <ArrowRight className="w-4 h-4" />
                </>
              )}
            </Button>
          </form>

          <div className="mt-8 text-center pt-6 border-t border-slate-800">
            <button
              onClick={() => navigate("/")}
              className="text-xs text-slate-400 hover:text-white transition-colors"
            >
              ← Back to Public Portfolio
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
export default AdminLogin;
