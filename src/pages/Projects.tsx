import { motion } from "framer-motion";
import { PageTransition } from "@/components/PageTransition";
import { ParticleBackground } from "@/components/ParticleBackground";
import { ExternalLink, Github, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePortfolioData } from "@/context/PortfolioDataContext";

const Projects = () => {
  const { projects } = usePortfolioData();

  // Filter only visible projects and sort ordered
  const visibleProjects = projects
    .filter((p) => p.isVisible ?? true)
    .sort((a, b) => (a.order || 0) - (b.order || 0));

  return (
    <PageTransition>
      <div className="min-h-screen relative overflow-hidden pt-24 pb-16">
        <ParticleBackground />

        <div className="absolute top-20 right-20 w-96 h-96 bg-primary/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-40 left-20 w-96 h-96 bg-accent/20 rounded-full blur-[120px] animate-pulse delay-500" />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6 gradient-text">
              Featured Projects
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A collection of projects showcasing my technical skills and problem-solving abilities
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {visibleProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="glass rounded-2xl overflow-hidden hover:glow-primary transition-all duration-300 group flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-video overflow-hidden bg-slate-950">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {project.isFeatured && (
                      <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-amber-500/90 text-white text-xs font-semibold flex items-center gap-1 shadow-lg backdrop-blur-md">
                        <Star className="w-3.5 h-3.5 fill-white" /> Featured
                      </div>
                    )}
                    <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-slate-900/80 text-primary text-xs font-semibold backdrop-blur-md">
                      {project.category}
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-2xl font-bold mb-3 group-hover:gradient-text transition-all">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium border border-primary/20"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0 flex gap-3">
                  {project.githubUrl && (
                    <Button
                      onClick={() => window.open(project.githubUrl, "_blank")}
                      size="sm"
                      variant="outline"
                      className="flex-1 border-primary/30 hover:bg-primary/10 text-xs text-white"
                    >
                      <Github className="mr-2 h-4 w-4" /> Code
                    </Button>
                  )}
                  {project.liveUrl && (
                    <Button
                      onClick={() => window.open(project.liveUrl, "_blank")}
                      size="sm"
                      className="flex-1 bg-primary hover:bg-primary/90 text-xs text-white"
                    >
                      <ExternalLink className="mr-2 h-4 w-4" /> Live Demo
                    </Button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Projects;
