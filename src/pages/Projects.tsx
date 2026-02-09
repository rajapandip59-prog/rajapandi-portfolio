import { motion } from "framer-motion";
import { PageTransition } from "@/components/PageTransition";
import { ParticleBackground } from "@/components/ParticleBackground";
import { ExternalLink, Github } from "lucide-react";
import { Button } from "@/components/ui/button";

const Projects = () => {
  const projects = [
    {
      title: "Portfilio",
      description: "A full-stack e-commerce solution with real-time inventory management",
      tech: ["React", "Node.js", "MongoDB", "Stripe"],
      gradient: "from-primary to-accent",
      githubUrl: "https://github.com/rajapandip59-prog/rajapandi-portfolio",
      liveUrl: "https://portfolio.example.com",
    },
    {
      title: "AI Analytics Dashboard",
      description: "Machine learning powered analytics platform for business insights",
      tech: ["React", "Python", "TensorFlow", "D3.js"],
      gradient: "from-secondary to-primary",
      githubUrl: "https://github.com/rajapandip59-prog/ai-analytics-dashboard",
      liveUrl: "https://ai-analytics.example.com",
    },
    {
      title: "Social Media App",
      description: "Real-time social networking platform with video calls",
      tech: ["React Native", "Firebase", "WebRTC"],
      gradient: "from-accent to-secondary",
      githubUrl: "https://github.com/rajapandip59-prog/social-media-app",
      liveUrl: "https://social.example.com",
    },
    {
      title: "Crypto Trading Bot",
      description: "Automated cryptocurrency trading system with ML algorithms",
      tech: ["Python", "React", "PostgreSQL", "Redis"],
      gradient: "from-primary to-secondary",
      githubUrl: "https://github.com/rajapandip59-prog/crypto-trading-bot",
      liveUrl: "https://crypto-bot.example.com",
    },
    {
      title: "Project Management Tool",
      description: "Collaborative project management with real-time updates",
      tech: ["Next.js", "GraphQL", "Prisma", "PostgreSQL"],
      gradient: "from-secondary to-accent",
      githubUrl: "https://github.com/rajapandip59-prog/project-management-tool",
      liveUrl: "https://pm-tool.example.com",
    },
    {
      title: "NFT Marketplace",
      description: "Decentralized marketplace for buying and selling NFTs",
      tech: ["React", "Solidity", "Web3.js", "IPFS"],
      gradient: "from-accent to-primary",
      githubUrl: "https://github.com/rajapandip59-prog/nft-marketplace",
      liveUrl: "https://nft-market.example.com",
    },
  ];

  return (
    <PageTransition>
      <div className="min-h-screen relative overflow-hidden pt-24 pb-16">
        <ParticleBackground />
        
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-40 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-[120px] animate-pulse delay-500" />

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
              Explore my latest work showcasing creativity, technical expertise,
              and innovation
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass rounded-2xl overflow-hidden group hover:glow-primary transition-all duration-300"
              >
                <div className={`h-48 bg-gradient-to-br ${project.gradient} relative`}>
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                </div>
                
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-2 gradient-text">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-primary/20 rounded-full text-xs text-primary font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="flex-1 group/btn" asChild>
                      <a href={project.githubUrl} target="_blank" rel="noreferrer">
                        <Github className="w-4 h-4 mr-2 group-hover/btn:scale-110 transition-transform" />
                        Code
                      </a>
                    </Button>
                    <Button size="sm" className="flex-1 bg-primary hover:bg-primary/90 group/btn" asChild>
                      <a href={project.liveUrl} target="_blank" rel="noreferrer">
                        <ExternalLink className="w-4 h-4 mr-2 group-hover/btn:scale-110 transition-transform" />
                        Live
                      </a>
                    </Button>
                  </div>
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
