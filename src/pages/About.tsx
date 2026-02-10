import { motion } from "framer-motion";
import { PageTransition } from "@/components/PageTransition";
import { ParticleBackground } from "@/components/ParticleBackground";
import { School, Award, GraduationCap, Calendar } from "lucide-react";
import profilePhoto from "@/assets/profile-photo.jpeg";

const About = () => {
  const achievements = [
    {
      icon: School,
      title: "Christ The King Engineering College",
      description: "College",
    },
    {
      icon: GraduationCap,
      title: "Artificial Intelligence & Data Science",
      description: "Branch",
    },
    {
      icon: Award,
      title: "B.Tech",
      description: "Degree",
    },
    {
      icon: Calendar,
      title: "2022-2026",
      description: "Year",
    },
  ];

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
                  <div className="absolute -inset-3 bg-gradient-to-r from-primary via-accent to-secondary rounded-full blur-xl opacity-75 group-hover:opacity-100 animate-glow-pulse" />
                  <div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-primary/50 glow-primary">
                    <img
                      src={profilePhoto}
                      alt="Profile"
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
                  I’m an AI Engineer & Data Scientist crafting intelligent systems that think, learn, and evolve.
                  I specialize in Machine Learning, Deep Learning, and building futuristic, scalable AI solutions.
                  Turning raw data into smart, real-world impact is what drives me.
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
              My journey into AI began with a curiosity to understand how machines can think and make decisions using data.
              As a fresher, I focused on building a strong foundation in Machine Learning, Deep Learning,
              and data-driven problem solving through continuous learning and practice.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              I enjoy working on real-world projects where I convert ideas into practical AI solutions using code and data.
              Currently, I’m improving my skills by experimenting with new AI technologies and preparing myself for industry-level challenges.
              Each project helps me grow as an AI engineer and think beyond theory.
              I am continuously learning and preparing myself to contribute to impactful AI-driven solutions.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {achievements.map((achievement, index) => {
              const Icon = achievement.icon;
              return (
                <motion.div
                  key={achievement.title}
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
