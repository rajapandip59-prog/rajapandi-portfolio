import { motion } from "framer-motion";
import { PageTransition } from "@/components/PageTransition";
import { ParticleBackground } from "@/components/ParticleBackground";
import { Button } from "@/components/ui/button";
import { Download, Eye, FileText } from "lucide-react";
import { toast } from "sonner";
import { usePortfolioData } from "@/context/PortfolioDataContext";

const Resume = () => {
  const { resume } = usePortfolioData();

  const handleDownload = () => {
    if (!resume.fileUrl) {
      toast.error("No resume file uploaded yet.");
      return;
    }
    const link = document.createElement("a");
    link.href = resume.fileUrl;
    link.download = resume.fileName || "resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Resume download started!");
  };

  const handlePreview = () => {
    if (!resume.fileUrl) {
      toast.error("No resume file uploaded yet.");
      return;
    }
    window.open(resume.fileUrl, "_blank", "noopener,noreferrer");
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
                className="w-32 h-32 mx-auto mb-8 rounded-full bg-primary flex items-center justify-center glow-primary"
              >
                <FileText className="w-16 h-16 text-white" />
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-5xl md:text-6xl font-bold mb-4 gradient-text"
              >
                {resume.title || "My Resume"}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto"
              >
                {resume.description || "Download or preview my latest resume PDF to explore my experience."}
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
                  className="bg-primary hover:bg-primary/90 text-primary-foreground glow-primary group transition-all duration-300"
                >
                  <Download className="mr-2 group-hover:scale-110 transition-transform" />
                  Download PDF
                </Button>

                <Button
                  onClick={handlePreview}
                  size="lg"
                  variant="outline"
                  className="border-primary/50 hover:bg-primary/10 group transition-all duration-300 text-white"
                >
                  <Eye className="mr-2 group-hover:scale-110 transition-transform text-primary" />
                  Preview Document
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Resume;
