import { motion } from "framer-motion";
import { PageTransition } from "@/components/PageTransition";
import { ParticleBackground } from "@/components/ParticleBackground";
import { Github, Linkedin, Twitter, Instagram, Youtube, Mail, X } from "lucide-react";

const Social = () => {
  const socialLinks = [
    {
      name: "GitHub",
      icon: Github,
      username: "@rajapandip59-prog",
      followers: "10K+ followers",
      gradient: "from-gray-700 to-gray-900",
      url: "https://github.com/rajapandip59-prog",
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      username: "@rajapandi-p",
      followers: "100+ connections",
      gradient: "from-blue-600 to-blue-800",
      url: "https://www.linkedin.com/in/rajapandi-p/",
    },
    {
      name: "X",
      icon: X,
      username: "@RajapandiP70029",
      followers: "8K+ followers",
      gradient: "from-sky-400 to-sky-600",
      url: "https://twitter.com/RajapandiP70029",
    },
    {
      name: "Instagram",
      icon: Instagram,
      username: "@creative",
      followers: "3K+ followers",
      gradient: "from-purple-600 via-pink-600 to-orange-500",
      url: "https://instagram.com",
    },
    {
      name: "YouTube",
      icon: Youtube,
      username: "@channel",
      followers: "2K+ subscribers",
      gradient: "from-red-600 to-red-700",
      url: "https://youtube.com",
    },
    {
      name: "Email",
      icon: Mail,
      username: "rajapandip59@gmail.com",
      followers: "Always available",
      gradient: "from-teal-500 to-teal-700",
      url: "mailto:rajapandip59@gmail.com",
    },
  ];

  return (
    <PageTransition>
      <div className="min-h-screen relative overflow-hidden pt-24 pb-16">
        <ParticleBackground />
        
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-accent/20 rounded-full blur-[120px] animate-pulse delay-700" />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6 gradient-text">
              Let's Connect
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Follow me on social media and stay updated with my latest projects
              and insights
            </p>
          </motion.div>

          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {socialLinks.map((social, index) => {
              const Icon = social.icon;
              return (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="glass rounded-2xl p-8 hover:glow-primary transition-all duration-300 group cursor-pointer relative overflow-hidden"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${social.gradient} opacity-0 group-hover:opacity-20 transition-opacity`} />
                  
                  <div className="relative z-10">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <Icon className="w-8 h-8 text-white" />
                    </div>

                    <h3 className="text-2xl font-bold mb-2 gradient-text">
                      {social.name}
                    </h3>

                    <p className="text-sm text-muted-foreground mb-1">
                      {social.username}
                    </p>

                    <p className="text-xs text-muted-foreground/70">
                      {social.followers}
                    </p>

                    <div className="mt-4 pt-4 border-t border-border/50">
                      <span className="text-sm text-primary group-hover:underline">
                        Follow me →
                      </span>
                    </div>
                  </div>
                </motion.a>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-16 text-center"
          >
            <div className="glass p-8 rounded-2xl inline-block">
              <p className="text-lg text-muted-foreground mb-4">
                Want to collaborate or just say hi?
              </p>
              <p className="text-2xl font-bold gradient-text">
                I'd love to hear from you! 👋
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Social;
