import { motion } from "framer-motion";
import { PageTransition } from "@/components/PageTransition";
import { ParticleBackground } from "@/components/ParticleBackground";
import { Award, Calendar, ExternalLink, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePortfolioData } from "@/context/PortfolioDataContext";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";

const Certificate = () => {
  const { certificates } = usePortfolioData();
  const [selectedCert, setSelectedCert] = useState<any | null>(null);

  const sortedCertificates = [...certificates].sort(
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
              Certificates & Achievements
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Professional certifications and recognized credentials
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {sortedCertificates.map((cert, index) => (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="glass rounded-2xl overflow-hidden hover:glow-primary transition-all duration-300 group flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-video overflow-hidden bg-slate-950">
                    <img
                      src={cert.image}
                      alt={cert.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-slate-900/80 text-primary text-xs font-semibold backdrop-blur-md flex items-center gap-1">
                      <Calendar className="w-3 h-3" /> {cert.date}
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-2 text-primary text-xs font-semibold mb-2">
                      <Award className="w-4 h-4" /> {cert.issuer}
                    </div>
                    <h3 className="text-xl font-bold mb-2 group-hover:gradient-text transition-all">
                      {cert.title}
                    </h3>
                    {cert.credentialId && (
                      <p className="text-xs text-slate-400 font-mono mb-4">
                        Credential ID: {cert.credentialId}
                      </p>
                    )}
                  </div>
                </div>

                <div className="p-6 pt-0">
                  {cert.credentialUrl && (
                    <Button
                      onClick={() => setSelectedCert(cert)}
                      size="sm"
                      className="w-full bg-primary hover:bg-primary/90 text-xs text-white"
                    >
                      <ExternalLink className="mr-2 h-4 w-4" /> View Credential
                    </Button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Certificate Lightbox / PDF Viewer Modal */}
      <Dialog open={Boolean(selectedCert)} onOpenChange={() => setSelectedCert(null)}>
        <DialogContent className="bg-slate-950 border-slate-800 text-white max-w-4xl max-h-[90vh] p-4 flex flex-col">
          <DialogTitle className="text-lg font-bold text-white mb-2">
            {selectedCert?.title}
          </DialogTitle>

          {selectedCert?.credentialUrl?.endsWith(".pdf") || selectedCert?.image?.endsWith(".pdf") ? (
            <iframe
              src={selectedCert?.credentialUrl || selectedCert?.image}
              className="w-full h-[70vh] rounded-lg border border-slate-800"
              title="Certificate PDF"
            />
          ) : (
            <img
              src={selectedCert?.image || selectedCert?.credentialUrl}
              alt={selectedCert?.title}
              className="w-full h-auto max-h-[75vh] object-contain rounded-lg"
            />
          )}

          <div className="flex justify-end gap-3 mt-4">
            <Button
              onClick={() => window.open(selectedCert?.credentialUrl || selectedCert?.image, "_blank")}
              className="bg-primary text-white text-xs"
            >
              Open Original Link <ExternalLink className="w-3.5 h-3.5 ml-1" />
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </PageTransition>
  );
};

export default Certificate;
