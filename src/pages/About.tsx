import { motion } from "framer-motion";
import { PageTransition } from "@/components/PageTransition";
import { ParticleBackground } from "@/components/ParticleBackground";
import { School, Award, GraduationCap, Calendar, Sparkles } from "lucide-react";
import { usePortfolioData } from "@/context/PortfolioDataContext";

const iconMap: Record<string, any> = {
  School,
  GraduationCap,
  Award,
  Calendar,
  Sparkles,
};

const About = () => {
  const { profile, about } = usePortfolioData();

  return (
    <PageTransition>
      <div className="min-h-screen relative overflow-hidden pt-24 pb-16">
        <ParticleBackground />
        
        <div className="absolute top-40 right-20 w-96 h-96 bg-primary/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-secondary/20 rounded-full blur-[100px]" />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto mb-16"
          >
            <div className="flex flex-col md:flex-row items-center gap-8 mb-8">
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex-shrink-0"
              >
                <div className="relative group">
                  <div className="absolute -inset-3 bg-primary/40 rounded-full blur-xl opacity-75 group-hover:opacity-100 animate-glow-pulse" />
                  <div className="relative w-72 h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-4 border-primary/50 glow-primary">
                    <img
                      src={profile.profilePhoto}
                      alt={profile.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </motion.div>

              <div className="flex-1 text-center md:text-left">
                <h1 className="text-5xl md:text-6xl font-bold mb-6 gradient-text">
                  About Me
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  {about.aboutText || profile.bio}
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-3xl mx-auto glass p-8 rounded-2xl mb-16"
          >
            <h2 className="text-3xl font-bold mb-4 gradient-text">My Journey</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              {about.journeyText1}
            </p>
            <p className="text-muted-foreground leading-relaxed">
              {about.journeyText2}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {about.highlights.map((achievement, index) => {
              const Icon = iconMap[achievement.iconName] || Award;
              return (
                <motion.div
                  key={achievement.title + index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  className="glass p-6 rounded-xl hover:glow-primary transition-all duration-300 group"
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <Icon className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2 gradient-text">
                      {achievement.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {achievement.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default About;
