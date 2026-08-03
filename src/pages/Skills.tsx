import { motion } from "framer-motion";
import { PageTransition } from "@/components/PageTransition";
import { ParticleBackground } from "@/components/ParticleBackground";
import { useState } from "react";
import { usePortfolioData } from "@/context/PortfolioDataContext";
import {
  Atom,
  Braces,
  Server,
  Database,
  Cloud,
  GitBranch,
  Sparkles,
  Wind,
  Network,
  Code,
  Blocks,
  Container,
} from "lucide-react";

const iconMap: Record<string, any> = {
  Atom,
  Braces,
  Server,
  Database,
  Cloud,
  GitBranch,
  Sparkles,
  Wind,
  Network,
  Code,
  Blocks,
  Container,
};

const Skills = () => {
  const { skills } = usePortfolioData();
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", ...Array.from(new Set(skills.map((s) => s.category)))];

  const filteredSkills =
    selectedCategory === "All"
      ? skills
      : skills.filter((skill) => skill.category === selectedCategory);

  return (
    <PageTransition>
      <div className="min-h-screen relative overflow-hidden pt-24 pb-16">
        <ParticleBackground />

        <div className="absolute top-40 left-20 w-96 h-96 bg-secondary/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-accent/20 rounded-full blur-[120px] animate-pulse delay-700" />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6 gradient-text">
              Skills & Expertise
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A comprehensive toolkit of technologies and methodologies I use to bring ideas to life
            </p>
          </motion.div>

          {/* Category Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-3 mb-12"
          >
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? "bg-primary text-primary-foreground glow-primary scale-105"
                    : "glass text-muted-foreground hover:text-foreground hover:glow-primary"
                }`}
              >
                {category}
              </button>
            ))}
          </motion.div>

          {/* Skills Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {filteredSkills.map((skill, index) => {
              const Icon = iconMap[skill.iconName] || Code;
              return (
                <motion.div
                  key={skill.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="glass p-6 rounded-2xl hover:glow-primary transition-all duration-300 group"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">{skill.name}</h3>
                      <p className="text-xs text-muted-foreground">{skill.category}</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Proficiency</span>
                      <span className="font-semibold text-primary">{skill.level}%</span>
                    </div>
                    <div className="h-2 bg-secondary/30 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.level}%` }}
                        transition={{ duration: 1, delay: 0.2 + index * 0.05 }}
                        className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
                      />
                    </div>
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

export default Skills;
