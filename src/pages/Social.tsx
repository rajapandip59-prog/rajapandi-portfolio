import { motion } from "framer-motion";
import { PageTransition } from "@/components/PageTransition";
import { ParticleBackground } from "@/components/ParticleBackground";
import { Github, Linkedin, Twitter, Instagram, Youtube, Mail, X, Share2 } from "lucide-react";
import { usePortfolioData } from "@/context/PortfolioDataContext";

const iconMap: Record<string, any> = {
  Github,
  Linkedin,
  Twitter,
  X,
  Instagram,
  Youtube,
  Mail,
  Share2,
};

const Social = () => {
  const { socialLinks } = usePortfolioData();

  const sortedLinks = [...socialLinks].sort(
    (a, b) => (a.order || 0) - (b.order || 0)
  );

  return (
    <PageTransition>
      <div className="min-h-screen relative overflow-hidden pt-24 pb-16">
        <ParticleBackground />

        <div className="absolute top-20 left-20 w-96 h-96 bg-primary/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-secondary/20 rounded-full blur-[120px] animate-pulse delay-500" />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6 gradient-text">
              Connect With Me
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Follow my journey, check out my work, or get in touch across various platforms
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {sortedLinks.map((social, index) => {
              const Icon = iconMap[social.iconName] || Share2;
              return (
                <motion.a
                  key={social.id}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="glass p-6 rounded-2xl hover:glow-primary transition-all duration-300 group flex items-center gap-6"
                >
                  <div className={`w-14 h-14 rounded-2xl ${social.gradient || "bg-primary"} flex items-center justify-center text-white group-hover:scale-110 transition-transform shadow-lg`}>
                    <Icon className="w-7 h-7" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl font-bold mb-1 group-hover:gradient-text transition-all">
                      {social.name}
                    </h3>
                    <p className="text-sm text-slate-300 truncate font-mono">{social.username}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{social.subtext}</p>
                  </div>
                </motion.a>
              );
            })}
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Social;
