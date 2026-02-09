import { motion } from "framer-motion";
import { PageTransition } from "@/components/PageTransition";
import { ParticleBackground } from "@/components/ParticleBackground";
import { Button } from "@/components/ui/button";
import { Download, Eye, FileText } from "lucide-react";
import { toast } from "sonner";

const Resume = () => {
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "/resume.pdf";
    link.download = "resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Resume downloaded successfully!");
  };

  const handlePreview = () => {
    window.open("/resume.pdf", "_blank", "noopener,noreferrer");
    toast.info("Opening resume preview...");
  };

  return (
    <PageTransition>
      <div className="min-h-screen relative overflow-hidden pt-24 pb-16 flex items-center justify-center">
        <ParticleBackground />
        
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-[120px] animate-pulse delay-500" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="glass p-12 rounded-3xl text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="w-32 h-32 mx-auto mb-8 rounded-full bg-gradient-to-br from-primary via-accent to-secondary flex items-center justify-center glow-primary"
              >
                <FileText className="w-16 h-16 text-white" />
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-5xl md:text-6xl font-bold mb-6 gradient-text"
              >
                My Resume
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
              >
                Download or preview my professional resume to learn more about my
                experience, skills, and achievements
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <Button
                  onClick={handleDownload}
                  size="lg"
                  className="bg-primary hover:bg-primary/90 glow-primary group"
                >
                  <Download className="mr-2 group-hover:scale-110 transition-transform" />
                  Download Resume
                </Button>

                <Button
                  onClick={handlePreview}
                  size="lg"
                  variant="outline"
                  className="border-primary/50 hover:bg-primary/10 group"
                >
                  <Eye className="mr-2 group-hover:scale-110 transition-transform" />
                  Preview Resume
                </Button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="mt-12 pt-8 border-t border-border/50"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                  <div className="p-4 rounded-xl bg-background/50">
                    <div className="text-2xl font-bold gradient-text mb-1">PDF</div>
                    <div className="text-sm text-muted-foreground">Format</div>
                  </div>
                  <div className="p-4 rounded-xl bg-background/50">
                    <div className="text-2xl font-bold gradient-text mb-1">1 Pages</div>
                    <div className="text-sm text-muted-foreground">Length</div>
                  </div>
                  <div className="p-4 rounded-xl bg-background/50">
                    <div className="text-2xl font-bold gradient-text mb-1">Updated</div>
                    <div className="text-sm text-muted-foreground">This Month</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Resume;
