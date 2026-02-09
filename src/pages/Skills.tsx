import { motion } from "framer-motion";
import { PageTransition } from "@/components/PageTransition";
import { ParticleBackground } from "@/components/ParticleBackground";
import { useState, useEffect } from "react";

const Skills = () => {
  const skills = [
    { name: "React/Next.js", level: 95, category: "Frontend" },
    { name: "TypeScript", level: 90, category: "Languages" },
    { name: "Node.js", level: 88, category: "Backend" },
    { name: "Python", level: 98, category: "Languages" },
    { name: "Three.js", level: 80, category: "3D/Animation" },
    { name: "GraphQL", level: 82, category: "Backend" },
    { name: "Tailwind CSS", level: 90, category: "Frontend" },
    { name: "MongoDB", level: 85, category: "Database" },
    { name: "PostgreSQL", level: 87, category: "Database" },
    { name: "Docker", level: 71, category: "DevOps" },
    { name: "AWS", level: 60, category: "Cloud" },
    { name: "GCP", level: 60, category: "Cloud" },
    { name: "Git", level: 92, category: "DevOps" },
    { name: "Framer Motion", level: 92, category: "3D/Animation" },
  ];

  const categories = ["All", "Frontend", "Backend", "Languages", "Database", "DevOps", "Cloud", "3D/Animation"];
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredSkills = selectedCategory === "All"
    ? skills
    : skills.filter(skill => skill.category === selectedCategory);

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
              My Skills
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Expertise across modern technologies and frameworks
            </p>
          </motion.div>

          {/* Category Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-2 mb-12"
          >
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full transition-all duration-300 ${
                  selectedCategory === category
                    ? "bg-primary text-primary-foreground glow-primary"
                    : "glass hover:bg-primary/20"
                }`}
              >
                {category}
              </button>
            ))}
          </motion.div>

          {/* Skills Grid */}
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredSkills.map((skill, index) => (
              <SkillBar key={skill.name} skill={skill} index={index} />
            ))}
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

const SkillBar = ({ skill, index }: { skill: { name: string; level: number; category: string }; index: number }) => {
  const [animatedLevel, setAnimatedLevel] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedLevel(skill.level);
    }, 200 + index * 50);

    return () => clearTimeout(timer);
  }, [skill.level, index]);

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="glass p-6 rounded-xl hover:glow-primary transition-all duration-300"
    >
      <div className="flex justify-between items-center mb-3">
        <span className="font-semibold text-foreground">{skill.name}</span>
        <span className="text-sm text-primary font-bold">{skill.level}%</span>
      </div>
      
      <div className="h-3 bg-muted rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${animatedLevel}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="h-full bg-gradient-to-r from-primary via-accent to-secondary rounded-full relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
        </motion.div>
      </div>
      
      <div className="mt-2 text-xs text-muted-foreground">{skill.category}</div>
    </motion.div>
  );
};

export default Skills;
